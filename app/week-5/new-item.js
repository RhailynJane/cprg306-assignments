"use client";

import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      name,
      category,
      quantity,
    };

    // Alert object
    alert(
      `Added item: ${item.name}, quantity: ${item.quantity}, category: ${item.category}`
    );
    // Print item object to console log
    console.log(item);

    // Reset all field
    setName("");
    setQuantity(1);
    setCategory("Produce");
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
    <main>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-2 w-96 h-50 mx-auto p-3 bg-blue-100 rounded-lg shadow-md"
      >
        <input
          className="border-2 rounded border-black  h-12 p-2 text-black bg-white "
          type="text"
          id="name"
          name="name"
          placeholder="Item name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="flex justify-between">
          <div className="flex w-36 h-12 gap-3 border-2 rounded bg-slate-50 p-3  border-black  text-black items-center">
            <p className="flex-1">{quantity}</p>
            <button
              type="button"
              onClick={
                quantity > 1 ? () => setQuantity(quantity - 1) : undefined
              }
              disabled={quantity === 1}
              className="flex-1 h-6 bg-red-500 rounded hover:bg-red-600 disabled:bg-slate-400 active:bg-red-300 text-black"
            >
              -
            </button>
            <button
              type="button"
              onClick={
                quantity < 20 ? () => setQuantity(quantity + 1) : undefined
              }
              disabled={quantity === 20}
              className="flex-1 h-6 bg-blue-500 hover:bg-blue-600 rounded disabled:bg-slate-400 active:bg-blue-300"
            >
              +
            </button>
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className=" border-2 rounded border-black text-black h-12 p-2 bg-white"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen food">Frozen Foods</option>
            <option value="canned good">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          className="border-2 rounded h-10 bg-blue-500  text-black hover:bg-blue-600 "
          type="submit"
        >
          +
        </button>
      </form>
    </main>
  );
}
