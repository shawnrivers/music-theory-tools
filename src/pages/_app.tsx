import 'focus-visible';
import 'app/styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Header } from 'app/components/Header';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Music Theory Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default MyApp;
