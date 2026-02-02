// Music Control - Enhanced Version
let musicStarted = false;
let musicPlaying = false;

// Get audio element
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

// Set volume (0.0 to 1.0)
if (music) {
  music.volume = 0.7;
  
  // Handle audio events
  music.addEventListener('play', () => {
    musicPlaying = true;
    musicStarted = true;
    updateMusicButton();
  });
  
  music.addEventListener('pause', () => {
    musicPlaying = false;
    updateMusicButton();
  });
  
  music.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    musicBtn.innerHTML = '⚠️ Music Error';
    musicBtn.style.background = 'rgba(255, 0, 0, 0.7)';
  });
  
  music.addEventListener('canplaythrough', () => {
    console.log('Audio ready to play');
  });
}

function updateMusicButton() {
  if (!musicBtn) return;
  
  if (musicPlaying) {
    musicBtn.innerHTML = '🔇 Pause Music';
    musicBtn.style.background = 'rgba(255, 75, 125, 1)';
  } else {
    musicBtn.innerHTML = '🎵 Play Music';
    musicBtn.style.background = 'rgba(255, 75, 125, 0.9)';
  }
}

function toggleMusic() {
  if (!music) {
    alert('Audio element not found. Please check if music.mp3 exists.');
    return;
  }
  
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  if (!music) return;
  
  const playPromise = music.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Audio is playing
        musicPlaying = true;
        musicStarted = true;
        updateMusicButton();
        console.log('Music started playing');
      })
      .catch(error => {
        // Autoplay was prevented
        console.log('Playback failed:', error);
        musicBtn.innerHTML = '🎵 Click to Play';
        musicBtn.style.background = 'rgba(255, 200, 0, 0.9)';
        
        // Try again on next user interaction
        document.addEventListener('click', tryPlayMusic, { once: true });
      });
  }
}

function pauseMusic() {
  if (!music) return;
  music.pause();
  musicPlaying = false;
  updateMusicButton();
}

function tryPlayMusic() {
  if (music && music.paused) {
    playMusic();
  }
}

// Auto-play music on first user interaction (anywhere on page)
let interactionHandled = false;

function handleFirstInteraction() {
  if (!interactionHandled && !musicStarted) {
    interactionHandled = true;
    if (music && music.paused) {
      playMusic();
    }
  }
}

// Listen for various user interactions
document.addEventListener('click', handleFirstInteraction, { once: true });
document.addEventListener('touchstart', handleFirstInteraction, { once: true });
document.addEventListener('keydown', handleFirstInteraction, { once: true });

// Also try to play when page loads (might work in some browsers)
window.addEventListener('load', () => {
  setTimeout(() => {
    if (music && music.paused && !musicStarted) {
      // Try silent play first (some browsers allow this)
      music.play().catch(() => {
        // If that fails, wait for user interaction
        console.log('Waiting for user interaction to play music');
      });
    }
  }, 500);
});

// Scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  
  // Try to start music when user starts scrolling
  if (!musicStarted && music) {
    playMusic();
  }
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
  if (music && music.paused) {
    playMusic();
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
  
  // Try to play music after DOM is loaded
  setTimeout(() => {
    if (music && music.paused && !musicStarted) {
      playMusic();
    }
  }, 1000);
});
