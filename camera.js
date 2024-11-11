
let x = 0;
let y = -50;
let z = 0;
let angleX = 0;
let angleY = 0;

let cameraIsRotating = false;
let previousMouseX, previousMouseY;

//update location of the camera
function cameraUpdate(){
    // Update camera position based on angle
    let camX = x + cos(angleY) * cos(angleX) * 200;
    let camZ = z + sin(angleY) * cos(angleX) * 200;
    let camY = y + sin(angleX) * 200;
    
    // Set the camera with updated angles and position
    camera(camX, camY, camZ, x, y, z, 0, 1, 0);

    // move the camera along the x-z position
    cameraMove();
    // rotate camera
    cameraRotate();
}

// move camera along the x-z axis
function cameraMove() {
    let speed = 3;
  
    // WASD controls for movement
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // W key for forward
      x += cos(angleY) * cos(angleX) * speed;
      z += sin(angleY) * cos(angleX) * speed;
      // y += sin(angleX) * speed;
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // S key for backward
      x -= cos(angleY) * cos(angleX) * speed;
      z -= sin(angleY) * cos(angleX) * speed;
      // y -= sin(angleX) * speed;
    }
    if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A key for left
      x += cos(angleY + HALF_PI) * speed;
      z += sin(angleY + HALF_PI) * speed;
    }
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D key for right
      x += cos(angleY - HALF_PI) * speed;
      z += sin(angleY - HALF_PI) * speed;
    }
  }
  
function cameraRotate() 
{
    // Rotate the camera when the mouse is dragged
    if (cameraIsRotating) 
    {
      let deltaX = mouseX - previousMouseX;
      let deltaY = mouseY - previousMouseY;
      
      angleY -= deltaX * 0.005;
      //angleX -= deltaY * 0.005;
  
      // Clamp the vertical angle to prevent flipping
      //angleX = constrain(angleX, -HALF_PI, HALF_PI);
  
      previousMouseX = mouseX;
      previousMouseY = mouseY;
    }
  }
  
  // Start dragging when mouse is pressed
  function mousePressed() 
  {
    cameraIsRotating = true;
    previousMouseX = mouseX;
    previousMouseY = mouseY;
  }
  
  // Stop dragging when mouse is released
  function mouseReleased() 
  {
    cameraIsRotating = false;
  }
  