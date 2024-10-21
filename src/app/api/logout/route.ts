import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Loggedout successfully!" },
            { status: 200 },
        );
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: true,
            path: "/",
            expires: new Date(0),
        });
        
        response.headers.set("Location", "/signin");

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false, message: "Failed to logout"
        });
    }
}
