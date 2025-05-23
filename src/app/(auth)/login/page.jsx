"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Optional: Show alert if redirected with a message (session expired)
  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      Swal.fire({
        icon: "warning",
        title: "Log-in again...",
        text: "It's been a long time, please log in again.",
      });
      router.replace("/login");
    }
  }, [searchParams, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(false);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      Swal.fire({
        icon: "success",
        title: "Logged-in",
        text: `Welcome back!`,
      });
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Invalid email or password`,
      });
    }

    setLoading(true);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-2xl bg-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform transform hover:shadow-gray-900"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Login
        </h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-semibold text-gray-300"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-semibold text-gray-300"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!loading}
          className={`w-full font-semibold py-2.5 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 ${
            loading
              ? "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Login" : "Please wait..."}
        </button>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-400 font-medium transition duration-200"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
