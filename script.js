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

// Cuberto Style Cursor & Magnetic Effects
const initCubertoCursor = () => {
  const cursor = document.getElementById("custom-cursor");
  const links = document.querySelectorAll("a, button, .magnetic");
  
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    // Smooth follow effect
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover states
  links.forEach(link => {
    link.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });
    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

    // Magnetic effect
    if (link.classList.contains("magnetic")) {
      link.addEventListener("mousemove", (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      link.addEventListener("mouseleave", () => {
        link.style.transform = `translate(0px, 0px)`;
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initTeamAccordion();
  initCubertoCursor();
});

