-- Add 40 more sample notes for a richer database

INSERT INTO notes (id, title, content_md, visibility, owner_id, created_at, updated_at)
VALUES
    (
        'note-011',
        'Tutoriel Docker Compose',
        '# Docker Compose - Guide Complet

## Installation

```bash
# Linux
sudo apt-get install docker-compose

# Mac
brew install docker-compose
```

## Commandes Essentielles

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Rebuild les images
docker-compose build
```

## Fichier docker-compose.yml

```yaml
version: ''3.8''
services:
  app:
    build: .
    ports:
      - "8080:8080"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '15 days',
        NOW() - INTERVAL '15 days'
    ),
    (
        'note-012',
        'Shortcuts VS Code',
        '# VS Code - Raccourcis Clavier

## Navigation

- `Ctrl + P` : Ouvrir fichier
- `Ctrl + Shift + P` : Palette de commandes
- `Ctrl + B` : Toggle sidebar
- `Ctrl + `` : Toggle terminal

## Édition

- `Ctrl + D` : Sélection multiple
- `Alt + Click` : Multi-curseur
- `Ctrl + /` : Commenter
- `Shift + Alt + F` : Formater le code

## Recherche

- `Ctrl + F` : Rechercher
- `Ctrl + H` : Remplacer
- `Ctrl + Shift + F` : Recherche globale

## Productivité

- `Ctrl + Space` : Autocomplétion
- `F12` : Aller à la définition
- `Shift + F12` : Trouver les références',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '14 days',
        NOW() - INTERVAL '14 days'
    ),
    (
        'note-013',
        'Recette Tarte aux Pommes',
        '# Tarte aux Pommes Classique 🥧

## Ingrédients

### Pâte
- 250g de farine
- 125g de beurre
- 1 œuf
- 50g de sucre
- Pincée de sel

### Garniture
- 6 pommes
- 50g de sucre
- 1 sachet de sucre vanillé
- Cannelle

## Préparation

1. **Pâte** : Mélanger tous les ingrédients
2. **Repos** : 30 minutes au frigo
3. **Pommes** : Éplucher et couper en lamelles
4. **Montage** : Étaler la pâte, disposer les pommes
5. **Cuisson** : 35 min à 180°C

Servir tiède avec une boule de glace vanille ! 🍨',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '13 days',
        NOW() - INTERVAL '13 days'
    ),
    (
        'note-014',
        'Concepts React Hooks',
        '# React Hooks - Guide Pratique

## useState

```javascript
const [count, setCount] = useState(0);
```

## useEffect

```javascript
useEffect(() => {
  // Code à exécuter
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## useContext

```javascript
const value = useContext(MyContext);
```

## useReducer

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

## Custom Hooks

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  
  return [value, setValue];
}
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '12 days',
        NOW() - INTERVAL '12 days'
    ),
    (
        'note-015',
        'Exercices Sport Maison',
        '# Programme Sport à la Maison 💪

## Échauffement (10 min)
- Jumping jacks : 2 min
- Rotation des bras
- Étirements dynamiques

## Circuit Training (3x)

### Force
- Pompes : 15 reps
- Squats : 20 reps
- Planche : 45 sec
- Fentes : 10 reps par jambe

### Cardio
- Burpees : 10 reps
- Mountain climbers : 30 sec
- High knees : 30 sec

## Récupération
- Étirements : 5 min
- Respiration profonde

**Fréquence** : 3-4 fois par semaine
**Repos** : 30 sec entre exercices',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '11 days',
        NOW() - INTERVAL '11 days'
    ),
    (
        'note-016',
        'API REST Best Practices',
        '# API REST - Bonnes Pratiques

## Conventions d''URL

```
GET    /api/users          # Liste
GET    /api/users/:id      # Détail
POST   /api/users          # Créer
PUT    /api/users/:id      # Modifier
DELETE /api/users/:id      # Supprimer
```

## Codes HTTP

- `200` : OK
- `201` : Created
- `204` : No Content
- `400` : Bad Request
- `401` : Unauthorized
- `403` : Forbidden
- `404` : Not Found
- `500` : Server Error

## Versioning

```
/api/v1/users
/api/v2/users
```

## Pagination

```
/api/users?page=1&limit=20
```

## Filtrage

```
/api/users?role=admin&status=active
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '10 days',
        NOW() - INTERVAL '10 days'
    ),
    (
        'note-017',
        'Checklist Voyage',
        '# Checklist Voyage ✈️

## Documents
- [ ] Passeport
- [ ] Visa si nécessaire
- [ ] Billets d''avion
- [ ] Réservations hôtel
- [ ] Assurance voyage
- [ ] Carte bancaire

## Vêtements
- [ ] Sous-vêtements (7 jours)
- [ ] T-shirts
- [ ] Pantalons
- [ ] Pull/Veste
- [ ] Chaussures confort
- [ ] Maillot de bain
- [ ] Pyjama

## Toilette
- [ ] Brosse à dents
- [ ] Dentifrice
- [ ] Shampoing
- [ ] Gel douche
- [ ] Crème solaire
- [ ] Médicaments

## Électronique
- [ ] Téléphone
- [ ] Chargeur
- [ ] Adaptateur
- [ ] Écouteurs
- [ ] Appareil photo

## Divers
- [ ] Lunettes de soleil
- [ ] Sac à dos
- [ ] Bouteille d''eau
- [ ] Guide touristique',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '9 days',
        NOW() - INTERVAL '9 days'
    ),
    (
        'note-018',
        'SQL Queries Utiles',
        '# SQL - Requêtes Courantes

## SELECT

```sql
SELECT * FROM users WHERE age > 18;
SELECT name, email FROM users LIMIT 10;
```

## JOIN

```sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

## GROUP BY

```sql
SELECT category, COUNT(*) as total
FROM products
GROUP BY category
HAVING total > 5;
```

## Sous-requêtes

```sql
SELECT name FROM users
WHERE id IN (
  SELECT user_id FROM orders
  WHERE total > 100
);
```

## INDEX

```sql
CREATE INDEX idx_email ON users(email);
```

## TRANSACTION

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '8 days',
        NOW() - INTERVAL '8 days'
    ),
    (
        'note-019',
        'Idées Cadeaux Anniversaire',
        '# Idées Cadeaux 🎁

## Tech
- Écouteurs sans fil
- Montre connectée
- Tablette graphique
- Clavier mécanique
- Webcam HD

## Livres
- Romans best-sellers
- Livres de développement personnel
- Biographies inspirantes
- Livres techniques

## Expériences
- Concert/Spectacle
- Restaurant gastronomique
- Cours de cuisine
- Escape game
- Spa/Massage

## Loisirs
- Jeux de société
- Puzzle 1000 pièces
- Kit DIY
- Plantes d''intérieur
- Coffret dégustation

## Personnalisé
- Album photo
- Cadre photo numérique
- Bijou gravé
- Tasse personnalisée',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '7 days',
        NOW() - INTERVAL '7 days'
    ),
    (
        'note-020',
        'TypeScript Types Avancés',
        '# TypeScript - Types Avancés

## Union Types

```typescript
type Status = "pending" | "success" | "error";
```

## Intersection Types

```typescript
type Person = { name: string };
type Employee = { employeeId: number };
type Worker = Person & Employee;
```

## Generics

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

## Utility Types

```typescript
// Partial
type PartialUser = Partial<User>;

// Pick
type UserPreview = Pick<User, "name" | "email">;

// Omit
type UserWithoutPassword = Omit<User, "password">;

// Record
type PageInfo = Record<string, { title: string }>;
```

## Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '6 days',
        NOW() - INTERVAL '6 days'
    ),
    (
        'note-021',
        'Budget Mensuel',
        '# Budget Mensuel 💰

## Revenus
- Salaire : 3000€
- Freelance : 500€
- **Total** : 3500€

## Dépenses Fixes (1800€)
- Loyer : 900€
- Électricité/Gaz : 100€
- Internet/Mobile : 50€
- Assurances : 150€
- Transports : 100€
- Abonnements : 50€
- Épargne : 450€

## Dépenses Variables (1200€)
- Alimentation : 400€
- Restaurants : 150€
- Loisirs : 200€
- Vêtements : 100€
- Santé : 100€
- Divers : 250€

## Réserve (500€)
- Imprévus
- Projets spéciaux

**Taux d''épargne** : 12.8%',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '5 days'
    ),
    (
        'note-022',
        'Principes SOLID',
        '# Principes SOLID

## S - Single Responsibility
Une classe = une seule responsabilité

```java
// ❌ Mauvais
class User {
  void save() { }
  void sendEmail() { }
}

// ✅ Bon
class User { }
class UserRepository { void save() { } }
class EmailService { void send() { } }
```

## O - Open/Closed
Ouvert à l''extension, fermé à la modification

## L - Liskov Substitution
Les sous-classes doivent être substituables

## I - Interface Segregation
Interfaces spécifiques plutôt que générales

## D - Dependency Inversion
Dépendre des abstractions, pas des implémentations

```java
// ✅ Bon
class Service {
  private Repository repo;
  Service(Repository repo) {
    this.repo = repo;
  }
}
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '4 days',
        NOW() - INTERVAL '4 days'
    ),
    (
        'note-023',
        'Playlist Motivation',
        '# Playlist Motivation 🔥

## Workout
1. Eye of the Tiger - Survivor
2. Stronger - Kanye West
3. Till I Collapse - Eminem
4. Lose Yourself - Eminem
5. Remember the Name - Fort Minor

## Focus
1. Time - Hans Zimmer
2. Interstellar Main Theme
3. Inception - Time
4. The Dark Knight Rises

## Morning Energy
1. Good Morning - Kanye West
2. Here Comes the Sun - The Beatles
3. Walking on Sunshine
4. Don''t Stop Me Now - Queen

## Evening Chill
1. Weightless - Marconi Union
2. Clair de Lune - Debussy
3. Gymnopédie No.1 - Satie
4. River Flows in You - Yiruma',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '3 days',
        NOW() - INTERVAL '3 days'
    ),
    (
        'note-024',
        'Regex Patterns Courants',
        '# Expressions Régulières

## Email

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

## Téléphone (FR)

```regex
^0[1-9](\d{2}){4}$
```

## URL

```regex
^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b
```

## Code Postal (FR)

```regex
^[0-9]{5}$
```

## Mot de passe fort

```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

## Date (YYYY-MM-DD)

```regex
^\d{4}-\d{2}-\d{2}$
```

## Numéro de carte bancaire

```regex
^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days'
    ),
    (
        'note-025',
        'Recette Smoothie Bowl',
        '# Smoothie Bowl Healthy 🥣

## Base (pour 1 personne)

- 2 bananes congelées
- 100g de fruits rouges congelés
- 100ml de lait d''amande
- 1 cuillère de beurre d''amande

## Toppings

### Fruits
- Tranches de banane
- Fraises
- Myrtilles
- Kiwi

### Crunchy
- Granola maison
- Noix de coco râpée
- Amandes effilées
- Graines de chia

### Extras
- Miel
- Beurre de cacahuète
- Cacao en poudre

## Préparation

1. Mixer tous les ingrédients de la base
2. Verser dans un bol
3. Disposer les toppings
4. Déguster immédiatement !

**Calories** : ~400 kcal
**Protéines** : 12g',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day'
    ),
    (
        'note-026',
        'Kubernetes Basics',
        '# Kubernetes - Concepts de Base

## Architecture

- **Pod** : Unité de déploiement
- **Service** : Exposition réseau
- **Deployment** : Gestion des pods
- **Namespace** : Isolation logique

## Commandes kubectl

```bash
# Lister les pods
kubectl get pods

# Décrire un pod
kubectl describe pod <name>

# Logs
kubectl logs <pod-name>

# Exec dans un pod
kubectl exec -it <pod-name> -- /bin/bash

# Apply config
kubectl apply -f deployment.yaml

# Delete
kubectl delete pod <name>
```

## Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:1.0
        ports:
        - containerPort: 8080
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '20 hours',
        NOW() - INTERVAL '20 hours'
    ),
    (
        'note-027',
        'Routine Matinale Productive',
        '# Routine Matinale 🌅

## 6h00 - Réveil
- Pas de snooze !
- Ouvrir les rideaux
- Boire un grand verre d''eau

## 6h15 - Activité Physique
- 20 min de yoga OU
- 30 min de course OU
- Séance de sport maison

## 6h45 - Douche & Préparation
- Douche froide (boost énergie)
- S''habiller
- Ranger la chambre

## 7h00 - Petit-déjeuner
- Smoothie protéiné OU
- Porridge avec fruits OU
- Œufs + pain complet

## 7h30 - Temps Perso
- Lecture (15 min)
- Méditation (10 min)
- Journal (5 min)

## 8h00 - Planification
- Réviser les objectifs du jour
- Prioriser les 3 tâches importantes
- Check emails rapide

**Prêt à attaquer la journée ! 💪**',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '18 hours',
        NOW() - INTERVAL '18 hours'
    ),
    (
        'note-028',
        'Design Patterns Courants',
        '# Design Patterns

## Singleton

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

## Factory

```java
interface Product {}
class ConcreteProduct implements Product {}

class Factory {
    public Product createProduct(String type) {
        if (type.equals("A")) {
            return new ConcreteProduct();
        }
        return null;
    }
}
```

## Observer

```java
interface Observer {
    void update(String message);
}

class Subject {
    private List<Observer> observers = new ArrayList<>();
    
    public void attach(Observer o) {
        observers.add(o);
    }
    
    public void notifyObservers(String msg) {
        for (Observer o : observers) {
            o.update(msg);
        }
    }
}
```

## Strategy

```java
interface Strategy {
    void execute();
}

class Context {
    private Strategy strategy;
    
    public void setStrategy(Strategy s) {
        this.strategy = s;
    }
    
    public void executeStrategy() {
        strategy.execute();
    }
}
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '16 hours',
        NOW() - INTERVAL '16 hours'
    ),
    (
        'note-029',
        'Films à Voir Absolument',
        '# Films Incontournables 🎬

## Classiques
- Le Parrain (1972)
- Pulp Fiction (1994)
- Forrest Gump (1994)
- La Liste de Schindler (1993)
- Le Seigneur des Anneaux (2001-2003)

## Science-Fiction
- Inception (2010)
- Interstellar (2014)
- Matrix (1999)
- Blade Runner 2049 (2017)
- Arrival (2016)

## Animation
- Le Voyage de Chihiro (2001)
- Coco (2017)
- Spider-Man: Into the Spider-Verse (2018)
- Wall-E (2008)

## Récents
- Parasite (2019)
- 1917 (2019)
- Dune (2021)
- Everything Everywhere All at Once (2022)

## Français
- Intouchables (2011)
- Amélie Poulain (2001)
- La Haine (1995)',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '14 hours',
        NOW() - INTERVAL '14 hours'
    ),
    (
        'note-030',
        'CSS Grid Layout',
        '# CSS Grid - Guide Pratique

## Container

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Areas

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Alignment

```css
.grid {
  justify-items: center;  /* horizontal */
  align-items: center;    /* vertical */
  justify-content: space-between;
  align-content: start;
}
```

## Item Placement

```css
.item {
  grid-column: 1 / 3;  /* span 2 columns */
  grid-row: 1 / 2;
}
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '12 hours',
        NOW() - INTERVAL '12 hours'
    ),
    (
        'note-031',
        'Conseils Entretien Embauche',
        '# Entretien d''Embauche - Conseils 💼

## Préparation

### Recherche
- Étudier l''entreprise
- Comprendre le poste
- Lire les avis employés
- Préparer des questions

### Documents
- CV à jour
- Portfolio
- Lettres de recommandation
- Certificats

## Pendant l''Entretien

### Présentation (2 min)
- Parcours académique
- Expériences professionnelles
- Compétences clés
- Motivation pour le poste

### Questions Fréquentes
- Pourquoi ce poste ?
- Vos forces/faiblesses ?
- Où vous voyez-vous dans 5 ans ?
- Expérience de travail en équipe ?
- Gestion du stress ?

### Vos Questions
- Culture d''entreprise ?
- Équipe et projets ?
- Évolution de carrière ?
- Formation continue ?

## Après l''Entretien

- Email de remerciement (24h)
- Relance si pas de nouvelles (1 semaine)

## Tips
✅ Arriver 10 min en avance
✅ Tenue professionnelle
✅ Sourire et contact visuel
✅ Écouter activement
✅ Exemples concrets',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '10 hours',
        NOW() - INTERVAL '10 hours'
    ),
    (
        'note-032',
        'Python Data Science',
        '# Python pour Data Science

## Pandas

```python
import pandas as pd

# Lire CSV
df = pd.read_csv(''data.csv'')

# Info
df.head()
df.info()
df.describe()

# Filtrage
df[df[''age''] > 25]
df.query(''age > 25 and city == "Paris"'')

# Groupby
df.groupby(''category'')[''price''].mean()

# Pivot
df.pivot_table(values=''sales'', index=''month'', columns=''product'')
```

## NumPy

```python
import numpy as np

# Array
arr = np.array([1, 2, 3, 4, 5])

# Opérations
arr.mean()
arr.std()
arr.sum()

# Reshape
arr.reshape(5, 1)
```

## Matplotlib

```python
import matplotlib.pyplot as plt

plt.plot(x, y)
plt.xlabel(''X Label'')
plt.ylabel(''Y Label'')
plt.title(''Title'')
plt.show()
```

## Seaborn

```python
import seaborn as sns

sns.scatterplot(data=df, x=''age'', y=''salary'')
sns.heatmap(df.corr(), annot=True)
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '8 hours',
        NOW() - INTERVAL '8 hours'
    ),
    (
        'note-033',
        'Livres Développement Personnel',
        '# Livres à Lire 📚

## Productivité
- **Atomic Habits** - James Clear
- **Deep Work** - Cal Newport
- **Getting Things Done** - David Allen
- **The 4-Hour Workweek** - Tim Ferriss

## Leadership
- **Start with Why** - Simon Sinek
- **Dare to Lead** - Brené Brown
- **The 7 Habits** - Stephen Covey

## Mindset
- **Mindset** - Carol Dweck
- **Thinking, Fast and Slow** - Daniel Kahneman
- **The Power of Now** - Eckhart Tolle

## Finance
- **Rich Dad Poor Dad** - Robert Kiyosaki
- **The Intelligent Investor** - Benjamin Graham
- **Think and Grow Rich** - Napoleon Hill

## Communication
- **How to Win Friends** - Dale Carnegie
- **Crucial Conversations** - Kerry Patterson
- **Never Split the Difference** - Chris Voss

## Créativité
- **The War of Art** - Steven Pressfield
- **Big Magic** - Elizabeth Gilbert',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '6 hours',
        NOW() - INTERVAL '6 hours'
    ),
    (
        'note-034',
        'MongoDB Queries',
        '# MongoDB - Requêtes

## Insert

```javascript
db.users.insertOne({
  name: "John",
  age: 30,
  email: "john@example.com"
});

db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
]);
```

## Find

```javascript
// Tous
db.users.find();

// Avec filtre
db.users.find({ age: { $gt: 25 } });

// Projection
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Limit & Sort
db.users.find().limit(10).sort({ age: -1 });
```

## Update

```javascript
db.users.updateOne(
  { name: "John" },
  { $set: { age: 31 } }
);

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { minor: true } }
);
```

## Delete

```javascript
db.users.deleteOne({ name: "John" });
db.users.deleteMany({ age: { $lt: 18 } });
```

## Aggregation

```javascript
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $group: { _id: "$city", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '4 hours',
        NOW() - INTERVAL '4 hours'
    ),
    (
        'note-035',
        'Recette Pad Thai',
        '# Pad Thai Authentique 🍜

## Ingrédients (2 personnes)

- 200g de nouilles de riz
- 200g de crevettes
- 2 œufs
- 100g de tofu ferme
- 2 gousses d''ail
- Cacahuètes concassées
- Ciboulette
- Germes de soja

### Sauce
- 3 c.s. sauce poisson
- 2 c.s. sucre de palme
- 2 c.s. jus de tamarin
- 1 c.s. sauce soja

## Préparation

1. **Tremper** les nouilles 20 min
2. **Sauce** : Mélanger tous les ingrédients
3. **Wok** très chaud avec huile
4. **Faire revenir** ail, tofu, crevettes
5. **Ajouter** nouilles et sauce
6. **Pousser** sur le côté, cuire les œufs
7. **Mélanger** le tout
8. **Servir** avec cacahuètes, citron, germes

**Temps** : 30 minutes
**Niveau** : Intermédiaire',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '2 hours',
        NOW() - INTERVAL '2 hours'
    ),
    (
        'note-036',
        'Sécurité Web OWASP',
        '# Sécurité Web - OWASP Top 10

## 1. Injection SQL

```java
// ❌ Vulnérable
String query = "SELECT * FROM users WHERE id = " + userId;

// ✅ Sécurisé
PreparedStatement stmt = conn.prepareStatement(
  "SELECT * FROM users WHERE id = ?"
);
stmt.setInt(1, userId);
```

## 2. Broken Authentication

- Mots de passe forts
- MFA (Multi-Factor Auth)
- Limite de tentatives
- Session timeout

## 3. XSS (Cross-Site Scripting)

```javascript
// ❌ Dangereux
element.innerHTML = userInput;

// ✅ Sécurisé
element.textContent = userInput;
// ou sanitize avec DOMPurify
```

## 4. CSRF

```html
<!-- Token CSRF -->
<input type="hidden" name="csrf_token" value="random_token">
```

## 5. Security Misconfiguration

- Désactiver messages d''erreur détaillés
- Supprimer comptes par défaut
- Garder dépendances à jour

## 6. Sensitive Data Exposure

- HTTPS partout
- Chiffrement des données sensibles
- Pas de données en clair

## Best Practices

✅ Validation des entrées
✅ Principe du moindre privilège
✅ Logs de sécurité
✅ Tests de sécurité réguliers',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '90 minutes',
        NOW() - INTERVAL '90 minutes'
    ),
    (
        'note-037',
        'Podcasts Tech à Écouter',
        '# Podcasts Tech 🎙️

## Développement

### Français
- **ifttd** - If This Then Dev
- **Artisan Développeur**
- **Le Podcast AWS en Français**
- **Dev Café**

### Anglais
- **Syntax.fm** - Web Development
- **JavaScript Jabber**
- **The Changelog**
- **Software Engineering Daily**

## Business & Startups
- **Indie Hackers**
- **How I Built This**
- **Masters of Scale**
- **The Tim Ferriss Show**

## Data Science
- **Data Skeptic**
- **Linear Digressions**
- **Talking Machines**

## Sécurité
- **Darknet Diaries**
- **Security Now**
- **Malicious Life**

## Design
- **Design Better Podcast**
- **The Futur**
- **99% Invisible**

**Tip** : Écouter à 1.5x pour gagner du temps !',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '60 minutes',
        NOW() - INTERVAL '60 minutes'
    ),
    (
        'note-038',
        'Méthode Pomodoro',
        '# Technique Pomodoro 🍅

## Principe

**25 min travail + 5 min pause**

## Étapes

1. **Choisir** une tâche
2. **Timer** 25 minutes
3. **Travailler** sans interruption
4. **Pause** 5 minutes
5. **Répéter** 4 fois
6. **Grande pause** 15-30 minutes

## Règles d''Or

✅ **Pas de distractions**
- Mode avion
- Fermer emails
- Notifications OFF

✅ **Une seule tâche**
- Focus total
- Pas de multitasking

✅ **Respecter les pauses**
- Se lever
- S''étirer
- Boire de l''eau

## Apps Recommandées

- **Forest** - Gamification
- **Focus To-Do** - Pomodoro + Tasks
- **Be Focused** - Simple et efficace
- **Pomofocus** - Web gratuit

## Bénéfices

- ⬆️ Productivité
- ⬆️ Concentration
- ⬇️ Fatigue mentale
- ⬇️ Procrastination

**Objectif** : 8-12 pomodoros par jour',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '45 minutes',
        NOW() - INTERVAL '45 minutes'
    ),
    (
        'note-039',
        'Linux Commands Essentiels',
        '# Linux - Commandes Essentielles

## Navigation

```bash
pwd                 # Répertoire actuel
ls -la              # Lister fichiers
cd /path/to/dir     # Changer répertoire
cd ..               # Répertoire parent
cd ~                # Home directory
```

## Fichiers

```bash
touch file.txt      # Créer fichier
mkdir dirname       # Créer dossier
cp source dest      # Copier
mv old new          # Déplacer/Renommer
rm file             # Supprimer
rm -rf dir          # Supprimer dossier
```

## Contenu

```bash
cat file            # Afficher contenu
less file           # Paginer contenu
head -n 10 file     # 10 premières lignes
tail -f file        # Suivre fichier (logs)
grep "pattern" file # Rechercher
```

## Permissions

```bash
chmod 755 file      # Modifier permissions
chown user file     # Changer propriétaire
sudo command        # Exécuter en root
```

## Processus

```bash
ps aux              # Lister processus
top                 # Moniteur processus
kill PID            # Tuer processus
killall name        # Tuer par nom
```

## Réseau

```bash
ping google.com     # Test connexion
curl url            # HTTP request
wget url            # Télécharger
netstat -tuln       # Ports ouverts
```

## Système

```bash
df -h               # Espace disque
du -sh dir          # Taille dossier
free -h             # Mémoire
uname -a            # Info système
```',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '30 minutes',
        NOW() - INTERVAL '30 minutes'
    ),
    (
        'note-040',
        'Recette Tiramisu',
        '# Tiramisu Traditionnel 🇮🇹

## Ingrédients (6 personnes)

- 500g de mascarpone
- 4 œufs
- 100g de sucre
- 300ml de café fort
- 30ml d''Amaretto (optionnel)
- 300g de biscuits à la cuillère
- Cacao en poudre

## Préparation

### Crème Mascarpone

1. **Séparer** blancs et jaunes
2. **Fouetter** jaunes + sucre jusqu''à blanchiment
3. **Ajouter** mascarpone, mélanger
4. **Monter** blancs en neige ferme
5. **Incorporer** délicatement les blancs

### Montage

1. **Café** : Laisser refroidir, ajouter Amaretto
2. **Tremper** rapidement les biscuits
3. **Couche** de biscuits au fond
4. **Couche** de crème mascarpone
5. **Répéter** (2 couches)
6. **Saupoudrer** de cacao

### Repos

- **Minimum** : 4 heures au frigo
- **Idéal** : Une nuit

## Astuces

✅ Café bien fort
✅ Trempage rapide des biscuits
✅ Blancs en neige bien fermes
✅ Cacao juste avant de servir

**Buonissimo !** 👨‍🍳',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '15 minutes',
        NOW() - INTERVAL '15 minutes'
    ),
    (
        'note-041',
        'Clean Code Principles',
        '# Clean Code - Principes

## Nommage

```java
// ❌ Mauvais
int d; // elapsed time in days

// ✅ Bon
int elapsedTimeInDays;
```

## Fonctions

### Petites et Focalisées

```java
// ❌ Fait trop de choses
void processUserAndSendEmail() { }

// ✅ Une seule responsabilité
void processUser() { }
void sendEmail() { }
```

### Peu d''arguments

```java
// ❌ Trop d''arguments
void createUser(String name, String email, int age, String address) { }

// ✅ Objet
void createUser(UserData data) { }
```

## Commentaires

```java
// ❌ Commentaire inutile
// Incrémente i
i++;

// ✅ Code auto-explicatif
customerAge++;

// ✅ Commentaire utile
// Workaround pour bug #1234 dans lib v2.1
```

## Formatage

- Indentation cohérente
- Lignes < 120 caractères
- Espaces autour des opérateurs
- Lignes vides pour séparer concepts

## Tests

```java
@Test
void shouldReturnTrueWhenUserIsAdult() {
  // Given
  User user = new User(25);
  
  // When
  boolean result = user.isAdult();
  
  // Then
  assertTrue(result);
}
```

## Règles

1. **DRY** - Don''t Repeat Yourself
2. **KISS** - Keep It Simple, Stupid
3. **YAGNI** - You Aren''t Gonna Need It',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '10 minutes',
        NOW() - INTERVAL '10 minutes'
    ),
    (
        'note-042',
        'Série Netflix Recommandées',
        '# Séries Netflix 📺

## Drame
- **Breaking Bad** - Crime, Drame
- **Better Call Saul** - Prequel de BB
- **Ozark** - Blanchiment d''argent
- **The Crown** - Famille royale
- **Stranger Things** - Sci-fi années 80

## Thriller
- **Mindhunter** - Profiling FBI
- **Dark** - Voyage temporel allemand
- **Narcos** - Pablo Escobar
- **Money Heist** (La Casa de Papel)

## Comédie
- **The Office** - Mockumentary
- **Brooklyn Nine-Nine** - Comédie policière
- **The Good Place** - Philosophie fun
- **Schitt''s Creek** - Famille ruinée

## Science-Fiction
- **Black Mirror** - Techno-dystopie
- **The Witcher** - Fantasy
- **Altered Carbon** - Cyberpunk
- **Love, Death & Robots** - Anthologie

## Documentaire
- **The Last Dance** - Michael Jordan
- **Formula 1: Drive to Survive**
- **Chef''s Table** - Gastronomie
- **Our Planet** - Nature

## Animation
- **Arcane** - League of Legends
- **Castlevania**
- **BoJack Horseman**',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '5 minutes',
        NOW() - INTERVAL '5 minutes'
    ),
    (
        'note-043',
        'GraphQL Basics',
        '# GraphQL - Introduction

## Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User!
  deleteUser(id: ID!): Boolean!
}
```

## Queries

```graphql
# Simple query
query {
  user(id: "1") {
    name
    email
  }
}

# Nested query
query {
  user(id: "1") {
    name
    posts {
      title
      content
    }
  }
}

# Variables
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
    email
  }
}
```

## Mutations

```graphql
mutation {
  createUser(name: "John", email: "john@example.com") {
    id
    name
  }
}
```

## Avantages

✅ Pas de over-fetching
✅ Pas de under-fetching
✅ Un seul endpoint
✅ Typage fort
✅ Documentation auto',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '2 minutes',
        NOW() - INTERVAL '2 minutes'
    ),
    (
        'note-044',
        'Habitudes Minimalistes',
        '# Minimalisme - Guide Pratique

## Désencombrement

### Méthode KonMari
1. **Vêtements** en premier
2. **Livres**
3. **Papiers**
4. **Objets divers**
5. **Objets sentimentaux** en dernier

### Règle 90/90
Si pas utilisé dans les 90 derniers jours
ET ne sera pas utilisé dans les 90 prochains
→ **Donner/Vendre**

## Digital Minimalisme

- Désinstaller apps inutiles
- Désabonner newsletters
- Organiser fichiers
- Supprimer photos floues
- Limiter réseaux sociaux

## Achats Conscients

### Questions avant achat
1. En ai-je vraiment besoin ?
2. Ai-je déjà quelque chose de similaire ?
3. Où vais-je le ranger ?
4. Combien de fois vais-je l''utiliser ?

### Règle 30 jours
Attendre 30 jours avant gros achat

## Bénéfices

✅ Moins de stress
✅ Plus de temps libre
✅ Économies d''argent
✅ Maison plus propre
✅ Esprit plus clair

## Mantra

**"Less is more"**',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW() - INTERVAL '1 minute',
        NOW() - INTERVAL '1 minute'
    ),
    (
        'note-045',
        'Redis Caching Strategies',
        '# Redis - Stratégies de Cache

## Installation

```bash
# Docker
docker run -d -p 6379:6379 redis

# CLI
redis-cli
```

## Commandes de Base

```bash
# String
SET key "value"
GET key
DEL key
EXPIRE key 3600

# Hash
HSET user:1 name "John"
HGET user:1 name
HGETALL user:1

# List
LPUSH mylist "item1"
RPUSH mylist "item2"
LRANGE mylist 0 -1

# Set
SADD myset "member1"
SMEMBERS myset

# Sorted Set
ZADD leaderboard 100 "player1"
ZRANGE leaderboard 0 -1 WITHSCORES
```

## Patterns de Cache

### Cache-Aside

```java
// Lire
value = cache.get(key);
if (value == null) {
    value = db.query(key);
    cache.set(key, value, TTL);
}
return value;
```

### Write-Through

```java
// Écrire
db.save(data);
cache.set(key, data, TTL);
```

### Write-Behind

```java
// Écrire (async)
cache.set(key, data, TTL);
queue.add(() -> db.save(data));
```

## TTL Strategy

```java
// Short TTL pour données changeantes
cache.set("user:session", data, 300); // 5 min

// Long TTL pour données statiques
cache.set("config", data, 86400); // 24h
```

## Best Practices

✅ Définir TTL approprié
✅ Gérer cache miss
✅ Invalidation cohérente
✅ Monitoring de hit rate',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    ),
    (
        'note-046',
        'Méditation pour Débutants',
        '# Méditation - Guide Débutant 🧘

## Pourquoi Méditer ?

- ⬇️ Stress et anxiété
- ⬆️ Concentration
- ⬆️ Bien-être émotionnel
- 😴 Meilleur sommeil
- 🧠 Clarté mentale

## Comment Commencer

### Setup
1. **Lieu** calme
2. **Position** confortable (assis/allongé)
3. **Vêtements** confortables
4. **Durée** : Commencer par 5 min

### Technique de Base

1. **Fermer** les yeux
2. **Respirer** naturellement
3. **Observer** la respiration
4. **Pensées** : Les laisser passer
5. **Revenir** à la respiration

## Types de Méditation

### Pleine Conscience
Focus sur le moment présent

### Respiration
Compter les respirations (1 à 10)

### Body Scan
Scanner le corps de la tête aux pieds

### Mantra
Répéter un mot/phrase

## Apps Recommandées

- **Headspace** - Guidé, débutants
- **Calm** - Variété de méditations
- **Insight Timer** - Gratuit, communauté
- **Petit Bambou** - Français

## Programme 30 Jours

- Semaine 1 : 5 min/jour
- Semaine 2 : 10 min/jour
- Semaine 3 : 15 min/jour
- Semaine 4 : 20 min/jour

## Tips

✅ Même heure chaque jour
✅ Pas de jugement
✅ Patience et régularité
✅ Commencer petit

**La pratique rend parfait !**',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    ),
    (
        'note-047',
        'Terraform Infrastructure as Code',
        '# Terraform - IaC Basics

## Installation

```bash
# Mac
brew install terraform

# Linux
wget https://releases.hashicorp.com/terraform/...
unzip terraform_*.zip
sudo mv terraform /usr/local/bin/
```

## Configuration

```hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-west-1"
}

resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t2.micro"
  
  tags = {
    Name = "WebServer"
  }
}

resource "aws_s3_bucket" "data" {
  bucket = "my-data-bucket"
  
  tags = {
    Environment = "Production"
  }
}
```

## Variables

```hcl
# variables.tf
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "region" {
  type    = string
  default = "eu-west-1"
}
```

## Outputs

```hcl
# outputs.tf
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

## Commandes

```bash
# Initialiser
terraform init

# Planifier
terraform plan

# Appliquer
terraform apply

# Détruire
terraform destroy

# Format
terraform fmt

# Valider
terraform validate
```

## Best Practices

✅ State remote (S3 + DynamoDB)
✅ Modules réutilisables
✅ Variables pour configuration
✅ Outputs pour infos importantes
✅ .gitignore pour secrets',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    ),
    (
        'note-048',
        'Recette Ramen Maison',
        '# Ramen Maison 🍜

## Bouillon (4h de cuisson)

### Ingrédients
- 1kg d''os de porc
- 500g de poitrine de porc
- 2 oignons
- 1 tête d''ail
- Gingembre (5cm)
- 3L d''eau

### Préparation
1. **Blanchir** les os 5 min
2. **Rincer** à l''eau froide
3. **Mijoter** 4h à feu doux
4. **Filtrer** le bouillon

## Tare (Sauce)

- 100ml sauce soja
- 50ml mirin
- 2 c.s. miso
- 1 c.s. huile sésame

## Toppings

- Œuf mollet (6 min)
- Chashu (porc braisé)
- Nori (algue)
- Maïs
- Oignons verts
- Germes de soja
- Huile pimentée

## Nouilles

- 400g nouilles ramen fraîches
- Cuire 2-3 min dans eau bouillante

## Montage

1. **Tare** au fond du bol
2. **Bouillon** chaud
3. **Nouilles** égouttées
4. **Toppings** disposés joliment

**Itadakimasu !** 🙏',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    ),
    (
        'note-049',
        'Microservices Architecture',
        '# Architecture Microservices

## Principes

### Single Responsibility
Chaque service = une fonction business

### Autonomie
- Base de données dédiée
- Déploiement indépendant
- Équipe dédiée

### Communication
- API REST ou gRPC
- Message queue (RabbitMQ, Kafka)
- Event-driven

## Patterns

### API Gateway
Point d''entrée unique

```
Client → API Gateway → Services
```

### Service Discovery
Eureka, Consul, etcd

### Circuit Breaker
Hystrix, Resilience4j

```java
@CircuitBreaker(name = "userService")
public User getUser(String id) {
    return userService.findById(id);
}
```

### Saga Pattern
Transactions distribuées

## Technologies

### Orchestration
- **Kubernetes** - Container orchestration
- **Docker Swarm** - Alternative simple

### Service Mesh
- **Istio** - Traffic management
- **Linkerd** - Léger et rapide

### Monitoring
- **Prometheus** - Métriques
- **Grafana** - Visualisation
- **Jaeger** - Distributed tracing
- **ELK Stack** - Logs centralisés

## Avantages

✅ Scalabilité indépendante
✅ Technologie par service
✅ Déploiement continu
✅ Isolation des pannes

## Inconvénients

❌ Complexité réseau
❌ Transactions distribuées
❌ Testing plus difficile
❌ Overhead opérationnel

## Quand Utiliser ?

✅ Application large et complexe
✅ Équipes multiples
✅ Besoin de scalabilité
✅ Déploiements fréquents

❌ Petite application
❌ Équipe réduite
❌ MVP/Prototype',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    ),
    (
        'note-050',
        'Gestion du Temps - Matrice Eisenhower',
        '# Matrice d''Eisenhower ⏰

## Quadrants

### Q1 : Urgent & Important
**À FAIRE IMMÉDIATEMENT**
- Crises
- Deadlines proches
- Urgences

**Action** : Planifier et exécuter

### Q2 : Important mais Pas Urgent
**À PLANIFIER**
- Planification stratégique
- Développement personnel
- Relations
- Prévention

**Action** : Bloquer du temps dédié

### Q3 : Urgent mais Pas Important
**À DÉLÉGUER**
- Interruptions
- Certains emails/appels
- Réunions peu utiles

**Action** : Déléguer ou minimiser

### Q4 : Ni Urgent Ni Important
**À ÉLIMINER**
- Distractions
- Réseaux sociaux excessifs
- Activités chronophages

**Action** : Supprimer

## Application Pratique

### Matin
1. **Lister** toutes les tâches
2. **Classer** dans les quadrants
3. **Prioriser** Q1 puis Q2
4. **Déléguer** Q3
5. **Éliminer** Q4

### Objectif
Passer **60-80% du temps en Q2**

## Exemple de Journée

**Q1 (2h)**
- Bug critique en production
- Présentation client

**Q2 (5h)** ⭐
- Développement nouvelle feature
- Formation équipe
- Planification sprint

**Q3 (1h)**
- Réunion status déléguée
- Emails non-critiques

**Q4 (0h)**
- Scroll réseaux sociaux → Éliminé

## Tips

✅ Réviser chaque semaine
✅ Dire non au Q4
✅ Bloquer temps pour Q2
✅ Automatiser Q3 si possible

**Focus sur l''important, pas l''urgent !**',
        'PRIVATE',
        'demo-user-uuid-001',
        NOW(),
        NOW()
    );

-- Insert tags for the new notes
INSERT INTO note_tags (note_id, tag)
VALUES
    ('note-011', 'docker'),
    ('note-011', 'devops'),
    ('note-011', 'tutoriel'),
    
    ('note-012', 'vscode'),
    ('note-012', 'productivité'),
    ('note-012', 'shortcuts'),
    
    ('note-013', 'cuisine'),
    ('note-013', 'recette'),
    ('note-013', 'dessert'),
    
    ('note-014', 'react'),
    ('note-014', 'javascript'),
    ('note-014', 'hooks'),
    
    ('note-015', 'sport'),
    ('note-015', 'fitness'),
    ('note-015', 'santé'),
    
    ('note-016', 'api'),
    ('note-016', 'rest'),
    ('note-016', 'backend'),
    
    ('note-017', 'voyage'),
    ('note-017', 'checklist'),
    ('note-017', 'organisation'),
    
    ('note-018', 'sql'),
    ('note-018', 'database'),
    ('note-018', 'queries'),
    
    ('note-019', 'cadeaux'),
    ('note-019', 'idées'),
    ('note-019', 'shopping'),
    
    ('note-020', 'typescript'),
    ('note-020', 'types'),
    ('note-020', 'advanced'),
    
    ('note-021', 'finance'),
    ('note-021', 'budget'),
    ('note-021', 'personnel'),
    
    ('note-022', 'solid'),
    ('note-022', 'design-patterns'),
    ('note-022', 'architecture'),
    
    ('note-023', 'musique'),
    ('note-023', 'playlist'),
    ('note-023', 'motivation'),
    
    ('note-024', 'regex'),
    ('note-024', 'patterns'),
    ('note-024', 'validation'),
    
    ('note-025', 'cuisine'),
    ('note-025', 'healthy'),
    ('note-025', 'breakfast'),
    
    ('note-026', 'kubernetes'),
    ('note-026', 'devops'),
    ('note-026', 'containers'),
    
    ('note-027', 'routine'),
    ('note-027', 'productivité'),
    ('note-027', 'morning'),
    
    ('note-028', 'design-patterns'),
    ('note-028', 'java'),
    ('note-028', 'architecture'),
    
    ('note-029', 'films'),
    ('note-029', 'cinéma'),
    ('note-029', 'culture'),
    
    ('note-030', 'css'),
    ('note-030', 'grid'),
    ('note-030', 'frontend'),
    
    ('note-031', 'carrière'),
    ('note-031', 'entretien'),
    ('note-031', 'emploi'),
    
    ('note-032', 'python'),
    ('note-032', 'data-science'),
    ('note-032', 'pandas'),
    
    ('note-033', 'livres'),
    ('note-033', 'lecture'),
    ('note-033', 'développement-personnel'),
    
    ('note-034', 'mongodb'),
    ('note-034', 'nosql'),
    ('note-034', 'database'),
    
    ('note-035', 'cuisine'),
    ('note-035', 'thai'),
    ('note-035', 'asiatique'),
    
    ('note-036', 'sécurité'),
    ('note-036', 'owasp'),
    ('note-036', 'web'),
    
    ('note-037', 'podcasts'),
    ('note-037', 'tech'),
    ('note-037', 'apprentissage'),
    
    ('note-038', 'pomodoro'),
    ('note-038', 'productivité'),
    ('note-038', 'focus'),
    
    ('note-039', 'linux'),
    ('note-039', 'commands'),
    ('note-039', 'terminal'),
    
    ('note-040', 'cuisine'),
    ('note-040', 'dessert'),
    ('note-040', 'italien'),
    
    ('note-041', 'clean-code'),
    ('note-041', 'best-practices'),
    ('note-041', 'qualité'),
    
    ('note-042', 'séries'),
    ('note-042', 'netflix'),
    ('note-042', 'entertainment'),
    
    ('note-043', 'graphql'),
    ('note-043', 'api'),
    ('note-043', 'backend'),
    
    ('note-044', 'minimalisme'),
    ('note-044', 'lifestyle'),
    ('note-044', 'organisation'),
    
    ('note-045', 'redis'),
    ('note-045', 'cache'),
    ('note-045', 'performance'),
    
    ('note-046', 'méditation'),
    ('note-046', 'bien-être'),
    ('note-046', 'mindfulness'),
    
    ('note-047', 'terraform'),
    ('note-047', 'iac'),
    ('note-047', 'devops'),
    
    ('note-048', 'cuisine'),
    ('note-048', 'ramen'),
    ('note-048', 'japonais'),
    
    ('note-049', 'microservices'),
    ('note-049', 'architecture'),
    ('note-049', 'distributed'),
    
    ('note-050', 'productivité'),
    ('note-050', 'time-management'),
    ('note-050', 'eisenhower');

