function initCoverflow(root){
  const cards = Array.from(root.querySelectorAll(".cf-card"));
  const btnL = root.querySelector(".cf-btn.left");
  const btnR = root.querySelector(".cf-btn.right");
  const dotsWrap = root.querySelector(".cf-dots");

  let current = 0;
  const n = cards.length;

  // build dots
  dotsWrap.innerHTML = "";
  const dots = cards.map((_, i) => {
    const d = document.createElement("span");
    d.className = "cf-dot" + (i === 0 ? " is-active" : "");
    d.addEventListener("click", () => {
      current = i;
      render();
    });
    dotsWrap.appendChild(d);
    return d;
  });

  function render(){
    cards.forEach(c => c.classList.remove("is-left","is-center","is-right"));
    const left = (current - 1 + n) % n;
    const right = (current + 1) % n;

    cards[left].classList.add("is-left");
    cards[current].classList.add("is-center");
    cards[right].classList.add("is-right");

    dots.forEach((d,i)=> d.classList.toggle("is-active", i === current));
  }

  function next(){
    current = (current + 1) % n;
    render();
  }
  function prev(){
    current = (current - 1 + n) % n;
    render();
  }

  btnL.addEventListener("click", prev);
  btnR.addEventListener("click", next);

  // hover to focus
  cards.forEach((card, i) => {
    card.addEventListener("mouseenter", () => {
      current = i;
      render();
    });
  });

  render();
}

document.querySelectorAll(".coverflow").forEach(initCoverflow);
