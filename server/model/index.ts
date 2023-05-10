import type { MessageType } from '../../types/chat';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Message = MessageType;
  }
}
