import React, { useState, useEffect } from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default function Home() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [send, setSend] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === 'Loading...') {
          return 'Loading';
        }
        return `${prevText}.`;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

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
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 480px 12px 480px',
    }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%',
      }}
      >
        {
          messages.map((message) => (
            <div>
              {
                message.role === 'user'
                  ? (
                    <div style={{
                      float: 'right', padding: 12, background: '#89d961', borderRadius: 6, marginBottom: 16,
                    }}
                    >
                      {message.content}
                    </div>
                  )
                  : (
                    <div style={{
                      float: 'left', padding: 12, background: '#f5f5f5', borderRadius: 6, marginBottom: 16,
                    }}
                    >
                      {message.content}
                    </div>
                  )
              }
            </div>
          ))
        }
        {
          send
            ? (
              <div>
                <div style={{
                  float: 'left', padding: 12, background: '#f5f5f5', borderRadius: 6, marginBottom: 16,
                }}
                >
                  {loadingText}
                </div>
              </div>
            ) : null
        }
      </div>
      <div style={{
        position: 'fixed', bottom: 0, right: 480, left: 480, background: '#ffffff', padding: '16px 0',
      }}
      >
        <div style={{
          display: 'flex', alignItems: 'flex-end',
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
        </div>
      </div>
    </div>
  );
}
