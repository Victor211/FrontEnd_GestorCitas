import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Box, Button, List } from "@mui/material";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import type { useConversations } from "../hooks/useConversations";
import type { ConversationSummary } from "../types/conversation.types";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationsListSkeleton } from "./ConversationsListSkeleton";

interface ConversationListProps {
  query: ReturnType<typeof useConversations>;
  selectedConversationId: number | null;
  onSelect: (conversation: ConversationSummary) => void;
}

export function ConversationList({ query, selectedConversationId, onSelect }: ConversationListProps) {
  const conversations = query.data?.pages.flatMap((page) => page.content) ?? [];
  const isEmpty = query.isSuccess && conversations.length === 0;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {query.isPending && <ConversationsListSkeleton />}

        {query.isError && (
          <Box sx={{ p: 2 }}>
            <ErrorAlert
              title="No se pudieron cargar las conversaciones"
              error={query.error}
              onRetry={() => void query.refetch()}
              isRetrying={query.isFetching}
            />
          </Box>
        )}

        {isEmpty && (
          <Box sx={{ p: 2 }}>
            <EmptyState
              icon={<ChatOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />}
              title="No hay conversaciones todavía."
              description="Cuando un cliente escriba por WhatsApp, aparecerá acá."
            />
          </Box>
        )}

        {conversations.length > 0 && (
          <List disablePadding aria-label="Conversaciones">
            {conversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                selected={conversation.id === selectedConversationId}
                onSelect={onSelect}
              />
            ))}
          </List>
        )}
      </Box>

      {query.hasNextPage && (
        <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
          <Button
            fullWidth
            variant="text"
            onClick={() => void query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
          >
            {query.isFetchingNextPage ? "Cargando..." : "Cargar más"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
