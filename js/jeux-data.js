/* ==========================================================
   Données des jeux bibliques pour enfants
   Versets : traduction Louis Segond 1910 (domaine public)
   ========================================================== */

// ----- Jeu 1 : Vrai ou Faux -----
const JEU_VRAIFAUX = [
  { phrase: "Dieu a créé le monde en six jours.", vrai: true, expl: "Oui ! Et le septième jour, il s'est reposé (Genèse 2:2)." },
  { phrase: "Noé a construit une fusée pour aller sur la Lune.", vrai: false, expl: "Non, Noé a construit une arche, un grand bateau (Genèse 6)." },
  { phrase: "David a vaincu le géant Goliath.", vrai: true, expl: "Oui, avec une fronde et sa confiance en Dieu (1 Samuel 17)." },
  { phrase: "Jésus est né à Paris.", vrai: false, expl: "Non, Jésus est né à Bethléem (Luc 2:4)." },
  { phrase: "Jonas a été avalé par un grand poisson.", vrai: true, expl: "Oui, pendant trois jours et trois nuits (Jonas 2:1)." },
  { phrase: "Il y a 12 apôtres.", vrai: true, expl: "Exact ! Jésus a choisi douze apôtres (Marc 3:14)." },
  { phrase: "Marie est la maman de Jésus.", vrai: true, expl: "Oui, Marie a dit « oui » à Dieu (Luc 1:38)." },
  { phrase: "Moïse a reçu 100 commandements.", vrai: false, expl: "Non, Dieu a donné les Dix Commandements (Exode 20)." },
  { phrase: "Jésus a changé l'eau en vin aux noces de Cana.", vrai: true, expl: "Oui, c'était son premier miracle (Jean 2:1-11)." },
  { phrase: "Adam et Ève vivaient dans le jardin d'Éden.", vrai: true, expl: "Oui, le premier jardin créé par Dieu (Genèse 2:8)." },
  { phrase: "Le premier livre de la Bible est l'Apocalypse.", vrai: false, expl: "Non, le premier livre est la Genèse ; l'Apocalypse est le dernier." },
  { phrase: "Jésus est ressuscité le troisième jour.", vrai: true, expl: "Oui ! Le tombeau était vide (Matthieu 28:6)." },
];

// ----- Jeu 2 : Devine le personnage -----
const JEU_PERSONNAGE = [
  { reponse: "Noé", indices: ["J'ai construit un grand bateau.", "J'ai sauvé les animaux du déluge.", "Après la pluie, Dieu m'a montré un arc-en-ciel."] },
  { reponse: "Moïse", indices: ["J'ai été sauvé des eaux quand j'étais bébé.", "J'ai parlé à Dieu dans un buisson en feu.", "J'ai ouvert la mer Rouge en deux."] },
  { reponse: "David", indices: ["J'étais un jeune berger.", "J'ai vaincu un géant avec une fronde.", "Je suis devenu roi d'Israël."] },
  { reponse: "Jonas", indices: ["J'ai voulu fuir loin de Dieu.", "Un grand poisson m'a avalé.", "J'ai prié pendant trois jours dans son ventre."] },
  { reponse: "Marie", indices: ["Un ange m'a rendu visite.", "J'ai dit « oui » à Dieu.", "Je suis devenue la maman de Jésus."] },
  { reponse: "Abraham", indices: ["Dieu m'a demandé de quitter mon pays.", "Il m'a promis autant d'enfants que d'étoiles.", "On m'appelle le père des croyants."] },
  { reponse: "Daniel", indices: ["J'ai été jeté dans une fosse.", "Il y avait des lions affamés.", "Dieu a fermé la gueule des lions pour me protéger."] },
  { reponse: "Pierre", indices: ["J'étais un pêcheur.", "J'ai marché sur l'eau vers Jésus.", "Jésus a dit qu'il bâtirait son Église sur moi."] },
  { reponse: "Salomon", indices: ["J'étais le fils du roi David.", "J'ai demandé la sagesse à Dieu.", "J'ai construit le grand Temple de Jérusalem."] },
  { reponse: "Jésus", indices: ["Je suis né dans une étable à Bethléem.", "J'ai fait beaucoup de miracles.", "Je suis le Fils de Dieu, mort et ressuscité pour vous."] },
];

