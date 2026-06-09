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

// Team Horizontal/Vertical Accordion Interaction
const initTeamAccordion = () => {
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length === 0) return;

  accordionItems.forEach((item) => {
    // Desktop hover interaction
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        accordionItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }
    });

    // Mobile click interaction
    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (!item.classList.contains("active")) {
          e.preventDefault(); // Stop navigation
          accordionItems.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");
        }
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", initTeamAccordion);
initTeamAccordion(); // Call immediately in case DOMContentLoaded has already fired

