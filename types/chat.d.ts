import type { ChatCompletionRequestMessage } from 'openai';

export type MessageType = ChatCompletionRequestMessage & {
  id: string;
  createdAt: Date;
};

export type ChatType = {
  id: string;
  messages: MessageType[];
  label: string;
};
