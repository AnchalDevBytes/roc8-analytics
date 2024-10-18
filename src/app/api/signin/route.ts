import { generateToken } from "@/helpers/generateToken";
import { prisma } from "@/server/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface SigninRequestBodyInterface {
    email: string;
    password: string;
}

const generatedToken = async (user: { id: number; email: string; }) : Promise<string> => {
    try {
        return generateToken(user);
    } catch (error) {
        console.error(error);
        throw new Error("Error occurred while generating token.");
    }
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } : SigninRequestBodyInterface = await req.json() as SigninRequestBodyInterface;

        if(!email || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const user : User | null = await prisma.user.findUnique({
            where : { email },
        });

        if(!user) {
            return NextResponse.json(
                { success: false, message: "User does not exist" }
            );
        }

        const isPasswordCorrect : boolean = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return NextResponse.json({
                success: false, message: "Invalid password",
            })
        }
        console.log(isPasswordCorrect);
        
        const token = await generatedToken(user);

        const signinUser = await prisma.user.findUnique({
            where : {
                id: user.id,
            },
            select : {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const options = {
            httpOnly: true,
            secure: true,
        }

        const response = NextResponse.json(
            {
                success: true,
                message: "User sign-in successfully!",
                user : signinUser,
            },
            {
                status : 200
            },
        );
        response.cookies.set("token", token, options);
        response.headers.set("Location", "/");
        return response;
        
    } catch (error) { 
        if(error instanceof Error) {
            return NextResponse.json(
                { success: false, message: error.message }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Unknown error occurred" }
            );
        }
    }
}
