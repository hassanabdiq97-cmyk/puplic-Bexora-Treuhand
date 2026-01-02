
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Custom Shader Material to handle animation on GPU
// Visuals tuned to match original PointsMaterial (uniform size, no glow)
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#06b6d4') }, // Cyan-500
    uPixelRatio: { value: typeof window !== 'undefined' ? window.devicePixelRatio : 2.0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    
    void main() {
      vec3 pos = position;
      
      // Exact wave math from original CPU version
      // y = sin(x * 0.5 + time) * 1.5 + sin(z * 0.3 + time) * 1.5
      float time = uTime * 0.2;
      float y = sin(pos.x * 0.5 + time) * 1.5 + sin(pos.z * 0.3 + time) * 1.5;
      pos.y = y;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation formula matching Three.js standard
      // size * (scale / -z). Using ~30.0 as base scale to match previous visual density
      gl_PointSize = 30.0 * uPixelRatio * (1.0 / -mvPosition.z);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    
    void main() {
      // Hard-edge circle (clean, sharp look like original points but round)
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      
      // Flat color with original opacity 0.6
      gl_FragColor = vec4(uColor, 0.6); 
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending
};

const ParticleWave = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const count = 3000; // Original particle count

  // Memoize geometry data
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Original distribution logic
      positions[i3] = (Math.random() - 0.5) * 20;     // x
      positions[i3 + 1] = 0;                          // y (calculated in shader)
      positions[i3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Local aliases for Three.js intrinsic elements to avoid polluting global JSX namespace
  const Points = 'points' as any;
  const BufferGeometry = 'bufferGeometry' as any;
  const BufferAttribute = 'bufferAttribute' as any;
  const ShaderMaterial = 'shaderMaterial' as any;

  return (
    <Points rotation={[0, Math.PI / 8, 0]}>
      <BufferGeometry>
        <BufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </BufferGeometry>
      <ShaderMaterial
        ref={shaderRef}
        args={[WaveShaderMaterial]}
      />
    </Points>
  );
};

const ThreeBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-slate-50 dark:bg-dark-950">
      <Canvas
        camera={{ position: [0, 6, 12], fov: 50 }}
        dpr={[1, 2]} 
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleWave />
      </Canvas>
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-slate-50 dark:from-dark-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ThreeBackground;
