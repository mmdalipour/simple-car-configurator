import React from "react";

const Box = (props) => {
  return (
    <mesh castShadow position={[0,0,0]} {...props}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

export default Box;
