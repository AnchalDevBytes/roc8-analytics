import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-toastify";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isPublicPath = path === "/signup" || path === "/signin";
    const token = req.cookies.get("token")?.value ?? "";

    if(!token && !isPublicPath) {
        toast.error("Unauthorized");
        return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    if(token && isPublicPath) {
        toast.error("You can not move to signin or signup without logout");
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

}

export const config = {
    matcher : [
        "/",
        "/signup",
        "/signin",
    ]
}
