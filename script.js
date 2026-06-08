const loader = document.querySelector(".loader");
const loaderCount = document.querySelector(".loader__count");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const cursorGlow = document.querySelector(".cursor-glow");

let progress = 0;
const loaderTimer = window.setInterval(() => {
  progress += Math.ceil(Math.random() * 14);
  if (progress >= 100) {
    progress = 100;
    window.clearInterval(loaderTimer);
    window.setTimeout(() => {
      loader?.classList.add("is-hidden");
    }, 260);
  }

  if (loaderCount) {
    loaderCount.textContent = `${progress}%`;
  }
}, 80);

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => {
  revealObserver.observe(element);
});

if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}
