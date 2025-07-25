// store/useAuthStore.ts
import { create } from "zustand";
import { LoginService } from "../auth/services/login.service";
import type { LoginModel } from "../auth/models/Login";

interface User {
  usuID: string;
  usuRole: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  checkLogin: () => Promise<void>;
  signin: (data: LoginModel) => Promise<void>;
  signout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  loginError: null,

  checkLogin: async () => {
    try {
      const res = await LoginService.profile();
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
      const res = await LoginService.login(data);
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
    LoginService.logout();
    set({ user: null, loading: false });
  },
}));
