import React, { useState } from "react";

// components
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import Car from "../Car";

const Studio = ({ tire }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} shadowMap>
      <Scene>
        <Car scale={[4, 4, 4]} tire={tire} position={[0,0.2,0]}/>
      </Scene>
    </Canvas>
  );
};

export default Studio;
