/* ════════════════════════════════════════════════════
   COOL CAT // carrinho.js
════════════════════════════════════════════════════ */

let carrinho = JSON.parse(localStorage.getItem("cc_cart") || "[]");

/* ── PERSISTÊNCIA ── */
function salvarCarrinho() {
  localStorage.setItem("cc_cart", JSON.stringify(carrinho));
}

/* ── BADGE ── */
function atualizarBadge() {
  const total = carrinho.reduce((s, i) => s + i.qtd, 0);
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  badge.textContent = total;
  badge.classList.toggle("vis", total > 0);
}

/* ── AÇÕES ── */
function addCarrinho(id, e) {
  if (e) { e.stopPropagation(); ripple(e); }

  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;

  const existe = carrinho.find(i => i.id === id);
  if (existe) existe.qtd++;
  else carrinho.push({ ...p, qtd: 1 });

  salvarCarrinho();
  atualizarBadge();
  toast(`✔ ${p.nome} — adicionado disgrama!`, "soh");
}

function removerCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  salvarCarrinho();
  atualizarBadge();
  renderDrawer();
}

function mudarQtd(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) return removerCarrinho(id);
  salvarCarrinho();
  atualizarBadge();
  renderDrawer();
}

/* ── DRAWER ── */
function abrirCarrinho() {
  document.getElementById("modalCarrinho").classList.add("vis");
  renderDrawer();
}

function fecharCarrinho() {
  document.getElementById("modalCarrinho").classList.remove("vis");
}

function renderDrawer() {
  const items  = document.getElementById("drawerItems");
  const footer = document.getElementById("drawerFooter");

  if (!carrinho.length) {
    items.innerHTML = `
      <div class="drawer-vazio">
        <div class="drawer-vazio-ico">🛍</div>
        <div class="drawer-vazio-txt">Carrinho vazio, irmao,nao quer andar na estila.<br>Vai lá e escolhe uma peça disgrama!</div>
      </div>`;
    footer.innerHTML = "";
    return;
  }

  items.innerHTML = carrinho.map(i => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-nome">${i.nome}</div>
        <div class="cart-item-preco">R$ ${formatarPreco(i.preco * i.qtd)}</div>
        <div class="cart-item-ctrl">
          <button class="ctrl-btn" onclick="mudarQtd(${i.id}, -1)">−</button>
          <span class="ctrl-qtd">${i.qtd}</span>
          <button class="ctrl-btn" onclick="mudarQtd(${i.id}, 1)">+</button>
          <button class="btn-rm" onclick="removerCarrinho(${i.id})" title="Remover">✕</button>
        </div>
      </div>
    </div>
  `).join("");

  const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);
  footer.innerHTML = `
    <div class="drawer-total">
      <span class="drawer-total-label">Total</span>
      <span class="drawer-total-val">${formatarPreco(total)}</span>
    </div>
    <button class="btn-finalizar" onclick="finalizarCompra()">FINALIZAR COMPRA</button>
  `;
}

function finalizarCompra() {
  carrinho = [];
  salvarCarrinho();
  atualizarBadge();
  fecharCarrinho();
  toast("Essa disgrama ja foi feita,agora marca um 10 feyyy", "soh");
}

/* ── EVENTOS ── */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCarrinho")?.addEventListener("click", abrirCarrinho);
  document.getElementById("btnFecharCarrinho")?.addEventListener("click", fecharCarrinho);
  document.getElementById("modalCarrinho")?.addEventListener("click", function(e) {
    if (e.target === this) fecharCarrinho();
  });
  atualizarBadge();
});
