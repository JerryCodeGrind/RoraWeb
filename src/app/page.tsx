"use client";

import { Canvas } from "@react-three/fiber";
import { Experience } from "../components/Experience";

const DownloadIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    className={`w-5 h-5 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
);

export default function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-amber-950 via-yellow-900 to-orange-950 overflow-hidden">
      {/* 3D Scene */}
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 10], fov: 30 }}
        className="absolute inset-0"
      >
        <Experience />
      </Canvas>
      
      {/* Simple UI */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Header at top */}
        <div className="absolute top-12 left-0 right-0 text-center pointer-events-none">
          <h1 
            className="text-7xl font-bold mb-3 tracking-wide drop-shadow-2xl"
            style={{ 
              fontFamily: 'var(--font-playfair)', 
              color: '#fef3c7',
              textShadow: '0 4px 8px rgba(146, 64, 14, 0.8)'
            }}
          >
            Rora
          </h1>
          <p 
            className="text-xl font-light tracking-wide"
            style={{ 
              fontFamily: 'var(--font-montserrat)', 
              color: '#fde68a'
            }}
          >
            Cherishing every memory and turning it into a 3D experience
          </p>
        </div>
        
        {/* Download Button - positioned below portals */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <a
            href="/debug.apk"
            download="debug.apk"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border"
            style={{
              fontFamily: 'var(--font-montserrat)',
              background: 'linear-gradient(135deg, #fde68a, #f59e0b)',
              color: '#92400e',
              borderColor: 'rgba(217, 119, 6, 0.3)'
            }}
          >
            <DownloadIcon />
            <span>Download APK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
