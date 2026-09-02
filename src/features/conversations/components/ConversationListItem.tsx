import { Box, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import type { ConversationSummary } from "../types/conversation.types";
import { getConversationDisplayName, getConversationPreview } from "../utils/conversationDisplay";
import { formatConversationListTime } from "../utils/conversationDate";

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
    <ListItem disablePadding divider>
      <ListItemButton
        selected={selected}
        onClick={() => onSelect(conversation)}
        aria-current={selected ? "true" : undefined}
        sx={{ alignItems: "flex-start", py: 1.5 }}
      >
        <Stack sx={{ width: "100%", minWidth: 0 }} spacing={0.25}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{ fontWeight: hasUnread ? 700 : 600, minWidth: 0 }}
            >
              {getConversationDisplayName(conversation)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, ml: 1 }}>
              {formatConversationListTime(conversation.lastMessageAt)}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ minWidth: 0, fontWeight: hasUnread ? 600 : 400 }}
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
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
