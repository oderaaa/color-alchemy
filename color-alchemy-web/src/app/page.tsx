// src/app/page.tsx
"use client";

import React, { useEffect } from "react";
import InfoPanel from "@/components/ui/InfoPanel";
import TileGrid from "@/components/game/Grid";
import SettingsPanel from "@/components/ui/SettingsPanel";
import { useUIStore } from "@/store/slices/ui/useUIStore";
import { useGameStore } from "@/store/slices/game/useGameStore";
import { useAuthStore } from "@/store/slices/auth/useAuthStore";
import InitAuth from "./InitAuth";

const HomePage = () => {
  const { initGame, gameOver, gameResult } = useGameStore();
  const { isLightMode } = useUIStore();
  const { user } = useAuthStore();

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameOver && gameResult) {
      const timeout = setTimeout(() => {
        const again = window.confirm(
          gameResult === "win"
            ? "🎉 You won! Play again?"
            : "😞 You lost. Try again?"
        );
        if (again) initGame();
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [gameOver, gameResult, initGame]);

  return (
    <main
      className={`flex flex-col items-center min-h-screen px-4 transition-colors duration-300 ${
        isLightMode ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-3xl font-bold my-4">RGB Alchemy</h1>
      <InitAuth />
      <InfoPanel />
      <TileGrid />
      <SettingsPanel />
    </main>
  );
};

export default HomePage;
