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
        this.isInBackroom = false;
    }

    //Resets the player
    resetPlayer() {

        //Return Camera to 0/0/0
        resetCamera();
        isInteracting = false;

        //Reset Objects
        for (let obj of pathosArray) {
            obj.resetInteraction();
        }

    }

    //Updates player variables, resets player, and increases the loop count.
    newLoop(){
        if(this.currentLoop < this.maxLoops) {

            //Adds a Black Screen Transition when player goes into new loop
            let overlay = $("#overlay").addClass("overlay-transition");

            setTimeout(() => {
                overlay = $("#overlay").removeClass("overlay-transition");
                 
                this.resetPlayer(); //Reset the player during transition
                this.currentLoop++; //Inside this timeout to keep player from interacting until after loop is finished
                print("Loop Completed! Going to Loop: " + player.currentLoop);
                loadWelcome(welcomeDialogue[this.currentLoop - 1]);
                welcomeBox = true;
                showWelcome();
            }, 2000);

        } else if (this.currentLoop == 4){
            print("Final Loop: Please Proceed to the Backroom.");
            //TODO: Make backroom door appear. Player can use this to move to the backroom
            
        } else {
            print("Error! Too many loops: " + this.currentLoop);
        }
    }

    //Function that moves player to the backroom
    moveToBackroom() {
        print("Moving to backroom");
        //Adds a Black Screen Transition when player goes into new loop
        let overlay = $("#overlay").addClass("overlay-transition");

        setTimeout(() => {
            
            currentSceneIndex = 1; //Setting Scene array to Backroom Scene
            backRoomCamera();
            overlay = $("#overlay").removeClass("overlay-transition");
            
        }, 2000);

       
        //Reset Sound Variables 
        doorSound.stop();
        murmurSound.stop();
        artGallerySong.stop();

        //start backroom music
        backroomSong.amp(0.3);
        backroomSong.play();

        //Make sure player is in backroom state 
        this.currentLoop = 4;
        this.isInBackroom = true;


       

    }

}