"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      Swal.fire({
        icon: "warning",
        title: "Log-in again...",
        text: "It's been long time, please login again.",
      });
      // Optionally clean the URL so the message doesn't persist
      router.replace("/login"); // Replaces the current route (no history added)
    }
  }, [searchParams, router]);

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((result) => {
        console.log("result-->", result);
        console.log("result data-->", result.data);

        //check for login
        if (result.data) {
          console.log("loged------->", result.data);
          Swal.fire({
            icon: "success",
            title: "Loged-in",
            text: `${result.data.message}`,
          });
          setLoading(true);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log("login ERROR", error);
        // alert(error.response.data.error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        setLoading(true);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="w-full flex justify-center items-center min-h-screen bg-gray-900 px-4 py-12">
        <form
          onSubmit={handelSubmit}
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

          {/* 🔽 Add this right below the button */}
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
      <ToastContainer />
    </>
  );
}

export default Login;
