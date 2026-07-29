'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';
import type { WheelEvent } from 'react';

const CUBE_SIZE = 0.94;
const GAP = 0.02;
const SPACING = CUBE_SIZE + GAP;

const FACE_COLOURS = {
  teal: '#5af0e7',
  cyan: '#42e5dd',
  ice: '#a8f5fa',
  sky: '#6eb8ff',
  primary: '#0b4ee8',
  cobalt: '#2d6bff',
  inner: '#4a7fe8',
} as const;

type CubiePosition = [number, number, number];

type FaceMaterial = {
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
};

function getFaceMaterials([x, y, z]: CubiePosition): FaceMaterial[] {
  return [
    x === 1 ? { color: FACE_COLOURS.teal, emissive: '#5af0e7', emissiveIntensity: 0.18 } : { color: FACE_COLOURS.inner },
    x === -1 ? { color: FACE_COLOURS.primary, emissive: '#0b4ee8', emissiveIntensity: 0.14 } : { color: FACE_COLOURS.inner },
    y === 1 ? { color: FACE_COLOURS.ice, emissive: '#a8f5fa', emissiveIntensity: 0.16 } : { color: FACE_COLOURS.inner },
    y === -1 ? { color: FACE_COLOURS.sky, emissive: '#6eb8ff', emissiveIntensity: 0.12 } : { color: FACE_COLOURS.inner },
    z === 1 ? { color: FACE_COLOURS.cyan, emissive: '#42e5dd', emissiveIntensity: 0.15 } : { color: FACE_COLOURS.inner },
    z === -1 ? { color: FACE_COLOURS.cobalt, emissive: '#2d6bff', emissiveIntensity: 0.1 } : { color: FACE_COLOURS.inner },
  ];
}

function Cubie({ position }: { position: CubiePosition }) {
  const materials = useMemo(() => getFaceMaterials(position), [position]);

  return (
    <mesh position={[position[0] * SPACING, position[1] * SPACING, position[2] * SPACING]}>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      {materials.map((material, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          color={material.color}
          emissive={material.emissive ?? '#1a5fff'}
          emissiveIntensity={material.emissiveIntensity ?? 0.06}
          roughness={0.22}
          metalness={0.12}
        />
      ))}
    </mesh>
  );
}

function RubiksCube() {
  const cubies = useMemo(() => {
    const positions: CubiePosition[] = [];

    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          positions.push([x, y, z]);
        }
      }
    }

    return positions;
  }, []);

  return (
    <group rotation={[0.32, 0.48, 0.08]}>
      {cubies.map((position) => (
        <Cubie key={position.join('-')} position={position} />
      ))}
    </group>
  );
}

function Scene({ interactive }: { interactive: boolean }) {
  return (
    <>
      <ambientLight intensity={0.75} color="#d8ecff" />
      <directionalLight position={[5, 7, 4]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.55} color="#5af0e7" />
      <pointLight position={[2, 1, 5]} intensity={0.65} color="#42e5dd" />
      <RubiksCube />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={interactive}
        autoRotateSpeed={0.65}
        dampingFactor={0.08}
        enableDamping
        rotateSpeed={0.7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </>
  );
}

type CubeAnimationProps = {
  className?: string;
  interactive?: boolean;
  showHint?: boolean;
};

export default function CubeAnimation({
  className = 'h-full',
  interactive = true,
  showHint = false,
}: CubeAnimationProps) {
  const passWheelToPage = (event: WheelEvent<HTMLDivElement>) => {
    window.scrollBy({
      top: event.deltaY,
      left: event.deltaX,
      behavior: 'auto',
    });
  };

  return (
    <div
      className={`relative w-full bg-transparent ${className}`}
      onWheelCapture={passWheelToPage}
    >
      <Canvas
        className="touch-manipulation !bg-transparent"
        style={{ background: 'transparent' }}
        camera={{ position: [4.2, 2.8, 5.4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0);
          scene.background = null;
        }}
        aria-label="Interactive 3D cube. Drag to rotate."
      >
        <Scene interactive={interactive} />
      </Canvas>

      {showHint && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-blue-50/80 backdrop-blur-md">
          Drag to rotate
        </p>
      )}
    </div>
  );
}
