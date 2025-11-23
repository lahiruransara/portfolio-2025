let currentScroll = 0;
let isScrollDown = true;
let tween = gsap.to(".marquee_item", {
    xPercent: -100,
    repeat: -1,
    duration: 50,
    ease: "linear",
}).totalProgress(0.5);

gsap.set(".marquee_inner", { xPercent: -50 });

window.addEventListener("scroll", function () {
    if (window.pageYOffset > currentScroll) {
        isScrollDown = true;
    } else {
        isScrollDown = false;
    }

    gsap.to(tween, {
        timeScale: isScrollDown ? 1 : -1,
    });

    currentScroll = window.pageYOffset;
});