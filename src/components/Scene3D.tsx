import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

function FloatingBox({ position, color, size = 1, speed = 1 }: { position: [number, number, number]; color: string; size?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  const edges = useMemo(() => new THREE.BoxGeometry(size, size, size), [size]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[edges]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function FloatingSphere({ position, color, size = 0.7 }: { position: [number, number, number]; color: string; size?: number }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.2} />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusGeometry(0.5, 0.2, 16, 32), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.2, 16, 32]} />
        <meshStandardMaterial color={color} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function FloatingCone({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.ConeGeometry(0.5, 1, 4), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color={color} flatShading />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.OctahedronGeometry(0.6), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color={color} flatShading />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.08,
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function Shapes() {
  return (
    <MouseParallax>
      {/* Neo-brutalist color palette - positioned around the hero content, avoiding center */}
      {/* Left side */}
      <FloatingBox position={[-5.5, 2, -2]} color="#BFFF00" size={1.2} speed={0.8} />
      <FloatingSphere position={[-6, -1, -1]} color="#BFFF00" size={0.6} />
      <FloatingTorus position={[-4.5, -2.5, -1.5]} color="#00D4FF" />
      
      {/* Right side */}
      <FloatingSphere position={[5.5, -1, -1]} color="#FF3399" size={0.9} />
      <FloatingCone position={[5, 2.5, -1]} color="#BFFF00" />
      <FloatingBox position={[6, 0, -2]} color="#00D4FF" size={0.8} speed={1.2} />
      
      {/* Top */}
      <FloatingBox position={[2.5, 3.5, -3]} color="#FF3399" size={0.6} speed={0.6} />
      <FloatingTorus position={[-2.5, 3.5, -2]} color="#BFFF00" />
      
      {/* Bottom */}
      <FloatingOctahedron position={[0, -3.5, -1]} color="#FF3399" />
      <FloatingCone position={[-3, -3, -2]} color="#00D4FF" />
      <FloatingBox position={[3.5, -3, -2]} color="#BFFF00" size={0.7} speed={0.9} />
    </MouseParallax>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} color="#FF3399" intensity={0.6} />
          <pointLight position={[10, 10, 10]} color="#BFFF00" intensity={0.6} />
          <pointLight position={[0, -5, 5]} color="#00D4FF" intensity={0.4} />
          <Shapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
