"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <h1 className="text-8xl font-playfair font-bold text-amber-100 mb-8 tracking-wide">
          rora
        </h1>
        
        {/* Loading bar */}
        <div className="w-64 h-2 bg-amber-900/30 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-amber-300 to-amber-100 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {/* Loading text */}
        <p className="text-amber-200/70 text-sm font-montserrat font-light tracking-wider">
          Loading magical worlds... {Math.round(Math.min(progress, 100))}%
        </p>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
