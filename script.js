// 1. Lógica para Abrir y Cerrar Sobres
function toggleEnvelope(id, btn) {
  const envelope = document.getElementById(id);
  const isOpen = envelope.classList.contains('open');
  
  if (isOpen) {
    envelope.classList.remove('open');
    btn.innerText = "Abrir Carta";
  } else {
    envelope.classList.add('open');
    btn.innerText = "Cerrar Carta";
  }
}

// 2. Lógica de Galería Apilada (Pila de Fotos)
let cards = ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8']; 

function updateStackPositions() {
  cards.forEach((id, index) => {
    const card = document.getElementById(id);
    card.classList.remove('swipe-out');
    
    // Asignar z-index y ligera rotación/escala para efecto 3D
    if (index === 0) {

      card.style.zIndex = '1';
      card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
      card.style.opacity = '1';
    } else if (index === 1) {

      card.style.zIndex = '2';
      card.style.transform = 'translateY(8px) scale(0.96) rotate(-3deg)';
      card.style.opacity = '1';
    } else if (index === 2){

      card.style.zIndex = '3';
      card.style.transform = 'translateY(16px) scale(0.92) rotate(3deg)';
      card.style.opacity = '1';
    } else if (index === 3){ 

      card.style.zIndex = '4';
      card.style.transform = 'translateY(8px) scale(0.88) rotate(-3deg)';
      card.style.opacity = '1';
    } else if (index === 4){

      card.style.zIndex = '5';
      card.style.transform = 'translateY(8px) scale(0.84) rotate(-3deg)';
      card.style.opacity = '1';
    } else if (index === 5){

      card.style.zIndex = '6';
      card.style.transform = 'translateY(8px) scale(0.80) rotate(-3deg)';
      card.style.opacity = '1';
    } else if (index === 6){

      card.style.zIndex = '7';
      card.style.transform = 'translateY(8px) scale(0.76) rotate(-3deg)';
      card.style.opacity = '1';
    } else{

      card.style.zIndex = '8';
      card.style.transform = 'translateY(8px) scale(0.72) rotate(-3deg)';
      card.style.opacity = '1';
    }
  });
}

function nextPhoto() {
  const topCardId = cards[0];
  const topCard = document.getElementById(topCardId);
  
  // Agregar clase para animación de deslizado
  topCard.classList.add('swipe-out');
  
  setTimeout(() => {
    // Mover la tarjeta superior al final de la pila
    const shifted = cards.shift();
    cards.push(shifted);
    
    // Actualizar posiciones visuales
    updateStackPositions();
  }, 300);
}

// Inicializar la pila al cargar
document.addEventListener('DOMContentLoaded', () => {
  updateStackPositions();
});

// 3. Sistema de Confeti en Javascript Puro
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfettiParticle() {
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#e11d48', '#ffedd5'];
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedY: Math.random() * 3 + 2,
    speedX: Math.random() * 2 - 1,
    rotation: Math.random() * 360,
    rotationSpeed: Math.random() * 10 - 5
  };
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confettiParticles.forEach((particle, index) => {
    particle.y += particle.speedY;
    particle.x += particle.speedX;
    particle.rotation += particle.rotationSpeed;

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.fillStyle = particle.color;
    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
    ctx.restore();

    if (particle.y > canvas.height) {
      confettiParticles[index] = createConfettiParticle();
      confettiParticles[index].y = -10;
    }
  });

  requestAnimationFrame(animateConfetti);
}

// 4. Lógica de la Sorpresa Final
function triggerSurprise() {
  confettiParticles = [];
  for (let i = 0; i < 80; i++) {
    confettiParticles.push(createConfettiParticle());
  }
  animateConfetti();

  const letter = document.getElementById('final-letter');
  letter.style.display = 'block';
  letter.scrollIntoView({ behavior: 'smooth' });
}
// Lógica para la música de fondo
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  if (!bgMusic) return;

  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      if (musicBtn) musicBtn.innerText = "🔊 Música: ON";
    }).catch(error => {
      console.error("Error al reproducir audio:", error);
      alert("Haz clic en cualquier parte de la página e intenta de nuevo.");
    });
  } else {
    bgMusic.pause();
    if (musicBtn) musicBtn.innerText = "🎵 Música: OFF";
  }
}

// Iniciar música automáticamente cuando presione el botón de "¡Celebrar!"
const originalTriggerSurprise = triggerSurprise;
triggerSurprise = function() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play();
    if (musicBtn) musicBtn.innerText = "🔊 Música: ON";
  }
  if (typeof originalTriggerSurprise === 'function') {
    originalTriggerSurprise();
  }
};