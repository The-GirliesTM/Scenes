
//Starting Variables - Change During Usage
let x = 0;
let y = -50;
let z = 0;
let angleX = 0;
let angleY = 0;
let raycastDistance = 50;
let isMouseLocked = false; // Flag to check if the mouse is locked. Used for camera behavior
let lookX, lookY, lookZ;


//Constants. Do not change during runtime.
const speed = 3;
const rotationSpeed = 0.0025;


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

  //camera(camX, camY, camZ, lookX, lookY, lookZ, 0, 1, 0); //Old Camera renderer

  // Move and rotate the camera
  if (!pathosArray[0].inspecting) {
    cameraMove();
    cameraRotate();
  }
}

// move camera along the x-z axis
function cameraMove() {

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

  //Looking where the player is
  //print("drawn!" + x + " " + y);
}
  
function cameraRotate() {
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
}

function raycast() {
  //get camera anglex n angley 
  //calculate 
  // console.log(angleX);
  // console.log(angleY);
  console.log(lookX + " : "+lookY+" : "+ lookZ); //this is the direction angle max 1, -50, 1
  console.log("cam center: "+ cam.centerX + " : "+cam.centerY+" : "+ cam.centerZ)
}

function getDist(pathos) {
  let cam_pos = createVector(cam.centerX, cam.centerY, cam.centerZ);
  let pat_pos = createVector(pathos.x, pathos.y, pathos.z);
  let d = cam_pos.dist(pat_pos);
  console.log("distance: "+d);
  return d;
}

// Automatically request pointer lock the first time mouse moves
function mouseMoved() {
  if (!isMouseLocked) {
    // Request pointer lock on the canvas the first time the mouse moves
    requestPointerLock();
  }
}

// Listen for pointer lock changes to track the lock status
document.addEventListener('pointerlockchange', () => {
  isMouseLocked = document.pointerLockElement === canvas.elt;
});