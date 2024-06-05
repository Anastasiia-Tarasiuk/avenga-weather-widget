let _this = null;

export function createCustomElement({ key = "ad3e4f050c831243787b3b3283c70545", backgroundColor = "aliceblue", width = "260px", height = "104px", shadowColor = "rgba(81,75,130,1)", textColor = "black", fontSize = "18px", language = "uk", positionTop = "-15px", positionRight = "0px"}) {
    customElements.define('custom-component', class extends HTMLElement {
        constructor() {
        super(); // always call super() first in the constructor.
    
        // Attach a shadow root to <fancy-tabs>.
        const shadowRoot = this.attachShadow({mode: 'open'});
        _this = shadowRoot;
        shadowRoot.innerHTML = `
            <style>
                :host {
                    box-sizing: border-box;
                    font-size: ${fontSize};
                    display: block;
                    color: ${textColor};
                    width: ${width};
                    height: ${height};
                    background-color: ${backgroundColor};
                    padding: 20px;
                    position: absolute;
                    top: ${positionTop};
                    right: ${positionRight};
                    box-shadow: 8px 9px 18px 0px ${shadowColor};
                }

                p {
                    margin: 0;
                }
    
                #icon {
                    position: absolute; 
                    display: block;
                    top: 10px;
                    right: 20px;
                }

                #temperature {
                    font-size: 1.5em;
                }
            </style>
            <slot id="city"><div>City</div></slot>
            <slot id="icon"><div>Icon</div></slot>
            <slot id="weather"><div>Weather</div></slot>
            <slot id="temperature"><div>Temperature</div></slot>
        `;
        }
    
    });

    getGeolocation({key, language});
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
        fillSlots(response);
    });
}

function getGeolocation(fetchSettings) {
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

function fillSlots(res) {
    const citySlot = _this.querySelector('#city');
    const weatherSlot = _this.querySelector('#weather');
    const temperatureSlot = _this.querySelector('#temperature');
    const iconSlot = _this.querySelector('#icon');

    citySlot.innerHTML = `<p>${res.name.toUpperCase()}</p>`;
    weatherSlot.innerHTML = `<p>${res.weather[0].description}</p>`;
    temperatureSlot.innerHTML = `<p>${Math.round(res.main.temp)}°C</p>`;
    iconSlot.innerHTML = `<img src="http://openweathermap.org/img/w/${res.weather[0].icon}.png" alt=${res.weather[0].main}/>`
}