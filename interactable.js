class Interactable {
    constructor(x, y, z, color, model, texture, activateOnLoop , dialogueArray) {
        this.x = x; // Position
        this.y = y;
        this.z = z;
        this.color = color; // Color
        this.model = model; // 3D Model
        this.texture = texture;
        
        this.activateOnLoop = activateOnLoop; //Tracks what loop intertacble activates on
        this.activeColor = "green";
        this.inactiveColor = this.color;
        this.dialogueArray = dialogueArray; //Stores dialgloue options for each loop

        this.isInteracting = false; // Interaction state
        this.isSeen = false; // If the object is being looked at
        this.rotationY = 0; // Y-axis rotation for interaction
        this.interactionDistance = 150; // Maximum distance to interact
        this.interactionAngleThreshold = radians(20); // Angle threshold for interaction

        this.textArray; //TODO: Make this import and array of text that changes based on loop.
    }   

    //Checks to see if the Camera is looking at this object
    checkIfLookingAt(cam) {
        // Vector from camera to the object
        let toObjectX = this.x - cam.eyeX;
        let toObjectY = this.y - cam.eyeY;
        let toObjectZ = this.z - cam.eyeZ;
        // Normalize the vector
        let magnitude = dist(0, 0, 0, toObjectX, toObjectY, toObjectZ);
        toObjectX /= magnitude;
        toObjectY /= magnitude;
        toObjectZ /= magnitude;

        // Camera's forward vector
        let forwardX = cam.centerX - cam.eyeX;
        let forwardY = cam.centerY - cam.eyeY;
        let forwardZ = cam.centerZ - cam.eyeZ;
        // Normalize the vector
        magnitude = dist(0, 0, 0, forwardX, forwardY, forwardZ);
        forwardX /= magnitude;
        forwardY /= magnitude;
        forwardZ /= magnitude;

        // Dot product to calculate the angle between the vectors
        let dotProduct = toObjectX * forwardX + toObjectY * forwardY + toObjectZ * forwardZ;
        let angle = acos(dotProduct); // Result is in radians

        // Check if the object is within the angle threshold and interaction distance
        let distance = dist(cam.eyeX, cam.eyeY, cam.eyeZ, this.x, this.y, this.z);
        return angle < this.interactionAngleThreshold && distance < this.interactionDistance;
    }

    //TODO: Function for Interactions
    interact(cam, loopNumber) {
        switch (loopNumber) {
            case 1: //Response when in Loop 1 
                print(this.dialogueArray[0]);
                break;
            case 2: //Response when in Loop 2
                print(this.dialogueArray[1]);
                break;

            case 3: //Response when in Loop 3
                print(this.dialogueArray[2]);
                break;

            default:
              print("There's been an error! Inputted Loop: " + loopNumber); 
              break;
          }

        //TODO: Add Ability to Rotate Object (May be a future task)
    }

    //Visually Activates the object. 
    activate(){
        this.color = this.activeColor;
        this.isSeen = true;
    }

    //Visually Deactivaites the Object
    deactivate(){
        this.color = this.inactiveColor;
        this.isSeen = false;
    }


    //Draw the object in the scene
    draw(cam) {
        push();
        
        if (this.isInteracting) {
            // Translate to the object's position during interaction
            print("drawn interacting!");
            translate(this.x, this.y, this.z);
            rotateY(this.rotationY); // Apply rotation

        } else {
            // Normal rendering
            translate(this.x, this.y, this.z);
        }

        //Object Specific Shading
        pointLight(255, 255, 255, movedX - width / 2, movedY - height / 2, 200); // Point light at mouse position
        ambientLight(100);           // Low ambient light (dim)
        specularMaterial(255);       // Specular (shiny) material for highlights
        shininess(50);               // Shiny appearance

        //Color: This is the original Color Variable! 
        fill(this.color);

        //Texture: Applies Texture  (Bug: Object doesn't change color when you look at it once textures are applied)
        //texture(this.texture); 

        //Default Setup of Model
        rotateX(PI); //Flips model upright because everything is upside down.
        model(this.model); // Render the 3D model
        pop();
    }
}