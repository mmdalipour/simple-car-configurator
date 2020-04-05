const degToRad = (value) => {
  return value * (Math.PI / 180);
};

const convertRotation = (value, func) => {
  const x = func(value.x);
  const y = func(value.y);
  const z = func(value.z);
  return [x, y, z];
};

export { degToRad, convertRotation };
