/* ════════════════════════════════════════════════════
   COOL CAT // loja.js
════════════════════════════════════════════════════ */

let categoriaAtual = "tudo";

/* ── RENDER PRODUTOS ── */
function renderProdutos(lista) {
  const grid = document.getElementById("gridProdutos");

  if (!lista.length) {
    grid.innerHTML = `<p class="sem-resultado">// nenhum produto encontrado, parceiro</p>`;
    return;
  }

  grid.innerHTML = lista.map((p, i) => `
    <div class="card-produto" style="animation-delay:${i * 0.06}s">
      <div class="card-img" onclick="abrirProduto(${p.id})">
        <div class="card-img-txt">${p.emoji}</div>
        <div class="card-badge-cat">${p.cat}</div>
      </div>
      <div class="card-corpo">
        <div class="card-nome">${p.nome}</div>
        <div class="card-desc">${p.desc.substring(0, 60)}...</div>
        <div class="card-preco">${formatarPreco(p.preco)}</div>
        <div class="card-acoes">
          <button class="btn-comprar" onclick="addCarrinho(${p.id}, event)">Comprar</button>
          <button class="btn-trocar"  onclick="abrirTroca(${p.id}, event)">Trocar</button>
        </div>
      </div>
    </div>
  `).join("");
}

/* ── FILTRO POR CATEGORIA ── */
function filtrarCategoria(cat, btnEl) {
  categoriaAtual = cat;

  // atualiza botões de filtro
  document.querySelectorAll(".btn-filtro").forEach(b => b.classList.remove("ativo"));
  if (btnEl) btnEl.classList.add("ativo");

  // atualiza nav da sidebar
  document.querySelectorAll(".sidebar-nav a").forEach(a => a.classList.remove("ativo"));

  // label da seção
  const label = document.getElementById("secaoLabel");
  if (label) label.textContent = cat === "tudo" ? "// todos os produtos" : `// ${cat}s`;

  aplicarFiltros();
  fecharSidebar();
}

/* ── BUSCA ── */
function aplicarFiltros() {
  const termo = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
  let lista = categoriaAtual === "tudo" ? PRODUTOS : PRODUTOS.filter(p => p.cat === categoriaAtual);
  if (termo) lista = lista.filter(p => (p.nome + p.desc + p.cat).toLowerCase().includes(termo));
  renderProdutos(lista);
}

/* ── MODAL PRODUTO ── */
function abrirProduto(id) {
  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;

  document.getElementById("modalProdConteudo").innerHTML = `
    <div class="modal-prod-img">
      <div class="modal-prod-img-txt">${p.emoji}</div>
    </div>
    <div class="modal-prod-header">
      <div class="modal-prod-titulo">${p.nome}</div>
      <button class="btn-fechar-prod" onclick="fecharProduto()">✕</button>
    </div>
    <div class="modal-prod-body">
      <div class="modal-prod-preco">${formatarPreco(p.preco)}</div>
      <div class="modal-prod-cat">Categoria <span>${p.cat}</span></div>
      <div class="modal-prod-desc">${p.desc}</div>
      <div class="modal-prod-acoes">
        <button class="btn-comprar" onclick="addCarrinho(${p.id}); fecharProduto()">Comprar</button>
        <button class="btn-trocar"  onclick="fecharProduto(); abrirTroca(${p.id})">Trocar</button>
      </div>
    </div>
  `;

  document.getElementById("modalProduto").classList.add("vis");
}

function fecharProduto() {
  document.getElementById("modalProduto").classList.remove("vis");
}

/* ── SIDEBAR ── */
function abrirSidebar() {
  document.getElementById("sidebar").classList.add("aberto");
  document.getElementById("overlay").classList.add("vis");
}

function fecharSidebar() {
  document.getElementById("sidebar").classList.remove("aberto");
  document.getElementById("overlay").classList.remove("vis");
}

/* ── LOGOUT ── */
function logout() {
  sessionStorage.removeItem("cc_user");
  window.location.href = "../index.html";
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  // pega usuário da sessão
  const user = sessionStorage.getItem("cc_user") || "Parceiro";
  const sidebarUser = document.getElementById("sidebarUser");
  if (sidebarUser) sidebarUser.textContent = user;

  // eventos
  document.getElementById("btnMenu")?.addEventListener("click", abrirSidebar);
  document.getElementById("overlay")?.addEventListener("click", fecharSidebar);
  document.getElementById("searchInput")?.addEventListener("input", aplicarFiltros);
  document.getElementById("modalProduto")?.addEventListener("click", function(e) {
    if (e.target === this) fecharProduto();
  });

  // render inicial
  renderProdutos(PRODUTOS);

  console.log(
    "%c COOL CAT // Disgrama v2 \n%c Das quebradas pro mundo. Rouba não potoca.",
    "background:#cc1111;color:#fff;font-weight:bold;padding:4px 10px;font-size:14px;",
    "color:#666;font-size:11px;"
  );
});
