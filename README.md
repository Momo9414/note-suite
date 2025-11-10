# 📝 Notes Collaboratives - Application Full-Stack

> Application moderne de gestion de notes collaboratives avec backend Spring Boot, frontend web Angular et application mobile offline-first Flutter.

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-17.x-DD0031.svg)](https://angular.io/)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B.svg)](https://flutter.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Architecture](#-architecture)
- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Démarrage rapide](#-démarrage-rapide)
- [Structure du projet](#-structure-du-projet)
- [Technologies utilisées](#-technologies-utilisées)
- [Configuration](#-configuration)
- [Documentation API](#-documentation-api)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Sécurité](#-sécurité)
- [Contribution](#-contribution)
- [Support](#-support)

## 🎯 Vue d'ensemble

Application complète de gestion de notes collaboratives permettant de :
- ✅ Créer, lire, modifier et supprimer des notes en Markdown
- ✅ Rechercher et filtrer les notes par tags et visibilité
- ✅ Partager des notes avec d'autres utilisateurs (lecture seule)
- ✅ Générer des liens publics pour partager des notes
- ✅ Synchronisation offline-first sur mobile
- ✅ Authentification sécurisée avec JWT
- ✅ Interface web moderne et responsive
- ✅ Application mobile native avec cache local

**⏱️ Estimation de mise en place :** 4 jours (selon estimation CTO)

## 🏗️ Architecture

### Architecture globale

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │   Web Frontend   │         │    Mobile Application    │  │
│  │     Angular      │         │        Flutter           │  │
│  │   Port: 4200     │         │    Offline-First Cache   │  │
│  └────────┬─────────┘         └───────────┬──────────────┘  │
└───────────┼─────────────────────────────┼─────────────────┘
            │                             │
            │         HTTPS/REST          │
            └──────────────┬──────────────┘
                           │
            ┌──────────────▼──────────────┐
            │      API Gateway (opt)      │
            │      BFF NestJS (opt)       │
            └──────────────┬──────────────┘
                           │
            ┌──────────────▼──────────────┐
            │      Backend Layer          │
            │    Spring Boot 3 API        │
            │    Port: 8080               │
            │  ┌──────────────────────┐   │
            │  │  Spring Security     │   │
            │  │  JWT Authentication  │   │
            │  └──────────────────────┘   │
            │  ┌──────────────────────┐   │
            │  │   Business Logic     │   │
            │  │   Services + DTOs    │   │
            │  └──────────────────────┘   │
            │  ┌──────────────────────┐   │
            │  │   Data Access Layer  │   │
            │  │   Spring Data JPA    │   │
            │  └──────────────────────┘   │
            └──────────────┬──────────────┘
                           │
            ┌──────────────▼──────────────┐
            │     Database Layer          │
            │     PostgreSQL 15+          │
            │     Port: 5432              │
            └─────────────────────────────┘
```

### Architecture modulaire

Le projet adopte une architecture modulaire et scalable :

**Backend (Hexagonal/Clean Architecture)**
```
backend-spring/
├── api/           → Contrôleurs REST (adaptateurs entrants)
├── domain/        → Entités métier et logique business
├── service/       → Services métier et orchestration
├── repository/    → Accès aux données (adaptateurs sortants)
├── security/      → Configuration JWT et autorisation
├── dto/           → Objets de transfert de données
├── mapper/        → Conversions entités ↔ DTOs (MapStruct)
├── exception/     → Gestion centralisée des erreurs
└── config/        → Configuration Spring
```

**Frontend Web Angular (Architecture par fonctionnalités)**
```
web-frontend/
├── app/
│   ├── features/      → Modules fonctionnels
│   │   ├── auth/
│   │   ├── notes/
│   │   └── shared/
│   ├── core/          → Services singleton (guards, interceptors)
│   ├── shared/        → Composants/directives/pipes réutilisables
│   └── assets/        → Ressources statiques
└── environments/      → Configuration par environnement
```

**Mobile Flutter (Clean Architecture + Feature-First)**
```
mobile-app/
├── lib/
│   ├── features/      → Modules fonctionnels
│   │   ├── auth/      (data, domain, presentation)
│   │   ├── notes/     (data, domain, presentation)
│   │   └── sync/      → Synchronisation offline
│   ├── data/          → Datasources partagés
│   │   ├── local/     → SQLite/Hive
│   │   └── remote/    → API Client (Dio)
│   ├── core/          → Services centraux
│   │   ├── network/   → Connectivité
│   │   ├── storage/   → Secure storage
│   │   └── theme/     → Thème de l'app
│   └── shared/        → Widgets partagés
```

## ✨ Fonctionnalités

### 🔐 Authentification & Autorisation
- Inscription et connexion avec email/mot de passe
- Authentification JWT (access + refresh tokens)
- Middleware de protection des routes
- Gestion sécurisée des tokens côté client

### 📝 Gestion des notes
- CRUD complet (Create, Read, Update, Delete)
- Support du format Markdown avec prévisualisation
- Système de tags pour organiser les notes
- Recherche full-text (titre et contenu)
- Filtrage par visibilité (privé, partagé, public)
- Pagination et tri par date de modification

### 🤝 Partage collaboratif
- Partage avec utilisateurs spécifiques (lecture seule)
- Génération de liens publics avec tokens sécurisés
- Expiration optionnelle des liens publics
- Révocation des partages et liens
- Page publique accessible via `/p/{token}`

### 📱 Application mobile
- Mode offline-first avec cache SQLite/Hive
- Synchronisation automatique en arrière-plan
- Stratégie de résolution de conflits (Last-Write-Wins)
- Indicateurs d'état de connexion
- Pull-to-refresh pour synchronisation manuelle

### 🎨 Interface utilisateur
- Design moderne et responsive
- Mode sombre/clair (optionnel)
- Notifications toast pour feedback utilisateur
- Skeleton loaders pendant chargements
- Empty states et messages d'erreur contextuels
- Éditeur Markdown avec prévisualisation en temps réel

## 🔧 Prérequis

### Outils requis

| Outil | Version minimale | Vérification |
|-------|-----------------|--------------|
| **Java** | JDK 17+ | `java -version` |
| **Maven** | 3.8+ | `mvn -version` |
| **Node.js** | 18.x LTS | `node -version` |
| **npm/yarn** | 9.x / 1.22+ | `npm -version` |
| **Docker** | 20.x+ | `docker -version` |
| **Docker Compose** | 2.x+ | `docker compose version` |
| **PostgreSQL** | 15+ | `psql --version` (si local) |
| **Flutter** (mobile) | 3.x+ | `flutter --version` |
| **Git** | 2.x+ | `git --version` |

### Outils optionnels recommandés

- **Make** : pour automatiser les commandes
- **Postman/Insomnia** : pour tester l'API
- **Android Studio** : pour développement mobile Android
- **Xcode** : pour développement mobile iOS (macOS uniquement)

## 🚀 Démarrage rapide

### Commande unique (recommandé)

```bash
# Cloner le repository
git clone https://github.com/votre-username/notes-suite.git
cd notes-suite

# Démarrer tous les services
docker compose up -d

# L'application sera accessible sur :
# - API Backend: http://localhost:8080
# - API Docs (Swagger): http://localhost:8080/swagger-ui.html
# - Frontend Web Angular: http://localhost:4200
```

### Démarrage détaillé

#### 1️⃣ Backend Spring Boot

```bash
cd backend-spring

# Avec Docker (recommandé)
docker compose up -d postgres
mvn clean install
mvn spring-boot:run

# OU en local
# Configurer la base de données dans application.yml
mvn clean install -DskipTests
mvn spring-boot:run -Dspring.profiles.active=local
```

**Comptes de démonstration :**
- Admin : `admin@notes.app` / `Admin123!`
- Utilisateur : `user@notes.app` / `User123!`

#### 2️⃣ Frontend Web Angular

```bash
cd web-frontend

# Installation des dépendances
npm install

# Mode développement
npm start
# OU
ng serve

# Build production
npm run build:prod

# Tests
npm test
npm run e2e
```

#### 3️⃣ Application Mobile Flutter

```bash
cd mobile-app

# Installation des dépendances
flutter pub get

# Génération de code
flutter pub run build_runner build --delete-conflicting-outputs

# Lancer l'application
flutter run

# Lancer sur un appareil spécifique
flutter run -d android
flutter run -d ios
```

**Configuration :** Modifier l'URL de l'API dans `lib/core/config/app_config.dart`
- Android Emulator : `http://10.0.2.2:8080/api/v1`
- iOS Simulator : `http://localhost:8080/api/v1`
- Device physique : `http://<VOTRE_IP_LOCALE>:8080/api/v1`

## 📁 Structure du projet

```
notes-suite/
│
├── backend-spring/                # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/notes/
│   │   │   │   ├── api/          # Contrôleurs REST
│   │   │   │   ├── domain/       # Entités JPA
│   │   │   │   ├── service/      # Services métier
│   │   │   │   ├── repository/   # Repositories JPA
│   │   │   │   ├── security/     # Config JWT & Security
│   │   │   │   ├── dto/          # Data Transfer Objects
│   │   │   │   ├── mapper/       # Mappers (MapStruct)
│   │   │   │   ├── exception/    # Gestion d'erreurs
│   │   │   │   └── config/       # Configuration Spring
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-prod.yml
│   │   │       └── db/migration/ # Flyway/Liquibase
│   │   └── test/
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
│
├── web-frontend/                  # Frontend Angular
│   ├── src/
│   │   ├── features/             # Modules fonctionnels
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   ├── hooks/
│   │   │   │   └── types/
│   │   │   ├── notes/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── hooks/
│   │   │   └── shared/
│   │   ├── components/           # Composants partagés
│   │   ├── services/             # Services API
│   │   ├── store/                # State management
│   │   ├── hooks/                # Custom hooks
│   │   ├── utils/                # Utilitaires
│   │   ├── assets/               # Images, fonts, etc.
│   │   └── styles/               # Styles globaux
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── mobile-app/                    # App Mobile Flutter
│   ├── lib/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── notes/
│   │   │   └── sync/             # Synchronisation offline
│   │   ├── data/
│   │   │   ├── local/            # Cache local (SQLite/Hive)
│   │   │   ├── remote/           # API client
│   │   │   └── repository/       # Repository pattern
│   │   ├── domain/               # Modèles & use cases
│   │   ├── core/
│   │   │   ├── network/
│   │   │   ├── storage/
│   │   │   └── utils/
│   │   └── main.dart
│   ├── pubspec.yaml
│   └── README.md
│
├── docker/                        # Configuration Docker
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   ├── nginx.conf
│   └── init-scripts/
│
├── docker-compose.yml             # Orchestration complète
├── docker-compose.dev.yml         # Configuration dev
├── docker-compose.prod.yml        # Configuration prod
│
├── .github/                       # CI/CD
│   └── workflows/
│       ├── backend-ci.yml
│       ├── frontend-ci.yml
│       └── mobile-ci.yml
│
├── docs/                          # Documentation
│   ├── api/                      # Documentation API
│   ├── architecture/             # Diagrammes architecture
│   ├── deployment/               # Guide déploiement
│   └── user-guide/               # Guide utilisateur
│
├── scripts/                       # Scripts utilitaires
│   ├── setup.sh                  # Setup initial
│   ├── seed-data.sh              # Données de test
│   └── backup.sh                 # Sauvegarde DB
│
├── Makefile                       # Commandes automatisées
├── .gitignore
├── .env.example
├── LICENSE
└── README.md                      # Ce fichier
```

## 🛠️ Technologies utilisées

### Backend

| Technologie | Version | Usage |
|------------|---------|-------|
| **Spring Boot** | 3.x | Framework principal |
| **Spring Security** | 6.x | Authentification & autorisation |
| **Spring Data JPA** | 3.x | ORM et accès aux données |
| **PostgreSQL** | 15+ | Base de données principale |
| **JWT (jjwt)** | 0.12.x | Génération/validation tokens |
| **MapStruct** | 1.5.x | Mapping entités ↔ DTOs |
| **Lombok** | 1.18.x | Réduction boilerplate code |
| **SpringDoc OpenAPI** | 2.x | Documentation API Swagger |
| **Bean Validation** | 3.x | Validation des inputs |
| **Flyway/Liquibase** | - | Migrations de base de données |
| **Testcontainers** | 1.19.x | Tests d'intégration |
| **JUnit 5** | 5.x | Tests unitaires |
| **Mockito** | 5.x | Mocking pour tests |

### Frontend Web Angular
| Technologie | Version | Usage |
|------------|---------|-------|
| **Angular** | 17.x | Framework complet |
| **TypeScript** | 5.x | Langage principal |
| **Angular Router** | 17.x | Routing |
| **RxJS** | 7.x | Programmation réactive |
| **Angular Material** | 17.x | Composants UI |
| **HttpClient** | 17.x | Client HTTP |
| **ngx-markdown** | - | Rendu Markdown |
| **Jasmine/Karma** | - | Tests unitaires |
| **Cypress** | 13.x | Tests E2E |

### Application Mobile Flutter
| Technologie | Version | Usage |
|------------|---------|-------|
| **Flutter** | 3.x | Framework mobile |
| **Dart** | 3.x | Langage |
| **Riverpod/BLoC** | - | State management |
| **Dio** | 5.x | Client HTTP |
| **Sqflite** | 2.x | Base locale SQLite |
| **Hive** | 2.x | Cache key-value |
| **flutter_markdown** | - | Rendu Markdown |
| **connectivity_plus** | - | Détection connectivité |
| **flutter_test** | - | Tests |
| **mockito** | 5.x | Mocking |

### DevOps & Infrastructure

| Technologie | Version | Usage |
|------------|---------|-------|
| **Docker** | 20.x+ | Conteneurisation |
| **Docker Compose** | 2.x+ | Orchestration multi-conteneurs |
| **Nginx** | 1.25.x | Reverse proxy & serveur static |
| **GitHub Actions** | - | CI/CD |
| **SonarQube** | - | Qualité de code (optionnel) |

## ⚙️ Configuration

### Variables d'environnement

#### Backend (.env ou application.yml)

```yaml
# Base de données
DATABASE_URL=jdbc:postgresql://localhost:5432/notes_db
DATABASE_USERNAME=notes_user
DATABASE_PASSWORD=secure_password

# JWT Configuration
JWT_SECRET=votre_secret_jwt_tres_securise_minimum_256_bits
JWT_ACCESS_TOKEN_EXPIRATION=3600000    # 1 heure en ms
JWT_REFRESH_TOKEN_EXPIRATION=2592000000 # 30 jours en ms

# Application
SERVER_PORT=8080
API_PREFIX=/api/v1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_APP=DEBUG
LOGGING_PATTERN=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n

# Flyway (migrations)
SPRING_FLYWAY_ENABLED=true
SPRING_FLYWAY_BASELINE_ON_MIGRATE=true

# Swagger/OpenAPI
SPRINGDOC_SWAGGER_UI_ENABLED=true
```

#### Frontend (.env)

```bash
# API Backend
NG_APP_API_BASE_URL=http://localhost:8080/api/v1
NG_APP_API_TIMEOUT=30000

# Authentification
NG_APP_TOKEN_STORAGE_KEY=notes_auth_token
NG_APP_REFRESH_TOKEN_KEY=notes_refresh_token

# Application
NG_APP_NAME=Notes Collaboratives
NG_APP_VERSION=1.0.0
NG_APP_ENVIRONMENT=development

# Features flags (optionnel)
NG_APP_ENABLE_DARK_MODE=true
NG_APP_ENABLE_ANALYTICS=false
```

#### Mobile

**Flutter** (`lib/config/app_config.dart`)
```dart
class AppConfig {
  static const String apiBaseUrl = 'http://10.0.2.2:8080/api/v1'; // Android emulator
  static const String apiTimeout = '30000';
  static const bool enableOfflineMode = true;
  static const String dbName = 'notes_local.db';
}
```


### Configuration Docker

#### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: notes-postgres
    environment:
      POSTGRES_DB: notes_db
      POSTGRES_USER: notes_user
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./docker/init-scripts:/docker-entrypoint-initdb.d
    networks:
      - notes-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U notes_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend-spring
      dockerfile: Dockerfile
    container_name: notes-backend
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/notes_db
      DATABASE_USERNAME: notes_user
      DATABASE_PASSWORD: secure_password
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - notes-network
    volumes:
      - ./logs:/app/logs

  frontend:
    build:
      context: ./web-frontend
      dockerfile: Dockerfile
    container_name: notes-frontend
    environment:
      NG_APP_API_BASE_URL: http://localhost:8080/api/v1
    ports:
      - "4200:80"
    depends_on:
      - backend
    networks:
      - notes-network

networks:
  notes-network:
    driver: bridge

volumes:
  postgres_data:
```

## 📚 Documentation API

### Swagger UI

Une fois le backend démarré, accédez à la documentation interactive :

```
http://localhost:8080/swagger-ui.html
```

### Endpoints principaux

#### Authentification

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

```http
POST /api/v1/auth/refresh
Authorization: Bearer {refreshToken}

Response:
{
  "accessToken": "eyJhbGc...",
  "expiresIn": 3600
}
```

#### Notes

```http
GET /api/v1/notes?query=&tag=&visibility=&page=0&size=20
Authorization: Bearer {accessToken}

Response:
{
  "content": [
    {
      "id": "uuid",
      "title": "Ma note",
      "contentMd": "# Contenu Markdown",
      "visibility": "PRIVATE",
      "tags": ["work", "important"],
      "createdAt": "2025-01-01T10:00:00Z",
      "updatedAt": "2025-01-02T15:30:00Z"
    }
  ],
  "totalElements": 50,
  "totalPages": 3,
  "size": 20,
  "number": 0
}
```

```http
POST /api/v1/notes
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Nouvelle note",
  "contentMd": "# Mon contenu en Markdown\n\nDu texte...",
  "visibility": "PRIVATE",
  "tags": ["personnel", "idées"]
}
```

```http
PUT /api/v1/notes/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Note mise à jour",
  "contentMd": "# Nouveau contenu",
  "visibility": "SHARED",
  "tags": ["work"]
}
```

```http
DELETE /api/v1/notes/{id}
Authorization: Bearer {accessToken}
```

#### Partage

```http
POST /api/v1/notes/{id}/share/user
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "email": "colleague@example.com",
  "permission": "READ"
}

Response:
{
  "id": "share-uuid",
  "noteId": "note-uuid",
  "sharedWithEmail": "colleague@example.com",
  "permission": "READ",
  "createdAt": "2025-01-01T10:00:00Z"
}
```

```http
POST /api/v1/notes/{id}/share/public
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "expiresAt": "2025-12-31T23:59:59Z"  // optionnel
}

Response:
{
  "id": "link-uuid",
  "urlToken": "abc123def456",
  "publicUrl": "http://localhost:3000/p/abc123def456",
  "expiresAt": "2025-12-31T23:59:59Z"
}
```

```http
GET /api/v1/p/{urlToken}
# Pas d'authentification requise

Response:
{
  "title": "Note publique",
  "contentMd": "# Contenu visible publiquement",
  "createdAt": "2025-01-01T10:00:00Z"
}
```

```http
DELETE /api/v1/shares/{shareId}
Authorization: Bearer {accessToken}
```

```http
DELETE /api/v1/public-links/{id}
Authorization: Bearer {accessToken}
```

### Codes de statut HTTP

| Code | Signification |
|------|--------------|
| 200 | Succès |
| 201 | Ressource créée |
| 204 | Succès sans contenu |
| 400 | Requête invalide (validation échouée) |
| 401 | Non authentifié |
| 403 | Non autorisé (pas le propriétaire) |
| 404 | Ressource non trouvée |
| 409 | Conflit (ex: email déjà utilisé) |
| 500 | Erreur serveur |

### Format d'erreur standardisé

```json
{
  "timestamp": "2025-01-01T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "code": "VALIDATION_ERROR",
  "message": "Validation des données échouée",
  "details": {
    "title": "Le titre doit contenir au moins 3 caractères",
    "contentMd": "Le contenu ne peut pas dépasser 50000 caractères"
  },
  "path": "/api/v1/notes"
}
```

## 🧪 Tests

### Backend (Spring Boot)

```bash
cd backend-spring

# Tous les tests
mvn clean test

# Tests unitaires uniquement
mvn test -Dtest=*Test

# Tests d'intégration uniquement
mvn test -Dtest=*IT

# Avec couverture de code
mvn clean test jacoco:report
# Rapport dans: target/site/jacoco/index.html

# Tests spécifiques
mvn test -Dtest=NoteServiceTest
mvn test -Dtest=NoteControllerTest

# Tests avec Testcontainers (nécessite Docker)
mvn verify
```

**Structure des tests :**
- `*Test.java` : Tests unitaires (mocks)
- `*IT.java` : Tests d'intégration (Testcontainers)
- `*ControllerTest.java` : Tests API avec MockMvc

### Frontend Web

```bash
cd web-frontend

# Tests unitaires
npm run test
# ou
npm test -- --coverage

# Tests en mode watch
npm run test:watch

# Tests d'un fichier spécifique
npm test -- LoginComponent.test.tsx

# Tests E2E
npm run test:e2e

# Tests E2E en mode headless
npm run test:e2e:ci

# Linting
npm run lint
npm run lint:fix

# Type checking (TypeScript)
npm run type-check
```

**Couverture minimale attendue :**
- Couverture globale : > 70%
- Composants critiques (Auth, Notes) : > 80%

### Application Mobile

#### Flutter

```bash
cd mobile-app

# Tests unitaires
flutter test

# Tests avec couverture
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
# Rapport dans: coverage/html/index.html

# Tests d'intégration
flutter test integration_test/

# Tests widgets
flutter test test/widgets/

# Analyse statique
flutter analyze
```

#### React Native

```bash
cd mobile-app

# Tests unitaires
npm run test

# Tests avec couverture
npm run test -- --coverage

# Tests en mode watch
npm run test:watch

# Tests E2E (Detox)
npm run test:e2e:ios
npm run test:e2e:android
```

### Tests de charge (optionnel)

```bash
# JMeter (backend)
jmeter -n -t tests/load/notes-api-load-test.jmx -l results.jtl

# Artillery (API REST)
artillery run tests/load/api-scenario.yml
```

## 🚢 Déploiement

### Environnements

| Environnement | URL | Description |
|--------------|-----|-------------|
| Développement | http://localhost:3000 | Local avec hot-reload |
| Staging | https://staging.notes-app.com | Pré-production |
| Production | https://notes-app.com | Production |

### Production avec Docker

```bash
# Build des images
docker compose -f docker-compose.prod.yml build

# Démarrage en production
docker compose -f docker-compose.prod.yml up -d

# Vérification des logs
docker compose logs -f backend
docker compose logs -f frontend

# Scaling (optionnel)
docker compose -f docker-compose.prod.yml up -d --scale backend=3
```

### Déploiement sur Cloud

#### Backend (Spring Boot)

**Heroku**
```bash
heroku create notes-api-backend
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret_here
git subtree push --prefix backend-spring heroku main
```

**AWS Elastic Beanstalk**
```bash
eb init -p docker notes-backend
eb create notes-backend-env
eb deploy
```

**Google Cloud Run**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/notes-backend
gcloud run deploy notes-backend \
  --image gcr.io/PROJECT_ID/notes-backend \
  --platform managed \
  --region europe-west1
```

#### Frontend Web

**Vercel**
```bash
cd web-frontend
vercel --prod
```

**Netlify**
```bash
cd web-frontend
npm run build
netlify deploy --prod --dir=dist
```

**AWS S3 + CloudFront**
```bash
cd web-frontend
npm run build
aws s3 sync dist/ s3://notes-frontend-bucket
aws cloudfront create-invalidation --distribution-id XXX --paths "/*"
```

#### Application Mobile

**Android (Google Play)**
```bash
cd mobile-app
flutter build appbundle --release
# OU
cd android && ./gradlew bundleRelease
```

**iOS (App Store)**
```bash
cd mobile-app
flutter build ios --release
# Puis ouvrir Xcode et archiver pour upload sur App Store Connect
open ios/Runner.xcworkspace
```

### Monitoring & Logs

**Backend**
```bash
# Logs structurés (JSON)
tail -f logs/application.log

# Métriques Spring Boot Actuator
curl http://localhost:8080/actuator/health
curl http://localhost:8080/actuator/metrics
```

**Base de données**
```bash
# Backup PostgreSQL
docker exec notes-postgres pg_dump -U notes_user notes_db > backup.sql

# Restore
docker exec -i notes-postgres psql -U notes_user notes_db < backup.sql
```

## 🔒 Sécurité

### Authentification & Autorisation

- ✅ **JWT** : Tokens signés avec algorithme HS256
- ✅ **Refresh tokens** : Rotation automatique
- ✅ **Expiration** : Access token 1h, refresh token 30j
- ✅ **Stockage sécurisé** : HttpOnly cookies (optionnel) ou localStorage avec XSS protection
- ✅ **HTTPS obligatoire** en production
- ✅ **Rate limiting** : Protection contre brute force

### Validation & Sanitization

- ✅ **Bean Validation** : Contraintes sur tous les DTOs
- ✅ **Sanitization** : Protection contre XSS dans le contenu Markdown
- ✅ **Paramètres SQL** : PreparedStatements automatiques via JPA
- ✅ **CORS** : Configuration stricte des origines autorisées

### Bonnes pratiques

```java
// Validation des inputs
@NotBlank(message = "Le titre est obligatoire")
@Size(min = 3, max = 255, message = "Le titre doit contenir entre 3 et 255 caractères")
private String title;

@NotBlank(message = "Le contenu est obligatoire")
@Size(max = 50000, message = "Le contenu ne peut pas dépasser 50000 caractères")
private String contentMd;

// Vérification de propriété
if (!note.getOwnerId().equals(currentUserId)) {
    throw new ForbiddenException("Vous n'êtes pas autorisé à modifier cette note");
}

// Logs sans données sensibles
log.info("User login attempt for email: {}", email);
// JAMAIS : log.info("Login with password: {}", password);
```

### Checklist sécurité

- [ ] Secrets jamais commités dans Git (utiliser .env)
- [ ] Variables d'environnement pour configuration sensible
- [ ] HTTPS en production avec certificats valides
- [ ] Headers de sécurité configurés (HSTS, CSP, X-Frame-Options)
- [ ] Dépendances à jour (Dependabot activé)
- [ ] Logs sans données personnelles sensibles
- [ ] Sauvegarde automatique de la base de données
- [ ] Plan de reprise après sinistre documenté

## 🤝 Contribution

### Workflow Git

```bash
# 1. Créer une branche feature
git checkout -b feature/add-note-categories

# 2. Faire vos modifications et commits
git add .
git commit -m "feat: ajout du système de catégories pour les notes"

# 3. Pousser et créer une Pull Request
git push origin feature/add-note-categories
```

### Convention de commits

Utiliser la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: mise à jour documentation
style: formatage du code
refactor: refactorisation sans changement fonctionnel
test: ajout ou modification de tests
chore: tâches de maintenance
```

**Exemples :**
```
feat(backend): ajout de l'endpoint de recherche full-text
fix(mobile): correction du bug de synchronisation offline
docs(readme): mise à jour des instructions de déploiement
```

### Standards de code

**Backend (Java)**
- Respecter les conventions Java (Google Style Guide)
- Utiliser Lombok pour réduire le boilerplate
- Javadoc sur les méthodes publiques
- Tests unitaires obligatoires pour les services

**Frontend (TypeScript)**
- ESLint + Prettier configurés
- Composants fonctionnels avec hooks
- Props typées avec interfaces TypeScript
- Tests pour les composants critiques

**Mobile (Flutter/React Native)**
- Suivre les guidelines officielles
- Architecture feature-first
- Gestion d'état centralisée
- Tests des use cases métier

### Code Review

Critères de validation d'une PR :
- ✅ Tests passent (CI verte)
- ✅ Couverture de code maintenue ou améliorée
- ✅ Pas de régression fonctionnelle
- ✅ Code lisible et bien documenté
- ✅ Respect des standards de code
- ✅ Pas de secrets ou données sensibles

## 📖 Support

### Documentation complète

- **Backend** : `/backend-spring/README.md`
- **Frontend Web** : `/web-frontend/README.md`
- **Mobile** : `/mobile-app/README.md`
- **API** : http://localhost:8080/swagger-ui.html

### Ressources

- [Documentation Spring Boot](https://spring.io/projects/spring-boot)
- [Documentation React](https://react.dev) | [Angular](https://angular.io)
- [Documentation Flutter](https://flutter.dev) | [React Native](https://reactnative.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

### Problèmes fréquents

**Backend ne démarre pas**
```bash
# Vérifier que PostgreSQL est démarré
docker compose ps

# Vérifier les logs
docker compose logs backend

# Recréer la base
docker compose down -v
docker compose up -d postgres
```

**Erreur CORS sur le frontend**
```bash
# Vérifier la configuration CORS dans application.yml
# S'assurer que l'origine du frontend est autorisée
```

**App mobile ne se connecte pas**
```bash
# Android Emulator : utiliser 10.0.2.2 au lieu de localhost
# iOS Simulator : utiliser localhost
# Device physique : utiliser l'IP locale (ex: 192.168.1.100)
```

**Synchronisation offline ne fonctionne pas**
```bash
# Vérifier les permissions de stockage
# Vérifier la détection de connectivité
# Consulter les logs de la couche de synchronisation
```

### Contact & Support

- 📧 Email : support@notes-app.com
- 💬 Discord : https://discord.gg/notes-app
- 🐛 Issues : https://github.com/votre-username/notes-suite/issues
- 📝 Discussions : https://github.com/votre-username/notes-suite/discussions

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🎯 Roadmap

### Version 1.0 (MVP) ✅
- [x] Authentification JWT
- [x] CRUD notes avec Markdown
- [x] Système de tags
- [x] Partage de notes (utilisateurs + liens publics)
- [x] Recherche et filtrage
- [x] Frontend web responsive
- [x] App mobile offline-first
- [x] Dockerisation complète

### Version 1.1 (Prochaine)
- [ ] Édition collaborative en temps réel (WebSockets)
- [ ] Notifications push (mobile)
- [ ] Export PDF des notes
- [ ] Mode sombre complet
- [ ] Support multi-langues (i18n)
- [ ] Statistiques d'utilisation
- [ ] API GraphQL (option)

### Version 2.0 (Future)
- [ ] Pièces jointes (images, fichiers)
- [ ] Notes audio/vidéo
- [ ] Templates de notes
- [ ] Intégrations (Slack, Teams, etc.)
- [ ] AI assistant pour suggestions
- [ ] Version desktop (Electron)

---

## 🙏 Remerciements

Exercice technique conçu par l'équipe CTO (estimation 4 jours).

**Technologies open-source utilisées :**
- Spring Framework Team
- React / Angular Teams
- Flutter / React Native Communities
- PostgreSQL Global Development Group
- Docker Inc.
- Et toutes les bibliothèques open-source !

---

<div align="center">

**Construit avec ❤️ par votre équipe de développement**

[⬆ Retour en haut](#-notes-collaboratives---application-full-stack)

</div>

# note-suite
