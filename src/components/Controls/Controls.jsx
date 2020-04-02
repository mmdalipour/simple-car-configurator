import React, { useRef } from "react";

// react-three-fiber
import { extend, useThree, useFrame } from "react-three-fiber";

// three js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = ({ target, ...rest }) => {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => controlsRef.current && controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableRotate
      enablePan={false}
      enableDamping
      dampingFactor={0.1}
      maxDistance={5}
      minDistance={2}
      minPolarAngle={0.25}
      maxPolarAngle={Math.PI / 2.25}
      {...rest}
    />
  );
};

export default Controls;
