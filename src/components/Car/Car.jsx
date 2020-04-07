import React, { useState, useEffect } from "react";

// assets
import carModel from "../../assets/models/car.glb";

// react-three-fiber
import { useFrame } from "react-three-fiber";

// three js
import { AnimationClip, AnimationMixer, LoopOnce } from "three";

// components
import Model from "../Model";

const tireNames = ["tire_br", "tire_bl", "tire_fr", "tire_fl"];
const lightNames = ["light_br", "light_bl", "light_fr", "light_fl"];
const cameraNames = ["camera_0", "camera_1"];
const doorNames = ["door_l", "door_r"];

let brightness = 0;
let mixer;

const Car = ({ tire, turnOnLights, openDoors, onLoad, ...rest }) => {
  const [model, setModel] = useState();
  const [tirePlaceholders, setTirePlaceholders] = useState();
  const [lightPlaceholders, setLightPlaceholders] = useState();
  const [cameraPlaceholders, setCameraPlaceholders] = useState();
  const [doorPlaceholders, setDoorPlaceholders] = useState();

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

  // searchs throgh model nodes and returns door placeholders
  const getDoors = async (model) => {
    let doors = [];
    doorNames.forEach((name) => {
      const doorObject = model.getObjectByName(name);
      doors.push(doorObject);
    });

    return doors;
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

  const openCarDoors = (open) => {
    if (!model) return;

    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = open ? 1 : -1;
      action.play();
    });
  };

  const setLightsEmissive = (value) => {
    lightPlaceholders &&
      lightPlaceholders.forEach((l) => {
        l.material.emissive.setRGB(value, value, value);
      });
  };

  // on car model loaded
  const handleCarLoad = async (model) => {
    const scene = model.scene;

    setModel(model);

    // intial mixer
    mixer = new AnimationMixer(model.scene);

    // get all tire placeholders
    const loadedTires = await getTires(scene);
    setTirePlaceholders(loadedTires);

    // get all light placeholders
    const loadedLights = await getLights(scene);
    setLightPlaceholders(loadedLights);

    // get all camera placeholders
    const loadedCameras = await getCameras(scene);
    setCameraPlaceholders(loadedCameras);

    // get all door placeholders
    const loadedDoors = await getDoors(scene);
    setDoorPlaceholders(loadedDoors);

    const placeholders = {
      tires: loadedTires,
      lights: loadedLights,
      cameras: loadedCameras,
      doors: loadedDoors,
    };

    onLoad && onLoad(scene, placeholders);
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

    mixer && mixer.update(deltaTime);
  });

  useEffect(() => {
    openCarDoors(openDoors);
  }, [openDoors, model])

  return (
    <group {...rest}>
      <Model url={carModel} onLoad={handleCarLoad} />
      {tirePlaceholders && renderTires(tire)}
    </group>
  );
};

export default Car;
