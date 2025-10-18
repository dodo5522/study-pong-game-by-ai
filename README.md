# Pong Game - React/Next.js + TypeScript

A classic Pong game implementation using React, Next.js, and TypeScript.

## Features

- **Player Controls**: Control the left paddle (green) using mouse or arrow keys (↑/↓)
- **Computer AI**: The right paddle (red) is controlled by a simple AI that follows the ball
- **Ball Physics**: Realistic bouncing with collision detection for paddles and walls
- **Scoring System**: Track points for both player and computer
- **Visual Feedback**: Color-coded paddles and scoreboard

## How to Play

1. Click "Start Game" to begin
2. Control your paddle (green, on the left) by:
   - Moving your mouse up and down, OR
   - Using the ↑ and ↓ arrow keys
3. Try to hit the ball past the computer's paddle (red, on the right)
4. First to score wins! (Game continues indefinitely)
5. Click "Reset Game" to start over with scores at 0-0

## Installation

```bash
# Install dependencies
npm install
```

## Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Technologies

- **React** 18.2.0 - UI library
- **Next.js** 13.5.6 - React framework
- **TypeScript** 5.6.2 - Type safety
- **HTML5 Canvas** - Game rendering

## Project Structure

```
├── components/
│   └── PongGame.tsx      # Main game component with all game logic
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   └── index.tsx         # Home page
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Game Mechanics

- **Canvas Size**: 800x600 pixels
- **Paddle Size**: 10x100 pixels
- **Ball Size**: 8px radius
- **Ball Speed**: 5 pixels per frame
- **Paddle Speed**: 6 pixels per frame (player), 4.2 pixels per frame (computer)
- **Frame Rate**: 60 FPS using `requestAnimationFrame`

## License

MIT
