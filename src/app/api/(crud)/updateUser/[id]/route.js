import { connectDB } from "../../../../../_lib/connectDB";
import Crud from "../../../../../_lib/models/Crud";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    await connectDB();

    const user = await Crud.findOne({_id : id});

    console.log("fetched user-->", user);

    if (user) {
      return Response.json({ user });
    }

    return Response.json({ error: "user not found" });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}

//update user
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, email, city } = await req.json();
    await connectDB();

    const user = await Crud.findByIdAndUpdate(
      id,
      { name, email, city },
      { new: true }
    );

    console.log("fetched user-->", user);

    if (user) {
      return Response.json({ user });
    }

    return Response.json({ error: "user not found" });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}
