


var previous = 0;

function updateShots() {
    moles[previous].newShot();
    previous = (previous + 1) % 3
}

t = 0;
function drunk(dt) {
    t += dt;
    var drunkheid = score / 4000;
    drunkheid = drunkheid > 1.0 ? 1.0 : drunkheid;
    // drunkheid = 1;
    controls.object.position.x = Math.sin(t) * drunkheid + Math.cos(t*2) * 0.5 * drunkheid;
    controls.object.position.y = 5 + Math.cos(t) * drunkheid;
    controls.object.position.z = 4 + Math.sin(t*0.5) * drunkheid * 0.4;
    controls.object.lookAt(Math.sin(-t * 1.434) * drunkheid * 0.8, 0, Math.sin(t) * drunkheid);
}


//////////////////////////////////////////////////////////////////////////////////
//		Initialisation
//////////////////////////////////////////////////////////////////////////////////

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(new THREE.Color('#abc9ee'), 1);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Array of functions for the rendering loop
var onRenderFcts = [];

// Initialise scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.x = 0;
camera.position.z = 4;
camera.position.y = 5;
var controls = new THREE.OrbitControls(camera);

var listener = new THREE.AudioListener();
camera.add( listener );

var grassMaterial = new THREE.MeshPhongMaterial( { overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var grassTexture = undefined;
var moleMaterial = new THREE.MeshPhongMaterial( { overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var vodkaMaterial = new THREE.MeshPhongMaterial( { overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var numberMaterial = new THREE.MeshPhongMaterial( { overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var escalatieMaterial = new THREE.MeshPhongMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var bottleMaterial = new THREE.MeshPhongMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );

var hundredMaterial = new THREE.SpriteMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var okMaterial = new THREE.SpriteMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var litMaterial = new THREE.SpriteMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var coldsweatMaterial = new THREE.SpriteMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );
var cryMaterial = new THREE.SpriteMaterial( {overdraw: true, side: THREE.DoubleSide, transparent: true,  } );

new THREE.TextureLoader().load( 'resources/grassdud.png', (texture) => {
    // texture.repeat.set(0.001, 0.001);
    grassTexture = texture;
    grassMaterial.map = texture;
    grassMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/vodka.png', (texture) => {
    vodkaMaterial.map = texture;
    vodkaMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/mole.png', (texture) => {
    moleMaterial.map = texture;
    moleMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/123.png', (texture) => {
    numberMaterial.map = texture;
    numberMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/licht.png', (texture) => {
    escalatieMaterial.map = texture;
    escalatieMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/bottle.png', (texture) => {
    bottleMaterial.map = texture;
    bottleMaterial.needsUpdate = true;
});


new THREE.TextureLoader().load( 'resources/100.png', (texture) => {
    hundredMaterial.map = texture;
    hundredMaterial.needsUpdate = true;
});


new THREE.TextureLoader().load( 'resources/coldsweat.png', (texture) => {
    coldsweatMaterial.map = texture;
    coldsweatMaterial.needsUpdate = true;
});


new THREE.TextureLoader().load( 'resources/cry.png', (texture) => {
    cryMaterial.map = texture;
    cryMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/fire.png', (texture) => {
    litMaterial.map = texture;
    litMaterial.needsUpdate = true;
});

new THREE.TextureLoader().load( 'resources/okhand.png', (texture) => {
    okMaterial.map = texture;
    okMaterial.needsUpdate = true;
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var loader = new THREE.STLLoader();
loader.load( 'resources/ground.stl', function ( geometry ) {

    var material = new THREE.MeshPhongMaterial( { color: 0x514b38 } );
    // var material = grassMaterial;
    console.log("model")

    var mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = Math.PI/2;
    mesh.rotation.z = Math.PI/2;

    scene.add( mesh );

} );

var sound = new THREE.Audio( listener );

var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'resources/kutmuziek.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 1 );
	sound.play();
});




//////////////////////////////////////////////////////////////////////////////////
//		Scene setup
//////////////////////////////////////////////////////////////////////////////////

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
scene.add(directionalLight.target)
directionalLight.target.position.set(1, 0, -0.5);
scene.add( directionalLight );

var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add(directionalLight2.target)
directionalLight2.target.position.set(-0.5, 0, -1);
scene.add( directionalLight2 );

var geometry = new THREE.BoxGeometry( 30, 3, 10 );
var material = new THREE.MeshPhongMaterial( {color: 0x514b38} );
var cube = new THREE.Mesh( geometry, material );
cube.position.z = -10;
cube.rotation.x = 0.1;
scene.add( cube );

var geometry = new THREE.BoxGeometry( 10, 3, 10 );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = -10;
cube.rotation.z = -0.1;
scene.add( cube );

var geometry = new THREE.BoxGeometry( 10, 3, 10 );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 10;
cube.rotation.z = 0.1;
scene.add( cube );

var geometry = new THREE.PlaneGeometry( 8, 2, 1 );
plane = new THREE.Mesh( geometry, numberMaterial );
plane.position.set(0, 1.01, 0.2);
plane.rotation.x = -Math.PI/2;
scene.add( this.plane );


var positions = [[5,2,-4, -0.3], [-4,1.8,3,0.3], [-3, 2, -3.3, 6], [1, 2, -5, 0.5], [5.5, 2, -2, 0]]

for (let pos of positions) {
    var geometry = new THREE.PlaneGeometry( 2, 2, 1 );
    var plane = new THREE.Mesh( geometry, grassMaterial );
    plane.position.set(pos[0], pos[1], pos[2]);
    plane.rotation.set(0, pos[3], 0);
    scene.add( plane );
}

var mole1 = new Mole(new THREE.Vector3(-1.9,1,-1), "Digit1");
var mole2 = new Mole(new THREE.Vector3(0.1,1,-2.5), "Digit2");
var mole3 = new Mole(new THREE.Vector3(2.3,1,-1.2), "Digit3");

var moles = [mole1, mole2, mole3]

var licht = new EscalatieLicht();


var score = 0;

var gamestate = "Starting"
var startTime = 0;
var endTime = 0;

setTimeout(() => {
    setInterval(updateShots, 60/BPM * 1000);
    startTime = +new Date();
    gamestate = "First"
}, 4200)

var text = document.createElement('div');
text.style.position = 'absolute';
text.style.width = 100;
text.style.height = 100;
text.innerHTML = score + "mL";
text.style.fontFamily = "Impact"
text.style.fontSize = "70pt";
text.style.top = 20 + 'px';
text.style.left = 20 + 'px';
text.style.color = "white";
document.body.appendChild(text);

var curtain = document.getElementById("render");

var fallSpeed = 0;

//////////////////////////////////////////////////////////////////////////////////
//		Rendering
//////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

onRenderFcts.push(function(dt) {
    renderer.render( scene, camera );
    for (let mole of moles) {
        mole.update(dt);
    }
    licht.update(dt);


    switch (gamestate) {
        case "Starting":
            text.innerHTML = Math.round(score) + "mL";
            break;
        case "First":
            text.innerHTML = Math.round(score) + "mL";
            if (this.score > 100) {
                gamestate = "Shining";
                licht.show();
            }
            drunk(dt);
            break;
        case "Shining":
            text.innerHTML = Math.round(score) + "mL";
            if (this.score > 200) {
                gamestate = "DeadFalling";
                endTime = +new Date();
            }

            drunk(dt);
            break;
        case "DeadFalling":

            var current = parseFloat(curtain.style.opacity);

            if (current > 1.0) {
                gamestate = "End"
                text.innerHTML = "Congratulations. You drank over 5 liters in " + ((endTime - startTime) / 1000).toString() + " seconds!"
            }

            curtain.style.opacity = (current + dt * 0.3).toString();

            fallSpeed += dt;
            controls.object.position.y -= fallSpeed * dt;
            if (controls.object.position.y <= 1.1) {
                controls.object.position.y = 1.1
            }
            // controls.object.lookAt(controls.target.x, controls.target.y - dt*10, controls.target.y);

            break;
        case "End":
            break;
        default:

    }
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
