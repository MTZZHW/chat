import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import DriveFileRenameOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Stack from '@mui/material/Stack';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MuiTextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import type { ChatLabelType } from '@/hooks/useChatLabels';

const stopPropagation = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>): void => {
  event.stopPropagation();
  event.preventDefault();
};

type ActionButtonGroupProps = {
  onOk: () => void;
  onCancel: () => void;
  confirmation?: boolean;
};

function ActionButtonGroup({ onOk, onCancel, confirmation }: ActionButtonGroupProps): JSX.Element {
  const OkIcon = confirmation ? CheckOutlinedIcon : DriveFileRenameOutlinedIcon;
  const CancelIcon = confirmation ? CloseOutlinedIcon : DeleteOutlinedIcon;

  return (
    <Stack direction="row" spacing={-0.5}>
      <IconButton
        size="small"
        onClick={(event): void => {
          stopPropagation(event);
          onOk();
        }}
        color="primary"
      >
        <OkIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(event): void => {
          stopPropagation(event);
          onCancel();
        }}
        color="primary"
      >
        <CancelIcon fontSize="inherit" />
      </IconButton>
    </Stack>
  );
}

const TextField = styled(MuiTextField)({
  paddingBottom: 2,
  '& .MuiInputBase-root': {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 700,
    '& .MuiInputBase-input': {
      padding: '4px 0 3px',
    },
  },
});

type ChatListProps = {
  chatId: ChatLabelType['uid'];
  chatLabel: ChatLabelType['label'];
  isActiveChat: boolean;
  editChatLabel: (chatLabelId: string, newChatLabel: string) => void;
  removeChatLabel: (chatId: string) => void;
};

function ChatListItem({ chatId, chatLabel, isActiveChat, editChatLabel, removeChatLabel }: ChatListProps): JSX.Element {
  const [remove, setRemove] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [newChatLabel, setNewChatLabel] = useState<string>('');

  return (
    <ListItem>
      <Link href={`/chat/${chatId}`} passHref legacyBehavior>
        <ListItemButton component="a" sx={{ border: `1px solid ${isActiveChat ? blue[500] : 'grey'}`, width: '223px', pr: isActiveChat ? 1 : 2 }}>
          {edit ? (
            <TextField
              defaultValue={chatLabel}
              variant="standard"
              size="small"
              sx={{ pr: 1 }}
              onClick={(event): void => {
                stopPropagation(event);
              }}
              onChange={(event): void => {
                setNewChatLabel(event.target.value);
              }}
            />
          ) : (
            <ListItemText sx={isActiveChat ? { color: blue[500] } : null} primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold', noWrap: true }}>
              {chatLabel}
            </ListItemText>
          )}

          {isActiveChat && !remove && !edit ? (
            <ActionButtonGroup
              onOk={(): void => {
                setEdit(true);
              }}
              onCancel={(): void => {
                setRemove(true);
              }}
            />
          ) : null}

          {edit ? (
            <ActionButtonGroup
              onOk={(): void => {
                editChatLabel(chatId, newChatLabel);
                setEdit(false);
              }}
              onCancel={(): void => {
                setEdit(false);
              }}
              confirmation
            />
          ) : null}

          {remove ? (
            <ActionButtonGroup
              onOk={async (): Promise<void> => {
                removeChatLabel(chatId);
                setRemove(false);
              }}
              onCancel={(): void => {
                setRemove(false);
              }}
              confirmation
            />
          ) : null}
        </ListItemButton>
      </Link>
    </ListItem>
  );
}

export default ChatListItem;
