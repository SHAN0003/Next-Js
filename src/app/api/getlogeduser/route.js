import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("khopaditodsalleka69");

export async function POST(req) {
  const token = await req.cookies.get("token")?.value;
  console.log("token-------->", token);

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Verified payload --->", payload);
    return Response.json(payload);
  } catch (err) {
    console.log("JWT verification failed:", err.message);
  }
}
