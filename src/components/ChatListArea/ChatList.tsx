import List from '@mui/material/List';
import ChatListItem from './ChatListItem';
import type { ChatLabelType } from '@/hooks/useChatLabels';

type ChatListProps = {
  chatLabels: ChatLabelType[];
  activeChatId: string;
  editChatLabel: (chatLabelId: string, newChatLabel: string) => void;
  children?: JSX.Element | JSX.Element[];
};

function ChatList({ chatLabels, activeChatId, editChatLabel, children }: ChatListProps): JSX.Element {
  return (
    <List component="nav" disablePadding>
      {children}
      {chatLabels.map((chatLabel) => (
        <ChatListItem
          key={chatLabel.id}
          chatId={chatLabel.id}
          chatLabel={chatLabel.label}
          isActiveChat={chatLabel.id === activeChatId}
          editChatLabel={editChatLabel}
        />
      ))}
    </List>
  );
}

export default ChatList;
