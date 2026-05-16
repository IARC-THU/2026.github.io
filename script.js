const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

const closeNav = () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      closeNav();
    }
  });
});

const imageFallbacks = document.querySelectorAll("img[data-fallback]");
imageFallbacks.forEach((img) => {
  img.addEventListener("error", () => {
    const fallback = img.dataset.fallback;
    if (fallback && img.src !== fallback) {
      img.src = fallback;
    }
  });
});

// Scroll reveal animation
const revealTargets = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealTargets.forEach((target) => revealObserver.observe(target));

// Animated statistics counters
const statCounters = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      let current = 0;
      const duration = 1800;
      const step = Math.max(1, Math.floor(target / 90));
      const increment = () => {
        current += step;
        if (current >= target) {
          el.textContent = `${target.toLocaleString()}${suffix}`;
          return;
        }
        el.textContent = `${current.toLocaleString()}${suffix}`;
        requestAnimationFrame(increment);
      };

      const startTime = performance.now();
      const animate = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = `${value.toLocaleString()}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = `${target.toLocaleString()}${suffix}`;
        }
      };

      if (target > 1000) {
        requestAnimationFrame(animate);
      } else {
        requestAnimationFrame(increment);
      }

      statsObserver.unobserve(el);
    });
  },
  {
    threshold: 0.4,
  }
);

statCounters.forEach((counter) => statsObserver.observe(counter));

// Ensure nav closes on resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeNav();
  }
});
