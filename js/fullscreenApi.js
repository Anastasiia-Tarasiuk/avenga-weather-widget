const setFullscreenBtn = document.querySelector(".set");
const exitFullscreenBtn = document.querySelector(".exit");
const fullscreenContainer = document.querySelector(".fullscreen-container");

setFullscreenBtn.addEventListener("click", setFullscreen);
exitFullscreenBtn.addEventListener("click", exitFullscreen);

function setFullscreen() {
    fullscreenContainer.requestFullscreen().then(() => {
        fullscreenContainer.style.backgroundColor="red";
        exitFullscreenBtn.removeAttribute("disabled");
    });
}

function exitFullscreen() {
    document.exitFullscreen().then(()=>{
        fullscreenContainer.style.backgroundColor="green";
        exitFullscreenBtn.setAttribute("disabled", "");
    });
}