
let game;
let player;

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
let testModel3;

let texture1;

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')


    //Creating the pathosArray 
    //pathosArray.push(new Pathos(loadModel("assets/testModels/hi.obj", true), "test object", 0, -200, 500));

    //Loading Textures
    texture1 = loadImage("assets/pathos/textures/interactable1_Texture.png");

    //Loading Models
    testModel = loadModel("assets/pathos/interactable1.obj");
    testModel2 = loadModel("assets/pathos/interactable2.obj");
    testModel3 = loadModel("assets/pathos/interactable3.obj");
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
    setCamera(cam);

    //Interctable Objects
    interactables.push(new Interactable( 500, -30, -100, 'red', testModel, texture1));
    interactables.push(new Interactable( 500, -30, 100, 'red', testModel2, texture1));
    interactables.push(new Interactable( 500, -30, 300, 'red', testModel3, texture1));

    //Removes Strokes from 3D Models
    noStroke();   // Disable filling the geometry

    //Deprecated: Will be Removed
    interactableRotationKeys = 0;
    interctableRotation = 0;

    //Create Player Object 
    player = new Player(1);

    //TODO: Initialize the SceneManagersssssssdw
    //sceneManager = new SceneManager();
}

function draw() {
  //Pausing / Unpausing the Camera
    if (paused) {
      pause();
    } else {
      //Updating Camera Behaviors and Position
      cameraUpdate(cam);
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

    //Pausing the Game: Use Tab. Escape is a Backup
    if(key === 'Tab' || key === 'Escape') {
      pauseGame();
    }

    //Interacting with Objects
    if(key === 'e') {
      for (let obj of interactables) {
        if(obj.checkIfLookingAt(cam)) { //Detect if the Player is looking at intertacbles Objects
          print("Interacting with Object!");  
          obj.interact(cam, player.currentLoop);
        }
      }
    }

    //Debug: Go to the Next Loop!
    if(key === 'l') {
      player.currentLoop++;
      print("Loop Completed! Going to Loop: " + player.currentLoop);
    }
  }

  //Function for Pausing the Game
  function pauseGame() {
    paused = !paused;

    if (!paused) {
      pauseDiv.removeClass("show-pause")
      overlay = $("#overlay").removeClass("overlay")
    } else {
      document.exitPointerLock();

      pauseDiv = $("#pause-menu")
      .addClass("show-pause")
      overlay = $("#overlay").addClass("overlay")
    }
  }