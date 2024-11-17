let skybox1, skybox2;
let scenes = [];
let game;
let currentSceneIndex = 0;
let scene1;
let pathoses = [];
let p, nx, ny;

let sceneManager;

let cam;
let cursorSize = 2;


function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')
    pathoses.push(new Pathos(loadModel("assets/pathos/hi.obj", true), 0, 0, 0))
}

function setup(){
    game = createCanvas(windowWidth, windowHeight, WEBGL)
    game.parent("#game");

    // Create scene objects with skybox images, object functions, and ground properties
    scenes.push(new Scene(skybox1, color(120, 180, 120), 2000, 26, 0));
    scenes.push(new Scene(skybox2, color(200, 200, 220), 2000, 50, 1));
    scenes.push(new Scene(skybox2, color(100, 200, 220), 2000, 50, 1));

     //Camera Setup
     cam = createCamera();
     cam.setPosition(0, -50, 0);
     setCamera(cam);
     nx = 0;
     ny = 0;

    //TODO: Initialize the SceneManager
    //sceneManager = new SceneManager();
}

function draw() {
    //background(0)
    
    //Updating Camera Behaviors and Position
    cameraUpdate(cam);

    //updating the pathos objects
    if (pathoses.length > 0) {
      for (let i = 0; i < pathoses.length; i++) {
        push()
        pathoses[i].update();
        pathoses[i].display();
        pop();
      }
    } else {
      console.log("huh")
    }


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
    } else if (key === '3') {
      currentSceneIndex = 2; // Switch to Scene 2 when '3' is pressed
    }

    if(key ==='e') {
      let obj_pos = [pathoses[0].x, pathoses[0].y, pathoses[0].z]
      let hit = raycast(50, obj_pos, pathoses[0].radius);
      if (hit) {
        console.log("hit")
      } else {
        console.log("nothing");
      }
      pathoses[0].inspecting = !pathoses[0].inspecting;
      // console.log("inspecting?"+ pathoses[0].inspecting)
    }
  }