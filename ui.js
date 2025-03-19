document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
        document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
        this.classList.add("active");
        alert(`تسلم ايدك ${this.dataset.rate} 😊`);
    });
});