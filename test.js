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

    mainroom = loadModel("assets/mainroom-walls.obj");

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
    scenes.push(new Scene(skybox1,mainroom, color(120, 180, 120), 2000, 26, 0));
    // scenes.push(new Scene(skybox2, color(200, 200, 220), 2000, 50, 1));
    // scenes.push(new Scene(skybox2, color(100, 200, 220), 2000, 50, 1));

    //Camera Setup
    cam = createCamera();
    setCamera(cam);

    //Filling Interactable Dialgoue Arrays
    pathos1Dialgoue = ["Wow! I bet they have steady hands to make such detail.\nYeah, I don’t think I would’ve been able to make that.",
                      "This doesn’t really look like it took much effort.\nYeah, it just looks bland to be honest.",
                      "I don’t know how this made it into the exhibition. Sculpt a few curves into a stone and call it art? Please.\nNever understood how pieces like this get any attention.",
                      "That’s the pose grandpa always made when he’d see me run back home from school... it doesn’t have much detail because I never paid attention back then. When we are young sometimes things just look and seem so simple. Sorry gramps, looks like I did the opposite of honoring you."
                      ];
    pathos2Dialgoue = ["Can you believe this took 3 months to make?\nThat’s crazy, all that time definitely paid off!",
                      "You seriously think this took months to make? I could’ve done this at a pottery shop. \nYeah, I bet they exaggerated it.",
                      "Wanna bet that they went to a pottery class and made it there?\nHA! I’ll bet my savings on that one.",
                      "Huh, I made this after I had my mini stroke, I was lucky. That slight tremor in my hands didn’t stop me from doing what I love. So yes, it took months for me to make that simple piece. But I guess you needed the whole story? The “I overcame a physical obstacle to make this...” wasn’t good enough of a description for you?"
                    ]; 
    pathos3Dialgoue = ["What a cute little dragon!\nSeems like the little guy is having a nice dream based off his little smile.",
                      "Doesn’t this specific dragon look familiar?\nIt does ‘cause it looks the same as every other sleeping dragon piece you see on the internet.",
                      "Now this looks like it came out of a cartoon. My five-year-old can make this out of clay easy!\nI bet! Maybe with more detail too.",
                      "Luca, my childhood stuffed animal. Anytime I had a hard time I would lay in my bed and hold you tight till all the bad thoughts slowly faded away. That smile wasn’t just yours... when I hugged you it became mine…\nI wish they understood that."
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