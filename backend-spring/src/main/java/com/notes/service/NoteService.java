package com.notes.service;

import com.notes.domain.Note;
import com.notes.domain.Note.Visibility;
import com.notes.dto.NoteRequest;
import com.notes.dto.NoteResponse;
import com.notes.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private static final SecureRandom secureRandom = new SecureRandom();
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder();

    /**
     * Récupère les notes accessibles par l'utilisateur.
     * Inclut : les notes du propriétaire + les notes PUBLIC
     * Note : Les notes SHARED ne sont accessibles que via le lien partagé
     */
    public Page<NoteResponse> getUserNotes(String userId, String query, Pageable pageable) {
        Page<Note> notes;
        if (query != null && !query.isBlank()) {
            notes = noteRepository.searchAccessibleNotes(userId, query, pageable);
        } else {
            notes = noteRepository.findAccessibleNotes(userId, pageable);
        }
        return notes.map(this::toResponse);
    }

    /**
     * Récupère une note via son token partagé (accès public)
     */
    public NoteResponse getNoteByShareToken(String shareToken) {
        Note note = noteRepository.findByShareToken(shareToken)
                .orElseThrow(() -> new RuntimeException("Note not found or link invalid"));
        
        if (note.getVisibility() != Visibility.SHARED) {
            throw new RuntimeException("This note is not shared");
        }
        
        return toResponse(note);
    }

    /**
     * Récupère une note par son ID si l'utilisateur y a accès.
     * Vérifie la visibilité : PRIVATE (propriétaire uniquement), PUBLIC/SHARED (tous les utilisateurs authentifiés)
     */
    public NoteResponse getNoteById(String noteId, String userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        // Vérifier l'accès en fonction de la visibilité
        if (!hasAccess(note, userId)) {
            throw new RuntimeException("Forbidden");
        }
        
        return toResponse(note);
    }
    
    /**
     * Vérifie si un utilisateur a accès à une note en fonction de sa visibilité
     */
    private boolean hasAccess(Note note, String userId) {
        Visibility visibility = note.getVisibility();
        
        // PRIVATE : seul le propriétaire peut voir
        if (visibility == Visibility.PRIVATE) {
            return note.getOwnerId().equals(userId);
        }
        
        // PUBLIC : tous les utilisateurs authentifiés peuvent voir
        if (visibility == Visibility.PUBLIC) {
            return true;
        }
        
        // SHARED : seul le propriétaire peut voir (les autres via le lien partagé uniquement)
        if (visibility == Visibility.SHARED) {
            return note.getOwnerId().equals(userId);
        }
        
        return false;
    }

    /**
     * Génère un token unique pour le partage de notes
     */
    private String generateShareToken() {
        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes).replace("=", "");
    }

    @Transactional
    public NoteResponse createNote(NoteRequest request, String userId) {
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContentMd(request.getContentMd());
        note.setVisibility(request.getVisibility());
        note.setTags(request.getTags());
        note.setOwnerId(userId);
        
        // Générer un token de partage si la note est SHARED
        if (request.getVisibility() == Visibility.SHARED) {
            note.setShareToken(generateShareToken());
        }
        
        note = noteRepository.save(note);
        return toResponse(note);
    }

    @Transactional
    public NoteResponse updateNote(String noteId, NoteRequest request, String userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        if (!note.getOwnerId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }
        
        Visibility newVisibility = request.getVisibility();
        
        note.setTitle(request.getTitle());
        note.setContentMd(request.getContentMd());
        note.setVisibility(newVisibility);
        note.setTags(request.getTags());
        
        // Gérer le token de partage selon la visibilité
        if (newVisibility == Visibility.SHARED) {
            // Si la note devient SHARED, générer un token s'il n'en existe pas
            if (note.getShareToken() == null) {
                note.setShareToken(generateShareToken());
            }
        } else {
            // Si la note n'est plus SHARED, supprimer le token
            note.setShareToken(null);
        }
        
        note = noteRepository.save(note);
        return toResponse(note);
    }

    /**
     * Génère ou régénère le token de partage pour une note SHARED
     */
    @Transactional
    public NoteResponse generateShareLink(String noteId, String userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        if (!note.getOwnerId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }
        
        if (note.getVisibility() != Visibility.SHARED) {
            throw new RuntimeException("Only SHARED notes can have share links");
        }
        
        // Régénérer le token (invalide l'ancien lien)
        note.setShareToken(generateShareToken());
        note = noteRepository.save(note);
        
        return toResponse(note);
    }

    @Transactional
    public void deleteNote(String noteId, String userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        if (!note.getOwnerId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }
        
        noteRepository.delete(note);
    }

    private NoteResponse toResponse(Note note) {
        NoteResponse response = new NoteResponse();
        response.setId(note.getId());
        response.setTitle(note.getTitle());
        response.setContentMd(note.getContentMd());
        response.setVisibility(note.getVisibility());
        response.setShareToken(note.getShareToken());
        response.setTags(note.getTags());
        response.setOwnerId(note.getOwnerId());
        response.setCreatedAt(note.getCreatedAt());
        response.setUpdatedAt(note.getUpdatedAt());
        return response;
    }
}

