import { Color, Scene, SphereGeometry, TextureLoader, MeshBasicMaterial, Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function createScene() {
    const scene = new Scene();
    const geometry = new SphereGeometry(5, 60, 60);
    geometry.scale(-1, 1, 1); // Flip inside out for skybox

    const loader = new TextureLoader();
    const material = new MeshBasicMaterial({ map: loader.load("/background/sky.jpg") }); // Default texture

    const sphere = new Mesh(geometry, material);
    sphere.scale.set(10, 10, 10);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    scene.background = new Color('gray');

    const objLoader = new OBJLoader();
    objLoader.load('/models/Jonas.obj', (object) => {
        object.position.set(0, 0, 15);
        object.scale.set(30, 30, 30);
        scene.add(object);
    });

    /*const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/JonasTextures.glb', (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 15);
        model.scale.set(30, 30, 30);
        scene.add(model);
    });*/

    function updateBackground(imagePath) {
        loader.load(imagePath, (newTexture) => {
            material.map = newTexture;
            material.needsUpdate = true; 
        });
    }

    return { scene, updateBackground }; 
}

export { createScene };