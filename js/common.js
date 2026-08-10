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

  // Verset de la semaine (espace enfants, roulement hebdomadaire)
  const versetSemaine = document.getElementById("versetSemaine");
  if (versetSemaine && typeof VERSETS_DU_JOUR !== "undefined") {
    const semaine = Math.floor(Date.now() / (7 * 86400000));
    const v = VERSETS_DU_JOUR[semaine % VERSETS_DU_JOUR.length];
    versetSemaine.textContent = "« " + v.texte + " » — " + v.ref;
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

  // Révélation douce au défilement (sans toucher au HTML)
  const reduit = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cibles = document.querySelectorAll(
    ".card, .histoire-card, .jeu-card, .lecture-card, .niveau-card, .step, .priere-card, .memory-zone"
  );
  if (!reduit && "IntersectionObserver" in window && cibles.length) {
    cibles.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 60 + "ms";
    });
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("vu");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    cibles.forEach(function (el) { obs.observe(el); });
  }
})();
