import { getInitials } from "../../../utils/getInitials";
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

// Paleta de avatares (fondo, texto) con contraste suficiente en ambos modos.
const AVATAR_COLORS = [
  { bg: "#DCEBFB", fg: "#0B4A8B" },
  { bg: "#DDF3E4", fg: "#1B5E33" },
  { bg: "#EDE4FA", fg: "#4C2A85" },
  { bg: "#FDEBD9", fg: "#8A4210" },
  { bg: "#D9F2F2", fg: "#0E5555" },
  { bg: "#FBE3EC", fg: "#8A1F4A" },
] as const;

export function getConversationAvatarColors(conversationId: number): { bg: string; fg: string } {
  return AVATAR_COLORS[Math.abs(conversationId) % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
}

export function getConversationInitials(
  conversation: Pick<ConversationSummary, "customerName">,
): string | null {
  const words = conversation.customerName?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (words.length === 0) {
    return null;
  }
  return getInitials(words[0], words.length > 1 ? words[words.length - 1] : null);
}
