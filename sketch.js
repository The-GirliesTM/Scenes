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
let backroomSong;

function preload(){

    mainroom = loadModel("assets/main_room/MainroomWalls.obj");
    mainroomPedestals = loadModel("assets/main_room/Pedestals.obj");
    mainroomPortraits = loadModel("assets/main_room/Portraits.obj");
  
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
    noStroke();

    //Start Playing Backgroumd Music and 
    artGallerySong.amp(0.3);
    artGallerySong.loop();
    artGallerySong.play();

    // Create scene objects with skybox images, object functions, and ground properties
    // scenes.push(new Scene(skybox1, mainroom, color(255), 2000, 26, 0, -87000,20000, 130000 ));
    // scenes.push(new Scene(skybox2, backroom, color(200, 200, 220), 2000, 50, 1,0,0,0));


    // NEW SCENE VERSION ------------------------
    
    // SCENES constructor(sky, groundCol, groundSize, groundY)
    scenes.push(new Scene(skybox1, color(255), 2000, 0));
    // print("Scene array",scenes);

    let pedestalColor = color(188,143,143);
    let portraitColor = color(188,143,143);

    scenes[0].addModel(mainroom, -87000,20000, 130000, 0.006, -PI, PI, 0);
    scenes[0].addModel(mainroomPedestals, -48000,-2000, 28000, 0.006, -PI, PI, 0, pedestalColor);
    scenes[0].addModel(mainroomPortraits,-86700,-2000, 129800, 0.006, -PI, PI, 0, portraitColor);
    // X: -86700 z: 129800
    // print("Scene models", scenes[0].models);

    let backroomColor = color(50,10,50)
    scenes.push(new Scene(skybox2,  color(200, 200, 220), 2000, 0));
    scenes[1].addModel(backroom, 0,-2000, 0, 0.006, -PI, PI, 0,backroomColor);
    print("Scene models", scenes[1].models[0]);


    //Seting Up Interactables in Each Scene
    gallerySetUp();
    backroomSetup();

    //Camera Setup
    setCamInitialPos()
    cam = createCamera();
    setCamera(cam);

    //Create Player Object 
    player = new Player(1);

    //TODO: Initialize the SceneManager
    //sceneManager = new SceneManager();
}

function draw() 
{
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
      drawBackroom();
    }

  //Display Scene using Scene Array
  scenes[currentSceneIndex].display();
  //scenes[2].display()

//----------- DEBUGGING AREA

  
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
          if(obj.checkIfLookingAt(cam) && obj.activateOnLoop <= player.currentLoop) { //Detect if the Player is looking at intertacbles Objects for this loop
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
          } else if (obj.checkIfLookingAt(cam) && obj.activateOnLoop != 4) { //Displays Text Box for inactivate object.
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
    let moveAmount = 100; // Adjust this for finer or larger steps
    let current_pathos = 1; // Adjust to change pathos
    let current_scene = 0; // Adjust to change to other scene
    let current_model = 2; // Adjust change model 

    if (key === 't') {
      // --- PATHOS
      // pathosArray[current_pathos].z += moveAmount; // Move up
      // console.log("z:", pathosArray[current_pathos].z);

      // --- SCENE

      // scene 1 walls
      scenes[current_scene].models[current_model].position.z += moveAmount; // Move right
      print("z: ",scenes[current_scene].models[current_model].position.z)

    } else if (key === 'g') {
      // --- PATHOS
      // pathosArray[current_pathos].z -= moveAmount; // Move up
      // console.log("z:", pathosArray[current_pathos].z);


      // --- SCENE
      // scene 1 walls
      scenes[current_scene].models[current_model].position.z -= moveAmount; // Move right
      print("z: ",scenes[current_scene].models[current_model].position.z)

    } else if (key === 'f') {

      // --- PATHOS
      // pathosArray[current_pathos].x -= moveAmount; // Move up
      // console.log("x:", pathosArray[current_pathos].x);

      // --- SCENE
      // scene 1 walls
      scenes[current_scene].models[current_model].position.x -= moveAmount; // Move right
      print("x: ",scenes[current_scene].models[current_model].position.x)
      
    } else if (key === 'h') {
      // --- PATHOS
      // pathosArray[current_pathos].x += moveAmount; // Move up
      // console.log("x:", pathosArray[current_pathos].x);

      // --- SCENE
      // scene 1 walls
      scenes[current_scene].models[current_model].position.x += moveAmount; // Move right
      print("x: ",scenes[current_scene].models[current_model].position.x)
    } 
    else if (key === 'j') {
      print("move down")
        //scenes[currentSceneIndex].y += moveAmount; // Move closer
        // pathosArray[current_pathos].y += moveAmount; // Move up
        // console.log("y:", pathosArray[current_pathos].y);

        // scene 1 walls
        scenes[current_scene].models[current_model].position.y += moveAmount; // Move right
        print("y: ",scenes[current_scene].models[current_model].position.y)
    } else if (key === 'u') {
      print("move up")
       //scenes[currentSceneIndex].moveModel(0, -moveAmount, 0); // Move closer
      // pathosArray[current_pathos].y-= moveAmount; // Move up
      // console.log("y:", pathosArray[current_pathos].y);
     
      // scene 1 walls
      scenes[current_scene].models[current_model].position.y -= moveAmount; // Move right
      print("y: ",scenes[current_scene].models[current_model].position.y)
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