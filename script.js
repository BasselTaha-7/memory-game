document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("restart-btn").addEventListener("click", startGame);
    startGame();
});

const startingTime = 60;
let cards = [];
let flippedCards = [];
let moveCount = 0;
let timer = null;
let resolveTimeout = null;
let timeLeft = startingTime;
let gameActive = false;

function startGame() {
    clearInterval(timer);
    clearTimeout(resolveTimeout);
    resolveTimeout = null;
    gameActive = true;
    flippedCards = [];
    moveCount = 0;
    timeLeft = startingTime;

    document.getElementById("rating-box").style.display = "none";
    document.body.style.animation = "";
    document.getElementById("timer").style.color = "";

    const gameBoard = document.querySelector(".game-board");
    gameBoard.replaceChildren();
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🥝", "🍓"];
    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    updateCounter();
    startCountdown();

    cards.forEach((symbol, index) => {
        const card = document.createElement("button");
        card.type = "button";
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = "?";
        card.setAttribute("aria-label", `بطاقة ${index + 1}، مخفية`);
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (!gameActive || flippedCards.length >= 2 || card.classList.contains("flipped")) {
        return;
    }

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");
    card.setAttribute("aria-label", `بطاقة مكشوفة: ${card.dataset.symbol}`);
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moveCount++;
        updateCounter();
        const [firstCard, secondCard] = flippedCards;
        resolveTimeout = setTimeout(() => resolvePair(firstCard, secondCard), 800);
    }
}

function resolvePair(firstCard, secondCard) {
    resolveTimeout = null;
    if (firstCard.dataset.symbol !== secondCard.dataset.symbol) {
        [firstCard, secondCard].forEach(card => {
            card.classList.remove("flipped");
            card.textContent = "?";
            card.setAttribute("aria-label", "بطاقة مخفية");
        });
    }

    flippedCards = [];
    if (document.querySelectorAll(".card.flipped").length === cards.length) {
        gameWon();
    }
}

function gameWon() {
    gameActive = false;
    clearInterval(timer);
    const elapsedSeconds = startingTime - timeLeft;
    document.getElementById("result-message").textContent =
        `🎉 أحسنت! أكملت اللعبة في ${moveCount} حركة خلال ${elapsedSeconds} ثانية.`;
    document.getElementById("rating-box").style.display = "block";
}

function updateCounter() {
    document.getElementById("move-counter").textContent = `🚀 الحركات: ${moveCount}`;
}

function startCountdown() {
    const timerText = document.getElementById("timer");
    timerText.textContent = `⏳ الوقت المتبقي: ${timeLeft} ثانية`;
    timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = `⏳ الوقت المتبقي: ${timeLeft} ثانية`;
        timerText.style.color = timeLeft <= 5 ? "#b42318" : "";

        if (timeLeft <= 0) {
            gameActive = false;
            clearInterval(timer);
            clearTimeout(resolveTimeout);
            resolveTimeout = null;
            flippedCards = [];
            document.body.style.animation = "shake 0.5s ease-in-out";
            document.getElementById("result-message").textContent =
                "⏳ انتهى الوقت. ابدأ جولة جديدة وحاول مرة أخرى.";
            document.getElementById("rating-box").style.display = "block";
        }
    }, 1000);
}
