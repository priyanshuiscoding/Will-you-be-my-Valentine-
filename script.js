// Music Control
let musicStarted = false;

function playMusic() {
  const music = document.getElementById('bgMusic');
  const control = document.getElementById('musicControl');
  
  if (music.paused) {
    music.play().then(() => {
      musicStarted = true;
      control.innerHTML = '<button onclick="pauseMusic()">🔇 Pause Music</button>';
    }).catch(err => {
      console.log('Autoplay prevented:', err);
      alert('Click anywhere on the page to start music!');
    });
  }
}

function pauseMusic() {
  const music = document.getElementById('bgMusic');
  const control = document.getElementById('musicControl');
  music.pause();
  control.innerHTML = '<button onclick="playMusic()">🎵 Play Music</button>';
}

// Auto-play music on first user interaction
document.addEventListener('click', function() {
  if (!musicStarted) {
    const music = document.getElementById('bgMusic');
    music.play().then(() => {
      musicStarted = true;
      document.getElementById('musicControl').innerHTML = '<button onclick="pauseMusic()">🔇 Pause Music</button>';
    }).catch(() => {
      // Music will play when user clicks play button
    });
  }
}, { once: true });

// Scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Yes button clicked
function yesClicked() {
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");
  celebration.style.display = "flex";
  
  // Create hearts animation
  createHearts();
  
  // Create continuous hearts
  setInterval(() => {
    createFloatingHeart();
  }, 300);
  
  // Ensure music is playing
  const music = document.getElementById('bgMusic');
  if (music.paused) {
    music.play();
  }
}

// Create hearts explosion
function createHearts() {
  const hearts = ['❤️', '💖', '💕', '💗', '💝', '💞', '💓', '💘'];
  
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = Math.random() * 100 + "vh";
      heart.style.fontSize = Math.random() * 30 + 20 + "px";
      heart.style.zIndex = "10000";
      heart.style.pointerEvents = "none";
      heart.style.animation = `heartFloatUp ${2 + Math.random() * 2}s ease-out forwards`;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 4000);
    }, i * 20);
  }
}

// Create single floating heart
function createFloatingHeart() {
  const hearts = ['❤️', '💖', '💕', '💗'];
  const heart = document.createElement("div");
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.zIndex = "10000";
  heart.style.pointerEvents = "none";
  heart.style.animation = `heartFloatUp ${3 + Math.random() * 2}s ease-out forwards`;
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
  @keyframes heartFloatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    observer.observe(section);
  });
});
