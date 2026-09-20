'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles, Trail } from '@react-three/drei';
import * as THREE from 'three';
import DroneModel from './DroneModel';

const START_X = -8.4;
const END_X = 8.4;

/** Flies the drone left → right once, banking into the run and pulling up on exit. */
function FlightPath({
  accent,
  accent2,
  duration,
  onPass,
}: {
  accent: string;
  accent2: string;
  duration: number;
  onPass?: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const fired = useRef(false);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const p = Math.min(elapsed.current / duration, 1);
    // ease-in-out so it accelerates in and eases out of frame
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

    if (!group.current) return;
    group.current.position.x = THREE.MathUtils.lerp(START_X, END_X, eased);
    group.current.position.y = Math.sin(p * Math.PI) * 0.55 - 0.25 + Math.sin(elapsed.current * 4) * 0.05;
    group.current.position.z = Math.sin(p * Math.PI) * 0.9;
    // bank hard through the middle of the pass, level out at the ends
    group.current.rotation.z = -Math.sin(p * Math.PI) * 0.38;
    group.current.rotation.y = Math.PI / 2 + Math.sin(p * Math.PI) * 0.22;
    group.current.rotation.x = 0.12 - Math.cos(p * Math.PI) * 0.1;

    if (!fired.current && p >= 0.72) {
      fired.current = true;
      onPass?.();
    }
  });

  return (
    <group ref={group} scale={0.5}>
      <Trail width={2.6} length={5} color={accent} attenuation={(w) => w * w} decay={1.4}>
        <mesh visible={false}>
          <sphereGeometry args={[0.05, 8, 8]} />
        </mesh>
      </Trail>
      <DroneModel accent={accent} accent2={accent2} autoRotate={false} spinSpeed={48} />
    </group>
  );
}

export default function FlyByScene({
  isDark,
  duration = 2.4,
  onPass,
}: {
  isDark: boolean;
  duration?: number;
  onPass?: () => void;
}) {
  const accent = isDark ? '#a78bfa' : '#7c3aed';
  const accent2 = isDark ? '#22d3ee' : '#0891b2';

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <hemisphereLight intensity={isDark ? 0.6 : 1.1} groundColor={isDark ? '#0c0718' : '#e6e2f0'} />
      <directionalLight position={[3, 5, 4]} intensity={isDark ? 2.4 : 3} />
      <pointLight position={[-5, 1, 2]} intensity={20} color={accent2} />
      <pointLight position={[5, -1, 2]} intensity={16} color={accent} />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 3, -2]} scale={[8, 3, 1]} />
        <Lightformer form="circle" intensity={4} position={[-4, 0, 2]} scale={4} color={accent2} />
        <Lightformer form="circle" intensity={3} position={[4, 0, 2]} scale={4} color={accent} />
      </Environment>

      <FlightPath accent={accent} accent2={accent2} duration={duration} onPass={onPass} />

      <Sparkles count={40} scale={[12, 4, 4]} size={2} speed={0.5} opacity={0.6} color={accent} />
    </Canvas>
  );
}
