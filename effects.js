const blend = document.querySelector(".blend");
const checkbox = document.querySelector(".checkbox");
const inputs = document.querySelector(".form").querySelectorAll("input");
const tip = document.querySelector(".tip");
const modeList = document.querySelector(".modeList");

let isMultipleModeOn = null;
let mode = [];

document.querySelector(".form").addEventListener("change", e => chooseValue(e));
checkbox.addEventListener("change", e => getCheckboxValue(e));

function chooseValue(e) {
    const radio = e.target;
    isMultipleModeOn ? setMultipleStyle(radio) : setUniqueStyle(radio);
}

function setUniqueStyle(radio) {
    mode = [];
    blend.style.backgroundBlendMode = radio.value;
    modeList.textContent = radio.value;
}

function setMultipleStyle(radio) {
    const isChecked = radio.checked;

    if (isChecked) {
        mode.push(radio.value);
    } else  {
        const index = mode.indexOf(radio.value);
        mode.splice(index, 1);

        if (mode.length === 0) {
            inputs[0].click();
        }
    }

    if (mode.length > 2) {
        tip.classList.remove("hidden");
    } else {
        tip.classList.add("hidden");
    }

    const modeValue = mode.join(", ");

    modeList.textContent = modeValue ;
    blend.style.backgroundBlendMode = modeValue;
}

function getCheckboxValue(e) {
    isMultipleModeOn = e.currentTarget.checked;
    isMultipleModeOn ? changeInputType("checkbox") : changeInputType("radio");
}

function changeInputType(type){
    inputs.forEach(input => {
        input.type = type;

        if (input.checked) {
            const value = input.value;
            blend.style.backgroundBlendMode = value;
            mode.push(value);
            tip.classList.add("hidden");
            modeList.textContent = value;
        }
    })
}
