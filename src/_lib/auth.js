// src/lib/auth.js
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { connectDB } from "../_lib/connectDB";
import User from "../_lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 10, // ✅ JWT expires after 10 minutes
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = { id: token.id, name: token.name, email: token.email };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions);
