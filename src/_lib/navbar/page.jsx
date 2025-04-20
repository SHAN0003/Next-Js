"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";
import { signOut } from "next-auth/react";

function Page() {
  const { cartCount, logedUserName } = useCart();
  const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     await axios.post("/api/logout");
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Logged Out!",
  //       text: "You've been logged out. Come back soon!",
  //     });
  //     router.push("/login");
  //   } catch (err) {
  //     console.error("Logout failed", err);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false, // If you don't want to automatically redirect
      });
      Swal.fire({
        icon: "warning",
        title: "Logged Out!",
        text: "You've been logged out. Come back soon!",
      });
      router.push("/login"); // Redirect the user to the login page after logging out
    } catch (error) {
      console.error("Logout failed", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out.",
      });
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side: Logo + Links */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center space-x-2">
            <img
              className="h-8 w-8"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Logo"
            />
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Dashboard
            </span>
          </a>
          <div className="hidden sm:flex items-center space-x-6">
            <a
              href="/productlist"
              className="text-gray-600 dark:text-gray-300 hover:text-violet-500 transition"
            >
              Shop
            </a>
            <a
              href="/adduser"
              className="text-gray-600 dark:text-gray-300 hover:text-violet-500 transition"
            >
              Add User
            </a>
            <a
              href="/userlist"
              className="text-gray-600 dark:text-gray-300 hover:text-violet-500 transition"
            >
              User List
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-indigo-400 cursor-pointer">
            Welcom{" "}
            <span className="font-bold text-xl hover:text-indigo-500">
              {logedUserName}
            </span>
          </h1>
        </div>

        {/* Right side: Profile + Cart + Logout */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.455 1.31m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          {/* Cart */}
          <a
            href="/cartproducts"
            className="relative text-gray-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </a>

          {/* Profile */}
          <div>
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow transition active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Page;
