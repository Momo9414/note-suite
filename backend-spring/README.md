# 🚀 Backend Spring Boot - Notes Collaboratives

Backend RESTful API pour l'application de notes collaboratives, développé avec Spring Boot 3.

## 📋 Table des matières

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Tests](#tests)
- [API Documentation](#api-documentation)
- [Structure du projet](#structure-du-projet)

## 🏗️ Architecture

Le backend suit une architecture **hexagonale/clean architecture** :

```
┌─────────────────────────────────────────┐
│          API Layer (Controllers)         │
│         HTTP Requests/Responses          │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│        Service Layer (Business Logic)    │
│         DTOs & Domain Logic              │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│     Repository Layer (Data Access)       │
│         Spring Data JPA                  │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│         PostgreSQL Database              │
└─────────────────────────────────────────┘
```

## 🛠️ Technologies

| Technologie | Version | Description |
|------------|---------|-------------|
| Java | 17+ | Langage |
| Spring Boot | 3.2.1 | Framework |
| Spring Security | 6.x | Sécurité |
| Spring Data JPA | 3.x | Accès aux données |
| PostgreSQL | 15+ | Base de données |
| JWT (jjwt) | 0.12.3 | Authentification |
| MapStruct | 1.5.5 | Mapping DTOs |
| Lombok | 1.18.30 | Réduction boilerplate |
| SpringDoc | 2.3.0 | Documentation API |
| Flyway | - | Migrations DB |
| JUnit 5 | 5.x | Tests unitaires |
| Testcontainers | 1.19.3 | Tests d'intégration |

## 📦 Prérequis

- Java JDK 17 ou supérieur
- Maven 3.8+
- PostgreSQL 15+ (ou Docker)
- Docker (optionnel, pour containerisation)

## 🚀 Installation

### Option 1: Avec Docker (Recommandé)

```bash
# Depuis la racine du projet
docker compose up -d postgres
cd backend-spring
mvn clean install
mvn spring-boot:run
```

### Option 2: PostgreSQL local

```bash
# 1. Créer la base de données
createdb notes_db
createuser notes_user

# 2. Configurer application.yml
# Modifier src/main/resources/application.yml

# 3. Lancer l'application
mvn spring-boot:run
```

## ⚙️ Configuration

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/notes_db
    username: notes_user
    password: secure_password
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        format_sql: true
  
  flyway:
    enabled: true
    baseline-on-migrate: true

jwt:
  secret: ${JWT_SECRET}
  access-token-expiration: 3600000  # 1 hour
  refresh-token-expiration: 2592000000  # 30 days

server:
  port: 8080

springdoc:
  swagger-ui:
    path: /swagger-ui.html
```

### Variables d'environnement

Créer un fichier `.env` :

```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/notes_db
DATABASE_USERNAME=notes_user
DATABASE_PASSWORD=secure_password
JWT_SECRET=your_super_secret_key_minimum_256_bits
```

## 🏃 Lancement

### Mode développement

```bash
# Avec Maven
mvn spring-boot:run

# Avec profil dev
mvn spring-boot:run -Dspring.profiles.active=dev

# Avec Java
java -jar target/notes-backend-1.0.0.jar
```

### Mode production

```bash
mvn clean package -DskipTests
java -jar target/notes-backend-1.0.0.jar --spring.profiles.active=prod
```

### Avec Docker

```bash
docker build -t notes-backend .
docker run -p 8080:8080 \
  -e DATABASE_URL=jdbc:postgresql://host.docker.internal:5432/notes_db \
  -e JWT_SECRET=your_secret \
  notes-backend
```

L'API sera accessible sur : **http://localhost:8080**

## 🧪 Tests

### Tests unitaires

```bash
# Tous les tests
mvn test

# Tests unitaires seulement
mvn test -Dtest=*Test

# Tests d'intégration
mvn test -Dtest=*IT

# Test spécifique
mvn test -Dtest=NoteServiceTest
```

### Couverture de code

```bash
mvn clean test jacoco:report
# Rapport : target/site/jacoco/index.html
```

### Tests avec Testcontainers

```bash
# Nécessite Docker
mvn verify
```

## 📚 API Documentation

### Swagger UI

Une fois l'application démarrée, accéder à :

```
http://localhost:8080/swagger-ui.html
```

### OpenAPI JSON

```
http://localhost:8080/v3/api-docs
```

### Actuator Endpoints

```
http://localhost:8080/actuator/health
http://localhost:8080/actuator/metrics
```

## 📁 Structure du projet

```
backend-spring/
├── src/
│   ├── main/
│   │   ├── java/com/notes/
│   │   │   ├── api/              # Contrôleurs REST
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── NoteController.java
│   │   │   │   └── ShareController.java
│   │   │   │
│   │   │   ├── domain/           # Entités JPA
│   │   │   │   ├── User.java
│   │   │   │   ├── Note.java
│   │   │   │   ├── Share.java
│   │   │   │   └── PublicLink.java
│   │   │   │
│   │   │   ├── service/          # Services métier
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── NoteService.java
│   │   │   │   └── ShareService.java
│   │   │   │
│   │   │   ├── repository/       # Repositories JPA
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── NoteRepository.java
│   │   │   │   └── ShareRepository.java
│   │   │   │
│   │   │   ├── security/         # Configuration sécurité
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   │
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── NoteRequest.java
│   │   │   │   │   └── ShareRequest.java
│   │   │   │   └── response/
│   │   │   │       ├── AuthResponse.java
│   │   │   │       ├── NoteResponse.java
│   │   │   │       └── ShareResponse.java
│   │   │   │
│   │   │   ├── mapper/           # Mappers (MapStruct)
│   │   │   │   ├── NoteMapper.java
│   │   │   │   ├── UserMapper.java
│   │   │   │   └── ShareMapper.java
│   │   │   │
│   │   │   ├── exception/        # Gestion d'erreurs
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── NotFoundException.java
│   │   │   │   ├── ForbiddenException.java
│   │   │   │   └── ValidationException.java
│   │   │   │
│   │   │   ├── config/           # Configuration
│   │   │   │   ├── ApplicationConfig.java
│   │   │   │   ├── OpenApiConfig.java
│   │   │   │   └── CorsConfig.java
│   │   │   │
│   │   │   └── NotesApplication.java  # Main
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/migration/
│   │           ├── V1__create_users_table.sql
│   │           ├── V2__create_notes_table.sql
│   │           ├── V3__create_shares_table.sql
│   │           └── V4__create_public_links_table.sql
│   │
│   └── test/
│       └── java/com/notes/
│           ├── api/
│           ├── service/
│           └── repository/
│
├── pom.xml
├── Dockerfile
└── README.md
```

## 🔒 Sécurité

### Authentification JWT

```java
// Login
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password"
}

// Response
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG...",
  "tokenType": "Bearer"
}

// Utilisation
Authorization: Bearer {accessToken}
```

### Validation des données

```java
@NotBlank(message = "Le titre est obligatoire")
@Size(min = 3, max = 255)
private String title;

@NotBlank
@Size(max = 50000)
private String contentMd;
```

## 🚢 Déploiement

### Docker

```bash
docker build -t notes-backend:1.0.0 .
docker push registry.example.com/notes-backend:1.0.0
```

### Heroku

```bash
heroku create notes-api
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### AWS

```bash
eb init -p docker notes-backend
eb create notes-backend-env
eb deploy
```

## 📝 Licence

MIT

