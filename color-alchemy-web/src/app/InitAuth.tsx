"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/slices/auth/useAuthStore";

const InitAuth = () => {
  const { checkAuth } = useAuthStore();
  console.log("✅ InitAuth component is loaded");

  useEffect(() => {
    checkAuth(); // 🔁 on app load, restore session if cookie is valid
  }, [checkAuth]);

  return null;
};

export default InitAuth;
