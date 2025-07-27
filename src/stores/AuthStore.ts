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
      const response = await LoginService.profile();
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  signin: async (data) => {
    try {
      const res = await LoginService.login(data);
      set({ user: res.data, loginError: null, loading: false });
    } catch (err) {
      set({ loginError: "Usuario o contraseña incorrectos", loading: false });

      setTimeout(() => {
        set({ loginError: null });
      }, 5000);
    }
  },

  signout: async () => {
    await LoginService.logout();
    set({ user: null, loading: false });
  },
}));
