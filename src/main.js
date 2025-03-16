import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { createLights } from './components/lights.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Resizer } from './components/resizer.js';

document.addEventListener("DOMContentLoaded", () => {
    let scene, camera, renderer, resizer;
    
    function init() {
        const { scene: newScene, updateBackground } = createScene();
        scene = newScene;
        camera = createCamera();
        renderer = createRenderer();

        const lights = createLights();
        lights.forEach(light => scene.add(light));

        const controls = new OrbitControls(camera, renderer.domElement);
        resizer = new Resizer(document.getElementById('scene-container'), camera, renderer);

        document.getElementById('scene-container').appendChild(renderer.domElement);

        animate();

       
        const buttons = document.querySelectorAll(".bg-btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const imageName = button.getAttribute("data-image");
                updateBackground(`/background/${imageName}`); // Change scene background
            });
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    init();
});
