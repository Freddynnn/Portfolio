import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color } from 'three';
import Waving from '../models/Waving';
import Stars from '../models/Stars';
import Radar from '../models/Radar';
import Penguin from '../models/Penguin';
// import Laptop from '../models/Laptop';
import Clocks from '../models/Clocks';
import Mailbox from '../models/Mailbox';


// import landScene from "../assets/3d/land.glb";
import landScene from "../assets/3d/Portfolio.glb";
// import landScene from "../assets/3d/Portfolio2.glb";


export function Land({ isRotating, setIsRotating, currentStage, setCurrentStage, currentFocusPoint, rotationSpeedRef,  ...props }) {
    const landRef = useRef();
    const group = useRef();

    // Get access to the Three.js renderer and viewport
    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(landScene);

    // Use a ref for the last mouse x position & rotation speed
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.997;
    const dampingFactorRef = useRef(0.997);
    
    // Touch interaction control
    const [touchEnabled, setTouchEnabled] = useState(false);
    const touchTimeoutRef = useRef(null);

    useEffect(() => {
        // Enable touch interactions after a 2-second delay
        // enableTouchAfterDelay(0);
        enableTouchAfterDelay(3500);
        
        const colorOverrides = {
            Island: new Color(0.06, 0.1, 0.06), 
            UNI_Grass: new Color(0.06, 0.1, 0.06), 
            Road: new Color(0.15, 0.15, 0.15),
            Oval_Roof: new Color(0.5, 0.1, 0.1),  
            // MHS_Windows: new Color(0.1, 0.4, 0.5),      
        };
        
        Object.entries(colorOverrides).forEach(([name, color]) => {
            if (materials[name]?.color) {
            materials[name].color.copy(color);
            }
        });

        // Initial auto-spin logic  
        rotationSpeed.current = -0.001;

        const timeout = setTimeout(() => {
            dampingFactorRef.current = 0.985;
        }, 3000);

        return () => clearTimeout(timeout);


    }, [materials, setIsRotating]);

    // Function to enable touch interactions after a delay
    const enableTouchAfterDelay = (duration) => {
        // Clear any existing timeout
        if (touchTimeoutRef.current) {
            clearTimeout(touchTimeoutRef.current);
        }
        
        // Set a timeout to enable touch after the specified duration
        touchTimeoutRef.current = setTimeout(() => {
            setTouchEnabled(true);
            touchTimeoutRef.current = null;
        }, duration);
    };
      
    // MOUSE/POINTER TOUCH LOGIC
    const handlePointerDown = (event) => {
        if (!touchEnabled) return;

        event.stopPropagation();
        event.preventDefault();
        setIsRotating(true);

        // Calculate the clientX based on whether it's a touch event or a mouse event
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;

        // Store the current clientX position for reference
        lastX.current = clientX;
    };

    // Handle pointer (mouse or touch) up event
    const handlePointerUp = (event) => {
        if (!touchEnabled) return;

        event.stopPropagation();
        event.preventDefault();
        setIsRotating(false);
    };

    // Handle pointer (mouse or touch) move event
    const handlePointerMove = (event) => {
        if (!touchEnabled || !isRotating) return;

        event.stopPropagation();
        event.preventDefault();
       
        // If rotation is enabled, calculate the change in clientX position
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;

        // calculate change in horizontal pos of cursor/input, relative to viewport width
        const delta = (clientX - lastX.current) / viewport.width;

        // Update the model's rotation & reference for last clientX
        landRef.current.rotation.y += delta * 0.01 * Math.PI;

        // Update the reference for the last clientX position
        lastX.current = clientX;

        // Update the rotation speed
        rotationSpeed.current = delta * 0.01 * Math.PI;
    
    };

    // FOR USING LEFT AND RIGHT KEY TO ROTATE
    const handleKeyDown = (event) => {
        if (event.key === "ArrowLeft") {
            if (!isRotating) setIsRotating(true);

            landRef.current.rotation.y += 0.005 * Math.PI;
            rotationSpeed.current = 0.007;
        } else if (event.key === "ArrowRight") {
        
            if (!isRotating) setIsRotating(true);
            landRef.current.rotation.y -= 0.005 * Math.PI;
            rotationSpeed.current = -0.007;
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            setIsRotating(false);
        }
    };

    // MOBILE DEVICE TOUCH EVENTS
    const handleTouchStart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Only process touch if enabled
        if (touchEnabled) {
            setIsRotating(true);
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            lastX.current = clientX;
        }
    }

    const handleTouchEnd = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Always allow ending a touch even if disabled
        setIsRotating(false);
    }

    const handleTouchMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Only process touch movement if enabled and rotating
        if (touchEnabled && isRotating) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const delta = (clientX - lastX.current) / viewport.width;

            landRef.current.rotation.y += delta * 0.01 * Math.PI;
            lastX.current = clientX;
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    }

    useEffect(() => {
        // Add event listeners for pointer and keyboard events
        const canvas = gl.domElement;
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointerup", handlePointerUp);
        canvas.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchend", handleTouchEnd);
        canvas.addEventListener("touchmove", handleTouchMove);

        // Remove event listeners when component unmounts
        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchend", handleTouchEnd);
            canvas.removeEventListener("touchmove", handleTouchMove);
            
            // Clear any pending timeouts
            if (touchTimeoutRef.current) {
                clearTimeout(touchTimeoutRef.current);
            }
        };
    }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, touchEnabled]);

    useFrame(() => {
        // Dampen rotation speed
        rotationSpeed.current *= dampingFactorRef.current;
        if (Math.abs(rotationSpeed.current) < 0.0001) {
            rotationSpeed.current = 0;
        }

        landRef.current.rotation.y += rotationSpeed.current;

        // Normalize rotation to [0, 2π]
        const rotation = landRef.current.rotation.y;
        const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Invert rotation to make stages increase anti-clockwise
        const invertedRotation = (2 * Math.PI - normalizedRotation) % (2 * Math.PI);

        const stageRanges = [
            [0.00, 0.60],   // Stage 0
            [0.80, 1.40],   // Stage 1
            [1.60, 2.20],   // Stage 2
            [2.40, 3.00],   // Stage 3
            [3.20, 4.00],   // Stage 4
            [4.20, 4.85],   // Stage 5
            [5.10, 5.65],   // Stage 6
            [5.80, 6.20],   // Stage 7
        ];


        let matchedStage = null;

        for (let i = 0; i < stageRanges.length; i++) {
            const [min, max] = stageRanges[i];
            if (invertedRotation >= min && invertedRotation < max) {
                matchedStage = i;
                break;
            }
        }

        if (matchedStage !== currentStage) {
            setCurrentStage(matchedStage);
        }

        if (rotationSpeedRef) {
            rotationSpeedRef.current = rotationSpeed.current;
        }
    });





    return (
        <a.group ref={landRef} {...props} scale={[1.055, 1.055, 1.055]}>
            <mesh geometry={nodes.Sphere001.geometry} material={materials.Island} />
            <mesh geometry={nodes.Sphere001_1.geometry} material={materials.Grey_Dark} />
            <mesh geometry={nodes.Sphere001_2.geometry} material={materials.Road} />
            <mesh geometry={nodes.Sphere001_3.geometry} material={materials.Grey} />
            <mesh geometry={nodes.Sphere001_4.geometry} material={materials.MHS_Base} />
            <mesh geometry={nodes.Sphere001_5.geometry} material={materials.MHS_Windows} />
            <mesh geometry={nodes.Sphere001_6.geometry} material={materials.Beige} />
            <mesh geometry={nodes.Sphere001_7.geometry} material={materials.Black} />
            <mesh geometry={nodes.Sphere001_8.geometry} material={materials.Stars} />
            <mesh geometry={nodes.Sphere001_9.geometry} material={materials.Leaves_Light} />
            <mesh geometry={nodes.Sphere001_10.geometry} material={materials.Bark_Light} />
            <mesh geometry={nodes.Sphere001_11.geometry} material={materials.UNI_Base} />
            <mesh geometry={nodes.Sphere001_12.geometry} material={materials.Scaffolding} />
            <mesh geometry={nodes.Sphere001_13.geometry} material={materials.Brown} />
            <mesh geometry={nodes.Sphere001_14.geometry} material={materials.UNI_Window} />
            <mesh geometry={nodes.Sphere001_15.geometry} material={materials.UNI_Door} />
            <mesh geometry={nodes.Sphere001_16.geometry} material={materials.UNI_Grass} />
            <mesh geometry={nodes.Sphere001_17.geometry} material={materials.MHS_Door} />
            <mesh geometry={nodes.Sphere001_18.geometry} material={materials.Grey_Light} />
            <mesh geometry={nodes.Sphere001_19.geometry} material={materials.Oval_Roof} />
            <mesh geometry={nodes.Sphere001_20.geometry} material={materials.Leaves_Dark} />
            <mesh geometry={nodes.Sphere001_21.geometry} material={materials.Bush} />
            <mesh geometry={nodes.Sphere001_22.geometry} material={materials.HUT_Door} />
            <mesh geometry={nodes.Sphere001_23.geometry} material={materials.Bark_Dark} />
            <mesh geometry={nodes.Sphere001_24.geometry} material={materials.Sign} />
            <mesh geometry={nodes.Sphere001_25.geometry} material={materials.White} />

            
            <Waving/>
            <Stars/>
            <Radar/>
            <Penguin/>
            {/* <Laptop/> */}
            <Clocks/>
            <Mailbox currentStage={currentStage}/>
        </a.group>
    );
}

export default Land;
