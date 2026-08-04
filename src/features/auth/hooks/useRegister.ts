import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/paths";
import { register } from "../api/authApi";
import { useAuth } from "./useAuth";

export function useRegister() {
  const { loginSession } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (authResponse) => {
      loginSession(authResponse);
      navigate(ROUTES.HOME, { replace: true });
    },
  });
}
