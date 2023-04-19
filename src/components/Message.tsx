import React from 'react';
import type { ChatCompletionRequestMessageRoleEnum } from 'openai';

type MessageProps = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
};

function Message({ role, content }: MessageProps) {
  return (
    <div>
      <div style={{
        float: role === 'user' ? 'right' : 'left',
        background: role === 'user' ? '#89d961' : '#f5f5f5',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
      }}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
