import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Box, Chip, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import type { ConversationSummary } from "../types/conversation.types";
import {
  getConversationDisplayName,
  getConversationModeLabel,
  getConversationPreview,
} from "../utils/conversationDisplay";
import { formatConversationListTime } from "../utils/conversationDate";
import { ConversationAvatar } from "./ConversationAvatar";

interface ConversationListItemProps {
  conversation: ConversationSummary;
  selected: boolean;
  onSelect: (conversation: ConversationSummary) => void;
}

export function ConversationListItem({
  conversation,
  selected,
  onSelect,
}: ConversationListItemProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <ListItem disablePadding sx={{ px: 0.75, py: 0.25 }}>
      <ListItemButton
        selected={selected}
        onClick={() => onSelect(conversation)}
        aria-current={selected ? "true" : undefined}
        sx={{ alignItems: "flex-start", gap: 1.5, py: 1.5, px: 1.25, borderRadius: 3 }}
      >
        <ConversationAvatar conversation={conversation} showHumanIndicator />
        <Stack sx={{ width: "100%", minWidth: 0 }} spacing={0.375}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ fontWeight: hasUnread ? 700 : 600, minWidth: 0 }}
            >
              {getConversationDisplayName(conversation)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                ml: 1,
                color: hasUnread ? "primary.main" : "text.secondary",
                fontWeight: hasUnread ? 700 : 400,
              }}
            >
              {formatConversationListTime(conversation.lastMessageAt)}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                minWidth: 0,
                fontSize: 13,
                color: hasUnread ? "text.primary" : "text.secondary",
                fontWeight: hasUnread ? 600 : 400,
              }}
            >
              {getConversationPreview(conversation)}
            </Typography>
            {hasUnread && (
              <Box
                aria-label={`${conversation.unreadCount} mensajes sin leer`}
                sx={{
                  flexShrink: 0,
                  ml: 1,
                  minWidth: 20,
                  height: 20,
                  px: 0.75,
                  borderRadius: 10,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {conversation.unreadCount}
              </Box>
            )}
          </Stack>
          {conversation.mode === "HUMAN" && (
            <Chip
              icon={<SupportAgentOutlinedIcon />}
              label={getConversationModeLabel(conversation.mode)}
              size="small"
              sx={{
                alignSelf: "flex-start",
                mt: 0.25,
                height: 22,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(237,108,2,0.18)" : "#FFF4E5",
                color: (theme) => (theme.palette.mode === "dark" ? "#FFB74D" : "#8A4210"),
                "& .MuiChip-icon": { color: "inherit", fontSize: 14, ml: 0.75 },
                "& .MuiChip-label": { px: 0.75, fontSize: 11 },
              }}
            />
          )}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
