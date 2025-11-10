#!/bin/bash

# Script de configuration initiale du projet Notes Suite

set -e

echo "🚀 Configuration initiale du projet Notes Suite"
echo "================================================"

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérification des prérequis
echo -e "\n${YELLOW}1. Vérification des prérequis...${NC}"

check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 est installé"
        if [ "$1" = "java" ]; then
            java -version
        elif [ "$1" = "node" ]; then
            node -v
        elif [ "$1" = "flutter" ]; then
            flutter --version | head -1
        elif [ "$1" = "docker" ]; then
            docker --version
        else
            $1 --version | head -1
        fi
    else
        echo -e "${RED}✗${NC} $1 n'est pas installé"
        return 1
    fi
}

check_command java || exit 1
check_command mvn || exit 1
check_command node || exit 1
check_command npm || exit 1
check_command docker || exit 1
check_command flutter || echo -e "${YELLOW}⚠${NC} Flutter n'est pas installé (optionnel pour mobile)"

# Installation des dépendances Backend
echo -e "\n${YELLOW}2. Installation des dépendances Backend...${NC}"
if [ -d "backend-spring" ]; then
    cd backend-spring
    echo "Maven clean install..."
    mvn clean install -DskipTests
    echo -e "${GREEN}✓${NC} Backend dépendances installées"
    cd ..
else
    echo -e "${RED}✗${NC} Dossier backend-spring introuvable"
fi

# Installation des dépendances Frontend
echo -e "\n${YELLOW}3. Installation des dépendances Frontend Angular...${NC}"
if [ -d "web-frontend" ]; then
    cd web-frontend
    echo "NPM install..."
    npm install
    echo -e "${GREEN}✓${NC} Frontend dépendances installées"
    cd ..
else
    echo -e "${RED}✗${NC} Dossier web-frontend introuvable"
fi

# Installation des dépendances Mobile
echo -e "\n${YELLOW}4. Installation des dépendances Mobile Flutter...${NC}"
if [ -d "mobile-app" ]; then
    if command -v flutter &> /dev/null; then
        cd mobile-app
        echo "Flutter pub get..."
        flutter pub get
        echo -e "${GREEN}✓${NC} Mobile dépendances installées"
        cd ..
    else
        echo -e "${YELLOW}⚠${NC} Flutter n'est pas installé, étape ignorée"
    fi
else
    echo -e "${YELLOW}⚠${NC} Dossier mobile-app introuvable"
fi

# Configuration des fichiers d'environnement
echo -e "\n${YELLOW}5. Configuration des fichiers d'environnement...${NC}"
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓${NC} Fichier .env créé depuis .env.example"
        echo -e "${YELLOW}⚠${NC} N'oubliez pas de modifier les valeurs dans .env"
    else
        echo -e "${YELLOW}⚠${NC} Fichier .env.example introuvable"
    fi
else
    echo -e "${GREEN}✓${NC} Fichier .env existe déjà"
fi

# Démarrage de la base de données
echo -e "\n${YELLOW}6. Démarrage de la base de données PostgreSQL...${NC}"
if command -v docker &> /dev/null; then
    echo "Démarrage de PostgreSQL avec Docker..."
    docker compose -f docker-compose.dev.yml up -d
    echo -e "${GREEN}✓${NC} PostgreSQL démarré"
    echo "Attente de la disponibilité de PostgreSQL..."
    sleep 5
else
    echo -e "${YELLOW}⚠${NC} Docker non disponible, veuillez démarrer PostgreSQL manuellement"
fi

# Résumé
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✓ Configuration terminée avec succès !${NC}"
echo -e "${GREEN}================================================${NC}"

echo -e "\n📝 Prochaines étapes :"
echo -e "1. Modifier le fichier .env avec vos configurations"
echo -e "2. Démarrer le backend : ${YELLOW}cd backend-spring && mvn spring-boot:run${NC}"
echo -e "3. Démarrer le frontend : ${YELLOW}cd web-frontend && npm start${NC}"
echo -e "4. Accéder à l'application :"
echo -e "   - Backend API : http://localhost:8080"
echo -e "   - Swagger UI : http://localhost:8080/swagger-ui.html"
echo -e "   - Frontend Angular : http://localhost:4200"

echo -e "\n💡 Commandes utiles :"
echo -e "   - ${YELLOW}make start${NC}       : Démarrer tous les services avec Docker"
echo -e "   - ${YELLOW}make start-dev${NC}   : Démarrer uniquement PostgreSQL"
echo -e "   - ${YELLOW}make logs${NC}        : Voir les logs"
echo -e "   - ${YELLOW}make test${NC}        : Exécuter tous les tests"
echo -e "   - ${YELLOW}make help${NC}        : Voir toutes les commandes disponibles"

echo -e "\n${GREEN}Bon développement ! 🚀${NC}\n"

