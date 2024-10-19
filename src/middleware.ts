import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-toastify";

export async function middleware(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const startDate = params.get("startDate");
  const endDate = params.get("endDate");
  const ageGroup = params.get("ageGroup");
  const gender = params.get("gender");
  const finalFilter = {
    startDate: "",
    endDate: "",
    ageGroup: "",
    gender: "",
  };

  if (startDate) {
    finalFilter.startDate = startDate;
  }
  if (endDate) {
    finalFilter.endDate = endDate;
  }
  if (ageGroup) {
    finalFilter.ageGroup = ageGroup;
  }
  if (gender) {
    finalFilter.gender = gender;
  }

  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/signup" || path === "/signin";
  const token = req.cookies.get("token")?.value ?? "";

  if (!token && !isPublicPath) {
    toast.error("Unauthorized");
    NextResponse.next().cookies.set("filters", JSON.stringify(finalFilter));
    return NextResponse.redirect(new URL("/signin", req.nextUrl));
  }

  if (token && isPublicPath) {
    toast.error("You can not move to signin or signup without logout");
    NextResponse.next().cookies.set("filters", JSON.stringify(finalFilter));
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/signup", "/signin"],
};
