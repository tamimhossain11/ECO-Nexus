'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 * Rotor assembly
 * ------------------------------------------------------------------ */

/** Planform of one blade: narrow root, wide belly, rounded tip. */
function useBladeGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0.12, -0.045);
    s.bezierCurveTo(0.34, -0.105, 0.56, -0.125, 0.68, -0.085);
    s.quadraticCurveTo(0.78, -0.03, 0.76, 0.035);
    s.bezierCurveTo(0.56, 0.105, 0.34, 0.09, 0.12, 0.05);
    s.closePath();

    const g = new THREE.ExtrudeGeometry(s, {
      depth: 0.016,
      bevelEnabled: true,
      bevelSize: 0.006,
      bevelThickness: 0.006,
      bevelSegments: 2,
      curveSegments: 14,
    });
    // extruded in XY, lay it flat into the XZ rotor plane
    g.rotateX(-Math.PI / 2);
    g.center();
    g.translate(0.44, 0, 0);
    return g;
  }, []);
}

const BLADES = 3;
const GHOSTS = [
  { offset: 0, opacity: 1 },
  { offset: 0.14, opacity: 0.4 },
  { offset: 0.28, opacity: 0.24 },
  { offset: 0.44, opacity: 0.14 },
  { offset: 0.62, opacity: 0.07 },
];

type RotorProps = {
  position: [number, number, number];
  direction: number;
  accent: string;
  /** target angular velocity in rad/s */
  speed: number;
  guardRadius: number;
};

/**
 * A rotor pod: chunky outrunner motor, three-blade prop and a set of trailing
 * ghost copies that read as motion blur once the prop is up to speed.
 */
