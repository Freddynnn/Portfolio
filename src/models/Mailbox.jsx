import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import MailboxScene from '../assets/3d/Mailbox.glb';

const Mailbox = ({ currentStage }) => {
  const group = useRef();
  const { scene } = useGLTF(MailboxScene);
  const mailFlagRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name === 'MailBoxFlag') {
        mailFlagRef.current = child;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!mailFlagRef.current) return;

    // Define desired rotations
    const upRotation = 0; // Up = 0 radians
    const rightRotation = -Math.PI / 2; // Horizontal right = -90 degrees

    const targetRotation = currentStage === 7 ? upRotation : rightRotation;

    // Smoothly interpolate rotation for a nicer visual effect
    mailFlagRef.current.rotation.z = THREE.MathUtils.lerp(
      mailFlagRef.current.rotation.z,
      targetRotation,
      0.1 // Adjust smoothing speed here
    );
  });

  return (
    <group ref={group} position={[2.5, -0.5, 0]} scale={[1, 1, 1]}>
      <primitive object={scene} />
    </group>
  );
};

export default Mailbox;
