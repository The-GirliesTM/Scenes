
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
let isInteracting = false;
let isLooking = false;
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

    //TODO: Initialize the SceneManagersssssssdw
    //sceneManager = new SceneManager();
}

function draw() {
    //background(0)
    
    ambientLight(170);
    let c = color(150, 100, 0);
    let lightDir = createVector(2, 3, 1);
    directionalLight(c,lightDir);

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
        showHint();
      } else {
        obj.deactivate();
        hideHint();
      }
  }

    //Display Scene using Scene Array
    scenes[currentSceneIndex].display();

    // loadDialogue();
    
}

function loadDialogue(d) {
  dialog = $("#dialog").text();
  console.log(dialog);
  $("#dialog").text(d);
}

function showDialogue() {
  dialog = $("#dialog").addClass("show-dialogue");
}

function hideDialogue() {
  dialog = $("#dialog").removeClass("show-dialogue");
}

function showHint() {
  hint = $("#hint").addClass("show-hint");
}

function hideHint() {
  hint = $("#hint").removeClass("show-hint");
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

    // if(key ==='e') {
    //   let obj_pos = [pathosArray[0].x, pathosArray[0].y, pathosArray[0].z]

    //   print("Camera Position:" + cam.centerX + ", " + cam.centerY);
    //   print("Object Position:" + pathosArray[0].x + ", " + pathosArray[0].y);

    //   // raycast();
    //   if (getDist(pathosArray[0]) < 200) {
    //     console.log("pick up");
    //     pathosArray[0].inspecting = !pathosArray[0].inspecting;
    //   } else {
    //     console.log("too far");
    //   }
    //   // if (hit) {
    //   //   console.log("hit")
    //   // } else {
    //   //   console.log("nothing");
    //   // }
      
    //   // console.log("inspecting?"+ pathosArray[0].inspecting)
    // }

    if(key === 'Escape' || key === 'Tab') {
      pauseGame();
    }

    if(key === 'e') {
      if(isInteracting) {
        hideDialogue();
        isInteracting = false;
      } else {
        for (let obj of interactables) {
          if(obj.checkIfLookingAt(cam)) {
            print("Looking at object! 1"); 
            isInteracting = true;
          }
        }
        if (isInteracting) {
          loadDialogue("this is a chicken");
          showDialogue();
        }
      }

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