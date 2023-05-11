import React from 'react';
import Box from '@mui/material/Box';
import type blue from '@mui/material/colors/blue';
import type grey from '@mui/material/colors/grey';

type MessageLayoutProps = {
  bgcolor: (typeof blue)[300] | (typeof grey)[100];
  position: 'left' | 'right';
  children: JSX.Element;
};

function MessageLayout({ bgcolor, position, children }: MessageLayoutProps): JSX.Element {
  return (
    <Box mb={2}>
      <Box bgcolor={bgcolor} px={2} borderRadius="0.3rem" sx={{ float: position }}>
        {children}
      </Box>
    </Box>
  );
}

export default MessageLayout;
