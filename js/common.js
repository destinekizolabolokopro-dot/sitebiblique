/* Comportements communs : menu mobile + verset du jour */

(function () {
  // Menu mobile
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Verset du jour (roulement selon le jour de l'année)
  const verseEl = document.getElementById("versetDuJour");
  const refEl = document.getElementById("versetRef");
  if (verseEl && refEl && typeof VERSETS_DU_JOUR !== "undefined") {
    const debut = new Date(new Date().getFullYear(), 0, 0);
    const jour = Math.floor((Date.now() - debut.getTime()) / 86400000);
    const v = VERSETS_DU_JOUR[jour % VERSETS_DU_JOUR.length];
    verseEl.textContent = "« " + v.texte + " »";
    refEl.textContent = v.ref;
  }

  // Bouton verset surprise (remplace le verset du héros par un verset au hasard)
  const btnSurprise = document.getElementById("btnVersetSurprise");
  if (btnSurprise && verseEl && refEl && typeof VERSETS_PAR_REF !== "undefined") {
    btnSurprise.addEventListener("click", function () {
      const cles = Object.keys(VERSETS_PAR_REF);
      const v = VERSETS_PAR_REF[cles[Math.floor(Math.random() * cles.length)]];
      verseEl.textContent = "« " + v.texte + " »";
      refEl.textContent = v.ref;
    });
  }

  // Prière du jour (roulement quotidien)
  const priereTexte = document.getElementById("priereTexte");
  if (priereTexte && typeof PRIERES !== "undefined") {
    const debut = new Date(new Date().getFullYear(), 0, 0);
    const jour = Math.floor((Date.now() - debut.getTime()) / 86400000);
    const p = PRIERES[jour % PRIERES.length];
    document.getElementById("priereTitre").textContent = p.titre;
    priereTexte.textContent = p.texte;
    document.getElementById("priereSource").textContent = p.source;
  }
})();
