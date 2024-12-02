class Scene {
    
    constructor(sky, groundCol, groundSize, groundY){
        this.skybox = sky;
        this.groundColor = groundCol;
        this.groundSize = groundSize;
        this.groundPosY = groundY;

        // Array to hold models with their properties
        this.models = [];

        // this.x = x_pos;
        // this.y = y_pos;
        // this.z = z_pos;

        // main room model 
        // this.x = -87000;
        // this.y = 20000;
        // this.z = 130000;


        // Position of the model
        //this.modelPosition = createVector(0, -2000, 0); // Initial position
        
    }

    // Method to add a new model to the scene
    addModel(model, x, y, z, scale = 1, rotationX = 0, rotationY = 0, rotationZ = 0, matColor = color(255,255,255)) {
        // ADD matColor = color(255,255,255) as parameter for material
        this.models.push({
            model: model,
            position: createVector(x, y, z),
            scale: scale,
            rotation: createVector(rotationX, rotationY, rotationZ),
            matColor : matColor
        });
    }

    display(){
        this.drawSkybox();
        this.drawGround();
        this.drawModel();

    }

    drawSkybox(){
        // Draw the skybox
        push();
        noStroke();
        texture(this.skybox); //make texture out of skyboxImage
        sphere(2000, 24, 16); // Using a large sphere to create the skybox effect
        pop();
    }

    drawGround(){
        //Draw the grounf of the scene
        push();
        fill(this.groundColor);
        noStroke();
        translate(0, this.groundPosY, 0);
        rotateX(HALF_PI); // Rotate the plane to be horizontal
        plane(this.groundSize); // Draw the ground plane with the specified size
        pop();

    }

    drawModel(){
        // Draw each model in the scene
        this.models.forEach((m) => {
            push();
            scale(m.scale);
            rotateX(m.rotation.x);
            rotateY(m.rotation.y);
            rotateZ(m.rotation.z);
            translate(m.position.x, m.position.y, m.position.z);
            ambientMaterial(m.matColor);
            model(m.model); // Render the 3D model
            pop();
        });
        // push();
        // scale(.006);
        // rotateX(-PI);
        // rotateY(PI);
        // translate(this.x, this.y, this.z); // Use model position
        // //translate(this.modelPosition)
        // ambientMaterial(255,255,255)
        // model(this.model); // Render the 3D model
        // pop();

    }

    // Method to move the model based on inputs
    moveModel(dx, dy, dz) {
        this.modelPosition.add(createVector(dx, dy, dz));
    }

    // Get position as a formatted string
    getModelPositionString() {
        
        return `Model Position: x=${this.modelPosition.x.toFixed(2)}, y=${this.modelPosition.y.toFixed(2)}, z=${this.modelPosition.z.toFixed(2)}`;
    }

    // drawGrid(){
    //     // Draw a simple 3D grid environment
    //     for (let i = -500; i <= 500; i += 200) {
    //         for (let j = -500; j <= 500; j += 200) {
    //             push();
    //             translate(i, 0, j); // move position

    //             // Note: this can probably be refactor once we know what we want in the scenes
    //             if(this.type == 0){
    //                 box(50);
    //             }
    //             else if(this.type == 1){
    //                 sphere(50);
    //             }
    //             else{
    //                 console.log("Scene type not defined");
    //             }

    //             pop();
    //         }
    //     }
    // }
}
    