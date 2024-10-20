import { NextRequest, NextResponse } from "next/server";

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
    const response = NextResponse.redirect(new URL("/signin", req.nextUrl));
    response.cookies.set("filters", JSON.stringify(finalFilter), {
      path: "/",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  if (token && isPublicPath) {
      const response = NextResponse.redirect(new URL("/", req.nextUrl));
      response.cookies.set("filters", JSON.stringify(finalFilter));
      return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/signin"],
};
