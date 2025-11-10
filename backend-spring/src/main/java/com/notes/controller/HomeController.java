package com.notes.controller;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "Système", description = "Endpoints d'information sur l'API")
public class HomeController {

    @Operation(
            summary = "Informations sur l'API",
            description = "Retourne les informations générales sur l'API, sa version et les endpoints disponibles"
    )
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Notes API");
        response.put("version", "1.0.0");
        response.put("status", "running");
        response.put("timestamp", LocalDateTime.now());
        response.put("endpoints", Map.of(
            "auth", "/auth (POST /auth/register, POST /auth/login)",
            "notes", "/notes (GET, POST, PUT, DELETE)",
            "docs", "/swagger-ui.html",
            "health", "/actuator/health"
        ));
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Vérification de santé",
            description = "Endpoint simple pour vérifier que l'API est opérationnelle"
    )
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        return ResponseEntity.ok(response);
    }
}

