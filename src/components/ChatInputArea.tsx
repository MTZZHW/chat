import React, { useState } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type ChatInputAreaProps = {
  sx: SxProps<Theme>;
  onSubmit: (chatContent: string) => void;
  disabledSubmit: boolean;
};

function ChatInputArea({ sx, onSubmit, disabledSubmit }: ChatInputAreaProps) {
  const [chatContent, setChatContent] = useState<string>('');

  return (
    <Paper
      component="form"
      elevation={3}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(chatContent);
        setChatContent('');
      }}
      sx={sx}
    >
      <InputBase
        sx={{ ml: '8px', flex: 1, fontSize: '1.1rem' }}
        multiline
        maxRows={10}
        value={chatContent}
        onChange={(event) => {
          setChatContent(event.target.value);
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
        <IconButton type="submit" sx={{ ml: '8px' }} disabled={disabledSubmit}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default ChatInputArea;
