
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js";

// PAGE ELEMENTS
const container = document.getElementById("cake3d");
const instructionCard = document.getElementById("instructionCard");
const cutSection = document.getElementById("cutSection");
const finalMessage = document.getElementById("finalMessage");
const micButton = document.getElementById("micButton");
const manualButton = document.getElementById("manualButton");
const micStatus = document.getElementById("micStatus");
const micMeterFill = document.getElementById("micMeterFill");
const cutButton = document.getElementById("cutButton");

let candlesOff = false;
let cakeCut = false;
let microphoneStream = null;
let audioContext = null;
let animationFrame = null;

// THREE.JS SCENE
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 4.7, 9.5);
camera.lookAt(0, 1.25, 0);

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

container.appendChild(renderer.domElement);

// LIGHTING
scene.add(new THREE.HemisphereLight(0xffffff, 0xb66a87, 2.2));

const mainLight = new THREE.DirectionalLight(0xffffff, 3);
mainLight.position.set(-4, 8, 6);
mainLight.castShadow = true;
scene.add(mainLight);

const pinkLight = new THREE.PointLight(0xff9fc5, 35, 14);
pinkLight.position.set(4, 4, 3);
scene.add(pinkLight);

const fillLight = new THREE.PointLight(0xffffff, 22, 14);
fillLight.position.set(-4, 3, -3);
scene.add(fillLight);

// CAKE GROUP
const cakeGroup = new THREE.Group();
scene.add(cakeGroup);

function material(color, roughness = 0.4, metalness = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness
  });
}

const cream = material("#fff0f5", 0.3);
const pinkCream = material("#f3a0c1", 0.3);
const cakeBrown = material("#9e5967", 0.65);
const plateMat = material("#fff9fc", 0.2, 0.15);
const gold = material("#d6a44c", 0.25, 0.65);
const strawberryRed = material("#d92d55", 0.3);
const leafGreen = material("#368a55", 0.5);
const candleWhite = material("#fff8fa", 0.28);
const sprinklePink = material("#e76b9a", 0.35);

function addMesh(geometry, mat, parent, x, y, z) {
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function addCylinder(rt, rb, height, mat, y, segments = 96) {
  return addMesh(
    new THREE.CylinderGeometry(rt, rb, height, segments),
    mat,
    cakeGroup,
    0, y, 0
  );
}

// CAKE STAND
addCylinder(1.9, 1.9, 0.12, plateMat, 0.05);
addCylinder(0.35, 0.5, 0.16, gold, -0.09);
addCylinder(0.19, 0.19, 0.3, gold, -0.3);
addCylinder(0.65, 0.75, 0.12, gold, -0.5);

// BOTTOM CAKE LAYER
addCylinder(1.62, 1.62, 0.82, cakeBrown, 0.42);
addCylinder(1.66, 1.66, 0.13, cream, 0.89);

// MIDDLE CAKE LAYER
addCylinder(1.35, 1.35, 0.72, pinkCream, 1.34);
addCylinder(1.39, 1.39, 0.13, cream, 1.77);

// TOP CAKE LAYER
addCylinder(1.03, 1.03, 0.58, cakeBrown, 2.12);
addCylinder(1.07, 1.07, 0.13, cream, 2.47);

// FROSTING PEARLS
for (let i = 0; i < 32; i++) {
  const angle = (i / 32) * Math.PI * 2;
  const x = Math.cos(angle) * 1.61;
  const z = Math.sin(angle) * 1.61;

  addMesh(
    new THREE.SphereGeometry(0.065, 16, 12),
    cream,
    cakeGroup,
    x, 0.12, z
  );
}

// TOP FROSTING DRIPS
for (let i = 0; i < 20; i++) {
  const angle = (i / 20) * Math.PI * 2;
  const x = Math.cos(angle) * 1.02;
  const z = Math.sin(angle) * 1.02;
  const length = 0.12 + Math.random() * 0.17;

  const drip = addMesh(
    new THREE.SphereGeometry(0.095, 16, 12),
    cream,
    cakeGroup,
    x, 2.39 - length / 2, z
  );

  drip.scale.set(0.9, 1.5, 0.9);
}

// STRAWBERRIES
function addStrawberry(x, z, scale = 1) {
  const group = new THREE.Group();
  group.position.set(x, 2.57, z);
  group.scale.setScalar(scale);
  cakeGroup.add(group);

  const berry = addMesh(
    new THREE.SphereGeometry(0.17, 24, 20),
    strawberryRed,
    group,
    0, 0, 0
  );
  berry.scale.set(0.85, 1.2, 0.85);

  for (let i = 0; i < 5; i++) {
    const angle = i * Math.PI * 2 / 5;
    const leaf = addMesh(
      new THREE.ConeGeometry(0.065, 0.16, 8),
      leafGreen,
      group,
      Math.cos(angle) * 0.1,
      0.16,
      Math.sin(angle) * 0.1
    );
    leaf.rotation.z = Math.PI;
  }
}

addStrawberry(-0.58, 0.05, 0.9);
addStrawberry(0.58, 0.05, 0.9);
addStrawberry(0, -0.58, 0.8);

// SMALL TOP DECORATIONS
for (let i = 0; i < 16; i++) {
  const angle = i * Math.PI * 2 / 16;

  addMesh(
    new THREE.SphereGeometry(0.035, 10, 8),
    i % 2 ? gold : sprinklePink,
    cakeGroup,
    Math.cos(angle) * 0.76,
    2.58,
    Math.sin(angle) * 0.76
  );
}

// 20 CANDLES
const candleGroups = [];
const flameGroups = [];

const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa52e });
const flameCoreMat = new THREE.MeshBasicMaterial({ color: 0xfff4ad });

