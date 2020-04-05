import React, { useState, useEffect } from "react";

// assets
import carModel from "../../assets/models/car.glb";
import tireModel from "../../assets/models/default_tire.glb";
import deathTireModel from "../../assets/models/death_tire.glb";

// components
import Model from "../Model";

const tireNames = ["tire_br", "tire_bl", "tire_fr", "tire_fl"];
const lightNames = ["light_br", "light_bl", "light_fr", "light_fl"];
const cameraNames = ["camera_0", "camera_1"];

const Car = ({ tire, ...rest }) => {
  const [tirePlaceholders, setTirePlaceholders] = useState();
  const [toggle, setToggle] = useState(0);

  // searchs through model nodes and returns tire placeholders
  const getTires = async (model) => {
    let tires = [];
    tireNames.forEach((name) => {
      const tireObject = model.getObjectByName(name);
      tires.push(tireObject);
    });

    return tires;
  };

  // on car model loaded
  const handleCarLoad = async (model) => {
    // get all tire placeholders
    if (tire) {
      const loadedTires = await getTires(model);
      setTirePlaceholders(loadedTires);
    }
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

  return (
    <group {...rest}>
      <Model
        url={carModel}
        onLoad={handleCarLoad}
        onClick={() => setToggle(toggle + 1)}
      />
      {tirePlaceholders && renderTires(tire)}
    </group>
  );
};

export default Car;
