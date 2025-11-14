const cursors = document.querySelectorAll(".cursor");
const btns = document.querySelectorAll(".hoverbtn");

let mouseX = 0;
let mouseY = 0;

const lerp = (x, y, a) => x * (1 - a) + y * a;

// Starting positions for each circle
const positions = Array.from(cursors).map(() => ({ x: 0, y: 0 }));

// Track real mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Delay profiles (tweak these)
let easeNormal = [0.28, 0.24, 0.21, 0.18, 0.15];   // fast + tight
let easeHover  = [0.18, 0.16, 0.14, 0.12, 0.10];   // slower + stretched

// Current active delays
let currentEase = easeNormal;

function animateCursor() {
  cursors.forEach((cursor, index) => {
    const ease = currentEase[index];  // <-- dynamic delay value
    const pos = positions[index];

    pos.x = lerp(pos.x, mouseX, ease);
    pos.y = lerp(pos.y, mouseY, ease);

    cursor.style.left = pos.x + "px";
    cursor.style.top = pos.y + "px";
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effect for buttons
btns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    currentEase = easeHover;   // switch to delayed trailing
    cursors.forEach(c => c.classList.add("large"));
  });

  btn.addEventListener("mouseleave", () => {
    currentEase = easeNormal;  // switch back
    cursors.forEach(c => c.classList.remove("large"));
  });
});