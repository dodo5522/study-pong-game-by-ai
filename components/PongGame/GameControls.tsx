import React from 'react';

interface GameControlsProps {
  gameStarted: boolean;
  onStartGame: () => void;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ gameStarted, onStartGame, onResetGame }) => {
  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      {!gameStarted ? (
        <button
          onClick={onStartGame}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#0f0',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Start Game
        </button>
      ) : (
        <button
          onClick={onResetGame}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f00',
            border: 'none',
            borderRadius: '5px',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Reset Game
        </button>
      )}
    </div>
  );
};

export default GameControls;
