import List from '@mui/material/List';
import ChatListItem from './ChatListItem';
import type { ChatLabelType } from '@/hooks/useChatLabels';

type ChatListProps = {
  chatLabels: ChatLabelType[];
  activeChatId: string;
  editChatLabel: (chatLabelId: string, newChatLabel: string) => void;
  removeChatLabel: (chatId: string) => void;
  children?: JSX.Element | JSX.Element[];
};

function ChatList({ chatLabels, activeChatId, editChatLabel, removeChatLabel, children }: ChatListProps): JSX.Element {
  return (
    <List component="nav" disablePadding>
      {children}
      {chatLabels.map((chatLabel) => (
        <ChatListItem
          key={chatLabel.uuid}
          chatId={chatLabel.uuid}
          chatLabel={chatLabel.label}
          isActiveChat={chatLabel.uuid === activeChatId}
          editChatLabel={editChatLabel}
          removeChatLabel={removeChatLabel}
        />
      ))}
    </List>
  );
}

export default ChatList;
