import type { FormEvent, KeyboardEvent, ChangeEvent } from 'react';
import React, { useState } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box, Button as MuiButton, TextField, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

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

  const handleSubmit = (event: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();
    onSubmit(chatContent);
    setChatContent('');
  };

  const handleTextFieldKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmit(event);
    }
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setChatContent(event.target.value);
  };

  return (
    <>
      <Divider />
      <Box p="16px" sx={{ ...sx }}>
        <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="end">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Send a message."
            multiline
            maxRows={10}
            value={chatContent}
            onChange={handleTextFieldChange}
            onKeyDown={handleTextFieldKeyDown}
            size="small"
          />
          <Button type="submit" sx={{ ml: '8px' }} variant="contained" disabled={disabledSubmit || !chatContent} size="medium">
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ChatInputArea;
