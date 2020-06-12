//Set Up Scene Variables
let scene;
let camera;
let container;
let renderer;
let controls;
// Test Line
let testLine;
let dnaLines = [];

//Main Loop------------------------------------------------------
init();
animate();

//Scene Related Function-------------------------------------------------------------------------------------------------------
function init() {
    // ---------------------Env Set Up
    container = document.getElementById( 'container' );
    // ---------------------Camera Set Up
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    // camera.position.z = 19507;
    camera.position.z = 300;
    camera.far = 1000000;
    camera.updateProjectionMatrix();
    controls = new THREE.OrbitControls( camera, container );
    controls.addEventListener( 'change', render );
    // ---------------------Scene/Render Set Up
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { antialias: true} );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    //Let's Try To Draw a line
    // let numberOfPoints = 2;
    // let lineGeometry = new THREE.BufferGeometry();
    // let linePosition = new Float32Array(numberOfPoints * 3);
    // lineGeometry.addAttribute("position", new THREE.BufferAttribute(linePosition, 3));
    // let material = new THREE.LineBasicMaterial({color: 0xFFFFFF});
    // let line = new THREE.Line(lineGeometry, material);
    // line.geometry.dynamic = true;
    // for (let i=0; i<numberOfPoints; i++){
    //     line.geometry.attributes.position.array[i*3] = -100 + 200*i;
    //     line.geometry.attributes.position.array[i*3+1] = 0;
    //     line.geometry.attributes.position.array[i*3+2] = 0;
    // }
    // line.geometry.setDrawRange(0,  numberOfPoints);
    // line.geometry.attributes.position.needsUpdate = true;
    // let start = new THREE.Vector3(-100, 0, 0);
    // let end = new THREE.Vector3(100, 0, 0);
    // testLine = new Line(start, end, 1000, 10);
    // scene.add(testLine.line);
    createDNALines();
}

function createDNALines(){
    let startPosition = new THREE.Vector3(0, 2500, 0);
    let lineGap = 25;
    let numberOfLines = startPosition.y * 2 / lineGap;
    let cycleLength = 80;
    let rotationUnit = 2*Math.PI/cycleLength;
    let baseLength = 150;
    let varyLength = 100;
    let startRotation = 0.75*2*Math.PI;
    for (let i=0; i<numberOfLines; i++){
        let currentRotation = startRotation + i*rotationUnit;
        let currentHalfLength = 150 + Math.sin(currentRotation) * varyLength;
        let start =  new THREE.Vector3(-currentHalfLength, 0, 0);
        let end =  new THREE.Vector3(currentHalfLength, 0, 0);
        let newLine = new Line(start, end, 1000, 10);
        let newLinePosition = new THREE.Vector3(0, startPosition.y - i*lineGap, 0);
        newLine.line.position.copy(newLinePosition);
        newLine.line.rotation.y = currentRotation;
        scene.add(newLine.line);
        dnaLines.push(newLine);
    }
}

function moveToFar(){
    let target = new THREE.Vector3(0, 0, 13690);
    moveCamera(target, 25000);
}

function moveCamera(target, tweenTime){
    let deepTripPosition = new TWEEN.Tween( controls.object.position )
        .to( {
            x: target.x,
            y: target.y,
            z: target.z
        }, tweenTime)
        .easing( TWEEN.Easing.Cubic.InOut ).onUpdate( function () {
        })
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate(){
    for (let i=0; i<dnaLines.length; i++){
        dnaLines[i].update();
    }
    TWEEN.update();
    controls.update(); // controls.update();
    requestAnimationFrame( animate );
    render();
}

function render() {
    renderer.render( scene, camera );
}
