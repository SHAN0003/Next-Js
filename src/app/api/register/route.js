// app/api/register/route.js
import { connectDB } from '../../../_lib/connectDB';
import User from '../../../_lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { email, password, name } = await req.json();
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) return Response.json({ error: 'User exists' }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashed, name });

  return Response.json({ message: 'Registered successfully' });
}
