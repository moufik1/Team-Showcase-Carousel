const teamMembers = [
    { name: "Emily Kim", role: "Founder" },
    { name: "Michael Steward", role: "Creative Director" },
    { name: "Emma Rodriguez", role: "Lead Developer" },
    { name: "Julia Gimmel", role: "UX Designer" },
    { name: "Lisa Anderson", role: "Marketing Manager" },
    { name: "James Wilson", role: "Product Manager" }
];

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.progress-dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let isTransitioning = false;

function updateSlides(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;

    const oldIndex = currentIndex;
    currentIndex = (newIndex + slides.length) % slides.length;

    // Remove all classes first
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });

    // Add appropriate classes
    slides[currentIndex].classList.add('active');
    slides[(currentIndex - 1 + slides.length) % slides.length].classList.add('prev');
    slides[(currentIndex + 1) % slides.length].classList.add('next');

    // Update progress dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    updateSlides(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    updateSlides(currentIndex + 1);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        updateSlides(i);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        updateSlides(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
        updateSlides(currentIndex + 1);
    }
});

// Touch events
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            updateSlides(currentIndex + 1);
        } else {
            updateSlides(currentIndex - 1);
        }
    }
}

// Initialize carousel
updateSlides(0);

// Auto-play (optional)
setInterval(() => {
    if (!document.hidden) {
        updateSlides(currentIndex + 1);
    }
}, 5000);
