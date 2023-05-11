import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import services from '../../services';

export type ChatLabelType = {
  id: string;
  label: string;
};

type UseChatLabelsHookType = {
  chatLabels: ChatLabelType[];
  addChatLabel: (label: ChatLabelType) => void;
  removeChatLabel: (label: ChatLabelType) => void;
  editChatLabel: (chatLabelId: string, newChatLabel: string) => void;
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

  const editChatLabel = async (chatLabelId: string, newChatLabel: string): Promise<void> => {
    const newChatLabels = chatLabels.map((label) => {
      if (label.id === chatLabelId) {
        return {
          ...label,
          label: newChatLabel,
        };
      }
      return label;
    });
    setChatLabels(newChatLabels);

    const { success } = await services.updateChat({
      id: chatLabelId,
      label: newChatLabel,
    });

    if (!success) {
    }
  };

  return {
    chatLabels,
    addChatLabel,
    removeChatLabel,
    editChatLabel,
    activeChatId,
    setActiveChatId,
  };
}

export default useChatLabels;
