document.addEventListener('DOMContentLoaded', function() {
    // 🔐 Nomor WA dalam base64
    const encoded = "MDgxMjIwODY5NjAz"; // base64 encoding of 081220869603
    const phone = atob(encoded);

    // --- Fungsionalitas Tombol WhatsApp ---
    const prefilledMessages = [
        "Bagaimana prosesnya?",
        "Ada yang bisa dibantu?",
        "Silakan chat kami!",
        "Dapatkan penawaran terbaik!"
    ];
    let currentMessageIndex = 0;

    const whatsappChatBubble = document.getElementById("whatsappChatBubble");
    const whatsappCallIcon = document.getElementById("whatsappCallIcon");
    const whatsappLinkFooter = document.getElementById("whatsappLinkFooter");

    function updateChatBubbleText() {
        if (whatsappChatBubble) {
            whatsappChatBubble.textContent = prefilledMessages[currentMessageIndex];
            currentMessageIndex = (currentMessageIndex + 1) % prefilledMessages.length;
        }
    }

    if (whatsappChatBubble) {
        updateChatBubbleText();
        setInterval(updateChatBubbleText, 5000);
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

    if (whatsappLinkFooter) {
        whatsappLinkFooter.addEventListener("click", function(event) {
            event.preventDefault();
            const messageToSend = whatsappChatBubble ? whatsappChatBubble.textContent : prefilledMessages[0];
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(messageToSend)}`, '_blank');
        });
    }

    // --- 1. Autoplay Video ---
    const labVideo = document.getElementById('labVideo');
    if (labVideo) {
        labVideo.muted = true;
        labVideo.play().catch(error => {
            console.log("Video autoplay failed.", error);
        });
    }

    // --- 2. Testimonial Slider (Manual) ---
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 0) {
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const paginationDotsContainer = document.querySelector('.pagination-dots');
        let currentTestimonialIndex = 0;

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

        function createPaginationDots() {
            testimonials.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('pagination-dot');
                dot.dataset.index = i;
                dot.addEventListener('click', () => showTestimonial(i));
                paginationDotsContainer.appendChild(dot);
            });
        }

        function updatePaginationDots(activeIndex) {
            document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }

        createPaginationDots();
        showTestimonial(currentTestimonialIndex);
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // --- 3. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const wasOpen = answer.classList.contains('open');

            // Tutup semua jawaban
            document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                openAnswer.classList.remove('open');
                openAnswer.style.maxHeight = null;
                openAnswer.previousElementSibling.classList.remove('active');
            });

            // Jika item yang diklik belum terbuka, buka
            if (!wasOpen) {
                question.classList.add('active');
                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 5. Promo Pop-up Functionality ---
    const promoButton = document.getElementById('promoButton');
    const promoPopup = document.getElementById('promoPopup');
    const closePromoPopup = document.getElementById('closePromoPopup');
    const countdownTimerElement = document.getElementById('countdownTimer');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const promoCallToAction = document.getElementById('promoCallToAction');

    if (promoPopup) {
        const now = new Date();
        const promoEndDate = new Date(now.getTime() + (2 * 60 * 60 * 1000) + (30 * 60 * 1000)).getTime(); // 2 jam 30 menit dari sekarang
        let countdownInterval;

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = promoEndDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                if (countdownTimerElement) countdownTimerElement.innerHTML = "PROMO TELAH BERAKHIR!";
                if (promoCallToAction) promoCallToAction.style.display = 'none';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysSpan) daysSpan.textContent = String(days).padStart(2, '0');
            if (hoursSpan) hoursSpan.textContent = String(hours).padStart(2, '0');
            if (minutesSpan) minutesSpan.textContent = String(minutes).padStart(2, '0');
            if (secondsSpan) secondsSpan.textContent = String(seconds).padStart(2, '0');
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

        if (promoButton) promoButton.addEventListener('click', showPromoPopup);
        if (closePromoPopup) closePromoPopup.addEventListener('click', hidePromoPopup);
        promoPopup.addEventListener('click', e => { if (e.target === promoPopup) hidePromoPopup(); });

        if (promoCallToAction) {
            promoCallToAction.addEventListener('click', function(event) {
                event.preventDefault();
                const promoMessage = "Halo Moemtaz Group, saya tertarik dengan promo skincare yang sedang berlangsung!";
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(promoMessage)}`, '_blank');
                hidePromoPopup();
            });
        }
    }

    // --- 6. Animasi Cerita Moemtaz ---
    const storyHeadingElement = document.getElementById('story-heading');
    const storyContentElement = document.getElementById('story-content');

    if (storyHeadingElement && storyContentElement) {
        const headingText = "Cerita Moemtaz itu berawal dari...";
        const stories = [
            { year: "2017", text: "Moemtaz Group berdiri dengan fokus pada industri manufaktur dan layanan pengembangan bisnis." },
            { year: "2019", text: "Moemtaz Group mengembangkan bisnisnya sebagai trading company." },
            { year: "2023", text: "Moemtaz Group memutuskan untuk terlibat dengan program green sustainability, yang di mana juga berfokus pada manufaktur skincare dan obat-obatan, IT development, Agrobisnis dan ekspor-impor." }
        ];

        let i = 0;
        storyHeadingElement.innerHTML = "";

        function typeWriter() {
    if (i < headingText.length) {
        storyHeadingElement.innerHTML += headingText.charAt(i);
        i++;
        setTimeout(typeWriter, 90);
    } else {
        // Animasi selesai. Lakukan pembersihan:
        
        // 1. Hapus animasi agar tidak berjalan lagi
        storyHeadingElement.style.animation = 'none';
        
        // 2. Izinkan teks untuk wrap (pindah baris) secara alami
        storyHeadingElement.style.whiteSpace = 'normal';
        
        // 3. Hapus sisa border kanan (kursor)
        storyHeadingElement.style.borderRight = 'none';
        
        // 4. Atur ulang lebar agar sesuai dengan container
        storyHeadingElement.style.width = 'auto';

        // Mulai menampilkan cerita tahunan
        revealStories();
    }
}

        function revealStories() {
            stories.forEach((story, index) => {
                setTimeout(() => {
                    const yearElement = document.createElement('div');
                    yearElement.className = 'story-year';
                    yearElement.innerHTML = `<h4>${story.year}</h4><p>${story.text}</p>`;
                    storyContentElement.appendChild(yearElement);
                    setTimeout(() => yearElement.classList.add('visible'), 100);
                }, index * 800);
            });
        }

        typeWriter();
    }
});
