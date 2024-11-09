let x = 0;
let y = -50;
let z = 0;
let angleX = 0;
let angleY = 0;

let cameraIsRotating = false;
let previousMouseX, previousMouseY;

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw()
{
    //background(255)

    // Draw the skybox
    push();
    noStroke();
    texture(skybox1); //make texture out of skyboxImage
    sphere(1000, 24, 16); // Using a large sphere to create the skybox effect
    pop();

     // Update camera position based on angle
     let camX = x + cos(angleY) * cos(angleX) * 200;
     let camZ = z + sin(angleY) * cos(angleX) * 200;
     let camY = y + sin(angleX) * 200;
     
     // Set the camera with updated angles and position
     camera(camX, camY, camZ, x, y, z, 0, 1, 0);
     
     // Draw a simple 3D grid environment
     for (let i = -500; i <= 500; i += 200) {
        for (let j = -500; j <= 500; j += 200) {
            push();
            translate(i, 0, j);
            box(50);
            pop();
    }
  }

  // move the camera along the x-z position
  cameraMove();
  // rotate camera
  cameraRotate();
}