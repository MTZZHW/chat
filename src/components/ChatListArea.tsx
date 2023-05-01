import React from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import type { ChatLabelType } from '@/hooks/useChatLabels';

type ChatListAreaProps = {
  sx?: SxProps<Theme>;
  chatLabels: ChatLabelType[];
};

function ChatListArea({ sx, chatLabels }: ChatListAreaProps): JSX.Element {
  return (
    <Box display="flex" sx={sx}>
      <List component="nav" disablePadding sx={{ width: '260px' }}>
        <ListItem>
          <Link href="/" passHref legacyBehavior>
            <ListItemButton component="a" sx={{ border: '1px dashed grey' }}>
              <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold' }} sx={{ textAlign: 'center' }}>
                New Chat
              </ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
        <Box>
          {chatLabels.map((chatLabel) => (
            <ListItem key={chatLabel.id}>
              <Link href={`/chat/${chatLabel.id}`} passHref legacyBehavior>
                <ListItemButton component="a" sx={{ border: '1px solid grey', width: '227px' }}>
                  <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold', noWrap: true }}>{chatLabel.label}</ListItemText>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </Box>
      </List>
      <Divider orientation="vertical" flexItem />
    </Box>
  );
}

export default ChatListArea;
