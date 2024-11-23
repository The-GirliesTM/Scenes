
let game;

//Pathos Variables 
let pathosArray = [];
let interactableRotationKeys, interctableRotation; //Tracking Rotation of Selected Object

//Scene Variables 
let sceneManager;
let skybox1, skybox2;
let scenes = [];
let currentSceneIndex = 0;

//Camera Varibles
let cam;

//Interactables 
let interactables = []; // Array to store interactable objects
let testModel;
let testModel2;

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')


    //Creating the pathosArray 
    pathosArray.push(new Pathos(loadModel("assets/pathos/hi.obj", true), "test object", 0, -200, 500));

   
    testModel = loadModel("assets/pathos/fish.obj");
    testModel2 = loadModel("assets/pathos/chicken.obj");


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


     //Interctable Objects
     interactables.push(new Interactable( 500, -30, -100, 'red', testModel));
     interactables.push(new Interactable( 500, -30, 100, 'red', testModel2));
    


     interactableRotationKeys = 0;
     interctableRotation = 0;

    //TODO: Initialize the SceneManagersssssssdw
    //sceneManager = new SceneManager();
}

function draw() {
    //background(0)
    
    //Updating Camera Behaviors and Position
    cameraUpdate(cam);

    //updating the pathos objects
    if (pathosArray.length > 0) {
      for (let i = 0; i < pathosArray.length; i++) {
        push()
        pathosArray[i].update();
        pathosArray[i].display();
        pop();
      }
    } else {
      console.log("no pathos here")
    }

    for (let obj of interactables) {
      obj.draw(cam);
      if(obj.checkIfLookingAt(cam)) {
        print("Looking at object!");  
        obj.activate();
      } else {
        obj.deactivate();
      }
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
      let obj_pos = [pathosArray[0].x, pathosArray[0].y, pathosArray[0].z]
      // raycast();
      if (getDist(pathosArray[0]) < 200) {
        console.log("pick up");
        pathosArray[0].inspecting = !pathosArray[0].inspecting;
      } else {
        console.log("too far");
      }
      // if (hit) {
      //   console.log("hit")
      // } else {
      //   console.log("nothing");
      // }
      
      // console.log("inspecting?"+ pathosArray[0].inspecting)
    }

    if(key === 'i') {
      for (let obj of interactables) {
        if(obj.checkIfLookingAt(cam)) {
          print("Looking at object! 1");  
        }
      }
    }
  }