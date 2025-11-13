package com.notes.repository;

import com.notes.domain.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    
    Page<Note> findByOwnerId(String ownerId, Pageable pageable);
    
    @Query("SELECT n FROM Note n WHERE n.ownerId = :ownerId AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(n.contentMd) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Note> searchByOwnerIdAndQuery(@Param("ownerId") String ownerId, 
                                        @Param("query") String query, 
                                        Pageable pageable);
    
    // Récupérer les notes accessibles (propriétaire + PUBLIC, mais pas SHARED sauf si propriétaire)
    @Query("SELECT n FROM Note n WHERE n.ownerId = :userId OR n.visibility = 'PUBLIC'")
    Page<Note> findAccessibleNotes(@Param("userId") String userId, Pageable pageable);
    
    // Recherche dans les notes accessibles (propriétaire + PUBLIC, mais pas SHARED sauf si propriétaire)
    @Query("SELECT n FROM Note n WHERE (n.ownerId = :userId OR n.visibility = 'PUBLIC') AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(n.contentMd) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Note> searchAccessibleNotes(@Param("userId") String userId, 
                                      @Param("query") String query, 
                                      Pageable pageable);
    
    // Trouver une note par son token de partage
    java.util.Optional<Note> findByShareToken(String shareToken);
}

