/* ==========================================================
   Jeu memory biblique pour enfants
   Retrouve les paires de symboles de la Bible !
   ========================================================== */

(function () {
  const grille = document.getElementById("memoryGrid");
  const coupsEl = document.getElementById("memoryCoups");
  const pairesEl = document.getElementById("memoryPaires");
  const bravoEl = document.getElementById("memoryBravo");
  const rejouer = document.getElementById("memoryRejouer");
  if (!grille) return;

  const SYMBOLES = ["✝️", "🕊️", "🐑", "🌈", "🐟", "🍞", "⭐", "📖"];
  let premiere = null;
  let verrou = false;
  let coups = 0;
  let paires = 0;

  function melanger(t) {
    const c = t.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function nouvellePartie() {
    premiere = null;
    verrou = false;
    coups = 0;
    paires = 0;
    coupsEl.textContent = "0";
    pairesEl.textContent = "0 / " + SYMBOLES.length;
    bravoEl.classList.remove("show");
    grille.innerHTML = "";

    melanger(SYMBOLES.concat(SYMBOLES)).forEach(function (symbole) {
      const carte = document.createElement("button");
      carte.className = "memory-card";
      carte.textContent = symbole;
      carte.setAttribute("aria-label", "Carte cachée");
      carte.addEventListener("click", function () { retourner(carte); });
      grille.appendChild(carte);
    });
  }

  function retourner(carte) {
    if (verrou || carte.classList.contains("retournee") || carte.classList.contains("trouvee")) return;
    carte.classList.add("retournee");

    if (!premiere) {
      premiere = carte;
      return;
    }

    coups++;
    coupsEl.textContent = String(coups);

    if (premiere.textContent === carte.textContent) {
      premiere.classList.add("trouvee");
      carte.classList.add("trouvee");
      premiere.classList.remove("retournee");
      carte.classList.remove("retournee");
      premiere = null;
      paires++;
      pairesEl.textContent = paires + " / " + SYMBOLES.length;
      if (paires === SYMBOLES.length) {
        bravoEl.textContent = "Bravo, tu as tout trouvé en " + coups + " coups ! « Cherchez, et vous trouverez » (Matthieu 7:7)";
        bravoEl.classList.add("show");
      }
    } else {
      verrou = true;
      const a = premiere, b = carte;
      premiere = null;
      setTimeout(function () {
        a.classList.remove("retournee");
        b.classList.remove("retournee");
        verrou = false;
      }, 850);
    }
  }

  rejouer.addEventListener("click", nouvellePartie);
  nouvellePartie();
})();
