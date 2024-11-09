let skybox1, skybox2;

let scenes = [];
let currentSceneIndex = 0;
let scene1;

function preload(){
    //load skybox image --> will be used later as a texture
    skybox1 = loadImage('assets/sky-citiscape.png')
    skybox2 = loadImage('assets/desert.jpg')
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL)
    let myColor = color(120, 180, 120);
    //scene1 = new Scene(skybox1, myColor, 2000, 2)

    // Create scene objects with skybox images, object functions, and ground properties
    scenes.push(new Scene(skybox1, color(120, 180, 120), 2000, 26, 0));
    scenes.push(new Scene(skybox2, color(200, 200, 220), 2000, 50, 1));
}

function draw()
{
    //background(0)
    
    //check position of camera and update it
    cameraUpdate();

    scenes[1].display();
    
}
