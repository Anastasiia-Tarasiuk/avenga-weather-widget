import { getGeolocation } from "./fetch";

class CustomComponent extends HTMLElement { 
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'}); //shadow root

        // adds internal styles
        const sheet = new CSSStyleSheet();
        sheet.replace(`
            :host {
                box-sizing: border-box;
                display: block;
                font-size: ${this.getAttribute("fontSize")};
                color: ${this.getAttribute("textColor")};
                width: ${this.getAttribute("width")};
                height: ${this.getAttribute("height")};
                background-color: ${this.getAttribute("backgroundColor")};
                padding: 20px;
                position: absolute;
                top: ${this.getAttribute("positionTop")};
                right: ${this.getAttribute("positionRight")};
                box-shadow: 8px 9px 18px 0px ${this.getAttribute("shadowColor")};
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
            p {
                margin: 0;
            }
        `);
        shadowRoot.adoptedStyleSheets = [sheet];

        shadowRoot.innerHTML = `
            <p>City</p>
            <p id="icon">Icon</p>
            <p>Weather</p>
            <p id="temperature">Temperature</p>
        `;

        // adds external stylesheet
        const comonStyles = document.createElement("link");
        comonStyles.setAttribute("rel", "stylesheet");
        comonStyles.setAttribute("href", "comon.css");
        shadowRoot.appendChild(comonStyles);
    }

    connectedCallback() {
        getGeolocation({key: this.getAttribute("key"), language: this.getAttribute("language"), root: this.shadowRoot, type: "custom"});
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }
};

customElements.define('custom-component', CustomComponent);