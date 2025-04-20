// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login?message=Its%20been%20long%20time,%20Please%20login%20again!", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/user/:path*", "/adduser", "/userlist", "/updateuser", "/cartproducts", "/productlist"],
};
