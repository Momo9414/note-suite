import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  RefreshControl,
  Modal,
  ScrollView,
  SafeAreaView,
  Platform,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { authService } from './src/features/auth/services/authService';
import { notesService } from './src/features/notes/services/notesService';
import { Note } from './src/core/types';

// Modern Color Palette
const COLORS = {
  primary: '#6366F1',      // Indigo moderne
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#10B981',    // Green moderne
  danger: '#EF4444',
  warning: '#F59E0B',
  
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceHover: '#F3F4F6',
  
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
  },
};

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [bottomTab, setBottomTab] = useState('list');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Notes state
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  
  // Selected note for details
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  
  // Create/Edit note
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newVisibility, setNewVisibility] = useState<'PRIVATE' | 'SHARED' | 'PUBLIC'>('PRIVATE');
  
  // Profile modal
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (screen === 'notes') {
      loadNotes();
    }
  }, [screen, page, searchQuery]);

  const checkAuth = async () => {
    const isAuth = await authService.isAuthenticated();
    setScreen(isAuth ? 'notes' : 'login');
  };

  const loadNotes = async () => {
    try {
      const response = await notesService.getNotes(page, 20, searchQuery || undefined);
      setNotes(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les notes');
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplissez tous les champs');
      return;
    }

    setLoading(true);
    try {
      await authService.login(email, password);
      setScreen('notes');
      setPage(0);
    } catch (error: any) {
      Alert.alert('Erreur', 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler' },
        { 
          text: 'Déconnexion', 
          onPress: async () => {
            await authService.logout();
            setEmail('');
            setPassword('');
            setNotes([]);
            setSearchQuery('');
            setPage(0);
            setBottomTab('list');
            setShowProfile(false);
            setScreen('login');
          }
        },
      ]
    );
  };

  const handleCreateNote = async () => {
    if (!newTitle) {
      Alert.alert('Erreur', 'Le titre est requis');
      return;
    }

    setLoading(true);
    try {
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(t => t);
      await notesService.createNote({
        title: newTitle,
        contentMd: newContent,
        visibility: newVisibility,
        tags: tagsArray,
      });
      setCreateMode(false);
      setNewTitle('');
      setNewContent('');
      setNewTags('');
      setNewVisibility('PRIVATE');
      setPage(0);
      loadNotes();
      setBottomTab('list');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de créer la note');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async () => {
    if (!newTitle || !editingNoteId) {
      Alert.alert('Erreur', 'Le titre est requis');
      return;
    }

    setLoading(true);
    try {
      const tagsArray = newTags.split(',').map(t => t.trim()).filter(t => t);
      await notesService.updateNote(editingNoteId, {
        title: newTitle,
        contentMd: newContent,
        visibility: newVisibility,
        tags: tagsArray,
      });
      setEditMode(false);
      setEditingNoteId(null);
      setNewTitle('');
      setNewContent('');
      setNewTags('');
      setNewVisibility('PRIVATE');
      loadNotes();
      setSelectedNote(null);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de modifier la note');
    } finally {
      setLoading(false);
    }
  };

  const openEditMode = (note: Note) => {
    setEditingNoteId(note.id);
    setNewTitle(note.title);
    setNewContent(note.contentMd);
    setNewTags(note.tags.join(', '));
    setNewVisibility(note.visibility);
    setSelectedNote(null);
    setEditMode(true);
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Supprimer la note',
      'Cette action est irréversible. Confirmer la suppression ?',
      [
        { text: 'Annuler' },
        { 
          text: 'Supprimer', 
          onPress: async () => {
            try {
              await notesService.deleteNote(noteId);
              loadNotes();
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de supprimer');
            }
          }
        },
      ]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(0);
    loadNotes();
  };

  // LOADING SCREEN
  if (screen === 'loading') {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  // LOGIN SCREEN
  if (screen === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContent}>
          <View style={styles.logoBox}>
            <Ionicons name="document-text" size={56} color={COLORS.text.inverse} />
          </View>
          
          <Text style={styles.titleBig}>Notes App</Text>
          <Text style={styles.subtitle}>Gestion professionnelle de notes</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={22} color={COLORS.text.tertiary} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.text.tertiary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={22} color={COLORS.text.tertiary} />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor={COLORS.text.tertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={22} 
                color={COLORS.text.tertiary} 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.text.inverse} size="small" />
            ) : (
              <>
                <Text style={styles.buttonText}>Se connecter</Text>
                <Ionicons name="arrow-forward" size={22} color={COLORS.text.inverse} />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.hint}>
            <Text style={styles.hintTitle}>COMPTE DE TEST</Text>
            <Text style={styles.hintText}>user@example.com</Text>
            <Text style={styles.hintText}>password123</Text>
          </View>
        </View>
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  // CREATE NOTE SCREEN
  if (bottomTab === 'create') {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setBottomTab('list')}>
          <Ionicons name="arrow-back" size={26} color={COLORS.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouvelle Note</Text>
        <View style={{ width: 26 }} />
      </View>

        <ScrollView style={styles.createContent}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.inputCreate}
            placeholder="Titre de la note"
            placeholderTextColor={COLORS.text.tertiary}
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <Text style={styles.label}>Contenu (Markdown)</Text>
          <TextInput
            style={[styles.inputCreate, styles.textArea]}
            placeholder="Contenu de la note..."
            placeholderTextColor={COLORS.text.tertiary}
            value={newContent}
            onChangeText={setNewContent}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Visibilité</Text>
          <View style={styles.visibilityContainer}>
            {(['PRIVATE', 'SHARED', 'PUBLIC'] as const).map((vis) => (
              <TouchableOpacity
                key={vis}
                style={[
                  styles.visibilityOption,
                  newVisibility === vis && styles.visibilityOptionActive,
                ]}
                onPress={() => setNewVisibility(vis)}
              >
                <View style={styles.visibilityContent}>
                  <View
                    style={[
                      styles.radioButton,
                      newVisibility === vis && styles.radioButtonActive,
                    ]}
                  >
                    {newVisibility === vis && <View style={styles.radioButtonInner} />}
                  </View>
                  <View style={styles.visibilityInfo}>
                    <Text
                      style={[
                        styles.visibilityName,
                        newVisibility === vis && styles.visibilityNameActive,
                      ]}
                    >
                      {vis === 'PRIVATE' ? 'Privée' : vis === 'SHARED' ? 'Partagée' : 'Publique'}
                    </Text>
                    <Text style={styles.visibilityDesc}>
                      {vis === 'PRIVATE'
                        ? 'Seulement vous pouvez voir'
                        : vis === 'SHARED'
                        ? 'Accessible via un lien partagé'
                        : 'Tous les utilisateurs authentifiés'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Tags (séparés par des virgules)</Text>
          <TextInput
            style={styles.inputCreate}
            placeholder="React, JavaScript, Mobile"
            placeholderTextColor={COLORS.text.tertiary}
            value={newTags}
            onChangeText={setNewTags}
          />

          <TouchableOpacity 
            style={[styles.buttonCreate, loading && styles.buttonDisabled]}
            onPress={handleCreateNote}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.text.inverse} size="small" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={26} color={COLORS.text.inverse} />
                <Text style={styles.buttonText}>Créer la note</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>

        <BottomMenu tab={bottomTab} setTab={setBottomTab} onLogout={handleLogout} />
        <StatusBar style="light" />
      </SafeAreaView>
    );
  }

  // NOTES LIST SCREEN
  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity 
      style={styles.noteCard}
      onPress={() => setSelectedNote(item)}
      activeOpacity={0.8}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteIconBox}>
          <Ionicons name="document-text-outline" size={26} color={COLORS.primary} />
        </View>
        <View style={styles.noteTitleBox}>
          <Text style={styles.noteTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.noteMetaRow}>
            <Text style={styles.noteDate}>
              {new Date(item.updatedAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
            <View
              style={[
                styles.visibilityBadgeSmall,
                {
                  backgroundColor:
                    item.visibility === 'PRIVATE'
                      ? '#ef444420'
                      : item.visibility === 'SHARED'
                      ? '#f59e0b20'
                      : '#10b98120',
                },
              ]}
            >
              <Text
                style={[
                  styles.visibilityTextSmall,
                  {
                    color:
                      item.visibility === 'PRIVATE'
                        ? '#ef4444'
                        : item.visibility === 'SHARED'
                        ? '#f59e0b'
                        : '#10b981',
                  },
                ]}
              >
                {item.visibility === 'PRIVATE' ? 'Privée' : item.visibility === 'SHARED' ? 'Partagée' : 'Publique'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {item.contentMd && (
        <Text style={styles.noteContent} numberOfLines={3}>
          {item.contentMd}
        </Text>
      )}

      {item.tags && item.tags.length > 0 && (
        <View style={styles.tags}>
          {item.tags.slice(0, 3).map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Ionicons name="pricetag" size={11} color={COLORS.primary} />
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {item.tags.length > 3 && (
            <Text style={styles.moreTagsText}>+{item.tags.length - 3}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mes Notes</Text>
          <Text style={styles.headerSubtitle}>{totalElements} notes</Text>
        </View>
        <TouchableOpacity onPress={() => setShowProfile(true)} style={styles.profileBtn}>
          <Ionicons name="person-circle-outline" size={28} color={COLORS.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color={COLORS.text.tertiary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher dans les notes..."
          placeholderTextColor={COLORS.text.tertiary}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setPage(0);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={22} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={72} color={COLORS.border.medium} />
            <Text style={styles.emptyTitle}>Aucune note</Text>
            <Text style={styles.emptyText}>
              {searchQuery ? 'Aucun résultat' : 'Créez votre première note'}
            </Text>
          </View>
        }
      />

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <View style={styles.paginationBar}>
          <TouchableOpacity 
            onPress={() => setPage(0)}
            disabled={page === 0}
            style={styles.pageBtnSmall}
          >
            <Ionicons name="play-back" size={18} color={page === 0 ? COLORS.border.medium : COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPage(page - 1)}
            disabled={page === 0}
            style={styles.pageBtn}
          >
            <Ionicons name="chevron-back" size={22} color={page === 0 ? COLORS.border.medium : COLORS.primary} />
          </TouchableOpacity>
          
          <View style={styles.pageInfo}>
            <Text style={styles.pageNumber}>{page + 1}</Text>
            <Text style={styles.pageSeparator}>/</Text>
            <Text style={styles.pageTotalText}>{totalPages}</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            style={styles.pageBtn}
          >
            <Ionicons name="chevron-forward" size={22} color={page === totalPages - 1 ? COLORS.border.medium : COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPage(totalPages - 1)}
            disabled={page === totalPages - 1}
            style={styles.pageBtnSmall}
          >
            <Ionicons name="play-forward" size={18} color={page === totalPages - 1 ? COLORS.border.medium : COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Menu */}
      <BottomMenu tab={bottomTab} setTab={setBottomTab} onLogout={handleLogout} />

      {/* Note Details Modal */}
      <Modal
        visible={selectedNote !== null}
        animationType="slide"
        onRequestClose={() => setSelectedNote(null)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedNote(null)}>
              <Ionicons name="close" size={28} color={COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Détails</Text>
            <TouchableOpacity 
              onPress={() => {
                if (selectedNote) {
                  openEditMode(selectedNote);
                }
              }}
            >
              <Ionicons name="create-outline" size={26} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.detailTitle}>{selectedNote?.title}</Text>
            <View
              style={[
                styles.visibilityBadgeDetail,
                {
                  backgroundColor:
                    selectedNote?.visibility === 'PRIVATE'
                      ? '#ef444420'
                      : selectedNote?.visibility === 'SHARED'
                      ? '#f59e0b20'
                      : '#10b98120',
                },
              ]}
            >
              <Text
                style={[
                  styles.visibilityTextDetail,
                  {
                    color:
                      selectedNote?.visibility === 'PRIVATE'
                        ? '#ef4444'
                        : selectedNote?.visibility === 'SHARED'
                        ? '#f59e0b'
                        : '#10b981',
                  },
                ]}
              >
                {selectedNote?.visibility === 'PRIVATE'
                  ? 'Privée'
                  : selectedNote?.visibility === 'SHARED'
                  ? 'Partagée'
                  : 'Publique'}
              </Text>
            </View>
            <Text style={styles.detailDate}>
              Modifié le {selectedNote && new Date(selectedNote.updatedAt).toLocaleDateString('fr-FR')}
            </Text>

            {selectedNote?.contentMd && (
              <View style={styles.detailContentBox}>
                <Text style={styles.detailContent}>{selectedNote.contentMd}</Text>
              </View>
            )}

            {selectedNote?.tags && selectedNote.tags.length > 0 && (
              <View style={styles.detailTags}>
                <Text style={styles.detailTagsTitle}>Tags</Text>
                <View style={styles.tags}>
                  {selectedNote.tags.map((tag, idx) => (
                    <View key={idx} style={styles.tagBig}>
                      <Ionicons name="pricetag" size={13} color={COLORS.primary} />
                      <Text style={styles.tagBigText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {selectedNote?.visibility === 'SHARED' && (
              <View style={styles.shareSection}>
                <Text style={styles.detailTagsTitle}>Lien de partage</Text>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={async () => {
                    if (!selectedNote) return;
                    try {
                      if (!selectedNote.shareToken) {
                        const updatedNote = await notesService.generateShareLink(selectedNote.id);
                        const shareUrl = notesService.getShareUrl(updatedNote.shareToken!);
                        await Share.share({
                          message: `Partage de note: ${selectedNote.title}\n${shareUrl}`,
                          url: shareUrl,
                        });
                        setSelectedNote(updatedNote);
                        loadNotes();
                      } else {
                        const shareUrl = notesService.getShareUrl(selectedNote.shareToken);
                        await Share.share({
                          message: `Partage de note: ${selectedNote.title}\n${shareUrl}`,
                          url: shareUrl,
                        });
                      }
                    } catch (error: any) {
                      Alert.alert('Erreur', 'Impossible de partager la note');
                    }
                  }}
                >
                  <Ionicons name="share-outline" size={22} color={COLORS.text.inverse} />
                  <Text style={styles.shareButtonText}>
                    {selectedNote.shareToken ? 'Partager le lien' : 'Générer le lien'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Actions */}
            <View style={styles.detailActions}>
              <TouchableOpacity 
                style={styles.editBtn}
                onPress={() => {
                  if (selectedNote) {
                    openEditMode(selectedNote);
                  }
                }}
              >
                <Ionicons name="create-outline" size={22} color={COLORS.primary} />
                <Text style={styles.editBtnText}>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.deleteBtn}
                onPress={() => {
                  if (selectedNote) {
                    handleDeleteNote(selectedNote.id);
                    setSelectedNote(null);
                  }
                }}
              >
                <Ionicons name="trash-outline" size={22} color={COLORS.danger} />
                <Text style={styles.deleteBtnText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        visible={editMode}
        animationType="slide"
        onRequestClose={() => setEditMode(false)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditMode(false)}>
              <Ionicons name="close" size={28} color={COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Modifier la Note</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="Titre de la note"
              placeholderTextColor={COLORS.text.tertiary}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.label}>Contenu (Markdown)</Text>
            <TextInput
              style={[styles.inputCreate, styles.textArea]}
              placeholder="Écrivez votre contenu ici..."
              placeholderTextColor={COLORS.text.tertiary}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Visibilité</Text>
            <View style={styles.visibilityContainer}>
              {(['PRIVATE', 'SHARED', 'PUBLIC'] as const).map((vis) => (
                <TouchableOpacity
                  key={vis}
                  style={[
                    styles.visibilityOption,
                    newVisibility === vis && styles.visibilityOptionActive,
                  ]}
                  onPress={() => setNewVisibility(vis)}
                >
                  <View style={styles.visibilityContent}>
                    <View
                      style={[
                        styles.radioButton,
                        newVisibility === vis && styles.radioButtonActive,
                      ]}
                    >
                      {newVisibility === vis && <View style={styles.radioButtonInner} />}
                    </View>
                    <View style={styles.visibilityInfo}>
                      <Text
                        style={[
                          styles.visibilityName,
                          newVisibility === vis && styles.visibilityNameActive,
                        ]}
                      >
                        {vis === 'PRIVATE' ? 'Privée' : vis === 'SHARED' ? 'Partagée' : 'Publique'}
                      </Text>
                      <Text style={styles.visibilityDesc}>
                        {vis === 'PRIVATE'
                          ? 'Seulement vous pouvez voir'
                          : vis === 'SHARED'
                          ? 'Accessible via un lien partagé'
                          : 'Tous les utilisateurs authentifiés'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="React, JavaScript, Mobile"
              placeholderTextColor={COLORS.text.tertiary}
              value={newTags}
              onChangeText={setNewTags}
            />
            <Text style={styles.helpText}>Séparez les tags par des virgules</Text>

            <TouchableOpacity 
              style={[styles.buttonUpdate, loading && styles.buttonDisabled]}
              onPress={handleUpdateNote}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.text.inverse} size="small" />
              ) : (
                <>
                  <Ionicons name="save" size={26} color={COLORS.text.inverse} />
                  <Text style={styles.buttonText}>Enregistrer</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={showProfile}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileModal}>
            <View style={styles.profileHeader}>
              <Ionicons name="person-circle" size={72} color={COLORS.primary} />
              <Text style={styles.profileEmail}>{email || 'Utilisateur'}</Text>
            </View>

            <TouchableOpacity style={styles.profileOption} onPress={() => setShowProfile(false)}>
              <Ionicons name="settings-outline" size={26} color={COLORS.text.secondary} />
              <Text style={styles.profileOptionText}>Paramètres</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.profileOption}
              onPress={() => {
                setShowProfile(false);
                handleLogout();
              }}
            >
              <Ionicons name="log-out-outline" size={26} color={COLORS.danger} />
              <Text style={[styles.profileOptionText, { color: COLORS.danger }]}>
                Déconnexion
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.profileClose}
              onPress={() => setShowProfile(false)}
            >
              <Text style={styles.profileCloseText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Note Modal */}
      <Modal
        visible={createMode}
        animationType="slide"
        onRequestClose={() => setCreateMode(false)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setCreateMode(false)}>
              <Ionicons name="close" size={28} color={COLORS.text.primary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouvelle Note</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="Titre de la note"
              placeholderTextColor={COLORS.text.tertiary}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.label}>Contenu (Markdown)</Text>
            <TextInput
              style={[styles.inputCreate, styles.textArea]}
              placeholder="Écrivez votre contenu ici..."
              placeholderTextColor={COLORS.text.tertiary}
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Visibilité</Text>
            <View style={styles.visibilityContainer}>
              {(['PRIVATE', 'SHARED', 'PUBLIC'] as const).map((vis) => (
                <TouchableOpacity
                  key={vis}
                  style={[
                    styles.visibilityOption,
                    newVisibility === vis && styles.visibilityOptionActive,
                  ]}
                  onPress={() => setNewVisibility(vis)}
                >
                  <View style={styles.visibilityContent}>
                    <View
                      style={[
                        styles.radioButton,
                        newVisibility === vis && styles.radioButtonActive,
                      ]}
                    >
                      {newVisibility === vis && <View style={styles.radioButtonInner} />}
                    </View>
                    <View style={styles.visibilityInfo}>
                      <Text
                        style={[
                          styles.visibilityName,
                          newVisibility === vis && styles.visibilityNameActive,
                        ]}
                      >
                        {vis === 'PRIVATE' ? 'Privée' : vis === 'SHARED' ? 'Partagée' : 'Publique'}
                      </Text>
                      <Text style={styles.visibilityDesc}>
                        {vis === 'PRIVATE'
                          ? 'Seulement vous pouvez voir'
                          : vis === 'SHARED'
                          ? 'Accessible via un lien partagé'
                          : 'Tous les utilisateurs authentifiés'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="React, JavaScript, Mobile"
              placeholderTextColor={COLORS.text.tertiary}
              value={newTags}
              onChangeText={setNewTags}
            />
            <Text style={styles.helpText}>Séparez les tags par des virgules</Text>

            <TouchableOpacity 
              style={[styles.buttonCreate, loading && styles.buttonDisabled]}
              onPress={handleCreateNote}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.text.inverse} size="small" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={26} color={COLORS.text.inverse} />
                  <Text style={styles.buttonText}>Créer la note</Text>
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

function BottomMenu({ tab, setTab, onLogout }: any) {
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => setTab('list')}
      >
        <Ionicons 
          name={tab === 'list' ? 'list' : 'list-outline'} 
          size={26} 
          color={tab === 'list' ? COLORS.primary : COLORS.text.tertiary} 
        />
        <Text style={[styles.menuText, tab === 'list' && styles.menuTextActive]}>
          Liste
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={() => setTab('create')}
      >
        <View style={styles.createButton}>
          <Ionicons name="add" size={32} color={COLORS.text.inverse} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onLogout}
      >
        <Ionicons name="log-out-outline" size={26} color={COLORS.text.tertiary} />
        <Text style={styles.menuText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    backgroundColor: COLORS.surface,
  },
  loginContent: {
    flex: 1,
    justifyContent: 'center' as any,
    padding: 32,
    backgroundColor: COLORS.surface,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    alignSelf: 'center' as any,
    marginBottom: 32,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  titleBig: {
    fontSize: 36,
    fontWeight: '700' as any,
    textAlign: 'center' as any,
    color: COLORS.text.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center' as any,
    color: COLORS.text.secondary,
    marginBottom: 48,
    fontWeight: '400' as any,
  },
  inputBox: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    paddingHorizontal: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.sm,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.text.inverse,
    fontSize: 17,
    fontWeight: '600' as any,
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  hint: {
    marginTop: 48,
    padding: 20,
    backgroundColor: COLORS.surfaceHover,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  hintTitle: {
    fontSize: 11,
    color: COLORS.text.tertiary,
    textAlign: 'center' as any,
    marginBottom: 12,
    fontWeight: '600' as any,
    letterSpacing: 1,
  },
  hintText: {
    fontSize: 15,
    color: COLORS.text.primary,
    textAlign: 'center' as any,
    marginBottom: 4,
    fontWeight: '500' as any,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row' as any,
    justifyContent: 'space-between' as any,
    alignItems: 'center' as any,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as any,
    color: COLORS.text.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginTop: 2,
    fontWeight: '500' as any,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceHover,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchBox: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: COLORS.surfaceHover,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text.primary,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 160,
  },
  noteCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.md,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  noteHeader: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    marginBottom: 14,
  },
  noteIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginRight: 14,
  },
  noteTitleBox: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600' as any,
    color: COLORS.text.primary,
    marginBottom: 8,
    letterSpacing: -0.3,
    flex: 1,
  },
  noteMetaRow: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'space-between' as any,
    gap: 8,
  },
  noteDate: {
    fontSize: 13,
    color: COLORS.text.tertiary,
    fontWeight: '500' as any,
    flex: 1,
  },
  noteContent: {
    fontSize: 15,
    color: COLORS.text.secondary,
    lineHeight: 22,
    marginBottom: 14,
  },
  tags: {
    flexDirection: 'row' as any,
    flexWrap: 'wrap' as any,
    alignItems: 'center' as any,
  },
  tag: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: COLORS.primary + '12',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  tagText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: '600' as any,
  },
  moreTagsText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginLeft: 4,
    fontWeight: '500' as any,
  },
  empty: {
    alignItems: 'center' as any,
    paddingVertical: 120,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600' as any,
    color: COLORS.text.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.text.secondary,
    fontWeight: '400' as any,
  },
  paginationBar: {
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
  },
  pageBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginHorizontal: 4,
    backgroundColor: COLORS.surfaceHover,
  },
  pageBtnSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginHorizontal: 6,
    backgroundColor: COLORS.surfaceHover,
  },
  pageInfo: {
    flexDirection: 'row' as any,
    alignItems: 'baseline' as any,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
  },
  pageNumber: {
    fontSize: 20,
    fontWeight: '700' as any,
    color: COLORS.primary,
  },
  pageSeparator: {
    fontSize: 16,
    color: COLORS.text.tertiary,
    marginHorizontal: 6,
    fontWeight: '500' as any,
  },
  pageTotalText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '600' as any,
  },
  bottomMenu: {
    flexDirection: 'row' as any,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    paddingVertical: 12,
    paddingBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.lg,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuItem: {
    flex: 1,
    alignItems: 'center' as any,
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 12,
    color: COLORS.text.tertiary,
    marginTop: 6,
    fontWeight: '500' as any,
  },
  menuTextActive: {
    color: COLORS.primary,
    fontWeight: '600' as any,
  },
  createButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: -24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modal: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row' as any,
    justifyContent: 'space-between' as any,
    alignItems: 'center' as any,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600' as any,
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '700' as any,
    color: COLORS.text.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  detailDate: {
    fontSize: 14,
    color: COLORS.text.tertiary,
    marginBottom: 24,
    fontWeight: '500' as any,
  },
  detailContentBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow.sm,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  detailContent: {
    fontSize: 16,
    color: COLORS.text.secondary,
    lineHeight: 26,
  },
  detailTags: {
    marginBottom: 24,
  },
  detailTagsTitle: {
    fontSize: 15,
    color: COLORS.text.secondary,
    marginBottom: 14,
    fontWeight: '600' as any,
  },
  tagBig: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: COLORS.primary + '12',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.primary + '20',
  },
  tagBigText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: '600' as any,
  },
  createContent: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as any,
    color: COLORS.text.primary,
    marginBottom: 10,
    marginTop: 16,
  },
  inputCreate: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    fontSize: 16,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    color: COLORS.text.primary,
  },
  textArea: {
    height: 220,
    textAlignVertical: 'top' as any,
  },
  helpText: {
    fontSize: 13,
    color: COLORS.text.tertiary,
    marginTop: 6,
    marginBottom: 24,
    fontWeight: '400' as any,
  },
  buttonCreate: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonUpdate: {
    backgroundColor: COLORS.warning,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.warning,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  detailActions: {
    flexDirection: 'row' as any,
    marginTop: 24,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'center' as any,
    backgroundColor: COLORS.primary + '12',
    padding: 18,
    borderRadius: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  editBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600' as any,
    marginLeft: 8,
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'center' as any,
    backgroundColor: COLORS.danger + '12',
    padding: 18,
    borderRadius: 14,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.danger + '30',
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600' as any,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end' as any,
  },
  profileModal: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 28,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center' as any,
    paddingVertical: 28,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
    marginBottom: 20,
  },
  profileEmail: {
    fontSize: 17,
    color: COLORS.text.primary,
    marginTop: 14,
    fontWeight: '600' as any,
  },
  profileOption: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 8,
    backgroundColor: COLORS.surfaceHover,
  },
  profileOptionText: {
    fontSize: 16,
    color: COLORS.text.primary,
    marginLeft: 16,
    fontWeight: '500' as any,
  },
  profileClose: {
    marginTop: 20,
    padding: 18,
    backgroundColor: COLORS.surfaceHover,
    borderRadius: 14,
    alignItems: 'center' as any,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  profileCloseText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '600' as any,
  },
  visibilityBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    flexShrink: 0,
  },
  visibilityTextSmall: {
    fontSize: 10,
    fontWeight: '600' as any,
    textTransform: 'uppercase' as any,
    letterSpacing: 0.5,
  },
  visibilityContainer: {
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  visibilityOption: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border.light,
    borderRadius: 12,
    padding: 14,
  },
  visibilityOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '08',
  },
  visibilityContent: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border.medium,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
  },
  radioButtonActive: {
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  visibilityInfo: {
    flex: 1,
  },
  visibilityName: {
    fontSize: 16,
    fontWeight: '600' as any,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  visibilityNameActive: {
    color: COLORS.primary,
  },
  visibilityDesc: {
    fontSize: 13,
    color: COLORS.text.secondary,
    lineHeight: 18,
  },
  visibilityBadgeDetail: {
    alignSelf: 'flex-start' as any,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  visibilityTextDetail: {
    fontSize: 12,
    fontWeight: '600' as any,
    textTransform: 'uppercase' as any,
    letterSpacing: 0.5,
  },
  shareSection: {
    marginTop: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f59e0b08',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f59e0b20',
  },
  shareButton: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'center' as any,
    backgroundColor: '#f59e0b',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  shareButtonText: {
    color: COLORS.text.inverse,
    fontSize: 16,
    fontWeight: '600' as any,
    marginLeft: 8,
  },
});
