import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import NewChatButton from './NewChatButton';
import ChatList from './ChatList';
import type { ChatLabelType } from '@/hooks/useChatLabels';

const drawerWidth = 256;

type ChatListAreaProps = {
  chatLabels: ChatLabelType[];
  window?: () => Window;
};

function ChatListArea({ chatLabels, window }: ChatListAreaProps): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const container = window !== undefined ? (): HTMLElement => window().document.body : undefined;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
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
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: '16px' }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Chat
          </Typography>
          <Link href="/" passHref legacyBehavior>
            <IconButton component="a" color="inherit" edge="end">
              <AddIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: `${drawerWidth}px` }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: 'block',
              sm: 'block',
              md: 'none',
              lg: 'none',
              xl: 'none',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${drawerWidth}px` },
          }}
        >
          <ChatList chatLabels={chatLabels} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${drawerWidth}px` },
          }}
          open
        >
          <ChatList chatLabels={chatLabels}>
            <NewChatButton />
          </ChatList>
        </Drawer>
      </Box>
    </Box>
  );
}

export default ChatListArea;
