"use client";
// components/ModelLoader.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ModelProps {
  path: string;
}

const Model: React.FC<ModelProps> = ({ path }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef<THREE.Group>(scene as THREE.Group);

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);
  return <primitive ref={modelRef} object={scene} />;
};

const ModelLoader: React.FC = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Suspense fallback={null}>
        <Model path="/scene.gltf" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelLoader;
