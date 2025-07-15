"use client";

import { useEffect, useState } from "react";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function ShoppingListPage() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      router.push("/week-9");
    }
  }, [user, router]);

  // Load items from Firestore
  useEffect(() => {
    const loadItems = async () => {
      if (!user) return;
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    };
    loadItems();
  }, [user]);

  const handleLogout = async () => {
    await firebaseSignOut();
    router.push("/week-9");
  };

  const handleAddItem = async (newItem) => {
    if (!user) return;
    const id = await addItem(user.uid, newItem);
    setItems((prevItems) => [...prevItems, { id, ...newItem }]);
  };

  const cleanItemName = (name) => {
    const base = name.split(",")[0];
    return base
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      .trim();
  };

  const handleItemSelect = (item) => {
    const cleaned = cleanItemName(item.name);
    setSelectedItemName(cleaned);
  };

  const handleDeleteItem = async (itemId) => {
    if (!user) return;
    await deleteItem(user.uid, itemId);
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Prevent rendering if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <Link href="/" className="text-cyan-700">
          Home
        </Link>
        <div className="space-x-4">
          <Link href="/week-9/profile" className="text-cyan-700">
            Profile
          </Link>
          <button onClick={handleLogout} className="text-red-600">
            Logout
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Shopping List
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onItemDelete={handleDeleteItem}
          />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
