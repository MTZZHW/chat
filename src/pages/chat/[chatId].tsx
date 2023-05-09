import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { AuthOptions, ISODateString } from 'next-auth';
import { getServerSession } from 'next-auth';
import type { Chat as ChatType } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]';
import { ChatDao } from '../../../server/dao';
import type { ChatLabelType } from '@/hooks/useChatLabels';
import Layout from '@/components/Layout';
import type { UserType } from '@/hooks/useUser';
import ChatLayout from '@/components/ChatLayout';

function Chat({ chatLabels, chat, user }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout title={`${chat.label} | Chat`}>
      <ChatLayout initialChatLabels={chatLabels} initialMessages={chat.messages} initialChatId={chat.id} user={user} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  { chatLabels: ChatLabelType[]; chat: Omit<ChatType, 'userId' | 'createdAt' | 'updatedAt'>; user: UserType },
  { chatId: string }
> = async ({ req, res, params }) => {
  const session = await getServerSession<AuthOptions, { user: UserType; expires: ISODateString }>(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const user = session.user;

  const chatLabels = await ChatDao.findAll({
    where: { userId: user.id },
  });

  const chat = await ChatDao.findOneRaw({
    where: { id: params!.chatId },
  });

  return {
    props: {
      chatLabels,
      chat,
      user,
    },
  };
};

export default Chat;
