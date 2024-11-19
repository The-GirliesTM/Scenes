class Pathos {
    constructor(model, name, ox, oy, oz) {
        this.model = model;
        this.name = name;
        this.op = [ox, oy, oz];
        this.x = ox;
        this.y = oy;
        this.z = oz;
        this.color = "blue"
        this.ambientLight = 80;
        this.inspecting = false;
        this.radius = 30;
        this.rotation = [0, 0];
    }
    update() {
        if (this.inspecting) {
            this.x = lookX;
            this.y = lookY;
            this.z = lookZ;
            nx +=movedX* 0.2;
            let angleX = nx/width*PI*2;
            this.rotation[0] = angleX

            if (keyIsDown(87) || keyIsDown(UP_ARROW)) { 
                ny ++;
              }
              if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
                ny--;
              }
            let angleY = ny/height*PI*2;
            this.rotation[1] = angleY;
        } else {
            this.x = this.op[0];
            this.y = this.op[1];
            this.z = this.op[2];
            this.rotation = [0, 0];
            nx = 0
            ny = 0
        }
    }
    display() {
        push();
        scale(0.2)
        if (this.inspecting) {
            translate(cam.eyeX, cam.eyeY, cam.eyeZ)
            let pan = atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX)
            let tilt = atan2(cam.eyeY - cam.centerY, dist(cam.centerX, cam.centerZ, cam.eyeX, cam.eyeZ))
            rotateY(-pan)
            rotateZ(tilt + PI)
            translate(400, 0, 0)
            rotateY(-PI/2);
            rotateZ(PI);
        } else {
            translate(this.x, this.y, this.z);
        }
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