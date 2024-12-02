//Game Variables
let game;
let player;

//Camera Varibles
let cam;

//Scene Variables 
let sceneManager;
let skybox1, skybox2;
let scenes = [];
let currentSceneIndex = 0;

// scene models
let mainroom;
let backroom;

//Interactable Models
let pathos1Model;
let pathos2Model;
let pathos3Model;
let doorModel;

//Intertactables Behavior
let isInteracting = false;
let isLooking = false;
let dBoxOpen = false;

//Audio files
let murmurSound;
let artGallerySong;
let doorSound;

function preload(){
    //Model for Rooms Themselves (Walls/Floor/Etc)
    mainroom = loadModel("assets/main_room/MainroomWalls.obj")
    backroom =  loadModel("assets/backroom/Backroom.obj");

    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/main_room/starry_skybox.jpg')
    skybox2 = loadImage('assets/desert.jpg')

    //load sounds
    murmurSound = loadSound('assets/audio/murmur.mp3');
    artGallerySong = loadSound('assets/audio/eternalHope.mp3');
    doorSound = loadSound('assets/audio/door.mp3');

    //Loading Models
    pathos1Model = loadModel("assets/pathos/interactable1.obj");
    pathos2Model = loadModel("assets/pathos/interactable2.obj");
    pathos3Model = loadModel("assets/pathos/interactable3.obj");
    doorModel = loadModel("assets/main_room/door.obj");
}

function setup(){
  //Game Variables (Mostly Scene Setting)
    game = createCanvas(windowWidth, windowHeight, WEBGL)
    game.parent("#game");
    noStroke(); //Removes Strokes from 3D Models

    // Create scene objects (skybox images, object functions, and ground properties)
    scenes.push(new Scene(skybox1, mainroom, color(255), 2000, 26, 0, -87000,20000, 130000 ));
    scenes.push(new Scene(skybox2, backroom, color(200, 200, 220), 2000, 50, 1,0,0,0));

    //Seting Up Interactables in Each Scene
    gallerySetUp();

    //Camera Setup
    setCamInitialPos()
    cam = createCamera();
    setCamera(cam);

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

    if (currentSceneIndex == 0) { //When we're in the gallery scene. Draw details
      //Functions with all the logic for the gallery
      drawGallery();

    } else if (currentSceneIndex == 1) { //When we're in the backroom scene. Draw details
      print("Draw Backroom!");
    }

  //Display Scene using Scene Array
  scenes[currentSceneIndex].display();

//----------- DEBUGGING AREA


  // Display model position
  // noStroke();
  // fill(0);
  // textSize(50);
  // text(scenes[currentSceneIndex].getModelPositionString(), -width / 2 + 20, height / 2 - 40);
  
}

// TODO: Scene Manager
// Scene manager to handle scene switching

//Debug: Key pressed function to switch scenes
function keyPressed() {
    if (key === '1') {
      currentSceneIndex = 0; // Switch to Scene 0 when '1' is pressed
    } else if (key === '2') {
      player.moveToBackroom(); // Moves player to the backroom
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
          startTimer(doorModel);
        }
      }

      //Hides Instructions when E is pressed
      controls = $("#controls").addClass('hide-control'); 
    }

    //Debug: Go to the Next Loop!
    if(key === 'l') {
      player.newLoop();
    }



    //----------- DEBUGGING AREA

    // Scene movement controls
    let moveAmount = 1000; // Adjust this for finer or larger steps
    let current_pathos = 2;

    if (key === 't') {
      // --- PATHOS
      // pathosArray[current_pathos].z += moveAmount; // Move up
      //   console.log("z:", pathosArray[current_pathos].z);

      // --- SCENe
      scenes[currentSceneIndex].z += moveAmount; // Move right
      print("z: ",scenes[currentSceneIndex].z)
    } else if (key === 'g') {
      // --- PATHOS
      // pathosArray[current_pathos].z -= moveAmount; // Move up
      // console.log("z:", pathosArray[current_pathos].z);
      // --- SCENE
      scenes[currentSceneIndex].z -= moveAmount; // Move right
      print("z: ",scenes[currentSceneIndex].z)

    } else if (key === 'f') {

      // --- PATHOS
      // pathosArray[current_pathos].x -= moveAmount; // Move up
      //   console.log("x:", pathosArray[current_pathos].x);

      // --- SCENE
      scenes[currentSceneIndex].x -= moveAmount; // Move right
      print("x: ",scenes[currentSceneIndex].x)
      
    } else if (key === 'h') {
      // --- PATHOS
      // pathosArray[current_pathos].x += moveAmount; // Move up
      //   console.log("x:", pathosArray[current_pathos].x);

      // --- SCENE
      scenes[currentSceneIndex].x += moveAmount; // Move right
      print("x: ",scenes[currentSceneIndex].x)
    } else if (key === 'j') {
      print("move down")
        scenes[currentSceneIndex].y += moveAmount; // Move closer
        //pathosArray[current_pathos].y += moveAmount; // Move up
        //console.log("y:", pathosArray[current_pathos].y);
    } else if (key === 'u') {
      print("move up")
       //scenes[currentSceneIndex].moveModel(0, -moveAmount, 0); // Move closer
       //pathosArray[current_pathos].y-= moveAmount; // Move up
      //console.log("y:", pathosArray[current_pathos].y);
      scenes[currentSceneIndex].y -= moveAmount; // Move farther
    }

    else if (key === 'c') {
      printCamPosition()
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