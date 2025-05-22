import React from 'react'
import { useThree } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

const Sky = () => {
    const { scene } = useThree();  

    React.useEffect(() => {
        // Set the sky to a blue color (sky blue)
        scene.background = new THREE.Color(0.1, 0.2, 0.4);  
    }, [scene]);

    return null;  
}

export default Sky;
