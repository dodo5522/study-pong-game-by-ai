import Head from 'next/head';
import { useState } from 'react';
import PongGame from '../components/PongGame';
import { Button, TextField } from '../src/components/ui';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <Head>
        <title>Pong Game - React/Next.js TypeScript</title>
        <meta name="description" content="A simple Pong game built with React, Next.js, and TypeScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* MUI コンポーネントのデモ */}
        <div style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#1a1a1a', borderRadius: '8px', minWidth: '300px' }}>
          <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '18px' }}>MUI コンポーネントのデモ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <TextField
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="プレイヤー名を入力"
              label="プレイヤー名"
            />
            <Button onClick={() => setShowDemo(!showDemo)}>
              {showDemo ? 'デモを隠す' : 'デモを表示'}
            </Button>
            {showDemo && (
              <div style={{ color: '#fff', padding: '10px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
                {playerName ? `ようこそ、${playerName}さん！` : 'プレイヤー名を入力してください'}
              </div>
            )}
          </div>
        </div>
        
        <PongGame />
      </main>
    </>
  );
}
