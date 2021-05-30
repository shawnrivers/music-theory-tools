import 'styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Header } from 'components/Header';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Music Theory Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
