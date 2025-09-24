console.log("Start");
// Add some iOS-like interactions
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.98)';
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('touchend', function () {
        this.style.transform = 'scale(1)';
    });
});

// Smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';