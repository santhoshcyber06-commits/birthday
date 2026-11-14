
const starsContainer = document.getElementById("stars");
const balloonsContainer = document.getElementById("balloons");
const candlesGrid = document.getElementById("candlesGrid");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const completion = document.getElementById("completion");

const wishes = [
    "Always keep smiling. Your smile makes the world brighter. ❤️",
    "Be strong, even when life feels challenging.",
    "Never stop dreaming big. Your dreams matter.",
    "Believe in yourself. You are capable of amazing things.",
    "May happiness find you in the smallest moments.",
    "Keep learning, growing and discovering new things.",
    "May your hard work bring you wonderful success.",
    "Never lose the kindness that makes you special.",
    "May you always be surrounded by genuine people.",
    "Keep shining in everything you choose to do.",
    "May every new day bring you fresh opportunities.",
    "Stay curious and never stop exploring.",
    "May courage guide you through every challenge.",
    "Always remember how much you are appreciated.",
    "May your future be filled with beautiful memories.",
    "Never be afraid to start something new.",
    "May peace and happiness stay close to your heart.",
    "Keep being the wonderful person you are.",
    "May all your efforts lead to something beautiful.",
    "May this year be your happiest one yet! 💗"
];

let litCount = 0;

// Create twinkling stars
for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";

    starsContainer.appendChild(star);
}

// Create floating balloons
const balloonColors = [
    "#f49cbd",
    "#e8a5d0",
    "#f7b5c8",
    "#dca7ed",
    "#f8c5a7"
];

for (let i = 0; i < 16; i++) {
    const balloon = document.createElement("div");

    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "%";
    balloon.style.background = balloonColors[i % balloonColors.length];
    balloon.style.animationDuration = (12 + Math.random() * 12) + "s";
    balloon.style.animationDelay = Math.random() * 15 + "s";

    balloonsContainer.appendChild(balloon);
}

// Create exactly 20 candles
wishes.forEach((wish, index) => {
    const candle = document.createElement("button");

    candle.className = "candle";
    candle.type = "button";
    candle.setAttribute("aria-label", `Light candle ${index + 1}`);

    candle.innerHTML = `
        <div class="candle-body">
            <div class="wick"></div>
            <div class="flame"></div>
        </div>

        <span class="candle-number">CANDLE ${index + 1}</span>

        <div class="wish-cloud">
            <small>WISH ${index + 1} ✨</small>
            <p></p>
        </div>
    `;

    // Add the wish safely into its cloud
    candle.querySelector(".wish-cloud p").textContent = wish;

    candle.addEventListener("click", () => {
        if (candle.classList.contains("lit")) return;

        candle.classList.add("lit");
        candle.disabled = true;

        // Reveal the wish above this candle
        const cloud = candle.querySelector(".wish-cloud");
        cloud.classList.add("show");

        // Update progress
        litCount++;

        progressText.textContent =
            `${litCount} / 20 Wishes Unlocked`;

        progressBar.style.width =
            (litCount / 20 * 100) + "%";

        // All candles completed
        if (litCount === 20) {
            completion.classList.add("show");

            completion.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });

    candlesGrid.appendChild(candle);
});

// Navigate to Page 4
document.getElementById("letterButton").addEventListener("click", () => {
    window.location.href = "page4.html";
});

console.log("Page 3 loaded successfully. Total candles:", candlesGrid.children.length);
