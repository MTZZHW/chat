import { useEffect, useState } from 'react';
import services from '../../services';
import useUser from './useUser';

export type ChatLabelType = {
  id: string;
  label: string;
};

type UseChatLabelsHookType = {
  chatLabels: ChatLabelType[];
  addChatLabel: (label: ChatLabelType) => void;
  removeChatLabel: (label: ChatLabelType) => void;
};

function useChatLabels(): UseChatLabelsHookType {
  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>([]);

  const { user } = useUser();

  useEffect(() => {
    (async (): Promise<void> => {
      const { success, data } = await services.fetchChats({ userId: user.id });

      if (success && data) {
        setChatLabels(data);
      }
    })();
  }, [user.id]);

  const addChatLabel = (label: ChatLabelType): void => {
    setChatLabels([...chatLabels, label]);
  };

  const removeChatLabel = (label: ChatLabelType): void => {
    setChatLabels(chatLabels.filter((l) => l !== label));
  };

  return { chatLabels, addChatLabel, removeChatLabel };
}

export default useChatLabels;
