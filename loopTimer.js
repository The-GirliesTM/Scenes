let timerStarted = false;       // Flag to check if the timer has started
let timerDuration = 8000;      // Duration of the timer in milliseconds (1000 = 1 Second)
let timerStartTime = 0;         // To store the time when the timer started
let startCallCount = 0;
let lastUnpaused = 0;
let timerPauseTime = 0;
//When called checks to see if the right pathos have been interacted with for the loop to be completed
function checkIfLoopPossible() {
    switch (player.currentLoop) {
      case 1: //Response when in Loop 1 
        if(pathosArray[0].hasInteracted) {
          return true;
        }
  
        break;
      case 2: //Response when in Loop 2 
        if(pathosArray[0].hasInteracted && pathosArray[1].hasInteracted) {
          return true;
        }
  
        break;
      case 3: //Response when in Loop 3 
        if(pathosArray[0].hasInteracted && pathosArray[1].hasInteracted && pathosArray[2].hasInteracted ) {
          
          return true;
        }
        break;
    }
  }

//Starts timer when called
function startTimer() {
    // Only start the timer if the conditions for the loop are met & it's the first time
    if (startCallCount == 0) {
        print("Timer Started");
        //TODO: Add Sound when Timer Starts

        

        timerStarted = true;
        timerStartTime = millis(); // Get the current time in milliseconds
        startCallCount++;
        if(murmur.isPlaying()) {
          murmur.stop();
          song.amp(0.3)
        }
        if (player.currentLoop == 3) {
          song.stop();
          song.rate(0.2);  
          song.play();
        }
    } else {
        print("Timer Has already started.");
    }
}

//Updates Timer. Only starts counting if the timer has been started 
function updateTimer() {
  let elapsedTime;
    if (timerStarted) {
      if (!paused) {
        elapsedTime = millis() - timerStartTime;
        lastUnpaused = millis();
      } else {
        timerPauseTime = millis() - lastUnpaused;
      }
        // elapsedTime = millis() - timerStartTime; // Calculate elapsed time

        if (elapsedTime >= timerDuration) {
            // Timer has finished, call the newLoop() function
            player.newLoop();
            resetTimer(); // Reset timer for next loop
        }
    }
    print(elapsedTime);
}

//Resets timer to original state.
function resetTimer() {
    timerStarted = false;
    startCallCount = 0;
}

//TODO: Add ability to pause timer when the game is paused.
function pauseTimer() {
  lastUnpaused = millis();
}