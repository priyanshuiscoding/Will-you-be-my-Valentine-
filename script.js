function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function yesClicked() {
  document.getElementById("celebration").classList.remove("hidden");
  createHearts();
}

function createHearts() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.fontSize = "24px";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}
