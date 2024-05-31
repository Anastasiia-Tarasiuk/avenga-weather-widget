export class Widget {
    constructor({host, key, backgroundColor = "aliceblue", width = "260px", height = "104px", shadowColor = "rgba(81,75,130,1)", textColor = "black", fontSize = "18px", loaderColor = "rgb(81,75,130)", language = "uk"}) {
        this.host = host;
        this.key = key;
        this.width = width;
        this.height = height;
        this.shadowColor = shadowColor;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
        this.fontSize = fontSize;
        this.loaderColor = loaderColor;
        this.language = language;

        this.shadow = this.host.attachShadow({mode: "open"});
        this.container = document.createElement("div");

        this.renderShadowDOM(); 
        this.setStyles(); 
        this.getGeolocation(); 
    }
    
    renderShadowDOM() {
        this.container .classList.add("container");

        this.shadow.appendChild(this.container );
        const loader = document.createElement("div");
        loader.classList.add("loader");

        this.container .appendChild(loader);
    }

    setStyles() {
        const sheet = new CSSStyleSheet();
        sheet.replace(
            ` p {margin: 0;} .container {box-sizing: border-box; font-size: ${this.fontSize}; color: ${this.textColor};width: ${this.width}; height: ${this.height}; padding: 20px; background-color: ${this.backgroundColor}; box-shadow: 8px 9px 18px 0px ${this.shadowColor};} .content {position: relative;} .content .icon { position: absolute;  top: -15px; right: 0;} .loader { width: 40px; height: 40px; margin: 0 auto; aspect-ratio: 1; position: relative; transform: rotate(45deg);} .loader:before,.loader:after { position: absolute; inset: 0; border-radius: 50% 50% 0 50%; background: ${this.loaderColor};-webkit-mask: radial-gradient(circle 10px at 50% 50%,#0000 94%,#000); content: '';} .loader:after { animation: l6 1s infinite; transform: perspective(300px) translateZ(0px)} @keyframes l6 {to {transform: perspective(300px) translateZ(150px); opacity:0}}`
        );
        this.shadow.adoptedStyleSheets = [sheet];
    }

    getGeolocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos)=>this.success(pos, this), (pos)=>this.error(pos, this));
            
            console.log("geolocation is available")
        } else {
            console.log("geolocation IS NOT available")
        }
    }

    success(pos, _this) { 
        const crd = pos.coords; 
        const lat = crd.latitude.toString(); 
        const lon = crd.longitude.toString(); 
        _this.getWeather(lat, lon);
    } 
      
    error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`); 
    }

    getWeather(lat, lon) {
        console.log(lat, lon)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.key}&lang=${this.language}&units=metric`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          return response.json();
        })
        .then((response) => {
          this.createWidget(response)
          console.log(43, response)
        });
    }
      
    createWidget(res) {
        const content = document.createElement("div");
        content.classList.add("content");
        const city = document.createElement("p");
        city.textContent = res.name.toUpperCase();
        const weather = document.createElement("p");
        weather.textContent = res.weather[0].description;
        const temperature = document.createElement("p");

        temperature.style.fontSize="1.5em"
        temperature.textContent = Math.round(res.main.temp) + "°C";
        const icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`;
        icon.alt = res.weather[0].main;
      
        content.appendChild(city);
        content.appendChild(icon);
        content.appendChild(weather);
        content.appendChild(temperature);
      
        this.container.innerHTML = "";
        this.container.appendChild(content);
    }


}