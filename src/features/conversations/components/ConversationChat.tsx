import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { FullScreenLoader } from "../../../components/feedback/FullScreenLoader";
import { useConversationMessages } from "../hooks/useConversationMessages";
import type { ConversationSummary } from "../types/conversation.types";
import { getConversationDisplayName } from "../utils/conversationDisplay";
import { MessageBubble } from "./MessageBubble";

interface ConversationChatProps {
  conversation: ConversationSummary;
  onBack?: () => void;
}

export function ConversationChat({ conversation, onBack }: ConversationChatProps) {
  const messagesQuery = useConversationMessages(conversation.id);
  const bottomRef = useRef<HTMLDivElement>(null);
  const displayName = getConversationDisplayName(conversation);
  const showPhoneSubtitle = conversation.customerName?.trim() && conversation.senderPhone;

  useEffect(() => {
    if (messagesQuery.isSuccess) {
      bottomRef.current?.scrollIntoView({ block: "end" });
    }
  }, [messagesQuery.isSuccess, messagesQuery.data]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {onBack && (
          <IconButton
            aria-label="Volver a la lista de conversaciones"
            onClick={onBack}
            edge="start"
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {displayName}
          </Typography>
          {showPhoneSubtitle && (
            <Typography variant="caption" color="text.secondary" noWrap>
              {conversation.senderPhone}
            </Typography>
          )}
        </Box>
      </Stack>

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messagesQuery.isPending && <FullScreenLoader />}

        {messagesQuery.isError && (
          <ErrorAlert
            title="No se pudieron cargar los mensajes"
            error={messagesQuery.error}
            onRetry={() => void messagesQuery.refetch()}
            isRetrying={messagesQuery.isFetching}
          />
        )}

        {messagesQuery.isSuccess && (
          <Stack spacing={1.5}>
            {messagesQuery.data.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={bottomRef} />
          </Stack>
        )}
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1,
          borderTop: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Modo solo lectura
        </Typography>
      </Box>
    </Box>
  );
}
