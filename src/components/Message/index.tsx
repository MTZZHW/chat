import React from 'react';
import { green, grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MessageType } from '../../../types/chat';
import MarkdownRenderer from '../MarkdownRenderer';
import MessageLayout from './MessageLayout';

type MessageProps = {
  message: MessageType;
};

function Message({ message }: MessageProps): JSX.Element {
  const { role, content, createdAt } = message;

  const isUser: boolean = role === 'user';

  return (
    <Box display="flex" flexDirection="column">
      <Box mb={1}>
        <Typography sx={{ float: isUser ? 'right' : 'left' }} variant="body2">
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
      <MessageLayout bgcolor={isUser ? green[400] : grey[100]} position={isUser ? 'right' : 'left'}>
        {isUser ? (
          <Box whiteSpace="pre-wrap">
            <p>{content}</p>
          </Box>
        ) : (
          <MarkdownRenderer>{content}</MarkdownRenderer>
        )}
      </MessageLayout>
    </Box>
  );
}

export default Message;
