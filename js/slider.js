const mainSwiper = new Swiper(".mainSlider", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    slidesPerView: 2.5,
});

const swiperThumbs = new Swiper(".thumbs .swiper-container", {
    direction: "vertical",
    slidesPerView: 3,
    spaceBetween: 13,
    freeMode: true,
});

const swiper = new Swiper(".miniSlider .swiper-container", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 32,
    thumbs: {
        swiper: swiperThumbs,
    },
});
