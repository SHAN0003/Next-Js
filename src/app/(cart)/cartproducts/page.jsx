"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";

function Page() {
  const { removeFromCart, cartItems, clearCart, totalAmount } = useCart();

  cartItems.map((item) => console.log("price->", typeof item.productPrice));

  const handelCilck = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove all items you added...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart()
        Swal.fire({
          title: "Deleted!",
          text: "Your cart items has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🛒 Your Cart
        <span className="text-sm text-gray-400 font-normal">
          ({cartItems.length} item{cartItems.length !== 1 && "s"})
        </span>
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          <p className="text-lg">Your cart is feeling lonely 😢</p>
          <p className="text-sm">Add some products to make it happy!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((product, index) => (
              <div
                key={product._id}
                className="bg-gray-800 rounded-xl shadow-md p-5 transition-transform hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Showcase Image */}
                {product.productimage && (
                  <img
                    src={product.productimage}
                    alt="Showcase"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}

                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {product.productName}
                  </h3>
                  <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                    ${product.productPrice}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  Quantity: {product.quantity || 1}
                </p>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 Total Amount */}
          <div className="text-right mt-8 text-lg font-semibold text-indigo-500 cursor-pointer">
            Total Amount:{" "}
            <span className="text-2xl hover:text-indigo-400">
              ${totalAmount}
            </span>
          </div>
        </>
      )}

      {/* 🗑️ Remove All Button */}
      <button
        onClick={handelCilck}
        className="text-sm bg-red-700 hover:bg-red-800 px-4 py-2 m-6 rounded-md transition-colors"
      >
        🗑️ Remove All
      </button>
    </div>
  );
}

export default Page;
