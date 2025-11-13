package com.notes.controller;

import com.notes.dto.NoteRequest;
import com.notes.dto.NoteResponse;
import com.notes.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Notes", description = "Gestion des notes - CRUD complet avec recherche et filtrage")
@SecurityRequirement(name = "bearerAuth")
public class NoteController {

    private final NoteService noteService;

    @Operation(
            summary = "Lister toutes les notes de l'utilisateur",
            description = "Récupère la liste paginée des notes de l'utilisateur connecté. Supporte la recherche full-text dans le titre et le contenu."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Liste des notes récupérée avec succès",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Page.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            )
    })
    @GetMapping
    public ResponseEntity<Page<NoteResponse>> getNotes(
            Authentication authentication,
            @Parameter(description = "Terme de recherche (recherche dans titre et contenu)")
            @RequestParam(required = false) String query,
            @Parameter(description = "Numéro de page (commence à 0)")
            @RequestParam(required = false, defaultValue = "0") int page,
            @Parameter(description = "Nombre d'éléments par page")
            @RequestParam(required = false, defaultValue = "20") int size,
            @Parameter(description = "Tri (ex: createdAt,desc)")
            @RequestParam(required = false, defaultValue = "createdAt,desc") String sort) {
        
        log.info("GET /notes - User: {}, Query: {}, Page: {}, Size: {}", 
                authentication.getPrincipal(), query, page, size);
        
        String userId = (String) authentication.getPrincipal();
        
        Pageable pageable;
        try {
            if (sort != null && !sort.isBlank() && !sort.equals("string")) {
                String[] sortParams = sort.split(",");
                String field = sortParams[0];
                org.springframework.data.domain.Sort.Direction direction = 
                    sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc") 
                    ? org.springframework.data.domain.Sort.Direction.DESC 
                    : org.springframework.data.domain.Sort.Direction.ASC;
                pageable = org.springframework.data.domain.PageRequest.of(page, size, direction, field);
            } else {
                pageable = org.springframework.data.domain.PageRequest.of(page, size);
            }
        } catch (Exception e) {
            log.error("Error creating Pageable: ", e);
            pageable = org.springframework.data.domain.PageRequest.of(page, size);
        }
        
        return ResponseEntity.ok(noteService.getUserNotes(userId, query, pageable));
    }

    @Operation(
            summary = "Récupérer une note spécifique",
            description = "Récupère les détails complets d'une note par son identifiant. L'utilisateur doit être le propriétaire."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Note trouvée",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = NoteResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Accès refusé - L'utilisateur n'est pas le propriétaire",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Note introuvable",
                    content = @Content
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getNote(
            @Parameter(description = "Identifiant unique de la note (UUID)")
            @PathVariable String id,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(noteService.getNoteById(id, userId));
    }

    @Operation(
            summary = "Créer une nouvelle note",
            description = "Crée une nouvelle note pour l'utilisateur connecté. Le contenu peut être au format Markdown."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Note créée avec succès",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = NoteResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Données invalides (titre trop court, contenu trop long, etc.)",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            )
    })
    @PostMapping
    public ResponseEntity<NoteResponse> createNote(
            @Valid @RequestBody NoteRequest request,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(noteService.createNote(request, userId));
    }

    @Operation(
            summary = "Modifier une note existante",
            description = "Met à jour une note existante. Seul le propriétaire peut modifier sa note."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Note modifiée avec succès",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = NoteResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Données invalides",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Accès refusé - L'utilisateur n'est pas le propriétaire",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Note introuvable",
                    content = @Content
            )
    })
    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNote(
            @Parameter(description = "Identifiant unique de la note (UUID)")
            @PathVariable String id,
            @Valid @RequestBody NoteRequest request,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(noteService.updateNote(id, request, userId));
    }

    @Operation(
            summary = "Supprimer une note",
            description = "Supprime définitivement une note. Cette action est irréversible. Seul le propriétaire peut supprimer sa note."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Note supprimée avec succès",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Accès refusé - L'utilisateur n'est pas le propriétaire",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Note introuvable",
                    content = @Content
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(
            @Parameter(description = "Identifiant unique de la note (UUID)")
            @PathVariable String id,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        noteService.deleteNote(id, userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(
            summary = "Récupérer une note via son lien partagé",
            description = "Récupère une note SHARED via son token de partage. Accès public (pas besoin d'authentification)."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Note trouvée",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = NoteResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Note introuvable ou lien invalide",
                    content = @Content
            )
    })
    @GetMapping("/shared/{token}")
    @io.swagger.v3.oas.annotations.security.SecurityRequirement(name = "")
    public ResponseEntity<NoteResponse> getSharedNote(
            @Parameter(description = "Token de partage de la note")
            @PathVariable String token) {
        return ResponseEntity.ok(noteService.getNoteByShareToken(token));
    }

    @Operation(
            summary = "Générer ou régénérer le lien de partage",
            description = "Génère un nouveau token de partage pour une note SHARED. Invalide l'ancien lien."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lien de partage généré avec succès",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = NoteResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "La note n'est pas de type SHARED",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token JWT manquant ou invalide",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "403",
                    description = "Accès refusé - L'utilisateur n'est pas le propriétaire",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Note introuvable",
                    content = @Content
            )
    })
    @PostMapping("/{id}/share")
    public ResponseEntity<NoteResponse> generateShareLink(
            @Parameter(description = "Identifiant unique de la note (UUID)")
            @PathVariable String id,
            Authentication authentication) {
        String userId = (String) authentication.getPrincipal();
        return ResponseEntity.ok(noteService.generateShareLink(id, userId));
    }
}

