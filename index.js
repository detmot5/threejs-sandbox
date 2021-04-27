/*
  available objects from helpers:

  scene
  camera 
  textureLoader
*/


const geometry = new THREE.BoxGeometry(10,10,10,10);
const material = new THREE.MeshLambertMaterial( { map: textureLoader.load(`./assets/tex/dirt.jpg`)  } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 20;
camera.position.y = 2;
camera.position.z += 20;

cube.rotation.x += 10;
cube.rotation.y += 10;
cube.rotation.z += 10;
                                          
const animate = () => {
  requestAnimationFrame( animate );
  orbitControls.update();
  renderer.render( scene, camera );
};
animate()