class Pathos {
    constructor(model, name, ox, oy, oz) {
        //Default Variables 
        this.model = model;
        this.name = name;
        this.originalPosition = [ox, oy, oz];
        this.x = ox;
        this.y = oy;
        this.z = oz;

        //Apperance 
        this.color = "blue"
        this.ambientLight = 80;
        this.inspecting = false;

        //Size / Rotation 
        this.radius = 30;
        this.rotation = [0, 0];
    }

    update() {
        if (this.inspecting) { //If the player is inspecting this object. 
            this.x = lookX;
            this.y = lookY;
            this.z = lookZ;

            //Updates Object X-Axis Rotation based on Mouse Position
            interactableRotationKeys +=movedX* 0.2;
            let angleX = interactableRotationKeys/width*PI*2;
            this.rotation[0] = angleX

            //Updates Object Y-Axis Rotation based on Key Inputs 
            if (keyIsDown(87) || keyIsDown(UP_ARROW)) { 
                interctableRotation ++;
              }
              if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
                interctableRotation--;
              }
            let angleY = interctableRotation/height*PI*2;
            this.rotation[1] = angleY;

        } else { //Returns object to original position and rotation when not being rotated 
            this.x = this.originalPosition[0];
            this.y = this.originalPosition[1];
            this.z = this.originalPosition[2];
            this.rotation = [0, 0];
            interactableRotationKeys = 0
            interctableRotation = 0
        }
    }

    display() {
        push();
        scale(0.2)

        
        if (this.inspecting) {  //If the player is inspecting this object. 
            
            //Move to Camera Position
            translate(cam.eyeX, cam.eyeY, cam.eyeZ)

            //Calculate Camera Pan/Tilt
            let pan = atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX)
            let tilt = atan2(cam.eyeY - cam.centerY, dist(cam.centerX, cam.centerZ, cam.eyeX, cam.eyeZ))
            
            rotateY(-pan)
            rotateZ(tilt + PI)
            translate(100, this.y, cam.eyeZ)

            rotateY(-PI/2);
            rotateZ(PI);
        } else {
            translate(this.x, this.y, this.z);
        }

        //Drawing the Object 
        push()
        rotate(this.rotation[0], [0, 1, 0])
        rotate(this.rotation[1], [1, 0, 0])
        fill(this.color);
        model(this.model);
        pop()
        pop()
    }

    isLookedAt(ray_start, ray_dir) {
        //if vector collides then true
        //else false
        this.inspecting = true;
        let pos = createVector(this.x, this.y, this.z)
        s = sub(ray_start, pos);
        b = s.dot(ray_dir);
        c = s.dot(s) - this.radius*this.radius;
        h = b * b - c
        if (h < 0) { //no intersection
            console.log("not me");
        } else {
            console.log("hi i'm " + this.name);
        }
        h = Math.sqrt(h);
        t = -b-h;
    }

}