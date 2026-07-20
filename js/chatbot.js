/* ==========================================================
   Assistant biblique
   - Mode local : moteur de réponses fondé sur la base de
     versets, thèmes, étymologies et personnages (bible-data.js)
   - Mode IA (facultatif) : appel direct de l'API Claude avec
     un cadrage biblique, chaleureux et détendu
   - Guides dessinés en pied (style jeu vidéo), au choix
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
  const guideFigure = document.getElementById("guideFigure");
  const guideNom = document.getElementById("guideNom");

  const CLE_STOCKAGE = "lumiere-biblique-api-key";
  const CLE_AVATAR = "lumiere-biblique-avatar";
  const CONSEIL_PROCHES = "Pour aller plus loin, parles-en aussi à tes parents, à un prêtre ou à un pasteur : rien ne remplace un échange en vrai.";
  let historique = []; // pour le mode IA

  // ---------- Guides dessinés (têtes pour les bulles, silhouettes en pied) ----------

  const AVATARS = {
    homme: {
      nom: "Théo",
      role: "Ton guide biblique",
      tete: '<svg viewBox="0 0 64 64" role="img" aria-label="Théo">' +
        '<circle cx="32" cy="32" r="32" fill="#fdf0e0"/>' +
        '<ellipse cx="32" cy="58" rx="19" ry="13" fill="#b0413e"/>' +
        '<circle cx="32" cy="27" r="17" fill="#3d2a1a"/>' +
        '<circle cx="32" cy="31" r="14.5" fill="#e8b184"/>' +
        '<ellipse cx="32" cy="19.5" rx="14" ry="7.5" fill="#3d2a1a"/>' +
        '<circle cx="26" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="38" cy="30" r="2.1" fill="#26221c"/>' +
        '<circle cx="26.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<circle cx="38.8" cy="29.3" r="0.7" fill="#fff"/>' +
        '<path d="M25 37 Q32 43 39 37" stroke="#8f5b3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '</svg>',
      figure: '<svg viewBox="0 0 140 260" role="img" aria-label="Théo, ton guide biblique">' +
        '<ellipse cx="70" cy="250" rx="40" ry="7" fill="rgba(38,34,28,0.10)"/>' +
        // jambes en jean
        '<rect x="50" y="168" width="16" height="70" rx="7" fill="#3b5b82"/>' +
        '<rect x="74" y="168" width="16" height="70" rx="7" fill="#3b5b82"/>' +
        '<rect x="50" y="168" width="16" height="12" fill="#335072"/>' +
        '<rect x="74" y="168" width="16" height="12" fill="#335072"/>' +
        // baskets
        '<ellipse cx="57" cy="243" rx="14" ry="7" fill="#ffffff" stroke="#d8d3c8" stroke-width="2"/>' +
        '<ellipse cx="83" cy="243" rx="14" ry="7" fill="#ffffff" stroke="#d8d3c8" stroke-width="2"/>' +
        // bras gauche le long du corps
        '<rect x="34" y="112" width="13" height="56" rx="6.5" fill="#b0413e" transform="rotate(10 40 112)"/>' +
        '<circle cx="35" cy="170" r="7" fill="#e8b184"/>' +
        // bras droit levé (salut)
        '<rect x="94" y="66" width="13" height="56" rx="6.5" fill="#b0413e" transform="rotate(150 100 122)"/>' +
        '<circle cx="122" cy="78" r="7.5" fill="#e8b184"/>' +
        // torse : t-shirt
        '<rect x="44" y="104" width="52" height="72" rx="18" fill="#b0413e"/>' +
        '<rect x="67" y="120" width="6" height="22" rx="2.5" fill="#ffffff"/>' +
        '<rect x="60" y="126" width="20" height="6" rx="2.5" fill="#ffffff"/>' +
        // cou et tête
        '<rect x="62" y="92" width="16" height="14" rx="6" fill="#e8b184"/>' +
        '<circle cx="70" cy="66" r="28" fill="#3d2a1a"/>' +
        '<circle cx="70" cy="72" r="24" fill="#e8b184"/>' +
        '<ellipse cx="70" cy="50" rx="23" ry="12" fill="#3d2a1a"/>' +
        '<circle cx="60" cy="70" r="3.2" fill="#26221c"/>' +
        '<circle cx="80" cy="70" r="3.2" fill="#26221c"/>' +
        '<circle cx="61.2" cy="68.8" r="1.1" fill="#fff"/>' +
        '<circle cx="81.2" cy="68.8" r="1.1" fill="#fff"/>' +
        '<path d="M59 82 Q70 91 81 82" stroke="#8f5b3a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="52" cy="78" r="3.5" fill="#f0a37b" opacity="0.5"/>' +
        '<circle cx="88" cy="78" r="3.5" fill="#f0a37b" opacity="0.5"/>' +
        '</svg>',
    },
    femme: {
      nom: "Léa",
      role: "Ta guide biblique",
      tete: '<svg viewBox="0 0 64 64" role="img" aria-label="Léa">' +
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
        '</svg>',
      figure: '<svg viewBox="0 0 140 260" role="img" aria-label="Léa, ta guide biblique">' +
        '<ellipse cx="70" cy="250" rx="40" ry="7" fill="rgba(38,34,28,0.10)"/>' +
        '<rect x="50" y="168" width="16" height="70" rx="7" fill="#3b5b82"/>' +
        '<rect x="74" y="168" width="16" height="70" rx="7" fill="#3b5b82"/>' +
        '<rect x="50" y="168" width="16" height="12" fill="#335072"/>' +
        '<rect x="74" y="168" width="16" height="12" fill="#335072"/>' +
        '<ellipse cx="57" cy="243" rx="14" ry="7" fill="#f3f1ec" stroke="#d8d3c8" stroke-width="2"/>' +
        '<ellipse cx="83" cy="243" rx="14" ry="7" fill="#f3f1ec" stroke="#d8d3c8" stroke-width="2"/>' +
        '<rect x="34" y="112" width="13" height="56" rx="6.5" fill="#2f7a3d" transform="rotate(10 40 112)"/>' +
        '<circle cx="35" cy="170" r="7" fill="#9c6644"/>' +
        '<rect x="94" y="66" width="13" height="56" rx="6.5" fill="#2f7a3d" transform="rotate(150 100 122)"/>' +
        '<circle cx="122" cy="78" r="7.5" fill="#9c6644"/>' +
        '<rect x="44" y="104" width="52" height="72" rx="18" fill="#2f7a3d"/>' +
        '<circle cx="70" cy="130" r="5" fill="#c9a227"/>' +
        '<rect x="62" y="92" width="16" height="14" rx="6" fill="#9c6644"/>' +
        // chignons et chevelure
        '<circle cx="38" cy="52" r="11" fill="#1f130b"/>' +
        '<circle cx="102" cy="52" r="11" fill="#1f130b"/>' +
        '<circle cx="70" cy="62" r="29" fill="#1f130b"/>' +
        '<circle cx="70" cy="72" r="23" fill="#9c6644"/>' +
        '<ellipse cx="70" cy="50" rx="22" ry="11" fill="#1f130b"/>' +
        '<circle cx="60" cy="70" r="3.2" fill="#26221c"/>' +
        '<circle cx="80" cy="70" r="3.2" fill="#26221c"/>' +
        '<circle cx="61.2" cy="68.8" r="1.1" fill="#fff"/>' +
        '<circle cx="81.2" cy="68.8" r="1.1" fill="#fff"/>' +
        '<path d="M60 82 Q70 90 80 82" stroke="#5e3a24" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="93" cy="72" r="2.6" fill="#c9a227"/>' +
        '</svg>',
    },
    enfant: {
      nom: "Sam",
      role: "Ton copain biblique",
      tete: '<svg viewBox="0 0 64 64" role="img" aria-label="Sam">' +
        '<circle cx="32" cy="32" r="32" fill="#fdf6e3"/>' +
        '<ellipse cx="32" cy="58" rx="18" ry="12" fill="#c9a227"/>' +
        '<circle cx="32" cy="32" r="14" fill="#f2c79b"/>' +
        '<ellipse cx="32" cy="21" rx="14" ry="8" fill="#b0413e"/>' +
        '<rect x="18" y="20" width="28" height="4" rx="2" fill="#8f312f"/>' +
        '<circle cx="26.5" cy="31" r="2" fill="#26221c"/>' +
        '<circle cx="37.5" cy="31" r="2" fill="#26221c"/>' +
        '<circle cx="27.2" cy="30.3" r="0.65" fill="#fff"/>' +
        '<circle cx="38.2" cy="30.3" r="0.65" fill="#fff"/>' +
        '<path d="M26.5 37.5 Q32 42.5 37.5 37.5" stroke="#a5714a" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
        '<circle cx="23" cy="35" r="0.9" fill="#d99a66"/>' +
        '<circle cx="41" cy="35" r="0.9" fill="#d99a66"/>' +
        '</svg>',
      figure: '<svg viewBox="0 0 140 260" role="img" aria-label="Sam, ton copain biblique">' +
        '<ellipse cx="70" cy="250" rx="36" ry="7" fill="rgba(38,34,28,0.10)"/>' +
        '<rect x="52" y="182" width="15" height="56" rx="7" fill="#3b5b82"/>' +
        '<rect x="74" y="182" width="15" height="56" rx="7" fill="#3b5b82"/>' +
        '<rect x="52" y="182" width="15" height="10" fill="#335072"/>' +
        '<rect x="74" y="182" width="15" height="10" fill="#335072"/>' +
        '<ellipse cx="58" cy="243" rx="13" ry="7" fill="#ffffff" stroke="#d8d3c8" stroke-width="2"/>' +
        '<ellipse cx="82" cy="243" rx="13" ry="7" fill="#ffffff" stroke="#d8d3c8" stroke-width="2"/>' +
        '<rect x="38" y="132" width="12" height="48" rx="6" fill="#c9a227" transform="rotate(10 44 132)"/>' +
        '<circle cx="38" cy="182" r="6.5" fill="#f2c79b"/>' +
        '<rect x="92" y="94" width="12" height="48" rx="6" fill="#c9a227" transform="rotate(150 98 142)"/>' +
        '<circle cx="116" cy="104" r="7" fill="#f2c79b"/>' +
        '<rect x="46" y="124" width="48" height="64" rx="16" fill="#c9a227"/>' +
        '<rect x="46" y="150" width="48" height="7" fill="#b8921f"/>' +
        '<rect x="62" y="114" width="16" height="12" rx="6" fill="#f2c79b"/>' +
        '<circle cx="70" cy="86" r="26" fill="#f2c79b"/>' +
        // casquette
        '<ellipse cx="70" cy="68" rx="26" ry="14" fill="#b0413e"/>' +
        '<rect x="42" y="66" width="56" height="7" rx="3.5" fill="#8f312f"/>' +
        '<circle cx="70" cy="55" r="5" fill="#8f312f"/>' +
        '<circle cx="61" cy="86" r="3" fill="#26221c"/>' +
        '<circle cx="79" cy="86" r="3" fill="#26221c"/>' +
        '<circle cx="62.1" cy="84.9" r="1" fill="#fff"/>' +
        '<circle cx="80.1" cy="84.9" r="1" fill="#fff"/>' +
        '<path d="M61 96 Q70 104 79 96" stroke="#a5714a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="53" cy="92" r="1.4" fill="#d99a66"/>' +
        '<circle cx="57" cy="95" r="1.4" fill="#d99a66"/>' +
        '<circle cx="87" cy="92" r="1.4" fill="#d99a66"/>' +
        '<circle cx="83" cy="95" r="1.4" fill="#d99a66"/>' +
        '</svg>',
    },
  };

  function avatarChoisi() {
    const a = localStorage.getItem(CLE_AVATAR);
    return AVATARS[a] ? a : "homme";
  }

  function majGuide() {
    const guide = AVATARS[avatarChoisi()];
    if (guideFigure) guideFigure.innerHTML = guide.figure;
    if (guideNom) guideNom.textContent = guide.nom;
    const roleEl = document.getElementById("guideRole");
    if (roleEl) roleEl.textContent = guide.role;
    document.querySelectorAll(".avatar-choice").forEach(function (btn) {
      if (!btn.innerHTML.trim()) btn.innerHTML = AVATARS[btn.dataset.avatar].tete;
      btn.classList.toggle("selected", btn.dataset.avatar === avatarChoisi());
    });
    document.querySelectorAll(".msg-avatar").forEach(function (el) {
      el.innerHTML = AVATARS[avatarChoisi()].tete;
    });
    document.querySelectorAll(".msg-nom").forEach(function (el) {
      el.textContent = AVATARS[avatarChoisi()].nom;
    });
  }

  const PROMPT_SYSTEME = `Tu es « l'Assistant biblique » du site Lumière Biblique. Tu es un jeune guide spirituel chrétien, chaleureux et naturel : tu tutoies, tu parles simplement, comme un grand frère ou une grande sœur dans la foi. Tu restes profondément croyant et fidèle aux Écritures.

Règles absolues :
1. Tu réponds UNIQUEMENT aux questions liées à la Bible, à la foi chrétienne, à la prière, à la liturgie, à l'histoire biblique, à l'étymologie des mots bibliques et à la vie spirituelle chrétienne.
2. Si la question est hors sujet (sport, politique, technologie, devoirs scolaires, etc.), tu refuses avec gentillesse et tu ramènes la conversation vers la Parole de Dieu.
3. Tu n'es pas neutre : tu parles en croyant chrétien convaincu, sans lourdeur ni ton moralisateur.
4. Tu cites toujours des versets bibliques précis avec leurs références (livre chapitre:verset).
5. Tu restes concis : quelques phrases suffisent. Pas de longues listes ni de grandes descriptions. Très peu d'emojis, voire aucun.
6. Quand la question est importante ou personnelle (foi, souffrance, choix de vie, sacrements), termine en invitant la personne à en parler aussi à ses parents, à un prêtre ou à un pasteur : tu ne remplaces pas un accompagnement réel.
7. Tu réponds en français.`;

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

    const row = document.createElement("div");
    row.className = "msg-row";

    const avatar = document.createElement("div");
    avatar.className = "msg-avatar";
    avatar.innerHTML = AVATARS[avatarChoisi()].tete;

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
      "Tiens, un verset surprise rien que pour toi :",
      "Petit cadeau du jour :",
      "Voilà de quoi éclairer ta journée :",
    ];
    return intros[Math.floor(Math.random() * intros.length)] +
      "\n📖 « " + v.texte + " » — " + v.ref +
      "\nGarde-le dans un coin de ta tête aujourd'hui.";
  }

  function reponseLocale(brut) {
    const question = normaliser(brut);

    if (estSalutation(question)) {
      return "Salut, la paix du Christ ! Moi c'est " + AVATARS[avatarChoisi()].nom + ". Tu peux me demander un thème (la peur, l'amour, le pardon…), un verset précis (« Jean 3:16 »), l'origine d'un mot (« Amen ») ou un personnage biblique. Qu'est-ce qui te trotte dans la tête ?";
    }

    if (estRemerciement(question)) {
      return "Avec plaisir. Que le Seigneur te bénisse et te garde (Nombres 6:24). Une autre question ?";
    }

    if (/verset surprise|surprends moi|verset aleatoire|au hasard/.test(question)) {
      return versetSurprise();
    }

    const ref = chercherReference(question);
    if (ref) {
      return "Le voilà :\n📖 « " + ref.texte + " » — " + ref.ref + "\nPrends une minute pour le méditer.";
    }

    const ety = chercherEtymologie(question);
    if (ety) {
      return "Bonne question. " + ety.texte;
    }

    const perso = chercherPersonnage(question);
    if (perso) {
      return perso + "\nUn bel exemple de foi, non ?";
    }

    const theme = chercherTheme(question);
    if (theme) {
      let r = "Voilà ce que la Bible dit sur " + theme.nom + " :\n";
      theme.versets.slice(0, 3).forEach(function (cle) {
        const c = citer(cle);
        if (c) r += c + "\n";
      });
      r += theme.conseil;
      return r;
    }

    if (estHorsSujet(question)) {
      return "Désolé, moi c'est la Bible sinon rien. Pose-moi une question sur un verset, un personnage ou un thème de la vie — tu seras surpris de ce qu'on y trouve.";
    }

    return "Hmm, je n'ai pas trouvé ça dans ma bibliothèque. Essaie plutôt :\n• un thème : « Que dit la Bible sur la peur / l'amour / le pardon ? »\n• une référence : « Montre-moi Jean 3:16 »\n• une étymologie : « D'où vient le mot Amen ? »\n• un personnage : « Qui est Moïse ? »\n• ou tape « verset surprise »\n" + CONSEIL_PROCHES;
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
      const attente = ajouterMessage("Je réfléchis…", "bot");
      attente.classList.add("msg-typing");
      try {
        let texte = await reponseIA(question);
        // Rappel systématique après une réponse générée par l'IA
        if (!/parents|pretre|prêtre|pasteur/i.test(texte)) {
          texte += "\n\n" + CONSEIL_PROCHES;
        }
        attente.remove();
        ajouterMessage(texte, "bot");
      } catch (e) {
        attente.remove();
        ajouterMessage("Le mode IA a rencontré un problème (" + e.message + "). Je te réponds avec ma bibliothèque locale :\n\n" + reponseLocale(question), "bot");
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
      "Salut, moi c'est " + AVATARS[avatarChoisi()].nom + ". Versets, personnages, étymologies, conseils : je suis là pour t'aider à découvrir la Bible.\nJe ne remplace ni un prêtre, ni un pasteur, ni tes parents — pour les grandes questions, parles-en aussi autour de toi.\nAstuce : tape « verset surprise » ou clique sur le dé pour recevoir un verset au hasard.",
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
      ajouterMessage("Verset surprise !", "user");
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
      majGuide();
      ajouterMessage("Nouveau guide : moi c'est " + AVATARS[avatarChoisi()].nom + ". On continue ?", "bot");
    });
  });

  apiKeySave.addEventListener("click", function () {
    const cle = apiKeyInput.value.trim();
    if (!cle) return;
    localStorage.setItem(CLE_STOCKAGE, cle);
    apiKeyInput.value = "";
    majBadge();
    ajouterMessage("Mode IA activé : mes réponses seront plus complètes, et toujours fidèles à la Bible.", "bot");
  });

  apiKeyClear.addEventListener("click", function () {
    localStorage.removeItem(CLE_STOCKAGE);
    historique = [];
    majBadge();
    ajouterMessage("Mode IA désactivé : je réponds à nouveau avec ma bibliothèque locale de versets.", "bot");
  });

  // Initialisation
  majBadge();
  majGuide();
  messageAccueil();
})();
