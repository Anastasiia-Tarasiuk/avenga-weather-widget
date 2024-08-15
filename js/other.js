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
