const rotateEl = document.querySelector(".rotate");

const strategyInput = document.querySelector("#strategy");
const valueInput = document.querySelector("#value");
const intervalInput = document.querySelector("#interval");

const strategySpan = document.querySelector(".strategy");
strategySpan.textContent = strategyInput.value;
const valueSpan = document.querySelector(".value");
valueSpan.textContent = valueInput.value;
const intervalSpan = document.querySelector(".interval");
intervalSpan.textContent = intervalInput.value;
const resultSpan = document.querySelector(".result");

rotateElement();

strategyInput.addEventListener("change", e => setValue(e));
valueInput.addEventListener("change", e => setValue(e));
intervalInput.addEventListener("change", e => setValue(e));

function setValue(e) {
    const element = e.currentTarget;

    switch (element.getAttribute("id")) {
        case "strategy":
            strategySpan.textContent = element.value;
            break;
        case "value":
            valueSpan.textContent = element.value;
        break;
        case "interval":
            intervalSpan.textContent = element.value;
        break;    
        case "interval":
            intervalSpan.textContent = element.value;
        break;      
        default:
            break;
    }

    rotateElement();
}

function rotateElement() {
    rotateEl.style.rotate =`round(${strategySpan.textContent}, ${valueSpan.textContent}deg, ${intervalSpan.textContent}deg)`;
    resultSpan.textContent = getComputedStyle(rotateEl).rotate;
}