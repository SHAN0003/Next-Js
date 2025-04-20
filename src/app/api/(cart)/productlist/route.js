import { connectDB } from "@/_lib/connectDB"
import Cart from "@/_lib/models/Cart"

export async function GET() {
  try {
    await connectDB();

    const products = await Cart.find();
    if (products) {
      return Response.json(products);
    }
    return Response.json({ error: "Can not get products!!" });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}
