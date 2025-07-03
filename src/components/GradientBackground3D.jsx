import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create moving gradients
    float wave1 = sin(uv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 2.0 + uTime * 0.3) * 0.5 + 0.5;
    float wave3 = sin(distance(uv, vec2(0.5)) * 4.0 + uTime * 0.7) * 0.5 + 0.5;
    
    // Mix colors based on waves
    vec3 color = mix(uColor1, uColor2, wave1);
    color = mix(color, uColor3, wave2 * wave3);
    
    gl_FragColor = vec4(color, 0.3);
  }
`;

export const GradientBackground3D = () => {
  const meshRef = useRef();

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#57F0DE') }, // brightTurquoise
    uColor2: { value: new THREE.Color('#6F3AA4') }, // purple
    uColor3: { value: new THREE.Color('#4D4B88') }, // indigo
  });

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.current.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={1.5}>
      <icosahedronGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};