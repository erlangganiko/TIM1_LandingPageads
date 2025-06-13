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

    // 1. Autoplay Video 
    const labVideo = document.getElementById('labVideo');
    if (labVideo) {
        labVideo.muted = true;
        labVideo.play().catch(error => {
            console.log("Video autoplay failed (likely due to browser policy). User interaction might be required.", error);
        });
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
});
