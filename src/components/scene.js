/**
 * 3D Model by Artec Group Inc. (www.artec3d.com)
 * Licensed under Creative Commons Attribution 3.0 (CC BY 3.0)
 * License: http://creativecommons.org/licenses/by/3.0/
 */

import { Color, Scene, SphereGeometry, TextureLoader, MeshBasicMaterial, MeshStandardMaterial, Mesh, MathUtils } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

function createScene() {

    const scene = new Scene();

    const geometry = new SphereGeometry(5, 60, 60);
    geometry.scale(-1, 1, 1); // Flip inside out

    const loader = new TextureLoader();
    const material_sphere = new MeshBasicMaterial({ map: loader.load("/background/sky.jpg") });
    
    const sphere = new Mesh(geometry, material_sphere);
    sphere.scale.set(10, 10, 10);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);

    scene.background = new Color('gray');

    const objLoader = new OBJLoader();

    const loadingIndicator = document.getElementById('loadingIndicator');
   

    function loadModel(objPath, mtlPath) {
        loadingIndicator.style.display = "block"; 
      
        scene.children.forEach((child) => {
            if (child.name === "LoadedModel") {
                scene.remove(child);
            }
        });

        if (mtlPath) {
            const mtlLoader = new MTLLoader();
            mtlLoader.load(mtlPath, (materials) => {
                materials.preload();
                objLoader.setMaterials(materials);
                objLoader.load(objPath, (object) => {
                    object.position.set(0, 0, 0);
                    object.scale.set(0.01, 0.01, 0.01);
                    object.rotation.z = MathUtils.degToRad(-3);
                    object.rotation.x = MathUtils.degToRad(-10);
                    object.name = "LoadedModel";
                    scene.add(object);
                    loadingIndicator.style.display = "none";
                });
            });
        } else {
            objLoader.load(objPath, (object) => {
                object.traverse((child) => {
                    if (child instanceof Mesh) {
                        const material = new MeshStandardMaterial({
                            vertexColors: true,
                            flatShading: true
                        });
                        child.material = material;
                    }
                });
                object.position.set(0, 0, 5);
                object.scale.set(10, 10, 10);
                object.name = "LoadedModel";
                scene.add(object);
                loadingIndicator.style.display = "none";
            });
        }
    }

    function updateBackground(imagePath) {
        loader.load(imagePath, (newTexture) => {
            material_sphere.map = newTexture;
            material_sphere.needsUpdate = true;
        });
    }
    
    return { scene, updateBackground, loadModel };
}

export { createScene };
