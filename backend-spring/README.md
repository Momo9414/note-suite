# Backend Spring Boot – Notes Suite

API REST sécurisée pour la gestion de notes collaboratives. Fournit l’authentification JWT, le CRUD complet, la recherche et la génération de liens de partage.

## Stack
- Java 17, Spring Boot 3.2
- Spring Security, Spring Data JPA, Validation Jakarta
- PostgreSQL, Flyway
- MapStruct, Lombok
- Springdoc OpenAPI, Actuator

## Prérequis
- Java 17 SDK
- Maven 3.9+
- PostgreSQL 14+ (ou service via Docker Compose)
- Fichier `.env` à la racine du monorepo (voir ci-dessous)

## Configuration
Variables chargées depuis `.env` puis mappées vers `application.yml` :

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/notes_db
DATABASE_USERNAME=notes_user
DATABASE_PASSWORD=secure_password_123
SERVER_PORT=8080
API_PREFIX=/api/v1
JWT_SECRET=change_me_with_256bit_secret
CORS_ALLOWED_ORIGINS=http://localhost:4200,http://localhost:8081
```

Les paramètres complémentaires (timeouts, niveaux de logs, Flyway, Actuator, Swagger) sont centralisés dans `src/main/resources/application.yml`.

## Lancer l’API
```bash
cd backend-spring
# utilisation des variables de ../.env
./start.sh
```
ou
```bash
mvn spring-boot:run
```

## Tests & qualité
```bash
mvn test              # tests unitaires/services
mvn verify            # build complet + vérifications
mvn -DskipTests package
```

## Migrations
Flyway applique automatiquement les scripts `src/main/resources/db/migration/V*.sql` au démarrage.  
Pour lancer une migration manuelle :
```bash
mvn -Dflyway.configFiles=src/main/resources/flyway.conf flyway:migrate
```

## Endpoints principaux (`/api/v1`)
- `POST /auth/register`, `POST /auth/login`
- `GET /notes?query=&page=&size=&sort=` (recherche titre/contenu)
- `GET /notes/{id}`, `POST /notes`, `PUT /notes/{id}`, `DELETE /notes/{id}`
- `GET /notes/shared/{token}` (accès public lecture seule)
- `POST /notes/{id}/share` (génération/régénération de token)
- `GET /actuator/health`, `GET /swagger-ui.html`

La documentation OpenAPI est exposée sur `/api/v1/swagger-ui.html`.

## Structure
```
backend-spring/
├── src/main/java/com/notes/
│   ├── controller/      # Auth & Notes REST controllers
│   ├── dto/             # AuthRequest, NoteRequest, NoteResponse, etc.
│   ├── domain/          # Entités JPA (User, Note, enums)
│   ├── repository/      # Interfaces Spring Data
│   ├── service/         # AuthService, NoteService
│   ├── security/        # JWT filters, providers
│   └── config/          # Beans (OpenAPI, CORS, etc.)
├── src/main/resources/
│   ├── application.yml
│   ├── db/migration/
│   └── logback-spring.xml
├── pom.xml
└── start.sh
```

## Fonctionnalités couvertes
- Authentification stateless (registre + login)
- Stockage Postgres avec JPA, tags via `@ElementCollection`
- Validation Bean pour les titres/contenus
- Recherche full-text simple (titre + contenu) et pagination
- Lien de partage pour les notes de visibilité `SHARED`
- Observabilité : logs structurés + Actuator + Swagger

## Limites connues
- Pas d’endpoint de refresh token actuellement
- Partage ciblé utilisateur (permission READ) non implémenté
- Pas encore de tests end-to-end via Testcontainers

Documenter toute évolution significative directement dans ce fichier pour conserver un historique clair des capacités backend.

