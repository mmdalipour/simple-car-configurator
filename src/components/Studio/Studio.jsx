import React, { useState } from "react";

// hooks
import { useFrame } from "react-three-fiber";

// components
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import Car from "../Car";
import OrbitCamera from "../OrbitCamera";

const Studio = ({ tire, turnOnLights }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} shadowMap>
      <Scene>
        <Car scale={[4, 4, 4]} tire={tire} position={[0, 0.2, 0]} turnOnLights={turnOnLights}/>
        <OrbitCamera />
      </Scene>
    </Canvas>
  );
};

export default Studio;
