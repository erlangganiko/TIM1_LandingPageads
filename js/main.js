document.addEventListener('DOMContentLoaded', function() {
    // 🔐 Nomor WA dalam base64
    const encoded = "MDgxMjIwODY5NjAz"; // base64 encoding of 081220869603
    const phone = atob(encoded); // decode to get the phone number


    const prefilledMessages = [
        "Bagaimana prosesnya?",
        "Ada yang bisa dibantu?",
        "Silakan chat kami!",
        "Dapatkan penawaran terbaik!"
    ];
    let currentMessageIndex = 0;


    function updateChatBubbleText(whatsappChatBubbleElement) {
        if (whatsappChatBubbleElement) {
            whatsappChatBubbleElement.textContent = prefilledMessages[currentMessageIndex];

            currentMessageIndex = (currentMessageIndex + 1) % prefilledMessages.length;
        }
    }

    // Get the chat bubble and the main WhatsApp floating icon
    const whatsappChatBubble = document.getElementById("whatsappChatBubble");
    const whatsappCallIcon = document.getElementById("whatsappCallIcon");

    // Perbarui teks gelembung setiap beberapa detik (misal: 5 detik)
    if (whatsappChatBubble) {
        updateChatBubbleText(whatsappChatBubble);
        setInterval(() => updateChatBubbleText(whatsappChatBubble), 5000);
    }


    if (whatsappChatBubble) {
        whatsappChatBubble.addEventListener("click", function() {
            const messageToSend = whatsappChatBubble.textContent;
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(messageToSend)}`, '_blank');
        });
    }


    if (whatsappCallIcon) {
        whatsappCallIcon.addEventListener("click", function(event) {
            event.preventDefault();
            const messageToSend = whatsappChatBubble ? whatsappChatBubble.textContent : prefilledMessages[0];
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(messageToSend)}`, '_blank');
        });
    }

    // Fungsionalitas tombol WhatsApp di footer
    const whatsappLinkFooter = document.getElementById("whatsappLinkFooter");
    if (whatsappLinkFooter) {
        whatsappLinkFooter.addEventListener("click", function(event) {
            event.preventDefault();
            const messageToSend = whatsappChatBubble ? whatsappChatBubble.textContent : prefilledMessages[0];
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(messageToSend)}`, '_blank');
        });
    }

    // 1. Autoplay Video
    const labVideo = document.getElementById('labVideo');
    if (labVideo) {
        labVideo.muted = true;
        labVideo.play().catch(error => {
            console.log("Video autoplay failed (likely due to browser policy). User interaction might be required.", error);
        });
    }

    // 2. Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const paginationDotsContainer = document.querySelector('.pagination-dots');
    let currentTestimonialIndex = 0;
    let slideInterval;

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
        updatePaginationDots(index);
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }

    function prevTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }

    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextTestimonial, 5000);
    }

    function createPaginationDots() {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('pagination-dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                showTestimonial(i);
                clearInterval(slideInterval);
                startAutoSlide();
            });
            paginationDotsContainer.appendChild(dot);
        });
    }

    function updatePaginationDots(activeIndex) {
        document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === activeIndex) {
                dot.classList.add('active');
            }
        });
    }

    if (testimonials.length > 0) {
        createPaginationDots();
        showTestimonial(currentTestimonialIndex);
        startAutoSlide();

        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            clearInterval(slideInterval);
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            clearInterval(slideInterval);
            startAutoSlide();
        });

        const testimonialsSection = document.querySelector('.testimonials-section');
        testimonialsSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        testimonialsSection.addEventListener('mouseleave', startAutoSlide);
    }


    // 3. FAQ Accordion (unchanged from previous version)
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            question.classList.toggle('active');

            if (answer.classList.contains('open')) {
                answer.classList.remove('open');
                answer.style.maxHeight = null;
            } else {
                document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                    openAnswer.classList.remove('open');
                    openAnswer.style.maxHeight = null;
                    openAnswer.previousElementSibling.classList.remove('active');
                });

                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 4. Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 5. Promo Pop-up Functionality
    const promoButton = document.getElementById('promoButton');
    const promoPopup = document.getElementById('promoPopup');
    const closePromoPopup = document.getElementById('closePromoPopup');
    const countdownTimerElement = document.getElementById('countdownTimer');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const promoCallToAction = document.getElementById('promoCallToAction');

    // Set the end date for the promo 
    // Set the end date for your promotion to be 2 hours and 30 minutes from now
    const now = new Date();
    const promoEndDate = new Date(now.getTime() + (0 * 60 * 60 * 1000) + (1 * 60 * 1000)).getTime(); // 2 hours + 30 minutes
    //const promoEndDate = new Date('June 30, 2025 23:59:59').getTime(); // diatur menggunakan tanggal terakhir diskon
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = promoEndDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownTimerElement.innerHTML = "PROMO TELAH BERAKHIR!";
            promoCallToAction.style.display = 'none'; 
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysSpan.textContent = String(days).padStart(2, '0');
        hoursSpan.textContent = String(hours).padStart(2, '0');
        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');
    }

    
    function showPromoPopup() {
        promoPopup.classList.add('show');
        updateCountdown(); 
        countdownInterval = setInterval(updateCountdown, 1000); 
    }

    
    function hidePromoPopup() {
        promoPopup.classList.remove('show');
        clearInterval(countdownInterval); 
    }

    
    if (promoButton) {
        promoButton.addEventListener('click', function(e) {
            e.preventDefault();
            showPromoPopup();
        });
    }

    if (closePromoPopup) {
        closePromoPopup.addEventListener('click', hidePromoPopup);
    }


    if (promoPopup) {
        promoPopup.addEventListener('click', function(e) {
            if (e.target === promoPopup) {
                hidePromoPopup();
            }
        });
    }
 
    if (promoCallToAction) {
        promoCallToAction.addEventListener('click', function(event) {
            event.preventDefault();
            const promoMessage = "Halo Moemtaz Group, saya tertarik dengan promo skincare yang sedang berlangsung!";
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(promoMessage)}`, '_blank');
            hidePromoPopup(); 
        });
    }
});
