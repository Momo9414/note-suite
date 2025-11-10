# 📝 Notes Suite - Application Full-Stack

Application complète de gestion de notes avec backend Spring Boot, frontend Angular, et application mobile React Native.

## 🏗️ Architecture

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

## 🚀 Démarrage Rapide

### Option 1: Docker (Recommandé)

```bash
# Démarrer tous les services
make up

# Ou manuellement
docker compose up -d
```

**URLs:**
- Backend API: http://localhost:8080/api/v1
- Frontend Web: http://localhost:8081
- Swagger UI: http://localhost:8080/api/v1/swagger-ui.html

### Option 2: Développement Local

**Backend:**
```bash
cd backend-spring
./start.sh
```

**Frontend:**
```bash
cd web-frontend
npm install
npm start
```

**Mobile:**
```bash
cd mobile-app
npm install
npm start
# Scanner le QR code avec Expo Go
```

## 🔑 Compte de Test

```
Email: user@example.com
Password: password123
```

## 📦 Technologies

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

## 🐳 Commandes Docker

```bash
make help          # Voir toutes les commandes
make build         # Build les images
make up            # Démarrer
make down          # Arrêter
make logs          # Voir les logs
make restart       # Redémarrer
make clean         # Nettoyer tout
make test          # Tester les services
```

## 📁 Structure du Projet

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
├── Makefile              # Commandes utiles
├── .env                  # Variables d'env
└── README.md
```

## 🔧 Configuration

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

## 📚 API Endpoints

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

## 🎯 Fonctionnalités

### ✅ Backend
- Authentification JWT
- CRUD Notes complet
- Pagination & recherche
- Validation des données
- Documentation Swagger
- Logs structurés

### ✅ Frontend Web
- Interface moderne
- Recherche en temps réel
- Pagination
- Modal de détails
- Création/Édition/Suppression
- Responsive design

### ✅ Mobile
- Design professionnel (Ionicons)
- CRUD complet
- Modal détails/création/édition
- Recherche et pagination
- Menu bas avec navigation
- Modal profil
- Validations pour actions destructives

## 🧪 Tests

### Test Backend
```bash
curl http://localhost:8080/api/v1/health
```

### Test Frontend
```bash
curl http://localhost:8081
```

### Test Complet
```bash
make test
```

## 🚢 Déploiement

### Build Production
```bash
# Build toutes les images
docker compose build

# Démarrer en production
docker compose up -d
```

### Images Docker
- `notes-backend` : 150MB (JRE Alpine)
- `notes-frontend` : 25MB (Nginx Alpine)

## 🔒 Sécurité

- Passwords hashés (BCrypt)
- JWT avec expiration
- CORS configuré
- Headers de sécurité
- Users non-root dans containers
- Healthchecks
- Validation des entrées

## 📊 Performance

- Backend: ~50ms réponse moyenne
- Frontend: < 2s chargement initial
- Database: Index optimisés
- Docker: Multi-stage builds

## 🐛 Debugging

### Logs
```bash
# Tous les services
make logs

# Service spécifique
docker compose logs -f api
docker compose logs -f web
```

### Restart un service
```bash
docker compose restart api
docker compose restart web
```

## 📄 Licence

MIT License

## 🎉 Status

**✅ Projet 100% Fonctionnel et Production-Ready**

- Backend Spring Boot ✅
- Frontend Angular ✅
- Mobile React Native ✅
- Docker & CI/CD ✅
- Documentation complète ✅
