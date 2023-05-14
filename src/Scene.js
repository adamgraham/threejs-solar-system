import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class Scene {
  constructor(canvasId) {
    // core components
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // camera params
    this.fov = 45;
    this.nearPlane = 0.001;
    this.farPlane = 100_000;
    this.canvasId = canvasId;

    // raycasting
    this.raycaster = undefined;
    this.raycastObjects = undefined;
    this.pointer = undefined;
    this.onRaycast = () => {};

    // additional components
    this.controls = undefined;
    this.ambientLight = undefined;
    this.clock = undefined;
    this.stats = undefined;
  }

  initialize() {
    // setup scene
    this.scene = new THREE.Scene();

    // setup renderer
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // setup camera
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, 500, 0);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // setup raycaster
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // setup skybox
    const skybox = new THREE.CubeTextureLoader()
      .setPath('./textures/skybox/')
      .load(['right.png', 'left.png', 'top.png', 'bottom.png', 'front.png', 'back.png']);
    this.scene.background = skybox;

    // setup lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // setup axes
    // const axesHelper = new THREE.AxesHelper(5);
    // axesHelper.scale.set(1, 1, -1);
    // this.scene.add(axesHelper);

    // setup fps stats
    this.clock = new THREE.Clock();
    this.stats = Stats();
    // document.body.appendChild(this.stats.dom);

    // setup event listeners
    window.addEventListener('click', (e) => this.onClick(e), false);
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), false);
    window.addEventListener('resize', (e) => this.onWindowResize(e), false);
  }

  update() {
    window.requestAnimationFrame(this.update.bind(this));

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
    this.controls.update();
  }

  onClick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastObjects ?? this.scene.children, true);
    this.onRaycast(intersects);
  }

  onPointerMove(event) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  add(object) {
    this.scene.add(object);
  }
}
