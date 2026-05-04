import { Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils } from "three";

const black = "#050505";
const charcoal = "#0b0b0a";
const shadowBlack = "#10100d";

export const NamlapanStudioModel = (props) => {
  const rigRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!rigRef.current) {
      return;
    }

    rigRef.current.rotation.y += delta * (hovered ? 0.26 : 0.08);
    const targetScale = hovered ? 1.02 : 1;
    rigRef.current.scale.x = MathUtils.lerp(rigRef.current.scale.x, targetScale, 0.08);
    rigRef.current.scale.y = MathUtils.lerp(rigRef.current.scale.y, targetScale, 0.08);
    rigRef.current.scale.z = MathUtils.lerp(rigRef.current.scale.z, targetScale, 0.08);
    rigRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035;
  });

  return (
    <group {...props}>
      <group
        ref={rigRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <StudioFloor />
        <Backdrop />
        <CameraRig position={[0, 1.18, 0]} />
        <Clapperboard position={[-1.05, 2.72, 0.5]} rotation={[0.05, -0.22, -0.06]} />
        <KeyLight position={[-2.05, 2.15, 1.48]} rotation={[0.16, -0.5, 0.08]} />
        <KeyLight position={[1.9, 2.48, -1.16]} rotation={[0.18, 0.72, -0.12]} small />
        <MonitorDesk position={[1.75, 0.66, 1.55]} />
        <BoomMic position={[-0.45, 3.12, -1.1]} />
        <BrandSign position={[-2.52, 1.72, -1.92]} rotation={[0, 0.36, 0]} />
      </group>
    </group>
  );
};

const StudioFloor = () => {
  return (
    <group>
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[7.6, 0.08, 5.6]} />
        <meshStandardMaterial color={charcoal} roughness={0.92} metalness={0.02} />
      </mesh>
      {[-2.4, -1.2, 0, 1.2, 2.4].map((x) => (
        <mesh key={`x-${x}`} position={[x, 0.006, 0]}>
          <boxGeometry args={[0.012, 0.012, 5.3]} />
          <meshBasicMaterial color={black} transparent opacity={0.14} />
        </mesh>
      ))}
      {[-1.8, -0.6, 0.6, 1.8].map((z) => (
        <mesh key={`z-${z}`} position={[0, 0.008, z]}>
          <boxGeometry args={[7.2, 0.012, 0.012]} />
          <meshBasicMaterial color={black} transparent opacity={0.14} />
        </mesh>
      ))}
    </group>
  );
};

const Backdrop = () => {
  return (
    <group position={[-2.75, 1.24, -1.92]} rotation={[0, 0.36, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.12, 2.58, 2.28]} />
        <meshStandardMaterial color={black} roughness={0.9} metalness={0.02} />
      </mesh>
      <mesh position={[0.071, -1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.14, 1.14, 0.12, 48, 1, true, 0, Math.PI / 2]} />
        <meshStandardMaterial color={black} roughness={0.9} metalness={0.02} side={2} />
      </mesh>
    </group>
  );
};

const BrandSign = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0.08, 0.24, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.38, 0.42]} />
        <meshBasicMaterial color={black} transparent opacity={0.96} />
      </mesh>
      <Text
        position={[0.145, 0.25, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.12}
        maxWidth={1.12}
        lineHeight={0.82}
        anchorX="center"
        anchorY="middle"
        color={black}
      >
        NAMLAPAN
      </Text>
      <Text
        position={[0.15, 0.08, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.052}
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
        color={black}
      >
        STUDIOS
      </Text>
    </group>
  );
};

const CameraRig = ({ position }) => {
  return (
    <group position={position} rotation={[0, -0.36, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.86, 0.72]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[-0.48, 0.58, 0.02]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.16, 32]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[-0.48, 0.58, 0.12]}>
        <torusGeometry args={[0.245, 0.018, 10, 36]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0.48, 0.58, 0.02]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.16, 32]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[0.48, 0.58, 0.12]}>
        <torusGeometry args={[0.245, 0.018, 10, 36]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0, 0.22, 0.375]}>
        <boxGeometry args={[0.92, 0.08, 0.025]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0, -0.25, 0.378]}>
        <boxGeometry args={[0.72, 0.055, 0.025]} />
        <meshBasicMaterial color={black} transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.44, 0.56, 48]} />
        <meshStandardMaterial color={black} roughness={0.78} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0, 0.79]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.08, 48]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0, 0.03, 0.835]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.012, 10, 48]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0, 0.03, 0.84]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.01, 10, 48]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <Tripod />
    </group>
  );
};

