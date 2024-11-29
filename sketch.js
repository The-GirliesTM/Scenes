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

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')

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
    pathosArray.push(new Interactable( 500, -30, -100, -PI/2, 'red', pathos1Model, 1, pathos1Dialgoue));
    pathosArray.push(new Interactable( 500, -30, 100, 0, 'red', pathos2Model, 2, pathos2Dialgoue));
    pathosArray.push(new Interactable( 500, -30, 300, -PI/2, 'red', pathos3Model, 3, pathos3Dialgoue));
    
    noStroke(); //Removes Strokes from 3D Models

    //Create Player Object 
    player = new Player(1);

    //TODO: Initialize the SceneManager
    //sceneManager = new SceneManager();
}

function draw() {
  //Room Lighting
    ambientLight(170);
    let lightingColor = color(150, 100, 0);
    let lightDir = createVector(2, 3, 1);
    directionalLight(lightingColor,lightDir);

  //Loop Functionality: If the time has been activated it starts running
  updateTimer(); 

  //Pausing / Unpausing the Camera
    if (paused) {
      pause();
    } else {
      //Updating Camera Behaviors and Position
      cameraUpdate(cam);
    }

    //Array that draws the pathos.
    //This was originally in the loop below but there were issues with break; that made me move it
    for (let obj of pathosArray) {
      obj.draw(cam);
    }

    //Checking if Player is Looking at a Pathos
    for (let obj of pathosArray) {
      if(obj.checkIfLookingAt(cam)) {

        //Checks to see if Pathos is Intertable
        if(obj.activateOnLoop <= player.currentLoop) {
          print("Loop Match: Currently Interactable");  
          obj.activate(); //Viusually activates Object when looking at it

        //Determines Behaviors when player is or isnt interacting.
          if (!isInteracting) {
            showHint();
            obj.resetObject(); //Rests Object when not interacting
          } else {
            obj.rotateObject(); //Allows player to rotate object when interacting
          }
        } else {
          //Objects don't activate unless the player matches or exceeds its activate loop.
          //This causes them to not work in certain loops
          print("Looking at Pathos! Cannot Interact.")
          obj.deactivate();
        }

        isLooking = true;
        break; //This break needs to be here so the "E to Interact" hint fades when you're not looking

      } else {  
        obj.deactivate();
        isLooking = false;
      }
    }

    //Hides Hint if Player isn't looking at Active Pathos
    if(!isLooking) {
      hideHint();
      hideDialogue(); //Hides Dialgoue when player isn't looking (Mostly for none-active objects.)
    }

  //Display Scene using Scene Array
  scenes[currentSceneIndex].display();
    
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

    //Pathos Interactions 
    if(key === 'e') {
      if (!isInteracting && !dBoxOpen) {

        for (let obj of pathosArray) {
          if(obj.checkIfLookingAt(cam) & obj.activateOnLoop <= player.currentLoop) { //Detect if the Player is looking at intertacbles Objects for this loop
            if (obj.activateOnLoop <= player.currentLoop) { 

              //Handling Hint Hiding
              hideHint();
              isInteracting = true;

              //This Function handles all reactions from the Object when Interacted.
              obj.interact(player.currentLoop);
              obj.isInteracting = isInteracting; //Updates Object Interacting Variable to match

            } else {
              print("Incorrect loop. Unable to Interact.");  
            }
          } else if (obj.checkIfLookingAt(cam)) { //Displays Text Box for inactivate object.
            obj.loadDialogue(obj.dialogueArray[player.currentLoop - 1]);
            obj.showDialogue();
            hideHint();
          }
        }
      } else if (dBoxOpen) { //this is for when you want to turn off the 
        hideDialogue();
        isInteracting = false;

        //Checks to see if loop conditions have been met. Starts timer if so.
        let canLoop = checkIfLoopPossible();
        if (canLoop) {
          startTimer();
        }
      }
      controls = $("#controls").addClass('hide-control');
        print("hide control")
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

  //Hides any dialog boxes that are being displayed
function hideDialogue() {
  dialog = $("#dialog").removeClass("show-dialogue");
  dBoxOpen = false;
}
//Shows a Key-Input hint
function showHint() {
  hint = $("#hint").addClass("show-hint");
}

//Hides Key-Input Hint
function hideHint() {
  hint = $("#hint").removeClass("show-hint");
}