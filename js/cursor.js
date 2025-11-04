const cursor = document.querySelector(".cursor");
const btns = document.querySelectorAll(".hoverbtn");
const shrinkBtns = document.querySelectorAll(".shrinkbtn");

const cursorSize = 8;
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// Track actual mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX + cursorSize / 2;
  mouseY = e.clientY + cursorSize / 2;
});

// Smooth cursor animation loop
function animateCursor() {
  const ease = 0.05;
  currentX += (mouseX - currentX) * ease;
  currentY += (mouseY - currentY) * ease;

  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for buttons
btns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    cursor.classList.add("large");
  });

  btn.addEventListener("mouseleave", () => {
    cursor.classList.remove("large");
  });
});

shrinkBtns.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    cursor.classList.add("small");
  });

  btn.addEventListener("mouseleave", () => {
    cursor.classList.remove("small");
  });
});