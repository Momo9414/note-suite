#!/bin/bash

echo "═══════════════════════════════════════════════════════"
echo "  🚀 Démarrage de Notes Suite"
echo "═══════════════════════════════════════════════════════"
echo ""

# Charger les variables d'environnement
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Démarrer les services
echo "📦 Démarrage des services Docker..."
docker compose up -d

echo ""
echo "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier les services
echo ""
echo "🧪 Vérification des services..."

if curl -s http://localhost:8080/api/v1/health > /dev/null; then
    echo "✅ Backend API: http://localhost:8080/api/v1"
else
    echo "⏳ Backend en cours de démarrage..."
fi

if curl -s http://localhost:8081 > /dev/null; then
    echo "✅ Frontend Web: http://localhost:8081"
else
    echo "⏳ Frontend en cours de démarrage..."
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  ✅ Services démarrés !"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  Backend API: http://localhost:8080/api/v1"
echo "  Frontend: http://localhost:8081"
echo "  Swagger: http://localhost:8080/api/v1/swagger-ui.html"
echo ""
echo "  Login: user@example.com / password123"
echo ""
echo "  Logs: docker compose logs -f"
echo "  Stop: docker compose down"
echo ""

