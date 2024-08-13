"use client";
// components/ModelLoader.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap, { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/all";

interface ModelProps {
  path: string;
}

const Model: React.FC<ModelProps> = ({ path }) => {
  const { scene } = useGLTF(path);
  const modelRef = useRef<THREE.Group>(scene as THREE.Group);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(3, 1.25, 1);
      //   let tween2 = gsap.to(modelRef.current.rotation, {
      //     y: Math.PI * 2,
      //     duration: 5,
      //     ease: "power2.inOut",
      //     repeat: -1,
      //     yoyo: true,
      //   });
      //   tween2.delay(2);
      //   let tween = gsap.to(modelRef.current.scale, {
      //     x: 1.5,
      //     y: 1.5,
      //     z: 1.5,
      //     duration: 2,
      //     ease: Power2.easeInOut,
      //     repeat: -1,
      //     yoyo: true,
      //     stagger: 0.1,
      //     transformOrigin: "center",
      //   });
      //   tween.delay(5);
    }
  }, []);
  return <primitive ref={modelRef} object={scene} />;
};

const ModelLoader: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null); // Define modelRef here

  useEffect(() => {
    if (triggerRef.current && modelRef.current) {
      //   let tl = gsap.to(modelRef.current.position, {
      //     duration: 3,
      //     scrollTrigger: {
      //       trigger: triggerRef.current,
      //       start: "top top",
      //       end: "bottom top",
      //       scrub: 1,
      //     },
      //   });
    }
  }, []);

  return (
    <>
      <div className="h-full w-full bg-blue-700"></div>
      <div ref={triggerRef} />
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Suspense fallback={null}>
          <Model path="/scene.gltf" />
        </Suspense>
        {/* <OrbitControls enableZoom={false} /> */}
      </Canvas>
    </>
  );
};

export default ModelLoader;
