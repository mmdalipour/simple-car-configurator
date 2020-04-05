import React, { useRef, useEffect, Fragment } from "react";

// react-three-fiber
import { extend, useThree, useFrame } from "react-three-fiber";

// three js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const OrbitCamera = ({ ...rest }) => {
  const {
    gl,
    size: { width, height },
    setDefaultCamera,
  } = useThree();

  const cameraRef = useRef();
  const controlsRef = useRef();

  useFrame(() => {
    cameraRef.current.updateMatrixWorld();
    controlsRef.current && controlsRef.current.update();
  });

  useEffect(() => void setDefaultCamera(cameraRef.current), []);

  return (
    <Fragment>
      <perspectiveCamera
        ref={cameraRef}
        fov={75}
        near={0.1}
        far={1000}
        aspect={width / height}
        {...rest}
      />
      {cameraRef.current && (
        <orbitControls
          ref={controlsRef}
          args={[cameraRef.current, gl.domElement]}
          enableRotate
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          maxDistance={4}
          minDistance={2}
          minPolarAngle={0.25}
          maxPolarAngle={Math.PI / 2.25}
        />
      )}
    </Fragment>
  );
};

export default OrbitCamera;
