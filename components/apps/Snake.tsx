"use client";
import React, { useState, useEffect } from 'react';

const GRID_SIZE = 25;
const CELL_SIZE = 12;
const INITIAL_SNAKE = [[12, 12]];
const INITIAL_FOOD = [5, 5];

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState([0, -1]);
  const lastProcessedDirection = useRef([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
         if (isPlaying) {
             e.stopPropagation();
             e.preventDefault();
         } else if (e.key === ' ') {
             // Use SPACE instead of Enter to prevent accidental triggers from terminal
             e.stopPropagation();
             e.preventDefault();
             setIsPlaying(true);
             setGameOver(false);
             setSnake(INITIAL_SNAKE);
             setScore(0);
             setDirection([0, -1]);
             lastProcessedDirection.current = [0, -1];
             return;
         }
      }

      if (!isPlaying) return;

      // Prevent 180-degree immediate reverse suicide by checking the LAST PROCESSED direction
      const lastDir = lastProcessedDirection.current;
      
      switch (e.key) {
        case 'ArrowUp':
          if (lastDir[1] !== 1) setDirection([0, -1]);
          break;
        case 'ArrowDown':
          if (lastDir[1] !== -1) setDirection([0, 1]);
          break;
        case 'ArrowLeft':
          if (lastDir[0] !== 1) setDirection([-1, 0]);
          break;
        case 'ArrowRight':
          if (lastDir[0] !== -1) setDirection([1, 0]);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isPlaying]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];
        lastProcessedDirection.current = direction; // Update the processed direction
        
        // Wall collision or Self collision
        if (
          newHead[0] < 0 || newHead[0] >= GRID_SIZE || 
          newHead[1] < 0 || newHead[1] >= GRID_SIZE ||
          prev.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        
        // Eat food
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(s => s + 10);
          setFood([
            Math.floor(Math.random() * GRID_SIZE),
            Math.floor(Math.random() * GRID_SIZE)
          ]);
        } else {
          newSnake.pop();
        }
        
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 80);
    return () => clearInterval(interval);
  }, [direction, food, isPlaying, gameOver]);

  return (
    <div className="flex flex-col items-start p-4 bg-black/40 rounded border border-cyan-900/50 my-2 w-fit">
      <div className="flex justify-between w-[300px] mb-2 text-cyan-400 font-bold font-mono">
        <span>SCORE: {score}</span>
        {gameOver && <span className="text-red-500 animate-pulse">SYSTEM CRASH</span>}
      </div>
      
      <div 
        className="relative bg-[#020617] border border-cyan-800 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE 
        }}
      >
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center text-cyan-500 bg-black/70 z-10 text-xs text-center font-bold tracking-widest backdrop-blur-sm">
            PRESS [SPACE]<br/>TO INITIATE PROTOCOL
          </div>
        )}
        
        {/* CRT Scanline overlay for game */}
        <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />

        {/* Food */}
        <div 
          className="absolute bg-pink-500 rounded-sm shadow-[0_0_8px_rgba(236,72,153,1)] animate-pulse"
          style={{
            left: food[0] * CELL_SIZE,
            top: food[1] * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE
          }}
        />
        {/* Snake */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className="absolute bg-cyan-400 rounded-sm"
            style={{
              left: segment[0] * CELL_SIZE,
              top: segment[1] * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              boxShadow: i === 0 ? '0 0 10px rgba(34,211,238,0.8)' : 'none',
              opacity: 1 - (i * 0.02) // Fade out tail
            }}
          />
        ))}
      </div>
      <p className="text-[10px] text-cyan-600/70 mt-3 max-w-[300px]">
        USE ARROW KEYS TO NAVIGATE NEURAL PATHWAY. <br/>
        WARNING: WALL COLLISIONS FATAL.
      </p>
    </div>
  );
}
