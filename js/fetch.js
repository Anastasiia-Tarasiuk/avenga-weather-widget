export function getGeolocation(fetchSettings) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos)=>success(pos, fetchSettings), (pos)=>error(pos));
        
        console.log("geolocation is available");
    } else {
        console.log("geolocation IS NOT available");
    }
}

function success(pos, fetchSettings) { 
    const crd = pos.coords; 
    const lat = crd.latitude.toString(); 
    const lon = crd.longitude.toString(); 
    getWeather(lat, lon, fetchSettings);
} 
  
function error(err) { 
    console.warn(`ERROR(${err.code}): ${err.message}`); 
}

function getWeather(lat, lon, fetchSettings) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${fetchSettings.key}&lang=${fetchSettings.language}&units=metric`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then((response) => {

        switch (fetchSettings.type) {
            case "template":
                fillFragment(response, fetchSettings.root)
                break;
            case "custom":
                fillSlots(response, fetchSettings.root)
                break;
            case "class":
                createWidget(response, fetchSettings.root)
                break;
            default:
                break;
        }
    });
}

function fillSlots(res, _this) {
    const weatherInfo = res.weather[0];
    const citySlot = _this.querySelector('#city');
    const weatherSlot = _this.querySelector('#weather');
    const temperatureSlot = _this.querySelector('#temperature');
    const iconSlot = _this.querySelector('#icon');

    citySlot.innerHTML = `<p>${res.name.toUpperCase()}</p>`;
    weatherSlot.innerHTML = `<p>${weatherInfo.description}</p>`;
    temperatureSlot.innerHTML = `<p>${Math.round(res.main.temp)}°C</p>`;
    iconSlot.innerHTML = `<img src="http://openweathermap.org/img/w/${weatherInfo.icon}.png" alt=${res.weather[0].main}/>`
}

function fillFragment(res, template) {
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

function createWidget(res, that) {
    const content = document.createElement("div");
    content.classList.add("content");
    const city = document.createElement("p");
    city.textContent = res.name.toUpperCase();
    const weather = document.createElement("p");
    weather.textContent = res.weather[0].description;
    const temperature = document.createElement("p");
    temperature.style.fontSize="1.5em";
    temperature.textContent = Math.round(res.main.temp) + "°C";
    const icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
    icon.alt = res.weather[0].main;
  
    content.appendChild(city);
    content.appendChild(icon);
    content.appendChild(weather);
    content.appendChild(temperature);
  
    that.container.innerHTML = "";
    that.container.appendChild(content);
}