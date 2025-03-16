import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { createLights } from './components/lights.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Resizer } from './components/resizer.js';

document.addEventListener("DOMContentLoaded", () => {
    let scene, camera, renderer, resizer;
    
    function init() {
        const { scene: newScene, updateBackground, updateObj, loadModel} = createScene();
        scene = newScene;
        camera = createCamera();
        renderer = createRenderer();

        const lights = createLights();
        lights.forEach(light => scene.add(light));

        const controls = new OrbitControls(camera, renderer.domElement);
        resizer = new Resizer(document.getElementById('scene-container'), camera, renderer);

        document.getElementById('scene-container').appendChild(renderer.domElement);

        loadModel('/models/chair/chair.obj', '/models/chair/chair.mtl');

        animate();

       
        const bgButtons = document.querySelectorAll(".bg-btn");
        bgButtons.forEach(bgButtons => {
            bgButtons.addEventListener("click", () => {
                const imageName = bgButtons.getAttribute("data-image");
                updateBackground(`/background/${imageName}`); // Change scene background
            });
        });

        const objButtons = document.querySelectorAll(".obj-btn");
        objButtons.forEach(objButton => {
            objButton.addEventListener("click", () => {
                const objName = objButton.getAttribute("data-obj");
                const mtlName = objButton.getAttribute("data-mtl");
                loadModel(`${objName}`, `${mtlName}`); // Change obj model
            });
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    init();
});
