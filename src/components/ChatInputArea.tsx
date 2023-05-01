import type { FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import React, { useState } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box, Button as MuiButton, TextField, styled } from '@mui/material';

const Button = styled(MuiButton)({
  paddingTop: '8px',
  paddingBottom: '8px',
  boxShadow: 'none',
});

type ChatInputAreaProps = {
  sx?: SxProps<Theme>;
  onSubmit: (chatContent: string) => void;
  disabledSubmit: boolean;
};

function ChatInputArea({ sx, onSubmit, disabledSubmit }: ChatInputAreaProps): JSX.Element {
  const [chatContent, setChatContent] = useState<string>('');

  return (
    <Box p="16px 16px" sx={{ boxShadow: 2, ...sx }}>
      <Box
        component="form"
        onSubmit={(event): void => {
          event.preventDefault();
          onSubmit(chatContent);
          setChatContent('');
        }}
        display="flex"
        alignItems="end"
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Send a message."
          multiline
          maxRows={10}
          value={chatContent}
          onChange={(event): void => {
            setChatContent(event.target.value);
          }}
          size="small"
        />
        <Button type="submit" sx={{ ml: '8px' }} variant="contained" disabled={disabledSubmit} size="medium">
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatInputArea;
