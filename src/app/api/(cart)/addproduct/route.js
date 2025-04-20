import { connectDB } from "@/_lib/connectDB"
import Cart from "@/_lib/models/Cart"

export async function POST(req) {
  try {
    const { productimage, productName, productDiscription, productPrice } = await req.json();
    await connectDB();

    const product = await Cart.findOne({ productName });
    if (product) {
      return Response.json({ error: "Product exists" });
    }

    const newProduct = await Cart.create({ productimage, productName, productDiscription, productPrice });
    if (newProduct) {
      const fetchedProduct = await Cart.findOne({ productName });
      return Response.json(fetchedProduct);
    }
    return Response.json({ error: "Product not added!" });
  } catch (error) {
    return Response.json({ error: "catch code" });
  }
}
