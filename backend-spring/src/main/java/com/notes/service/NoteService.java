package com.notes.service;

import com.notes.domain.Note;
import com.notes.dto.NoteRequest;
import com.notes.dto.NoteResponse;
import com.notes.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;

    public Page<NoteResponse> getUserNotes(String userId, String query, Pageable pageable) {
        Page<Note> notes;
        if (query != null && !query.isBlank()) {
            notes = noteRepository.searchByOwnerIdAndQuery(userId, query, pageable);
        } else {
            notes = noteRepository.findByOwnerId(userId, pageable);
        }
        return notes.map(this::toResponse);
    }

    public NoteResponse getNoteById(String noteId, String userId) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        if (!note.getOwnerId().equals(userId)) {
            throw new RuntimeException("Forbidden");
        }
        
        return toResponse(note);
    }

    @Transactional
    public NoteResponse createNote(NoteRequest request, String userId) {
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContentMd(request.getContentMd());
        note.setVisibility(request.getVisibility());
        note.setTags(request.getTags());
        note.setOwnerId(userId);
        
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
        
        note.setTitle(request.getTitle());
        note.setContentMd(request.getContentMd());
        note.setVisibility(request.getVisibility());
        note.setTags(request.getTags());
        
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
        response.setTags(note.getTags());
        response.setOwnerId(note.getOwnerId());
        response.setCreatedAt(note.getCreatedAt());
        response.setUpdatedAt(note.getUpdatedAt());
        return response;
    }
}

