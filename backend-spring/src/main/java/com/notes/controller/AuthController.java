package com.notes.controller;

import com.notes.dto.AuthRequest;
import com.notes.dto.AuthResponse;
import com.notes.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentification", description = "Endpoints pour l'authentification et la gestion des utilisateurs")
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Créer un nouveau compte utilisateur",
            description = "Permet à un nouvel utilisateur de s'inscrire. L'email doit être unique et le mot de passe doit respecter les critères de sécurité."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Compte créé avec succès",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Données invalides (email mal formaté, mot de passe trop faible, etc.)",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Un compte existe déjà avec cet email",
                    content = @Content
            )
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @Operation(
            summary = "Se connecter à un compte existant",
            description = "Authentifie un utilisateur avec son email et mot de passe. Retourne un token JWT à utiliser pour les requêtes suivantes."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Connexion réussie",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Données manquantes ou invalides",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Email ou mot de passe incorrect",
                    content = @Content
            )
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}

