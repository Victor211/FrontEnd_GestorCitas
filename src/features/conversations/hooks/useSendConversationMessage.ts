import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PageResponse } from "../../../api/types/page-response.types";
import { isApiError } from "../../../utils/getApiErrorMessage";
import { sendConversationMessage } from "../api/conversationsApi";
import { conversationsKeys } from "../api/conversationsKeys";
import type { ConversationMessage, ConversationSummary } from "../types/conversation.types";

type ConversationsListData = InfiniteData<PageResponse<ConversationSummary>>;

interface SendConversationMessageVariables {
  conversationId: number;
  content: string;
}

export function useSendConversationMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }: SendConversationMessageVariables) =>
      sendConversationMessage(conversationId, content),
    onSuccess: (message) => {
      queryClient.setQueryData<ConversationMessage[]>(
        conversationsKeys.messages(message.conversationId),
        (old) => (old ? [...old, message] : [message]),
      );

      queryClient.setQueryData<ConversationsListData>(conversationsKeys.lists(), (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((conversation) =>
              conversation.id === message.conversationId
                ? {
                    ...conversation,
                    lastMessageAt: message.createdAt,
                    lastMessagePreview: message.content,
                  }
                : conversation,
            ),
          })),
        };
      });
    },
    onError: (error) => {
      // La conversación pudo haber vuelto a BOT entre que se abrió el composer y se envió el
      // mensaje (carrera release/send). El backend es la fuente de verdad: refrescamos la lista
      // para que el mode actualizado oculte el composer.
      if (isApiError(error) && error.status === 409) {
        void queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      }
    },
  });
}
