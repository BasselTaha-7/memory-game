document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector(".game-board");
    const symbols = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🥝", "🍓"];
    let cards = [...symbols, ...symbols]; // مضاعفة الرموز لعمل أزواج

    let moveCount = 0;
    const moveCounter = document.getElementById("move-counter");
    
            moveCount++;
            moveCounter.textContent = 'moves: ${moveCount}';
    

    // ترتيب عشوائي للبطاقات
    cards.sort(() => Math.random() - 0.5);

    // إنشاء البطاقات
    cards.forEach(symbol => {
        const card = document.createElement("div");
        setTimeout(() => {
        card.classList.add("flipped");
        }, 90);
        card.dataset.symbol = symbol;
        card.textContent = "?"; // إخفاء الرمز في البداية
        gameBoard.appendChild(card);
    });

    //  التفاعل مع البطاقات
    let flippedCards = [];
    gameBoard.addEventListener("click", (e) => {
        if (e.target.classList.contains("card") && flippedCards.length < 2) {
            e.target.textContent = e.target.dataset.symbol;
            flippedCards.push(e.target);

            
            if (flippedCards.length === 2) {
                setTimeout(() => {
                    if (flippedCards[0].dataset.symbol !== flippedCards[1].dataset.symbol) {
                        flippedCards.forEach(card => card.textContent = "?");
                    }
                    flippedCards = [];
                }, 1000);
            }
        }
    });
});
