import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/paths";
import { login } from "../api/authApi";
import { useAuth } from "./useAuth";

export function useLogin() {
  const { loginSession } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (authResponse) => {
      loginSession(authResponse);
      navigate(ROUTES.HOME, { replace: true });
    },
  });
}
