/* ==========================================================
   Quiz biblique pour enfants — déroulé du jeu
   ========================================================== */

(function () {
  const choixNiveauEl = document.getElementById("choixNiveau");
  const quizCard = document.getElementById("quizCard");
  const quizResult = document.getElementById("quizResult");
  const niveauLabel = document.getElementById("quizNiveauLabel");
  const compteurEl = document.getElementById("quizCompteur");
  const barFill = document.getElementById("quizBarFill");
  const questionEl = document.getElementById("quizQuestion");
  const answersEl = document.getElementById("quizAnswers");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("quizNextBtn");
  const resultEmoji = document.getElementById("resultEmoji");
  const resultTitre = document.getElementById("resultTitre");
  const resultTexte = document.getElementById("resultTexte");
  const resultVerset = document.getElementById("resultVerset");
  const rejouerBtn = document.getElementById("rejouerBtn");
  const changerNiveauBtn = document.getElementById("changerNiveauBtn");

  let niveau = null;
  let questions = [];
  let index = 0;
  let score = 0;

  // Meilleurs scores sauvegardés dans le navigateur
  function cleRecord(n) { return "lumiere-biblique-record-" + n; }

  function afficherRecords() {
    document.querySelectorAll(".niveau-card").forEach(function (btn) {
      const n = btn.dataset.niveau;
      const record = localStorage.getItem(cleRecord(n));
      let span = btn.querySelector(".niveau-record");
      if (!span) {
        span = document.createElement("span");
        span.className = "niveau-record";
        btn.appendChild(span);
      }
      span.textContent = record ? "🏅 Record : " + record + " / " + QUIZ[n].length : "Pas encore joué";
    });
  }

  function melanger(tableau) {
    const copie = tableau.slice();
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    return copie;
  }

  function demarrer(n) {
    niveau = n;
    questions = melanger(QUIZ[n]);
    index = 0;
    score = 0;
    choixNiveauEl.style.display = "none";
    quizResult.style.display = "none";
    quizCard.style.display = "block";
    niveauLabel.textContent = QUIZ_NIVEAUX[n].label;
    afficherQuestion();
  }

  function afficherQuestion() {
    const q = questions[index];
    compteurEl.textContent = "Question " + (index + 1) + " / " + questions.length;
    barFill.style.width = (index / questions.length) * 100 + "%";
    questionEl.textContent = q.q;
    feedbackEl.className = "quiz-feedback";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
    answersEl.innerHTML = "";

    q.choix.forEach(function (choix, i) {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.textContent = choix;
      btn.addEventListener("click", function () { repondre(i, btn); });
      answersEl.appendChild(btn);
    });
  }

  function repondre(i, btnClique) {
    const q = questions[index];
    const boutons = answersEl.querySelectorAll(".answer-btn");
    boutons.forEach(function (b) { b.disabled = true; });
    boutons[q.bonne].classList.add("correct");

    if (i === q.bonne) {
      score++;
      feedbackEl.className = "quiz-feedback show ok";
      feedbackEl.textContent = "✅ Bravo, c'est la bonne réponse ! " + q.explication;
    } else {
      btnClique.classList.add("wrong");
      feedbackEl.className = "quiz-feedback show ko";
      feedbackEl.textContent = "❌ Ce n'est pas ça… " + q.explication;
    }

    nextBtn.style.display = "inline-block";
    nextBtn.textContent = index + 1 < questions.length ? "Question suivante →" : "Voir mon résultat 🏆";
  }

  function suivante() {
    index++;
    if (index < questions.length) {
      afficherQuestion();
    } else {
      afficherResultat();
    }
  }

  function afficherResultat() {
    quizCard.style.display = "none";
    quizResult.style.display = "block";
    barFill.style.width = "100%";

    // Enregistre le record du niveau
    const ancien = parseInt(localStorage.getItem(cleRecord(niveau)) || "0", 10);
    if (score > ancien) localStorage.setItem(cleRecord(niveau), String(score));
    afficherRecords();

    const ratio = score / questions.length;
    if (ratio === 1) {
      resultEmoji.textContent = "🏆";
      resultTitre.textContent = "Parfait ! " + score + " / " + questions.length;
      resultTexte.textContent = "Extraordinaire ! Tu es un vrai champion de la Bible. Continue à lire la Parole de Dieu chaque jour !";
    } else if (ratio >= 0.7) {
      resultEmoji.textContent = "🌟";
      resultTitre.textContent = "Très bien ! " + score + " / " + questions.length;
      resultTexte.textContent = "Bravo, tu connais très bien la Bible ! Encore un petit effort pour le sans-faute.";
    } else if (ratio >= 0.4) {
      resultEmoji.textContent = "💪";
      resultTitre.textContent = "Pas mal ! " + score + " / " + questions.length;
      resultTexte.textContent = "C'est un bon début ! Relis les belles histoires ci-dessus et retente ta chance.";
    } else {
      resultEmoji.textContent = "📖";
      resultTitre.textContent = "Courage ! " + score + " / " + questions.length;
      resultTexte.textContent = "Ne te décourage pas : chaque champion a commencé petit. Lis les histoires de la Bible et réessaie !";
    }
    resultVerset.textContent = QUIZ_NIVEAUX[niveau].verset;
  }

  // ---------- Événements ----------

  document.querySelectorAll(".niveau-card").forEach(function (btn) {
    btn.addEventListener("click", function () { demarrer(btn.dataset.niveau); });
  });

  nextBtn.addEventListener("click", suivante);
  afficherRecords();
  rejouerBtn.addEventListener("click", function () { demarrer(niveau); });
  changerNiveauBtn.addEventListener("click", function () {
    quizResult.style.display = "none";
    quizCard.style.display = "none";
    choixNiveauEl.style.display = "grid";
  });
})();
