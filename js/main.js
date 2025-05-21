// Kirim WhatsApp
document.addEventListener("DOMContentLoaded", function () {
  const whatsappBtn = document.getElementById("whatsappLink");

  const nomorWhatsApp = "6281220869603"; // Ganti dengan nomor WA kamu (format internasional, tanpa +)
  const pesanDefault = "Halo, saya tertarik dengan layanan Moemtaz.";

  whatsappBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const link = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesanDefault)}`;
    window.open(link, "_blank"); // Buka di tab baru
  });
});

// ========== Scroll to Top Button ==========
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (scrollTopBtn) {
    scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ========== AOS Init ==========
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
  });
});

// ========== Breakpoint Resize Detection ==========
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  if (w < 768) {
    console.log("Small screen (<768px)");
  } else if (w < 1024) {
    console.log("Medium screen");
  } else {
    console.log("Large screen");
  }
});
