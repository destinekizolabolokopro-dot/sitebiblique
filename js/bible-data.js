/* ==========================================================
   Lumière Biblique — base de données biblique
   Versets : traduction Louis Segond 1910 (domaine public)
   ========================================================== */

// ----- Versets du jour (roulement selon la date) -----
const VERSETS_DU_JOUR = [
  { texte: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier.", ref: "Psaume 119:105" },
  { texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", ref: "Jean 3:16" },
  { texte: "L'Éternel est mon berger : je ne manquerai de rien.", ref: "Psaume 23:1" },
  { texte: "Je puis tout par celui qui me fortifie.", ref: "Philippiens 4:13" },
  { texte: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu.", ref: "Ésaïe 41:10" },
  { texte: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.", ref: "Proverbes 3:5" },
  { texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", ref: "Matthieu 11:28" },
  { texte: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne.", ref: "Jean 14:27" },
  { texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.", ref: "Matthieu 6:33" },
  { texte: "L'amour est patient, il est plein de bonté ; l'amour n'est point envieux ; l'amour ne se vante point, il ne s'enfle point d'orgueil.", ref: "1 Corinthiens 13:4" },
  { texte: "Que tout ce qui respire loue l'Éternel ! Louez l'Éternel !", ref: "Psaume 150:6" },
  { texte: "Jésus-Christ est le même hier, aujourd'hui, et éternellement.", ref: "Hébreux 13:8" },
  { texte: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.", ref: "1 Pierre 5:7" },
  { texte: "Au commencement, Dieu créa les cieux et la terre.", ref: "Genèse 1:1" },
  { texte: "Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.", ref: "Jean 14:6" },
  { texte: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance.", ref: "Galates 5:22" },
  { texte: "Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira.", ref: "Matthieu 7:7" },
  { texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", ref: "Jérémie 29:11" },
  { texte: "Fortifiez-vous et ayez du courage ! Ne craignez point et ne soyez point effrayés, car l'Éternel, ton Dieu, marchera lui-même avec toi.", ref: "Deutéronome 31:6" },
  { texte: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !", ref: "Matthieu 5:9" },
  { texte: "La foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.", ref: "Hébreux 11:1" },
];

// ----- Versets célèbres, consultables par référence -----
// Clé normalisée : livre en minuscules sans accents + chapitre:verset
const VERSETS_PAR_REF = {
  "genese 1:1": { ref: "Genèse 1:1", texte: "Au commencement, Dieu créa les cieux et la terre." },
  "genese 1:27": { ref: "Genèse 1:27", texte: "Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme." },
  "exode 20:12": { ref: "Exode 20:12", texte: "Honore ton père et ta mère, afin que tes jours se prolongent dans le pays que l'Éternel, ton Dieu, te donne." },
  "psaume 23:1": { ref: "Psaume 23:1", texte: "L'Éternel est mon berger : je ne manquerai de rien." },
  "psaume 23:4": { ref: "Psaume 23:4", texte: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me rassurent." },
  "psaume 91:1": { ref: "Psaume 91:1", texte: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant." },
  "psaume 119:105": { ref: "Psaume 119:105", texte: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
  "proverbes 3:5": { ref: "Proverbes 3:5", texte: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse." },
  "esaie 41:10": { ref: "Ésaïe 41:10", texte: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante." },
  "esaie 53:5": { ref: "Ésaïe 53:5", texte: "Mais il était blessé pour nos péchés, brisé pour nos iniquités ; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris." },
  "jeremie 29:11": { ref: "Jérémie 29:11", texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
  "matthieu 5:9": { ref: "Matthieu 5:9", texte: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu !" },
  "matthieu 6:9": { ref: "Matthieu 6:9", texte: "Voici donc comment vous devez prier : Notre Père qui es aux cieux ! Que ton nom soit sanctifié." },
  "matthieu 6:33": { ref: "Matthieu 6:33", texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus." },
  "matthieu 7:7": { ref: "Matthieu 7:7", texte: "Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira." },
  "matthieu 11:28": { ref: "Matthieu 11:28", texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos." },
  "matthieu 28:19": { ref: "Matthieu 28:19", texte: "Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit." },
  "marc 12:30": { ref: "Marc 12:30", texte: "Tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, de toute ta pensée, et de toute ta force." },
  "luc 1:37": { ref: "Luc 1:37", texte: "Car rien n'est impossible à Dieu." },
  "jean 1:1": { ref: "Jean 1:1", texte: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu." },
  "jean 3:16": { ref: "Jean 3:16", texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
  "jean 8:12": { ref: "Jean 8:12", texte: "Je suis la lumière du monde ; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie." },
  "jean 14:6": { ref: "Jean 14:6", texte: "Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi." },
  "jean 14:27": { ref: "Jean 14:27", texte: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point." },
  "romains 8:28": { ref: "Romains 8:28", texte: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
  "romains 12:2": { ref: "Romains 12:2", texte: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu, ce qui est bon, agréable et parfait." },
  "1 corinthiens 13:4": { ref: "1 Corinthiens 13:4", texte: "L'amour est patient, il est plein de bonté ; l'amour n'est point envieux ; l'amour ne se vante point, il ne s'enfle point d'orgueil." },
  "1 corinthiens 13:13": { ref: "1 Corinthiens 13:13", texte: "Maintenant donc ces trois choses demeurent : la foi, l'espérance, l'amour ; mais la plus grande de ces choses, c'est l'amour." },
  "galates 5:22": { ref: "Galates 5:22", texte: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance." },
  "ephesiens 2:8": { ref: "Éphésiens 2:8", texte: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu." },
  "philippiens 4:6": { ref: "Philippiens 4:6", texte: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces." },
  "philippiens 4:13": { ref: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie." },
  "hebreux 11:1": { ref: "Hébreux 11:1", texte: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas." },
  "hebreux 13:8": { ref: "Hébreux 13:8", texte: "Jésus-Christ est le même hier, aujourd'hui, et éternellement." },
  "jacques 1:5": { ref: "Jacques 1:5", texte: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée." },
  "1 pierre 5:7": { ref: "1 Pierre 5:7", texte: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous." },
  "1 jean 4:8": { ref: "1 Jean 4:8", texte: "Celui qui n'aime pas n'a pas connu Dieu, car Dieu est amour." },
  "apocalypse 21:4": { ref: "Apocalypse 21:4", texte: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu." },
};

// ----- Thèmes : mots-clés → versets et parole pastorale -----
const THEMES = [
  {
    nom: "la peur et l'angoisse",
    motscles: ["peur", "angoisse", "anxiete", "anxieux", "inquiet", "inquietude", "stress", "crainte", "effraye"],
    conseil: "Hé, respire un coup 😊 Avoir peur, c'est normal, ça arrive à tout le monde. Mais rappelle-toi : Dieu marche avec toi, littéralement. Balance-lui tes craintes dans la prière — Il est bien plus grand que tout ce qui te fait flipper.",
    versets: ["esaie 41:10", "psaume 23:4", "jean 14:27", "philippiens 4:6"],
  },
  {
    nom: "l'amour",
    motscles: ["amour", "aimer", "aime", "charite"],
    conseil: "L'amour, c'est LE cœur de l'Évangile ❤️ Dieu t'a aimé le premier, avant même que tu penses à Lui. Et du coup, Il t'invite à faire pareil : aimer les gens autour de toi comme toi-même. Simple à dire, moins simple à faire — mais tu n'es pas seul pour ça !",
    versets: ["1 jean 4:8", "1 corinthiens 13:4", "1 corinthiens 13:13", "jean 3:16", "marc 12:30"],
  },
  {
    nom: "le pardon",
    motscles: ["pardon", "pardonner", "rancune", "reconciliation", "vengeance", "offense"],
    conseil: "Le pardon, c'est pas un cadeau que tu fais à l'autre — c'est toi que ça libère 🕊️ Jésus a pardonné à ceux qui le clouaient sur la croix, alors on peut faire un effort pour le pote qui nous a vexés, non ? Et pas juste une fois : soixante-dix fois sept fois, dit Jésus (Matthieu 18:22). Autrement dit : sans compter.",
    versets: ["esaie 53:5", "matthieu 6:9", "ephesiens 2:8"],
  },
  {
    nom: "la foi",
    motscles: ["foi", "croire", "crois", "doute", "douter", "confiance"],
    conseil: "T'inquiète, même les plus grands saints ont eu des doutes 😉 La foi, c'est comme une graine de moutarde : minuscule au départ, énorme à l'arrivée. Nourris-la un peu chaque jour — une prière, quelques versets, du temps avec d'autres croyants — et tu verras qu'elle pousse toute seule.",
    versets: ["hebreux 11:1", "proverbes 3:5", "luc 1:37", "romains 8:28"],
  },
  {
    nom: "l'espérance et l'avenir",
    motscles: ["esperance", "espoir", "avenir", "futur", "projet", "decouragement", "decourage", "desespoir"],
    conseil: "Garde la tête haute ✨ Même quand tout semble bouché, Dieu a un plan pour toi — un vrai, un bon. Il écrit droit même avec nos lignes tordues, et Il fait tout tourner au bien de ceux qui L'aiment. Le meilleur reste à venir, crois-moi.",
    versets: ["jeremie 29:11", "romains 8:28", "apocalypse 21:4"],
  },
  {
    nom: "la tristesse et le deuil",
    motscles: ["triste", "tristesse", "deuil", "pleure", "pleurer", "larmes", "chagrin", "mort", "deces", "souffrance", "souffre"],
    conseil: "Je suis de tout cœur avec toi 💛 Le Seigneur est tout proche de ceux qui ont le cœur brisé — c'est écrit noir sur blanc. Pleurer, c'est pas être faible : même Jésus a pleuré. Et un jour, Il essuiera toute larme de nos yeux, promis. En attendant, tu n'es pas seul : parle-Lui, et parle aussi à des gens qui t'aiment.",
    versets: ["apocalypse 21:4", "matthieu 11:28", "psaume 23:4", "1 pierre 5:7"],
  },
  {
    nom: "la paix",
    motscles: ["paix", "calme", "serenite", "repos", "tranquillite"],
    conseil: "La paix de Jésus, c'est pas la paix « tout va bien dans ma vie » — c'est la paix qui tient même quand ça secoue 😌 Elle vient de l'intérieur, dans la prière et la confiance. Pose ton téléphone cinq minutes, respire, et parle-Lui : tu verras la différence.",
    versets: ["jean 14:27", "matthieu 5:9", "philippiens 4:6"],
  },
  {
    nom: "la prière",
    motscles: ["prier", "priere", "notre pere", "intercession", "comment prier"],
    conseil: "Prier, c'est juste parler à Dieu comme à un ami — pas besoin de grands mots compliqués 🙏 Dis-Lui merci, dis-Lui ce qui va pas, demande-Lui ce qu'il te faut. Et si tu sais pas par où commencer, Jésus nous a laissé le mode d'emploi parfait : le Notre Père (Matthieu 6:9-13).",
    versets: ["matthieu 6:9", "matthieu 7:7", "philippiens 4:6", "jacques 1:5"],
  },
  {
    nom: "la force et le courage",
    motscles: ["force", "courage", "fatigue", "epuise", "faible", "faiblesse", "abandonner"],
    conseil: "T'es à plat ? C'est justement là que Dieu fait ses meilleurs trucs 💪 Sa puissance s'accomplit dans la faiblesse (2 Corinthiens 12:9) — autrement dit, quand t'as plus de batterie, branche-toi sur la Sienne. Repose-toi, prie, et repars.",
    versets: ["philippiens 4:13", "esaie 41:10", "matthieu 11:28"],
  },
  {
    nom: "la sagesse et les décisions",
    motscles: ["sagesse", "decision", "choix", "choisir", "discernement", "conseil"],
    conseil: "Gros choix en vue ? Bonne nouvelle : la sagesse, Dieu en donne gratos à qui la demande, sans juger 😄 (Jacques 1:5). Prie, pèse le pour et le contre, demande conseil à des gens sages… et fais confiance : Il guide ceux qui Le cherchent.",
    versets: ["jacques 1:5", "proverbes 3:5", "romains 12:2"],
  },
  {
    nom: "la famille",
    motscles: ["famille", "parents", "pere", "mere", "enfants", "mariage", "epoux", "epouse", "couple"],
    conseil: "La famille, c'est un cadeau… même les jours où elle nous fatigue 😅 C'est là qu'on apprend à aimer pour de vrai : avec du respect, de la patience et pas mal de pardon. Prends soin des tiens comme le Christ prend soin de nous.",
    versets: ["exode 20:12", "genese 1:27", "1 corinthiens 13:4"],
  },
  {
    nom: "le salut et la grâce",
    motscles: ["salut", "sauve", "grace", "vie eternelle", "paradis", "ciel", "peche", "peches"],
    conseil: "Le salut, c'est le plus beau cadeau de l'histoire, et il est 100% gratuit 🎁 Pas besoin de le mériter — d'ailleurs personne ne le pourrait. Jésus a tout payé sur la croix. Toi, t'as juste à l'accueillir avec un cœur sincère et à Le suivre. C'est ça, la Bonne Nouvelle !",
    versets: ["ephesiens 2:8", "jean 3:16", "jean 14:6"],
  },
];

// ----- Étymologies bibliques -----
const ETYMOLOGIES = {
  "amen": "« Amen » vient de l'hébreu אָמֵן (amen), de la racine aman qui signifie « être ferme, fiable, vrai ». Dire « Amen », c'est proclamer : « c'est vrai, qu'il en soit ainsi ! ». Jésus l'emploie souvent : « En vérité (Amen), je vous le dis… »",
  "alleluia": "« Alléluia » vient de l'hébreu הַלְלוּ־יָהּ (hallelou-Yah) : hallelou (« louez ! ») + Yah (forme courte de YHWH, le nom de Dieu). Cela signifie donc « Louez le Seigneur ! ». On le trouve surtout dans les Psaumes.",
  "evangile": "« Évangile » vient du grec εὐαγγέλιον (euangelion) : eu (« bon ») + angelion (« message, nouvelle »). C'est la « Bonne Nouvelle » du salut en Jésus-Christ.",
  "bible": "« Bible » vient du grec τὰ βιβλία (ta biblia), « les livres », lui-même issu de Byblos, ville phénicienne d'où venait le papyrus. La Bible est donc littéralement « la bibliothèque » des livres saints.",
  "christ": "« Christ » vient du grec Χριστός (Christos), traduction de l'hébreu מָשִׁיחַ (Mashiah, « Messie »), qui signifie « Oint » : celui qui a reçu l'onction d'huile, consacré par Dieu comme roi, prêtre et prophète.",
  "messie": "« Messie » vient de l'hébreu מָשִׁיחַ (Mashiah), « l'Oint » — celui qui a reçu l'onction sainte. En grec, il se traduit par Christos, d'où le mot « Christ ».",
  "jesus": "« Jésus » vient de l'hébreu יֵשׁוּעַ (Yeshoua), forme de Yehoshoua (Josué), qui signifie « YHWH sauve », « Dieu est salut ». Le nom même de Jésus annonce sa mission : sauver son peuple de ses péchés (Matthieu 1:21).",
  "emmanuel": "« Emmanuel » vient de l'hébreu עִמָּנוּאֵל : immanou (« avec nous ») + El (« Dieu »), soit « Dieu avec nous ». C'est le nom prophétique donné au Messie en Ésaïe 7:14 et repris en Matthieu 1:23.",
  "eglise": "« Église » vient du grec ἐκκλησία (ekklesia), « assemblée convoquée », de ek-kaleo (« appeler hors de »). L'Église est le peuple des appelés, rassemblé par Dieu.",
  "bapteme": "« Baptême » vient du grec βάπτισμα (baptisma), du verbe baptizein : « plonger, immerger ». Le baptême est une plongée dans la mort et la résurrection du Christ pour renaître à une vie nouvelle (Romains 6:4).",
  "apotre": "« Apôtre » vient du grec ἀπόστολος (apostolos), « envoyé », du verbe apostellein (« envoyer en mission »). Les apôtres sont les envoyés du Christ pour annoncer l'Évangile.",
  "prophete": "« Prophète » vient du grec προφήτης (prophetes) : pro (« devant, à la place de ») + phemi (« parler »). Le prophète est celui qui parle au nom de Dieu, son porte-parole.",
  "hosanna": "« Hosanna » vient de l'hébreu הוֹשַׁע־נָא (hosha-na), « sauve, de grâce ! » (Psaume 118:25). Devenu acclamation de louange, il fut crié à l'entrée de Jésus à Jérusalem (Matthieu 21:9).",
  "pasteur": "« Pasteur » vient du latin pastor, « berger ». Jésus se présente comme « le bon berger qui donne sa vie pour ses brebis » (Jean 10:11) ; le pasteur veille sur le troupeau de Dieu.",
  "trinite": "« Trinité » vient du latin trinitas, « triade, le fait d'être trois ». Le mot n'est pas dans la Bible, mais il exprime la révélation biblique d'un seul Dieu en trois personnes : le Père, le Fils et le Saint-Esprit (Matthieu 28:19).",
  "eucharistie": "« Eucharistie » vient du grec εὐχαριστία (eucharistia), « action de grâces ». Lors de la Cène, Jésus « rendit grâces » avant de rompre le pain (Luc 22:19) : l'Eucharistie est le grand merci de l'Église à Dieu.",
  "messe": "« Messe » vient du latin missa, du renvoi final Ite, missa est (« Allez, c'est l'envoi »). La messe s'achève par l'envoi des fidèles en mission pour porter l'Évangile dans le monde.",
  "abba": "« Abba » est un mot araméen signifiant « papa, père bien-aimé ». Jésus l'emploie pour s'adresser à Dieu (Marc 14:36), et l'Esprit nous fait crier à notre tour « Abba ! Père ! » (Romains 8:15).",
  "golgotha": "« Golgotha » vient de l'araméen gulgolta, « le crâne » (en latin calvaria, d'où « Calvaire »). C'est le lieu, hors des murs de Jérusalem, où Jésus fut crucifié (Jean 19:17).",
  "paques": "« Pâques » vient de l'hébreu פֶּסַח (Pessah), « passage ». La Pâque juive célèbre la sortie d'Égypte ; la Pâque chrétienne célèbre le passage de Jésus de la mort à la vie : sa résurrection.",
  "sabbat": "« Sabbat » vient de l'hébreu שַׁבָּת (shabbat), « cessation, repos », du verbe shavat (« cesser »). C'est le septième jour, consacré à Dieu, en mémoire du repos du Créateur (Genèse 2:2-3).",
  "diable": "« Diable » vient du grec διάβολος (diabolos), « celui qui divise, l'accusateur, le calomniateur ». La Bible l'appelle aussi Satan, de l'hébreu satan, « l'adversaire ».",
  "ange": "« Ange » vient du grec ἄγγελος (angelos), « messager ». Les anges sont les messagers de Dieu, envoyés pour annoncer sa parole et protéger les siens (Psaume 91:11).",
  "torah": "« Torah » vient de l'hébreu תּוֹרָה, « enseignement, instruction, loi ». Elle désigne les cinq premiers livres de la Bible (le Pentateuque) : Genèse, Exode, Lévitique, Nombres, Deutéronome.",
  "psaume": "« Psaume » vient du grec ψαλμός (psalmos), « chant accompagné d'un instrument à cordes », du verbe psallein (« pincer les cordes »). Les 150 Psaumes sont le livre de prière et de louange d'Israël et de l'Église.",
};

// ----- Grands personnages bibliques (pour l'assistant) -----
const PERSONNAGES = {
  "moise": "Moïse est le grand libérateur d'Israël. Sauvé des eaux du Nil, appelé par Dieu au buisson ardent (Exode 3), il conduit le peuple hors d'Égypte, traverse la mer Rouge et reçoit les Dix Commandements au Sinaï (Exode 20). Il préfigure le Christ, le libérateur ultime.",
  "abraham": "Abraham est le père des croyants. Dieu l'appelle à quitter son pays (Genèse 12) et lui promet une descendance aussi nombreuse que les étoiles. Sa foi fut mise à l'épreuve avec son fils Isaac (Genèse 22). « Abraham crut à Dieu, et cela lui fut imputé à justice » (Romains 4:3).",
  "david": "David, jeune berger devenu roi d'Israël, a vaincu le géant Goliath avec une simple fronde et sa confiance en Dieu (1 Samuel 17). Auteur de nombreux Psaumes, il est appelé « l'homme selon le cœur de Dieu ». Le Messie est issu de sa lignée.",
  "marie": "Marie, humble jeune fille de Nazareth, a dit « oui » à Dieu lors de l'Annonciation (Luc 1:38) et est devenue la mère de Jésus, le Fils de Dieu. Son cantique, le Magnificat (Luc 1:46-55), chante la grandeur du Seigneur. Elle est un modèle de foi et d'obéissance.",
  "paul": "Paul (d'abord Saul de Tarse) persécutait les chrétiens avant sa rencontre bouleversante avec le Christ ressuscité sur le chemin de Damas (Actes 9). Devenu l'apôtre des nations, il a fondé de nombreuses Églises et écrit une grande partie du Nouveau Testament.",
  "pierre": "Pierre, pêcheur de Galilée appelé par Jésus, est le premier des apôtres. Jésus lui dit : « Tu es Pierre, et sur cette pierre je bâtirai mon Église » (Matthieu 16:18). Malgré son reniement, il fut relevé par le Christ et devint un pilier de l'Église naissante.",
  "noe": "Noé, homme juste dans une génération corrompue, construisit l'arche sur l'ordre de Dieu et fut sauvé du déluge avec sa famille (Genèse 6-9). L'arc-en-ciel est le signe de l'alliance que Dieu conclut alors avec toute la création.",
  "jonas": "Jonas, prophète en fuite, fut jeté à la mer et englouti trois jours par un grand poisson avant d'accomplir sa mission à Ninive (livre de Jonas). Jésus y voit le signe de sa propre résurrection après trois jours (Matthieu 12:40).",
  "salomon": "Salomon, fils de David, demanda à Dieu non pas la richesse mais la sagesse pour gouverner (1 Rois 3). Il bâtit le premier Temple de Jérusalem. Les livres des Proverbes et de l'Ecclésiaste sont rattachés à sa sagesse.",
  "jean-baptiste": "Jean-Baptiste est le précurseur du Messie : « la voix qui crie dans le désert : préparez le chemin du Seigneur » (Matthieu 3:3). Il baptisait dans le Jourdain et désigna Jésus comme « l'Agneau de Dieu qui ôte le péché du monde » (Jean 1:29).",
};

// ----- Prières du jour (roulement quotidien) -----
const PRIERES = [
  {
    titre: "Le Notre Père",
    texte: "Notre Père qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
    source: "Matthieu 6:9-13",
  },
  {
    titre: "Prière du matin",
    texte: "Seigneur, merci pour cette nouvelle journée que tu me donnes. Marche avec moi, éclaire mes choix, donne-moi un cœur joyeux et attentif aux autres. Que tout ce que je ferai aujourd'hui te rende gloire. Amen.",
    source: "Inspirée du Psaume 118:24",
  },
  {
    titre: "Prière du soir",
    texte: "Seigneur, la journée se termine et je viens me poser près de toi. Merci pour les belles choses, pardon pour mes manquements. Garde-moi cette nuit, ainsi que tous ceux que j'aime. Je m'endors en paix, car toi seul me donnes le repos. Amen.",
    source: "Inspirée du Psaume 4:9",
  },
  {
    titre: "Prière de confiance",
    texte: "Seigneur Jésus, je dépose entre tes mains mes soucis, mes projets et mes peurs. Tu sais mieux que moi ce dont j'ai besoin. Augmente ma foi, et apprends-moi à te faire confiance un jour à la fois. Amen.",
    source: "Inspirée de Matthieu 6:34",
  },
  {
    titre: "Prière de louange",
    texte: "Mon Dieu, tu es grand et tu es bon ! Merci pour la vie, pour la création, pour ton amour qui ne s'arrête jamais. Que mon cœur chante pour toi aujourd'hui : Alléluia ! Amen.",
    source: "Inspirée du Psaume 150",
  },
  {
    titre: "Prière pour les autres",
    texte: "Seigneur, je te confie ma famille, mes amis, et tous ceux qui traversent une épreuve. Console ceux qui pleurent, guéris ceux qui souffrent, et donne-moi un cœur généreux pour aider autour de moi. Amen.",
    source: "Inspirée de Galates 6:2",
  },
  {
    titre: "Prière de pardon",
    texte: "Père très bon, tu connais mon cœur. Pardonne-moi le mal que j'ai fait et le bien que je n'ai pas fait. Aide-moi aussi à pardonner à ceux qui m'ont blessé, comme toi tu me pardonnes. Rends mon cœur léger et neuf. Amen.",
    source: "Inspirée du Psaume 51",
  },
];
