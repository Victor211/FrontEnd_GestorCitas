export const conversationsKeys = {
  all: ["conversations"] as const,
  lists: () => [...conversationsKeys.all, "list"] as const,
  messagesRoot: () => [...conversationsKeys.all, "messages"] as const,
  messages: (conversationId: number) =>
    [...conversationsKeys.messagesRoot(), conversationId] as const,
};
