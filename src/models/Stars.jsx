import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import StarsScene from '../assets/3d/Stars.glb';

const Stars = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(StarsScene);
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
    <group ref={group} >
      <primitive object={scene} />
    </group>
  );
};

export default Stars;
