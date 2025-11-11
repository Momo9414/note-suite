-- Seed Data: Create demo user and sample notes

-- Insert demo user (user@example.com / password123)
-- Password is BCrypt hash of "password123"
INSERT INTO users (id, email, password, created_at, updated_at)
VALUES (
    'demo-user-uuid-001',
    'user@example.com',
    '$2b$10$mjApxtTVNVtgQbJ/IHfzjeK7wEhpVpoCWk6JFJubp1zGhZSTMzdZu',
    NOW(),
    NOW()
);

-- Insert sample notes for demo user
INSERT INTO notes (id, title, content_md, visibility, owner_id, created_at, updated_at)
VALUES
    (
        'note-001',
        'Bienvenue dans Notes App',
        '# Bienvenue ! 👋

Cette application vous permet de gérer vos notes de manière simple et efficace.

## Fonctionnalités

- **Création** de notes en Markdown
- **Organisation** avec des tags
- **Recherche** rapide dans vos notes
- **Interface moderne** et intuitive

## Comment utiliser

1. Créez une nouvelle note avec le bouton **+**
2. Ajoutez des tags pour organiser vos notes
3. Utilisez la barre de recherche pour retrouver vos notes
4. Cliquez sur une note pour voir les détails

Bonne utilisation ! 🚀',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '7 days',
        NOW() - INTERVAL '7 days'
    ),
    (
        'note-002',
        'Guide Markdown',
        '# Guide Markdown

## Titres

# H1
## H2
### H3

## Formatage

**Gras** et *italique*

## Listes

- Item 1
- Item 2
- Item 3

## Code

```javascript
const hello = "world";
console.log(hello);
```

## Liens

[Documentation](https://example.com)',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '6 days',
        NOW() - INTERVAL '6 days'
    ),
    (
        'note-003',
        'Idées de Projet',
        '# Idées de Projet 💡

## Applications Web

1. **Gestionnaire de tâches** avec drag & drop
2. **Portfolio personnel** avec animations
3. **Blog technique** avec Markdown
4. **Dashboard analytics** avec graphiques

## Applications Mobile

1. **App de méditation** avec timer
2. **Tracker d''habitudes** gamifié
3. **App de recettes** avec photos
4. **Gestionnaire de budget** personnel

## Prochaines étapes

- [ ] Choisir un projet
- [ ] Créer le design
- [ ] Développer le MVP
- [ ] Tester avec des utilisateurs',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '2 days'
    ),
    (
        'note-004',
        'Ressources Développement',
        '# Ressources Développement 📚

## Frontend

- **React**: Documentation officielle
- **Vue.js**: Framework progressif
- **Angular**: Framework complet
- **Tailwind CSS**: Utility-first CSS

## Backend

- **Spring Boot**: Java framework
- **Node.js + Express**: JavaScript backend
- **Django**: Python framework
- **FastAPI**: API moderne en Python

## Base de données

- **PostgreSQL**: Base relationnelle
- **MongoDB**: Base NoSQL
- **Redis**: Cache et sessions
- **Elasticsearch**: Recherche full-text

## DevOps

- **Docker**: Conteneurisation
- **Kubernetes**: Orchestration
- **GitHub Actions**: CI/CD
- **AWS / Azure / GCP**: Cloud providers',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '4 days',
        NOW() - INTERVAL '4 days'
    ),
    (
        'note-005',
        'Recette Pâtes Carbonara',
        '# Pâtes Carbonara 🍝

## Ingrédients (4 personnes)

- 400g de spaghetti
- 200g de guanciale (ou pancetta)
- 4 jaunes d''œufs
- 100g de Pecorino Romano râpé
- Poivre noir
- Sel

## Préparation

1. **Cuire les pâtes** dans l''eau bouillante salée
2. **Faire revenir** le guanciale coupé en lardons
3. **Mélanger** jaunes d''œufs et fromage râpé
4. **Égoutter** les pâtes en gardant un peu d''eau
5. **Mélanger** pâtes + guanciale + mélange œufs
6. **Ajouter** eau de cuisson si trop épais
7. **Poivrer** généreusement

## Astuces

- Ne pas ajouter de crème !
- Utiliser du Pecorino, pas du Parmesan
- Mélanger hors du feu pour éviter de cuire les œufs

Buon appetito ! 👨‍🍳',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '3 days',
        NOW() - INTERVAL '3 days'
    ),
    (
        'note-006',
        'Notes Réunion Équipe',
        '# Réunion Équipe - Sprint Planning

**Date**: Aujourd''hui
**Participants**: Alice, Bob, Charlie, Diana

## Objectifs du Sprint

1. Finaliser la nouvelle interface utilisateur
2. Implémenter l''authentification OAuth
3. Optimiser les performances de l''API
4. Corriger les bugs critiques

## Tâches Assignées

### Alice
- Design de la page d''accueil
- Intégration des composants UI

### Bob
- Configuration OAuth Google/GitHub
- Tests d''intégration

### Charlie
- Optimisation des requêtes SQL
- Mise en place du cache Redis

### Diana
- Correction bugs #123, #145, #167
- Documentation API

## Prochaine Réunion

📅 Dans 5 jours

## Notes

- Deadline: fin du sprint dans 2 semaines
- Code review obligatoire avant merge
- Tests unitaires requis pour toutes les features',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days'
    ),
    (
        'note-007',
        'Liste Courses',
        '# Liste de Courses 🛒

## Fruits & Légumes

- [ ] Tomates
- [ ] Salade
- [ ] Carottes
- [ ] Pommes
- [ ] Bananes
- [ ] Citrons

## Produits Laitiers

- [ ] Lait
- [ ] Yaourts nature
- [ ] Fromage râpé
- [ ] Beurre

## Épicerie

- [ ] Pâtes
- [ ] Riz
- [ ] Huile d''olive
- [ ] Sauce tomate
- [ ] Café

## Viande & Poisson

- [ ] Poulet
- [ ] Saumon
- [ ] Jambon

## Autres

- [ ] Pain
- [ ] Œufs
- [ ] Eau minérale',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day'
    ),
    (
        'note-008',
        'Objectifs 2025',
        '# Objectifs 2025 🎯

## Professionnel

### Compétences Techniques
- [ ] Maîtriser TypeScript avancé
- [ ] Apprendre Kubernetes
- [ ] Obtenir certification AWS
- [ ] Contribuer à des projets open source

### Carrière
- [ ] Obtenir une promotion
- [ ] Participer à des conférences tech
- [ ] Publier des articles techniques
- [ ] Mentorer des juniors

## Personnel

### Santé & Sport
- [ ] Courir 3 fois par semaine
- [ ] Faire du yoga
- [ ] Manger plus équilibré
- [ ] Dormir 8h par nuit

### Loisirs
- [ ] Lire 24 livres (2 par mois)
- [ ] Apprendre la guitare
- [ ] Voyager dans 3 nouveaux pays
- [ ] Améliorer mon français

## Financier

- [ ] Épargner 20% du salaire
- [ ] Investir dans des ETF
- [ ] Créer un fonds d''urgence
- [ ] Réduire les dépenses superflues

## Suivi

📊 Révision mensuelle des objectifs
📈 Ajustements si nécessaire',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '12 hours',
        NOW() - INTERVAL '6 hours'
    ),
    (
        'note-009',
        'Commandes Git Utiles',
        '# Commandes Git Utiles 🔧

## Configuration Initiale

```bash
git config --global user.name "Votre Nom"
git config --global user.email "email@example.com"
```

## Commandes de Base

```bash
# Initialiser un repo
git init

# Cloner un repo
git clone <url>

# Statut des fichiers
git status

# Ajouter des fichiers
git add .
git add <fichier>

# Commit
git commit -m "Message"

# Push
git push origin main
```

## Branches

```bash
# Créer une branche
git checkout -b feature/nouvelle-feature

# Changer de branche
git checkout main

# Fusionner une branche
git merge feature/nouvelle-feature

# Supprimer une branche
git branch -d feature/nouvelle-feature
```

## Historique

```bash
# Voir l''historique
git log
git log --oneline --graph

# Voir les différences
git diff
```

## Annuler des Changements

```bash
# Annuler modifications non commitées
git checkout -- <fichier>

# Annuler le dernier commit (garder les modifs)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les modifs)
git reset --hard HEAD~1
```

## Stash

```bash
# Mettre de côté des modifications
git stash

# Récupérer les modifications
git stash pop

# Lister les stash
git stash list
```

## Tips

- Toujours pull avant de push
- Faire des commits atomiques
- Écrire des messages de commit clairs
- Utiliser des branches pour les features',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '3 hours',
        NOW() - INTERVAL '3 hours'
    ),
    (
        'note-010',
        'Playlist Coding',
        '# Playlist Coding 🎵

## Focus & Concentration

1. **Lofi Hip Hop Radio** - Beats to study/code to
2. **Synthwave Mix** - Retrowave vibes
3. **Classical Piano** - Peaceful coding
4. **Ambient Electronic** - Deep focus

## Énergique

1. **Electronic Dance** - High energy
2. **Rock Instrumental** - Power coding
3. **Epic Orchestral** - Motivation boost
4. **Drum & Bass** - Fast-paced work

## Détente

1. **Jazz Café** - Relaxing vibes
2. **Acoustic Guitar** - Calm atmosphere
3. **Nature Sounds** - White noise
4. **Lo-fi Chill** - Easy listening

## Recommandations

- **Spotify**: "Deep Focus" playlist
- **YouTube**: "Chillhop Music" channel
- **Apple Music**: "Pure Focus" playlist
- **SoundCloud**: "Coding Music" sets

## Tips

- Pas de paroles pour mieux se concentrer
- Volume modéré
- Casque à réduction de bruit
- Faire des pauses régulières',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '1 hour',
        NOW() - INTERVAL '30 minutes'
    );

-- Insert tags for notes
INSERT INTO note_tags (note_id, tag)
VALUES
    -- Note 1: Bienvenue
    ('note-001', 'guide'),
    ('note-001', 'introduction'),
    ('note-001', 'tutoriel'),
    
    -- Note 2: Guide Markdown
    ('note-002', 'markdown'),
    ('note-002', 'documentation'),
    ('note-002', 'guide'),
    
    -- Note 3: Idées de Projet
    ('note-003', 'projets'),
    ('note-003', 'idées'),
    ('note-003', 'développement'),
    ('note-003', 'todo'),
    
    -- Note 4: Ressources Développement
    ('note-004', 'développement'),
    ('note-004', 'ressources'),
    ('note-004', 'apprentissage'),
    ('note-004', 'liens'),
    
    -- Note 5: Recette Carbonara
    ('note-005', 'cuisine'),
    ('note-005', 'recette'),
    ('note-005', 'italien'),
    
    -- Note 6: Notes Réunion
    ('note-006', 'travail'),
    ('note-006', 'réunion'),
    ('note-006', 'sprint'),
    ('note-006', 'équipe'),
    
    -- Note 7: Liste Courses
    ('note-007', 'courses'),
    ('note-007', 'liste'),
    ('note-007', 'personnel'),
    
    -- Note 8: Objectifs 2025
    ('note-008', 'objectifs'),
    ('note-008', 'personnel'),
    ('note-008', 'carrière'),
    ('note-008', '2025'),
    
    -- Note 9: Commandes Git
    ('note-009', 'git'),
    ('note-009', 'développement'),
    ('note-009', 'commandes'),
    ('note-009', 'référence'),
    
    -- Note 10: Playlist Coding
    ('note-010', 'musique'),
    ('note-010', 'productivité'),
    ('note-010', 'coding'),
    ('note-010', 'playlist');
