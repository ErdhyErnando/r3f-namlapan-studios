import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import { useReducedMotion } from "framer-motion";
import { NamlapanStudioModel } from "./NamlapanStudioModel";

// Replaces a framer-motion-3d spring (stiffness 65, damping 20, mass 1).
// That spring is overdamped, so its response is dominated by the slower pole
// at s = -ζωn + ωn√(ζ²-1) ≈ -4.1 rad/s; `damp` at 4 matches its settle time.
const SECTION_DAMPING = 4;

const SECTION_OFFSET_Y = -1.8;
const SECTION_TILT_Y = -0.24;

export const Experience = (props) => {
  const { section, isExploring } = props;
  const { camera } = useThree();
  const rigRef = useRef();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    camera.position.set(0, 2.1, 8);
    camera.lookAt(0, 1, 0);
  }, [camera]);

  // framer-motion-3d was deprecated upstream (motiondivision/motion#3044) and
  // its peer range stops at @react-three/fiber 8. It animated exactly two
  // properties, so a delta-aware useFrame replaces it in a few lines.
  useFrame((_, delta) => {
    const rig = rigRef.current;
    if (!rig) {
      return;
    }

    const targetY = section === 0 ? 0 : SECTION_OFFSET_Y;
    const targetRotationY = section === 0 ? 0 : SECTION_TILT_Y;

    if (prefersReducedMotion) {
      rig.position.y = targetY;
      rig.rotation.y = targetRotationY;
      return;
    }

    rig.position.y = MathUtils.damp(rig.position.y, targetY, SECTION_DAMPING, delta);
    rig.rotation.y = MathUtils.damp(rig.rotation.y, targetRotationY, SECTION_DAMPING, delta);
  });

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

      <group ref={rigRef} position={[0, 0, 0]}>
        <NamlapanStudioModel position={[2.3, -0.36, -0.45]} rotation={[0, -0.42, 0]} scale={0.92} />
      </group>
    </>
  );
};
