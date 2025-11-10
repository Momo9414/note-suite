package com.notes.dto;

import com.notes.domain.Note.Visibility;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Set;

@Data
@Schema(description = "Requête pour créer ou modifier une note")
public class NoteRequest {
    
    @Schema(description = "Titre de la note", example = "Ma première note", required = true, minLength = 3, maxLength = 255)
    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 3, max = 255, message = "Le titre doit contenir entre 3 et 255 caractères")
    private String title;
    
    @Schema(description = "Contenu de la note au format Markdown", example = "# Introduction\n\nCeci est une note en **Markdown**", maxLength = 50000)
    @Size(max = 50000, message = "Le contenu ne peut pas dépasser 50000 caractères")
    private String contentMd;
    
    @Schema(description = "Niveau de visibilité de la note", example = "PRIVATE", defaultValue = "PRIVATE", 
            allowableValues = {"PRIVATE", "SHARED", "PUBLIC"})
    private Visibility visibility = Visibility.PRIVATE;
    
    @Schema(description = "Tags pour catégoriser la note", example = "[\"travail\", \"important\"]")
    private Set<String> tags;
}

