import { useMemo } from "react";
import { unstable_createResource as createResource } from "./react-cache";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const resource = createResource(
  file => new Promise(async res => new GLTFLoader().load(file, res))
);

export default function useModel(file) {
  const { scene } = resource.read(file);
  const node = useMemo(() => {
    const temp = [];
    scene.traverse(child => {
      return child.isMesh && temp.push(child);
    });
    return temp;
  }, [scene]);

  return [node, scene.children[0].position];
}
