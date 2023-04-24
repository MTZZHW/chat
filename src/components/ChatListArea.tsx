import * as React from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export type ChatLabelType = {
  uid: string;
  label: string;
};

type ChatListAreaProps = {
  sx: SxProps<Theme>;
  chatLabels: ChatLabelType[];
};

function ChatListArea({ sx, chatLabels }: ChatListAreaProps) {
  return (
    <Box sx={sx}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ width: '100%', borderRadius: 0 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="/">
              <ListItemText
                sx={{ my: 0 }}
                primary="New Chat"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            <Divider />
            <Box
              sx={{
                bgcolor: 'rgba(71, 98, 130, 0.2)',
                py: 2,
              }}
            >
              {chatLabels.map((chatLabel) => (
                <ListItemButton
                  key={chatLabel.uid}
                  sx={{ py: '8px', minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  component="a"
                  href={`/${chatLabel.uid}`}
                >
                  <ListItemText
                    primary={chatLabel.label}
                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                  />
                </ListItemButton>
              ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

export default ChatListArea;
