/* ==========================================================
   Assistant biblique
   - Mode local : moteur de réponses fondé sur la base de
     versets, thèmes, étymologies et personnages (bible-data.js)
   - Mode IA (facultatif) : appel direct de l'API Claude avec
     un cadrage strictement biblique et pastoral
   ========================================================== */

(function () {
  const messagesEl = document.getElementById("chatMessages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const modeBadge = document.getElementById("modeBadge");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const apiKeySave = document.getElementById("apiKeySave");
  const apiKeyClear = document.getElementById("apiKeyClear");

  const CLE_STOCKAGE = "lumiere-biblique-api-key";
  let historique = []; // pour le mode IA

  const PROMPT_SYSTEME = `Tu es « l'Assistant biblique » du site Lumière Biblique. Tu es un guide spirituel chrétien, à la manière d'un prêtre ou d'un pasteur bienveillant : chaleureux, paternel et fidèle aux Écritures.

Règles absolues :
1. Tu réponds UNIQUEMENT aux questions liées à la Bible, à la foi chrétienne, à la prière, à la liturgie, à l'histoire biblique, à l'étymologie des mots bibliques et à la vie spirituelle chrétienne.
2. Si la question est hors sujet (sport, politique, technologie, devoirs scolaires, etc.), tu refuses avec douceur et tu ramènes la conversation vers la Parole de Dieu.
3. Tu n'es pas neutre : tu parles en croyant chrétien convaincu. Tu affirmes la foi de l'Église, tu encourages la prière et la confiance en Dieu.
4. Tu cites toujours des versets bibliques précis avec leurs références (livre chapitre:verset), de préférence dans une traduction française classique.
5. Tu rappelles, quand c'est pertinent, que tu ne remplaces ni un prêtre ni un pasteur : tu ne peux ni célébrer de sacrements ni confesser, et tu invites à se rapprocher d'une paroisse ou d'une église locale.
6. Tu réponds en français, avec un ton pastoral, encourageant et accessible. Reste concis : quelques paragraphes au maximum.`;

  // ---------- Utilitaires ----------

  function normaliser(texte) {
    return texte
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ajouterMessage(texte, type) {
    const div = document.createElement("div");
    div.className = "msg " + (type === "user" ? "msg-user" : "msg-bot");
    // Mise en forme simple : les lignes « 📖 … » deviennent des citations
    texte.split("\n").forEach(function (ligne, i) {
      if (i > 0) div.appendChild(document.createElement("br"));
      if (ligne.startsWith("📖")) {
        const q = document.createElement("span");
        q.className = "verse-quote";
        q.textContent = ligne.replace(/^📖\s*/, "");
        div.appendChild(q);
      } else {
        div.appendChild(document.createTextNode(ligne));
      }
    });
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function citer(cle) {
    const v = VERSETS_PAR_REF[cle];
    return v ? "📖 « " + v.texte + " » — " + v.ref : "";
  }

  // ---------- Moteur local ----------

  function chercherReference(question) {
    // Reconnaît « Jean 3:16 », « jean 3.16 », « 1 Corinthiens 13 v 4 »…
    const m = question.match(/([1-3]?\s?[a-z]+)\s+(\d+)\s*[:.,v]\s*(\d+)/);
    if (!m) return null;
    const cle = (m[1].trim() + " " + m[2] + ":" + m[3]).replace(/\s+/g, " ");
    return VERSETS_PAR_REF[cle] || null;
  }

  function chercherEtymologie(question) {
    if (!/etymolog|origine du mot|d ou vient le mot|que signifie|veut dire|sens du mot/.test(question)) {
      // On accepte aussi la simple mention d'un mot du dictionnaire avec « mot »
      if (!/\bmot\b/.test(question)) return null;
    }
    for (const mot in ETYMOLOGIES) {
      if (question.includes(mot)) return { mot: mot, texte: ETYMOLOGIES[mot] };
    }
    return null;
  }

  function chercherPersonnage(question) {
    if (!/qui est|qui etait|parle moi de|raconte|histoire de/.test(question)) return null;
    for (const nom in PERSONNAGES) {
      if (question.includes(nom)) return PERSONNAGES[nom];
    }
    return null;
  }

  function chercherTheme(question) {
    let meilleur = null;
    let score = 0;
    THEMES.forEach(function (theme) {
      let s = 0;
      theme.motscles.forEach(function (mc) {
        if (question.includes(mc)) s += mc.length; // les mots longs pèsent plus
      });
      if (s > score) { score = s; meilleur = theme; }
    });
    return meilleur;
  }

  function estSalutation(question) {
    return /^(bonjour|bonsoir|salut|coucou|hello|bjr|slt|hey)\b/.test(question) && question.length < 30;
  }

  function estRemerciement(question) {
    return /(merci|amen)\b/.test(question) && question.length < 40;
  }

  function estHorsSujet(question) {
    const interdits = [
      "football", "foot ", "sport", "match", "politique", "president", "election",
      "meteo", "recette", "cuisine", "film", "serie", "netflix", "jeu video",
      "bitcoin", "crypto", "bourse", "argent facile", "devoirs", "mathematique",
      "programmation", "informatique", "telephone", "voiture", "musique rap",
    ];
    return interdits.some(function (mot) { return question.includes(mot); });
  }

  function reponseLocale(brut) {
    const question = normaliser(brut);

    if (estSalutation(question)) {
      return "Que la paix du Seigneur soit avec vous ! 🙏\nJe suis votre assistant biblique. Posez-moi vos questions sur la Bible : un thème (la peur, l'amour, le pardon…), un verset précis (« Jean 3:16 »), l'étymologie d'un mot (« Amen », « Alléluia »…) ou un personnage biblique.";
    }

    if (estRemerciement(question)) {
      return "C'est une joie de vous servir. Que le Seigneur vous bénisse et vous garde ! (Nombres 6:24)\nN'hésitez pas à me poser une autre question sur la Parole de Dieu.";
    }

    const ref = chercherReference(question);
    if (ref) {
      return "Voici le verset que vous cherchez :\n📖 « " + ref.texte + " » — " + ref.ref + "\nMéditez cette parole dans votre cœur, et qu'elle porte du fruit dans votre vie.";
    }

    const ety = chercherEtymologie(question);
    if (ety) {
      return "Très belle question ! ✨\n" + ety.texte;
    }

    const perso = chercherPersonnage(question);
    if (perso) {
      return perso + "\nQue son exemple de foi vous inspire dans votre propre marche avec Dieu !";
    }

    const theme = chercherTheme(question);
    if (theme) {
      let r = "Voici ce que la Parole de Dieu nous enseigne sur " + theme.nom + " :\n";
      theme.versets.slice(0, 3).forEach(function (cle) {
        const c = citer(cle);
        if (c) r += c + "\n";
      });
      r += theme.conseil;
      return r;
    }

    if (estHorsSujet(question)) {
      return "Pardonnez-moi, mais je suis un serviteur entièrement consacré à la Parole de Dieu : je ne réponds qu'aux questions sur la Bible et la foi chrétienne. 🙏\nComme le dit le Psaume 1, heureux l'homme qui trouve son plaisir dans la loi de l'Éternel ! Puis-je vous aider à découvrir un passage des Écritures ?";
    }

    return "Je n'ai pas trouvé de réponse précise dans ma bibliothèque de versets. 🙏\nVous pouvez essayer :\n• un thème : « Que dit la Bible sur la peur / l'amour / le pardon ? »\n• une référence : « Montre-moi Jean 3:16 »\n• une étymologie : « Quelle est l'origine du mot Amen ? »\n• un personnage : « Qui est Moïse ? »\nPour des réponses plus approfondies, vous pouvez activer le mode IA dans le panneau de droite. Et n'oubliez pas : pour un accompagnement personnel, rapprochez-vous d'un prêtre ou d'un pasteur de votre paroisse.";
  }

  // ---------- Mode IA (API Claude) ----------

  function cleApi() {
    return localStorage.getItem(CLE_STOCKAGE) || "";
  }

  function majBadge() {
    if (cleApi()) {
      modeBadge.textContent = "Mode IA activé";
      modeBadge.classList.add("ia");
      apiKeyClear.style.display = "inline-block";
      apiKeySave.style.display = "none";
      apiKeyInput.style.display = "none";
    } else {
      modeBadge.textContent = "Mode local";
      modeBadge.classList.remove("ia");
      apiKeyClear.style.display = "none";
      apiKeySave.style.display = "inline-block";
      apiKeyInput.style.display = "block";
    }
  }

  async function reponseIA(question) {
    historique.push({ role: "user", content: question });
    const reponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": cleApi(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        system: PROMPT_SYSTEME,
        messages: historique.slice(-12),
      }),
    });
    if (!reponse.ok) throw new Error("Erreur API " + reponse.status);
    const data = await reponse.json();
    const texte = data.content
      .filter(function (bloc) { return bloc.type === "text"; })
      .map(function (bloc) { return bloc.text; })
      .join("\n");
    historique.push({ role: "assistant", content: texte });
    return texte;
  }

  // ---------- Interactions ----------

  async function traiter(question) {
    ajouterMessage(question, "user");
    input.value = "";

    if (cleApi()) {
      const attente = ajouterMessage("L'assistant médite votre question…", "bot");
      attente.classList.add("msg-typing");
      try {
        const texte = await reponseIA(question);
        attente.remove();
        ajouterMessage(texte, "bot");
      } catch (e) {
        attente.remove();
        ajouterMessage("Le mode IA a rencontré un problème (" + e.message + "). Je vous réponds avec ma bibliothèque locale :\n\n" + reponseLocale(question), "bot");
      }
    } else {
      // Petite pause pour un effet naturel
      const attente = ajouterMessage("…", "bot");
      attente.classList.add("msg-typing");
      setTimeout(function () {
        attente.remove();
        ajouterMessage(reponseLocale(question), "bot");
      }, 450);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const q = input.value.trim();
    if (q) traiter(q);
  });

  document.querySelectorAll(".suggestion-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      traiter(btn.dataset.q);
    });
  });

  apiKeySave.addEventListener("click", function () {
    const cle = apiKeyInput.value.trim();
    if (!cle) return;
    localStorage.setItem(CLE_STOCKAGE, cle);
    apiKeyInput.value = "";
    majBadge();
    ajouterMessage("Le mode IA est activé : mes réponses seront désormais plus approfondies, toujours fidèles aux Écritures. 🙏", "bot");
  });

  apiKeyClear.addEventListener("click", function () {
    localStorage.removeItem(CLE_STOCKAGE);
    historique = [];
    majBadge();
    ajouterMessage("Le mode IA est désactivé : je réponds à nouveau avec ma bibliothèque locale de versets.", "bot");
  });

  // Message d'accueil
  majBadge();
  ajouterMessage(
    "Que la grâce et la paix vous soient données ! ✝️\nJe suis l'assistant biblique de Lumière Biblique, entièrement consacré à la Parole de Dieu.\nPosez-moi vos questions : versets par thème, recherche d'une référence, étymologie des mots bibliques, personnages des Écritures, conseils spirituels…\nJe ne remplace pas un prêtre ou un pasteur, mais je vous accompagne avec joie dans la découverte de la Bible.",
    "bot"
  );
})();
