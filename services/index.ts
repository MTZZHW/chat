import axios from 'axios';
import type { ResponseType } from './@types';
import type { ChatsCreateRequestBody, ChatsCreateResponseBody, ChatsUpdateRequestBody, ChatsUpdateResponseBody } from '@/pages/api/chats';
import type { ChatsFetchRequestBody, ChatsFetchResponseBody } from '@/pages/api/users/[userId]/chats';
import type { ChatsDetailFetchRequestBody, ChatsDetailFetchResponseBody } from '@/pages/api/chats/[id]';

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
  return axios.get(process.env.NEXT_PUBLIC_API_SERVER + `/api/chats/${params.id}`).then((response) => {
    return response.data;
  });
};

const services = {
  fetchChats,
  createChat,
  updateChat,
  fetchChat,
};

export default services;
