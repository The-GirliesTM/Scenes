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
        //Maybe some sort of Black Screen?

        //Return Camera to 0/0/0
        resetCamera();

        //Reset anything else that's changed. (Color Changes. Etc)
    }

    //Updates player variables, resets player, and increases the loop count.
    newLoop(){
        if(this.currentLoop < this.maxLoops) {
            this.currentLoop++;
            this.resetPlayer();
            print("Loop Completed! Going to Loop: " + player.currentLoop);
        } else {
            print("Error! Too many loops: " + this.currentLoop);
        }
    }

}