// ----- Jeu 3 : Complète le verset (choisir le mot manquant) -----
const JEU_VERSET = [
  { avant: "Car Dieu a tant aimé le", trou: "monde", apres: "qu'il a donné son Fils unique.", choix: ["monde", "ciel", "jardin"], ref: "Jean 3:16" },
  { avant: "L'Éternel est mon", trou: "berger", apres: ": je ne manquerai de rien.", choix: ["berger", "roi", "ami"], ref: "Psaume 23:1" },
  { avant: "Au commencement, Dieu créa les cieux et la", trou: "terre", apres: ".", choix: ["terre", "mer", "lune"], ref: "Genèse 1:1" },
  { avant: "Je puis tout par celui qui me", trou: "fortifie", apres: ".", choix: ["fortifie", "regarde", "appelle"], ref: "Philippiens 4:13" },
  { avant: "Ta parole est une", trou: "lampe", apres: "à mes pieds.", choix: ["lampe", "étoile", "fleur"], ref: "Psaume 119:105" },
  { avant: "Aimez vos", trou: "ennemis", apres: ", bénissez ceux qui vous maudissent.", choix: ["ennemis", "amis", "voisins"], ref: "Matthieu 5:44" },
  { avant: "Demandez, et l'on vous", trou: "donnera", apres: "; cherchez, et vous trouverez.", choix: ["donnera", "verra", "dira"], ref: "Matthieu 7:7" },
  { avant: "Que ta volonté soit faite sur la terre comme au", trou: "ciel", apres: ".", choix: ["ciel", "monde", "jardin"], ref: "Matthieu 6:10" },
  { avant: "Heureux ceux qui procurent la", trou: "paix", apres: ", car ils seront appelés fils de Dieu.", choix: ["paix", "joie", "gloire"], ref: "Matthieu 5:9" },
  { avant: "Venez à moi, vous tous qui êtes fatigués et", trou: "chargés", apres: ", et je vous donnerai du repos.", choix: ["chargés", "perdus", "tristes"], ref: "Matthieu 11:28" },
];

// ----- Jeu 4 : Les jours de la Création (à remettre dans l'ordre) -----
const JEU_CREATION = [
  { jour: 1, texte: "La lumière : le jour et la nuit", emoji: "💡" },
  { jour: 2, texte: "Le ciel et les eaux", emoji: "☁️" },
  { jour: 3, texte: "La terre, la mer et les plantes", emoji: "🌱" },
  { jour: 4, texte: "Le soleil, la lune et les étoiles", emoji: "☀️" },
  { jour: 5, texte: "Les poissons et les oiseaux", emoji: "🐟" },
  { jour: 6, texte: "Les animaux et l'être humain", emoji: "🦁" },
  { jour: 7, texte: "Dieu se repose : jour béni", emoji: "🕊️" },
];

// ----- Jeu 5 : Ancien ou Nouveau Testament -----
const JEU_TESTAMENT = [
  { livre: "La Genèse", ancien: true },
  { livre: "L'Évangile de Jean", ancien: false },
  { livre: "Les Psaumes", ancien: true },
  { livre: "L'Exode", ancien: true },
  { livre: "Les Actes des Apôtres", ancien: false },
  { livre: "L'Apocalypse", ancien: false },
  { livre: "Le livre de Daniel", ancien: true },
  { livre: "L'Évangile de Matthieu", ancien: false },
  { livre: "Les Proverbes", ancien: true },
  { livre: "L'épître aux Romains", ancien: false },
  { livre: "Le livre de Jonas", ancien: true },
  { livre: "L'Évangile de Luc", ancien: false },
];

// ----- Jeu 6 : Le mot mystère (pendu doux, sans dessin de pendu) -----
const JEU_MOTMYSTERE = [
  { mot: "JESUS", indice: "Le Fils de Dieu, né à Bethléem." },
  { mot: "ARCHE", indice: "Le grand bateau de Noé." },
  { mot: "BERGER", indice: "David en était un ; l'Éternel aussi." },
  { mot: "ETOILE", indice: "Elle a guidé les mages jusqu'à Jésus." },
  { mot: "COLOMBE", indice: "L'oiseau qui a rapporté un rameau d'olivier à Noé." },
  { mot: "PRIERE", indice: "Quand on parle à Dieu." },
  { mot: "AMOUR", indice: "Le plus grand des commandements." },
  { mot: "PAIN", indice: "Jésus l'a multiplié pour nourrir la foule." },
  { mot: "ANGE", indice: "Un messager de Dieu." },
  { mot: "TEMPLE", indice: "La maison de Dieu que Salomon a bâtie." },
];
