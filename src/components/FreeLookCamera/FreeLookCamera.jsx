import React, { Fragment, useRef, useEffect } from "react";

// three js
import {
  EventDispatcher,
  MOUSE,
  Quaternion,
  Spherical,
  TOUCH,
  Vector2,
  Vector3,
  Euler,
} from "three/build/three.module";

// utils
import { clamp, degToRad, radToDeg, lerp } from "../../utils";

// react-three-fiber
import { useThree, useFrame } from "react-three-fiber";

let rotationSpeed = 0.25;
let maxTilt = 45.0;
let minTilt = -25.0;
let minLookAngle = -90;
let maxLookAngle = 90;

let lookAngle;
let tiltAngle = 0;
let pivotEuler;

let pivotTargetRotation;
let rigTargetRotation;

// start positions
let startPointer;

const FreeLookCamera = ({ active, ...rest }) => {
  const {
    gl,
    size: { width, height },
    setDefaultCamera,
    clock,
  } = useThree();

  const rigRef = useRef();
  const pivotRef = useRef();
  const cameraRef = useRef();

  ////////////////////////////// START TOUCH SUPPORT //////////////////////////////

  // handle touch start
  const onTouchStart = (event) => {
    event.preventDefault();

    // only support one finger touch
    if (event.touches.length !== 1) return;

    startPointer = event.touches[0];
  };

  // handle touch move
  const onTouchMove = (event) => {
    event.preventDefault();

    // only support one finger touch
    if (event.touches.length !== 1) return;

    const deltaTime = clock.getDelta() * 1000;

    const touch = event.touches[0];

    const x = touch.pageX;
    const y = touch.pageY;

    // get delta distance from start point and current point
    const deltaX = startPointer.pageX - x;
    const deltaY = startPointer.pageY - y;

    // touch speed
    const touchAxisX = (deltaX / (deltaTime * 10)) * (width / height);
    const touchAxisY = (deltaY / (deltaTime * 10)) * (width / height);

    lookAngle += touchAxisX * rotationSpeed;

    lookAngle = clamp(
      lookAngle,
      degToRad(minLookAngle),
      degToRad(maxLookAngle)
    );

    rigTargetRotation = new Quaternion(0.0, lookAngle, 0.0, 0.0);

    tiltAngle += touchAxisY * rotationSpeed;

    tiltAngle = clamp(tiltAngle, degToRad(minTilt), degToRad(maxTilt));

    pivotTargetRotation = new Quaternion(
      tiltAngle,
      pivotEuler.y,
      pivotEuler.z,
      0.0
    );

    const pivot = pivotRef.current;
    const rig = rigRef.current;

    pivot.rotation.x = pivotTargetRotation.x;
    pivot.rotation.y = pivotTargetRotation.y;
    pivot.rotation.z = pivotTargetRotation.z;

    rig.rotation.x = rigTargetRotation.x;
    rig.rotation.y = rigTargetRotation.y;
    rig.rotation.z = rigTargetRotation.z;

    startPointer = event.touches[0];
  };

  // handle touch end
  const onTouchEnd = (event) => {
    startPointer = event;
  };

  ////////////////////////////// END TOUCH SUPPORT //////////////////////////////

  ////////////////////////////// START MOUSE SUPPORT //////////////////////////////

  const onMouseDown = (event) => {
    event.preventDefault();

    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);
  };

  const onMouseMove = (event) => {
    const deltaTime = clock.getDelta() * 1000;


    const deltaX = event.movementX * deltaTime * 0.1;
    const deltaY = event.movementY * deltaTime * 0.1;

    // mouse speed
    const mouseAxisX = deltaX / (deltaTime * 10);
    const mouseAxisY = deltaY / (deltaTime * 10);

    lookAngle -= mouseAxisX * rotationSpeed;

    lookAngle = clamp(
      lookAngle,
      degToRad(minLookAngle),
      degToRad(maxLookAngle)
    );

    rigTargetRotation = new Quaternion(0.0, lookAngle, 0.0, 0.0);

    tiltAngle += mouseAxisY * rotationSpeed;

    tiltAngle = clamp(tiltAngle, degToRad(minTilt), degToRad(maxTilt));

    pivotTargetRotation = new Quaternion(
      tiltAngle,
      pivotEuler.y,
      pivotEuler.z,
      0.0
    );

    const pivot = pivotRef.current;
    const rig = rigRef.current;

    pivot.rotation.x = pivotTargetRotation.x;
    pivot.rotation.y = pivotTargetRotation.y;
    pivot.rotation.z = pivotTargetRotation.z;

    rig.rotation.x = rigTargetRotation.x;
    rig.rotation.y = rigTargetRotation.y;
    rig.rotation.z = rigTargetRotation.z;

    startPointer = event;
  };

  const onMouseUp = (event) => {
    // reset startTouch
    document.removeEventListener("mousemove", onMouseMove, false);
    document.removeEventListener("mouseup", onMouseUp, false);
  };

  ////////////////////////////// END MOUSE SUPPORT //////////////////////////////

  useFrame(() => {
    const camera = cameraRef.current;
    active && camera.updateMatrixWorld();
  });

  useEffect(() => {
    if (!active) return;

    const camera = cameraRef.current;
    setDefaultCamera(camera);

    const pivot = pivotRef.current;
    const rig = rigRef.current;

    // set start euler angles
    pivotEuler = pivot.rotation;

    // get local rotations
    pivotTargetRotation = pivot.rotation;
    rigTargetRotation = rig.rotation;

    lookAngle = rigTargetRotation.y;
    tiltAngle = pivotTargetRotation.x;

    const scope = gl;

    // mouse suppert
    scope.domElement.addEventListener("mousedown", onMouseDown, false);

    // touch suppert
    scope.domElement.addEventListener("touchstart", onTouchStart, false);
    scope.domElement.addEventListener("touchmove", onTouchMove, false);
    scope.domElement.addEventListener("touchend", onTouchMove, false);

    return () => {
      // dispose mouse events
      scope.domElement.removeEventListener("mousedown", onMouseDown, false);
      scope.domElement.removeEventListener("mousemove", onMouseMove, false);
      scope.domElement.removeEventListener("mouseup", onMouseUp, false);
      scope.domElement.removeEventListener("mouseleave", onMouseUp, false);

      // dispose touch events
      scope.domElement.removeEventListener("touchstart", onTouchStart, false);
      scope.domElement.removeEventListener("touchend", onTouchEnd, false);
      scope.domElement.removeEventListener("touchmove", onTouchMove, false);
    };
  }, [active]);

  return (
    <group ref={rigRef} {...rest}>
      <group ref={pivotRef}>
        <perspectiveCamera
          ref={cameraRef}
          fov={45}
          near={0.1}
          far={1000}
          aspect={width / height}
        />
      </group>
    </group>
  );
};

export default FreeLookCamera;
