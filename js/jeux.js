/* ==========================================================
   Ludothèque biblique — moteur des jeux pour enfants
   Chaque jeu s'affiche dans #jeuContenu.
   ========================================================== */

(function () {
  const grille = document.getElementById("jeuxGrid");
  const zone = document.getElementById("jeuZone");
  const contenu = document.getElementById("jeuContenu");
  const btnRetour = document.getElementById("jeuRetour");
  if (!grille) return;

  function melanger(t) {
    const c = t.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function el(html) {
    const d = document.createElement("div");
    d.innerHTML = html;
    return d.firstElementChild;
  }

  function ouvrir(nomJeu) {
    grille.style.display = "none";
    zone.style.display = "block";
    contenu.innerHTML = "";
    JEUX[nomJeu]();
    zone.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function fermer() {
    zone.style.display = "none";
    grille.style.display = "grid";
    contenu.innerHTML = "";
    grille.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ============ JEU 1 : Vrai ou Faux ============
  function jeuVraiFaux() {
    let questions = melanger(JEU_VRAIFAUX);
    let i = 0, score = 0;

    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    function afficher() {
      const q = questions[i];
      wrap.innerHTML =
        '<div class="jeu-progress">Question ' + (i + 1) + " / " + questions.length + ' · Score : ' + score + '</div>' +
        '<h3 class="jeu-question">' + q.phrase + '</h3>' +
        '<div class="jeu-boutons">' +
        '<button class="btn btn-primary" data-rep="vrai">✅ Vrai</button>' +
        '<button class="btn btn-secondary" data-rep="faux">❌ Faux</button>' +
        '</div>' +
        '<div class="jeu-feedback"></div>' +
        '<div class="jeu-suivant"></div>';

      const feedback = wrap.querySelector(".jeu-feedback");
      const suivant = wrap.querySelector(".jeu-suivant");

      wrap.querySelectorAll("[data-rep]").forEach(function (b) {
        b.addEventListener("click", function () {
          const bon = (b.dataset.rep === "vrai") === q.vrai;
          wrap.querySelectorAll("[data-rep]").forEach(function (x) { x.disabled = true; });
          if (bon) { score++; feedback.className = "jeu-feedback show ok"; feedback.textContent = "Bravo ! " + q.expl; }
          else { feedback.className = "jeu-feedback show ko"; feedback.textContent = "Raté… " + q.expl; }
          const btn = el('<button class="btn btn-primary btn-small">' + (i + 1 < questions.length ? "Suivant →" : "Mon résultat 🏆") + '</button>');
          btn.addEventListener("click", function () { i++; i < questions.length ? afficher() : resultat(); });
          suivant.appendChild(btn);
        });
      });
    }

    function resultat() {
      wrap.innerHTML = resultatHTML(score, questions.length, "Vrai ou Faux", jeuVraiFaux);
      brancherRejouer(wrap, jeuVraiFaux);
    }

    afficher();
  }

  // ============ JEU 2 : Devine le personnage ============
  function jeuPersonnage() {
    let questions = melanger(JEU_PERSONNAGE);
    let i = 0, score = 0;

    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    function afficher() {
      const q = questions[i];
      // 4 propositions : la bonne + 3 autres au hasard
      const autres = melanger(JEU_PERSONNAGE.filter(function (x) { return x.reponse !== q.reponse; })).slice(0, 3).map(function (x) { return x.reponse; });
      const props = melanger(autres.concat([q.reponse]));
      let indiceMontres = 1;

      function rendre() {
        wrap.innerHTML =
          '<div class="jeu-progress">Personnage ' + (i + 1) + " / " + questions.length + ' · Score : ' + score + '</div>' +
          '<h3 class="jeu-question">Qui suis-je ?</h3>' +
          '<ul class="jeu-indices">' + q.indices.slice(0, indiceMontres).map(function (ind) { return "<li>💬 " + ind + "</li>"; }).join("") + '</ul>' +
          (indiceMontres < q.indices.length ? '<button class="btn btn-secondary btn-small" id="plusIndice">Un autre indice 🔎</button>' : '') +
          '<div class="jeu-boutons jeu-boutons-col">' + props.map(function (p) { return '<button class="btn btn-secondary" data-rep="' + p + '">' + p + '</button>'; }).join("") + '</div>' +
          '<div class="jeu-feedback"></div>' +
          '<div class="jeu-suivant"></div>';

        const plus = wrap.querySelector("#plusIndice");
        if (plus) plus.addEventListener("click", function () { indiceMontres++; rendre(); });

        const feedback = wrap.querySelector(".jeu-feedback");
        const suivant = wrap.querySelector(".jeu-suivant");
        wrap.querySelectorAll("[data-rep]").forEach(function (b) {
          b.addEventListener("click", function () {
            wrap.querySelectorAll("[data-rep]").forEach(function (x) { x.disabled = true; });
            if (plus) plus.disabled = true;
            if (b.dataset.rep === q.reponse) { score++; b.classList.remove("btn-secondary"); b.classList.add("btn-primary"); feedback.className = "jeu-feedback show ok"; feedback.textContent = "Bravo, c'était bien " + q.reponse + " !"; }
            else { feedback.className = "jeu-feedback show ko"; feedback.textContent = "Non, c'était " + q.reponse + "."; }
            const btn = el('<button class="btn btn-primary btn-small">' + (i + 1 < questions.length ? "Suivant →" : "Mon résultat 🏆") + '</button>');
            btn.addEventListener("click", function () { i++; i < questions.length ? afficher() : resultat(); });
            suivant.appendChild(btn);
          });
        });
      }
      rendre();
    }

    function resultat() {
      wrap.innerHTML = resultatHTML(score, questions.length, "Devine le personnage", jeuPersonnage);
      brancherRejouer(wrap, jeuPersonnage);
    }

    afficher();
  }

  // ============ JEU 3 : Complète le verset ============
  function jeuVerset() {
    let questions = melanger(JEU_VERSET);
    let i = 0, score = 0;

    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    function afficher() {
      const q = questions[i];
      const props = melanger(q.choix.slice());
      wrap.innerHTML =
        '<div class="jeu-progress">Verset ' + (i + 1) + " / " + questions.length + ' · Score : ' + score + '</div>' +
        '<h3 class="jeu-question">Quel mot manque ?</h3>' +
        '<p class="jeu-verset">« ' + q.avant + ' <span class="jeu-trou">…</span> ' + q.apres + ' »<br><span class="jeu-ref">' + q.ref + '</span></p>' +
        '<div class="jeu-boutons jeu-boutons-col">' + props.map(function (p) { return '<button class="btn btn-secondary" data-rep="' + p + '">' + p + '</button>'; }).join("") + '</div>' +
        '<div class="jeu-feedback"></div>' +
        '<div class="jeu-suivant"></div>';

      const feedback = wrap.querySelector(".jeu-feedback");
      const suivant = wrap.querySelector(".jeu-suivant");
      wrap.querySelectorAll("[data-rep]").forEach(function (b) {
        b.addEventListener("click", function () {
          wrap.querySelectorAll("[data-rep]").forEach(function (x) { x.disabled = true; });
          const trou = wrap.querySelector(".jeu-trou");
          trou.textContent = q.trou;
          if (b.dataset.rep === q.trou) { score++; b.classList.remove("btn-secondary"); b.classList.add("btn-primary"); feedback.className = "jeu-feedback show ok"; feedback.textContent = "Parfait ! Tu connais bien la Parole."; }
          else { feedback.className = "jeu-feedback show ko"; feedback.textContent = "Le bon mot était « " + q.trou + " »."; }
          const btn = el('<button class="btn btn-primary btn-small">' + (i + 1 < questions.length ? "Suivant →" : "Mon résultat 🏆") + '</button>');
          btn.addEventListener("click", function () { i++; i < questions.length ? afficher() : resultat(); });
          suivant.appendChild(btn);
        });
      });
    }

    function resultat() {
      wrap.innerHTML = resultatHTML(score, questions.length, "Complète le verset", jeuVerset);
      brancherRejouer(wrap, jeuVerset);
    }

    afficher();
  }

  // ============ JEU 4 : Les jours de la Création (remise en ordre) ============
  function jeuCreation() {
    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    let melange = melanger(JEU_CREATION);
    let ordre = []; // ce que l'enfant a placé

    function rendre() {
      wrap.innerHTML =
        '<h3 class="jeu-question">Remets les jours de la Création dans l\'ordre</h3>' +
        '<p class="jeu-consigne">Clique sur les étapes dans le bon ordre, du 1er au 7e jour.</p>' +
        '<div class="creation-ordre" id="creaOrdre"></div>' +
        '<div class="creation-choix" id="creaChoix"></div>' +
        '<div class="jeu-feedback"></div>' +
        '<div class="jeu-suivant"></div>';

      const zoneOrdre = wrap.querySelector("#creaOrdre");
      const zoneChoix = wrap.querySelector("#creaChoix");
      const feedback = wrap.querySelector(".jeu-feedback");
      const suivant = wrap.querySelector(".jeu-suivant");

      ordre.forEach(function (item, idx) {
        zoneOrdre.appendChild(el('<div class="crea-slot"><span class="crea-num">' + (idx + 1) + '</span> ' + item.emoji + ' ' + item.texte + '</div>'));
      });

      const restants = melange.filter(function (m) { return ordre.indexOf(m) === -1; });
      restants.forEach(function (item) {
        const b = el('<button class="crea-btn">' + item.emoji + ' ' + item.texte + '</button>');
        b.addEventListener("click", function () { ordre.push(item); rendre(); });
        zoneChoix.appendChild(b);
      });

      if (ordre.length === JEU_CREATION.length) {
        const bon = ordre.every(function (item, idx) { return item.jour === idx + 1; });
        if (bon) { feedback.className = "jeu-feedback show ok"; feedback.textContent = "Bravo ! Tu connais l'ordre de la Création (Genèse 1) 🎉"; }
        else { feedback.className = "jeu-feedback show ko"; feedback.textContent = "Presque ! Regarde bien : la lumière vient en premier. Réessaie."; }
        const btnRe = el('<button class="btn btn-primary btn-small">Recommencer 🔄</button>');
        btnRe.addEventListener("click", function () { melange = melanger(JEU_CREATION); ordre = []; rendre(); });
        suivant.appendChild(btnRe);
      }
    }
    rendre();
  }

  // ============ JEU 5 : Ancien ou Nouveau Testament ============
  function jeuTestament() {
    let questions = melanger(JEU_TESTAMENT);
    let i = 0, score = 0;

    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    function afficher() {
      const q = questions[i];
      wrap.innerHTML =
        '<div class="jeu-progress">Livre ' + (i + 1) + " / " + questions.length + ' · Score : ' + score + '</div>' +
        '<h3 class="jeu-question">' + q.livre + '</h3>' +
        '<p class="jeu-consigne">Dans quel Testament se trouve ce livre ?</p>' +
        '<div class="jeu-boutons">' +
        '<button class="btn btn-secondary" data-rep="ancien">Ancien Testament</button>' +
        '<button class="btn btn-secondary" data-rep="nouveau">Nouveau Testament</button>' +
        '</div>' +
        '<div class="jeu-feedback"></div>' +
        '<div class="jeu-suivant"></div>';

      const feedback = wrap.querySelector(".jeu-feedback");
      const suivant = wrap.querySelector(".jeu-suivant");
      wrap.querySelectorAll("[data-rep]").forEach(function (b) {
        b.addEventListener("click", function () {
          wrap.querySelectorAll("[data-rep]").forEach(function (x) { x.disabled = true; });
          const bon = (b.dataset.rep === "ancien") === q.ancien;
          if (bon) { score++; feedback.className = "jeu-feedback show ok"; feedback.textContent = "Bravo ! C'est le " + (q.ancien ? "Ancien" : "Nouveau") + " Testament."; }
          else { feedback.className = "jeu-feedback show ko"; feedback.textContent = "Non, c'est le " + (q.ancien ? "Ancien" : "Nouveau") + " Testament."; }
          const btn = el('<button class="btn btn-primary btn-small">' + (i + 1 < questions.length ? "Suivant →" : "Mon résultat 🏆") + '</button>');
          btn.addEventListener("click", function () { i++; i < questions.length ? afficher() : resultat(); });
          suivant.appendChild(btn);
        });
      });
    }

    function resultat() {
      wrap.innerHTML = resultatHTML(score, questions.length, "Ancien ou Nouveau", jeuTestament);
      brancherRejouer(wrap, jeuTestament);
    }

    afficher();
  }

  // ============ JEU 6 : Le mot mystère ============
  function jeuMotMystere() {
    const wrap = el('<div class="mini-jeu"></div>');
    contenu.appendChild(wrap);

    const item = JEU_MOTMYSTERE[Math.floor(Math.random() * JEU_MOTMYSTERE.length)];
    const mot = item.mot;
    let trouvees = [];
    let erreurs = 0;
    const maxErreurs = 7;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    function rendre() {
      const affichage = mot.split("").map(function (c) { return trouvees.indexOf(c) === -1 ? "_" : c; }).join(" ");
      const gagne = mot.split("").every(function (c) { return trouvees.indexOf(c) !== -1; });
      const perdu = erreurs >= maxErreurs;
      const coeurs = "❤️".repeat(maxErreurs - erreurs) + "🤍".repeat(erreurs);

      wrap.innerHTML =
        '<h3 class="jeu-question">Le mot mystère</h3>' +
        '<p class="jeu-consigne">💡 Indice : ' + item.indice + '</p>' +
        '<p class="mot-affiche">' + affichage + '</p>' +
        '<p class="mot-vies">' + coeurs + '</p>' +
        '<div class="mot-clavier"></div>' +
        '<div class="jeu-feedback"></div>' +
        '<div class="jeu-suivant"></div>';

      const clavier = wrap.querySelector(".mot-clavier");
      const feedback = wrap.querySelector(".jeu-feedback");
      const suivant = wrap.querySelector(".jeu-suivant");

      if (!gagne && !perdu) {
        alphabet.forEach(function (lettre) {
          const utilisee = trouvees.indexOf(lettre) !== -1;
          const b = el('<button class="mot-touche">' + lettre + '</button>');
          if (utilisee) b.disabled = true;
          b.addEventListener("click", function () {
            trouvees.push(lettre);
            if (mot.indexOf(lettre) === -1) erreurs++;
            rendre();
          });
          clavier.appendChild(b);
        });
      } else if (gagne) {
        feedback.className = "jeu-feedback show ok";
        feedback.textContent = "Bravo ! Le mot était « " + mot + " » 🎉";
      } else {
        feedback.className = "jeu-feedback show ko";
        feedback.textContent = "Dommage ! Le mot était « " + mot + " ». Réessaie !";
      }

      if (gagne || perdu) {
        const btn = el('<button class="btn btn-primary btn-small">Nouveau mot 🔄</button>');
        btn.addEventListener("click", jeuMotMystere);
        suivant.appendChild(btn);
      }
    }
    rendre();
  }

  // ============ Écran de résultat commun ============
  function resultatHTML(score, total, titre, rejouerFn) {
    let emoji, msg;
    const ratio = score / total;
    if (ratio === 1) { emoji = "🏆"; msg = "Parfait ! Tu es un champion de la Bible !"; }
    else if (ratio >= 0.7) { emoji = "🌟"; msg = "Très bien joué !"; }
    else if (ratio >= 0.4) { emoji = "💪"; msg = "Bon travail, continue à jouer !"; }
    else { emoji = "📖"; msg = "Rejoue pour progresser, tu vas y arriver !"; }
    return '<div class="jeu-resultat">' +
      '<div class="jeu-resultat-emoji">' + emoji + '</div>' +
      '<h3>' + titre + ' : ' + score + " / " + total + '</h3>' +
      '<p>' + msg + '</p>' +
      '<button class="btn btn-primary" id="rejouerJeu">Rejouer 🔄</button>' +
      '</div>';
  }

  function brancherRejouer(wrap, fn) {
    const b = wrap.querySelector("#rejouerJeu");
    if (b) b.addEventListener("click", function () { contenu.innerHTML = ""; fn(); });
  }

  // ============ Registre + navigation ============
  const JEUX = {
    vraifaux: jeuVraiFaux,
    personnage: jeuPersonnage,
    verset: jeuVerset,
    creation: jeuCreation,
    testament: jeuTestament,
    motmystere: jeuMotMystere,
  };

  document.querySelectorAll(".jeu-card").forEach(function (card) {
    card.addEventListener("click", function () { ouvrir(card.dataset.jeu); });
  });
  btnRetour.addEventListener("click", fermer);
})();
