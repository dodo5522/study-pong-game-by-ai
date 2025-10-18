import React from 'react';

const GameInstructions: React.FC = () => {
  return (
    <div style={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
      <p><strong>Controls:</strong></p>
      <p>Mouse: Move your paddle up and down</p>
      <p>Arrow Keys: Use ↑ and ↓ to control your paddle</p>
      <p><span style={{ color: '#0f0' }}>Green Paddle</span>: Player (You)</p>
      <p><span style={{ color: '#f00' }}>Red Paddle</span>: Computer (AI)</p>
    </div>
  );
};

export default GameInstructions;
