let pauseDiv, exit, resume;
let paused = false;
function pause() {
    resume = $("#resume");
    exit = $("#exit");

    resume.on('click', function() {
        console.log('resume')
        pauseDiv.removeClass("show-pause")
        overlay = $("#overlay").removeClass("overlay")
        paused = false;
        timerStartTime += timerPauseTime;
        timerPauseTime = 0;
    })
}