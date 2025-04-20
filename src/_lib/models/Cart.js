import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productimage: { type: String, required: true },
  productName: { type: String, required: true, unique: true },
  productDiscription: { type: String, required: true },
  productPrice: { type: Number, required: true }
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
