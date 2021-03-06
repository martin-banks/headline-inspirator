import React, { useEffect } from 'react'

import Head from 'next/head'

import '../styles/global.css'
import analytics from '../helpers/google-analytics'


function App ({ Component, pageProps }) {
  useEffect(() => {
    analytics.setup('UA-158548765-1')
  }, [])
  return <>
      <Head>
        <title>Headline-ificator</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content="#ffffff" />
      </Head>

    <Component { ...pageProps } />
  </>
}


export default App
