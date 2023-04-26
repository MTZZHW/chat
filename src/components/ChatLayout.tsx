import React, { useEffect, useState } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import services from '../../services';
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
          const newChatLabel: ChatLabelType = { id: data.id, label: data.id };
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <ChatListArea sx={{ display: 'flex', width: '260px' }} chatLabels={chatLabels} />
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
          loading={isSendingMessage}
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
          disabledSubmit={isSendingMessage}
        />
      </div>
    </div>
  );
}

export default ChatLayout;
