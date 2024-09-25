const setFullscreenBtn = document.querySelector(".set");
const exitFullscreenBtn = document.querySelector(".exit");
const fullscreenContainer = document.querySelector(".fullscreen-container");

fullscreenContainer.addEventListener("fullscreenchange", setColor);
document.fullscreenEnabled && setClickListeners();

function setClickListeners() {
    setFullscreenBtn.addEventListener("click", setFullscreen);
    exitFullscreenBtn.addEventListener("click", exitFullscreen);    
}

function setFullscreen() {
    if (fullscreenContainer.requestFullscreen) {
        fullscreenContainer.requestFullscreen().then(() => {
            // executes as soon as fullscreen set
        });
    } else {
        console.log("No fullscreen mode enabled!")
    }
}

function exitFullscreen() {
    document.exitFullscreen().then(()=>{
        // executes as soon as fullscreen unset
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function setColor() {
    exitFullscreenBtn.hasAttribute("disabled") ? exitFullscreenBtn.removeAttribute("disabled") : exitFullscreenBtn.setAttribute("disabled", "");
    fullscreenContainer.style.backgroundColor = `rgb(${getRandomArbitrary(1, 255)}, ${getRandomArbitrary(1, 255)}, ${getRandomArbitrary(1, 255)})`;
}