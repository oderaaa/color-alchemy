import { StateCreator } from "zustand";
import { StoreState } from "@/store/types";
import { AuthSlice } from "./types";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  checkAuth as apiCheckAuth,
} from "@/api/auth/auth";

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null,
        },
      }));

      const { user } = await apiLogin({ email, password });

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user,
          loading: false,
        },
      }));

      return true;
    } catch (err: any) {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: err.message || "Login failed",
          loading: false,
        },
      }));
      return false;
    }
  },

  register: async (email, password, username) => {
    try {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null,
        },
      }));

      const { user } = await apiRegister({ email, password, username });

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user,
          loading: false,
        },
      }));

      return true;
    } catch (err: any) {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          error: err.message || "Registration failed",
          loading: false,
        },
      }));
      return false;
    }
  },

  logout: async () => {
    try {
      await apiLogout();
    } finally {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user: null,
        },
      }));
    }
  },

  checkAuth: async () => {
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        loading: true,
      },
    }));

    try {
      const { user } = await apiCheckAuth();

      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user,
          loading: false,
        },
      }));
    } catch {
      set((state) => ({
        ...state,
        auth: {
          ...state.auth,
          user: null,
          loading: false,
        },
      }));
    }
  },

  setError: (error) =>
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        error,
      },
    })),
});
