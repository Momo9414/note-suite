import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Share,
} from 'react-native';
import { notesService } from '../services/notesService';
import { Note, Visibility } from '../../../core/types';

interface NotesListScreenProps {
  navigation: any;
}

export default function NotesListScreen({ navigation }: NotesListScreenProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadNotes();
  }, [currentPage, searchQuery]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await notesService.getNotes(
        currentPage,
        20,
        searchQuery || undefined
      );
      if (currentPage === 0) {
        setNotes(response.content);
      } else {
        setNotes((prev) => [...prev, ...response.content]);
      }
      setTotalPages(response.totalPages);
    } catch (error: any) {
      console.error('Error loading notes:', error);
      Alert.alert('Erreur', 'Impossible de charger les notes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setCurrentPage(0);
    setNotes([]);
    loadNotes();
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(0);
    setNotes([]);
  };

  const handleShare = async (note: Note) => {
    try {
      if (note.visibility !== 'SHARED') {
        Alert.alert(
          'Information',
          'Cette note doit être en mode "Partagée" pour générer un lien de partage.'
        );
        return;
      }

      if (!note.shareToken) {
        // Générer le lien de partage
        const updatedNote = await notesService.generateShareLink(note.id);
        const shareUrl = notesService.getShareUrl(updatedNote.shareToken!);
        
        await Share.share({
          message: `Partage de note: ${note.title}\n${shareUrl}`,
          url: shareUrl,
        });
      } else {
        const shareUrl = notesService.getShareUrl(note.shareToken);
        await Share.share({
          message: `Partage de note: ${note.title}\n${shareUrl}`,
          url: shareUrl,
        });
      }
    } catch (error: any) {
      console.error('Error sharing note:', error);
      Alert.alert('Erreur', 'Impossible de partager la note');
    }
  };

  const handleDelete = (noteId: string) => {
    Alert.alert(
      'Supprimer la note',
      'Êtes-vous sûr de vouloir supprimer cette note ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await notesService.deleteNote(noteId);
              setNotes((prev) => prev.filter((n) => n.id !== noteId));
            } catch (error: any) {
              Alert.alert('Erreur', 'Impossible de supprimer la note');
            }
          },
        },
      ]
    );
  };

  const getVisibilityLabel = (visibility: Visibility): string => {
    switch (visibility) {
      case 'PRIVATE':
        return 'Privée';
      case 'SHARED':
        return 'Partagée';
      case 'PUBLIC':
        return 'Publique';
      default:
        return visibility;
    }
  };

  const getVisibilityColor = (visibility: Visibility): string => {
    switch (visibility) {
      case 'PRIVATE':
        return '#ef4444';
      case 'SHARED':
        return '#f59e0b';
      case 'PUBLIC':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View
          style={[
            styles.visibilityBadge,
            { backgroundColor: getVisibilityColor(item.visibility) + '20' },
          ]}
        >
          <Text
            style={[
              styles.visibilityText,
              { color: getVisibilityColor(item.visibility) },
            ]}
          >
            {getVisibilityLabel(item.visibility)}
          </Text>
        </View>
      </View>

      <Text style={styles.notePreview} numberOfLines={3}>
        {item.contentMd?.substring(0, 150) || 'Aucun contenu'}
      </Text>

      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
        {item.tags && item.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {item.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.noteActions}>
        {item.visibility === 'SHARED' && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(item)}
          >
            <Text style={styles.actionButtonText}>Partager</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            Supprimer
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const loadMore = () => {
    if (currentPage < totalPages - 1 && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && notes.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement des notes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Notes</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher dans les notes..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#9ca3af"
        />
      </View>

      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucune note</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NoteForm', {})}
          >
            <Text style={styles.addButtonText}>Créer une note</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && notes.length > 0 ? (
              <ActivityIndicator size="small" color="#6366f1" />
            ) : null
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteForm', {})}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ef4444',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  listContent: {
    padding: 16,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  visibilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  visibilityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notePreview: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagText: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  noteActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  deleteButtonText: {
    color: '#ffffff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 24,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '300',
  },
});
