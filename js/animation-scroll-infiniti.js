console.warn("Анимация Scroll подключенна");
const caruselWrapper = {
    carusel: document.querySelector(".carusel"),
    image: document.querySelectorAll(".carusel-img"),
    length: document.querySelectorAll(".carusel-img").length,
};

let start = Date.now(); // запомнить время начала

const startAnimation = () => {
    caruselWrapper.image.forEach((item) => {
        console.log("работаю");
        let timer = setInterval(function () {
            // сколько времени прошло с начала анимации?
            let timePassed = Date.now() - start;

            if (timePassed >= 15000) {
                // clearInterval(timer); // закончить анимацию через 2 секунды
                // startAnimation();
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            draw({ time: timePassed, image: item });
        }, 20);
    });
};

// в то время как timePassed идёт от 0 до 2000
// left изменяет значение от 0px до 400px
function draw(timePassed) {
    const { time, image } = timePassed;
    image.style.right = time / 5 + "px";
}
//1799px
caruselWrapper.carusel.addEventListener("click", (e) => {
    startAnimation();
});
