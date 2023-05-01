import React from 'react';
import Head from 'next/head';

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

function Layout({ title, children }: LayoutProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
