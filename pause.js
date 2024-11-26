let pauseDiv, exit, resume;
let paused = false;
function pause() {
    resume = $("#resume");
    exit = $("#exit");
    pauseDiv = $("#pause-menu");
    pauseDiv.classList.add("show-pause");

    resume.on('click', function() {
        console.log('resume')
        pauseDiv.classList.remove("show-pause")
        paused = false;
    })
}