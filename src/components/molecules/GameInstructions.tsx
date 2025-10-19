import React from 'react';
import { Stack, Typography } from '@mui/material';

const GameInstructions: React.FC = () => {
  return (
    <Stack spacing={1} sx={{ color: '#fff', marginTop: '20px', textAlign: 'center' }}>
      <Typography variant="body1" fontWeight="bold">Controls:</Typography>
      <Typography variant="body2">Mouse: Move your paddle up and down</Typography>
      <Typography variant="body2">Arrow Keys: Use ↑ and ↓ to control your paddle</Typography>
      <Typography variant="body2">
        <Typography component="span" sx={{ color: '#0f0' }}>Green Paddle</Typography>: Player (You)
      </Typography>
      <Typography variant="body2">
        <Typography component="span" sx={{ color: '#f00' }}>Red Paddle</Typography>: Computer (AI)
      </Typography>
    </Stack>
  );
};

export default GameInstructions;
