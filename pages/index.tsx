import Head from 'next/head';
import PongGame from '../components/PongGame';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pong Game - React/Next.js TypeScript</title>
        <meta name="description" content="A simple Pong game built with React, Next.js, and TypeScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PongGame />
      </main>
    </>
  );
}
