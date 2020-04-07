const degToRad = (value) => {
  return value * (Math.PI / 180);
};

const radToDeg = (value) => {
  return value * (180 / Math.PI);
};

const convertRotation = (value, func) => {
  const x = func(value.x);
  const y = func(value.y);
  const z = func(value.z);
  return [x, y, z];
};

const clamp = (number, min, max) => {
  return Math.min(Math.max(number, min), max);
};

const lerp = (start, end, t) => {
  return (1 - t) * start + t * end;
};

export { degToRad, convertRotation, clamp, radToDeg, lerp };
