/* ==========================================================
   Messe du dimanche — lectures liturgiques
   Source : API publique de l'AELF (Association Épiscopale
   Liturgique pour les pays Francophones) — api.aelf.org
   ========================================================== */

(function () {
  const dateInput = document.getElementById("dateMesse");
  const titreEl = document.getElementById("messeDateTitle");
  const liturgieEl = document.getElementById("messeLiturgie");
  const contenuEl = document.getElementById("messeContenu");
  const btnPrec = document.getElementById("dimanchePrec");
  const btnSuiv = document.getElementById("dimancheSuiv");

  const LIBELLES = {
    lecture_1: "Première lecture",
    psaume: "Psaume",
    cantique: "Cantique",
    lecture_2: "Deuxième lecture",
    lecture_3: "Troisième lecture",
    evangile: "Évangile",
    sequence: "Séquence",
  };

  const ORDRE = ["lecture_1", "psaume", "cantique", "lecture_2", "lecture_3", "sequence", "evangile"];

  function formatISO(d) {
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const j = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + j;
  }

  function prochainDimanche(depuis) {
    const d = new Date(depuis);
    const decalage = (7 - d.getDay()) % 7; // 0 si déjà dimanche
    d.setDate(d.getDate() + decalage);
    return d;
  }

  function formatFrancais(d) {
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function majTitre(d) {
    const t = formatFrancais(d);
    titreEl.textContent = t.charAt(0).toUpperCase() + t.slice(1);
  }

  function nettoyerHTML(html) {
    // L'API AELF renvoie du HTML simple (paragraphes) : on ne garde
    // que des balises inoffensives en reconstruisant le contenu.
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    return doc.body.textContent || "";
  }

  function carteLecture(type, lecture) {
    const carte = document.createElement("article");
    carte.className = "lecture-card";

    const tete = document.createElement("div");
    tete.className = "lecture-head";
    const h3 = document.createElement("h3");
    h3.textContent = LIBELLES[type] || lecture.titre || type;
    const refSpan = document.createElement("span");
    refSpan.className = "lecture-ref";
    refSpan.textContent = lecture.ref || "";
    tete.appendChild(h3);
    tete.appendChild(refSpan);

    const corps = document.createElement("div");
    corps.className = "lecture-body";

    if (lecture.intro_lue) {
      const intro = document.createElement("p");
      intro.innerHTML = "<em>" + nettoyerHTML(lecture.intro_lue) + "</em>";
      corps.appendChild(intro);
    }

    const texte = nettoyerHTML(lecture.contenu);
    texte.split(/\n+/).forEach(function (par) {
      if (!par.trim()) return;
      const p = document.createElement("p");
      p.textContent = par.trim();
      corps.appendChild(p);
    });

    tete.addEventListener("click", function () {
      corps.style.display = corps.style.display === "none" ? "block" : "none";
    });

    carte.appendChild(tete);
    carte.appendChild(corps);
    return carte;
  }

  async function chargerLectures(d) {
    majTitre(d);
    liturgieEl.textContent = "";
    contenuEl.innerHTML = '<p class="messe-status">Chargement des lectures…</p>';

    const iso = formatISO(d);
    try {
      const rep = await fetch("https://api.aelf.org/v1/messes/" + iso + "/france");
      if (!rep.ok) throw new Error("HTTP " + rep.status);
      const data = await rep.json();

      const messe = (data.messes && data.messes[0]) || null;
      if (!messe || !messe.lectures || !messe.lectures.length) throw new Error("Aucune lecture");

      if (data.informations && data.informations.ligne1) {
        liturgieEl.textContent = data.informations.ligne1 + (data.informations.ligne2 ? " — " + data.informations.ligne2 : "");
      }

      const wrap = document.createElement("div");
      wrap.className = "lectures";

      // On trie les lectures selon l'ordre liturgique
      const lectures = messe.lectures.slice().sort(function (a, b) {
        const ia = ORDRE.indexOf(a.type), ib = ORDRE.indexOf(b.type);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      });

      lectures.forEach(function (lecture) {
        wrap.appendChild(carteLecture(lecture.type, lecture));
      });

      contenuEl.innerHTML = "";
      contenuEl.appendChild(wrap);
    } catch (e) {
      contenuEl.innerHTML =
        '<p class="messe-status">Impossible de charger les lectures pour cette date (connexion internet requise).<br>' +
        'Vous pouvez consulter directement les lectures du jour sur le site officiel : ' +
        '<a href="https://www.aelf.org/' + iso + '/romain/messe" target="_blank" rel="noopener">aelf.org</a> 🙏</p>';
    }
  }

  function allerAuDimanche(base, decalageJours) {
    const d = new Date(base);
    d.setDate(d.getDate() + decalageJours);
    return prochainDimanche(d);
  }

  // ---------- Initialisation ----------

  let dateCourante = prochainDimanche(new Date());
  dateInput.value = formatISO(dateCourante);
  chargerLectures(dateCourante);

  dateInput.addEventListener("change", function () {
    if (!dateInput.value) return;
    dateCourante = new Date(dateInput.value + "T12:00:00");
    chargerLectures(dateCourante);
  });

  btnPrec.addEventListener("click", function () {
    dateCourante.setDate(dateCourante.getDate() - 7);
    dateInput.value = formatISO(dateCourante);
    chargerLectures(dateCourante);
  });

  btnSuiv.addEventListener("click", function () {
    dateCourante.setDate(dateCourante.getDate() + 7);
    dateInput.value = formatISO(dateCourante);
    chargerLectures(dateCourante);
  });
})();
