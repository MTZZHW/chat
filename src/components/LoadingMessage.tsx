import React, { useEffect, useState } from 'react';

function Message() {
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
      <div style={{
        float: 'left',
        background: '#f5f5f5',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
      }}
      >
        {loadingText}
      </div>
    </div>
  );
}

export default Message;
