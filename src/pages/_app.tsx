import React from 'react';
import '@/styles/globals.css';
import type { AppProps as AppInitialProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import CssBaseline from '@mui/material/CssBaseline';

type AppProps = AppInitialProps<{ session: Session }>;

function App({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <CssBaseline />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
