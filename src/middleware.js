import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("khopaditodsalleka69");

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("token-------->", token);

  if (!token) {
    return NextResponse.redirect(new URL("/login?message=Its%20been%20long%20time,%20Please%20login%20again!", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Verified payload --->", payload);
    return NextResponse.next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/deshbord", "/user/:path*", "/adduser", "/userlist", "/updateuser", "/cartproducts", "/productlist"],
};
