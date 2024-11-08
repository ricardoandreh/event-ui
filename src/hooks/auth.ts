import { FormEvent, useCallback } from "react";
import toast from "react-hot-toast";
import { logout, selectAuth } from "../features/auth/authSlice";
import { fetchToken } from "../features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  const login = useCallback(async (formData: FormData) => {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      toast.error("Email e senha são obrigatórios!", {
        position: "top-right",
      });
      return;
    }

    try {
      await toast.promise(
        dispatch(fetchToken({ email, password })).unwrap(),
        {
          loading: "Logando...",
          success: "Login bem-sucedido!",
          error: (err) => err.message.detail,
        },
        { position: "top-right" }
      );
    } catch (err) {
      console.error("Erro no login:", err);
    }
  }, []);

  const handleLogoutSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(logout());
  }, []);

  return {
    login,
    logout: handleLogoutSubmit,
    hasAccess: !!auth?.token,
    isPending: auth?.isPending,
  };
}
