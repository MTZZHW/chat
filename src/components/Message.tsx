import React from 'react';
import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { green, grey } from '@mui/material/colors';
import MarkdownRenderer from './MarkdownRenderer';

type MessageProps = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

function Message({ role, content }: MessageProps): JSX.Element {
  return (
    <div>
      <div
        style={{
          float: role === 'user' ? 'right' : 'left',
          background: role === 'user' ? green[400] : grey[100],
          padding: '0 12px',
          borderRadius: 6,
          marginBottom: 16,
        }}
      >
        {role === 'user' ? (
          <div style={{ whiteSpace: 'pre-wrap' }}>
            <p>{content}</p>
          </div>
        ) : (
          <MarkdownRenderer>{content}</MarkdownRenderer>
        )}
      </div>
    </div>
  );
}

export default Message;
