import type { ChatCompletionRequestMessage } from 'openai';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type MessageType = ChatCompletionRequestMessage;
  }
}
