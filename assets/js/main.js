/* ============================================================
   MidnightRose v2 — main.js
   ============================================================ */

// Back to top button
function setupBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "回到頂部");
  btn.innerHTML = "&#8593;";
  document.body.appendChild(btn);

  const onScroll = () => {
    btn.classList.toggle("visible", window.scrollY > 320);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll reveal animation
function setupScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  els.forEach((el) => obs.observe(el));
}

// Count up stats
function setupCountUp() {
  const elements = document.querySelectorAll(".stat-num");
  if (!elements.length) return;

  const targets = new Map();
  elements.forEach((el) => {
    const match = el.textContent.trim().match(/(\d+)(\+?)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";
    targets.set(el, { target, suffix });
    el.textContent = "0" + suffix;
  });

  const animate = (el) => {
    const info = targets.get(el);
    if (!info) return;
    const { target, suffix } = info;
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
}

setupBackToTop();
setupScrollReveal();
setupCountUp();