function Rotor({ position, direction, accent, speed, guardRadius }: RotorProps) {
  const blades = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const rpm = useRef(0);
  const geometry = useBladeGeometry();

  const bladeAngles = useMemo(
    () => Array.from({ length: BLADES }, (_, i) => (i / BLADES) * Math.PI * 2),
    [],
  );

  useFrame((_, delta) => {
    // spool up smoothly instead of snapping to full speed on mount
    rpm.current = THREE.MathUtils.damp(rpm.current, speed, 2.2, delta);
    const spin = delta * rpm.current * direction;
    if (blades.current) blades.current.rotation.y += spin;
    if (disc.current) {
      disc.current.rotation.z -= spin * 0.3;
      const mat = disc.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + (rpm.current / speed) * 0.09;
    }
  });

  return (
    <group position={position}>
      {/* motor mount plate */}
      <mesh position={[0, -0.03, 0]} castShadow>
        <cylinderGeometry args={[0.23, 0.25, 0.07, 24]} />
        <meshStandardMaterial color="#0f1720" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* stator can */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.19, 0.21, 0.19, 30]} />
        <meshStandardMaterial color="#1b2430" metalness={0.95} roughness={0.3} />
      </mesh>
      {/* cooling slots */}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <mesh
            key={a}
            position={[Math.cos(a) * 0.2, 0.09, Math.sin(a) * 0.2]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[0.02, 0.11, 0.035]} />
            <meshStandardMaterial color="#05090d" metalness={0.4} roughness={0.9} />
          </mesh>
        );
      })}
      {/* accent ring between stator and bell */}
      <mesh position={[0, 0.19, 0]}>
        <torusGeometry args={[0.185, 0.026, 14, 40]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={1.6}
          metalness={0.4}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* bell + prop hub */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.13, 26]} />
        <meshStandardMaterial color="#354656" metalness={1} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.06, 20]} />
        <meshStandardMaterial color="#202c38" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* hub bolts */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={a} position={[Math.cos(a) * 0.07, 0.39, Math.sin(a) * 0.07]}>
            <cylinderGeometry args={[0.014, 0.014, 0.02, 8]} />
            <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}

      {/* three-blade prop + motion-blur ghosts */}
      <group ref={blades} position={[0, 0.4, 0]}>
        {GHOSTS.map((ghost, gi) => (
          <group key={gi} rotation={[0, -ghost.offset * direction, 0]}>
            {bladeAngles.map((a) => (
              <group key={a} rotation={[0, a, 0]}>
                <mesh
                  geometry={geometry}
                  rotation={[direction > 0 ? 0.26 : -0.26, 0, 0]}
                  castShadow={gi === 0}
                >
                  <meshStandardMaterial
                    color="#17202b"
                    metalness={0.45}
                    roughness={0.42}
                    transparent={gi > 0}
                    opacity={ghost.opacity}
                    depthWrite={gi === 0}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* rotor wash disc */}
      <mesh ref={disc} position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.14, 0.78, 64]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* prop guard */}
      <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[guardRadius, 0.016, 10, 72]} />
        <meshStandardMaterial
          color="#1a2531"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* guard stanchions */}
      {Array.from({ length: 3 }).map((_, i) => {
        const a = (i / 3) * Math.PI * 2 + 0.4;
        const mid = (guardRadius + 0.2) / 2;
        return (
          <mesh
            key={a}
            position={[Math.cos(a) * mid, 0.32, Math.sin(a) * mid]}
            rotation={[0, -a, -0.26]}
          >
            <boxGeometry args={[guardRadius - 0.2, 0.022, 0.05]} />
            <meshStandardMaterial color="#141d27" metalness={0.7} roughness={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Payloads
 * ------------------------------------------------------------------ */

/** Nose gimbal: RGB + thermal sensor head that idles through a slow sweep. */
function Gimbal({ accent }: { accent: string }) {
  const yaw = useRef<THREE.Group>(null);
  const pitch = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (yaw.current) yaw.current.rotation.y = Math.sin(t * 0.45) * 0.6;
    if (pitch.current) pitch.current.rotation.x = -0.3 + Math.sin(t * 0.32) * 0.2;
  });

  return (
    <group position={[0, -0.32, 0.42]}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.34, 0.16, 0.18]} />
        <meshStandardMaterial color="#1b2430" metalness={0.9} roughness={0.3} />
      </mesh>
      <group ref={yaw}>
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 22]} />
          <meshStandardMaterial color="#2a3644" metalness={0.95} roughness={0.22} />
        </mesh>
        <group ref={pitch} position={[0, -0.15, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.2, 30, 30]} />
            <meshStandardMaterial color="#10171f" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* main lens */}
          <mesh position={[0, 0, 0.17]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.11, 0.09, 26]} />
            <meshStandardMaterial color="#05090d" metalness={1} roughness={0.05} />
          </mesh>
          <mesh position={[0, 0, 0.225]}>
            <circleGeometry args={[0.082, 26]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
          {/* thermal core */}
          <mesh position={[0.14, 0.03, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.052, 0.07, 20]} />
            <meshStandardMaterial
              color="#ff8a3d"
              emissive="#ff6a1a"
              emissiveIntensity={1.3}
              metalness={0.6}
              roughness={0.25}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/** Underslung precision-spray tank with four nozzles. */
function SprayModule({ accent }: { accent: string }) {
  const nozzles = useMemo(
    () =>
      [
        [-0.58, -0.5, -0.24],
        [0.58, -0.5, -0.24],
        [-0.58, -0.5, 0.16],
        [0.58, -0.5, 0.16],
      ] as [number, number, number][],
    [],
  );

  return (
    <group>
      <mesh position={[0, -0.4, -0.22]} castShadow>
        <capsuleGeometry args={[0.24, 0.72, 10, 24]} />
        <meshStandardMaterial
          color="#181433"
          metalness={0.3}
          roughness={0.14}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0, -0.52, -0.22]}>
        <capsuleGeometry args={[0.222, 0.4, 10, 24]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
          roughness={0.1}
        />
      </mesh>
      {/* feed lines */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.3, -0.5, -0.05]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.016, 0.016, 0.6, 8]} />
          <meshStandardMaterial color="#26323d" metalness={0.6} roughness={0.5} />
        </mesh>
      ))}
      {nozzles.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <coneGeometry args={[0.052, 0.12, 14]} />
          <meshStandardMaterial color="#2b3947" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/** Twin landing skids: angled struts into a pair of fore-aft tubes. */
function LandingGear() {
  return (
    <group position={[0, -0.2, 0]}>
      {[-1, 1].map((side) => (
        <group key={side}>
          {[0.38, -0.38].map((z) => (
            <mesh
              key={z}
              position={[side * 0.34, -0.26, z]}
              rotation={[0, 0, side * 0.44]}
              castShadow
            >
              <cylinderGeometry args={[0.032, 0.032, 0.56, 14]} />
              <meshStandardMaterial color="#232f3c" metalness={0.85} roughness={0.32} />
            </mesh>
          ))}
          <mesh position={[side * 0.57, -0.52, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <capsuleGeometry args={[0.042, 1.14, 8, 16]} />
            <meshStandardMaterial color="#151e28" metalness={0.5} roughness={0.55} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Aircraft
 * ------------------------------------------------------------------ */

export type DroneModelProps = {
  accent?: string;
  accent2?: string;
  pointer?: { x: number; y: number };
  spinSpeed?: number;
  autoRotate?: boolean;
};

export default function DroneModel({
  accent = '#a78bfa',
  accent2 = '#22d3ee',
  pointer = { x: 0, y: 0 },
  spinSpeed = 34,
  autoRotate = true,
}: DroneModelProps) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.MeshStandardMaterial>(null);

  const reach = 1.22;
  const armAngles = useMemo(
    () => [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4],
    [],
  );
  // keep neighbouring guards clear of each other
  const guardRadius = (reach * Math.SQRT2) / 2 - 0.06;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (root.current) {
      root.current.position.y = Math.sin(t * 1.05) * 0.1;
      if (autoRotate) root.current.rotation.y += delta * 0.16;
    }

    if (body.current) {
      // lean toward the pointer like an aircraft answering stick input
      const targetX =
        THREE.MathUtils.clamp(pointer.y * 0.3, -0.36, 0.36) + Math.sin(t * 0.7) * 0.025;
      const targetZ = THREE.MathUtils.clamp(-pointer.x * 0.3, -0.36, 0.36);
      body.current.rotation.x = THREE.MathUtils.damp(body.current.rotation.x, targetX, 3, delta);
      body.current.rotation.z = THREE.MathUtils.damp(body.current.rotation.z, targetZ, 3, delta);
      // slow yaw correction, as if holding a heading against wind
      body.current.rotation.y = Math.sin(t * 0.42) * 0.045;
    }

    if (beacon.current) {
      const strobe = Math.pow((Math.sin(t * 5) + 1) / 2, 8);
      beacon.current.emissiveIntensity = 0.5 + strobe * 7;
    }
  });

  return (
    <group ref={root} scale={1}>
      <group ref={body}>
        {/* ---- fuselage ---- */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.02, 0.36, 1.42]} />
          <meshStandardMaterial color="#141d26" metalness={0.85} roughness={0.32} />
        </mesh>
        {/* belly plate */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.88, 0.09, 1.24]} />
          <meshStandardMaterial color="#0b1219" metalness={0.5} roughness={0.7} />
        </mesh>
        {/* upper deck */}
        <mesh position={[0, 0.21, -0.06]} castShadow>
          <boxGeometry args={[0.86, 0.12, 1.16]} />
          <meshStandardMaterial color="#0c141b" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* battery pack */}
        <mesh position={[0, 0.32, -0.34]} castShadow>
          <boxGeometry args={[0.6, 0.18, 0.5]} />
          <meshStandardMaterial color="#182330" metalness={0.75} roughness={0.38} />
        </mesh>
        {[-0.18, 0, 0.18].map((x) => (
          <mesh key={x} position={[x, 0.42, -0.34]}>
            <boxGeometry args={[0.07, 0.012, 0.42]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={1.6}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* canopy */}
        <mesh position={[0, 0.3, 0.26]} castShadow>
          <sphereGeometry args={[0.36, 34, 26, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
          <meshStandardMaterial
            color="#180f33"
            metalness={0.45}
            roughness={0.05}
            transparent
            opacity={0.92}
            envMapIntensity={1.7}
          />
        </mesh>

        {/* nose */}
        <mesh position={[0, -0.02, 0.8]} rotation={[Math.PI / 2, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[0.36, 0.46, 4]} />
          <meshStandardMaterial color="#182430" metalness={0.9} roughness={0.28} />
        </mesh>

        {/* hull light strips */}
        {[-0.52, 0.52].map((x) => (
          <mesh key={x} position={[x, 0.04, 0]}>
            <boxGeometry args={[0.025, 0.07, 1.14]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={2.6}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* GPS puck */}
        <mesh position={[0, 0.44, 0.02]} castShadow>
          <cylinderGeometry args={[0.15, 0.16, 0.07, 22]} />
          <meshStandardMaterial color="#26323f" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.482, 0.02]}>
          <cylinderGeometry args={[0.1, 0.1, 0.014, 22]} />
          <meshStandardMaterial
            color={accent2}
            emissive={accent2}
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </mesh>

        {/* rear beacon + antennae */}
        <mesh position={[0, 0.2, -0.76]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial
            ref={beacon}
            color={accent2}
            emissive={accent2}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
        {[-0.34, 0.34].map((x) => (
          <mesh key={x} position={[x, 0.22, -0.7]} rotation={[0.38, 0, 0]} castShadow>
            <cylinderGeometry args={[0.016, 0.016, 0.5, 10]} />
            <meshStandardMaterial color="#38424e" metalness={0.8} roughness={0.4} />
          </mesh>
        ))}

        {/* ---- arms + rotor pods (X configuration) ---- */}
        {armAngles.map((angle, i) => {
          const x = Math.cos(angle) * reach;
          const z = Math.sin(angle) * reach;
          const cw = i % 2 === 0;
          return (
            <group key={angle}>
              {/* boom */}
              <mesh position={[x / 2, 0.03, z / 2]} rotation={[0, -angle, 0]} castShadow>
                <boxGeometry args={[reach, 0.14, 0.22]} />
                <meshStandardMaterial color="#111a22" metalness={0.75} roughness={0.42} />
              </mesh>
              {/* boom shoulder */}
              <mesh
                position={[Math.cos(angle) * 0.42, 0.03, Math.sin(angle) * 0.42]}
                rotation={[0, -angle, 0]}
                castShadow
              >
                <boxGeometry args={[0.3, 0.2, 0.3]} />
                <meshStandardMaterial color="#182430" metalness={0.8} roughness={0.36} />
              </mesh>
              {/* accent inlay */}
              <mesh position={[x / 2, 0.105, z / 2]} rotation={[0, -angle, 0]}>
                <boxGeometry args={[reach * 0.84, 0.014, 0.07]} />
                <meshStandardMaterial
                  color={cw ? accent : accent2}
                  emissive={cw ? accent : accent2}
                  emissiveIntensity={2}
                  toneMapped={false}
                />
              </mesh>

              <Rotor
                position={[x, 0.08, z]}
                direction={cw ? 1 : -1}
                accent={cw ? accent : accent2}
                speed={spinSpeed}
                guardRadius={guardRadius}
              />
            </group>
          );
        })}

        <LandingGear />
        <Gimbal accent={accent2} />
        <SprayModule accent={accent} />
      </group>
    </group>
  );
}
