import { useState } from 'react';

export type ChatLabelType = {
  id: string;
  label: string;
};

type UseChatLabelsHookType = {
  chatLabels: ChatLabelType[];
  addChatLabel: (label: ChatLabelType) => void;
  removeChatLabel: (label: ChatLabelType) => void;
};

function useChatLabels(initialChatLabels: ChatLabelType[]): UseChatLabelsHookType {
  const [chatLabels, setChatLabels] = useState<ChatLabelType[]>(initialChatLabels);

  const addChatLabel = (label: ChatLabelType): void => {
    setChatLabels([...chatLabels, label]);
  };

  const removeChatLabel = (label: ChatLabelType): void => {
    setChatLabels(chatLabels.filter((l) => l !== label));
  };

  return { chatLabels, addChatLabel, removeChatLabel };
}

export default useChatLabels;
