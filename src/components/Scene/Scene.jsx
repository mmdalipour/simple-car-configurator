import React, { Suspense, Fragment } from "react";

// components
import Plane from "../Plane";

const defaultProps = {
  fallback: null,
  fog: {
    args: ["white", 15, 25],
  },
  ambientLight: { intensity: 0.5 },
  pointLight: {
    intensity: 0.35,
    position: [4, 5, 0],
    castShadow: true,
    shadowMapWidth: 2048,
    shadowMapHeight: 2048,
  },
  plane: {
    width: 100,
    height: 100,
    color: "white",
    rotation: [-Math.PI / 2, 0, 0],
    receiveShadow: true,
  },
};

const Scene = ({
  children,
  fallback,
  fog,
  ambientLight,
  pointLight,
  plane,
}) => {
  return (
    <Fragment>
      {/* start fog */}
      {/* <fog attach="fog" {...defaultProps.fog} {...fog} /> */}
      {/* end fog */}

      {/* start light */}
      <ambientLight {...defaultProps.ambientLight} {...ambientLight} />
      <pointLight {...defaultProps.pointLight} {...pointLight} castShadow />
      {/* end light */}

      <Suspense {...defaultProps.fallback} fallback={fallback}>
        {children}
      </Suspense>

      {/* start plane */}
      <Plane {...defaultProps.plane} {...plane} />
      {/* end plane */}
    </Fragment>
  );
};

export default Scene;
