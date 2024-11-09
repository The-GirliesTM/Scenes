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
    drawSkybox();
    cameraUpdate();

    push();
    fill(color(10,200,100))
    noStroke();
    translate(0, 26, 0);
    rotateX(HALF_PI);          // Rotate the plane to be horizontal
    plane(1100);     // Draw the ground plane with the specified size
    pop();
     
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

function drawSkybox(){
    // Draw the skybox
    push();
    noStroke();
    texture(skybox1); //make texture out of skyboxImage
    sphere(1000, 24, 16); // Using a large sphere to create the skybox effect
    pop();
}