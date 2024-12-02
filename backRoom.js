
//Pathos Dialogue Arrays 
let backPathos1_Dialgoue = []; 
let backPathos2_Dialgoue = []; 
let backPathos3_Dialgoue = []; 
let backDoor_Dialgoue = []; 

//Interactables 
 //Array of Bathos in the Backroom 
let baathosArray = [];

function startBackroom() {
  //TODO: Start Playing Backgroumd Music for Backroom
  // backroomSong.amp(0.3);
  // backroomSong.loop();
  // backroomSong.play();
}

function backroomSetup(){
      //Filling Interactable Dialgoue Arrays
      backPathos1_Dialgoue = ["That’s the pose grandpa always made when he’d see me run back home from school... it doesn’t have much detail because I never paid attention back then. When we are young sometimes things just look and seem so simple. Sorry gramps, looks like I did the opposite of honoring you."]; 
      
      backPathos2_Dialgoue = ["Huh, I made this after I had my mini stroke, I was lucky. That slight tremor in my hands didn’t stop me from doing what I love. So yes, it took months for me to make that simple piece. But I guess you needed the whole story? The “I overcame a physical obstacle to make this...” wasn’t good enough of a description for you?"]; 
  
      backPathos3_Dialgoue = ["Luca, my childhood stuffed animal. Anytime I had a hard time I would lay in my bed and hold you tight till all the bad thoughts slowly faded away. That smile wasn’t just yours... when I hugged you it became mine…\nI wish they understood that."]; 
      
      backDoor_Dialgoue = ["I should leave..."]; 
  
      //Interctable Objects
      baathosArray.push(new Interactable( 121, -58, 3, PI, 'blue', pathos1Model, 20, 4, backPathos1_Dialgoue));
      baathosArray.push(new Interactable( 0,   -57, 120, 0, 'blue', pathos2Model, 20,  4, backPathos2_Dialgoue));
      baathosArray.push(new Interactable(-118, -58, 4, PI, 'blue', pathos3Model, 20, 4, backPathos3_Dialgoue));
      baathosArray.push(new Interactable(  0,  0, -389, 0,'blue', doorModel, 70, 5, backDoor_Dialgoue));
  }
  
  function drawBackroom() {
    //Array that draws the pathos.
    //This was originally in the loop below but there were issues with break; that made me move it
    for (let obj of baathosArray) {
          obj.draw(cam);
      }
  

      //Checking if Player is Looking at a Pathos
      for (let obj of baathosArray) {
        if(obj.checkIfLookingAt(cam)) {
  
          //Checks to see if Pathos is Intertable
          if(obj.activateOnLoop >= player.currentLoop) {
  
            // print("Loop Match: Currently Interactable");  
            obj.activate(murmurSound); //Viusually activates Object when looking at it
  
          //Determines Behaviors when player is or isnt interacting.
            if (!isInteracting) {
              showHint();;
              obj.resetObject(); //Rests Object when not interacting
            } else {
              obj.rotateObject(); //Allows player to rotate object when interacting
            }
          } else {
            //Objects don't activate unless the player matches or exceeds its activate loop.
            //This causes them to not work in certain loops
            obj.deactivate();
          }
  
          isLooking = true;
          break; //This break needs to be here so the "E to Interact" hint fades when you're not looking
  
        } else {  
          obj.deactivate();
          isLooking = false;
          
        }
      }
  
      //Hides Hint if Player isn't looking at Active Pathos
      if(!isLooking) {
        hideHint();
        hideDialogue(); //Hides Dialgoue when player isn't looking (Mostly for none-active objects.)
      }

  }
