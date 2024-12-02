class Interactable {
    constructor(x, y, z, rotation, color, model, activeRadius, activateOnLoop , dialogueArray) {
        this.x = x; // Position
        this.y = y;
        this.z = z;
        
        this.color = color; // Color
        this.model = model; // 3D Model
        
        this.activateOnLoop = activateOnLoop;           //Tracks what loop intertacble activates on
        this.activeColor = "#44A2C1";
        this.inactiveColor = this.color;
        this.dialogueArray = dialogueArray;             //Stores dialgloue options for each loop

        this.isInteracting = false;                     // Interaction state
        this.isSeen = false;                            // If the object is being looked at
        this.interactionDistance = 150;                 // Maximum distance to interact
        this.interactionAngleThreshold = radians(activeRadius);   // Angle threshold for interaction
        this.hasInteracted = false;                     // Tracks if this object has been interacted with

        this.rotationY = rotation;                      // Y-axis rotation for interaction
        this.originalRotationY = this.rotationY;        //Stores original rotation data for resets

        // Position of the model
        this.modelPosition = createVector(this.x, this.y, this.z); // Initial position
    }  
    
    //Draw the object in the scene
    draw(cam) {
        push();
        
        if (this.isInteracting && this.activateOnLoop != 4) {
            // Update to the object's rotation dyanmically during interaction
            translate(this.x, this.y, this.z);      //Places Object
            rotateY(this.rotationY);                // Apply rotation

        } else {
            // Normal rendering - Return to Original Position
            translate(this.x, this.y, this.z);      //Places Object
            rotateY(this.originalRotationY);        //Default Rotation
        }

        //Object Specific Shadiwng and Material Properties
        pointLight(120, 120, 120, movedX - width / 2, movedY - height / 2, 200); // Point light at mouse position
        specularMaterial(255);       // Specular (shiny) material for highlights
        shininess(30);               // Shiny appearance

        //Color: This is the original Color Variable! 
        fill(this.color);
        rotateX(PI); //Flips model upright because everything is upside down.
        //translate(this.x, this);
        //translate(this.modelPosition);
        model(this.model); // Render the 3D model
        pop();
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

    //Hanldes Object Response to Interactions (Excluding Rotations)
    interact(loopNumber) {
        this.hasInteracted = true;

        switch (loopNumber) {
            case 1: //Response when in Loop 1 
                this.loadDialogue(this.dialogueArray[0]);
                this.showDialogue();
               //print(this.dialogueArray[0]);
                
                break;
            case 2: //Response when in Loop 2
                this.loadDialogue(this.dialogueArray[1]);
                this.showDialogue();
               //print(this.dialogueArray[1]);

                break;

            case 3: //Response when in Loop 3
            
                this.loadDialogue(this.dialogueArray[2]);
                this.showDialogue();
                //print(this.dialogueArray[2]);

                break;
            case 4: //Response when in Loop 3
            
                if (this.activateOnLoop == 4) {
                    this.loadDialogue(this.dialogueArray[2]);
                    this.showDialogue();

                } else { 
                    this.loadDialogue("*Silence*");
                    this.showDialogue();
                    //print(this.dialogueArray[2]);
                }   

                break;

            default:
              print("There's been an error! Inputted Loop: " + loopNumber); 
              break;
          }       
    }

    //Rotates object based on key presses.
    rotateObject() {
        // Rotation logic for arrow keys (Z-axis rotation only)
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // A key for left
            this.rotationY -= radians(1); // Rotate counterclockwise
        }
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // D key for rightaw
            this.rotationY += radians(1); // Rotate clockwise
        } 
    }

    //Resets Object to starting State. Currently just resets rotation.
    resetObject() {
        this.rotationY = this.originalRotationY;
        
    }

    //Resets Tracking for if Object has been interacted with this loop
    resetInteraction(){
        print("Resetting Interactions!")
        this.hasInteracted = false;
    }

    //Loads Object's Dialogue 
    loadDialogue(d) {
        let dialog = $("#dialog").text();
        $("#dialog").text(d);
      }
    
    //Displays Object's Dialogue 
    showDialogue() {
        let dialog = $("#dialog").addClass("show-dialogue");
        dBoxOpen = true;
      }
      

    //Visually Activates the object. 
    activate(testSound){
        this.color = this.activeColor;
        this.isSeen = true;

        if (!testSound.isPlaying() && !player.isInBackroom) {
            testSound.loop()
            testSound.play()
        }
    }

    //Visually Deactivaites the Object
    deactivate(){
        if (this.isSeen) {
            this.color = this.inactiveColor;
            this.isSeen = false;
            murmurSound.stop();
        }
    }


    // ----- SOLELY FOR POSITIONING
    // Method to move the model based on inputs
    moveModel(dx, dy, dz) {
        this.modelPosition.add(createVector(dx, dy, dz));
    }

    // Get position as a formatted string
    getModelPositionString() {
        
        return `Model Position: x=${this.modelPosition.x.toFixed(2)}, y=${this.modelPosition.y.toFixed(2)}, z=${this.modelPosition.z.toFixed(2)}`;
    }
}