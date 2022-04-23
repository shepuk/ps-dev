const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
let sphere;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000);

var fogColor = new THREE.Color(0xffffff);
scene.background = fogColor; // Setting fogColor as the background color also
scene.fog = new THREE.Fog(fogColor, 145, 200);


const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("canvas").appendChild(renderer.domElement);

function createParticles() {
    for (let i = 0; i < 500; i++) {

        const geometry = new THREE.SphereGeometry( 0.3, 6, 6 );
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    sphere.position.x = Math.random()*360 - 180;
    sphere.position.y = Math.random()*360 - 180;
    sphere.position.z = Math.random()*360 - 180;
}}

camera.position.y = -30;
camera.position.x = 30;
camera.lookAt( 0, 0, 0 );

function animate() {

    requestAnimationFrame(animate);

    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.002;

    renderer.render(scene, camera);
}

// https://stackoverflow.com/questions/37370246/three-js-how-to-pivot-camera-around-a-vector3-point
var period = 60; // rotation time in seconds
var clock = new THREE.Clock();
var matrix = new THREE.Matrix4(); // Pre-allocate empty matrix for performance. Don't want to make one of these every frame.
render();

function render() {
  requestAnimationFrame(render);
    camera.updateProjectionMatrix();

  // Create a generic rotation matrix that will rotate an object
  // The math here just makes it rotate every 'period' seconds.
  matrix.makeRotationY(clock.getDelta() * 2 * Math.PI / period);

  // Apply matrix like this to rotate the camera.
  camera.position.applyMatrix4(matrix);

  // Make camera look at the box.
  camera.lookAt(0, 0, 0);

  // Render.
}

//https://www.youtube.com/watch?v=8jP4xpga6yY&t=909s&ab_channel=TraversyMedia
function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.update.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

createParticles();
animate();