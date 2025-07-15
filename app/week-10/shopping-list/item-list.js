"use client";

import React, { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect, onItemDelete }) {
  const [sortBy, setSortBy] = useState("name");

  // Create a sorted copy of items based on the selected sort key
  const sortedItems = [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === "string" && typeof bVal === "string") {
      const nameA = aVal.toUpperCase();
      const nameB = bVal.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else {
      return (a.id ?? 0) - (b.id ?? 0);
    }
  });

  // Group items by category without mutating the original array
  const groupedItems = items.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  // Sort categories and items within each category
  const sortedGroupedCategories = Object.keys(groupedItems).sort();

  const sortedGroupedItems = sortedGroupedCategories.reduce((acc, category) => {
    acc[category] = [...groupedItems[category]].sort((a, b) => {
      const nameA = a.name?.toUpperCase() ?? "";
      const nameB = b.name?.toUpperCase() ?? "";
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    return acc;
  }, {});

  return (
    <div className="p-4">
      {/* Sort Buttons */}
      <div className="mb-4 space-x-2 text-center">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded ${sortBy === "name" ? "bg-blue-500 text-black" : "bg-gray-200 text-black"}`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded ${sortBy === "category" ? "bg-blue-500 text-black" : "bg-gray-200 text-black"}`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("grouped")}
          className={`px-4 py-2 rounded ${sortBy === "grouped" ? "bg-blue-500 text-black" : "bg-gray-200 text-black"}`}
        >
          Group by Category
        </button>
      </div>

      {/* Render Items */}
      {sortBy === "grouped" ? (
        <ul className="space-y-4 text-center">
          {sortedGroupedCategories.map((category) => (
            <li key={category}>
              <h2 className="text-lg font-semibold capitalize mb-2">{category}</h2>
              <ul className="space-y-1">
                {sortedGroupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                    onSelect={onItemSelect}
                    onDelete={() => onItemDelete(item.id)}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={onItemSelect}
              onDelete={() => onItemDelete(item.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}