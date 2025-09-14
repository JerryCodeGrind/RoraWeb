"use client";

import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  useCursor,
  useTexture,
  Html,
} from "@react-three/drei";
import Image from "next/image";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import MouseParallax from "./MouseParallax";

interface MonsterStageProps {
  children?: React.ReactNode;
  texture: string;
  name: string;
  color: string;
  active: string | null;
  setActive: (name: string | null) => void;
  hovered: string | null;
  setHovered: (name: string | null) => void;
  [key: string]: unknown;
}

const MonsterStage: React.FC<MonsterStageProps> = ({
  children,
  texture,
  name,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef(null);

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    if (portalMaterial.current) {
      // Show portal content only when active, or slight preview when hovered
      const targetBlend = worldOpen ? 1 : (hovered === name ? 0.1 : 0);
      easing.damp(portalMaterial.current, "blend", targetBlend, 0.2, delta);
    }
  });

  return (
    <group {...props}>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial 
          ref={portalMaterial} 
          side={THREE.DoubleSide}
          resolution={1024}
          blur={0}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial 
              map={map} 
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const LoveMessage: React.FC = () => {
  const [showImage, setShowImage] = useState(false);
  
  return (
    <Html
      position={[0, -4, 0]}
      center
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative">
        <div
          className="text-white/70 text-sm font-light tracking-wide cursor-pointer hover:text-white/90 transition-colors duration-300 select-none"
          onMouseEnter={() => setShowImage(true)}
          onMouseLeave={() => setShowImage(false)}
        >
          made with love ♥
        </div>
        {showImage && (
          <div
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 pointer-events-none"
            style={{
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-xl border border-white/20">
              <Image
                src="/image.png"
                alt="Made with love"
                width={128}
                height={128}
                className="object-cover rounded-md"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10"></div>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </Html>
  );
};

export const Experience: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null);
  const controlsRef = useRef<CameraControls>(null);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active && controlsRef.current) {
      const targetPosition = new THREE.Vector3();
      const targetObject = scene.getObjectByName(active);
      if (targetObject) {
        targetObject.getWorldPosition(targetPosition);
        controlsRef.current.setLookAt(
          0,
          0,
          5,
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
      }
    } else if (controlsRef.current) {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active, scene]);

  return (
    <>
      <MouseParallax strength={0.1} isEnabled={!active} />
      <ambientLight intensity={0.4} color="#fbbf24" />
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#d97706" />
      <Environment preset="dawn" />
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <MonsterStage
        name="Fire World"
        color="#dc2626"
        texture="/lava.jpg"
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      />
      <MonsterStage
        name="Water World"
        color="#0369a1"
        texture="/water.jpg"
        position-x={0}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      />
      <MonsterStage
        name="Nature World"
        color="#166534"
        texture="/cactus.jpg"
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      />
      <LoveMessage />
    </>
  );
};