import React from "react";

// assets
import tireModel from "../../assets/models/default_tire.glb";

// components
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import Model from "../Model";

const Studio = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} shadowMap>
      <Scene>
        <Model
          url={tireModel}
          position={[0, 1, 0]}
          scale={[0.05, 0.05, 0.05]}
          castShadow
        />

        <Model
          url={tireModel}
          position={[0, 0, 0]}
          scale={[0.05, 0.05, 0.05]}
          castShadow
        />
      </Scene>
    </Canvas>
  );
};

export default Studio;
