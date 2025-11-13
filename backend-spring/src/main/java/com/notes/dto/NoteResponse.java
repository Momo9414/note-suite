package com.notes.dto;

import com.notes.domain.Note.Visibility;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@Schema(description = "Réponse contenant les détails complets d'une note")
public class NoteResponse {
    
    @Schema(description = "Identifiant unique de la note (UUID)", example = "123e4567-e89b-12d3-a456-426614174000")
    private String id;
    
    @Schema(description = "Titre de la note", example = "Ma première note")
    private String title;
    
    @Schema(description = "Contenu de la note au format Markdown", example = "# Introduction\n\nCeci est une note en **Markdown**")
    private String contentMd;
    
    @Schema(description = "Niveau de visibilité de la note", example = "PRIVATE")
    private Visibility visibility;
    
    @Schema(description = "Token de partage pour les notes SHARED (null pour PRIVATE et PUBLIC)", example = "abc123xyz")
    private String shareToken;
    
    @Schema(description = "Tags associés à la note", example = "[\"travail\", \"important\"]")
    private Set<String> tags;
    
    @Schema(description = "Identifiant du propriétaire de la note (UUID)", example = "123e4567-e89b-12d3-a456-426614174001")
    private String ownerId;
    
    @Schema(description = "Date et heure de création de la note", example = "2025-11-10T14:30:00")
    private LocalDateTime createdAt;
    
    @Schema(description = "Date et heure de la dernière modification", example = "2025-11-10T15:45:00")
    private LocalDateTime updatedAt;
}

