const header = document.querySelector("[data-header]");
const parallaxScopes = document.querySelectorAll("[data-parallax-scope]");
const rail = document.querySelector("[data-rail]");
const simpleParallaxGroups = document.querySelectorAll("[data-simple-parallax]");

const setHeaderState = () => {
  header?.classList.toggle("is-compact", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

parallaxScopes.forEach((scope) => {
  scope.addEventListener("pointermove", (event) => {
    const rect = scope.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 28;
    scope.style.setProperty("--mx", `${x}px`);
    scope.style.setProperty("--my", `${y}px`);
  });

  scope.addEventListener("pointerleave", () => {
    scope.style.setProperty("--mx", "0px");
    scope.style.setProperty("--my", "0px");
  });
});

const updateRail = () => {
  if (!rail) return;
  const rect = rail.getBoundingClientRect();
  const viewport = window.innerHeight || 1;
  const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)));
  const cards = rail.querySelectorAll(".orbit-card");

  cards.forEach((card) => {
    const shift = Number(card.dataset.shift || 0);
    const wave = Math.sin((progress * 1.75 + shift / 42) * Math.PI);
    card.style.setProperty("--float-y", `${Math.round(wave * 24)}px`);
    card.style.setProperty("--tilt-y", `${shift * -0.72}deg`);
    card.style.setProperty("--tilt-z", `${shift * 0.06}deg`);
  });
};

updateRail();
window.addEventListener("scroll", updateRail, { passive: true });
window.addEventListener("resize", updateRail);

const updateSimpleParallax = () => {
  simpleParallaxGroups.forEach((group) => {
    const rect = group.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const centerOffset = (rect.top + rect.height / 2 - viewport / 2) / viewport;

    group.querySelectorAll("[data-depth]").forEach((item) => {
      const depth = Number(item.dataset.depth || 0);
      const y = Math.round(centerOffset * depth * 2.4);
      item.style.setProperty("--parallax-y", `${y}px`);
    });
  });
};

updateSimpleParallax();
window.addEventListener("scroll", updateSimpleParallax, { passive: true });
window.addEventListener("resize", updateSimpleParallax);

// Cuberto Reproduction JS
const initCuberto = () => {
  // 1. Mouse Follower (Cursor)
  const cursor = document.getElementById('cb-cursor');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    gsap.set(cursor, { x: cursorX, y: cursorY });
  });

  // 2. Magnetic Elements
  const magneticElements = document.querySelectorAll('[data-magnetic]');
  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

  // 3. Cursor Hover Effect
  const interactive = document.querySelectorAll('a, button, .cb-menu-toggle, [data-magnetic]');
  interactive.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // 4. Hero Reveal Animation
  gsap.to('.cb-hero-line span', {
    y: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.5
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initCuberto();
  initTeamAccordion(); // Keeping existing logic if needed
});

