import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import trainScene from '../assets/3d/train.glb';

const Train = ({ position, rotationSpeedRef, ...props }) => {
    const { scene } = useGLTF(trainScene);
    const meshRef = useRef();

    const bobAmplitude = useRef(0);
    const rotAmplitude = useRef(0);

    const damping = 0.995;

    useFrame(({ clock }) => {
        if (!meshRef.current) return;

        const speed = Math.abs(rotationSpeedRef?.current ?? 0);
        const elapsedTime = clock.getElapsedTime();

        // Define max amplitudes and damping
        const maxBobAmp = 0.05;
        const maxRotAmp = 0.05;
        const bobScale = 100;
        const rotScale = 10;
        const smoothFactor = 0.1;
        const damping = 0.95;

        if (speed > 0.001) {
            // Scale amplitude based on speed
            const bobTarget = Math.min(speed * bobScale, maxBobAmp);
            const rotTarget = Math.min(speed * rotScale, maxRotAmp);

            // Smoothly move toward target amplitude
            bobAmplitude.current += (bobTarget - bobAmplitude.current) * smoothFactor;
            rotAmplitude.current += (rotTarget - rotAmplitude.current) * smoothFactor;
        } else {
            // Apply damping
            bobAmplitude.current *= damping;
            rotAmplitude.current *= damping;

            // Clamp to zero when near zero
            if (bobAmplitude.current < 0.0001) bobAmplitude.current = 0;
            if (rotAmplitude.current < 0.0001) rotAmplitude.current = 0;
        }

        // Apply animation
        const bobOffset = Math.sin(elapsedTime * 4) * bobAmplitude.current;
        const rotOffset = Math.sin(elapsedTime * 2.5) * rotAmplitude.current;

        meshRef.current.position.y = position[1] + bobOffset;
        meshRef.current.rotation.z = rotOffset;
    });


    return (
        <mesh ref={meshRef} position={position} {...props}>
        <primitive object={scene} />
        </mesh>
    );
};

export default Train;
