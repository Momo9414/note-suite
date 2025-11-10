.PHONY: help setup start stop restart clean logs test build

# Variables
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_DEV = docker compose -f docker-compose.dev.yml

help: ## Afficher cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Configuration initiale du projet
	@echo "📦 Installation des dépendances..."
	@if [ -d "backend-spring" ]; then cd backend-spring && mvn clean install -DskipTests; fi
	@if [ -d "web-frontend" ]; then cd web-frontend && npm install; fi
	@if [ -d "mobile-app" ]; then cd mobile-app && flutter pub get; fi
	@echo "✅ Setup terminé !"

start: ## Démarrer tous les services
	@echo "🚀 Démarrage des services..."
	$(DOCKER_COMPOSE) up -d
	@echo "✅ Services démarrés !"
	@echo "   - Backend: http://localhost:8080"
	@echo "   - Frontend: http://localhost:4200"
	@echo "   - API Docs: http://localhost:8080/swagger-ui.html"

start-dev: ## Démarrer uniquement la base de données (pour dev local)
	@echo "🚀 Démarrage de PostgreSQL..."
	$(DOCKER_COMPOSE_DEV) up -d
	@echo "✅ PostgreSQL démarré sur localhost:5432"

stop: ## Arrêter tous les services
	@echo "🛑 Arrêt des services..."
	$(DOCKER_COMPOSE) down
	@echo "✅ Services arrêtés !"

stop-dev: ## Arrêter la base de données de dev
	$(DOCKER_COMPOSE_DEV) down

restart: stop start ## Redémarrer tous les services

clean: ## Nettoyer les conteneurs et volumes
	@echo "🧹 Nettoyage..."
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE_DEV) down -v
	@echo "✅ Nettoyage terminé !"

logs: ## Afficher les logs de tous les services
	$(DOCKER_COMPOSE) logs -f

logs-backend: ## Afficher les logs du backend
	$(DOCKER_COMPOSE) logs -f backend

logs-frontend: ## Afficher les logs du frontend
	$(DOCKER_COMPOSE) logs -f frontend

logs-postgres: ## Afficher les logs de PostgreSQL
	$(DOCKER_COMPOSE) logs -f postgres

test: ## Exécuter tous les tests
	@echo "🧪 Exécution des tests..."
	@if [ -d "backend-spring" ]; then cd backend-spring && mvn test; fi
	@if [ -d "web-frontend" ]; then cd web-frontend && npm test; fi
	@if [ -d "mobile-app" ]; then cd mobile-app && flutter test; fi
	@echo "✅ Tests terminés !"

test-backend: ## Exécuter les tests du backend
	cd backend-spring && mvn test

test-frontend: ## Exécuter les tests du frontend
	cd web-frontend && npm test

test-mobile: ## Exécuter les tests mobile
	cd mobile-app && flutter test

build: ## Construire tous les services
	@echo "🔨 Construction des services..."
	$(DOCKER_COMPOSE) build
	@echo "✅ Construction terminée !"

build-backend: ## Construire le backend
	cd backend-spring && mvn clean package -DskipTests

build-frontend: ## Construire le frontend
	cd web-frontend && npm run build

build-mobile: ## Construire l'app mobile
	cd mobile-app && flutter build apk

db-migrate: ## Exécuter les migrations de base de données
	@echo "🗄️  Exécution des migrations..."
	cd backend-spring && mvn flyway:migrate
	@echo "✅ Migrations terminées !"

db-backup: ## Sauvegarder la base de données
	@echo "💾 Sauvegarde de la base de données..."
	docker exec notes-postgres pg_dump -U notes_user notes_db > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Sauvegarde terminée !"

db-restore: ## Restaurer la base de données (usage: make db-restore FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then echo "❌ Erreur: Spécifiez le fichier avec FILE=backup.sql"; exit 1; fi
	@echo "📥 Restauration de la base de données..."
	docker exec -i notes-postgres psql -U notes_user notes_db < $(FILE)
	@echo "✅ Restauration terminée !"

dev-backend: ## Lancer le backend en mode dev
	cd backend-spring && mvn spring-boot:run

dev-frontend: ## Lancer le frontend en mode dev
	cd web-frontend && npm start

dev-mobile: ## Lancer l'app mobile en mode dev
	cd mobile-app && flutter run

format: ## Formater le code
	@echo "🎨 Formatage du code..."
	@if [ -d "web-frontend" ]; then cd web-frontend && npm run format; fi
	@if [ -d "mobile-app" ]; then cd mobile-app && dart format .; fi
	@echo "✅ Formatage terminé !"

lint: ## Linter le code
	@echo "🔍 Analyse du code..."
	@if [ -d "web-frontend" ]; then cd web-frontend && npm run lint; fi
	@if [ -d "mobile-app" ]; then cd mobile-app && flutter analyze; fi
	@echo "✅ Analyse terminée !"

ps: ## Afficher les services en cours d'exécution
	$(DOCKER_COMPOSE) ps

