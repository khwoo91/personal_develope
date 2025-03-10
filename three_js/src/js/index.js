import * as THREE from "three";
import { OrbitControls } from "OrbitControls";


document.body.style.margin = '0';
document.body.style.overflow = 'hidden';


// 장면 생성
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);


// OrbitControls 카메라 회전
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 2;
// controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3;

controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;





const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);



function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})