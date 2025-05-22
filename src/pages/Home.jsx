import {React, Suspense, useState, useRef, useEffect} from 'react'
import {Canvas} from '@react-three/fiber';
import Loader from '../components/Loader';
import Land from '../models/Land';
import Sky  from '../models/Sky';
import Train  from '../models/Train';
import HomeInfo from '../components/HomeInfo';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const rotationSpeedRef = useRef(0);

  const adjustLandForScreenSize = () => {
    let screenPosition = [0, -1.5, -45];
    let rotation = [0.1, 0, 0];
    let screenScale = window.innerWidth < 768 ? [0.9, 0.9, 0.9] : [1, 1, 1]; 

    return [screenScale, screenPosition, rotation];
  }
  
  const [landScale, landPosition, landRotation] = adjustLandForScreenSize();
 
  const adjustTrainForScreenSize = () => {
    let screenPosition = [0, -4.5, -5.9];
    let rotation = [0,1.55,0];
    let screenScale = window.innerWidth < 768 ? [0.9, 0.9, 0.9] : [1.2, 1.2, 1.2]; 
    return [screenScale, screenPosition, rotation];
  }
  
  const [trainScale, trainPosition, trainRotation] = adjustTrainForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage !== null && currentStage !== undefined && (
          <HomeInfo currentStage={currentStage} />
        )}

      </div>

      <Canvas 
        className={`w-full h-screen bg-transparent' ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}
      >

        {/* Display a loading progress bar while 3D canvas loads */}
        <Suspense fallback={<Loader/>}>
          <directionalLight position={[10,1,1]} intensity={1}/>
          <ambientLight intensity={0.5}/>
          <hemisphereLight skyColor="#b1eiff" groundColor="#000000" intensity={1}/>
          
          <Sky/>
          
          <Land
            position={landPosition}
            scale={landScale}
            rotation={landRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            rotationSpeedRef={rotationSpeedRef}
          />
          <Train
            isRotating={isRotating}
            position={trainPosition}
            scale={trainScale}
            rotation={trainRotation}
            // setIsRotating={setIsRotating}
            rotationSpeedRef={rotationSpeedRef}
          />

        </Suspense>

      </Canvas>


    </section>
  )
}

export default Home