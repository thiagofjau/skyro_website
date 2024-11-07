// Handle form submission and send data to WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = form.querySelector('input[placeholder="Full Name"]').value;
        const email = form.querySelector('input[placeholder="Email"]').value;
        const celular = form.querySelector('input[placeholder="Phone Number"]').value;
        const mensagem = form.querySelector('textarea[placeholder="Your Message"]').value;

        const whatsappMessage = `Nome: ${nome}\nEmail: ${email}\nCelular: ${celular}\nMensagem: ${mensagem}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=+5514997746343&text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
    });

    // Initialize the first review and start auto slide
    updateReviews(currentIndex);
    startAutoSlide();
});

//comentarios
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const bullets = document.querySelectorAll('.bullet');
const reviews = document.querySelectorAll('.avaliacao');
let currentIndex = 0;
let autoSlideInterval;

const updateReviews = (index, direction = 'left') => {
    reviews.forEach((review) => {
        review.style.display = 'none';
        review.classList.remove('slide-in-left', 'slide-in-right');
    });
    bullets.forEach((bullet, i) => {
        bullet.classList.toggle('active', i === index);
    });

    reviews[index].style.display = 'block';
    reviews[index].classList.add(direction === 'left' ? 'slide-in-left' : 'slide-in-right');

    //opacidade ao alternar entre os slides. ok (mas testar slide vindo)
    reviews[index].style.opacity = '0';
    setTimeout(() => {
        reviews[index].style.transition = 'opacity 0.5s ease-in-out';
        reviews[index].style.opacity = '1';
    }, 400);
};


const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex < reviews.length - 1) ? currentIndex + 1 : 0;
        updateReviews(currentIndex, 'left');
    }, 4000); // Change slide every 3 seconds
};

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
};

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : reviews.length - 1;
    updateReviews(currentIndex, 'right');
    startAutoSlide();
});

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    currentIndex = (currentIndex < reviews.length - 1) ? currentIndex + 1 : 0;
    updateReviews(currentIndex, 'left');
    startAutoSlide();
});

//alterar avaliações pelo bullet
bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = index;
        updateReviews(currentIndex, 'left');
        startAutoSlide();
    });
});

//alterar avaliação pelas setas
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        stopAutoSlide();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : reviews.length - 1;
        updateReviews(currentIndex, 'right');
        startAutoSlide();
    } else if (e.key === 'ArrowRight') {
        stopAutoSlide();
        currentIndex = (currentIndex < reviews.length - 1) ? currentIndex + 1 : 0;
        updateReviews(currentIndex, 'left');
        startAutoSlide();
    }
});