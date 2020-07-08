const availableChoices = ["green", "red", "blue", "yellow"];
let computerPattern = [];
let playerPattern = [];
let level;
let gameStarted = false;

function animateButton(buttonColor) {
    // console.log(buttonColor);
    let buttonSound = new Audio(`sounds/${buttonColor}.mp3`);
    buttonSound.currentTime = 0;
    buttonSound.play();

    const colors = {
        green: {
            original: "#008000",
            lighter: "#0bc90b"
        },
        red: {
            original: "#c72222",
            lighter: "#ff0000"
        },
        blue: {
            original: "#161696",
            lighter: "#0000ff"
        },
        yellow: {
            original: "#c2c20b",
            lighter: "#ffff00"
        }
    }

    let button = document.getElementById(buttonColor);
    button.style.backgroundColor = colors[buttonColor].lighter;
    setTimeout(() => button.style.backgroundColor = colors[buttonColor].original, 200);
}

function handleButtonClick(e) {
    const buttonColor = e.target.id;
    playerPattern.push(buttonColor);
    animateButton(buttonColor);
    checkAnswer(playerPattern.length - 1);
}

document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", handleButtonClick);
});

function gameOver() {
    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "#eee", 200);
    let wrong = new Audio(`sounds/wrong.mp3`);
    wrong.play();
    document.getElementById("game-over").style.display = "block";
    document.querySelectorAll(".color-btn").forEach(btn => {
        btn.removeEventListener("click", handleButtonClick);
    });
}

function checkAnswer(index) {
    if (playerPattern[index] === computerPattern[index]) {
        if (++index === computerPattern.length) {
            playNextRound();
        }
    } else {
        if (gameStarted) {
            gameOver();
            gameStarted = false;
        }
    }
}

function playFullPattern() {
    let index = 0;

    function play() {
        animateButton(computerPattern[index]);
        index++;
        if (index < computerPattern.length) {
            setTimeout(play, 500);
        }
    }
    setTimeout(play, 500);
}

function playNextRound() {
    playerPattern = [];
    document.getElementById("level").textContent = ++level;
    let computerChoice = availableChoices[Math.floor(Math.random() * 4)];
    computerPattern.push(computerChoice);
    setTimeout(playFullPattern, 200);
}

function startGame() {
    computerPattern = [];
    playerPattern = [];
    level = 0;
    gameStarted = true;
    document.querySelectorAll(".color-btn").forEach(btn => {
        btn.addEventListener("click", handleButtonClick);
    });
    document.getElementById("game-over").style.display = "none";
    setTimeout(playNextRound, 500);
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("game-over").style.display = "none";