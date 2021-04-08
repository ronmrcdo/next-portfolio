import Head from 'next/head';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config';
import '../styles/scss/style.scss';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.lang = 'en';
  });

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>{config.title}</title>
        <meta name="title" content={config.title} />
        <meta name="description" content={config.description} />
        <meta name="keywords" content={config.keywords.join(',')} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content={config.author} />
      </Head>

      <Navbar />

      <main className="flex-1">
        <Component {...pageProps} />
      </main>

      <Footer />
    </div>
  );
}

export default MyApp;
