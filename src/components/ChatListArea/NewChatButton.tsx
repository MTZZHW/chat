import React from 'react';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

function NewChatButton(): JSX.Element {
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
        <Link href="/" passHref legacyBehavior>
          <IconButton component="a" color="inherit" edge="end">
            <AddIcon />
          </IconButton>
        </Link>
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
        <Link href="/" passHref legacyBehavior>
          <ListItemButton component="a" sx={{ border: '1px dashed grey' }}>
            <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold' }} sx={{ textAlign: 'center' }}>
              New Chat
            </ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
    </>
  );
}

export default NewChatButton;
