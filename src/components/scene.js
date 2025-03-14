import { Color, Scene, SphereGeometry, TextureLoader, MeshBasicMaterial, Mesh} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


function createScene() {

  const scene = new Scene();
  const geometry = new SphereGeometry(5,60,60);
  geometry.scale(-1, 1, 1); // flip inside out for skybox 
 
  const loader = new TextureLoader();
  const texture = loader.load("/background/sky.jpg");
  const material = new MeshBasicMaterial( {map: texture});


  const sphere = new Mesh(geometry, material);
  sphere.scale.set(10, 10, 10);
  sphere.position.set(0, 0, 0);
 
  scene.add(sphere);   

  scene.background = new Color('gray');

  const objLoader = new OBJLoader();
    objLoader.load('/obj/Jonas.obj', (object) => {
        object.position.set(0, 0, 15);
        object.scale.set(30, 30, 30);
        scene.add(object);
    });

  return scene;
}

export { createScene };

