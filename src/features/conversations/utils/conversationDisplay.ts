import type { ConversationMode, ConversationSummary } from "../types/conversation.types";

export function getConversationDisplayName(
  conversation: Pick<ConversationSummary, "customerName" | "senderPhone">,
): string {
  const trimmedName = conversation.customerName?.trim();
  return trimmedName ? trimmedName : conversation.senderPhone;
}

export function getConversationPreview(
  conversation: Pick<ConversationSummary, "lastMessagePreview">,
): string {
  return conversation.lastMessagePreview?.trim() || "Sin mensajes todavía";
}

export function getConversationModeLabel(mode: ConversationMode): string {
  return mode === "HUMAN" ? "Atención humana" : "Bot activo";
}
