import { Box, Typography } from "@mui/material";
import type { ConversationMessage } from "../types/conversation.types";
import { formatMessageTime } from "../utils/conversationDate";

interface MessageBubbleProps {
  message: ConversationMessage;
}

const SENDER_LABELS: Record<ConversationMessage["senderType"], string> = {
  CUSTOMER: "Cliente",
  BOT: "Bot",
  SYSTEM: "Sistema",
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutbound = message.direction === "OUTBOUND";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isOutbound ? "flex-end" : "flex-start",
      }}
    >
      <Box sx={{ maxWidth: "75%" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            textAlign: isOutbound ? "right" : "left",
            mb: 0.25,
          }}
        >
          {SENDER_LABELS[message.senderType]}
        </Typography>
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 2,
            bgcolor: isOutbound
              ? "primary.main"
              : (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.200"),
            color: isOutbound ? "primary.contrastText" : "text.primary",
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {message.content}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: isOutbound ? "right" : "left", mt: 0.25 }}
        >
          {formatMessageTime(message.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}
