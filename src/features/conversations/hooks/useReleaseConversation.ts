import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PageResponse } from "../../../api/types/page-response.types";
import { releaseConversation } from "../api/conversationsApi";
import { conversationsKeys } from "../api/conversationsKeys";
import type { ConversationSummary } from "../types/conversation.types";

type ConversationsListData = InfiniteData<PageResponse<ConversationSummary>>;

export function useReleaseConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: number) => releaseConversation(conversationId),
    onSuccess: (result) => {
      queryClient.setQueryData<ConversationsListData>(conversationsKeys.lists(), (old) => {
        if (!old) {
          return old;
        }

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((conversation) =>
              conversation.id === result.id
                ? { ...conversation, mode: result.mode }
                : conversation,
            ),
          })),
        };
      });
    },
  });
}
