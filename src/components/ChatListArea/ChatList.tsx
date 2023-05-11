import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import List from '@mui/material/List';
import { blue } from '@mui/material/colors';
import type { ChatLabelType } from '@/hooks/useChatLabels';

type ChatListProps = {
  chatLabels: ChatLabelType[];
  activeChatId: string;
  children?: JSX.Element | JSX.Element[];
};

function ChatList({ chatLabels, activeChatId, children }: ChatListProps): JSX.Element {
  return (
    <List component="nav" disablePadding>
      {children}
      {chatLabels.map((chatLabel) => (
        <ListItem key={chatLabel.id}>
          <Link href={`/chat/${chatLabel.id}`} passHref legacyBehavior>
            <ListItemButton component="a" sx={{ border: chatLabel.id === activeChatId ? `1px solid ${blue[500]}` : '1px solid grey', width: '223px' }}>
              <ListItemText primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold', noWrap: true }}>{chatLabel.label}</ListItemText>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default ChatList;
