import React, { useState } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '@/components/Message';
import LoadingMessage from '@/components/LoadingMessage';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [send, setSend] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');

  const sendConversationRequest = async () => {
    const newMessages: ChatCompletionRequestMessage[] = [
      ...messages,
      {
        role: 'user',
        content: textValue,
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
      setTextValue('');
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
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        background: '#ffffff',
        padding: '16px 0',
        height: 56,
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
        display: 'flex',
        alignItems: 'flex-end',
      }}
      >
        <TextField
          multiline
          value={textValue}
          onChange={(event) => setTextValue(event.target.value)}
          style={{ width: '100%' }}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendConversationRequest}
          style={{ marginLeft: 8 }}
          disabled={send}
        >
          Send
        </Button>
      </Box>
    </>
  );
}
