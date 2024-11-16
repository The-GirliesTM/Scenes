let skybox1, skybox2;
let scenes = [];
let currentSceneIndex = 0;

let sceneManager;

let cam;
let cursorSize = 2;


function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL)

    // Create scene objects with skybox images, object functions, and ground properties
    scenes.push(new Scene(skybox1, color(120, 180, 120), 2000, 26, 0));
    scenes.push(new Scene(skybox2, color(200, 200, 220), 2000, 50, 1));

     //Camera Setup
     cam = createCamera();
     cam.setPosition(0, -50, 0);
     setCamera(cam);

    //TODO: Initialize the SceneManager
    //sceneManager = new SceneManager();
}


function draw() {
    //Updating Camera Behaviors and Position
    cameraUpdate(cam);

    //Display Scene using Scene Array
    scenes[currentSceneIndex].display();    
}


// TODO: Scene Manager
// Scene manager to handle scene switching
// Key pressed function to switch scenes
function keyPressed() {
    if (key === '1') {
      currentSceneIndex = 0; // Switch to Scene 0 when '1' is pressed
    } else if (key === '2') {
      currentSceneIndex = 1; // Switch to Scene 1 when '2' is pressed
    }
  }