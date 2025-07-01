// import { NamlapanStudio } from "./NamlapanStudio";
// import { OrbitControls, Grid, useHelper } from "@react-three/drei";
// import { useRef, useEffect } from "react";
// import * as THREE from "three";
// import { motion, useMotionValue, animate } from "framer-motion";
// import { useFrame, useThree } from "@react-three/fiber";
// import { PhotoStudio } from "./PhotoStudio";

// export const Experience = (props) => {
//   const { section, menuOpened } = props;
//   const directionalLightRef = useRef();
//   const { camera } = useThree();

//   useEffect(() => {
//     camera.position.set(0, 0, 0);
//   }, [camera]);

//   const initialCameraX = useRef(camera.position.x).current;
//   const groupBasePosition = { x: 5, y: 0, z: 0 };

//   const cameraPositionX = useMotionValue(initialCameraX);
//   const cameraLookAtX = useMotionValue(groupBasePosition.x);

//   useEffect(() => {
//     animate(cameraPositionX, menuOpened ? initialCameraX + 5 : initialCameraX, {
//       type: "spring", stiffness: 150, damping: 20
//     });
//     animate(cameraLookAtX, menuOpened ? groupBasePosition.x - 5 : groupBasePosition.x, {
//       type: "spring", stiffness: 150, damping: 20
//     });
//   }, [menuOpened, initialCameraX, groupBasePosition.x]); // Add dependencies

//   useFrame((state) => {
//     state.camera.position.x = cameraPositionX.get();
//     const lookAtY = groupBasePosition.y + 1;
//     const lookAtZ = groupBasePosition.z;
//     state.camera.lookAt(cameraLookAtX.get(), lookAtY, lookAtZ);
//   });

//   return (
//     <>
//       <OrbitControls />
//       <directionalLight
//         ref={directionalLightRef}
//         position={[1, 2, 3]} intensity={1.5}
//         castShadow />
//       <ambientLight intensity={2} />
//       <motion.group
//         position={[groupBasePosition.x, groupBasePosition.y, groupBasePosition.z]}
//         rotation={[0, -Math.PI / 2, 0]} // Corrected Y rotation based on previous code
//         scale={[0.7, 0.7, 0.7]}
//         animate={{
//           // Animate Y relative to the group's base Y position
//           y: section === 0 ? groupBasePosition.y : groupBasePosition.y - 2,
//         }}
//       >
//         <PhotoStudio />
//         {/* <NamlapanStudio /> */}
//       </motion.group>
//     </>
//   );
// }
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useThree } from "@react-three/fiber";
import { PhotoStudio } from "./PhotoStudio";

export const Experience = (props) => {
  const { section, isExploring } = props;
  const directionalLightRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    // Set a good initial camera position to see the model from the front
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 1, 0); // Make camera look at the center of the studio
  }, [camera]);

  // Center the model at the origin for easier orbiting
  const groupBasePosition = { x: 0, y: 0, z: 0 };

  return (
    <>
      {/* OrbitControls will now handle all camera movement */}
      <OrbitControls target={[0, 1, 0]} enabled={isExploring} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]} intensity={1.5}
        castShadow />
      <ambientLight intensity={1.5} />
      <motion.group
        position={[groupBasePosition.x, groupBasePosition.y, groupBasePosition.z]}
        rotation={[0, 0, 0]} // Start with no rotation, OrbitControls will handle the view
        scale={[0.7, 0.7, 0.7]}
        animate={{
          // Animate Y relative to the group's base Y position
          y: section === 0 ? groupBasePosition.y : groupBasePosition.y - 2,
        }}
      >
        <PhotoStudio />
        {/* <NamlapanStudio /> */}
      </motion.group>
    </>
  );
}