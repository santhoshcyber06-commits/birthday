
const balloonContainer = document.getElementById("balloons");
const starContainer = document.getElementById("stars");

// BALLOON COLOURS

const balloonColors = [
    "#f4a9c5",
    "#ffffff",
    "#e7a0bc",
    "#e7c58d",
    "#f8d5e2"
];

// CREATE 50 BALLOONS

for (let i = 0; i < 50; i++) {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    const size = Math.random() * 35 + 35;

    balloon.style.setProperty("--size", size + "px");

    balloon.style.setProperty(
        "--color",
        balloonColors[i % balloonColors.length]
    );

    balloon.style.left = Math.random() * 100 + "%";

    balloon.style.setProperty(
        "--duration",
        (15 + Math.random() * 15) + "s"
    );

    balloon.style.setProperty(
        "--delay",
        -(Math.random() * 25) + "s"
    );

    balloonContainer.appendChild(balloon);

}


// CREATE 100 TWINKLING STARS

for (let i = 0; i < 100; i++) {

    const star = document.createElement("div");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 4 + "s";

    starContainer.appendChild(star);

}


// BIRTHDAY DATE VERIFICATION

const birthdayForm = document.getElementById("birthdayForm");

birthdayForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const enteredDate =
        document.getElementById("birthdayDate").value;

    const message = document.getElementById("message");

    if (!enteredDate) {

        message.textContent = "Please enter the birthday date!";

        return;

    }

    // November 14 = 11-14
    // Year is ignored.

    const selectedDate = enteredDate.split("-");

    const month = selectedDate[1];
    const day = selectedDate[2];

    if (month === "11" && day === "14") {

        message.textContent = "";

        document.getElementById("burst")
            .classList.add("active");

        setTimeout(() => {

            // PAGE 2 WILL BE CONNECTED HERE
            window.location.href = "page2.html";

        }, 900);

    } else {

        message.textContent =
            "Oops! That's not the special day. Try again! 🌷";

    }

});
