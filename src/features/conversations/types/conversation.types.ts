export type ConversationStatus = "ACTIVE" | "CLOSED";

export type ConversationMode = "BOT" | "HUMAN";

export type MessageDirection = "INBOUND" | "OUTBOUND";

export type MessageSenderType = "CUSTOMER" | "BOT" | "HUMAN" | "SYSTEM";

export type MessageType = "TEXT" | "IMAGE" | "AUDIO" | "DOCUMENT" | "OTHER";

export interface ConversationSummary {
  id: number;
  customerId: number | null;
  customerName: string | null;
  senderPhone: string;
  status: ConversationStatus;
  mode: ConversationMode;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  unreadCount: number;
}

export interface ConversationModeResult {
  id: number;
  mode: ConversationMode;
}

export interface ConversationMessage {
  id: number;
  conversationId: number;
  direction: MessageDirection;
  senderType: MessageSenderType;
  messageType: MessageType;
  content: string;
  createdAt: string;
}

export interface ConversationReadResult {
  id: number;
  unreadCount: number;
}

export interface ConversationFilters {
  page: number;
  size: number;
}
