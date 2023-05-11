import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';

function NewChatButton(): JSX.Element {
  const router = useRouter();

  const handleClickNewChatButton = (): void => {
    const { chatId } = router.query as { chatId?: string };

    if (chatId) {
      router.push('/');
    } else {
      router.reload();
    }
  };
  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
            xl: 'none',
          },
        }}
      >
        <IconButton color="inherit" edge="end" onClick={handleClickNewChatButton}>
          <AddIcon />
        </IconButton>
      </Box>
      <ListItem
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
            lg: 'block',
            xl: 'block',
          },
        }}
      >
        <ListItemButton sx={{ border: '1px dashed grey' }} onClick={handleClickNewChatButton}>
          <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold' }} sx={{ textAlign: 'center' }}>
            New Chat
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default NewChatButton;
