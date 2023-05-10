import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import MessageLayout from './MessageLayout';

function Message(): JSX.Element {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === 'Loading . . .') {
          return 'Loading';
        }
        return `${prevText} .`;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MessageLayout bgcolor={grey[100]} position="left">
      <p>{loadingText}</p>
    </MessageLayout>
  );
}

export default Message;
