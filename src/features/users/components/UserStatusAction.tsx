import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import { IconButton, Tooltip } from "@mui/material";
import type { ManagedUser } from "../types/user.types";

interface UserStatusActionProps {
  user: ManagedUser;
  isCurrentUser: boolean;
  onToggle: (user: ManagedUser) => void;
}

export function UserStatusAction({ user, isCurrentUser, onToggle }: UserStatusActionProps) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const label = user.active ? "Desactivar usuario" : "Activar usuario";

  // El backend también lo rechaza (409); aquí solo se evita el intento.
  const blocked = isCurrentUser && user.active;

  return (
    <Tooltip title={blocked ? "No podés desactivar tu propia cuenta" : label}>
      {/* El span permite mostrar el tooltip aunque el botón esté deshabilitado */}
      <span>
        <IconButton
          aria-label={`${label}: ${fullName}`}
          onClick={() => onToggle(user)}
          disabled={blocked}
          size="small"
          color={user.active ? "default" : "success"}
        >
          {user.active ? (
            <BlockOutlinedIcon fontSize="small" />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
}
