const template = document.querySelector("#root-template").shadowRoot;

let key = "ad3e4f050c831243787b3b3283c70545";
let language = "uk";

getGeolocation(); 

function getGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos)=>success(pos), (pos)=>error(pos));
        
        console.log("geolocation is available");
    } else {
        console.log("geolocation IS NOT available");
    }
}

function success(pos) { 
    const crd = pos.coords; 
    const lat = crd.latitude.toString(); 
    const lon = crd.longitude.toString(); 
    getWeather(lat, lon);
} 
  
function error(err) { 
    console.warn(`ERROR(${err.code}): ${err.message}`); 
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${language}&units=metric`)
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then((response) => {
        fillFragment(response);
    });
}

function fillFragment(res) {
    console.log(res)
    console.log(template)
    const children = [...template.children];
    children.forEach(child =>{
        switch (child.textContent) {
            case "City":
                child.textContent = res.name.toUpperCase();
                const icon = document.createElement("img");
                icon.src = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
                icon.alt = res.weather[0].main;
                icon.classList.add("icon");
                child.insertAdjacentElement("afterend", icon);
                break;
            case "Icon":
                child.textContent = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
                break;
            case "Weather":
                child.textContent = res.weather[0].description;
                break;
            case "Temperature":
                child.textContent = Math.round(res.main.temp) + "°C";
                break;
            default:
                break;
        }
    })
}

