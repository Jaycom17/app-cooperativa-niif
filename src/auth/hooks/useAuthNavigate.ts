import { useAuthStore } from "../../stores/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useAuthNavigate() {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      console.log(user)
        if (!user) return;

        if (user.usuRole === "profesor") {
            navigate("/professor");
        } else if (user.usuRole === "admin") {
            navigate("/admin");
        }
    };

    initializeAuth();
  }, [user, navigate]);
}