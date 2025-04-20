import { connectDB } from "@/_lib/connectDB";
import Crud from "@/_lib/models/Crud";

export async function GET() {
  try {
    await connectDB();
    const users = await Crud.find();
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "can not get all users" });
  }
}
