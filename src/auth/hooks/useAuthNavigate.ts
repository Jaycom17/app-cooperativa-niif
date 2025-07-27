import { useAuthStore } from "../../stores/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthNavigate() {
  const { user, checkLogin } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkLogin();

      if (!user) return;

      if (user.usuRole === "professor") {
        navigate("/professor");
      } else if (user.usuRole === "admin") {
        navigate("/admin");
      }
    };

    initializeAuth();
  }, [user, navigate]);
}
