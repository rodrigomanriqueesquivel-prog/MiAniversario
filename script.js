// CARGAR ARBOL (RUTA CORREGIDA)
fetch('treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));

    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = `stroke-dashoffset 1.2s ${i * 0.08}s`;
        path.style.strokeDashoffset = 0;

        setTimeout(() => {
          path.style.fillOpacity = '1';
        }, 1200 + i * 80);
      });

      setTimeout(() => {
        svg.classList.add('move-and-scale');

        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          showCountdown();
          playBackgroundMusic();
        }, 1200);

      }, 2000);

    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });

    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  });


// ✨ TEXTO RESUMIDO
function showDedicationText() {
  const text = `Para ti, mi niña ❤️

Desde que llegaste, todo en mí cambió.
Mi vida se llenó de momentos hermosos contigo.

Hemos pasado mucho juntos,
y cada recuerdo a tu lado lo guardo con amor.

Gracias por este año tan especial,
por quedarte conmigo y hacerme feliz.

Te amo muchísimo mi amor
Feliz Aniversario❤️`;

  const container = document.getElementById('dedication-text');
  container.classList.add('typing');

  let i = 0;

  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 40);
    } else {
      setTimeout(showSignature, 600);
    }
  }

  type();
}


// FIRMA PERSONALIZADA
function showSignature() {
  const dedication = document.getElementById('dedication-text');

  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }

  signature.textContent = "Con amor, Sebastián ❤️";
  signature.classList.add('visible');
}


// PETALOS
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');

  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';

    el.style.left = `${Math.random() * 90}%`;
    el.style.top = `100%`;

    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;

    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear`;
      el.style.transform = `translateY(-110vh)`;
    }, 30);

    setTimeout(() => {
      el.remove();
    }, duration + 2000);

    setTimeout(spawn, 400);
  }

  spawn();
}


// ❤️ CONTADOR FIJO 365
function showCountdown() {
  const container = document.getElementById('countdown');

  container.innerHTML = `Nuestro amor: <b>365 días ❤️</b>`;
  container.classList.add('visible');
}


// 🔊 MÚSICA AUTOMÁTICA
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');

  audio.volume = 0.7;
  audio.loop = true;

  // intenta reproducir automáticamente
  audio.play().catch(() => {
    // si chrome bloquea, se activa al primer clic
    document.body.addEventListener('click', () => {
      audio.play();
    }, { once: true });
  });
}


// AUTO PLAY
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});