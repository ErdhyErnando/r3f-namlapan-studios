import { NamlapanStudio } from "./NamlapanStudio";
import { OrbitControls, Grid, useHelper } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

export const Experience = (props) => {
  const { section } = props;
  const directionalLightRef = useRef();

  {/*
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");
*/}

  return (
    <>
     {/*
      <OrbitControls intensity={1} />
     */}
      {/* <axesHelper args={[1]} />*/}
      <directionalLight ref={directionalLightRef} position={[1, 2, 3]} intensity={1.5} castShadow />
      <ambientLight intensity={2} />
      <motion.group position={[5, -25, 2]} 
        rotation={[0, Math.PI / -2, 0]} 
        scale={[0.7, 0.7, 0.7]}
        rotation-y={-Math.PI / 2}
        animation={{
          y: section === 0 ? 0 : -10,
        }}
      >
        <NamlapanStudio />
      </motion.group>
      {/* <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh> */}
    </>
  );
}
