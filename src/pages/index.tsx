import React, { useState, useEffect } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuid } from 'uuid';
import localForage from 'localforage';
import type { ChatLabelType } from '@/components/ChatListArea';
import ChatLayout from '@/components/ChatLayout';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const [chatId, setChatId] = useState<string>('');
  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>([]);

  useEffect(() => {
    (async () => {
      let chatLabelStorage: ChatLabelType[] | null;
      try {
        chatLabelStorage = await localForage.getItem('chatLabels');
      } catch {
        chatLabelStorage = [];
      }

      setChatLabels([...chatLabelStorage!]);
    })();
  }, []);

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

      if (chatId) {
        localForage.setItem(chatId, updatedMessages);
      } else {
        const newUuid = uuid();
        localForage.setItem(newUuid, updatedMessages);
        setChatId(newUuid);

        const newChatLabel: ChatLabelType = {
          uid: newUuid,
          label: newUuid,
        };
        if (chatLabels) {
          localForage.setItem('chatLabels', [...chatLabels, newChatLabel]);
          setChatLabels([...chatLabels, newChatLabel]);
        } else {
          localForage.setItem('chatLabels', [newChatLabel]);
          setChatLabels([newChatLabel]);
        }
      }

      setMessages(updatedMessages);
    }

    setIsSendingMessage(false);
  };

  return <ChatLayout chatLabels={chatLabels} sendingMessage={isSendingMessage} messages={messages} sendConversationRequest={sendConversationRequest} />;
}

export default Home;
