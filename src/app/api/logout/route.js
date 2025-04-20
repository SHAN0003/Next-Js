import { cookies  } from "next/headers";

export async function POST(req) {
  const cookieStore = cookies();
  cookieStore.delete('token', { path: '/' });
  return Response.json({ message: 'Logged out' });
}


