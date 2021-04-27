const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,
                                           1, 1000);
scene.add(camera);                                           
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// initialization end


const light = new THREE.DirectionalLight();
light.position.set(-4.5, 9.7, 13.2)
scene.add(light);


const textureLoader = new THREE.TextureLoader();


const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
orbitControls.update();
orbitControls.rotateSpeed = 1.0;
orbitControls.zoomSpeed = 1.2;
orbitControls.panSpeed = 0.8;
orbitControls.noZoom = false;
orbitControls.noPan = false;
orbitControls.staticMoving = true;
orbitControls.dynamicDampingFactor = 0.3;



addEventListener(`keydown`, (e) => {
  if (e.key == `a`) light.position.x += .3;
  else if (e.key == `d`) light.position.x -= .3;
  else if (e.key == `w`) light.position.y += .3;
  else if (e.key == `s`) light.position.y -= .3;
  else if (e.key == `q`) light.position.z += .3;
  else if (e.key == `e`) light.position.z -= .3;
  console.log(light.position);
});

addEventListener(`wheel`, (e) => {
  if(e.deltaY > 0) camera.position.z += 3;
  else camera.position.z -= 3;
});

addEventListener('mousemove', (e) => {

  console.log(e.clientX);
  console.log(e.clientY);
});


const dragControls = new THREE.DragControls( scene.children, camera, renderer.domElement );
console.log(scene);
// add event listener to highlight dragged objects

dragControls.addEventListener( 'dragstart', function ( event ) {
  orbitControls.enabled = false;
	event.object.material.emissive.set( 0xaaaaaa );

} );

dragControls.addEventListener( 'dragend', function ( event ) {
  orbitControls.enabled = true;
	event.object.material.emissive.set( 0x000000 );

} );


const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100, 32),
  new THREE.MeshBasicMaterial({wireframe: true})
)

plane.rotation.x = 190
scene.add(plane);



const cubeTexture = new THREE.CubeTextureLoader()
.setPath( '' )
.load( [
  'assets/Env/posx.jpg',
  'assets/Env/negx.jpg',
  'assets/Env/posy.jpg',
  'assets/Env/negy.jpg',
  'assets/Env/posz.jpg',
  'assets/Env/negz.jpg'
] );

scene.background = cubeTexture