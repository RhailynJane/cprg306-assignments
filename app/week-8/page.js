"use client";

import { useState } from "react";
import Link from "next/link";

// Import existing and new components
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  // New state to store selected item name for fetching meal ideas
  const [selectedItemName, setSelectedItemName] = useState("");

  // Handler for adding a new item
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  // Utility to clean item name (remove emojis, sizes, etc.)
  const cleanItemName = (name) => {
    const base = name.split(",")[0]; // Remove quantity/description
    return base
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      .trim();
  };

  // Handle click on an item
  const handleItemSelect = (item) => {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  };

  // Updated layout: NewItem + ItemList on left, MealIdeas on right
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Link href="./" className="text-cyan-700">
        Home
      </Link>
      <br />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping List
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Add & List Items */}
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        {/* Right Column: Meal Ideas */}
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
