"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Snowfall from './components/snowfall';
import Link from 'next/link';
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function Home() {
  const [count, setCount] = useState<number>(12);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const increaseCount = () => setCount(prev => prev + 1);
  const decreaseCount = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  const resetCount = () => setCount(0);
  const getCount = () => alert(`Current count is: ${count}`);

  return (
    <div className="min-h-screen relative flex flex-col" suppressHydrationWarning>
      {/* Snowfall Effect */}
      <Snowfall />
      
      {/* Background Image */}
      <Link href="/">
        <div className="absolute inset-0 z-0 cursor-pointer">
          <Image
            src="/background.jpg" // Make sure this image exists in your public folder
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </Link>

      {/* Header */}
      <header className="relative z-10 bg-blue-500 py-4 px-6 shadow-md flex justify-between items-center">
        <Image
          src="/logo.png"
          alt="Counter Logo"
          width={150}
          height={40}
          className="object-contain"
        />
        <ConnectButton />
      </header>

      {/* Main Content - Centered Card */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-xl mx-auto">
          <h2 className="text-center text-gray-600 text-xl mb-4">Current Count Is</h2>
          
          <div className="text-center mb-12">
            <span className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {count}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <button
              onClick={increaseCount}
              className="bg-emerald-500 text-white py-3 px-4 rounded-lg hover:bg-emerald-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-emerald-300/50 flex justify-center items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Increase</span>
            </button>
            
            <button
              onClick={decreaseCount}
              className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-red-300/50 flex justify-center items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Decrease</span>
            </button>
            
            <button
              onClick={resetCount}
              className="bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-amber-300/50 flex justify-center items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span>Reset</span>
            </button>
            
            <button
              onClick={getCount}
              className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600
                        transition-all duration-300 transform hover:scale-105 shadow-md
                        hover:shadow-blue-300/50 flex justify-center items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <span>Get Count</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-white">
        <p>Built with Next.js and Tailwind CSS • {year ?? "..."}</p>
      </footer>
    </div>
  );
}