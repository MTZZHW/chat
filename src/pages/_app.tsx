import React from 'react';
import '@/styles/globals.css';
import type { AppProps as AppInitialProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';

type ComponentAuthType = { auth: boolean };

type AuthProps = {
  children: JSX.Element & { type: ComponentAuthType };
};

function Auth({ children }: AuthProps): JSX.Element {
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <></>;
  }

  return children;
}

type AppProps = AppInitialProps<{ session: Session }> & { Component: ComponentAuthType };

function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default App;
