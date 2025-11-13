import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { notesService } from '../services/notesService';
import { Note } from '../../../core/types';

interface NoteDetailScreenProps {
  route: {
    params: {
      noteId: string;
    };
  };
  navigation: any;
}

export default function NoteDetailScreen({ route, navigation }: NoteDetailScreenProps) {
  const { noteId } = route.params;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNote();
  }, [noteId]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const loadedNote = await notesService.getNoteById(noteId);
      setNote(loadedNote);
    } catch (error: any) {
      console.error('Error loading note:', error);
      Alert.alert('Erreur', 'Impossible de charger la note');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!note) return;

    try {
      if (note.visibility !== 'SHARED') {
        Alert.alert(
          'Information',
          'Cette note doit être en mode "Partagée" pour générer un lien de partage.'
        );
        return;
      }

      if (!note.shareToken) {
        const updatedNote = await notesService.generateShareLink(note.id);
        const shareUrl = notesService.getShareUrl(updatedNote.shareToken!);
        await Share.share({
          message: `Partage de note: ${note.title}\n${shareUrl}`,
          url: shareUrl,
        });
        setNote(updatedNote);
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

  const handleDelete = () => {
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
              Alert.alert('Succès', 'Note supprimée');
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Erreur', 'Impossible de supprimer la note');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading || !note) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{note.title}</Text>
          <View
            style={[
              styles.visibilityBadge,
              {
                backgroundColor:
                  note.visibility === 'PRIVATE'
                    ? '#ef444420'
                    : note.visibility === 'SHARED'
                    ? '#f59e0b20'
                    : '#10b98120',
              },
            ]}
          >
            <Text
              style={[
                styles.visibilityText,
                {
                  color:
                    note.visibility === 'PRIVATE'
                      ? '#ef4444'
                      : note.visibility === 'SHARED'
                      ? '#f59e0b'
                      : '#10b981',
                },
              ]}
            >
              {note.visibility}
            </Text>
          </View>
        </View>

        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Créée le:</Text>
            <Text style={styles.metadataValue}>{formatDate(note.createdAt)}</Text>
          </View>
          {note.updatedAt !== note.createdAt && (
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Modifiée le:</Text>
              <Text style={styles.metadataValue}>{formatDate(note.updatedAt)}</Text>
            </View>
          )}
        </View>

        {note.tags && note.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.sectionLabel}>Tags:</Text>
            <View style={styles.tagsContainer}>
              {note.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {note.visibility === 'SHARED' && (
          <View style={styles.shareSection}>
            <Text style={styles.sectionLabel}>Lien de partage</Text>
            {note.shareToken ? (
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>Partager le lien</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>Générer le lien</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.contentSection}>
          <Text style={styles.sectionLabel}>Contenu</Text>
          <View style={styles.markdownContainer}>
            <Markdown style={markdownStyles}>{note.contentMd || ''}</Markdown>
          </View>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('NoteForm', { noteId: note.id })}
        >
          <Text style={styles.editButtonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  card: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    lineHeight: 32,
  },
  visibilityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  visibilityText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metadata: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  metadataItem: {
    marginBottom: 8,
  },
  metadataLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  tagsSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  shareSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  shareButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  contentSection: {
    marginTop: 8,
  },
  markdownContainer: {
    marginTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingBottom: 32,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#10b981',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ef4444',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 24,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 8,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
    marginBottom: 12,
  },
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 12,
    color: '#374151',
  },
  strong: {
    fontWeight: '700',
    color: '#111827',
  },
  em: {
    fontStyle: 'italic',
    color: '#374151',
  },
  code_inline: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#4f46e5',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  code_block: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
  },
  fence: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
  },
  link: {
    color: '#6366f1',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    paddingLeft: 16,
    marginVertical: 12,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
});

