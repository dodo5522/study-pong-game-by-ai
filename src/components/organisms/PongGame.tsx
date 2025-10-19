import React, { useEffect, useRef, useState } from 'react';
import { GameCanvas } from '../atoms';
import { GameControls ,GameInstructions } from '../molecules';

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  speed: number;
}

interface Score {
  player: number;
  computer: number;
}

const PongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState<Score>({ player: 0, computer: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  
  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 100;
  const BALL_RADIUS = 8;
  const PADDLE_SPEED = 6;
  const BALL_SPEED = 5;
  
  // Refs for game state
  const playerPaddleRef = useRef<Paddle>({
    x: 20,
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED,
  });
  
  const computerPaddleRef = useRef<Paddle>({
    x: CANVAS_WIDTH - 30,
    y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED,
  });
  
  const ballRef = useRef<Ball>({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    radius: BALL_RADIUS,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
    speed: BALL_SPEED,
  });
  
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mouseYRef = useRef<number>(CANVAS_HEIGHT / 2);
  const animationRef = useRef<number>();

  // Reset ball to center
  const resetBall = (toRight: boolean) => {
    ballRef.current.x = CANVAS_WIDTH / 2;
    ballRef.current.y = CANVAS_HEIGHT / 2;
    ballRef.current.dx = toRight ? BALL_SPEED : -BALL_SPEED;
    ballRef.current.dy = (Math.random() - 0.5) * BALL_SPEED;
  };

  // Draw rectangle helper
  const drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };

  // Draw circle helper
  const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw text helper
  const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number) => {
    ctx.fillStyle = color;
    ctx.font = `${size}px Arial`;
    ctx.fillText(text, x, y);
  };

  // Check collision between ball and paddle
  const checkPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
    return (
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.x + ball.radius > paddle.x &&
      ball.y - ball.radius < paddle.y + paddle.height &&
      ball.y + ball.radius > paddle.y
    );
  };

  // Update player paddle position
  const updatePlayerPaddle = () => {
    const paddle = playerPaddleRef.current;
    
    // Mouse control
    const targetY = mouseYRef.current - paddle.height / 2;
    const diff = targetY - paddle.y;
    if (Math.abs(diff) > 1) {
      paddle.y += diff * 0.1;
    }
    
    // Keyboard control
    if (keysRef.current['ArrowUp']) {
      paddle.y -= paddle.speed;
    }
    if (keysRef.current['ArrowDown']) {
      paddle.y += paddle.speed;
    }
    
    // Keep paddle within bounds
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > CANVAS_HEIGHT) {
      paddle.y = CANVAS_HEIGHT - paddle.height;
    }
  };

  // Update computer paddle position (AI)
  const updateComputerPaddle = () => {
    const paddle = computerPaddleRef.current;
    const ball = ballRef.current;
    
    // Simple AI: follow the ball
    const paddleCenter = paddle.y + paddle.height / 2;
    const diff = ball.y - paddleCenter;
    
    if (Math.abs(diff) > 10) {
      if (diff > 0) {
        paddle.y += paddle.speed * 0.7; // Slightly slower than player
      } else {
        paddle.y -= paddle.speed * 0.7;
      }
    }
    
    // Keep paddle within bounds
    if (paddle.y < 0) paddle.y = 0;
    if (paddle.y + paddle.height > CANVAS_HEIGHT) {
      paddle.y = CANVAS_HEIGHT - paddle.height;
    }
  };

  // Update ball position and handle collisions
  const updateBall = () => {
    const ball = ballRef.current;
    const playerPaddle = playerPaddleRef.current;
    const computerPaddle = computerPaddleRef.current;
    
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Wall collision (top and bottom)
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > CANVAS_HEIGHT) {
      ball.dy = -ball.dy;
    }
    
    // Player paddle collision
    if (ball.dx < 0 && checkPaddleCollision(ball, playerPaddle)) {
      ball.dx = -ball.dx;
      // Add some variation based on where the ball hits the paddle
      const paddleCenter = playerPaddle.y + playerPaddle.height / 2;
      const hitPosition = (ball.y - paddleCenter) / (playerPaddle.height / 2);
      ball.dy = hitPosition * ball.speed;
    }
    
    // Computer paddle collision
    if (ball.dx > 0 && checkPaddleCollision(ball, computerPaddle)) {
      ball.dx = -ball.dx;
      // Add some variation based on where the ball hits the paddle
      const paddleCenter = computerPaddle.y + computerPaddle.height / 2;
      const hitPosition = (ball.y - paddleCenter) / (computerPaddle.height / 2);
      ball.dy = hitPosition * ball.speed;
    }
    
    // Score points
    if (ball.x - ball.radius < 0) {
      // Computer scores
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      resetBall(true);
    } else if (ball.x + ball.radius > CANVAS_WIDTH) {
      // Player scores
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      resetBall(false);
    }
  };

  // Main game loop
  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    drawRect(ctx, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, '#000');
    
    // Draw center line
    for (let i = 0; i < CANVAS_HEIGHT; i += 20) {
      drawRect(ctx, CANVAS_WIDTH / 2 - 1, i, 2, 10, '#fff');
    }
    
    // Update game objects
    updatePlayerPaddle();
    updateComputerPaddle();
    updateBall();
    
    // Draw paddles
    drawRect(
      ctx,
      playerPaddleRef.current.x,
      playerPaddleRef.current.y,
      playerPaddleRef.current.width,
      playerPaddleRef.current.height,
      '#0f0'
    );
    drawRect(
      ctx,
      computerPaddleRef.current.x,
      computerPaddleRef.current.y,
      computerPaddleRef.current.width,
      computerPaddleRef.current.height,
      '#f00'
    );
    
    // Draw ball
    drawCircle(ctx, ballRef.current.x, ballRef.current.y, ballRef.current.radius, '#fff');
    
    // Draw scores
    drawText(ctx, score.player.toString(), CANVAS_WIDTH / 4, 50, '#0f0', 40);
    drawText(ctx, score.computer.toString(), (CANVAS_WIDTH * 3) / 4, 50, '#f00', 40);
    
    // Continue game loop
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        keysRef.current[e.key] = true;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        keysRef.current[e.key] = false;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseYRef.current = e.clientY - rect.top;
  };

  // Start/stop game
  useEffect(() => {
    if (gameStarted) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleResetGame = () => {
    setScore({ player: 0, computer: 0 });
    resetBall(Math.random() > 0.5);
    playerPaddleRef.current.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
    computerPaddleRef.current.y = CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Pong Game</h1>
      <GameCanvas
        canvasRef={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseMove={handleMouseMove}
      />
      <GameControls
        gameStarted={gameStarted}
        onStartGame={handleStartGame}
        onResetGame={handleResetGame}
      />
      <GameInstructions />
    </div>
  );
};

export default PongGame;