for (let i = 0; i < 20; i++) {
  const angle = (i / 20) * Math.PI * 2;
  const radius = i < 10 ? 0.52 : 0.82;

  const candleGroup = new THREE.Group();
  candleGroup.position.set(
    Math.cos(angle) * radius,
    2.56,
    Math.sin(angle) * radius
  );
  cakeGroup.add(candleGroup);

  addMesh(
    new THREE.CylinderGeometry(0.04, 0.045, 0.48, 16),
    candleWhite,
    candleGroup,
    0, 0.24, 0
  );

  addMesh(
    new THREE.CylinderGeometry(0.008, 0.008, 0.06, 8),
    cakeBrown,
    candleGroup,
    0, 0.51, 0
  );

  const flameGroup = new THREE.Group();
  flameGroup.position.set(0, 0.56, 0);
  candleGroup.add(flameGroup);

  const flame = addMesh(
    new THREE.SphereGeometry(0.065, 16, 16),
    flameMat,
    flameGroup,
    0, 0.04, 0
  );
  flame.scale.set(0.65, 1.5, 0.65);

  const core = addMesh(
    new THREE.SphereGeometry(0.03, 12, 12),
    flameCoreMat,
    flameGroup,
    0, 0.025, 0
  );
  core.scale.set(0.7, 1.2, 0.7);

  const glow = new THREE.PointLight(0xffa33c, 0.4, 1.2);
  glow.position.set(0, 0.08, 0);
  flameGroup.add(glow);

  candleGroups.push(candleGroup);
  flameGroups.push({ flameGroup, flame, glow });
}

// DRAG TO ROTATE
let dragging = false;
let previousX = 0;
let targetRotation = 0;

renderer.domElement.addEventListener("pointerdown", (event) => {
  dragging = true;
  previousX = event.clientX;
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!dragging) return;

  targetRotation += (event.clientX - previousX) * 0.008;
  previousX = event.clientX;
});

renderer.domElement.addEventListener("pointerup", () => {
  dragging = false;
});

renderer.domElement.addEventListener("pointercancel", () => {
  dragging = false;
});

// RESPONSIVE CANVAS
function resizeCake() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

const resizeObserver = new ResizeObserver(resizeCake);
resizeObserver.observe(container);
resizeCake();

// ANIMATION LOOP
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  cakeGroup.rotation.y += (targetRotation - cakeGroup.rotation.y) * 0.08;

  flameGroups.forEach((item, index) => {
    if (candlesOff) return;

    const flicker = 1 + Math.sin(time * 13 + index * 2) * 0.1;
    item.flame.scale.y = 1.5 * flicker;
    item.flameGroup.rotation.z = Math.sin(time * 7 + index) * 0.12;
  });

  renderer.render(scene, camera);
}

animate();

// BACKGROUND STARS
const stars = document.getElementById("stars");

for (let i = 0; i < 90; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (5 + Math.random() * 10) + "px";
  star.style.animationDelay = Math.random() * 3 + "s";
  stars.appendChild(star);
}

// FLOATING BALLOONS
const balloons = document.getElementById("balloons");
const balloonColors = [
  "#f28bb5", "#f8b6d0", "#dba4e8",
  "#ffc4a8", "#ffffff", "#e88eae"
];

for (let i = 0; i < 16; i++) {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.left = Math.random() * 100 + "%";
  balloon.style.background =
    balloonColors[Math.floor(Math.random() * balloonColors.length)];
  balloon.style.animationDuration = (12 + Math.random() * 12) + "s";
  balloon.style.animationDelay = Math.random() * 12 + "s";
  balloons.appendChild(balloon);
}