const Tripod = () => {
  const legs = [
    { rotation: [0.52, 0, 0.28], position: [-0.3, -1.35, 0.1] },
    { rotation: [0.52, 0, -0.28], position: [0.3, -1.35, 0.1] },
    { rotation: [-0.62, 0, 0], position: [0, -1.35, -0.38] },
  ];

  return (
    <group>
      <mesh position={[0, -0.9, -0.05]}>
        <cylinderGeometry args={[0.05, 0.05, 1.68, 16]} />
        <meshStandardMaterial color={black} roughness={0.84} metalness={0.04} />
      </mesh>
      {legs.map((leg, index) => (
        <mesh key={index} position={leg.position} rotation={leg.rotation}>
          <cylinderGeometry args={[0.025, 0.025, 1.08, 12]} />
          <meshStandardMaterial color={black} roughness={0.84} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
};

const Clapperboard = ({ position, rotation }) => {
  return (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.13}>
      <group position={position} rotation={rotation}>
        <mesh castShadow>
          <boxGeometry args={[1.08, 0.68, 0.08]} />
          <meshStandardMaterial color={black} roughness={0.9} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.43, 0.03]} rotation={[0, 0, -0.14]}>
          <boxGeometry args={[1.14, 0.13, 0.09]} />
          <meshStandardMaterial color={black} roughness={0.88} metalness={0.02} />
        </mesh>
        <mesh position={[-0.54, 0.44, 0.03]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={black} roughness={0.78} metalness={0.08} />
        </mesh>
        <Text position={[0, 0.08, 0.055]} fontSize={0.095} anchorX="center" anchorY="middle" color={black}>
          NAMLAPAN
        </Text>
        <Text position={[0, -0.15, 0.055]} fontSize={0.05} letterSpacing={0.12} anchorX="center" anchorY="middle" color={black}>
          CHAOTIC MINDS
        </Text>
      </group>
    </Float>
  );
};

const KeyLight = ({ position, rotation, small = false }) => {
  const radius = small ? 0.42 : 0.58;
  const depth = small ? 0.42 : 0.56;

  return (
    <group position={position} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[radius, radius * 0.62, depth, 8, 1, true]} />
        <meshStandardMaterial color={black} roughness={0.9} metalness={0.02} side={2} />
      </mesh>
      <mesh position={[0, 0, depth / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.035, 8, 8]} />
        <meshStandardMaterial color={black} roughness={0.88} metalness={0.02} />
      </mesh>
      <mesh position={[0, -radius - 0.5, -0.05]}>
        <cylinderGeometry args={[0.026, 0.026, 0.9, 12]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <pointLight position={[0, 0, 0.25]} intensity={small ? 0.65 : 0.9} color="#fffdf2" />
    </group>
  );
};

const MonitorDesk = ({ position }) => {
  return (
    <group position={position} rotation={[0, -0.7, 0]}>
      <mesh position={[0, -0.34, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.52, 0.1, 0.92]} />
        <meshStandardMaterial color={black} roughness={0.9} metalness={0.02} />
      </mesh>
      <mesh castShadow>
        <boxGeometry args={[1.12, 0.72, 0.06]} />
        <meshStandardMaterial color={black} roughness={0.88} metalness={0.03} />
      </mesh>
      <mesh position={[0, 0, 0.036]}>
        <planeGeometry args={[0.9, 0.52]} />
        <meshBasicMaterial color={shadowBlack} />
      </mesh>
      <mesh position={[0, 0.17, 0.041]}>
        <planeGeometry args={[0.66, 0.045]} />
        <meshBasicMaterial color={black} transparent opacity={0.86} />
      </mesh>
      <mesh position={[-0.2, 0.04, 0.04]}>
        <planeGeometry args={[0.42, 0.06]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0.18, -0.08, 0.04]}>
        <planeGeometry args={[0.34, 0.05]} />
        <meshBasicMaterial color={black} />
      </mesh>
      <mesh position={[0, -0.58, -0.02]}>
        <cylinderGeometry args={[0.035, 0.035, 0.66, 16]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
    </group>
  );
};

const BoomMic = ({ position }) => {
  return (
    <group position={position} rotation={[0.1, 0.15, -0.18]}>
      <mesh position={[-0.95, -1.42, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 2.84, 12]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[-0.95, -2.86, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.035, 24]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[-0.95, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={black} roughness={0.78} metalness={0.08} />
      </mesh>
      <mesh position={[-0.48, -0.44, 0]} rotation={[0, 0, -0.82]}>
        <cylinderGeometry args={[0.018, 0.018, 1.32, 10]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.9, 16]} />
        <meshStandardMaterial color={black} roughness={0.86} metalness={0.04} />
      </mesh>
      <mesh position={[1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.085, 0.085, 0.42, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.86} />
      </mesh>
      <mesh position={[1.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.088, 0.01, 8, 24]} />
        <meshBasicMaterial color={black} />
      </mesh>
    </group>
  );
};
