
//Pathos Dialogue Arrays 
let pathos1Dialgoue = []; 
let pathos2Dialgoue = []; 
let pathos3Dialgoue = []; 
let pathos4Dialgoue = []; 

//Interactables 
let pathosArray = []; // Array of Pathos in the Gallery
let backroomPathos = []; //Array of Bathos in the Backroom (Uses the same models as above)

function gallerySetUp(){
      //Start Playing Backgroumd Music and 
      artGallerySong.amp(0.3);
      artGallerySong.loop();
      artGallerySong.play();
  
  
      // Create scene objects (skybox images, object functions, and ground properties)
      scenes.push(new Scene(skybox1, mainroom, color(255), 2000, 26, 0, -87000,20000, 130000 ));
      scenes.push(new Scene(skybox2, backroom, color(200, 200, 220), 2000, 50, 1,0,0,0));
  
  
      //Filling Interactable Dialgoue Arrays
      // [0] = Loop 1, [1] = Loop 2, [2] =Loop 3, [3] = Backrooms 
      pathos1Dialgoue = [
        "Wow! I bet they have steady hands to make such detail.\nYeah, I don’t think I would’ve been able to make that.",
        "Usually they're much better with the quality of their works. They're really loosing their touch.",
        "I don’t know how this made it into the exhibition. Sculpt a few curves into a stone and call it art? Please.\nNever understood how pieces like this get any attention.",
        "That’s the pose grandpa always made when he’d see me run back home from school... it doesn’t have much detail because I never paid attention back then. When we are young sometimes things just look and seem so simple. Sorry gramps, looks like I did the opposite of honoring you."
      ];
      
      pathos2Dialgoue = [
        "This pathos doesn't seem to be installed yet...",
        "This seems kinda simple doesn't it? \nYeah, it looks kinda bland.",
        "Wanna bet that they went to a pottery class and made it there?\nHA! I’ll bet my savings on that one.",
        "Huh, I made this after I had my mini stroke, I was lucky. That slight tremor in my hands didn’t stop me from doing what I love. So yes, it took months for me to make that simple piece. But I guess you needed the whole story? The “I overcame a physical obstacle to make this...” wasn’t good enough of a description for you?"
      ];
  
      pathos3Dialgoue = [
        "This pathos doesn't seem to be installed yet...",
        "Why is this pathos still incomplete?",
        "Now this looks like it came out of a cartoon. My five-year-old can this easy!\nI bet he could! Maybe with more detail too.",
        "Luca, my childhood stuffed animal. Anytime I had a hard time I would lay in my bed and hold you tight till all the bad thoughts slowly faded away. That smile wasn’t just yours... when I hugged you it became mine…\nI wish they understood that."
      ]; 
      
      pathos4Dialgoue = [
        "I'm a Door",
        "I'm a sad Door. Please Open me :(",
        "A door?",
        "I should leave..."
      ]; 
  
      //Interctable Objects
      pathosArray.push(new Interactable( -62, -52, -224, 0, 'red', pathos1Model, 20, 1, pathos1Dialgoue));
      pathosArray.push(new Interactable( -352.5, -52, -18, 0, 'red', pathos2Model, 20,  2, pathos2Dialgoue));
      pathosArray.push(new Interactable( -408, -50, -395, 0, 'red', pathos3Model, 20, 3, pathos3Dialgoue));
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
          if(obj.activateOnLoop <= player.currentLoop || obj.activateOnLoop == 4) {
  
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
