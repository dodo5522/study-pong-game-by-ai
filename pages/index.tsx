import Head from 'next/head';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PongGame from '../components/PongGame';
import { Button, TextField } from '../components/ui';

export default function Home() {
  const [playerName, setPlayerName] = useState('');
  const [tempPlayerName, setTempPlayerName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    if (tempPlayerName.trim()) {
      setPlayerName(tempPlayerName.trim());
      setDialogOpen(false);
      setGameStarted(true);
    }
  };

  return (
    <>
      <Head>
        <title>Pong Game - React/Next.js TypeScript</title>
        <meta name="description" content="A simple Pong game built with React, Next.js, and TypeScript" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* プレイヤー名入力ダイアログ */}
        <Dialog 
          open={dialogOpen && !gameStarted} 
          onClose={() => {}} 
          disableEscapeKeyDown
        >
          <DialogTitle>ゲーム開始</DialogTitle>
          <DialogContent>
            <div style={{ paddingTop: '10px', minWidth: '300px' }}>
              <TextField
                value={tempPlayerName}
                onChange={(e) => setTempPlayerName(e.target.value)}
                placeholder='プレイヤー名を入力'
                label='プレイヤー名'
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStartGame} disabled={!tempPlayerName.trim()}>
              ゲーム開始
            </Button>
          </DialogActions>
        </Dialog>

        {playerName && (
          <div style={{ marginBottom: '20px', color: '#fff' }}>
            <p>プレイヤー: {playerName}</p>
          </div>
        )}
        
        <PongGame />
      </main>
    </>
  );
}
