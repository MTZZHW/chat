import React from 'react';
import ChatLayout from '@/components/ChatLayout';

function Home(): JSX.Element {
  return <ChatLayout />;
}

Home.auth = true;

export default Home;
