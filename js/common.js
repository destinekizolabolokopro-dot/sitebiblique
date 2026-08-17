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

  // Petit message flottant (toast)
  function toast(message) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = message;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove("show"); }, 2200);
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

  // Copier / partager le verset affiché
  function versetActuel() {
    if (!verseEl || !refEl) return "";
    return verseEl.textContent.trim() + " — " + refEl.textContent.trim();
  }
  const btnCopier = document.getElementById("btnCopier");
  if (btnCopier) {
    btnCopier.addEventListener("click", function () {
      const texte = versetActuel();
      const fini = function () {
        btnCopier.classList.add("ok");
        toast("Verset copié !");
        setTimeout(function () { btnCopier.classList.remove("ok"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(fini, function () { toast("Copie impossible"); });
      } else {
        const zone = document.createElement("textarea");
        zone.value = texte; document.body.appendChild(zone); zone.select();
        try { document.execCommand("copy"); fini(); } catch (e) { toast("Copie impossible"); }
        document.body.removeChild(zone);
      }
    });
  }
  const btnPartager = document.getElementById("btnPartager");
  if (btnPartager) {
    btnPartager.addEventListener("click", function () {
      const texte = versetActuel();
      if (navigator.share) {
        navigator.share({ title: "Lumière Biblique", text: texte }).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(function () { toast("Verset copié — tu peux le coller partout !"); });
      } else {
        toast("Le partage n'est pas disponible ici");
      }
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

  // Bouton « retour en haut » (apparaît au défilement, sur toutes les pages)
  const topBtn = document.createElement("button");
  topBtn.className = "top-btn";
  topBtn.setAttribute("aria-label", "Retour en haut de la page");
  topBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(topBtn);
  window.addEventListener("scroll", function () {
    topBtn.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });

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
