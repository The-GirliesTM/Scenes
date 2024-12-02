
//Pathos Dialogue Arrays 
let pathos1Dialgoue = []; 
let pathos2Dialgoue = []; 
let pathos3Dialgoue = []; 
let pathos4Dialgoue = []; 

//Interactables 
let pathosArray = []; // Array of Pathos in the Gallery;

function gallerySetUp(){
      //Start Playing Backgroumd Music and 
      artGallerySong.amp(0.3);
      artGallerySong.loop();
      artGallerySong.play();
  
      //Filling Interactable Dialgoue Arrays
      // [0] = Loop 1, [1] = Loop 2, [2] =Loop 3, [3] = Backrooms 
      pathos1Dialgoue = [
        "Wow! I bet they have steady hands to make such detail.\n\nYeah, I don’t think I would’ve been able to make that.",
        "Usually they're much better with the quality of their works.\n\n They're really loosing their touch.",
        "I don’t know how this made it into the exhibition. Sculpt a few curves into a stone and call it art? Please.\n\nNever understood how pieces like this get any attention.",
      ];
      
      pathos2Dialgoue = [
        "This pathos doesn't seem to be installed yet...",
        "This seems kinda simple doesn't it? \n\nYeah, it looks kinda bland.",
        "Wanna bet that they went to a pottery class and made it there?\n\nHA! I’ll bet my savings on that one.",
      ];
  
      pathos3Dialgoue = [
        "This pathos doesn't seem to be installed yet...",
        "Why is this pathos still incomplete?",
        "Now this looks like it came out of a cartoon.\n\n My five-year-old can this easy!\n\nI bet he could! Maybe with more detail too.",
       ]; 
      
      pathos4Dialgoue = [
        "I'm a Door",
        "I'm a sad Door. Please Open me :(",
        "A door?"
      ]; 

      welcomeDialogue = [
        "Hello everyone! This is my first art gallery. Thank you to the love and support of all my friends for helping me get these Pathos put together! :)",
        "Hi! Welcome to my gallery. Please take your time looking around the Scene.",
        "It's been a while... sorry for the delay in updating my gallery recently."
      ];
  
      //Interctable Objects
      pathosArray.push(new Interactable( 512.5, -50, -366.5, 0, 'red', pathos1Model, 20, 1, pathos1Dialgoue));
      pathosArray.push(new Interactable( -31.5, -47, -74, 0, 'red', pathos2Model, 20,  2, pathos2Dialgoue));
      pathosArray.push(new Interactable( -517, -49, -810, 0, 'red', pathos3Model, 20, 3, pathos3Dialgoue));
      pathosArray.push(new Interactable(-508, 10 ,-50 , 0,'red', doorModel, 70, 4, pathos4Dialgoue));
  }
  
  function drawGallery() {
    //Array that draws the pathos.
    //This was originally in the loop below but there were issues with break; that made me move it
    for (let obj of pathosArray) {
        if (obj.activateOnLoop == 4) { //If we're looking at the door 
          if (doorTime) { //Influenced by door variable (Door is only drawn if it's door time)
            obj.draw(cam); 
          } 
        } else { //Literally everything else. Draw it.
          obj.draw(cam);
        }
      }
  

      //Checking if Player is Looking at a Pathos
      for (let obj of pathosArray) {
        if(obj.checkIfLookingAt(cam)) {
  
          //Checks to see if Pathos is Intertable
          if(obj.activateOnLoop <= player.currentLoop) {
  
            // print("Loop Match: Currently Interactable");  
            obj.activate(murmurSound); //Viusually activates Object when looking at it
  
          //Determines Behaviors when player is or isnt interacting.
            if (!isInteracting) {
              showHint();
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
