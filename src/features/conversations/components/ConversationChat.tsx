import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { FullScreenLoader } from "../../../components/feedback/FullScreenLoader";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useConversationMessages } from "../hooks/useConversationMessages";
import { useReleaseConversation } from "../hooks/useReleaseConversation";
import { useSendConversationMessage } from "../hooks/useSendConversationMessage";
import { useTakeoverConversation } from "../hooks/useTakeoverConversation";
import type { ConversationSummary } from "../types/conversation.types";
import { getConversationDisplayName, getConversationModeLabel } from "../utils/conversationDisplay";
import { MessageBubble } from "./MessageBubble";

const MESSAGE_MAX_LENGTH = 4096;

interface ConversationChatProps {
  conversation: ConversationSummary;
  onBack?: () => void;
}

export function ConversationChat({ conversation, onBack }: ConversationChatProps) {
  const messagesQuery = useConversationMessages(conversation.id);
  const takeoverMutation = useTakeoverConversation();
  const releaseMutation = useReleaseConversation();
  const sendMutation = useSendConversationMessage();

  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false);
  const [content, setContent] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageIdRef = useRef<number | null>(null);
  const displayName = getConversationDisplayName(conversation);
  const showPhoneSubtitle = conversation.customerName?.trim() && conversation.senderPhone;
  const isHuman = conversation.mode === "HUMAN";

  useEffect(() => {
    if (!messagesQuery.isSuccess) {
      return;
    }

    // Con polling, messagesQuery.data cambia de referencia en cada refetch aunque el contenido
    // sea igual. Solo hacemos scroll cuando realmente llegó un mensaje nuevo (cambia el último
    // id), para no interrumpir al operador cada 3 segundos.
    const messages = messagesQuery.data;
    const lastMessageId = messages.at(-1)?.id ?? null;

    if (lastMessageId !== lastMessageIdRef.current) {
      lastMessageIdRef.current = lastMessageId;
      bottomRef.current?.scrollIntoView({ block: "end" });
    }
  }, [messagesQuery.isSuccess, messagesQuery.data]);

  const handleTakeover = () => {
    takeoverMutation.mutate(conversation.id);
  };

  const handleCloseReleaseDialog = () => {
    if (releaseMutation.isPending) {
      return;
    }
    releaseMutation.reset();
    setReleaseDialogOpen(false);
  };

  const handleConfirmRelease = () => {
    releaseMutation.mutate(conversation.id, {
      onSuccess: () => setReleaseDialogOpen(false),
    });
  };

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed || sendMutation.isPending) {
      return;
    }

    sendMutation.mutate(
      { conversationId: conversation.id, content: trimmed },
      {
        onSuccess: () => {
          setContent("");
          requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ block: "end" }));
        },
      },
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", minWidth: 0 }}>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: 1,
          rowGap: 1,
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
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {displayName}
          </Typography>
          {showPhoneSubtitle && (
            <Typography variant="caption" color="text.secondary" noWrap>
              {conversation.senderPhone}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          <Chip
            icon={isHuman ? <SupportAgentOutlinedIcon /> : <SmartToyOutlinedIcon />}
            label={getConversationModeLabel(conversation.mode)}
            size="small"
            color={isHuman ? "warning" : "default"}
            variant={isHuman ? "filled" : "outlined"}
          />
          {isHuman ? (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setReleaseDialogOpen(true)}
              disabled={releaseMutation.isPending}
            >
              Devolver al bot
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              onClick={handleTakeover}
              disabled={takeoverMutation.isPending}
              startIcon={
                takeoverMutation.isPending ? (
                  <CircularProgress size={14} color="inherit" />
                ) : undefined
              }
            >
              Tomar conversación
            </Button>
          )}
        </Stack>
      </Stack>

      {takeoverMutation.isError && (
        <Alert
          severity="error"
          role="alert"
          sx={{ mx: 2, mt: 1.5 }}
          onClose={() => takeoverMutation.reset()}
        >
          {getApiErrorMessage(takeoverMutation.error)}
        </Alert>
      )}

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

      {isHuman ? (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <TextField
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Escribí un mensaje..."
            aria-label="Mensaje para el cliente"
            multiline
            minRows={1}
            maxRows={5}
            fullWidth
            size="small"
            disabled={sendMutation.isPending}
            slotProps={{ htmlInput: { maxLength: MESSAGE_MAX_LENGTH } }}
            error={sendMutation.isError}
            helperText={sendMutation.isError ? getApiErrorMessage(sendMutation.error) : undefined}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={content.trim().length === 0 || sendMutation.isPending}
            endIcon={
              sendMutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{ flexShrink: 0 }}
          >
            Enviar
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Tomá la conversación para responder manualmente.
          </Typography>
        </Box>
      )}

      <ConfirmDialog
        open={releaseDialogOpen}
        title="Devolver al bot"
        description="¿Querés devolver esta conversación al bot? El próximo mensaje del cliente volverá a ser procesado automáticamente."
        confirmLabel="Devolver al bot"
        cancelLabel="Cancelar"
        loading={releaseMutation.isPending}
        error={releaseMutation.isError ? getApiErrorMessage(releaseMutation.error) : null}
        onConfirm={handleConfirmRelease}
        onClose={handleCloseReleaseDialog}
      />
    </Box>
  );
}
