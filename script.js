document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menu = document.querySelector("[data-menu-panel]");
  const openBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");

  function openMenu(){
    if(!menu) return;
    menu.classList.add("active");
    body.classList.add("menu-open");
    openBtn?.setAttribute("aria-expanded","true");
  }
  function closeMenu(){
    if(!menu) return;
    menu.classList.remove("active");
    body.classList.remove("menu-open");
    openBtn?.setAttribute("aria-expanded","false");
  }

  openBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  menu?.addEventListener("click", (e) => {
    if(e.target === menu || e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeMenu();
  });

  // Мягкая прокрутка по якорям с поправкой на фиксированное меню
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if(!href || href === "#") return;
      const target = document.querySelector(href);
      if(!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((el) => io.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("show"));
  }

  const topBtn = document.querySelector("[data-to-top]");
  function toggleTop(){
    if(!topBtn) return;
    topBtn.classList.toggle("visible", window.scrollY > 650);
  }
  toggleTop();
  window.addEventListener("scroll", toggleTop, { passive:true });
  topBtn?.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
});