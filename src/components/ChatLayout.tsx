import React from 'react';
import type { ChatCompletionRequestMessage } from 'openai';
import ChatInputArea from '@/components/ChatInputArea';
import ChatDisplayArea from '@/components/ChatDisplayArea';
import type { ChatLabelType } from '@/components/ChatListArea';
import ChatListArea from '@/components/ChatListArea';

type ChatLayoutProps = {
  chatLabels: ChatLabelType[];
  sendingMessage: boolean;
  messages: ChatCompletionRequestMessage[];
  sendConversationRequest: (chatContent: string) => void;
};

function ChatLayout({ chatLabels, sendingMessage: sending, messages, sendConversationRequest }: ChatLayoutProps) {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <ChatListArea sx={{ display: 'flex', width: '260px' }} chatLabels={chatLabels} />
      <div style={{ height: '100%', width: 'calc(100vw - 260px)', position: 'relative' }}>
        <ChatDisplayArea
          sx={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            height: '100%',
            width: '100%',
            p: {
              xs: '24px 14px 76px',
              sm: '24px 14px 76px',
              md: '24px 11vw 76px',
              lg: '24px 22vw 76px',
            },
            overflowY: 'auto',
          }}
          loading={sending}
          messages={messages}
        />
        <ChatInputArea
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            p: '12px 4px',
            bottom: '12px',
            left: {
              xs: '14px',
              sm: '14px',
              md: '11vw',
              lg: '22vw',
            },
            right: {
              xs: '14px',
              sm: '14px',
              md: '11vw',
              lg: '22vw',
            },
          }}
          onSubmit={sendConversationRequest}
          disabledSubmit={sending}
        />
      </div>
    </div>
  );
}

export default ChatLayout;
