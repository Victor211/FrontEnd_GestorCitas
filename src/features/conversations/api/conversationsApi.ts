import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  ConversationFilters,
  ConversationMessage,
  ConversationReadResult,
  ConversationSummary,
} from "../types/conversation.types";

const MESSAGES_PAGE_SIZE = 50;

export async function getConversations(
  params: ConversationFilters,
): Promise<PageResponse<ConversationSummary>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<ConversationSummary>>>(
    "/api/conversations",
    { params },
  );
  return data.data;
}

// El endpoint ordena por createdAt ASC por defecto (página 0 = mensajes más antiguos). Pedimos
// createdAt DESC para traer los últimos MESSAGES_PAGE_SIZE mensajes y los reordenamos acá a
// cronológico ascendente, que es el orden que espera la UI de chat.
export async function getConversationMessages(
  conversationId: number,
): Promise<ConversationMessage[]> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<ConversationMessage>>>(
    `/api/conversations/${conversationId}/messages`,
    { params: { page: 0, size: MESSAGES_PAGE_SIZE, sort: "createdAt,desc" } },
  );
  return [...data.data.content].reverse();
}

export async function markConversationAsRead(
  conversationId: number,
): Promise<ConversationReadResult> {
  const { data } = await apiClient.put<ApiResponse<ConversationReadResult>>(
    `/api/conversations/${conversationId}/read`,
  );
  return data.data;
}
