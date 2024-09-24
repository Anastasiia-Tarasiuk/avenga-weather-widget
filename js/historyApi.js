document.querySelector(".London").addEventListener("click", ()=> openCity('London'));
document.querySelector(".Paris").addEventListener("click", ()=> openCity('Paris'));
document.querySelector(".Tokyo").addEventListener("click", ()=> openCity('Tokyo'));

const backButtonEl = document.querySelector(".back");
const forwardButtonEl = document.querySelector(".forward");
history.replaceState({ city_name: 'London' }, "", `${document.location.href}`);

onpopstate = () => {
    if (history.state?.city_name) {
        showTab(history.state.city_name);
    }
};

// Get the element with id="defaultOpen" and click on it
function openCity(cityName) {
    showTab(cityName)
    const state = { city_name: cityName };
    history.pushState(state, "", `./selected=${cityName}`);
}

backButtonEl.addEventListener("click", ()=>{
    history.back();
});

forwardButtonEl.addEventListener("click", ()=>{
    history.forward();
});

function showTab(cityName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.querySelector(`#${cityName}`).style.display = "block";
    document.querySelector(`.${cityName}`).classList.add("active");
}