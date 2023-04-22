import React, { useState, useEffect } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { v4 as uuid } from 'uuid';
import localForage from 'localforage';
import ChatInputArea from '@/components/ChatInputArea';
import ChatDisplayArea from '@/components/ChatDisplayArea';
import type { ChatLabelType } from '@/components/ChatListArea';
import ChatListArea from '@/components/ChatListArea';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [send, setSend] = useState<boolean>(false);

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
}
