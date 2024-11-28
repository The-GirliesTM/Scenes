//Game Variables
let game;
let player;

//Scene Variables 
let sceneManager;
let skybox1, skybox2;
let scenes = [];
let currentSceneIndex = 0;

//Camera Varibles
let cam;

//Interactables 
let pathosArray = []; // Array to store interactable objects
let pathos1Model;
let pathos2Model;
let pathos3Model;
let isInteracting = false;
let isLooking = false;
let dBoxOpen = false;

//Pathos Dialogue Arrays 
let pathos1Dialgoue = []; 
let pathos2Dialgoue = []; 
let pathos3Dialgoue = []; 


//TODO: Textures? May be Deprecated
let texture1;

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')

    //Loading Textures
    texture1 = loadImage("assets/pathos/textures/interactable1_Texture.png");

    //Loading Models
    pathos1Model = loadModel("assets/pathos/interactable1.obj");
    pathos2Model = loadModel("assets/pathos/interactable2.obj");
    pathos3Model = loadModel("assets/pathos/interactable3.obj");
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

    //Filling Interactable Dialgoue Arrays
    pathos1Dialgoue = ["Pathos 1 - Loop 1",
                      "Pathos 1 - Loop 2",
                      "Pathos 1 - Loop 3"
                      ];
    pathos2Dialgoue = ["Huh... the pathos isn't working. (Error Message)",
                      "Pathos 2 - Loop 2",
                      "Pathos 2 - Loop 3"
                    ]; 
    pathos3Dialgoue = ["Looking like this one isn't installed yet. (Error Message)",
                      "I wonder if she'll ever install this one? (Error Message)",
                      "Pathos 3 - Loop 3"
                    ]; 

    //Interctable Objects
    pathosArray.push(new Interactable( 500, -30, -100, 'red', pathos1Model, texture1, 1, pathos1Dialgoue));
    pathosArray.push(new Interactable( 500, -30, 100, 'red', pathos2Model, texture1, 2, pathos2Dialgoue));
    pathosArray.push(new Interactable( 500, -30, 300, 'red', pathos3Model, texture1, 3, pathos3Dialgoue));
    
    noStroke(); //Removes Strokes from 3D Models

    //Create Player Object 
    player = new Player(1);

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

    //Checking if Player is Looking at a Pathos
    for (let obj of pathosArray) {
      obj.draw(cam);
      if(obj.checkIfLookingAt(cam)) {
        if(obj.activateOnLoop <= player.currentLoop) {
          print("Loop Match: Currently Interactable");  
          obj.activate();
          if (!isInteracting) {
            showHint();
          }
        } else {
          //on the vase, the obj activates at loop = 2 and player is on loop 1;
          //this causes them to not work in certain loops
          print("Looking at Pathos! Cannot Interact.")
          obj.deactivate();
        }
        isLooking = true;
      } else {  
        obj.deactivate();
        // isLooking = false;
      }
  }

  if(!isLooking) {
    hideHint()
  }

  //Display Scene using Scene Array
  scenes[currentSceneIndex].display();
    
}

function loadDialogue(d) {
  dialog = $("#dialog").text();
  console.log(dialog);
  $("#dialog").text(d);
}

function showDialogue() {
  dialog = $("#dialog").addClass("show-dialogue");
  dBoxOpen = true;
}

function hideDialogue() {
  dialog = $("#dialog").removeClass("show-dialogue");
  dBoxOpen = false;
}

function showHint() {
  hint = $("#hint").addClass("show-hint");
}

function hideHint() {
  hint = $("#hint").removeClass("show-hint");
}


// TODO: Scene Manager
// Scene manager to handle scene switching

//Debug: Key pressed function to switch scenes
function keyPressed() {
    if (key === '1') {
      currentSceneIndex = 0; // Switch to Scene 0 when '1' is pressed
    } else if (key === '2') {
      currentSceneIndex = 1; // Switch to Scene 1 when '2' is pressed
    } 

    if(key === 'Escape' || key === 'Tab') {
      pauseGame();
    }

    if(key === 'e') {
      if (!isInteracting && !dBoxOpen) {
        for (let obj of pathosArray) {
          if(obj.checkIfLookingAt(cam) & obj.activateOnLoop <= player.currentLoop) { //Detect if the Player is looking at intertacbles Objects for this loop
            if (obj.activateOnLoop <= player.currentLoop) { 
              obj.interact(cam, player.currentLoop);
              loadDialogue(obj.dialogueArray[player.currentLoop - 1]);
              showDialogue();
              hideHint();
              isInteracting = true;
            } else {
              print("Incorrect loop. Unable to Interact.");  
            }
          } else if (obj.checkIfLookingAt(cam)) {
            loadDialogue(obj.dialogueArray[player.currentLoop - 1]);
            showDialogue();
            hideHint();
          }
        }
      } else if (dBoxOpen) { //this is for when you want to turn off the 
        hideDialogue();
        isInteracting = false;
      }
    }

    //Debug: Go to the Next Loop!
    if(key === 'l') {
      player.newLoop();
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