import React, { useState, useEffect } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import localForage from 'localforage';
import type { ChatLabelType } from '@/components/ChatListArea';
import ChatLayout from '@/components/ChatLayout';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Chat({ chatId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>([]);

  useEffect(() => {
    (async () => {
      const chatLabelStorage: ChatLabelType[] = (await localForage.getItem('chatLabels')) as ChatLabelType[];
      setChatLabels(chatLabelStorage);

      const chatStorage: ChatCompletionRequestMessage[] = (await localForage.getItem(chatId)) as ChatCompletionRequestMessage[];
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
    setIsSendingMessage(true);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: newMessages,
    });

    if (completion.data.choices[0].message) {
      const updatedMessages: ChatCompletionRequestMessage[] = [...newMessages, completion.data.choices[0].message];

      localForage.setItem(chatId, updatedMessages);

      setMessages(updatedMessages);
    }

    setIsSendingMessage(false);
  };

  return <ChatLayout chatLabels={chatLabels} sendingMessage={isSendingMessage} messages={messages} sendConversationRequest={sendConversationRequest} />;
}

export const getServerSideProps: GetServerSideProps<{ chatId: string }, { chatId: string }> = async ({ params }) => ({
  props: { chatId: params!.chatId },
});

export default Chat;
