import { WebGLRenderer } from 'three';

function createRenderer() {
    const renderer = new WebGLRenderer({
        antialias: true,  // Enables smooth edges
        alpha: true       // Allows transparent background
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;  // Enable shadows
    renderer.physicallyCorrectLights = true;  // Realistic light behavior

    return renderer;
}

export { createRenderer };