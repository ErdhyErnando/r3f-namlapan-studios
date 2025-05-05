import { NamlapanStudio } from "./NamlapanStudio";
import { OrbitControls, Grid, useHelper } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion, useMotionValue, animate } from "framer-motion";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = (props) => {
  const { section, menuOpened } = props;
  const directionalLightRef = useRef();
  const { camera } = useThree();

  const initialCameraX = useRef(camera.position.x).current;
  const groupBasePosition = { x: 10, y: 17, z: 0 };

  const cameraPositionX = useMotionValue(initialCameraX);
  const cameraLookAtX = useMotionValue(groupBasePosition.x);

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? initialCameraX + 35 : initialCameraX, {
      type: "spring", stiffness: 150, damping: 20
    });
    animate(cameraLookAtX, menuOpened ? groupBasePosition.x - 35 : groupBasePosition.x, {
      type: "spring", stiffness: 150, damping: 20
    });
  }, [menuOpened, initialCameraX, groupBasePosition.x]); // Add dependencies

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    const lookAtY = groupBasePosition.y + 10;
    const lookAtZ = groupBasePosition.z;
    state.camera.lookAt(cameraLookAtX.get(), lookAtY, lookAtZ);
  });

  return (
    <>
      {/* <OrbitControls /> Disable OrbitControls if it interferes with animation */}
      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]} intensity={1.5}
        castShadow />
      <ambientLight intensity={2} />
      <motion.group
        position={[groupBasePosition.x, groupBasePosition.y, groupBasePosition.z]}
        rotation={[0, -Math.PI / 2, 0]} // Corrected Y rotation based on previous code
        scale={[0.7, 0.7, 0.7]}
        animate={{
          // Animate Y relative to the group's base Y position
          y: section === 0 ? groupBasePosition.y : groupBasePosition.y - 8,
        }}
      >
        <NamlapanStudio />
      </motion.group>
    </>
  );
}