// SMOKE WHEN CANDLES GO OUT
function createSmoke(candleGroup) {
  const position = new THREE.Vector3();
  candleGroup.getWorldPosition(position);
  position.y += 0.58;

  const smokeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.65
  });

  const smoke = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 12, 12),
    smokeMaterial
  );

  smoke.position.copy(position);
  scene.add(smoke);

  const start = performance.now();

  function animateSmoke() {
    const progress = (performance.now() - start) / 1100;

    if (progress >= 1) {
      scene.remove(smoke);
      smoke.geometry.dispose();
      smokeMaterial.dispose();
      return;
    }

    smoke.position.y += 0.002;
    smoke.scale.setScalar(1 + progress * 2.5);
    smokeMaterial.opacity = 0.65 * (1 - progress);

    requestAnimationFrame(animateSmoke);
  }

  animateSmoke();
}

// STOP MICROPHONE
function stopMicrophone() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  if (microphoneStream) {
    microphoneStream.getTracks().forEach(track => track.stop());
    microphoneStream = null;
  }

  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
    audioContext = null;
  }

  micMeterFill.style.width = "0%";
}

// EXTINGUISH CANDLES
function extinguishCandles() {
  if (candlesOff) return;

  candlesOff = true;
  stopMicrophone();

  micStatus.textContent = "Your birthday wish is on its way! 💗";

  flameGroups.forEach((item, index) => {
    setTimeout(() => {
      item.flameGroup.visible = false;
      item.glow.intensity = 0;
      createSmoke(candleGroups[index]);
    }, index * 90);
  });

  setTimeout(() => {
    instructionCard.classList.add("hidden");
    cutSection.classList.remove("hidden");
  }, 2500);
}

// MICROPHONE BLOW DETECTION
async function enableMicrophone() {
  if (candlesOff) return;

  if (!navigator.mediaDevices?.getUserMedia) {
    micStatus.textContent =
      "Microphone unavailable. Open this page using Live Server or HTTPS.";
    return;
  }

  micButton.disabled = true;
  micStatus.textContent = "Waiting for microphone permission...";

  try {
    microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    audioContext = new AudioContextClass();
    await audioContext.resume();

    const source = audioContext.createMediaStreamSource(microphoneStream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;
    source.connect(analyser);

    const samples = new Uint8Array(analyser.fftSize);

    let calibrationCount = 0;
    let ambientLevel = 0;
    let blowFrames = 0;

    micStatus.textContent =
      "Listening to room sound... Get ready to blow gently!";

    function detectBlow() {
      if (candlesOff) return;

      analyser.getByteTimeDomainData(samples);

      let sum = 0;

      for (let i = 0; i < samples.length; i++) {
        const value = (samples[i] - 128) / 128;
        sum += value * value;
      }

      const rms = Math.sqrt(sum / samples.length);
      micMeterFill.style.width = Math.min(100, rms * 350) + "%";

      // Calibrate background noise briefly
      if (calibrationCount < 35) {
        ambientLevel = Math.max(ambientLevel, rms);
        calibrationCount++;
        animationFrame = requestAnimationFrame(detectBlow);
        return;
      }

      const threshold = Math.max(0.07, ambientLevel * 2.2);

      if (rms > threshold) {
        blowFrames++;
      } else {
        blowFrames = Math.max(0, blowFrames - 2);
      }

      if (blowFrames >= 16) {
        micStatus.textContent = "Wish accepted! Candles going out... 💗";
        extinguishCandles();
        return;
      }

      animationFrame = requestAnimationFrame(detectBlow);
    }

    micStatus.textContent =
      "Microphone ready! Blow gently towards your microphone.";

    detectBlow();

  } catch (error) {
    console.error("Microphone error:", error);

    micStatus.textContent =
      "Microphone permission failed. Please allow access or use the manual option.";

    micButton.disabled = false;
    stopMicrophone();
  }
}

micButton.addEventListener("click", enableMicrophone);

manualButton.addEventListener("click", () => {
  extinguishCandles();
});

// CAKE CUTTING CELEBRATION
cutButton.addEventListener("click", () => {
  if (cakeCut) return;

  cakeCut = true;
  cutButton.disabled = true;
  cutButton.textContent = "CELEBRATING... ❤️";

  cakeGroup.scale.set(0.92, 0.92, 0.92);

  setTimeout(() => {
    cutSection.classList.add("hidden");
    finalMessage.classList.remove("hidden");
    createConfetti();
  }, 1200);
});

// CONFETTI
function createConfetti() {
  const colors = [
    "#ff70a6", "#ffd166", "#c77dff",
    "#ffffff", "#ff9f9f", "#f7b2d9"
  ];

  for (let i = 0; i < 140; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.5 + "s";
    piece.style.animationDuration = (2.5 + Math.random() * 2) + "s";

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5500);
  }
}

// RELEASE MICROPHONE WHEN LEAVING PAGE
window.addEventListener("pagehide", stopMicrophone);
