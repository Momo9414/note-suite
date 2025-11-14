# Notes Suite – Plateforme Full-Stack

Suite applicative complète pour la gestion de notes sécurisées : API Spring Boot, frontend Angular et application mobile React Native.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL Database (notes_db)              │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────┐
│           Spring Boot API (REST @ port 8080)            │
│  • JWT Authentication  • CRUD Notes                     │
│  • Pagination  • Search  • Swagger                      │
└──────────────┬──────────────────┬────────────────────────┘
               │                   │
       ┌───────┴───────┐   ┌──────┴──────────┐
       │  Angular Web  │   │  React Native   │
       │  (port 8081)  │   │  (Expo Mobile)  │
       └───────────────┘   └─────────────────┘
```

## Démarrage rapide

### Docker (recommandé)

```bash
docker compose up -d
```

Services exposés :
- API : http://localhost:8080/api/v1
- Frontend web : http://localhost:8081
- Swagger : http://localhost:8080/api/v1/swagger-ui.html

### Développement local

Backend :
```bash
cd backend-spring
./start.sh
```

Frontend :
```bash
cd web-frontend
npm install
npm start
```

Mobile :
```bash
cd mobile-app
npm install
npm start
```

## Compte de test

```
Email: user@example.com
Password: password123
```

## Technologies

### Backend
- Spring Boot 3.2 + Java 17
- Spring Security + JWT
- PostgreSQL + JPA
- Flyway + Swagger
- Maven

### Frontend Web
- Angular 18 + TypeScript
- RxJS + HttpClient
- Angular Router + Guards
- Nginx (production)

### Mobile
- React Native + Expo
- TypeScript
- Axios + AsyncStorage
- Ionicons

## Structure du projet

```
notes-suite-main/
├── backend-spring/       # API Spring Boot
│   ├── src/
│   ├── Dockerfile
│   └── pom.xml
│
├── web-frontend/         # Frontend Angular
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── mobile-app/           # App React Native
│   ├── src/
│   ├── App.tsx
│   └── package.json
│
├── docker-compose.yml    # Orchestration
├── env.example           # Variables d'environnement
└── README.md
```

## Configuration

Variables d'environnement (`.env`):

```env
# Database
POSTGRES_DB=notes_db
POSTGRES_USER=notes_user
POSTGRES_PASSWORD=secure_password_123
POSTGRES_PORT=5432

# Backend
BACKEND_PORT=8080
JWT_SECRET=votre_secret_jwt_tres_securise_avec_au_moins_256_bits

# Frontend
FRONTEND_PORT=8081
```

## API principales

### Authentification
```
POST /api/v1/auth/register    - Inscription
POST /api/v1/auth/login       - Connexion
```

### Notes (nécessite auth)
```
GET    /api/v1/notes          - Liste paginée
GET    /api/v1/notes/{id}     - Détails
POST   /api/v1/notes          - Créer
PUT    /api/v1/notes/{id}     - Modifier
DELETE /api/v1/notes/{id}     - Supprimer
GET    /api/v1/notes/search   - Recherche
```

### Système
```
GET /api/v1/health            - Health check
GET /api/v1/swagger-ui.html   - Documentation
```

## Fonctionnalités clés

### Backend
- Authentification JWT
- CRUD complet des notes
- Recherche texte et pagination
- Validation et documentation Swagger

### Frontend web
- Interface responsive
- Recherche instantanée
- Modales de consultation et d’édition
- Gestion complète du cycle de vie des notes

### Application mobile
- Navigation Expo/React Navigation
- Gestion hors-ligne basique via AsyncStorage
- Synchronisation avec l’API

## Tests

```bash
# Santé du backend
curl http://localhost:8080/api/v1/health

# Réponse du frontend
curl http://localhost:8081
```

## Déploiement

```bash
docker compose build
docker compose up -d
```

## Journalisation et support

```bash
docker compose logs -f
docker compose logs -f api
docker compose logs -f web
docker compose restart api
docker compose restart web
```
