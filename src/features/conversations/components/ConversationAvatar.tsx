import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import { Avatar, Badge } from "@mui/material";
import type { ConversationSummary } from "../types/conversation.types";
import {
  getConversationAvatarColors,
  getConversationInitials,
} from "../utils/conversationDisplay";

interface ConversationAvatarProps {
  conversation: Pick<ConversationSummary, "id" | "customerName" | "mode">;
  size?: number;
  showHumanIndicator?: boolean;
}

export function ConversationAvatar({
  conversation,
  size = 44,
  showHumanIndicator = false,
}: ConversationAvatarProps) {
  const initials = getConversationInitials(conversation);
  const colors = getConversationAvatarColors(conversation.id);

  const avatar = (
    <Avatar
      aria-hidden="true"
      sx={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        bgcolor: colors.bg,
        color: colors.fg,
      }}
    >
      {initials ?? <PersonOutlineIcon sx={{ fontSize: size * 0.55 }} />}
    </Avatar>
  );

  if (!showHumanIndicator || conversation.mode !== "HUMAN") {
    return avatar;
  }

  return (
    <Badge
      overlap="circular"
      variant="dot"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "& .MuiBadge-badge": {
          bgcolor: "warning.main",
          width: 13,
          height: 13,
          borderRadius: "50%",
          border: "2px solid",
          borderColor: "background.paper",
        },
      }}
    >
      {avatar}
    </Badge>
  );
}
