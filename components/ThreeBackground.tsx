'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shader definition for performance
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#06b6d4') },
    uPixelRatio: { value: 2.0 }
  },
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    void main() {
      vec3 pos = position;
      float time = uTime * 0.2;
      float y = sin(pos.x * 0.5 + time) * 1.5 + sin(pos.z * 0.3 + time) * 1.5;
      pos.y = y;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      gl_PointSize = 30.0 * uPixelRatio * (1.0 / -mvPosition.z);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    void main() {
      float r = distance(gl_PointCoord, vec2(0.5));
      if (r > 0.5) discard;
      gl_FragColor = vec4(uColor, 0.6); 
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending
};

const ParticleWave = () => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = 0;
      pos[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points rotation={[0, Math.PI / 8, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial args={[WaveShaderMaterial]} ref={shaderRef} />
    </points>
  );
};

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 } // Trigger as soon as even 1px is visible/hidden
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-slate-50 dark:bg-dark-950">
      {/* 
        frameloop="always" (default) -> Renders every frame (60fps).
        frameloop="never" -> Stops the loop completely.
        We switch to 'never' when the hero section is scrolled out of view to save GPU/Battery.
      */}
      <Canvas 
        camera={{ position: [0, 6, 12], fov: 50 }} 
        dpr={[1, 2]} 
        style={{ pointerEvents: 'none' }}
        frameloop={isInView ? 'always' : 'never'}
      >
        <ParticleWave />
      </Canvas>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-slate-50 dark:from-dark-950 to-transparent pointer-events-none"></div>
    </div>
  );
}