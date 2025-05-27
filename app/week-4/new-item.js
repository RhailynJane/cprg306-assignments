"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    let current = quantity.valueOf();
    if (current < 20) {
      setQuantity(current + 1);
    }
  };

  const decrement = () => {
    let current = quantity.valueOf();
    if (current > 1) {
      setQuantity(current - 1);
    }
  };

  // Default styles
  let minusButtonStyles =
    "bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600";
  let plusButtonStyles =
    "bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600";

  // Override styles if limits reached
  if (quantity === 1) {
    minusButtonStyles =
      "bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed";
  }
  if (quantity === 20) {
    plusButtonStyles =
      "bg-gray-400 text-white px-4 py-2 rounded-full cursor-not-allowed";
  }

  return (
    <div className="w-64 mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white text-center">
      <div className="flex items-center justify-between gap-4">
        <button onClick={decrement} className={minusButtonStyles}>
          –
        </button>

        <span className="text-3xl font-semibold text-gray-700">{quantity}</span>

        <button onClick={increment} className={plusButtonStyles}>
          +
        </button>
      </div>
    </div>
  );
}
