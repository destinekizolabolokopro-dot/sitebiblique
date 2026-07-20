/* ==========================================================
   Assistant biblique — version décontractée 😄
   - Mode local : moteur de réponses fondé sur la base de
     versets, thèmes, étymologies et personnages (bible-data.js)
   - Mode IA (facultatif) : appel direct de l'API Claude avec
     un cadrage biblique, chaleureux et détendu
   - Avatars cartoon au choix : homme, femme ou enfant
   ========================================================== */

(function () {
  const messagesEl = document.getElementById("chatMessages");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const modeBadge = document.getElementById("modeBadge");
  const apiKeyInput = document.getElementById("apiKeyInput");
  const apiKeySave = document.getElementById("apiKeySave");
  const apiKeyClear = document.getElementById("apiKeyClear");
  const btnSurprise = document.getElementById("btnSurprise");
  const btnEffacer = document.getElementById("btnEffacer");

  const CLE_STOCKAGE = "lumiere-biblique-api-key";
  const CLE_AVATAR = "lumiere-biblique-avatar";
  let historique = []; // pour le mode IA

  // ---------- Avatars cartoon (SVG dessinés) ----------

  const AVATARS = {
    homme: {
      nom: "Frère Théo",
      svg: '<svg viewBox="0 0 64 64" role="img" aria-label="Frère Théo">' +
        '<circle cx="32" cy="32" r="32" fill="#fdf0e0"/>' +
        '<ellipse cx="32" cy="58" rx="19" ry="13" fill="#b0413e"/>' +
        '<rect x="30.6" y="50" width="2.8" height="9" rx="1.2" fill="#fff"/>' +
        '<rect x="27.5" y="52.4" width="9" height="2.8" rx="1.2" fill="#fff"/>' +
        '<circle cx="32" cy="27" r="17" fill="#3d2a1a"/>' +
        '<circle cx="32" cy="31" r="14.5" fill="#e8b184"/>' +
        '<ellipse cx="32" cy="19.5" rx="14" ry="7.5" fill="#3d2a1a"/>' +
        '<circle cx="26" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="38" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="26.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<circle cx="38.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<path d="M25 37 Q32 43 39 37" stroke="#8f5b3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<circle cx="21.5" cy="34.5" r="2.4" fill="#f0a37b" opacity="0.55"/>' +
        '<circle cx="42.5" cy="34.5" r="2.4" fill="#f0a37b" opacity="0.55"/>' +
        '</svg>',
    },
    femme: {
      nom: "Sœur Léa",
      svg: '<svg viewBox="0 0 64 64" role="img" aria-label="Sœur Léa">' +
        '<circle cx="32" cy="32" r="32" fill="#eef3ea"/>' +
        '<ellipse cx="32" cy="58" rx="19" ry="13" fill="#2f7a3d"/>' +
        '<circle cx="32" cy="26" r="18" fill="#1f130b"/>' +
        '<circle cx="14.5" cy="35" r="6.5" fill="#1f130b"/>' +
        '<circle cx="49.5" cy="35" r="6.5" fill="#1f130b"/>' +
        '<circle cx="32" cy="31" r="14" fill="#9c6644"/>' +
        '<ellipse cx="32" cy="19.5" rx="13.5" ry="7" fill="#1f130b"/>' +
        '<circle cx="26" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="38" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="26.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<circle cx="38.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<path d="M25.5 37 Q32 42.5 38.5 37" stroke="#5e3a24" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<circle cx="21.5" cy="34.5" r="2.4" fill="#b9805c" opacity="0.6"/>' +
        '<circle cx="42.5" cy="34.5" r="2.4" fill="#b9805c" opacity="0.6"/>' +
        '<circle cx="47" cy="22" r="2.6" fill="#c9a227"/>' +
        '</svg>',
    },
    enfant: {
      nom: "P'tit Sam",
      svg: '<svg viewBox="0 0 64 64" role="img" aria-label="P\'tit Sam">' +
        '<circle cx="32" cy="32" r="32" fill="#fdf6e3"/>' +
        '<ellipse cx="32" cy="58" rx="18" ry="12" fill="#c9a227"/>' +
        '<circle cx="32" cy="32" r="14" fill="#f2c79b"/>' +
        '<ellipse cx="32" cy="21" rx="14" ry="8" fill="#b0413e"/>' +
        '<rect x="18" y="20" width="28" height="4" rx="2" fill="#8f312f"/>' +
        '<circle cx="32" cy="14" r="2.8" fill="#8f312f"/>' +
        '<circle cx="26.5" cy="31" r="2" fill="#26221c"/>' +
        '<circle cx="37.5" cy="31" r="2" fill="#26221c"/>' +
        '<circle cx="27.2" cy="30.3" r="0.65" fill="#fff"/>' +
        '<circle cx="38.2" cy="30.3" r="0.65" fill="#fff"/>' +
        '<path d="M26.5 37.5 Q32 42.5 37.5 37.5" stroke="#a5714a" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
        '<circle cx="23" cy="35" r="0.9" fill="#d99a66"/>' +
        '<circle cx="25.5" cy="36.5" r="0.9" fill="#d99a66"/>' +
        '<circle cx="41" cy="35" r="0.9" fill="#d99a66"/>' +
        '<circle cx="38.5" cy="36.5" r="0.9" fill="#d99a66"/>' +
        '</svg>',
    },
  };

  function avatarChoisi() {
    const a = localStorage.getItem(CLE_AVATAR);
    return AVATARS[a] ? a : "homme";
  }

  function majAvatarBoutons() {
    document.querySelectorAll(".avatar-choice").forEach(function (btn) {
      if (!btn.innerHTML.trim()) btn.innerHTML = AVATARS[btn.dataset.avatar].svg;
      btn.classList.toggle("selected", btn.dataset.avatar === avatarChoisi());
    });
    // Met à jour les avatars des anciens messages
    document.querySelectorAll(".msg-avatar").forEach(function (el) {
      el.innerHTML = AVATARS[avatarChoisi()].svg;
    });
    document.querySelectorAll(".msg-nom").forEach(function (el) {
      el.textContent = AVATARS[avatarChoisi()].nom;
    });
  }

  const PROMPT_SYSTEME = `Tu es « l'Assistant biblique » du site Lumière Biblique. Tu es un jeune guide spirituel chrétien, chaleureux et décontracté : tu tutoies, tu parles simplement, avec humour et bienveillance, comme un grand frère ou une grande sœur dans la foi. Mais tu restes profondément croyant et fidèle aux Écritures.

Règles absolues :
1. Tu réponds UNIQUEMENT aux questions liées à la Bible, à la foi chrétienne, à la prière, à la liturgie, à l'histoire biblique, à l'étymologie des mots bibliques et à la vie spirituelle chrétienne.
2. Si la question est hors sujet (sport, politique, technologie, devoirs scolaires, etc.), tu refuses avec humour et gentillesse et tu ramènes la conversation vers la Parole de Dieu.
3. Tu n'es pas neutre : tu parles en croyant chrétien convaincu. Tu affirmes la foi de l'Église, tu encourages la prière et la confiance en Dieu, mais toujours sans lourdeur ni ton moralisateur.
4. Tu cites toujours des versets bibliques précis avec leurs références (livre chapitre:verset).
5. Tu rappelles, quand c'est pertinent, que tu ne remplaces ni un prêtre ni un pasteur : tu ne peux ni célébrer de sacrements ni confesser, et tu invites à se rapprocher d'une paroisse ou d'une église locale.
6. Tu réponds en français, de façon détendue, positive et accessible. Reste concis : quelques paragraphes au maximum. Les emojis sont bienvenus avec modération.`;

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
    if (type === "user") {
      const div = document.createElement("div");
      div.className = "msg msg-user";
      div.textContent = texte;
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    // Message du bot : avatar + nom + bulle
    const row = document.createElement("div");
    row.className = "msg-row";

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    avatar.innerHTML = AVATARS[avatarChoisi()].svg;

    const col = document.createElement("div");
    col.className = "msg-col";

    const nom = document.createElement("div");
    nom.className = "msg-nom";
    nom.textContent = AVATARS[avatarChoisi()].nom;

    const div = document.createElement("div");
    div.className = "msg msg-bot";
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

    col.appendChild(nom);
    col.appendChild(div);
    row.appendChild(avatar);
    row.appendChild(col);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  function citer(cle) {
    const v = VERSETS_PAR_REF[cle];
    return v ? "📖 « " + v.texte + " » — " + v.ref : "";
  }

  // ---------- Moteur local ----------

  function chercherReference(question) {
    const m = question.match(/([1-3]?\s?[a-z]+)\s+(\d+)\s*[:.,v]\s*(\d+)/);
    if (!m) return null;
    const cle = (m[1].trim() + " " + m[2] + ":" + m[3]).replace(/\s+/g, " ");
    return VERSETS_PAR_REF[cle] || null;
  }

  function chercherEtymologie(question) {
    if (!/etymolog|origine du mot|d ou vient le mot|que signifie|veut dire|sens du mot/.test(question)) {
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
        if (question.includes(mc)) s += mc.length;
      });
      if (s > score) { score = s; meilleur = theme; }
    });
    return meilleur;
  }

  function estSalutation(question) {
    return /^(bonjour|bonsoir|salut|coucou|hello|bjr|slt|hey|yo|wesh|cc)\b/.test(question) && question.length < 30;
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

  function versetSurprise() {
    const cles = Object.keys(VERSETS_PAR_REF);
    const v = VERSETS_PAR_REF[cles[Math.floor(Math.random() * cles.length)]];
    const intros = [
      "Tiens, un verset surprise rien que pour toi 🎁 :",
      "Allez, petit cadeau du jour 🎲 :",
      "Voilà de quoi illuminer ta journée ✨ :",
      "Attrape celui-là, il est pour toi 😄 :",
    ];
    return intros[Math.floor(Math.random() * intros.length)] +
      "\n📖 « " + v.texte + " » — " + v.ref +
      "\nGarde-le dans un coin de ta tête aujourd'hui !";
  }

  function reponseLocale(brut) {
    const question = normaliser(brut);

    if (estSalutation(question)) {
      return "Salut, la paix du Christ ! 😄\nMoi c'est " + AVATARS[avatarChoisi()].nom + ", ton pote 100% Bible. Tu peux tout me demander : un thème (la peur, l'amour, le pardon…), un verset précis (« Jean 3:16 »), l'origine d'un mot (« Amen », « Alléluia »…), ou un personnage biblique.\nAlors, qu'est-ce qui te trotte dans la tête ?";
    }

    if (estRemerciement(question)) {
      return "Avec grand plaisir ! 😊 Que le Seigneur te bénisse et te garde (Nombres 6:24).\nT'as une autre question ? Je suis chaud !";
    }

    if (/verset surprise|surprends moi|verset aleatoire|au hasard/.test(question)) {
      return versetSurprise();
    }

    const ref = chercherReference(question);
    if (ref) {
      return "Le voilà ! 👇\n📖 « " + ref.texte + " » — " + ref.ref + "\nPrends une minute pour le laisser descendre du cerveau au cœur 😉";
    }

    const ety = chercherEtymologie(question);
    if (ety) {
      return "Ah, excellente question, j'adore ! ✨\n" + ety.texte;
    }

    const perso = chercherPersonnage(question);
    if (perso) {
      return perso + "\nFranchement, quel parcours, non ? De quoi inspirer ta propre marche avec Dieu 🔥";
    }

    const theme = chercherTheme(question);
    if (theme) {
      let r = "Bonne question ! Voilà ce que la Bible dit sur " + theme.nom + " :\n";
      theme.versets.slice(0, 3).forEach(function (cle) {
        const c = citer(cle);
        if (c) r += c + "\n";
      });
      r += theme.conseil;
      return r;
    }

    if (estHorsSujet(question)) {
      return "Haha, désolé, moi c'est la Bible sinon rien 😅 Je suis programmé pour parler de la Parole de Dieu, et crois-moi, y a déjà de quoi faire !\nAllez, pose-moi une question sur un verset, un personnage ou un thème de la vie — tu vas voir, la Bible a des réponses étonnantes.";
    }

    return "Hmm, j'ai pas trouvé ça dans ma bibliothèque 🤔 Mais essaie plutôt comme ça :\n• un thème : « Que dit la Bible sur la peur / l'amour / le pardon ? »\n• une référence : « Montre-moi Jean 3:16 »\n• une étymologie : « C'est quoi l'origine du mot Amen ? »\n• un personnage : « Qui est Moïse ? »\n• ou tape juste « verset surprise » 🎲\nEt pour un accompagnement perso, va voir un prêtre ou un pasteur près de chez toi — eux, c'est les vrais pros 😉";
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
      const attente = ajouterMessage("Je réfléchis… 🤔", "bot");
      attente.classList.add("msg-typing");
      try {
        const texte = await reponseIA(question);
        attente.remove();
        ajouterMessage(texte, "bot");
      } catch (e) {
        attente.remove();
        ajouterMessage("Oups, le mode IA a buggé (" + e.message + "). Pas grave, je te réponds avec ma bibliothèque locale :\n\n" + reponseLocale(question), "bot");
      }
    } else {
      const attente = ajouterMessage("…", "bot");
      attente.classList.add("msg-typing");
      setTimeout(function () {
        attente.remove();
        ajouterMessage(reponseLocale(question), "bot");
      }, 450);
    }
  }

  function messageAccueil() {
    ajouterMessage(
      "Salut, bienvenue ! ✝️😄\nMoi c'est " + AVATARS[avatarChoisi()].nom + ", ton assistant 100% Bible. Versets, personnages, étymologies, conseils pour la vie… je suis là pour tout ça !\nPetit rappel entre nous : je remplace pas un prêtre ou un pasteur, hein 😉 Mais pour découvrir la Parole de Dieu ensemble, je suis ton homme !\nAstuce : tape « verset surprise » ou clique sur le bouton 🎲 pour te faire offrir un verset au hasard.",
      "bot"
    );
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

  if (btnSurprise) {
    btnSurprise.addEventListener("click", function () {
      ajouterMessage("Verset surprise ! 🎲", "user");
      const attente = ajouterMessage("…", "bot");
      attente.classList.add("msg-typing");
      setTimeout(function () {
        attente.remove();
        ajouterMessage(versetSurprise(), "bot");
      }, 400);
    });
  }

  if (btnEffacer) {
    btnEffacer.addEventListener("click", function () {
      messagesEl.innerHTML = "";
      historique = [];
      messageAccueil();
    });
  }

  document.querySelectorAll(".avatar-choice").forEach(function (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem(CLE_AVATAR, btn.dataset.avatar);
      majAvatarBoutons();
      ajouterMessage("Et voilà, nouveau look ! 😎 Moi c'est " + AVATARS[avatarChoisi()].nom + ". On continue ?", "bot");
    });
  });

  apiKeySave.addEventListener("click", function () {
    const cle = apiKeyInput.value.trim();
    if (!cle) return;
    localStorage.setItem(CLE_STOCKAGE, cle);
    apiKeyInput.value = "";
    majBadge();
    ajouterMessage("Mode IA activé ! 🚀 Mes réponses vont être encore plus complètes — et toujours 100% Bible, promis.", "bot");
  });

  apiKeyClear.addEventListener("click", function () {
    localStorage.removeItem(CLE_STOCKAGE);
    historique = [];
    majBadge();
    ajouterMessage("Mode IA désactivé — retour à ma bonne vieille bibliothèque de versets 📚", "bot");
  });

  // Initialisation
  majBadge();
  majAvatarBoutons();
  messageAccueil();
})();
