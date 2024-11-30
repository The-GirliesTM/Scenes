/* Thais TODO's

    Player Manager
        - Traks loop player is in
    Scene Manager
        - Tracks which objects have been interacted with
    Collisions 
        - Allows player to move only in certain places (I think this is with camera)
 */

class Player{
    constructor(loop){
        this.currentLoop = loop
        this.maxLoops = 3
    }

    //Resets the player
    resetPlayer() {

        //Return Camera to 0/0/0
        resetCamera();

        //Reset Objects
        for (let obj of pathosArray) {
            obj.resetInteraction();
        }
    }

    //Updates player variables, resets player, and increases the loop count.
    newLoop(){
        if(this.currentLoop < this.maxLoops) {
            print("Loop Completed! Going to Loop: " + player.currentLoop);
            this.currentLoop++;

            //TODO: Add a black screen/transition screen before resetPlayer();
            overlay = $("#overlay").addClass("overlay-transition");

            setTimeout(() => {
                overlay = $("#overlay").removeClass("overlay-transition");
                print("transition")
                // this.resetPlayer();
              }, 3000);

            this.resetPlayer();
        } else if (this.currentLoop == 3){
            print("Completed Final Loop! Please Proceed to the Backroom!.");
            //TODO: Make backroom door appear. Player can use this to move to the backroom
            
        } else {
            print("Error! Too many loops: " + this.currentLoop);
        }
    }

}