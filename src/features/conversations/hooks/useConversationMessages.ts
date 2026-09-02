import { useQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../api/conversationsApi";
import { conversationsKeys } from "../api/conversationsKeys";

export function useConversationMessages(conversationId: number | null) {
  return useQuery({
    queryKey: conversationsKeys.messages(conversationId ?? -1),
    queryFn: () => getConversationMessages(conversationId as number),
    enabled: conversationId !== null,
  });
}
