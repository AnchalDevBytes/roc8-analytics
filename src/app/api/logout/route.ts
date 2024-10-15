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
    } catch (error) {
        return NextResponse.json({
            success: false, message: "Failed to logout"
        });
    }
}