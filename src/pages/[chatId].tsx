import React, { useState, useEffect } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import localForage from 'localforage';
import type { ChatLabelType } from '@/components/ChatListArea';
import ChatListArea from '@/components/ChatListArea';
import ChatDisplayArea from '@/components/ChatDisplayArea';
import ChatInputArea from '@/components/ChatInputArea';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// eslint-disable-next-line react/function-component-definition, react/prop-types
const Chat: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ chatId }) => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [send, setSend] = useState<boolean>(false);

  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>([]);

  useEffect(() => {
    (async () => {
      const chatLabelStorage: ChatLabelType[] = await localForage.getItem('chatLabels') as ChatLabelType[];
      setChatLabels(chatLabelStorage);

      const chatStorage: ChatCompletionRequestMessage[] = await localForage.getItem(chatId) as ChatCompletionRequestMessage[];
      setMessages(chatStorage);
    })();
  }, [chatId]);

  const sendConversationRequest = async (chatContent: string) => {
    const newMessages: ChatCompletionRequestMessage[] = [
      ...messages,
      {
        role: 'user',
        content: chatContent,
      },
    ];

    setMessages(newMessages);
    setSend(true);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
    });

    if (completion.data.choices[0].message) {
      const updatedMessages: ChatCompletionRequestMessage[] = [
        ...newMessages,
        completion.data.choices[0].message,
      ];

      localForage.setItem(chatId, updatedMessages);

      setMessages(updatedMessages);
    }

    setSend(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <ChatListArea chatLabels={chatLabels} />
      <div style={{ height: '100%', width: 'calc(100vw - 260px)', position: 'relative' }}>
        <ChatDisplayArea
          sx={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%',
            p: {
              xs: '24px 14px 76px',
              sm: '24px 14px 76px',
              md: '24px 11vw 76px',
              lg: '24px 22vw 76px',
            },
            overflowY: 'auto',
          }}
          loading={send}
          messages={messages}
        />
        <ChatInputArea
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            p: '12px 4px',
            bottom: '12px',
            left: {
              xs: '14px',
              sm: '14px',
              md: '11vw',
              lg: '22vw',
            },
            right: {
              xs: '14px',
              sm: '14px',
              md: '11vw',
              lg: '22vw',
            },
          }}
          onSubmit={sendConversationRequest}
          disabledSubmit={send}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ chatId: string }, { chatId: string }> = async ({ params }) => ({
  props: { chatId: params!.chatId },
});

export default Chat;
