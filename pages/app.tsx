import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css'; // Assuming you have a global CSS file

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>User Management App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
