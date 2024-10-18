import { generateToken } from "@/helpers/generateToken";
import { prisma } from "@/server/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface SignupRequestBodyInterface {
    name: string;
    email: string;
    password: string;
}

const generatedToken = async (user: { id: number; email: string; name: string | null }): Promise<string> => {
    try {
        return generateToken(user);
    } catch (error) {  // eslint-disable-line @typescript-eslint/no-unused-vars
        throw new Error("Error occurred while generating token.");
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } : SignupRequestBodyInterface = await req.json() as SignupRequestBodyInterface;

        if(!name || !email || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required!"
            });
        }

        const existingUser = await prisma.user.findUnique({
            where : { email },
        });

        if(existingUser) {
            return NextResponse.json({
                success : false,
                message: "User with this email already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                name,
                email,
                password : hashedPassword,
            },
            select : {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
        });

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "Error while crearting new User!"
            })
        }

        const token = await generatedToken(user);
        console.log(token);

        const options = {
            httpOnly: true,
            secure: true,
        }
        
        const response = NextResponse.json(
            {
                success: true,
                message: "User created successfully!",
                user: user,
            },
            {
                status: 200
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
