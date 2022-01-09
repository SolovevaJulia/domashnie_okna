let tab = document.querySelectorAll(".products-wrapper-left-item"),
    tabWrapper = document.querySelector(".products-wrapper-left"),
    tabContent = document.querySelectorAll(".products-wrapper-content"),
    titleActive = document.querySelectorAll(".products-wrapper-left-item-text");

function hideTabContent(x) {
    for (let i = x; i < tabContent.length; i++) {
        tabContent[i].classList.remove("show");
        tabContent[i].classList.add("hide");
        tab[i].classList.remove("tab-active");
        titleActive[i].classList.remove("title-active");
    }
}

hideTabContent(1);

function showTabContent(y) {
    if (tabContent[y].classList.contains("hide")) {
        tabContent[y].classList.remove("hide");
        tabContent[y].classList.add("show");
        tab[y].classList.add("tab-active");
        titleActive[y].classList.add("title-active");
    }
}

tab.forEach((item) => {
    item.addEventListener("click", function (event) {
        let target = event.currentTarget;
        if (target && target.classList.contains("products-wrapper-left-item")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
});
