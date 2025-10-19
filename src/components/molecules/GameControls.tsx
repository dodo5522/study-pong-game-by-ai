import React from 'react';
import { Button, Stack } from '@mui/material';

interface GameControlsProps {
  gameStarted: boolean;
  onStartGame: () => void;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ gameStarted, onStartGame, onResetGame }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ marginTop: '20px' }}>
      {!gameStarted ? (
        <Button
          variant="contained"
          color="success"
          onClick={onStartGame}
          sx={{ fontWeight: 'bold' }}
        >
          Start Game
        </Button>
      ) : (
        <Button variant="contained" color="error" onClick={onResetGame} sx={{ fontWeight: 'bold' }}>
          Reset Game
        </Button>
      )}
    </Stack>
  );
};

export default GameControls;
