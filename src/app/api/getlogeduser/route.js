import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    console.log("No token found");
    return NextResponse.json({ message: "No token found" }, { status: 401 });
  }

  console.log("Verified token:", token);
  return NextResponse.json(token);
}
