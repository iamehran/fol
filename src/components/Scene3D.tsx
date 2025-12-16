import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';

// Tool-themed 3D shapes representing automation tools

function ToolBox({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edges = useMemo(() => new THREE.BoxGeometry(size, size * 0.3, size * 0.6), [size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group position={position}>
        <mesh ref={meshRef}>
          <boxGeometry args={[size, size * 0.3, size * 0.6]} />
          <meshStandardMaterial color={color} />
          <lineSegments>
            <edgesGeometry attach="geometry" args={[edges]} />
            <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
          </lineSegments>
        </mesh>
      </group>
    </Float>
  );
}

function WorkflowNode({ position, color, size = 0.6 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(size, size, size * 0.2), [size]);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size, size * 0.2]} />
        <meshStandardMaterial color={color} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function Connector({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
        <meshStandardMaterial color={color} />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function GearShape({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusGeometry(0.5, 0.15, 8, 6), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.5, 0.15, 8, 6]} />
        <meshStandardMaterial color={color} flatShading />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function ZapBolt({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.ConeGeometry(0.3, 1.2, 3), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.3, 1.2, 3]} />
        <meshStandardMaterial color={color} flatShading />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function DataFlow({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.OctahedronGeometry(0.4), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial color={color} flatShading />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geo]} />
          <lineBasicMaterial attach="material" color="#0d0d0d" linewidth={2} />
        </lineSegments>
      </mesh>
    </Float>
  );
}

function APIBlock({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.BoxGeometry(0.8, 0.4, 0.15), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.4, 0.15]} />
        <meshStandardMaterial color={color} />
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
      {/* Tool-themed shapes representing automation tools - positioned around hero */}
      
      {/* Left side - n8n/workflow themed */}
      <WorkflowNode position={[-5.5, 2, -2]} color="#FF6D5A" size={0.8} />
      <Connector position={[-5, 0.5, -1.5]} color="#BFFF00" />
      <WorkflowNode position={[-6, -1.5, -1]} color="#BFFF00" size={0.6} />
      
      {/* Right side - Zapier/automation themed */}
      <ZapBolt position={[5.5, 2, -1]} color="#FF9500" />
      <GearShape position={[6, -0.5, -2]} color="#00D4FF" />
      <APIBlock position={[5, -2.5, -1.5]} color="#BFFF00" />
      
      {/* Top - Data/integration themed */}
      <DataFlow position={[2, 3.5, -2]} color="#FF3399" />
      <ToolBox position={[-2.5, 3, -2.5]} color="#00D4FF" size={0.9} />
      
      {/* Bottom - More workflow elements */}
      <GearShape position={[-3, -3, -1]} color="#FF9500" />
      <DataFlow position={[0, -3.5, -1.5]} color="#BFFF00" />
      <WorkflowNode position={[3.5, -2.8, -2]} color="#FF6D5A" size={0.7} />
      <Connector position={[4.5, -1, -2.5]} color="#FF3399" />
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
          <pointLight position={[-10, -10, -10]} color="#FF6D5A" intensity={0.6} />
          <pointLight position={[10, 10, 10]} color="#BFFF00" intensity={0.6} />
          <pointLight position={[0, -5, 5]} color="#00D4FF" intensity={0.4} />
          <Shapes />
        </Suspense>
      </Canvas>
    </div>
  );
}
