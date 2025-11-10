#!/bin/bash

# Charger les variables d'environnement
export $(grep -v '^#' ../.env | xargs)

# Démarrer Spring Boot
mvn spring-boot:run
