import axios from 'axios';
import { v4 as uuid } from 'uuid';
import openai from '../lib/openai';
import type { MessageType } from '../types/chat';
import type { ResponseType } from './@types';
import type { ChatsCreateRequestBody, ChatsCreateResponseBody, ChatsUpdateRequestBody, ChatsUpdateResponseBody } from '@/pages/api/chats';
import type { ChatsFetchRequestBody, ChatsFetchResponseBody } from '@/pages/api/users/[userId]/chats';
import type { ChatsDeleteRequestBody, ChatsDeleteResponseBody, ChatsDetailFetchRequestBody, ChatsDetailFetchResponseBody } from '@/pages/api/chats/[uid]';

const fetchChats = (params: ChatsFetchRequestBody): Promise<ResponseType<ChatsFetchResponseBody>> => {
  return axios.get(process.env.NEXT_PUBLIC_API_SERVER + `/api/users/${params.userId}/chats`).then((response) => {
    return response.data;
  });
};

const createChat = (params: ChatsCreateRequestBody): Promise<ResponseType<ChatsCreateResponseBody>> => {
  return axios.post(process.env.NEXT_PUBLIC_API_SERVER + '/api/chats', params).then((response) => {
    return response.data;
  });
};

const updateChat = (params: ChatsUpdateRequestBody): Promise<ResponseType<ChatsUpdateResponseBody>> => {
  return axios.put(process.env.NEXT_PUBLIC_API_SERVER + '/api/chats', params).then((response) => {
    return response.data;
  });
};

const fetchChat = (params: ChatsDetailFetchRequestBody): Promise<ResponseType<ChatsDetailFetchResponseBody>> => {
  return axios.get(process.env.NEXT_PUBLIC_API_SERVER + `/api/chats/${params.uid}`).then((response) => {
    return response.data;
  });
};

const deleteChat = (params: ChatsDeleteRequestBody): Promise<ResponseType<ChatsDeleteResponseBody>> => {
  return axios.delete(process.env.NEXT_PUBLIC_API_SERVER + `/api/chats/${params.uid}`).then((response) => {
    return response.data;
  });
};

const invokeOpenai = async (messages: MessageType[]): Promise<MessageType[]> => {
  let newMessages: MessageType[];

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages.map((message) => {
        return {
          role: message.role,
          content: message.content,
        };
      }),
    });

    if (completion.data.choices[0].message) {
      newMessages = [
        ...messages,
        {
          ...completion.data.choices[0].message,
          createdAt: new Date(),
          id: uuid(),
        },
      ];

      return newMessages;
    } else {
      throw new Error('Openai: Unknown error');
    }
  } catch (error) {
    throw new Error(`Openai: ${error}`);
  }
};

const services = {
  fetchChats,
  createChat,
  updateChat,
  fetchChat,
  deleteChat,
  invokeOpenai,
};

export default services;
