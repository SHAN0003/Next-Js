import { connectDB } from "../../../../_lib/connectDB";
import Crud from "../../../../_lib/models/Crud";

export async function POST(req) {
  try {
    const { name, email, city } = await req.json();
    await connectDB();

    const user = await Crud.findOne({ email });
    if (user) {
      return Response.json({ error: "User exists" });
    }

    const newUser = await Crud.create({ name, email, city });
    if (newUser) {
      const fetchedUser = await Crud.findOne({ email });
      return Response.json(fetchedUser);
    }
    return Response.json({ error: "user not added!" });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}
