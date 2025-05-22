import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import WavingScene from '../assets/3d/Waving.glb';

const Waving = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(WavingScene);
  const mixer = useRef();

  useEffect(() => {
    if (animations.length > 0 && group.current) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
  }, [animations, scene]);

  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return (
    <group 
      ref={group} 
      position={[4.5, -0.7, 25]} 
      scale={[1.5, 1.5, 1.5]} 
      rotation={[0, 0.3, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Waving;
