import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';

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
    <div>
      <div
        style={{
          float: 'left',
          background: grey[100],
          padding: '0 16px',
          borderRadius: '0.3rem',
          marginBottom: 16,
        }}
      >
        <p>{loadingText}</p>
      </div>
    </div>
  );
}

export default Message;
