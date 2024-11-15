
let x = 0;
let y = -50;
let z = 0;
let angleX = 0;
let angleY = 0;

let cameraIsRotating = false;
let previousMouseX, previousMouseY;

//update location of the camera
function cameraUpdate(){
    // Define the camera position
  let camX = x;
  let camY = y;
  let camZ = z;
  
  // Calculate where the camera is looking based on its rotation angles
  let lookX = camX + cos(angleY) * cos(angleX);
  let lookY = camY + sin(angleX);
  let lookZ = camZ + sin(angleY) * cos(angleX);
  
  // Set the camera to look from (camX, camY, camZ) towards (lookX, lookY, lookZ)
  camera(camX, camY, camZ, lookX, lookY, lookZ, 0, 1, 0);

  // Move and rotate the camera
  cameraMove();
  cameraRotate();
}

// move camera along the x-z axis
function cameraMove() {
  let speed = 3;

  // WASD controls for movement
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // S key for forward
    x += cos(angleY) * cos(angleX) * speed;
    z += sin(angleY) * cos(angleX) * speed;
  }
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // W key for backward
    x -= cos(angleY) * cos(angleX) * speed;
    z -= sin(angleY) * cos(angleX) * speed;
  }
  }
  
function cameraRotate() 
{
  let rotationSpeed = 0.025;

  if (keyIsDown(65)) { // A key to rotate left
    angleY -= rotationSpeed;
  }
  if (keyIsDown(68)) { // D key to rotate right
    angleY += rotationSpeed;
  }

  // Optional mouse drag rotation
  if (cameraIsRotating) {
    let deltaX = mouseX - previousMouseX;
    let deltaY = mouseY - previousMouseY;

    angleY -= deltaX * 0.05;
    angleX -= deltaY * 0.05;

    // Clamp the vertical angle to prevent flipping
    angleX = constrain(angleX, -HALF_PI, HALF_PI);

    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
}
  
  // Start dragging when mouse is pressed
  function mousePressed() 
  {
    
  }
  
  // Stop dragging when mouse is released
  function mouseReleased() 
  {
    
  }
  