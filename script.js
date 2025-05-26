// Manipulação do texto primário "DIOGO ALMEIDA"
const title = document.querySelector('.headerText');
const text = title.textContent.trim();
const words = text.split(' ');
title.innerHTML = '';

words.forEach((word, wordIndex) => {
  word.split('').forEach(char => {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = char;
    span.dataset.originalChar = char;
    title.appendChild(span);
  });

  if (wordIndex < words.length - 1) {
    const spaceSpan = document.createElement('span');
    spaceSpan.classList.add('word-space');
    spaceSpan.innerHTML = ' ';
    title.appendChild(spaceSpan);
  }
});

// Função para animar o texto primário e o subtítulo
const animateText = () => {
  const spans = document.querySelectorAll('.char');
  const subtitle = document.querySelector('.subtitle');
  const tl = gsap.timeline({ repeat: 0 });

  tl.from(spans, {
    opacity: 0,
    y: -20,
    scale: 0.8,
    filter: "blur(5px)",
    duration: 1.2,
    stagger: {
      each: 0.1,
      from: "start"
    },
    ease: "power2.out"
  });

  spans.forEach((span, i) => {
    tl.to(span, {
      duration: 0.4,
      onStart: () => {
        let iterations = 0;
        const interval = setInterval(() => {
          span.textContent = Math.random().toString(36).charAt(2).toUpperCase();
          iterations++;
          if (iterations > 5) {
            clearInterval(interval);
            span.textContent = span.dataset.originalChar;
          }
        }, 50);
      }
    }, i * 0.1);
  });

  tl.to(subtitle, {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    duration: 1,
    ease: "power2.out"
  }, "+=0.5");
};

// Animação dos ícones de redes sociais
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  const socialIcons = document.querySelectorAll(".social-icon");
  socialIcons.forEach(icon => {
    setTimeout(() => {
      icon.classList.add("visible");
    }, 500);
  });
});

// Ajustar a altura da .background para cobrir toda a página
window.addEventListener('load', adjustBackgroundHeight);
window.addEventListener('resize', adjustBackgroundHeight);

function adjustBackgroundHeight() {
  const background = document.querySelector('.background');
  const bodyHeight = document.body.scrollHeight;
  background.style.height = `${bodyHeight}px`;
}

// Iniciar a animação do texto primário
animateText();

const hamburgerMenu = document.querySelector('.hamburger-menu');
const navbarUl = document.querySelector('.navbar ul');
const navLinks = document.querySelectorAll('.nav-a'); // Seleciona todos os links de navegação

hamburgerMenu.addEventListener('click', () => {
    navbarUl.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link (opcional, mas bom para UX)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarUl.classList.remove('active');
        hamburgerMenu.classList.remove('active');
    });
});