import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DEG2RAD } from 'three/src/math/MathUtils';
import { lineFragmentShader, lineVertexShader } from './shaders';
import planets from './planets';
import Scene from './Scene';
import './App.css';

function createOrbit(planet) {
  const points = [];

  for (let angle = 0; angle <= 360; angle++) {
    const a = planet.semiMajorAxis;
    const b = a * Math.sqrt(1 - Math.pow(planet.eccentricity, 2));
    const x = a * Math.cos(angle * DEG2RAD);
    const y = b * Math.sin(angle * DEG2RAD);
    points.push(new THREE.Vector3(x, 0, y));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      color: {
        value: new THREE.Color(planet.color),
      },
      origin: {
        value: points[0],
      },
    },
    vertexShader: lineVertexShader,
    fragmentShader: lineFragmentShader,
    transparent: true,
  });

  const line = new THREE.Line(geometry, material);
  line.scale.set(1, 1, -1);
  line.rotateY(planet.meanAnomaly * DEG2RAD + Math.PI);
  line.rotateZ(-planet.inclination * DEG2RAD);

  return line;
}

function createMarker(planet) {
  const radius = 2;
  const points = [];

  for (let angle = 0; angle <= 360; angle++) {
    const x = radius * Math.cos(angle * DEG2RAD);
    const y = radius * Math.sin(angle * DEG2RAD);
    points.push(new THREE.Vector3(x - planet.semiMajorAxis, 0, y));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: planet.color });

  return new THREE.Line(geometry, material);
}

function findPlanetByIntersect(intersect) {
  return planets.find((planet) => planet.name === intersect.object.tag);
}

function App() {
  useEffect(() => {
    // create scene
    const scene = new Scene('solarSystem');
    scene.initialize();
    scene.update();

    // handle raycasts
    scene.raycastObjects = [];
    scene.onRaycast = (intersects) => {
      if (intersects.length > 0) {
        const planet = findPlanetByIntersect(intersects[0]);
        if (planet) {
          const target = new THREE.Vector3();
          planet.object.scene.getWorldPosition(target);
          scene.controls.target = target;
        }
      }
    };

    // create planets
    const glftLoader = new GLTFLoader().setPath('./models/');

    planets.forEach((planet, index) => {
      glftLoader.load(planet.resource, (gltf) => {
        // set object metadata
        gltf.scene.name = planet.name;
        gltf.scene.tag = planet.name;
        gltf.scene.children.forEach((child) => (child.tag = planet.name));
        planet.object = gltf;

        // calculate orbit
        const a = planet.semiMajorAxis;
        const b = a * Math.sqrt(1 - Math.pow(planet.eccentricity, 2));
        const x = a * Math.cos(planet.meanAnomaly * DEG2RAD);
        const z = b * Math.sin(planet.meanAnomaly * DEG2RAD);
        const y = b * Math.sin(planet.inclination * DEG2RAD);

        // set transform
        gltf.scene.position.set(x, y, -z);
        gltf.scene.rotation.set(0, 0, planet.axialTilt * DEG2RAD);
        gltf.scene.scale.set(planet.diameter, planet.diameter, planet.diameter);

        // add to scene
        scene.add(gltf.scene);
        scene.raycastObjects.push(gltf.scene);

        // create orbit lines
        if (planet.semiMajorAxis > 0) {
          const orbit = createOrbit(planet);
          const marker = createMarker(planet);
          marker.rotation.copy(orbit.rotation);
          scene.add(orbit);
          scene.add(marker);
        }
      });
    });
  }, []);

  return (
    <div>
      <canvas id="solarSystem" />
    </div>
  );
}

export default App;
