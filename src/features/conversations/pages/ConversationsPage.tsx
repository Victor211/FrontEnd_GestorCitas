import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { PageHeader } from "../../../components/layout/PageHeader";
import { ConversationChat } from "../components/ConversationChat";
import { ConversationList } from "../components/ConversationList";
import { useConversations } from "../hooks/useConversations";
import { useMarkConversationRead } from "../hooks/useMarkConversationRead";
import type { ConversationSummary } from "../types/conversation.types";

const PANEL_HEIGHT = "calc(100vh - 260px)";
const MIN_PANEL_HEIGHT = 420;

export function ConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);

  const conversationsQuery = useConversations();
  const markAsRead = useMarkConversationRead();

  // Se deriva de la cache de la lista (en vez de guardar el objeto seleccionado en el propio
  // estado) para que takeover/release/send, que actualizan esa cache, se reflejen de inmediato en
  // el chat abierto sin necesitar un refresh completo.
  const conversations = conversationsQuery.data?.pages.flatMap((page) => page.content) ?? [];
  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ?? null;

  const handleSelect = (conversation: ConversationSummary) => {
    setSelectedConversationId(conversation.id);
    if (conversation.unreadCount > 0) {
      markAsRead.mutate(conversation.id);
    }
  };

  return (
    <>
      <PageHeader
        title="Conversaciones"
        description="Historial de conversaciones de WhatsApp con tus clientes."
      />
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          height: PANEL_HEIGHT,
          minHeight: MIN_PANEL_HEIGHT,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 360 },
            flexShrink: 0,
            display: { xs: selectedConversation ? "none" : "block", md: "block" },
            borderRight: { md: "1px solid" },
            borderColor: "divider",
            height: "100%",
          }}
        >
          <ConversationList
            query={conversationsQuery}
            selectedConversationId={selectedConversation?.id ?? null}
            onSelect={handleSelect}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: { xs: selectedConversation ? "block" : "none", md: "block" },
            height: "100%",
          }}
        >
          {selectedConversation ? (
            <ConversationChat
              key={selectedConversation.id}
              conversation={selectedConversation}
              onBack={() => setSelectedConversationId(null)}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                p: 3,
                textAlign: "center",
              }}
            >
              <ChatOutlinedIcon sx={{ fontSize: 40 }} color="disabled" />
              <Typography variant="body1" color="text.secondary">
                Seleccioná una conversación para ver los mensajes.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}
