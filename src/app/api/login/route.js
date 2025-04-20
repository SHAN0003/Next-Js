// app/api/login/route.js
import { connectDB } from "../../../_lib/connectDB";
import User from "../../../_lib/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "../../../_lib/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ id: user._id, email: user.email, name: user.name });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/", // ✅ so it works across your app
      maxAge: 60 * 10, // 10 minutes
    });

    return Response.json({ message: "Welcome " + user.name });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
