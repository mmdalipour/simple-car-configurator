import React, { useState, useEffect } from "react";

// prop-types
import propTypes from "prop-types";

// loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ url, ...rest }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load(url, model => {
      model.scene.traverse(node => {
        node.castShadow = true;
      });
      setModel(model);
    });
  }, []);

  return model ? (
    <primitive object={model.scene} position={[0, 0, 0]} {...rest} />
  ) : null;
};

Model.propTypes = {
  url: propTypes.string.isRequired
};

export default Model;
