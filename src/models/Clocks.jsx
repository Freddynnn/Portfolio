import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import ClocksScene from '../assets/3d/Clocks.glb';

const Clocks = () => {
  const group = useRef();
  const { scene } = useGLTF(ClocksScene);

  const currTime = {
    hours: 4,
    minutes: 30,
  };

  const armRefs = {
    Clock1ArmLong: useRef(),
    Clock1ArmShort: useRef(),
    Clock2ArmLong: useRef(),
    Clock2ArmShort: useRef(),
    Clock3ArmLong: useRef(),
    Clock3ArmShort: useRef(),
    Clock4ArmLong: useRef(),
    Clock4ArmShort: useRef(),
  };

  useEffect(() => {
    scene.traverse((child) => {
      if (armRefs[child.name]) {
        armRefs[child.name].current = child;
      }
    });
  }, [scene]);

  useFrame(() => {    
    const now = new Date();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    // console.log('currTime: ', minutes, hours);
    // const { hours, minutes } = currTime;
    
    const minuteAngle = (minutes / 60) * 2 * Math.PI + Math.PI;
    const hourAngle = ((hours + minutes / 60) / 12) * 2 * Math.PI + Math.PI;

    for (let i = 1; i <= 4; i++) {
      const longRef = armRefs[`Clock${i}ArmLong`];
      const shortRef = armRefs[`Clock${i}ArmShort`];

      const isZAxis = i === 1 || i === 4;
      const isXAxis = i === 2 || i === 3;

      // Flip direction for Clock 2 and Clock 4
      const flip = i === 2 || i === 4;
      const minute = flip ? -hourAngle : hourAngle;
      const hour = flip ? -minuteAngle : minuteAngle;

      if (longRef.current) {
        if (isZAxis) longRef.current.rotation.z = hour;
        if (isXAxis) longRef.current.rotation.x = hour;
      }
      if (shortRef.current) {
        if (isZAxis) shortRef.current.rotation.z = minute;
        if (isXAxis) shortRef.current.rotation.x = minute;
      }
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
};

export default Clocks;
