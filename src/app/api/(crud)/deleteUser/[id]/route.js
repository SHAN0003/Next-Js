import { connectDB } from "@/_lib/connectDB";
import Crud from "@/_lib/models/Crud";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const userDelete = await Crud.deleteOne({ _id: id });
    if (userDelete) {
      return Response.json({ userDelete });
    }
    return Response.json({
      error: "something went wrong!!, user not deleted!",
    });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}
