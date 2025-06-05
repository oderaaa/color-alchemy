"use client";

import { useState, useCallback } from "react";
import AuthForm from "../auth/AuthForm";
import { useAuthStore } from "@/store/slices/auth/useAuthStore";

const SettingsPanel = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const { user, login, register, logout, error, loading } = useAuthStore();

  const handleAuthClick = useCallback(() => {
    if (user) {
      logout();
    } else {
      setShowAuthForm(true);
    }
  }, [user, logout]);

  const handleAuthSubmit = async (data: {
    email: string;
    password: string;
    username?: string;
  }) => {
    let success = false;

    if (authMode === "register" && data.username) {
      success = await register(data.email, data.password, data.username);
    } else {
      success = await login(data.email, data.password);
    }

    if (success) {
      setShowAuthForm(false);
      setAuthMode("login");
    }
  };

  const handleToggleMode = () => {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-8 rounded-lg shadow-lg">
      <div className="space-y-4">
        {user && <p className="text-blue-700">Welcome {user.username}</p>}

        <p className="text-gray-700">
          Percentage %:{" "}
          {user?.stats?.wins && user?.stats?.losses
            ? (
                (user.stats.wins / (user.stats.wins + user.stats.losses)) *
                100
              ).toFixed(1)
            : "-"}
        </p>
        <p className="text-gray-700">Wins: {user?.stats?.wins || 0}</p>
        <p className="text-gray-700">Losses: {user?.stats?.losses || 0}</p>

        <button
          onClick={handleAuthClick}
          className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {user ? "Logout" : "Login"}
        </button>
      </div>

      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <AuthForm
              mode={authMode}
              onSubmit={handleAuthSubmit}
              onToggleMode={handleToggleMode}
              isLoading={loading}
              error={error}
            />
            <button
              onClick={() => setShowAuthForm(false)}
              className="mt-4 w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
