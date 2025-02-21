"use client"
import React, { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

// Define the Snowflake interface
interface Snowflake {
  id: number;
  left: string;
  size: number;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

export default function Snowfall(): JSX.Element {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  
  useEffect(() => {
    // Create snowflakes on component mount
    const flakeCount = window.innerWidth < 768 ? 50 : 100; // Fewer flakes on mobile
    const newSnowflakes: Snowflake[] = [];
    
    for (let i = 0; i < flakeCount; i++) {
      newSnowflakes.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 0.5 + 0.2, // Size between 0.2rem and 0.7rem
        animationDuration: `${Math.random() * 10 + 5}s`, // Between 5-15 seconds
        animationDelay: `${Math.random() * 5}s`, // Delay between 0-5 seconds
        opacity: Math.random() * 0.7 + 0.3, // Opacity between 0.3-1
      });
    }
    
    setSnowflakes(newSnowflakes);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: flake.left,
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration} linear ${flake.animationDelay} infinite`,
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
            top: '-1rem',
          }}
        />
      ))}
      
      {/* Keyframe animation for falling snow */}
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(10px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-10px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(10px);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}