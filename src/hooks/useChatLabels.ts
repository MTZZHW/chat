import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export type ChatLabelType = {
  id: string;
  label: string;
};

type UseChatLabelsHookType = {
  chatLabels: ChatLabelType[];
  addChatLabel: (label: ChatLabelType) => void;
  removeChatLabel: (label: ChatLabelType) => void;
  activeChatId: string;
  setActiveChatId: (chatId: string) => void;
};

function useChatLabels(initialChatLabels: ChatLabelType[]): UseChatLabelsHookType {
  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>(initialChatLabels);
  const [activeChatId, setActiveChatId] = useState<string>('');

  const router = useRouter();
  const { chatId } = router.query as { chatId: string };

  useEffect(() => {
    setActiveChatId(chatId);
  }, [chatId]);

  const addChatLabel = (label: ChatLabelType): void => {
    setChatLabels([...chatLabels, label]);
  };

  const removeChatLabel = (label: ChatLabelType): void => {
    setChatLabels(chatLabels.filter((l) => l !== label));
  };

  return {
    chatLabels,
    addChatLabel,
    removeChatLabel,
    activeChatId,
    setActiveChatId,
  };
}

export default useChatLabels;
