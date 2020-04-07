import React, { useState } from "react";

// hooks
import { useFrame } from "react-three-fiber";

// components
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import Car from "../Car";
import OrbitCamera from "../OrbitCamera";
import FreeLookCamera from "../FreeLookCamera";

const Studio = ({ activeCamera, openDoors, tire, turnOnLights }) => {
  const [cameras, setCameras] = useState();

  const handleCarLoad = (model, placeholders) => {
    setCameras(placeholders.cameras);
  };

  return (
    <Canvas camera={{ position: [0, 0, 5] }} shadowMap>
      <Scene>
        <Car
          scale={[4, 4, 4]}
          tire={tire}
          position={[0, 0.2, 0]}
          turnOnLights={turnOnLights}
          onLoad={handleCarLoad}
          openDoors={openDoors}
        />
        {cameras &&
          cameras.map((camera, index) => {
            return (
              <FreeLookCamera
                active={activeCamera === index + 1}
                key={index}
                position={[
                  camera.position.x * 4,
                  camera.position.y * 4 + 0.5,
                  camera.position.z * 4,
                ]}
              />
            );
          })}
        <OrbitCamera position={[5,2,-5]} active={activeCamera === 0} />
      </Scene>
    </Canvas>
  );
};

export default Studio;
