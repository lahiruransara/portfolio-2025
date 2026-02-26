import * as THREE from 'https://unpkg.com/three@0.169.0/build/three.module.js';
import { vertexShader, fluidShader, displayShader } from "./shaders.js"

const currentPage = document.body.dataset.page;

const colorSets = {
    index: {
        dark: {
            color1: "#380077",
            color2: "#ac73ff",
            color3: "#09090b",
            color4: "#1a1a1e",
        },
        light: {
            color1: "#8f14ff",
            color2: "#f5f0ff",
            color3: "#fafafa",
            color4: "#f4f4f5",
        },
    },
    pse: {
        dark: {
            color1: "#E53935",
            color2: "#721c1a",
            color3: "#09090b",
            color4: "#1a1a1e",
        },
        light: {
            color1: "#E53935",
            color2: "#ff7469",
            color3: "#fafafa",
            color4: "#f4f4f5",
        },
    },
    corona: {
        dark: {
            color1: "#8170ED",
            color2: "#7ACF9C",
            color3: "#09090b",
            color4: "#E36176",
        },
        light: {
            color1: "#8170ED",
            color2: "#7ACF9C",
            color3: "#fafafa",
            color4: "#E36176",
        },
    },
    wisdom: {
        dark: {
            color1: "#29AAE2",
            color2: "#3AF2CA",
            color3: "#09090b",
            color4: "#9832FE",
        },
        light: {
            color1: "#29AAE2",
            color2: "#3AF2CA",
            color3: "#fafafa",
            color4: "#9832FE",
        },
    },
};

// 1. Determine the theme state first
const isDark = document.body.classList.contains("dark-mode");
const initialTheme = isDark ? "dark" : "light";

// 2. Determine which page set to use (assuming currentPage is defined)
const initialColors = colorSets[currentPage]?.[initialTheme] || colorSets.index[initialTheme];

const config = {
    brushSize: 25.0,
    brushStrength: 0.5,
    distortionAmount: 2.5,
    fluidDecay: 0.98,
    trailLength: 0.8,
    stopDecay: 0.85,
    ...initialColors,
    colorIntensity: 1.0,
    softness: 1.0,
};

// Function to update config colors based on dark mode and page
function updateColorsByTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    const theme = isDark ? "dark" : "light";

    // Use current page colors
    const pageColors = colorSets[currentPage]?.[theme] || colorSets.index[theme];

    Object.assign(config, pageColors);
    // console.log(`🎨 Updated colors for ${currentPage} (${theme})`, config);
}

// Initialize once on load
updateColorsByTheme();

// Observe changes to the body’s class attribute
const observer = new MutationObserver(() => updateColorsByTheme());
observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });


function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
}

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const gradientCanvas = document.querySelector(".gradient-canvas");
// console.log("Canvas size:", window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
gradientCanvas.appendChild(renderer.domElement);

const fluidTarget1 = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
    }
);

const fluidTarget2 = fluidTarget1.clone();

let currentFluidTarget = fluidTarget1;
let previousFluidTarget = fluidTarget2;
let frameCount = 0;

const fluidMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iTime: { value: 0 },
        iResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
    },
    vertexShader: vertexShader,
    fragmentShader: fluidShader,
});

const displayMaterial = new THREE.ShaderMaterial({
    uniforms: {
        iTime: { value: 0 },
        iResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: new THREE.Vector3(...hexToRgb(config.color1)) },
        uColor2: { value: new THREE.Vector3(...hexToRgb(config.color2)) },
        uColor3: { value: new THREE.Vector3(...hexToRgb(config.color3)) },
        uColor4: { value: new THREE.Vector3(...hexToRgb(config.color4)) },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
    },
    vertexShader: vertexShader,
    fragmentShader: displayShader,
});

const geometry = new THREE.PlaneGeometry(2, 2);
const fluidPlane = new THREE.Mesh(geometry, fluidMaterial);
const displayPlane = new THREE.Mesh(geometry, displayMaterial);

let mouseX = 0,
    mouseY = 0;
let prevMouseX = 0,
    prevMouseY = 0;
let lastMoveTime = 0;

const canvasContainer = document.querySelector(".gradient-canvas");

const handleMouseMove = (e) => {
    if (!canvasContainer) return;

    const rect = canvasContainer.getBoundingClientRect();

    prevMouseX = mouseX;
    prevMouseY = mouseY;

    mouseX = e.clientX - rect.left;
    mouseY = rect.height - (e.clientY - rect.top);

    lastMoveTime = performance.now();
    fluidMaterial.uniforms.iMouse.value.set(mouseX, mouseY, prevMouseX, prevMouseY);
};

const handleMouseLeave = () => {
    fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
};

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseleave", handleMouseLeave);

function animate() {
    requestAnimationFrame(animate);

    const time = performance.now() * 0.001;
    fluidMaterial.uniforms.iTime.value = time;
    displayMaterial.uniforms.iTime.value = time;
    fluidMaterial.uniforms.iFrame.value = frameCount;

    if (performance.now() - lastMoveTime > 100) {
        fluidMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
    }

    fluidMaterial.uniforms.uBrushSize.value = config.brushSize;
    fluidMaterial.uniforms.uBrushStrength.value = config.brushStrength;
    fluidMaterial.uniforms.uFluidDecay.value = config.fluidDecay;
    fluidMaterial.uniforms.uTrailLength.value = config.trailLength;
    fluidMaterial.uniforms.uStopDecay.value = config.stopDecay;

    displayMaterial.uniforms.uDistortionAmount.value = config.distortionAmount;
    displayMaterial.uniforms.uColorIntensity.value = config.colorIntensity;
    displayMaterial.uniforms.uSoftness.value = config.softness;
    displayMaterial.uniforms.uColor1.value.set(...hexToRgb(config.color1));
    displayMaterial.uniforms.uColor2.value.set(...hexToRgb(config.color2));
    displayMaterial.uniforms.uColor3.value.set(...hexToRgb(config.color3));
    displayMaterial.uniforms.uColor4.value.set(...hexToRgb(config.color4));

    fluidMaterial.uniforms.iPreviousFrame.value = previousFluidTarget.texture;
    renderer.setRenderTarget(currentFluidTarget);
    renderer.render(fluidPlane, camera);

    displayMaterial.uniforms.iFluid.value = currentFluidTarget.texture;
    renderer.setRenderTarget(null);
    renderer.render(displayPlane, camera);

    const temp = currentFluidTarget;
    currentFluidTarget = previousFluidTarget;
    previousFluidTarget = temp;

    frameCount++;
}

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    fluidMaterial.uniforms.iResolution.value.set(width, height);
    displayMaterial.uniforms.iResolution.value.set(width, height);

    fluidTarget1.setSize(width, height);
    fluidTarget2.setSize(width, height);
    frameCount = 0;
});

animate();


