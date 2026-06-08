const loader = document.querySelector(".loader");
const loaderWrap = document.querySelector(".loader-wrap");
const loaderButton = document.querySelector(".loader-button");
const loaderButtonText = document.querySelector(".loader-button-text");
const loaderCount = document.querySelector(".loader__count");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const cursorGlow = document.querySelector(".cursor-glow");

// Loading progress counter
let progress = 0;
const loaderTimer = window.setInterval(() => {
  progress += Math.ceil(Math.random() * 8);
  if (progress >= 100) {
    progress = 100;
    window.clearInterval(loaderTimer);
    
    // Once loaded, enable click to enter
    if (loaderButton) {
      loaderButton.removeAttribute("disabled");
    }
    if (loaderButtonText) {
      loaderButtonText.textContent = "ENTRAR";
    }
  }

  if (loaderCount) {
    loaderCount.textContent = `${progress}%`;
  }
}, 50);

// Click-to-enter expanding circle transition
if (loaderButton && loaderWrap) {
  loaderButton.addEventListener("click", () => {
    loaderWrap.classList.add("loading-clicked");
    window.setTimeout(() => {
      loader?.classList.add("is-hidden");
    }, 850);
  });

  // Hover glow effect following pointer inside the loader pill
  loaderButton.addEventListener("pointermove", (event) => {
    const rect = loaderButton.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    loaderWrap.style.setProperty("--mouse-x", `${x}px`);
    loaderWrap.style.setProperty("--mouse-y", `${y}px`);
  });
}

// Menu toggle logic
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

// Scroll reveal animations using Intersection Observer
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

// Smooth cursor glow trailer (lerp effect)
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  let isMoving = false;

  document.addEventListener("pointermove", (event) => {
    if (!isMoving) {
      cursorGlow.style.opacity = "1";
      isMoving = true;
    }
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
    isMoving = false;
  });

  function updateGlow() {
    // Smooth trailing interpolation
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
}

// Scroll-driven avatar rotation with smooth interpolation
const avatarContainer = document.querySelector(".hero__avatar");
if (avatarContainer) {
  let scrollY = 0;
  let currentRotation = 0;

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function smoothRotate() {
    // Lerping for smooth easing in and out when scrolling stops
    currentRotation += (scrollY - currentRotation) * 0.08;
    avatarContainer.style.setProperty("--scroll-rotation", currentRotation.toFixed(2));
    requestAnimationFrame(smoothRotate);
  }
  smoothRotate();
}
