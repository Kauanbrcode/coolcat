/* ════════════════════════════════════════════════════
   COOL CAT // troca.js
════════════════════════════════════════════════════ */

let produtoTrocaAtual = null;

function abrirTroca(id, e) {
  if (e) e.stopPropagation();

  const p = PRODUTOS.find(x => x.id === id);
  if (!p) return;

  produtoTrocaAtual = p;

  document.getElementById("trocaProdutoInfo").innerHTML = `
    <div class="troca-produto-nome">${p.nome}</div>
    <div class="troca-produto-preco">R$ ${formatarPreco(p.preco)} — você quer trocar por isso</div>
  `;

  // limpa campos anteriores
  ["trocaNome", "trocaContato", "trocaTipo", "trocaDesc"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  document.getElementById("modalTroca").classList.add("vis");
}

function fecharTroca() {
  document.getElementById("modalTroca").classList.remove("vis");
  produtoTrocaAtual = null;
}

function enviarTroca() {
  const nome    = document.getElementById("trocaNome").value.trim();
  const contato = document.getElementById("trocaContato").value.trim();
  const tipo    = document.getElementById("trocaTipo").value;
  const desc    = document.getElementById("trocaDesc").value.trim();

  if (!nome || !contato || !tipo || !desc) {
    toast("// preenche tudo parceiro pra propor a troca", "err");
    return;
  }

  fecharTroca();
  toast(`🔁 Troca proposta! Vamos entrar em contato, ${nome}.`, "ok");
}

/* ── EVENTOS ── */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("modalTroca")?.addEventListener("click", function(e) {
    if (e.target === this) fecharTroca();
  });
});
