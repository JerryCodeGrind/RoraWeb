"use client";

import { useState } from "react";

interface UIOverlayProps {
  isActive?: boolean;
  currentWorld?: string | null;
  onWorldSelect?: (world: string | null) => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({ 
  isActive = false, 
  currentWorld = null,
  onWorldSelect 
}) => {
  const [showInstructions, setShowInstructions] = useState(true);

  const worlds = [
    { name: "Fire World", color: "text-red-400", description: "Explore volcanic landscapes" },
    { name: "Water World", color: "text-blue-400", description: "Dive into ocean depths" },
    { name: "Nature World", color: "text-green-400", description: "Wander through forests" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {/* Instructions overlay */}
      {showInstructions && !isActive && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center max-w-md">
            <h3 className="text-white text-lg font-semibold mb-3">
              Welcome to the Portal Worlds
            </h3>
            <p className="text-white/80 text-sm mb-4">
              Double-click on any portal to enter a magical world. 
              Hover to preview, click outside to exit.
            </p>
            <button 
              onClick={() => setShowInstructions(false)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* World navigation when active */}
      {isActive && currentWorld && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black/70 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-4">
            <span className="text-white/60 text-sm">Currently in:</span>
            <span className={`font-semibold ${
              currentWorld === "Fire World" ? "text-red-400" :
              currentWorld === "Water World" ? "text-blue-400" :
              "text-green-400"
            }`}>
              {currentWorld}
            </span>
            <button 
              onClick={() => onWorldSelect?.(null)}
              className="ml-4 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* World selector */}
      {!isActive && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="flex gap-4">
            {worlds.map((world) => (
              <div key={world.name} className="text-center">
                <div className={`w-3 h-3 rounded-full ${world.color.replace('text-', 'bg-')} mx-auto mb-1`} />
                <span className={`text-xs ${world.color} font-medium`}>
                  {world.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help button */}
      <button 
        onClick={() => setShowInstructions(true)}
        className="absolute bottom-8 right-8 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors pointer-events-auto"
      >
        <span className="text-xl">?</span>
      </button>
    </div>
  );
};

export default UIOverlay;
