import '../faust.config';
import React from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import '@faustwp/core/dist/css/toolbar.css';
import '../styles/global.scss';
import '../styles/tailwind.css';
import { AppContextProvider } from '../appContext';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <AppContextProvider>
        <Component {...pageProps} key={router.asPath} />
      </AppContextProvider>
    </FaustProvider>
  );
}
