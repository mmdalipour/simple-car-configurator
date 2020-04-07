import React, { useState, useEffect } from "react";

// prop-types
import propTypes from "prop-types";

// loaders
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ url, center, onLoad, ...rest }) => {
  const [model, setModel] = useState();
  const [centerPosition, setCenterPosition] = useState();

  useEffect(() => {
    new GLTFLoader().load(url, model => {
      const scene = model.scene;
      center && setCenterPosition(scene.children[0].position);
      scene.traverse(node => {
        node.castShadow = true;
      });

      setModel(scene);
      onLoad && onLoad(model);
    });
  }, [url]);

  return model ? (
    <primitive
      object={model}
      position={centerPosition ? centerPosition : [0, 0, 0]}
      {...rest}
    />
  ) : null;
};

Model.propTypes = {
  url: propTypes.string.isRequired
};

export default Model;
