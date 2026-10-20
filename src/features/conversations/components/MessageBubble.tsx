import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { alpha, Box, Stack, Typography } from "@mui/material";
import type { ConversationMessage } from "../types/conversation.types";
import { formatMessageTime } from "../utils/conversationDate";

interface MessageBubbleProps {
  message: ConversationMessage;
  // Los mensajes seguidos del mismo remitente se agrupan: el remitente se muestra solo en el
  // primero y la hora solo en el último, para reducir ruido visual.
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
}

const SENDER_LABELS: Record<ConversationMessage["senderType"], string> = {
  CUSTOMER: "Cliente",
  BOT: "Bot",
  HUMAN: "Vos",
  SYSTEM: "Sistema",
};

export function MessageBubble({
  message,
  isFirstInGroup = true,
  isLastInGroup = true,
}: MessageBubbleProps) {
  if (message.senderType === "SYSTEM") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1.75 }}>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            alignItems: "center",
            px: 1.5,
            py: 0.625,
            borderRadius: 999,
            maxWidth: "85%",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "rgba(237,108,2,0.18)" : "#FFF4E5",
            color: (theme) => (theme.palette.mode === "dark" ? "#FFB74D" : "#8A4210"),
          }}
        >
          <SupportAgentOutlinedIcon sx={{ fontSize: 14 }} aria-hidden="true" />
          <Typography variant="caption" sx={{ fontWeight: 500, whiteSpace: "pre-wrap" }}>
            {message.content}
          </Typography>
        </Stack>
      </Box>
    );
  }

  const isOutbound = message.direction === "OUTBOUND";
  const isBot = message.senderType === "BOT";
  const isHuman = message.senderType === "HUMAN";
  const showSender = isFirstInGroup && message.senderType !== "CUSTOMER";

  const largeRadius = 16;
  const smallRadius = 6;
  const borderRadius = isOutbound
    ? `${largeRadius}px ${isFirstInGroup ? largeRadius : smallRadius}px ${isLastInGroup ? largeRadius : smallRadius}px ${largeRadius}px`
    : `${isFirstInGroup ? largeRadius : smallRadius}px ${largeRadius}px ${largeRadius}px ${isLastInGroup ? largeRadius : smallRadius}px`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isOutbound ? "flex-end" : "flex-start",
        mt: isFirstInGroup ? 1.75 : 0.375,
      }}
    >
      {showSender && (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: "center", mx: 0.5, mb: 0.5, color: "text.secondary" }}
        >
          {isBot && <SmartToyOutlinedIcon sx={{ fontSize: 14 }} aria-hidden="true" />}
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {SENDER_LABELS[message.senderType]}
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          maxWidth: { xs: "85%", sm: "70%" },
          px: 1.625,
          py: 1.125,
          borderRadius,
          border: "1px solid",
          bgcolor: (theme) => {
            if (isHuman) return theme.palette.primary.main;
            if (isBot) return alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.18 : 0.1);
            return theme.palette.background.paper;
          },
          borderColor: (theme) => {
            if (isHuman) return theme.palette.primary.main;
            if (isBot) return alpha(theme.palette.primary.main, 0.25);
            return theme.palette.divider;
          },
          color: isHuman ? "primary.contrastText" : "text.primary",
        }}
      >
        <Typography
          variant="body2"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.45 }}
        >
          {message.content}
        </Typography>
      </Box>
      {isLastInGroup && (
        <Typography variant="caption" color="text.secondary" sx={{ mx: 0.5, mt: 0.5, fontSize: 11 }}>
          {formatMessageTime(message.createdAt)}
        </Typography>
      )}
    </Box>
  );
}
