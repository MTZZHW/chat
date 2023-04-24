import React from 'react';
import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
import ReactMarkdown from 'react-markdown';

type MessageProps = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

function Message({ role, content }: MessageProps) {
  return (
    <div>
      <div
        style={{
          float: role === 'user' ? 'right' : 'left',
          background: role === 'user' ? '#89d961' : '#f5f5f5',
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
          <ReactMarkdown>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default Message;
