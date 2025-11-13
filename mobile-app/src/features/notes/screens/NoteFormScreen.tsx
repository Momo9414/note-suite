import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { notesService } from '../services/notesService';
import { Note, NoteRequest, Visibility } from '../../../core/types';

interface NoteFormScreenProps {
  route: {
    params?: {
      noteId?: string;
    };
  };
  navigation: any;
}

export default function NoteFormScreen({ route, navigation }: NoteFormScreenProps) {
  const { noteId } = route.params || {};
  const isEditMode = !!noteId;

  const [title, setTitle] = useState('');
  const [contentMd, setContentMd] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('PRIVATE');
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode && noteId) {
      loadNote();
    }
  }, [noteId]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const note = await notesService.getNoteById(noteId!);
      setTitle(note.title);
      setContentMd(note.contentMd || '');
      setVisibility(note.visibility);
      setTagsInput(note.tags?.join(', ') || '');
    } catch (error: any) {
      console.error('Error loading note:', error);
      Alert.alert('Erreur', 'Impossible de charger la note');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || title.length < 3) {
      Alert.alert('Erreur', 'Le titre doit contenir au moins 3 caractères');
      return;
    }

    try {
      setSaving(true);
      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const noteRequest: NoteRequest = {
        title: title.trim(),
        contentMd: contentMd.trim(),
        visibility,
        tags,
      };

      if (isEditMode) {
        await notesService.updateNote(noteId!, noteRequest);
        Alert.alert('Succès', 'Note modifiée avec succès');
      } else {
        await notesService.createNote(noteRequest);
        Alert.alert('Succès', 'Note créée avec succès');
      }

      navigation.goBack();
    } catch (error: any) {
      console.error('Error saving note:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder la note');
    } finally {
      setSaving(false);
    }
  };

  const getVisibilityLabel = (vis: Visibility): string => {
    switch (vis) {
      case 'PRIVATE':
        return 'Privée';
      case 'SHARED':
        return 'Partagée';
      case 'PUBLIC':
        return 'Publique';
      default:
        return vis;
    }
  };

  const getVisibilityDescription = (vis: Visibility): string => {
    switch (vis) {
      case 'PRIVATE':
        return 'Seulement vous pouvez voir cette note';
      case 'SHARED':
        return 'Accessible via un lien partagé unique';
      case 'PUBLIC':
        return 'Tous les utilisateurs authentifiés peuvent voir';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Titre *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Titre de la note"
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Contenu (Markdown)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={contentMd}
          onChangeText={setContentMd}
          placeholder="# Titre&#10;&#10;Contenu en **Markdown**..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Visibilité</Text>
        <View style={styles.visibilityContainer}>
          {(['PRIVATE', 'SHARED', 'PUBLIC'] as Visibility[]).map((vis) => (
            <TouchableOpacity
              key={vis}
              style={[
                styles.visibilityOption,
                visibility === vis && styles.visibilityOptionActive,
              ]}
              onPress={() => setVisibility(vis)}
            >
              <View style={styles.visibilityContent}>
                <View
                  style={[
                    styles.radioButton,
                    visibility === vis && styles.radioButtonActive,
                  ]}
                >
                  {visibility === vis && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <View style={styles.visibilityInfo}>
                  <Text
                    style={[
                      styles.visibilityName,
                      visibility === vis && styles.visibilityNameActive,
                    ]}
                  >
                    {getVisibilityLabel(vis)}
                  </Text>
                  <Text style={styles.visibilityDesc}>
                    {getVisibilityDescription(vis)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Tags (séparés par des virgules)</Text>
        <TextInput
          style={styles.input}
          value={tagsInput}
          onChangeText={setTagsInput}
          placeholder="travail, important, urgent"
          placeholderTextColor="#9ca3af"
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.saveButtonText}>
                {isEditMode ? 'Modifier' : 'Créer'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 150,
    paddingTop: 12,
  },
  visibilityContainer: {
    gap: 12,
    marginTop: 8,
  },
  visibilityOption: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
  },
  visibilityOptionActive: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.04)',
  },
  visibilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#6366f1',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6366f1',
  },
  visibilityInfo: {
    flex: 1,
  },
  visibilityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  visibilityNameActive: {
    color: '#6366f1',
  },
  visibilityDesc: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

