// store/useAuthStore.ts
import { create } from "zustand";
import { login, logout, profile } from "../services/login.service";
import { User, LoginInput } from "../types/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  checkLogin: () => Promise<void>;
  signin: (data: LoginInput) => Promise<void>;
  signout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  loginError: null,

  checkLogin: async () => {
    try {
      const res = await profile();
      if (res.data) {
        set({ user: res.data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },

  signin: async (data) => {
    try {
      const res = await login(data);
      set({ user: res.data, loginError: null });
    } catch (err) {
      console.error(err);
      set({ loginError: "Usuario o contraseña incorrectos" });
      
      setTimeout(() => {
        set({ loginError: null });
      }, 5000);
    }
  },

  signout: () => {
    const result = logout();
    if (result) {
      set({ user: null, loading: false });
    }
  },
}));
