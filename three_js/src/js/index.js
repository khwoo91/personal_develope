import * as THREE from "three";
import { OrbitControls } from "OrbitControls";


document.body.style.margin = '0';
document.body.style.overflow = 'hidden';


// 장면 생성
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


scene.add(new THREE.AxesHelper(100));


// OrbitControls 카메라 회전
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 2;
// controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3;

controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;


const sphereGeo = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
})
const sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
scene.add(sphere);

const planeGeo = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.rotation.x = Math.PI / -2;
plane.position.set(0, -1, 0);
scene.add(plane);



// 조명
// 엠비언트라이트
const ambientLight = new THREE.AmbientLight(0xff0000, 1);
scene.add(ambientLight);


// 디렉셔널라이트
const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
directionalLight.position.set(-2, 2, 0);
directionalLight.target.position.set(0, 2, 0);
// scene.add(new THREE.DirectionalLightHelper(directionalLight, 1 , 0xff0000));
// scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xff0000);
pointLight.position.set(1, 1, 0);
// scene.add(new THREE.PointLightHelper(pointLight, 1, 0x00ff00));
// scene.add(pointLight);


const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5);
spotLight.position.set(0, 2, 0);
// scene.add(new THREE.SpotLightHelper(spotLight, 1, 0x00ff00));
// scene.add(spotLight);


const hemisphereLight = new THREE.HemisphereLight(0xffaaaaa, 0x00ff00);
// scene.add(hemisphereLight);



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