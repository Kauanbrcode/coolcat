/* ════════════════════════════════════════════════════
   COOL CAT // login.js
════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const btnLogin  = document.getElementById("btnLogin");
  const inputSenha = document.getElementById("inputSenha");

  btnLogin.addEventListener("click", fazerLogin);
  inputSenha.addEventListener("keydown", e => {
    if (e.key === "Enter") fazerLogin();
  });
});

function fazerLogin() {
  const email = document.getElementById("inputEmail").value.trim();
  const senha = document.getElementById("inputSenha").value.trim();
  const erro  = document.getElementById("loginErro");

  if (!email || !senha) {
    erro.style.display = "block";
    erro.textContent   = "// preenche tudo parceiro";
    return;
  }

  // Salva o usuário na sessão e redireciona para a loja
  const nomeUsuario = email.split("@")[0];
  sessionStorage.setItem("cc_user", nomeUsuario);

  erro.style.display = "none";
  window.location.href = "pages/loja.html";
}
