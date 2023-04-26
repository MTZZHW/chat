import axios from 'axios';
import type { ResponseType } from './@types';
import type { ChatsCreateRequestBody, ChatsCreateResponseBody, ChatsUpdateRequestBody, ChatsUpdateResponseBody } from '@/pages/api/chats';
import type { ChatsFetchRequestBody, ChatsFetchResponseBody } from '@/pages/api/chats/[userId]';
import type { ChatsDetailFetchRequestBody, ChatsDetailFetchResponseBody } from '@/pages/api/chats/detail/[id]';

const fetchChats = (params: ChatsFetchRequestBody): Promise<ResponseType<ChatsFetchResponseBody>> => {
  return axios.get(process.env.NEXT_PUBLIC_API_SERVER + `/api/chats/${params.userId}`).then((response) => {
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

const fetchChatDetail = (params: ChatsDetailFetchRequestBody): Promise<ResponseType<ChatsDetailFetchResponseBody>> => {
  return axios.get(process.env.NEXT_PUBLIC_API_SERVER + `/api/chats/detail/${params.id}`).then((response) => {
    return response.data;
  });
};

const services = {
  fetchChats,
  createChat,
  updateChat,
  fetchChatDetail,
};

export default services;
