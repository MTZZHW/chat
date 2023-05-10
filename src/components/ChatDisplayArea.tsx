import React, { useEffect, useRef } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import type { MessageType } from '../../types/chat';
import Message from './Message';
import LoadingMessage from './Message/LoadingMessage';

type ChatDisplayAreaProps = {
  sx?: SxProps<Theme>;
  messages: MessageType[];
  loading: boolean;
};

function ChatDisplayArea({ sx, messages, loading }: ChatDisplayAreaProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current!.scrollIntoView({ behavior: 'smooth' });
  }, [loading]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        p: '24px 16px 0',
        overflowY: 'auto',
        ...sx,
      }}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading ? <LoadingMessage /> : null}
      <div ref={ref} />
    </Box>
  );
}

export default ChatDisplayArea;
