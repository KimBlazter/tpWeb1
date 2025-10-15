# TP1 WE - Application de dessin

## Auteurs (M1 IL Cla2)
- Rhouziel FADIL
- Martin SAUNIER

## Lancement du projet
- Ouvrir le fichier `canvas.html` dans un navigateur
- C'est tout...

Cette application web permet de créer des dessins simples en utilisant différentes formes géométriques. Elle est construite selon le pattern MVC (Modèle-Vue-Contrôleur) et utilise le canvas HTML5 pour le rendu graphique.

## Structure du Projet

### Fichiers Principaux

- `canvas.html` : Le fichier HTML principal qui définit la structure de l'interface utilisateur, incluant :
  - Une barre d'outils avec des boutons pour sélectionner les formes
  - Des contrôles pour l'épaisseur du trait et la couleur
  - Des boutons Undo/Redo
  - Un canvas pour le dessin
  - Une liste des formes créées

### JavaScript (Pattern MVC)

- `model.js` : Définit les classes du modèle de données :
  - `Drawing` : Gère la collection des formes
  - `Shape` : Classe de base pour toutes les formes
  - `Rectangle`, `Line`, `Circle` : Classes héritant de Shape pour chaque type de forme

- `view.js` : Contient les fonctions de rendu pour :
  - L'affichage des formes sur le canvas
  - La gestion de la liste des formes
  - Les méthodes paint() pour chaque type de forme

- `controller.js` : Implémente la classe `Pencil` qui :
  - Gère les interactions utilisateur
  - Contrôle les modes d'édition (rectangle, ligne, cercle)
  - Gère les paramètres de dessin (couleur, épaisseur)
  - Implémente les fonctionnalités Undo/Redo

- `interaction.js` : Gère le Drag and Drop (DnD) avec :
  - Capture des événements souris
  - Calcul des positions
  - Communication avec le contrôleur

- `main.js` : Point d'entrée de l'application qui :
  - Initialise le canvas
  - Crée les instances nécessaires
  - Configure l'environnement de dessin

## Fonctionnalités
> Les fonctionnalités suffixées par `(+)` sont celles optionnelles de la question 15
1. **Dessin de formes géométriques** :
   - Rectangle
   - Ligne
   - Cercle (+)

2. **Personnalisation** :
   - Choix de la couleur
   - Réglage de l'épaisseur du trait

3. **Gestion des formes** :
   - Liste des formes créées
   - Suppression individuelle des formes
   - Fonctions Undo/Redo (+)

4. **Interaction** :
   - Création de formes par drag & drop

## Architecture Technique

L'application suit une architecture MVC :

- **Modèle** : Gère les données des formes et leur état
- **Vue** : S'occupe du rendu graphique sur le canvas et de la liste des formes
- **Contrôleur** : Gère les interactions utilisateur et met à jour le modèle et la vue en conséquence

## Déploiement sur CDN

- L'application est actuellement déployée sur le GitHub pages à cette adresse : https://kimblazter.github.io/tpWeb1/canvas.html