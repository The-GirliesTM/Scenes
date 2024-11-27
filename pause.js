let pauseDiv, exit, resume;
let paused = false;
function pause() {
    resume = $("#resume");
    exit = $("#exit");
    // pauseDiv = $("#pause-menu")
    // .addClass("show-pause")
    // overlay = $("#overlay").addClass("overlay")

    //if paused is truee then
    //turn off camera movement
    //do we save progress?
    //check if we can save progress on the items
    //restart?

    resume.on('click', function() {
        console.log('resume')
        pauseDiv.removeClass("show-pause")
        overlay = $("#overlay").removeClass("overlay")
        paused = false;
    })
}