import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import Box from '@mui/material/Box';
import { v4 as uuid } from 'uuid';
import services from '../../services';
import type { MessageType } from '../../types/chat';
import ChatInputArea from '@/components/ChatInputArea';
import ChatDisplayArea from '@/components/ChatDisplayArea';
import ChatListArea from '@/components/ChatListArea';
import type { ChatLabelType } from '@/hooks/useChatLabels';
import useChatLabels from '@/hooks/useChatLabels';
import type { UserType } from '@/hooks/useUser';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ChatLayoutProps = {
  initialChatLabels: ChatLabelType[];
  initialMessages: MessageType[];
  initialChatId: string;
  user: UserType;
};

function ChatLayout({ initialChatLabels, initialMessages, initialChatId, user }: ChatLayoutProps): JSX.Element {
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [chatId, setChatId] = useState<string>(initialChatId);

  const { chatLabels, addChatLabel } = useChatLabels(initialChatLabels);

  useEffect(() => {
    setChatId(initialChatId);
    setMessages(initialMessages);
  }, [initialChatId, initialMessages]);

  const sendConversationRequest = async (chatContent: string): Promise<void> => {
    const newMessages: MessageType[] = [
      ...messages,
      {
        role: 'user',
        content: chatContent,
        createdAt: new Date(),
        id: uuid(),
      },
    ];

    setMessages(newMessages);
    setIsSendingMessage(true);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: newMessages.map((message) => {
        return {
          role: message.role,
          content: message.content,
        };
      }),
    });

    if (completion.data.choices[0].message) {
      const updatedMessages: MessageType[] = [
        ...newMessages,
        {
          ...completion.data.choices[0].message,
          createdAt: new Date(),
          id: uuid(),
        },
      ];

      if (!chatId) {
        const { success, data } = await services.createChat({ userId: user.id.toString(), messages: updatedMessages });

        if (success && data) {
          const newChatLabel: ChatLabelType = { id: data.id, label: data.label };
          addChatLabel(newChatLabel);
          setChatId(data.id);
        }
      } else {
        await services.updateChat({ id: chatId, messages: updatedMessages });
      }

      setMessages(updatedMessages);
    }

    setIsSendingMessage(false);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      sx={{
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
          lg: 'row',
          xl: 'row',
        },
      }}
    >
      <ChatListArea chatLabels={chatLabels} />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="100%"
        sx={{
          maxWidth: {
            xs: '100vw',
            sm: '100vw',
            md: 'calc(100vw - 256px)',
            lg: 'calc(100vw - 256px)',
            xl: 'calc(100vw - 256px)',
          },
        }}
      >
        <ChatDisplayArea loading={isSendingMessage} messages={messages} />
        <ChatInputArea onSubmit={sendConversationRequest} disabledSubmit={isSendingMessage} />
      </Box>
    </Box>
  );
}

export default ChatLayout;
