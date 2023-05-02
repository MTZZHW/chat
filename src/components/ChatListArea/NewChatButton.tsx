import React from 'react';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function NewChatButton(): JSX.Element {
  return (
    <ListItem>
      <Link href="/" passHref legacyBehavior>
        <ListItemButton component="a" sx={{ border: '1px dashed grey' }}>
          <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold' }} sx={{ textAlign: 'center' }}>
            New Chat
          </ListItemText>
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default NewChatButton;
