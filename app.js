document.querySelectorAll(".rules").forEach((list) => {
  list.addEventListener("click", (e) => {
    const btn = e.target.closest(".rule button");
    if (!btn) return;

    const article = btn.parentElement;
    const isOpen = article.classList.contains("is-open");

    // Cierra todos los acordeones del contenedor actual
    list.querySelectorAll(".rule").forEach((rule) => {
      rule.classList.remove("is-open");
      const icon = rule.querySelector("span");
      if (icon) icon.textContent = "+";
    });

    // Si no estaba abierto, lo abre y cambia el símbolo
    if (!isOpen) {
      article.classList.add("is-open");
      const icon = article.querySelector("span");
      if (icon) icon.textContent = "−";
    }
  });
});

// Efecto hover para los acordeones: cambia entre "+" y "Mostrar info..."
document.querySelectorAll(".rule").forEach((article) => {
  article.addEventListener("mouseenter", () => {
    const span = article.querySelector("span");
    if (span && !article.classList.contains("is-open")) {
      span.textContent = "Mostrar info...";
    }
  });

  article.addEventListener("mouseleave", () => {
    const span = article.querySelector("span");
    if (span) {
      // Si el artículo está desplegado, mantiene el "-", sino vuelve al "+"
      if (!article.classList.contains("is-open")) {
        span.textContent = "+";
      }
    }
  });
});