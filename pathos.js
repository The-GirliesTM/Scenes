class Pathos {
    constructor(model, ox, oy, oz) {
        this.model = model;
        this.ox = ox;
        this.oy = oy;
        this.oz = oz;
        this.x = ox;
        this.y = oy;
        this.z = oz;
        this.color = "blue"
        this.ambientLight = 80;
        this.inspecting = false;
        this.radius;
    }
    update() {
        if (this.inspecting) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            let angleX = mouseX/width*PI*2;
            rotate(angleX, [0, 1, 0])
            let angleY = mouseY/height*PI*2;
            rotate(angleY, [1, 0, 0])
        } else {
            this.x = this.ox;
            this.y = this.oy;
            this.z = this.oz;
        }
    }
    display() {
        push();
        translate(this.x, this.y, this.z);
        fill(this.color);
        model(this.model);
        pop()
    }


}