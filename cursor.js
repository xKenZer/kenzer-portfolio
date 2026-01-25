const cursor = document.querySelector(".cursor");
const hoverSelectors = "a, button, .cf-card, .btn, .social";

let mx = -999, my = -999;
let x = -999, y = -999;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

function tick(){
  x += (mx - x) * 0.22;
  y += (my - y) * 0.22;
  cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  requestAnimationFrame(tick);
}
tick();

document.addEventListener("mouseover", (e) => {
  if (e.target.closest(hoverSelectors)) cursor.classList.add("is-hover");
});
document.addEventListener("mouseout", (e) => {
  if (e.target.closest(hoverSelectors)) cursor.classList.remove("is-hover");
});

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links){
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}
