class Interactable {
    constructor(x, y, z, color, model) {
        this.x = x; // Position
        this.y = y;
        this.z = z;
        this.color = color; // Color
        this.model = model; // 3D Model
        
        this.activeColor = "green";
        this.inactiveColor = this.color;

        print("Constructed Interactable!");

        this.isInteracting = false; // Interaction state
        this.isSeen = false; // If the object is being looked at
        this.rotationY = 0; // Y-axis rotation for interaction
        this.interactionDistance = 150; // Maximum distance to interact
        this.interactionAngleThreshold = radians(20); // Angle threshold for interaction
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
    interact(cam) {
        //TBD
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


    //Draw the object int he scenes
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

        fill(this.color);
        rotateX(PI); // TODO: Flips the model upright (Because the whole world is upside down for some reason)
        model(this.model); // Render the 3D model
        pop();
    }
}