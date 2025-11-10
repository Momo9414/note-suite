.PHONY: help build up down logs clean restart backend frontend db mobile test

help:
	@echo "═══════════════════════════════════════════════════════"
	@echo "  Notes Suite - Commandes Docker"
	@echo "═══════════════════════════════════════════════════════"
	@echo ""
	@echo "  make build      - Build toutes les images"
	@echo "  make up         - Démarrer tous les services"
	@echo "  make down       - Arrêter tous les services"
	@echo "  make restart    - Redémarrer tous les services"
	@echo "  make logs       - Voir les logs"
	@echo "  make clean      - Nettoyer images et volumes"
	@echo ""
	@echo "  make backend    - Démarrer uniquement le backend"
	@echo "  make frontend   - Démarrer uniquement le frontend"
	@echo "  make db         - Démarrer uniquement la DB"
	@echo "  make mobile     - Démarrer l'app mobile"
	@echo ""
	@echo "  make test       - Tester les services"
	@echo ""

build:
	@echo "🔨 Building images..."
	docker compose build

up:
	@echo "🚀 Starting services..."
	docker compose up -d
	@echo "✅ Services started!"
	@echo "   Backend: http://localhost:8080/api/v1"
	@echo "   Frontend: http://localhost:8081"
	@echo "   Swagger: http://localhost:8080/api/v1/swagger-ui.html"

down:
	@echo "🛑 Stopping services..."
	docker compose down

restart: down up

logs:
	docker compose logs -f

clean:
	@echo "🧹 Cleaning..."
	docker compose down -v
	docker system prune -f
	@echo "✅ Cleaned!"

backend:
	@echo "🚀 Starting backend..."
	docker compose up -d db api
	@echo "✅ Backend: http://localhost:8080/api/v1"

frontend:
	@echo "🚀 Starting frontend..."
	docker compose up -d web
	@echo "✅ Frontend: http://localhost:8081"

db:
	@echo "🚀 Starting database..."
	docker compose up -d db
	@echo "✅ Database: localhost:5432"

mobile:
	@echo "📱 Starting mobile app..."
	cd mobile-app && npm start

test:
	@echo "🧪 Testing services..."
	@curl -s http://localhost:8080/api/v1/health && echo "✅ Backend OK" || echo "❌ Backend KO"
	@curl -s -I http://localhost:8081 | head -1 && echo "✅ Frontend OK" || echo "❌ Frontend KO"
