
const starsContainer = document.getElementById("stars");
const shootingContainer = document.getElementById("shooting-stars");

// Create twinkling stars
for (let i = 0; i < 150; i++) {
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = (1.5 + Math.random() * 3) + "s";

    const size = 1 + Math.random() * 2;
    star.style.width = size + "px";
    star.style.height = size + "px";

    starsContainer.appendChild(star);
}

// Create occasional shooting stars
for (let i = 0; i < 3; i++) {
    const shootingStar = document.createElement("div");

    shootingStar.className = "shooting-star";
    shootingStar.style.left = (65 + Math.random() * 30) + "%";
    shootingStar.style.top = (5 + Math.random() * 35) + "%";
    shootingStar.style.animationDelay = (i * 3) + "s";

    shootingContainer.appendChild(shootingStar);
}

// Continue to Page 3
document.getElementById("magicButton").addEventListener("click", () => {
    window.location.href = "page3.html";
});
