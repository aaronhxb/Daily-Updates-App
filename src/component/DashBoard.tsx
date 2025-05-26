"use client";
import { useEffect, useState } from "react";
import { SignIn } from "./SignIn";
import { Updates } from "./Updates";
import { SubmitUpdate } from "./SubmitUpdate";

export function DashBoard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    if (user) {
      setIsLoggedIn(true);
      setUserId(user)
      console.log("user id is ", userId)
    }
  }, []);

  const handleSignIn = () => {
    const user = localStorage.getItem("userId");
    if (user) {
      setUserId(user);
      setIsLoggedIn(true);
      console.log("user id is ", user)
    }
  }
  
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  }

  return (
    <div>
      {isLoggedIn && userId ? (
        <>
          <Updates userId={userId} onLogout={handleLogout} />
          <SubmitUpdate userId={userId}/>
        </>
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
    </div>
  );
}
