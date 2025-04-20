// lib/mongodb.js
import mongoose from 'mongoose';

let cached = global.mongoose || { conn: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect("mongodb+srv://Shan:Shan123@cluster0.ukwgu.mongodb.net/Acc_office");
  return cached.conn;
}
