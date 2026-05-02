"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Html, Stars, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Coordinates for the markers
const MARKERS = [
  { id: 'in', name: 'India', lat: 20.5937, lng: 78.9629, reach: '95%', color: '#EE1D23' },
  { id: 'us', name: 'United States', lat: 37.0902, lng: -95.7129, reach: '90%', color: '#EE1D23' },
  { id: 'eu', name: 'Europe', lat: 54.5260, lng: 15.2551, reach: '80%', color: '#EE1D23' },
  { id: 'sea', name: 'Southeast Asia', lat: 13.41, lng: 103.52, reach: '70%', color: '#EE1D23' },
  { id: 'me', name: 'Middle East', lat: 29.2985, lng: 42.5510, reach: '75%', color: '#EE1D23' },
  { id: 'la', name: 'Latin America', lat: -14.2350, lng: -51.9253, reach: '85%', color: '#EE1D23' },
];

// Arcs to draw between regions
const ARCS = [
  { from: 'us', to: 'in', color: '#EE1D23' },
  { from: 'eu', to: 'in', color: '#94A3B8' },
  { from: 'sea', to: 'in', color: '#FF5800' },
  { from: 'us', to: 'eu', color: '#94A3B8' },
  { from: 'la', to: 'us', color: '#EE1D23' },
  { from: 'me', to: 'in', color: '#FF5800' },
];

const convertLatLongToSphere = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Component for connecting arcs with moving pulses
const Arc = ({ from, to, color }: { from: THREE.Vector3, to: THREE.Vector3, color: string }) => {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  const curve = new THREE.QuadraticBezierCurve3(
    from, 
    new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5).normalize().multiplyScalar(2.1 + from.distanceTo(to) * 0.4), 
    to
  );

  const points = curve.getPoints(64);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (lineRef.current) {
        const m = lineRef.current.material as THREE.LineBasicMaterial;
        m.opacity = 0.15 + Math.sin(time * 1.5) * 0.05;
    }
    if (pulseRef.current) {
        const t = (time * 0.3) % 1; // Pulse speed
        const pos = curve.getPointAt(t);
        pulseRef.current.position.set(pos.x, pos.y, pos.z);
        // Pulse size oscillation
        const s = 1 + Math.sin(time * 10) * 0.3;
        pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
        <line ref={lineRef as any}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={color} transparent opacity={0.2} linewidth={1} blending={THREE.AdditiveBlending} />
        </line>
        
        {/* Data Pulse Dot */}
        <mesh ref={pulseRef}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
        </mesh>
    </group>
  );
};

// Component for vertical light beams
const LightBeam = ({ position, color }: { position: THREE.Vector3, color: string }) => {
    const beamRef = useRef<THREE.Mesh>(null);
    const height = 0.8;

    useFrame((state) => {
        if (beamRef.current) {
            const s = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
            beamRef.current.scale.set(s, 1, s);
            const m = beamRef.current.material as THREE.MeshBasicMaterial;
            m.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        }
    });

    return (
        <mesh ref={beamRef} position={[0, height / 2, 0]}>
            <cylinderGeometry args={[0.005, 0.03, height, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};


const GlobeMarker = ({ position, label, reach }: { position: THREE.Vector3, label: string, reach: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate orientation to face away from center (normal to surface)
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const s = 1 + Math.sin(time * 4) * 0.2;
      meshRef.current.scale.set(s, 1, s); // Scale flat on surface
    }
  });

  return (
    <group position={position} quaternion={orientation}>
      {/* Outer Glow Ring - Flat on surface */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.1, 32]} />
        <meshBasicMaterial color="#EE1D23" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Center Point */}
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#EE1D23" />
      </mesh>

      {/* Label - Anchored slightly above surface */}
      <Html 
        distanceFactor={10} 
        position={[0, 0.05, 0]} 
        center 
        occlude 
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          <div className="bg-brand-black/90 backdrop-blur-xl px-2.5 py-1 rounded-full border border-white/10 text-[8px] font-bold text-white uppercase tracking-[0.2em] mb-1 shadow-2xl whitespace-nowrap">
            {label}
          </div>
          <div className="text-[10px] font-black text-brand-red tracking-tighter">{reach}</div>
        </div>
      </Html>

      {/* Subtle Beam - Vertical relative to surface */}
      <LightBeam position={new THREE.Vector3(0, 0, 0)} color="#EE1D23" />
    </group>
  );
};

const GlobeCore = () => {
  const globeRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // High-resolution premium textures
  const dayMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const nightMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-night.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-topology.png');

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001; // Slower, more cinematic rotation
    }
    if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(1.02 + Math.sin(time * 0.5) * 0.01);
    }
  });

  const markerPositions = useMemo(() => {
    return MARKERS.reduce((acc, m) => {
        acc[m.id] = convertLatLongToSphere(m.lat, m.lng, 2.1); // Reduced radius from 2.5
        return acc;
    }, {} as Record<string, THREE.Vector3>);
  }, []);

  return (
    <group ref={globeRef} position={[0, 0, 0]}> {/* Perfect centering at origin */}
      {/* Base Earth Layer */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2.1, 128, 128]} />
        <meshStandardMaterial 
          map={dayMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          roughness={0.7}
          metalness={0.2}
          emissiveMap={nightMap}
          emissive={new THREE.Color('#FFCC00')} 
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Atmospheric Glow Shell */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshStandardMaterial 
          color="#1e3a8a"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Connections Layer */}
      {ARCS.map((arc, i) => (
          <Arc 
            key={i} 
            from={markerPositions[arc.from]} 
            to={markerPositions[arc.to]} 
            color={arc.color} 
          />
      ))}

      {/* Regional Anchors */}
      {MARKERS.map((m, i) => (
        <GlobeMarker 
          key={i} 
          position={markerPositions[m.id]} 
          label={m.name} 
          reach={m.reach}
        />
      ))}
    </group>
  );
};

export const InteractiveGlobe = () => {
  return (
    <div className="w-full h-full min-h-[450px] md:min-h-[700px] relative">
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-brand-black/20 to-brand-black/80 z-10" />
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 45 }} // Pulled camera back slightly
        gl={{ antialias: true, alpha: true }}
      >
        <SceneController />
        <React.Suspense fallback={null}>
          <GlobeCore />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

const SceneController = () => {
    const { camera, viewport } = useThree();
    
    useFrame(() => {
        // Dynamic camera positioning based on viewport width
        const isMobile = viewport.width < 10; 
        const targetZ = isMobile ? 10 : 8;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    });

    return (
        <>
            <PerspectiveCamera makeDefault />
            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 1.5} 
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
            />
            
            {/* Cinematic Lighting Setup */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3b82f6" castShadow />
            <pointLight position={[-10, -5, -10]} intensity={1.5} color="#1e3a8a" />
            <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
            
            {/* Starry Background */}
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
        </>
    );
}
