document.addEventListener("DOMContentLoaded", startGame);

const flipSound = new Audio("sounds/flip.mp3");
const winSound = new Audio("sounds/win.mp3");

let cards, flippedCards, moveCount, timer, timeElapsed;

function startGame() {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🥝", "🍓"];
    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    flippedCards = [];
    moveCount = 0;
    timeElapsed = 0;
    updateCounter();
    startTimer();

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = "?";
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.textContent = card.dataset.symbol;
        card.classList.add("flipped");
        flipSound.play();
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moveCount++;
            updateCounter();
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.symbol !== flippedCards[1].dataset.symbol) {
        flippedCards.forEach(card => {
            card.classList.remove("flipped");
            card.textContent = "?";
        });
    }
    flippedCards = [];

    if (document.querySelectorAll(".card.flipped").length === cards.length) {
        gameWon();
    }
}

function gameWon() {
    clearInterval(timer);
    winSound.play();
    saveBestScore();
    document.getElementById("result-message").textContent = `فزت في ${moveCount} حركة خلال ${timeElapsed} ثانية!`;
    document.getElementById("rating-box").style.display = "block";
}

function updateCounter() {
    document.getElementById("move-counter").textContent = `🚀 الحركات: ${moveCount}`;
}

function startTimer() {
    clearInterval(timer);
    timeElapsed = 0;
    document.getElementById("timer").textContent = `⏳ الوقت: 0 ثانية`;
    
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").textContent = `⏳ الوقت: ${timeElapsed} ثانية`;
    }, 1000);
}

function saveBestScore() {
    const bestTime = localStorage.getItem("bestTime") || Infinity;
    const bestMoves = localStorage.getItem("bestMoves") || Infinity;

    if (timeElapsed < bestTime) localStorage.setItem("bestTime", timeElapsed);
    if (moveCount < bestMoves) localStorage.setItem("bestMoves", moveCount);
}

document.getElementById("restart-btn").addEventListener("click", () => {
    document.getElementById("rating-box").style.display = "none";
    startGame();
});