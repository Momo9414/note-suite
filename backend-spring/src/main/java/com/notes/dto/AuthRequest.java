package com.notes.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Requête d'authentification (inscription ou connexion)")
public class AuthRequest {
    
    @Schema(description = "Adresse email de l'utilisateur", example = "user@example.com", required = true)
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;
    
    @Schema(description = "Mot de passe (minimum 6 caractères)", example = "password123", required = true, minLength = 6)
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;
}

