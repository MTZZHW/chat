import React, { useEffect, useState } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import Box from '@mui/material/Box';
import services from '../../services';
import Layout from './Layout';
import ChatInputArea from '@/components/ChatInputArea';
import ChatDisplayArea from '@/components/ChatDisplayArea';
import ChatListArea from '@/components/ChatListArea';
import type { ChatLabelType } from '@/hooks/useChatLabels';
import useChatLabels from '@/hooks/useChatLabels';
import useUser from '@/hooks/useUser';
import useRouterQuery from '@/hooks/useRouterQuery';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function ChatLayout(): JSX.Element {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const { user } = useUser();
  const { chatLabels, addChatLabel } = useChatLabels();

  const [chatId, setChatId] = useRouterQuery();

  useEffect(() => {
    (async (): Promise<void> => {
      if (chatId) {
        const { success, data } = await services.fetchChatDetail({ id: chatId });
        if (success && data) {
          setMessages(data.messages);
        }
      }
    })();
  }, [chatId]);

  const sendConversationRequest = async (chatContent: string): Promise<void> => {
    const newMessages: ChatCompletionRequestMessage[] = [
      ...messages,
      {
        role: 'user',
        content: chatContent,
      },
    ];

    setMessages(newMessages);
    setIsSendingMessage(true);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
    });

    if (completion.data.choices[0].message) {
      const updatedMessages: ChatCompletionRequestMessage[] = [...newMessages, completion.data.choices[0].message];

      if (!chatId) {
        console.log(chatId);
        const { success, data } = await services.createChat({ userId: user.id, messages: updatedMessages });

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
    <Layout title={`${chatId ? chatId + ' | ' : 'New Chat | '}Chat`}>
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
    </Layout>
  );
}

export default ChatLayout;
