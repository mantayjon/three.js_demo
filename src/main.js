import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createRenderer } from './components/renderer.js';
import { createLights } from './components/lights.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Resizer } from './components/resizer.js';


let scene, camera, renderer, resizer;

function init() {
    scene = createScene();
    camera = createCamera();
    renderer = createRenderer();

    const lights = createLights();
    lights.forEach(light => scene.add(light));

    const controls = new OrbitControls(camera, renderer.domElement);
    const resizer = new Resizer(document.getElementById('scene-container'), camera, renderer);

    document.getElementById('scene-container').appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

init();
