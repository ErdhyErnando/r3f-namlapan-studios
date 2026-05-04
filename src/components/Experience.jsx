import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { NamlapanStudioModel } from "./NamlapanStudioModel";

const MotionGroup = motion.group;

export const Experience = (props) => {
  const { section, isExploring } = props;
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 2.1, 8);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.05, 7.2]} fov={40} />
      <OrbitControls target={[2.1, 1.25, -0.45]} enabled={isExploring} enablePan={false} />
      <color attach="background" args={["#f5f21f"]} />
      <fog attach="fog" args={["#f5f21f", 12, 24]} />

      <ambientLight intensity={0.95} />
      <directionalLight position={[-4, 5, 5]} intensity={2.1} castShadow />
      <directionalLight position={[5, 4, 2]} intensity={1.3} color="#fffdf2" />
      <pointLight position={[1.8, 2.8, 3.2]} intensity={2.4} color="#fffdf2" />
      <pointLight position={[4.2, 1.7, -2]} intensity={1.8} color="#050505" />

      <MotionGroup
        position={[0, 0, 0]}
        animate={{
          y: section === 0 ? 0 : -1.8,
          rotateY: section === 0 ? 0 : -0.24,
        }}
        transition={{ type: "spring", stiffness: 65, damping: 20 }}
      >
        <NamlapanStudioModel position={[2.3, -0.36, -0.45]} rotation={[0, -0.42, 0]} scale={0.92} />
      </MotionGroup>
    </>
  );
};
