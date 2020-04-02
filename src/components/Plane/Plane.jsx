import React from "react";

const Plane = ({ width, height, color, ...rest }) => {
  return (
    <mesh {...rest} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[width, height]} />
      <meshPhysicalMaterial attach="material" color={color} />
    </mesh>
  );
};

export default Plane;
