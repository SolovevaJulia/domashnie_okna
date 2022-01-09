let acc = document.querySelectorAll(".accordeon-wrapper-right-card"),
    accWrapper = document.querySelector(".accordeon-wrapper-right"),
    accContent = document.querySelectorAll(
        ".accordeon-wrapper-right-card-text"
    ),
    num = document.querySelectorAll(".accordeon-wrapper-right-card-number"),
    numOpen = document.querySelectorAll(
        ".accordeon-wrapper-right-card-number-open"
    ),
    plus = document.querySelectorAll(".accordeon-wrapper-right-card-plus"),
    imgOpen = document.querySelectorAll(".accordeon-wrapper-right-card-img");

function hideAccContent(a) {
    for (let i = a; i < accContent.length; i++) {
        acc[i].classList.remove("opened");
        acc[i].classList.add("closed");
        num[i].classList.remove("hidden");
        num[i].classList.add("visible");
        numOpen[i].classList.remove("visible");
        numOpen[i].classList.add("hidden");
        accContent[i].classList.remove("visible");
        accContent[i].classList.add("hidden");
        plus[i].classList.remove("hidden");
        plus[i].classList.add("visible");
        imgOpen[i].classList.remove("visible");
        imgOpen[i].classList.add("hidden");
    }
}

hideAccContent(1);

function showAccContent(b) {
    if (acc[b].classList.contains("closed")) {
        acc[b].classList.remove("closed");
        acc[b].classList.add("opened");
        num[b].classList.remove("visible");
        num[b].classList.add("hidden");
        numOpen[b].classList.remove("hidden");
        numOpen[b].classList.add("visible");
        accContent[b].classList.remove("hidden");
        accContent[b].classList.add("visible");
        plus[b].classList.remove("visible");
        plus[b].classList.add("hidden");
        imgOpen[b].classList.remove("hidden");
        imgOpen[b].classList.add("visible");
    }
}
acc.forEach((item) => {
    item.addEventListener("click", function (event) {
        let target = event.currentTarget;
        console.log("target", target);
        if (
            target &&
            target.classList.contains("accordeon-wrapper-right-card")
        ) {
            for (let i = 0; i < acc.length; i++) {
                if (target == acc[i]) {
                    hideAccContent(0);
                    showAccContent(i);
                    break;
                }
            }
        }
    });
});
