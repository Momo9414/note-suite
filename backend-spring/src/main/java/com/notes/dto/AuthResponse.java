package com.notes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Schema(description = "Réponse d'authentification contenant les tokens JWT")
public class AuthResponse {
    
    @Schema(description = "Token JWT d'accès à utiliser dans l'en-tête Authorization", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String accessToken;
    
    @Schema(description = "Token de rafraîchissement pour obtenir un nouveau token d'accès", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;
    
    @Schema(description = "Type de token", example = "Bearer", defaultValue = "Bearer")
    private String tokenType = "Bearer";
    
    @Schema(description = "Durée de validité du token en secondes", example = "3600")
    private long expiresIn;
}

