"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

const HouseModel: React.FC<{ isInterior: boolean }> = ({ isInterior }) => {
  const { scene } = useGLTF(
    isInterior ? "/interioir/scene.gltf" : "/low_poly_home_2/scene.gltf"
  );

  const scale = isInterior ? [0.5, 0.5, 0.5] : [1, 1, 1]; // Adjust the scale if necessary

  return <primitive object={scene} scale={scale} />;
};

const PassThroughDoor: React.FC<{
  setIsInterior: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsInterior }) => {
  const { camera } = useThree();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsInterior(true); // Switch to interior model
        // Adjust camera position for the interior view
        camera.position.set(-5, 2, -5);
        const perspectiveCamera = camera as THREE.PerspectiveCamera;
        perspectiveCamera.fov = 75; // Adjust the FOV for the interior view
        perspectiveCamera.updateProjectionMatrix(); // Apply the changes
      },
    });

    // Animate the camera moving forward through the door
    tl.to(camera.position, {
      x: -8, // Adjust depending on the door's position
      y: 1, // Adjust for height if necessary
      z: -1, // Move the camera closer
      duration: 12,
      ease: "power3.inOut",
    }).to(camera.position, {
      z: -2, // Move the camera through the door (adjust the value to fit your model)
      duration: 3,
      ease: "power3.inOut",
    });
  }, [camera, setIsInterior]);

  return null;
};

const Home: React.FC = () => {
  const [isInterior, setIsInterior] = useState(false); // Track if inside the building

  return (
    <div className="canvas-wrapper" style={{ height: "100vh" }}>
      <Canvas camera={{ position: [50, 1, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Suspense fallback={null}>
          <HouseModel
            isInterior={isInterior}
            key={isInterior ? "interior" : "exterior"}
          />
          <PassThroughDoor setIsInterior={setIsInterior} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
