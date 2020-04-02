import React from "react";

import * as THREE from "three";

// components
import { Canvas } from "react-three-fiber";
import Controls from "../Controls";
import Plane from "../Plane";
import Fog from "../Fog";
import Box from "../Box";

const Studio = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      shadowMap
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[15, 20, 5]} castShadow shadowMapWidth={2048} shadowMapHeight={2048}/>

      {/* start fog */}
      <Fog />
      {/* end fog */}

      <Box />

      {/* start plane */}
      <Plane />
      {/* end plane */}

      {/* start controls */}
      <Controls />
      {/* end controls */}
    </Canvas>
  );
};

export default Studio;
