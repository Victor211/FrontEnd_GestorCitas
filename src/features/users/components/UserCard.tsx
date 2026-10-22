import { Avatar, Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { ManagedUser } from "../types/user.types";
import { getRoleLabel } from "../utils/userDisplay";
import { UserStatusAction } from "./UserStatusAction";

interface UserCardProps {
  user: ManagedUser;
  isCurrentUser: boolean;
  onToggleStatus: (user: ManagedUser) => void;
}

export function UserCard({ user, isCurrentUser, onToggleStatus }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
            {getInitials(user.firstName, user.lastName)}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {fullName}
                {isCurrentUser && " (vos)"}
              </Typography>
              <Chip
                label={user.active ? "Activo" : "Inactivo"}
                color={user.active ? "success" : "default"}
                size="small"
                variant="outlined"
              />
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, overflowWrap: "anywhere" }}
            >
              {user.email}
            </Typography>
            <Chip
              label={getRoleLabel(user.role)}
              size="small"
              variant="outlined"
              color={user.role === "OWNER" ? "primary" : "default"}
              sx={{ mt: 1 }}
            />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <UserStatusAction
            user={user}
            isCurrentUser={isCurrentUser}
            onToggle={onToggleStatus}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
