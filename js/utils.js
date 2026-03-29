/* ════════════════════════════════════════════════════
   COOL CAT // utils.js
   Funções utilitárias compartilhadas entre as páginas
════════════════════════════════════════════════════ */

/**
 * Exibe uma notificação toast na tela
 * @param {string} msg   - Mensagem a exibir
 * @param {string} tipo  - 'ok' | 'info' | 'err'
 */
function toast(msg, tipo = "ok") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const el = document.createElement("div");
  el.className = `toast ${tipo}`;
  el.textContent = msg;
  container.appendChild(el);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add("show"));
  });

  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, 3000);
}

/**
 * Efeito ripple em botões ao clicar
 * @param {MouseEvent} e
 */
function ripple(e) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const el   = document.createElement("span");

  el.className = "ripple-el";
  Object.assign(el.style, {
    width:  size + "px",
    height: size + "px",
    left:   (e.clientX - rect.left - size / 2) + "px",
    top:    (e.clientY - rect.top  - size / 2) + "px",
  });

  btn.style.position = "relative";
  btn.style.overflow = "hidden";
  btn.appendChild(el);
  setTimeout(() => el.remove(), 520);
}

/**
 * Formata valor em reais
 * @param {number} val
 * @returns {string} ex: "79,90"
 */
function formatarPreco(val) {
  return val.toFixed(2).replace(".", ",");
}
