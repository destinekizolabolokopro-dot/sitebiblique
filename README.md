# ✝️ Lumière Biblique

Un site web chrétien entièrement consacré à la Parole de Dieu, avec une interface blanche et épurée inspirée de [bible.com](https://www.bible.com/).

## 🌟 Fonctionnalités

### 💬 Assistant biblique (`chatbot.html`)
Un chatbot **100 % biblique**, au ton pastoral et bienveillant (comme un prêtre à l'écoute) :
- **Recherche de versets par thème** : peur, amour, pardon, foi, espérance, tristesse, paix, prière, force, sagesse, famille, salut…
- **Recherche par référence** : « Montre-moi Jean 3:16 », « Psaume 23:1 »…
- **Étymologie des mots bibliques** : Amen, Alléluia, Évangile, Christ, Baptême, Messe, Pâques…
- **Personnages bibliques** : Moïse, Abraham, David, Marie, Paul, Pierre…
- **Refuse les questions hors sujet** et ramène toujours vers les Écritures.
- Il rappelle qu'il ne remplace pas un prêtre ou un pasteur (pas de sacrements, pas de confession).

Deux modes :
- **Mode local** (par défaut) : fonctionne sans connexion à un service, grâce à une bibliothèque intégrée de versets (Louis Segond 1910, domaine public).
- **Mode IA** (facultatif) : réponses approfondies générées par l'IA Claude d'Anthropic, avec un cadrage strictement biblique et chrétien. Il suffit de saisir une clé API Anthropic dans le panneau latéral (elle reste stockée uniquement dans le navigateur).

### ⛪ Messe du dimanche (`messe.html`)
Les lectures de la messe dominicale, chargées automatiquement depuis l'API publique de l'[AELF](https://www.aelf.org) :
- Première lecture, psaume, deuxième lecture, évangile
- Navigation de dimanche en dimanche et choix libre de la date
- Lien de secours vers aelf.org si l'API est indisponible

### 🧒 Espace enfants (`enfants.html`)
- **8 belles histoires de la Bible** racontées simplement, chacune avec un verset à retenir
- **Quiz biblique à trois niveaux** : 🌱 Amateur, 🌿 Moyen, 🌳 Pro — avec explications et références bibliques à chaque réponse, score final et encouragements

### 🏠 Accueil (`index.html`)
- **Verset du jour** (roulement automatique selon la date) + bouton **verset surprise 🎲**
- **Prière du jour** (roulement quotidien : Notre Père, prière du matin, du soir…)
- Présentation des sections du site

### ✨ Autres fonctionnalités
- **Avatars cartoon au choix** pour l'assistant : Frère Théo 👨, Sœur Léa 👩 ou P'tit Sam 🧒 (dessinés en SVG, affichés à côté des bulles)
- Ton **chaleureux et décontracté** : l'assistant tutoie et parle simplement, tout en restant 100% fidèle à la Bible
- **Jeu memory biblique** pour les enfants (retrouve les paires de symboles)
- **Records de quiz** sauvegardés dans le navigateur pour chaque niveau
- Bouton **effacer la conversation** du chat

## 🚀 Lancer le site

C'est un site 100 % statique : aucun serveur ni dépendance à installer.

```bash
# Option 1 : ouvrir directement index.html dans un navigateur

# Option 2 : petit serveur local
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Les lectures de la messe et le mode IA nécessitent une connexion internet. Tout le reste (assistant en mode local, quiz, histoires) fonctionne hors ligne.

## 📁 Structure

```
├── index.html        # Accueil + verset du jour
├── chatbot.html      # Assistant biblique
├── messe.html        # Lectures de la messe du dimanche
├── enfants.html      # Espace enfants + quiz
├── css/style.css     # Feuille de style (interface blanche épurée)
└── js/
    ├── bible-data.js # Versets, thèmes, étymologies, personnages
    ├── common.js     # Menu mobile + verset du jour
    ├── chatbot.js    # Moteur de l'assistant (local + IA)
    ├── messe.js      # Chargement des lectures (API AELF)
    ├── quiz-data.js  # Questions des trois niveaux
    └── quiz.js       # Déroulé du quiz
```

## 📖 Sources

- Versets : traduction **Louis Segond 1910** (domaine public)
- Lectures liturgiques : **API AELF** (api.aelf.org)

*« Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. » — Psaume 119:105*
