import { AmbientLight, DirectionalLight } from 'three';

function createLights(){
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    const directionalLight = new DirectionalLight('white', 8);
    directionalLight.position.set(10,10,10,);

    return [ambientLight, directionalLight];

}

export {createLights};