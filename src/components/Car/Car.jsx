import React, { useState } from "react";

// assets
import carModel from "../../assets/models/car.glb";

// components
import Model from "../Model";

const tireList = ["tire_br", "tire_bl", "tire_fr", "tire_fl"];
const lightList = ["light_rb", "light_lb", "light_rf", "light_lf"];
const cameraList = ["camera_0", "camera_2"];

let tireObjects = [];
let lightObjects = [];
let cameraObjects = [];

const Car = ({ lightObject, tireObject, camera, ...rest }) => {
  const getCameras = async model => {
    let cameras = [];
    cameraList.forEach(camera => {
      const cameraObject = model.getObjectByName(camera);
      cameras.push(cameraObject);
    });

    return cameras;
  };

  const getLights = async model => {
    let lights = [];
    lightList.forEach(light => {
      const lightObject = model.getObjectByName(light);
      lights.push(lightObject);
    });

    return lights;
  };

  const getTires = async model => {
    let tires = [];
    tireList.forEach(tire => {
      const tireObject = model.getObjectByName(tire);
      tires.push(tireObject);
    });

    return tires;
  };

  const handleModelLoad = async model => {
    cameraObjects = await getCameras(model);
    tireObjects = await getTires(model);
    lightObjects = await getLights(model);
  };

  return (
    <group>
      <Model url={carModel} onLoad={handleModelLoad} {...rest} />
    </group>
  );
};

export default Car;
