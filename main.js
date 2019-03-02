
//////////////////////////////////////////////////////////////////////////////////
//		Initialisation
//////////////////////////////////////////////////////////////////////////////////

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(new THREE.Color('#0c0c0c'), 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Array of functions for the rendering loop
var onRenderFcts = [];

// Initialise scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.x = 0;
camera.position.z = 40;
var controls = new THREE.OrbitControls(camera);

//////////////////////////////////////////////////////////////////////////////////
//		Scene setup
//////////////////////////////////////////////////////////////////////////////////

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add( directionalLight );

var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
var material = new THREE.MeshPhongMaterial( {color: 0xff6400, wireframe: false, shininess: 10} );
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


//////////////////////////////////////////////////////////////////////////////////
//		Rendering
//////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

onRenderFcts.push(function(){
    renderer.render( scene, camera );
});

var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
    requestAnimationFrame(animate);

    lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec = nowMsec;

    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
    });
});
