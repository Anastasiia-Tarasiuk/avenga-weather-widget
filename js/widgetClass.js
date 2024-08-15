import { getGeolocation } from "./fetch";

export class Widget {
    constructor({host, key = "ad3e4f050c831243787b3b3283c70545", backgroundColor = "aliceblue", width = "260px", height = "104px", shadowColor = "rgba(81,75,130,1)", textColor = "black", fontSize = "18px", loaderColor = "rgb(81,75,130)", language = "uk", positionTop = "-15px", positionRight = "0px"}) {
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
        this.positionTop = positionTop;
        this.positionRight = positionRight;

        this.shadow = this.host.attachShadow({mode: "open"});
        this.container = document.createElement("div");

        this.renderShadowDOM(); 
        this.setStyles(); 

        getGeolocation({key: this.key, language: this.language, root: this, type: "class"}); 
    }
    
    renderShadowDOM() {
        this.container.classList.add("container");

        this.shadow.appendChild(this.container);
        const loader = document.createElement("div");
        loader.classList.add("loader");

        this.container.appendChild(loader);
    }

    setStyles() {
        const sheet = new CSSStyleSheet();

        sheet.replace(
            ` p {margin: 0;} .container {box-sizing: border-box; font-size: ${this.fontSize}; color: ${this.textColor}; width: ${this.width}; height: ${this.height}; padding: 20px; background-color: ${this.backgroundColor}; box-shadow: 8px 9px 18px 0px ${this.shadowColor};} .content {position: relative;} .content .icon { position: absolute;  top: ${this.positionTop}; right: ${this.positionRight};} .loader { width: 40px; height: 40px; margin: 0 auto; aspect-ratio: 1; position: relative; transform: rotate(45deg);} .loader:before,.loader:after { position: absolute; inset: 0; border-radius: 50% 50% 0 50%; background: ${this.loaderColor};-webkit-mask: radial-gradient(circle 10px at 50% 50%,#0000 94%,#000); content: '';} .loader:after { animation: l6 1s infinite; transform: perspective(300px) translateZ(0px)} @keyframes l6 {to {transform: perspective(300px) translateZ(150px); opacity:0}} :host(.double) {margin: 20px;}`
        );

        this.shadow.adoptedStyleSheets = [sheet];
    }
}