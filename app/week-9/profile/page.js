"use client";

import React from "react";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function ProfilePage() {
  const { user } = useUserAuth();

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>User Profile</h1>

      {user.photoURL && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
          <img
            src={user.photoURL}
            alt="User profile"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        </div>
      )}

      <p>
        <strong>Name:</strong> {user.displayName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>UID:</strong> {user.uid}
      </p>

      <Link href="/week-9/shopping-list">
        <button style={{ marginTop: "2rem" }}>Back to Shopping List</button>
      </Link>
    </div>
  );
}
