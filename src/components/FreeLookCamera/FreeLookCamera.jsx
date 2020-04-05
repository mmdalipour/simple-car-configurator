import React, { Fragment, useRef, useEffect } from "react";

// react-three-fiber
import { extend, useThree, useFrame } from "react-three-fiber";

const FreeLookCamera = (...rest) => {
  const {
    gl,
    size: { width, height },
    setDefaultCamera,
  } = useThree();

  const cameraRef = useRef();

  useFrame(() => {
    cameraRef.current.updateMatrixWorld();
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
        lookAt={[0, 0, 10]}
        {...rest}
      />
    </Fragment>
  );
};

export default FreeLookCamera;
