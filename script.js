document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector(".game-board");
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🥝", "🍓"];
    let cards = [...symbols, ...symbols]; // مضاعفة الرموز لعمل أزواج

    let moveCount = 0;
    const moveCounter = document.getElementById("move-counter");

    // ترتيب عشوائي للبطايق
    cards.sort(() => Math.random() - 0.5);

    // إنشاء البطايق وإضافتها إلى اللوحة
    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card"); // إضافة كلاس البطاقة
        card.dataset.symbol = symbol;
        card.textContent = "?"; // إخفاء الرمز في البداية
        gameBoard.appendChild(card);
    });

    // التفاعل مع البطايق
    let flippedCards = [];
    gameBoard.addEventListener("click", (e) => {
        if (e.target.classList.contains("card") && flippedCards.length < 2 && !e.target.classList.contains("flipped")) {
            e.target.textContent = e.target.dataset.symbol;
            e.target.classList.add("flipped");
            flippedCards.push(e.target);

            if (flippedCards.length === 2) {
                // تحديث العداد مع كل حركة تتعمل
                moveCount++;
                moveCounter.textContent = `Moves: ${moveCount}`;

                setTimeout(() => {
                    if (flippedCards[0].dataset.symbol !== flippedCards[1].dataset.symbol) {
                        flippedCards.forEach(card => {
                            card.textContent = "?";
                            card.classList.remove("flipped");
                        });
                    }
                    flippedCards = [];
                }, 1000);
            }
        }
    });
});