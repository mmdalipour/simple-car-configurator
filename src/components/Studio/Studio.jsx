import React, { useState } from "react";


import tireModel from "../../assets/models/default_tire.glb";

// components
import { Canvas } from "react-three-fiber";
import Scene from "../Scene";
import Model from "../Model";
import Car from "../Car";

const Studio = () => {
  const [loading, setLoading] = useState(false);

  if (!!loading) return <h1 style={{ color: "black" }}>hello</h1>;
  else
    return (
      <Canvas camera={{ position: [0, 0, 5] }} shadowMap>
        <Scene fallback={() => setLoading(true)}>
          <Car
            scale={[0.05, 0.05, 0.05]}
            castShadow
            center
          />
          <Model
            url={tireModel}
            center
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
