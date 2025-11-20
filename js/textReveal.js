gsap.registerPlugin(ScrollTrigger)

if (document.querySelector('.animate-this')) {
    gsap.from(".animate-this", {
        scrollTrigger: {
            trigger: ".animate-this",
            start: "top 90%", // when element enters viewport
            end: "top 10%",
            scrub: false,
        },
        delay: 4,
        y: 200,
        opacity: 0,
        stagger: 0.2,
        ease: "power4.inOut",
        duration: 1.5
    });
}


// gsap.from(".animate-this", {
//     scrollTrigger: {
//         trigger: ".animate-this",
//         start: "top 90%", 
//         end: "top 10%",
//         scrub: false,
//     },
//     delay: 4,
//     y: 200,
//     opacity: 0,
//     stagger: 0.2,
//     ease: "power4.inOut",
//     duration: 1.5
// });

gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 90%",                     // when element enters the viewport
      end: "top 80%",
      toggleActions: "play none none none", // play once, don't reverse
      once: true,                           // ensures it only runs one time
      markers: false,                        // turn off markers when done testing
    },
    y: 100,
    opacity: 0,
    ease: "power4.inOut",
    duration: 1,                            // controls speed
  });
});