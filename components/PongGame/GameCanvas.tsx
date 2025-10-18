import React from 'react';

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ canvasRef, width, height, onMouseMove }) => {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={onMouseMove}
      style={{ border: '2px solid #fff', cursor: 'none' }}
    />
  );
};

export default GameCanvas;
