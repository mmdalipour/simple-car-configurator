import React, { useState, useEffect } from "react";

// assets
import carModel from "../../assets/models/car.glb";
import tireModel from "../../assets/models/default_tire.glb";
import deathTireModel from "../../assets/models/death_tire.glb";

// react-spring
import { useSpring, a } from "react-spring/three";

// components
import Model from "../Model";
import { useFrame } from "react-three-fiber";

const tireNames = ["tire_br", "tire_bl", "tire_fr", "tire_fl"];
const lightNames = ["light_br", "light_bl", "light_fr", "light_fl"];
const cameraNames = ["camera_0", "camera_1"];

let brightness = 0;

const Car = ({ tire, turnOnLights, onLoad, ...rest }) => {
  const [tirePlaceholders, setTirePlaceholders] = useState();
  const [lightPlaceholders, setLightPlaceholders] = useState();
  const [cameraPlaceholders, setCameraPlaceholders] = useState();

  // searchs through model nodes and returns light placeholders
  const getLights = async (model) => {
    let lights = [];
    lightNames.forEach((name) => {
      const lightObject = model.getObjectByName(name);
      lights.push(lightObject);
    });

    return lights;
  };

  // searchs through model nodes and returns tire placeholders
  const getTires = async (model) => {
    let tires = [];
    tireNames.forEach((name) => {
      const tireObject = model.getObjectByName(name);
      tires.push(tireObject);
    });

    return tires;
  };

  // searchs through model nodes and returns tire placeholders
  const getCameras = async (model) => {
    let cameras = [];
    cameraNames.forEach((name) => {
      const cameraObject = model.getObjectByName(name);
      cameras.push(cameraObject);
    });

    return cameras;
  };

  // on car model loaded
  const handleCarLoad = async (model) => {
    // get all tire placeholders
    const loadedTires = await getTires(model);
    setTirePlaceholders(loadedTires);

    // get all light placeholders
    const loadedLights = await getLights(model);
    setLightPlaceholders(loadedLights);

    // get all camera placeholders
    const loadedCameras = await getCameras(model);
    setCameraPlaceholders(loadedCameras);

    onLoad && onLoad(model, loadedTires, loadedLights, loadedCameras);
  };

  // gets model url and renders it on car tire placeholders
  const renderTires = (model) => {
    return tirePlaceholders.map((placeholder, index) => {
      const isLeftTire = placeholder.name.includes("l");
      const rotation = isLeftTire ? [0, 0, 0] : [0, Math.PI, 0];
      return (
        <Model
          url={model}
          key={index}
          position={placeholder.position}
          rotation={rotation}
        />
      );
    });
  };

  const renderLights = () => {
    return lightPlaceholders.map((placeholder, index) => {
      const isFrontLight = placeholder.name.includes("f");
      const rotation = isFrontLight ? [0, 0, 0] : [Math.PI, 0, 0];

      return (
        <spotLight
          position={placeholder.position}
          args={["white"]}
          intensity={1}
        />
      );
    });
  };

  const setLightsEmissive = (value) => {
    lightPlaceholders &&
      lightPlaceholders.forEach((l) => {
        l.material.emissive.setRGB(value, value, value);
      });
  };

  useFrame(({ clock }) => {
    // get delta time
    const deltaTime = clock.getDelta() * 1000;

    // if turn on light each frame add to the brightness else decrease it
    if (turnOnLights) {
      if (brightness < 1) {
        brightness += deltaTime * 1.5;
        setLightsEmissive(brightness);
      } else {
        brightness = 1;
      }
    } else {
      if (brightness > 0) {
        brightness -= deltaTime * 1.5;
        setLightsEmissive(brightness);
      } else {
        brightness = 0;
      }
    }
  });

  return (
    <group {...rest}>
      <Model url={carModel} onLoad={handleCarLoad} />
      {tirePlaceholders && renderTires(tire)}
    </group>
  );
};

export default Car;
