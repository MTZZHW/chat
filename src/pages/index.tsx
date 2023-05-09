import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { AuthOptions, ISODateString } from 'next-auth';
import { getServerSession } from 'next-auth';
import { ChatDao } from '../../server/dao';
import { authOptions } from './api/auth/[...nextauth]';
import type { ChatLabelType } from '@/hooks/useChatLabels';
import Layout from '@/components/Layout';
import type { UserType } from '@/hooks/useUser';
import ChatLayout from '@/components/ChatLayout';

function Home({ chatLabels, user }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout title={`New Chat | Chat`}>
      <ChatLayout initialChatLabels={chatLabels} initialMessages={[]} initialChatId={''} user={user} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ chatLabels: ChatLabelType[]; user: UserType }> = async ({ req, res }) => {
  const session = await getServerSession<AuthOptions, { user: UserType; expires: ISODateString }>(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const user = session.user;

  const chatLabels = await ChatDao.findAll({
    where: { userId: user.id },
  });

  return {
    props: {
      chatLabels,
      user,
    },
  };
};

export default Home;
