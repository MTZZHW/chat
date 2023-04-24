import React, { useEffect, useRef } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import type { ChatCompletionRequestMessage } from 'openai';
import Message from './Message';
import LoadingMessage from './LoadingMessage';

type ChatDisplayAreaProps = {
  sx: SxProps<Theme>;
  messages: ChatCompletionRequestMessage[];
  loading: boolean;
};

function ChatDisplayArea({ sx, messages, loading }: ChatDisplayAreaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current!.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  return (
    <Box sx={sx}>
      {messages.map((message, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Message key={index} role={message.role} content={message.content} />
      ))}
      {loading ? <LoadingMessage /> : null}
      <div ref={ref} />
    </Box>
  );
}

export default ChatDisplayArea;
