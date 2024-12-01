
//Starting Variables - Change During Usage
let x = 0;
let z = 0;
let angleX = 0;
let angleY = 0;
let isMouseLocked = false; // Flag to check if the mouse is locked. Used for camera behavior
let lookX, lookY, lookZ;

//Constants. Do not change during runtime.
const speed = 3; //WASD movement speed.
const rotationSpeed = 0.0025;
const y = -70; //Player height stays constant. No Jumping.


//update location of the camera
function cameraUpdate(cam){
  // Define the camera position in world space
  let camX = x;
  let camY = y;
  let camZ = z;
  
  // Calculate where the camera is looking based on its rotation angles
  lookX = camX + cos(angleY) * cos(angleX);
  lookY = camY + sin(angleX);
  lookZ = camZ + sin(angleY) * cos(angleX);

  // Set the camera to look from (camX, camY, camZ) towards (lookX, lookY, lookZ)
  cam.setPosition(camX, camY, camZ)
  cam.lookAt(lookX, lookY, lookZ)
  //eyeXYZ is the camera position
  //centerXYZ is the object position looked at

  // Move and rotate the camera
  cameraMove();
  cameraRotate();
}

function resetCamera() {
  //Return Camera Variables to Zero
  x = 0;
  z = 0;
  angleX = 0;
  angleY = 0;
}

//Moves camera along the x-z axis
function cameraMove(playerInteracting) {

  if (!isInteracting) { //Restricts Player Movement when Interacting with Object
    // WASD controls for movement
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // W key for forward
      x += cos(angleY) * cos(angleX) * speed;
      z += sin(angleY) * cos(angleX) * speed;
    }
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // S key for backward
      x -= cos(angleY) * cos(angleX) * speed;
      z -= sin(angleY) * cos(angleX) * speed;
    }

    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A key for left
      x -= cos(angleY + HALF_PI) * speed;
      z -= sin(angleY + HALF_PI) * speed;

    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D key for right
      x += cos(angleY + HALF_PI) * speed;
      z += sin(angleY + HALF_PI) * speed;
    }
  } else { //When Interacting you Can't move.
    //print("Interacting! Can't move.");
  }

  //Debug: Print where the player is
  //print("Camera Position:" + x + ", " + y);
}
  
//Camera Rotation based on Mouse Movement
function cameraRotate() {
  if (!isInteracting) { //Restricts Player Movement when Interacting with Object
    //X and Y changes based on mouse movement (not location)
    let deltaX = movedX * rotationSpeed;
    let deltaY = movedY * rotationSpeed;

    // Update rotation angles based on mouse movement
    angleY += deltaX;
    angleX += deltaY;

    // Clamp the vertical rotation to prevent weird camera flipping
    angleX = constrain(angleX, -HALF_PI, HALF_PI);
    

      // Apply camera rotation to variables
      camX = cos(angleY) * cos(angleX)
      camY = sin(angleX)
      camZ = sin(angleY) * cos(angleX)
      // console.log("look: "+ lookX + " : "+lookY+" : "+ lookZ)
      
  } else { //When Interacting you Can't Rotate Camera.
    //print("Interacting! Can't Rotate");
  }
}

// Automatically request pointer lock the first time mouse moves
function mouseMoved() {
  if (!isMouseLocked & !paused) { //If the mouse isn't already locked and the game isn't paused 
    // Request pointer lock on the canvas the first time the mouse moves
    requestPointerLock();
  }
}

function print_position(){
  print("Pos x:", x," Pos z:", z)
}

// Listen for pointer lock changes to track the lock status
document.addEventListener('pointerlockchange', () => {
  isMouseLocked = document.pointerLockElement === canvas.elt; 
});