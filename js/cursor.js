const interactiveZone = document.getElementById("interactive");
const cursor = document.getElementById("cursor");

let isInZone = false;

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
let rotation = 0;

const followSpeed = 0.15;
const rotateSpeed = 0.4;

// Animate cursor position + rotation
function animateCursor() {
    currentX += (mouseX - currentX) * followSpeed;
    currentY += (mouseY - currentY) * followSpeed;
    rotation += rotateSpeed;

    cursor.style.transform = `
      translate3d(${currentX}px, ${currentY}px, 0)
      translate(-50%, -50%)
      rotate(${rotation}deg)
    `;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Activate cursor when entering interactive zone
interactiveZone.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
    isInZone = true;
});

// Deactivate custom cursor when leaving interactive zone
interactiveZone.addEventListener("mouseleave", () => {
    isInZone = false;
    cursor.classList.remove("active");
});

// Update cursor position on mouse move
document.addEventListener("mousemove", (e) => {
    if (isInZone == true) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});


