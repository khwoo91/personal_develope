import * as THREE from "three";
import { OrbitControls } from "OrbitControls";
import { GLTFLoader } from "GLTFLoader";

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';

// 장면 생성
const scene = new THREE.Scene();
scene.background = null;

// 장면 렌더링
const renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 카메라
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 100, 1000);
camera.position.set(-150, 50, 200);
camera.lookAt(0, 0, 0);

// 카메라 회전
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 프론트 라이트
const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(0, 2, 100);
scene.add(light);

// 백 라이트
const backLight = new THREE.DirectionalLight(0xffffff, 3);
backLight.position.set(0, 2, -100);
scene.add(backLight);

// 엠비언트 라이트 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);


const loader = new GLTFLoader();
const motionTime = new THREE.Clock();
let mixer = null;

loader.load('./src/data/motion_01.glb', (gltf) => {
  scene.add(gltf.scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
})

function animate() {
  controls.update();
  if (mixer) mixer.update(motionTime.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();


window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


