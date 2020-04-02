import React, { Suspense, Fragment } from "react";

// components
import Plane from "../Plane";
import Controls from "../Controls";

const defaultProps = {
  fallback: null,
  fog: {
    args: ["white", 15, 25]
  },
  ambientLight: { intensity: 0.85 },
  pointLight: {
    intensity: 0.25,
    position: [10, 5, 5],
    castShadow: true,
    shadowMapWidth: 2048,
    shadowMapHeight: 2048
  },
  plane: {
    width: 100,
    height: 100,
    color: "white",
    rotation: [-Math.PI / 2, 0, 0],
    receiveShadow: true
  }
};

const Scene = ({
  children,
  fallback = defaultProps.fallback,
  fog = defaultProps.fog,
  ambientLight = defaultProps.ambientLight,
  pointLight = defaultProps.pointLight,
  plane = defaultProps.plane
}) => {
  return (
    <Fragment>
      {/* start fog */}
      <fog attach="fog" {...fog} />
      {/* end fog */}

      {/* start light */}
      <ambientLight {...ambientLight} />
      <pointLight {...pointLight} castShadow />
      {/* end light */}

      <Suspense fallback={fallback}>{children}</Suspense>

      {/* start plane */}
      <Plane {...plane} />
      {/* end plane */}

      {/* start controls */}
      <Controls />
      {/* end controls */}
    </Fragment>
  );
};

export default Scene;
