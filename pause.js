let pauseDiv, exit, resume;
let paused = false;
function pause() {
    resume = $("#resume");
    exit = $("#exit");
    pauseDiv = $("#pause-menu");
    pauseDiv.classList.add("show-pause");

    //if paused is truee then
    //turn off camera movement
    //do we save progress?
    //check if we can save progress on the items
    //restart?

    resume.on('click', function() {
        console.log('resume')
        pauseDiv.classList.remove("show-pause")
        paused = false;
    })
}