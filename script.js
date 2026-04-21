const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const typingText = document.getElementById("typingText");

const onScrollNavbar = () => {
  if (window.scrollY > 14) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

onScrollNavbar();
window.addEventListener("scroll", onScrollNavbar, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const typingPhrases = [
  "Monitorando ambientes críticos com precisão operacional.",
  "Correlacionando alertas, incidentes e sinais de degradação.",
  "Evoluindo de Infraestrutura para Cloud e Cybersecurity.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentPhrase.slice(0, charIndex);

  let speed = isDeleting ? 38 : 62;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    speed = 420;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();