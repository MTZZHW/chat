import React, { useState } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { Box } from '@mui/material';
import Message from '@/components/Message';
import LoadingMessage from '@/components/LoadingMessage';
import ChatInputBox from '@/components/ChatInputBox';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [send, setSend] = useState<boolean>(false);

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
      setMessages(updatedMessages);
    }
    setSend(false);
  };

  return (
    <>
      <Box sx={{
        margin: {
          xs: '24px 14px 12px',
          sm: '24px 10vw 12px',
          md: '24px 16vw 12px',
          lg: '24px 25vw 12px',
        },
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 88,
        }}
        >
          {
          messages.map((message) => (
            <Message role={message.role} content={message.content} />
          ))
        }
          {
          send ? <LoadingMessage /> : null
        }
        </div>
      </Box>
      <ChatInputBox
        sx={{
          p: '12px 4px',
          mb: '12px',
          display: 'flex',
          alignItems: 'center',
          position: 'fixed',
          bottom: 0,
          right: {
            xs: '14px',
            sm: '10vw',
            md: '16vw',
            lg: '25vw',
          },
          left: {
            xs: '14px',
            sm: '10vw',
            md: '16vw',
            lg: '25vw',
          },
        }}
        onSubmit={sendConversationRequest}
        disabledSubmit={send}
      />
    </>
  );
}
