import mongoose from "mongoose";

const crudSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
});

export default mongoose.models.Crud || mongoose.model("Crud", crudSchema);
