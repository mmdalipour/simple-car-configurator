import React from "react";

const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
};

export default Plane;
