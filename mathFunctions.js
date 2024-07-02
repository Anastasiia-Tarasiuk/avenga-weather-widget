// menu
const title =  document.querySelector("h2");
const items = document.querySelectorAll(".menu-container li");
const subMenus = document.querySelectorAll(".second-level");
const goodsList = document.querySelector(".container:has(>.item-container)");

items.forEach(item => {
    item.addEventListener("click", e => showItems(e));
})

items.forEach(item => {
    item.addEventListener("mouseover", () => showSubMenu());
})

function showItems(e) {
    e.stopPropagation();
    const li = e.currentTarget;
    title.textContent = li.querySelector("span").textContent;
    hideSubMenu();
    goodsList.classList.remove("hidden");
}

function hideSubMenu() {
    subMenus.forEach(subMenu => {
        if (!subMenu.classList.contains("hide")) {
            subMenu.classList.add("hide");
        }
    })
}

function showSubMenu() {
    subMenus.forEach(subMenu => {
        if (subMenu.classList.contains("hide")) {
            subMenu.classList.remove("hide");
        }
    })
}

// rotation
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