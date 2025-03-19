document.addEventListener("DOMContentLoaded", startGame);

let cards, flippedCards, moveCount, timer, timeLeft;
const startingTime = 60; // وقت البداية

function startGame() {
    document.getElementById("rating-box").style.display = "none";
    document.body.style.animation = ""; // وقف الاهتزاز عند إعادة اللعب
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🥝", "🍓"];
    cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    flippedCards = [];
    moveCount = 0;
    timeLeft = startingTime;
    
    updateCounter();
    startCountdown();

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = "?";
        card.addEventListener("click", () => flipCard(card));
        gameBoard.appendChild(card);
    });

    document.getElementById("restart-btn").addEventListener("click", startGame);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.textContent = card.dataset.symbol;
        card.classList.add("flipped");
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
        document.body.style.animation = "wrongMove 0.3s";
        if (navigator.vibrate) navigator.vibrate(200);

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
    document.getElementById("result-message").textContent = `🎉  كسبت يا بطل في ${moveCount} حركة خلال ${startingTime - timeLeft} ثانية!`;
    document.getElementById("rating-box").style.display = "block";
}

function updateCounter() {
    document.getElementById("move-counter").textContent = `🚀 الحركات: ${moveCount}`;
}

function startCountdown() {
    clearInterval(timer);
    document.getElementById("timer").textContent = `⏳ لسه متبقيلك  ${timeLeft} ثانية`;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = ` `⏳ لسه متبقيلك ${timeLeft} ثانية`;

        if (timeLeft <= 5) {
            document.getElementById("timer").style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.body.style.animation = "shake 0.5s ease-in-out";
            document.getElementById("result-message").textContent = `⏳   الوقت خلص للاسف .. جرب تاني.`;
            document.getElementById("rating-box").style.display = "block";
        }
    }, 1000);
}