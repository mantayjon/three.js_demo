class Resizer {
    constructor(container, camera, renderer) {
        this.container = container;
        this.camera = camera;
        this.renderer = renderer;

        this.setSize(); // ✅ Apply initial resizing
        window.addEventListener('resize', () => this.setSize());
    }

    setSize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }
}

export { Resizer };
