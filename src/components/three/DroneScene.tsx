'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  Sparkles,
} from '@react-three/drei';
import { useTheme } from 'next-themes';
import DroneModel from './DroneModel';

/** Rotating scan ring that reads as the drone's sensor sweep. */
function ScanRings({ accent }: { accent: string }) {
  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {[2.1, 2.8, 3.6].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.6]}>
          <ringGeometry args={[r, r + 0.012, 96, 1, 0, Math.PI * (i % 2 ? 1.2 : 0.7)]} />
          <meshBasicMaterial color={accent} transparent opacity={0.28 - i * 0.06} />
        </mesh>
      ))}
    </group>
  );
}

export type DroneSceneProps = {
  /** hero = ambient showpiece, inspect = user can orbit and zoom */
  variant?: 'hero' | 'inspect';
  className?: string;
};

export default function DroneScene({ variant = 'hero', className }: DroneSceneProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (variant !== 'hero') return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [variant]);

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const accent = isDark ? '#a78bfa' : '#7c3aed';
  const accent2 = isDark ? '#22d3ee' : '#0891b2';
  const inspect = variant === 'inspect';

  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: inspect ? [3.9, 1.6, 5.0] : [0, 1.25, 8.0], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <hemisphereLight
            intensity={isDark ? 0.5 : 1.1}
            groundColor={isDark ? '#0c0718' : '#e4e0ef'}
          />
          <directionalLight
            position={[4, 6, 3]}
            intensity={isDark ? 2.2 : 3}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-4, 2, -3]} intensity={isDark ? 22 : 12} color={accent2} />
          <pointLight position={[3, -2, 3]} intensity={isDark ? 16 : 8} color={accent} />
          <spotLight
            position={[0, 7, 0]}
            angle={0.6}
            penumbra={1}
            intensity={isDark ? 30 : 18}
            color="#ffffff"
          />

          {/* studio reflections built in-scene — no external HDRI fetch */}
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={isDark ? 3 : 5}
              position={[0, 4, -3]}
              scale={[8, 4, 1]}
              color="#ffffff"
            />
            <Lightformer
              form="circle"
              intensity={isDark ? 5 : 3}
              position={[-4, 1, 2]}
              scale={4}
              color={accent2}
            />
            <Lightformer
              form="circle"
              intensity={isDark ? 4 : 2.5}
              position={[4, -1, 2]}
              scale={4}
              color={accent}
            />
            <Lightformer
              form="rect"
              intensity={isDark ? 1.5 : 3}
              position={[0, -4, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[10, 10, 1]}
              color={isDark ? '#1a1235' : '#ffffff'}
            />
          </Environment>

          <Float speed={1.4} rotationIntensity={inspect ? 0.15 : 0.3} floatIntensity={0.5}>
            <DroneModel
              accent={accent}
              accent2={accent2}
              pointer={pointer.current}
              autoRotate={!inspect}
              spinSpeed={inspect ? 30 : 38}
            />
          </Float>

          <ScanRings accent={accent} />

          <Sparkles
            count={60}
            scale={[11, 6, 11]}
            size={2.4}
            speed={0.32}
            opacity={isDark ? 0.7 : 0.45}
            color={accent}
          />

          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={isDark ? 0.55 : 0.35}
            scale={13}
            blur={2.8}
            far={4}
            color={isDark ? '#000000' : '#2e2350'}
          />

          {inspect && (
            <OrbitControls
              enablePan={false}
              minDistance={4}
              maxDistance={11}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.9}
              autoRotate
              autoRotateSpeed={0.7}
              enableDamping
              dampingFactor={0.06}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
