async function loadComponent(id, file, fallbackVar) {
  const container = document.getElementById(id);
  if (!container) return;

  let loaded = false;
  try {
    const response = await fetch(file);
    if (response.ok) {
      const text = await response.text();
      if (text && text.trim()) {
        container.innerHTML = text;
        loaded = true;
      }
    }
  } catch (err) {
    // CORS error on file:// protocol
  }

  if (!loaded && fallbackVar) {
    container.innerHTML = fallbackVar;
  }
}

async function initSite() {
  await Promise.all([
    loadComponent("cabecera-container", "cabecera.html", window.CABECERA_HTML),
    loadComponent("piedepagina-container", "piedepagina.html", window.PIEDEPAGINA_HTML),
  ]);

  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");
  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (nav) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPath || (currentPath === "" && href === "index.html")) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}

const track = document.getElementById("carrusel-track");
const slides = document.querySelectorAll(".carrusel-slide");
const btnAnt = document.getElementById("btn-ant");
const btnSig = document.getElementById("btn-sig");

const totalImagenes = slides.length;
// 1. Clonamos el primer y último elemento
const primerClon = slides[0].cloneNode(true);
const ultimoClon = slides[totalImagenes - 1].cloneNode(true);

// 2. Los añadimos al track (el último al inicio, el primero al final)
track.appendChild(primerClon);
track.insertBefore(ultimoClon, slides[0]);

// Empezamos en el índice 1 porque el índice 0 ahora es el clon de la última foto
let indiceActual = 1; 

// Colocamos el carrusel en la primera imagen real inicialmente sin animación
track.style.transition = "none";
track.style.transform = `translateX(-${indiceActual * 100}%)`;

// Función principal para mover el carrusel con transición activa
function moverCarrusel() {
    track.style.transition = "transform 0.5s ease-in-out"; // Asegúrate de que coincida con tu CSS
    track.style.transform = `translateX(-${indiceActual * 100}%)`;
}

// 3. Controlamos el "salto invisible" cuando termina la animación de transición
track.addEventListener("transitionend", () => {
    // Si llegamos al clon del principio (después de la foto 10)
    if (indiceActual === totalImagenes + 1) {
        track.style.transition = "none";
        indiceActual = 1;
        track.style.transform = `translateX(-${indiceActual * 100}%)`;
    }
    // Si retrocedemos al clon del final (antes de la foto 1)
    if (indiceActual === 0) {
        track.style.transition = "none";
        indiceActual = totalImagenes;
        track.style.transform = `translateX(-${indiceActual * 100}%)`;
    }
});

function siguienteImagen() {
    // Evita que el usuario pulse repetidamente antes de terminar la animación
    if (indiceActual >= totalImagenes + 1) return; 
    indiceActual++;
    moverCarrusel();
}

function anteriorImagen() {
    if (indiceActual <= 0) return;
    indiceActual--;
    moverCarrusel();
}

// Temporizador automático
let intervaloAuto = setInterval(siguienteImagen, 3000);

function reiniciarIntervalo() {
    clearInterval(intervaloAuto);
    intervaloAuto = setInterval(siguienteImagen, 3000);
}

// Eventos de los botones
btnSig.addEventListener("click", () => {
    siguienteImagen();
    reiniciarIntervalo();
});

btnAnt.addEventListener("click", () => {
    anteriorImagen();
    reiniciarIntervalo();
});
