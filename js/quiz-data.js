/* ==========================================================
   Quiz biblique pour enfants — trois niveaux
   Chaque question : intitulé, 4 choix, index de la bonne
   réponse et petite explication avec référence biblique.
   ========================================================== */

const QUIZ = {
  amateur: [
    {
      q: "Qui a construit une grande arche pour sauver les animaux du déluge ?",
      choix: ["Moïse", "Noé", "Abraham", "David"],
      bonne: 1,
      explication: "C'est Noé ! Dieu lui a demandé de construire l'arche pour sauver sa famille et les animaux (Genèse 6).",
    },
    {
      q: "Dans quelle ville est né Jésus ?",
      choix: ["Jérusalem", "Nazareth", "Bethléem", "Capharnaüm"],
      bonne: 2,
      explication: "Jésus est né à Bethléem, comme l'avaient annoncé les prophètes (Luc 2:4-7).",
    },
    {
      q: "Combien de jours Dieu a-t-il mis pour créer le monde avant de se reposer ?",
      choix: ["3 jours", "6 jours", "10 jours", "40 jours"],
      bonne: 1,
      explication: "Dieu a créé le monde en six jours, et le septième jour, il s'est reposé (Genèse 2:2).",
    },
    {
      q: "Qui a vaincu le géant Goliath avec une fronde ?",
      choix: ["Samson", "Salomon", "David", "Josué"],
      bonne: 2,
      explication: "Le jeune berger David a vaincu Goliath grâce à sa confiance en Dieu (1 Samuel 17).",
    },
    {
      q: "Quel animal a avalé Jonas pendant trois jours ?",
      choix: ["Un lion", "Un grand poisson", "Un serpent", "Un aigle"],
      bonne: 1,
      explication: "Un grand poisson envoyé par Dieu a avalé Jonas, qui a prié dans son ventre (Jonas 2:1).",
    },
    {
      q: "Comment s'appelle la maman de Jésus ?",
      choix: ["Marthe", "Élisabeth", "Marie", "Sarah"],
      bonne: 2,
      explication: "Marie, humble jeune fille de Nazareth, a dit « oui » à Dieu (Luc 1:38).",
    },
    {
      q: "Avec quoi Jésus a-t-il nourri plus de 5 000 personnes ?",
      choix: ["5 pains et 2 poissons", "10 pains", "Un grand festin", "Des fruits du jardin"],
      bonne: 0,
      explication: "Avec cinq pains et deux poissons, Jésus a nourri toute la foule (Matthieu 14:17-21).",
    },
    {
      q: "Que s'est-il passé trois jours après la mort de Jésus sur la croix ?",
      choix: ["Rien", "Il est ressuscité", "Il est parti en Égypte", "Les apôtres l'ont caché"],
      bonne: 1,
      explication: "Jésus est ressuscité le troisième jour : le tombeau était vide ! (Matthieu 28:6).",
    },
    {
      q: "Quel signe Dieu a-t-il mis dans le ciel après le déluge ?",
      choix: ["Une étoile", "Un arc-en-ciel", "Un nuage doré", "Une comète"],
      bonne: 1,
      explication: "L'arc-en-ciel est le signe de l'alliance entre Dieu et la terre (Genèse 9:13).",
    },
    {
      q: "Comment s'appellent les deux premiers humains créés par Dieu ?",
      choix: ["Abraham et Sarah", "Adam et Ève", "Jacob et Rachel", "Joseph et Marie"],
      bonne: 1,
      explication: "Dieu a créé Adam et Ève et les a placés dans le jardin d'Éden (Genèse 2).",
    },
  ],

  moyen: [
    {
      q: "Combien y a-t-il de commandements dans la Loi donnée à Moïse ?",
      choix: ["7", "10", "12", "40"],
      bonne: 1,
      explication: "Dieu a donné les Dix Commandements à Moïse sur le mont Sinaï (Exode 20).",
    },
    {
      q: "Combien d'apôtres Jésus a-t-il choisis ?",
      choix: ["7", "10", "12", "70"],
      bonne: 2,
      explication: "Jésus a choisi douze apôtres pour l'accompagner et annoncer l'Évangile (Marc 3:14).",
    },
    {
      q: "Quel apôtre a marché sur l'eau vers Jésus ?",
      choix: ["Jean", "Pierre", "Jacques", "Thomas"],
      bonne: 1,
      explication: "Pierre a marché sur l'eau, puis a douté ; Jésus l'a rattrapé (Matthieu 14:29-31).",
    },
    {
      q: "Quelle mer s'est ouverte en deux devant Moïse ?",
      choix: ["La mer Morte", "La mer Rouge", "La mer de Galilée", "La Méditerranée"],
      bonne: 1,
      explication: "Dieu a ouvert la mer Rouge pour faire passer son peuple à pied sec (Exode 14).",
    },
    {
      q: "Qui a trahi Jésus pour trente pièces d'argent ?",
      choix: ["Pierre", "Thomas", "Judas", "Matthieu"],
      bonne: 2,
      explication: "Judas Iscariote a livré Jésus pour trente pièces d'argent (Matthieu 26:15).",
    },
    {
      q: "Quel est le premier livre de la Bible ?",
      choix: ["L'Exode", "Les Psaumes", "La Genèse", "L'Évangile de Matthieu"],
      bonne: 2,
      explication: "La Genèse ouvre la Bible avec le récit de la création (Genèse 1:1).",
    },
    {
      q: "Combien de temps le peuple hébreu a-t-il marché dans le désert ?",
      choix: ["7 ans", "12 ans", "40 ans", "100 ans"],
      bonne: 2,
      explication: "Le peuple a marché quarante ans dans le désert avant la Terre promise (Nombres 14:33).",
    },
    {
      q: "Quel roi était réputé pour sa grande sagesse ?",
      choix: ["Saül", "David", "Salomon", "Hérode"],
      bonne: 2,
      explication: "Salomon avait demandé la sagesse à Dieu pour bien gouverner (1 Rois 3:9-12).",
    },
    {
      q: "Qui baptisait dans le fleuve Jourdain ?",
      choix: ["Pierre", "Jean-Baptiste", "Paul", "Élie"],
      bonne: 1,
      explication: "Jean-Baptiste préparait le chemin du Seigneur en baptisant dans le Jourdain (Matthieu 3).",
    },
    {
      q: "Quel est le plus grand commandement selon Jésus ?",
      choix: ["Ne pas voler", "Honorer ses parents", "Aimer Dieu de tout son cœur", "Respecter le sabbat"],
      bonne: 2,
      explication: "« Tu aimeras le Seigneur, ton Dieu, de tout ton cœur » — et son prochain comme soi-même (Marc 12:30-31).",
    },
  ],

  pro: [
    {
      q: "Combien de livres compte la Bible (canon catholique) ?",
      choix: ["66", "72", "73", "80"],
      bonne: 2,
      explication: "La Bible catholique compte 73 livres : 46 dans l'Ancien Testament et 27 dans le Nouveau.",
    },
    {
      q: "Sur quelle montagne Moïse a-t-il reçu les tables de la Loi ?",
      choix: ["Le mont Nébo", "Le mont Sinaï", "Le mont Carmel", "Le mont des Oliviers"],
      bonne: 1,
      explication: "C'est sur le mont Sinaï (aussi appelé Horeb) que Dieu a donné la Loi (Exode 19-20).",
    },
    {
      q: "Quel prophète a été enlevé au ciel dans un char de feu ?",
      choix: ["Élisée", "Ésaïe", "Élie", "Jérémie"],
      bonne: 2,
      explication: "Élie fut enlevé au ciel dans un tourbillon, avec un char de feu (2 Rois 2:11).",
    },
    {
      q: "Que signifie le mot « Évangile » ?",
      choix: ["Livre saint", "Bonne nouvelle", "Parole de vie", "Chemin de vérité"],
      bonne: 1,
      explication: "« Évangile » vient du grec euangelion : la « Bonne Nouvelle » du salut.",
    },
    {
      q: "Quel apôtre s'appelait d'abord Saul de Tarse ?",
      choix: ["Pierre", "Barnabé", "Paul", "Timothée"],
      bonne: 2,
      explication: "Saul est devenu Paul après sa rencontre avec le Christ sur le chemin de Damas (Actes 9).",
    },
    {
      q: "Dans quelle langue l'Ancien Testament a-t-il été majoritairement écrit ?",
      choix: ["Le grec", "Le latin", "L'hébreu", "L'araméen"],
      bonne: 2,
      explication: "L'Ancien Testament a été écrit principalement en hébreu, avec quelques passages en araméen.",
    },
    {
      q: "Quel est le dernier livre de la Bible ?",
      choix: ["L'épître de Jude", "L'Apocalypse", "L'évangile de Jean", "Les Actes des Apôtres"],
      bonne: 1,
      explication: "L'Apocalypse (ou Révélation) de Jean clôt la Bible avec la vision de la Jérusalem céleste.",
    },
    {
      q: "Combien de plaies ont frappé l'Égypte avant la libération des Hébreux ?",
      choix: ["7", "10", "12", "14"],
      bonne: 1,
      explication: "Dix plaies ont frappé l'Égypte, la dernière étant la mort des premiers-nés (Exode 7-12).",
    },
    {
      q: "Quel disciple a douté de la résurrection avant de voir les plaies de Jésus ?",
      choix: ["Philippe", "André", "Thomas", "Barthélemy"],
      bonne: 2,
      explication: "Thomas a cru en voyant : « Heureux ceux qui n'ont pas vu, et qui ont cru ! » (Jean 20:29).",
    },
    {
      q: "Que signifie « Emmanuel », le nom prophétique du Messie ?",
      choix: ["Dieu sauve", "Dieu avec nous", "Prince de paix", "Lumière du monde"],
      bonne: 1,
      explication: "Emmanuel signifie « Dieu avec nous » (Ésaïe 7:14 ; Matthieu 1:23).",
    },
    {
      q: "Combien de psaumes compte le livre des Psaumes ?",
      choix: ["100", "119", "150", "176"],
      bonne: 2,
      explication: "Le psautier compte 150 psaumes ; le psaume 119 est le plus long chapitre de la Bible.",
    },
    {
      q: "Lors des noces de Cana, en quoi Jésus a-t-il changé l'eau ?",
      choix: ["En huile", "En lait", "En vin", "En miel"],
      bonne: 2,
      explication: "À Cana, Jésus a changé l'eau en vin : son premier miracle (Jean 2:1-11).",
    },
  ],
};

const QUIZ_NIVEAUX = {
  amateur: { label: "Niveau Amateur", verset: "« Laissez venir à moi les petits enfants. » — Marc 10:14" },
  moyen: { label: "Niveau Moyen", verset: "« Ta parole est une lampe à mes pieds. » — Psaume 119:105" },
  pro: { label: "Niveau Pro", verset: "« Que la parole de Christ habite parmi vous abondamment. » — Colossiens 3:16" },
};
