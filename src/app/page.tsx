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
    <div className="w-full h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 overflow-hidden">
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
          <h1 className="text-7xl font-playfair font-bold text-amber-100 mb-3 tracking-wide drop-shadow-2xl">
            Rora
          </h1>
          <p className="text-amber-200/80 text-xl font-montserrat font-light tracking-wide">
            Cherishing every memory and turning it into a 3D experience
          </p>
        </div>
        
        {/* Download Button - positioned below portals */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <a
            href="/debug.apk"
            download="debug.apk"
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-200 to-amber-100 text-amber-900 rounded-full font-montserrat font-semibold hover:from-amber-100 hover:to-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-amber-300/30"
          >
            <DownloadIcon />
            <span>Download APK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
