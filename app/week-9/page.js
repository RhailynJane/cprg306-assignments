"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
      router.push("/week-9/shopping-list"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/week-9/shopping-list");
    }
  }, [user, router]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to the Shopping List App</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with GitHub</button>
      ) : (
        <div>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>
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
          <br />
          <button onClick={handleLogout}>Logout</button>
          <br />
          <Link href="/week-9/shopping-list">
            <button style={{ marginTop: "1rem" }}>Go to Shopping List</button>
          </Link>
        </div>
      )}
    </div>
  );
}
