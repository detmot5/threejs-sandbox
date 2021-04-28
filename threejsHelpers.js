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

function createCube(x, y, z, width, height, depth, seg, mater, color, castShad, receiveShad, shin) {
  var geometry = new THREE.BoxGeometry(width, height, depth, seg, seg, seg);

  var figure = new THREE.Mesh(geometry, createMaterial(mater, color, shin));

  figure.position.set(x, y, z);

  cube.receiveShadow = receiveShad;
  cube.castShadow = castShad;

  return figure;
}

function createTorus(x, y, z, radius, tube, seg, mater, color, castShad, receiveShad, shin) {
  var geometry = new THREE.TorusGeometry(radius, tube, seg, seg);

  var figure = new THREE.Mesh(geometry, createMaterial(mater, color, shin));

  figure.position.set(x, y, z);

  torus.receiveShadow = receiveShad;
  torus.castShadow = castShad;

  return figure;
}

function createCylinder(x, y, z, radiusTop, radiusBottom, height, seg, mater, color, castShad, receiveShad, shin) {
  var geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, seg);

  var figure = new THREE.Mesh(geometry, createMaterial(mater, color, shin));

  figure.position.set(x, y, z);

  figure.receiveShadow = receiveShad;
  figure.castShadow = castShad;

  return figure;
}

function createSphere(x, y, z, radius, seg, mater, color, castShad, receiveShad, shin) {
  var geometry = new THREE.SphereGeometry(radius, seg, seg);

  var figure = new THREE.Mesh(geometry, createMaterial(mater, color, shin));

  figure.position.set(x, y, z);

  figure.receiveShadow = receiveShad;
  figure.castShadow = castShad;

  return figure;
}

function createPlain(width, height, color, nOfSeg, mater, castShad, receiveShad, x, y, z, shin) {
  var planeGeometry = new THREE.PlaneGeometry(width, height, nOfSeg, nOfSeg);

  switch (mater) {
    case "basic":
      var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
      break;
    case "lambert":
      var material = new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide });
      break;
    case "phong":
      var material = new THREE.MeshPhongMaterial({ color: color, shininess: shin, side: THREE.DoubleSide });
      break;
    default:
      console.log("are you retarted?");
  }

  var figure = new THREE.Mesh(planeGeometry, material);

  figure.receiveShadow = receiveShad;
  figure.castShadow = castShad;

  figure.position.set(x, y, z);

  figure.rotation.x = 90;

  return figure;
}

function createDirectLight(color, intensity, distance, x, y, z) {

  var light = new THREE.DirectionalLight(color, intensity, distance);
  light.castShadow = true; // default false

  light.position.set(x, y, z);

  return light;
}

function createPointLight(color, intensity, distance, x, y, z) {
  var light = new THREE.PointLight(color, intensity, distance);
  light.castShadow = true;

  light.position.set(x, y, z);

  return light
}

function createMaterial(mater, color, shin) {
  switch (mater) {
    case "basic":
      var material = new THREE.MeshBasicMaterial({ color: color });
      break;
    case "lambert":
      var material = new THREE.MeshLambertMaterial({ color: color });
      break;
    case "phong":
      var material = new THREE.MeshPhongMaterial({ color: color, shininess: shin });
      break;
    default:
      console.log("are you retarted?");
  }

  return material;
}
