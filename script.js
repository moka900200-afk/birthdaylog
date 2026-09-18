const correctPassword = "28/9/2011";

let rosesStarted = false;

function checkPassword() {
    const input = document.getElementById("password");
    const error = document.getElementById("error");

    const password = input.value.trim();

    if (password !== correctPassword) {
        error.textContent = "الباسورد غلط 😭 جربي تاني ❤️";
        input.focus();
        return;
    }

    error.textContent = "";

    const music = document.getElementById("backgroundMusic");

    if (music) {
        music.volume = 0;
        music.muted = true;
        music.play().catch(() => {
            console.log("المتصفح منع التشغيل التلقائي.");
        });
    }

    document.getElementById("loginPage").style.display = "none";

    const countdownPage = document.getElementById("countdownPage");
    const birthdayPage = document.getElementById("birthdayPage");

    countdownPage.style.display = "flex";
    birthdayPage.style.display = "none";

    startCountdownRoses();

    let number = 3;
    const counter = document.getElementById("countdown");
    counter.textContent = number;

    const timer = setInterval(() => {
        number--;
        counter.textContent = number;

        counter.style.animation = "none";
        void counter.offsetWidth;
        counter.style.animation = "countdownPulse 1s ease-in-out";

        if (number <= 0) {
            clearInterval(timer);

            setTimeout(() => {
                countdownPage.style.display = "none";
                birthdayPage.style.display = "flex";

                if (music) {
                    music.muted = false;
                    music.volume = 1;
                }
            }, 700);
        }
    }, 1000);
}

function startCountdownRoses() {
    if (rosesStarted) return;

    rosesStarted = true;

    const container = document.getElementById("fallingFlowers");

    const items = [
        "🌹", "🌹", "🌹", "🌹",
        "🌷", "🌸", "🌺", "💐",
        "❤️", "❤️", "💕", "💖"
    ];

    const flowerTimer = setInterval(() => {
        const countdownPage = document.getElementById("countdownPage");

        if (!countdownPage || countdownPage.style.display !== "flex") {
            clearInterval(flowerTimer);
            return;
        }

        const flower = document.createElement("div");

        flower.className = "falling-flower";
        flower.textContent = items[Math.floor(Math.random() * items.length)];

        flower.style.left = Math.random() * 100 + "vw";
        flower.style.fontSize = (20 + Math.random() * 28) + "px";
        flower.style.animationDuration = (3 + Math.random() * 3) + "s";

        container.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 7000);
    }, 80);
}

function showExtraMessage() {
    const extra = document.getElementById("extraMessage");
    const button = document.querySelector(".surprise-button");

    if (extra) {
        extra.style.display = "block";

        if (button) {
            button.textContent = "دي كانت المفاجأة الأخيرة ❤️";
            button.disabled = true;
            button.style.opacity = "0.85";
        }

        setTimeout(() => {
            extra.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("password");

    if (input) {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }
});