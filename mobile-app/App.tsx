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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { authService } from './src/features/auth/services/authService';
import { notesService } from './src/features/notes/services/notesService';
import { Note } from './src/core/types';

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
        tags: tagsArray,
      });
      setCreateMode(false);
      setNewTitle('');
      setNewContent('');
      setNewTags('');
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
        tags: tagsArray,
      });
      setEditMode(false);
      setEditingNoteId(null);
      setNewTitle('');
      setNewContent('');
      setNewTags('');
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
        <ActivityIndicator size="large" color="#2196F3" />
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
            <Ionicons name="document-text" size={48} color="#2196F3" />
          </View>
          
          <Text style={styles.titleBig}>Notes App</Text>
          <Text style={styles.subtitle}>Gestion professionnelle de notes</Text>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text style={styles.buttonText}>Se connecter</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
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
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nouvelle Note</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.createContent}>
          <Text style={styles.label}>Titre *</Text>
          <TextInput
            style={styles.inputCreate}
            placeholder="Titre de la note"
            value={newTitle}
            onChangeText={setNewTitle}
          />

          <Text style={styles.label}>Contenu (Markdown)</Text>
          <TextInput
            style={[styles.inputCreate, styles.textArea]}
            placeholder="Contenu de la note..."
            value={newContent}
            onChangeText={setNewContent}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Tags (séparés par des virgules)</Text>
          <TextInput
            style={styles.inputCreate}
            placeholder="React, JavaScript, Mobile"
            value={newTags}
            onChangeText={setNewTags}
          />

          <TouchableOpacity 
            style={[styles.buttonCreate, loading && styles.buttonDisabled]}
            onPress={handleCreateNote}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="checkmark" size={24} color="#fff" />
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
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteIconBox}>
          <Ionicons name="document-text-outline" size={24} color="#2196F3" />
        </View>
        <View style={styles.noteTitleBox}>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.noteDate}>
            {new Date(item.updatedAt).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </Text>
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
              <Ionicons name="pricetag" size={10} color="#2196F3" />
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
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher dans les notes..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            setPage(0);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
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
            <Ionicons name="folder-open-outline" size={64} color="#ccc" />
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
            <Ionicons name="play-back" size={20} color={page === 0 ? '#ccc' : '#2196F3'} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPage(page - 1)}
            disabled={page === 0}
            style={styles.pageBtn}
          >
            <Ionicons name="chevron-back" size={24} color={page === 0 ? '#ccc' : '#2196F3'} />
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
            <Ionicons name="chevron-forward" size={24} color={page === totalPages - 1 ? '#ccc' : '#2196F3'} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPage(totalPages - 1)}
            disabled={page === totalPages - 1}
            style={styles.pageBtnSmall}
          >
            <Ionicons name="play-forward" size={20} color={page === totalPages - 1 ? '#ccc' : '#2196F3'} />
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
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Détails</Text>
            <TouchableOpacity 
              onPress={() => {
                if (selectedNote) {
                  openEditMode(selectedNote);
                }
              }}
            >
              <Ionicons name="create-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.detailTitle}>{selectedNote?.title}</Text>
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
                      <Ionicons name="pricetag" size={12} color="#2196F3" />
                      <Text style={styles.tagBigText}>{tag}</Text>
                    </View>
                  ))}
                </View>
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
                <Ionicons name="create-outline" size={20} color="#2196F3" />
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
                <Ionicons name="trash-outline" size={20} color="#F44336" />
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
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Modifier la Note</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="Titre de la note"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.label}>Contenu (Markdown)</Text>
            <TextInput
              style={[styles.inputCreate, styles.textArea]}
              placeholder="Écrivez votre contenu ici..."
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="React, JavaScript, Mobile"
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
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="save" size={24} color="#fff" />
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
              <Ionicons name="person-circle" size={64} color="#2196F3" />
              <Text style={styles.profileEmail}>{email || 'Utilisateur'}</Text>
            </View>

            <TouchableOpacity style={styles.profileOption} onPress={() => setShowProfile(false)}>
              <Ionicons name="settings-outline" size={24} color="#666" />
              <Text style={styles.profileOptionText}>Paramètres</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.profileOption}
              onPress={() => {
                setShowProfile(false);
                handleLogout();
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#F44336" />
              <Text style={[styles.profileOptionText, { color: '#F44336' }]}>
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
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nouvelle Note</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="Titre de la note"
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <Text style={styles.label}>Contenu (Markdown)</Text>
            <TextInput
              style={[styles.inputCreate, styles.textArea]}
              placeholder="Écrivez votre contenu ici..."
              value={newContent}
              onChangeText={setNewContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />

            <Text style={styles.label}>Tags</Text>
            <TextInput
              style={styles.inputCreate}
              placeholder="React, JavaScript, Mobile"
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
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
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
          size={24} 
          color={tab === 'list' ? '#2196F3' : '#666'} 
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
          <Ionicons name="add" size={28} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#666" />
        <Text style={styles.menuText}>Quitter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    backgroundColor: '#fff',
  },
  loginContent: {
    flex: 1,
    justifyContent: 'center' as any,
    padding: 24,
    backgroundColor: '#fff',
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    alignSelf: 'center' as any,
    marginBottom: 24,
  },
  titleBig: {
    fontSize: 32,
    fontWeight: 'bold' as any,
    textAlign: 'center' as any,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center' as any,
    color: '#666',
    marginBottom: 40,
  },
  inputBox: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold' as any,
    marginLeft: 8,
  },
  hint: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  hintTitle: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center' as any,
    marginBottom: 12,
    fontWeight: 'bold' as any,
  },
  hintText: {
    fontSize: 14,
    color: '#1a1a1a',
    textAlign: 'center' as any,
    marginBottom: 4,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 16,
    paddingTop: 12,
    flexDirection: 'row' as any,
    justifyContent: 'space-between' as any,
    alignItems: 'center' as any,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold' as any,
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  profileBtn: {
    padding: 4,
  },
  searchBox: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  list: {
    padding: 16,
    paddingBottom: 160,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noteHeader: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    marginBottom: 12,
  },
  noteIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginRight: 12,
  },
  noteTitleBox: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row' as any,
    flexWrap: 'wrap' as any,
    alignItems: 'center' as any,
  },
  tag: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#2196F3',
    marginLeft: 4,
  },
  moreTagsText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 4,
  },
  empty: {
    alignItems: 'center' as any,
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  paginationBar: {
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  pageBtn: {
    padding: 8,
    marginHorizontal: 4,
  },
  pageBtnSmall: {
    padding: 8,
    marginHorizontal: 8,
  },
  pageInfo: {
    flexDirection: 'row' as any,
    alignItems: 'baseline' as any,
    marginHorizontal: 16,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: 'bold' as any,
    color: '#2196F3',
  },
  pageSeparator: {
    fontSize: 14,
    color: '#ccc',
    marginHorizontal: 4,
  },
  pageTotalText: {
    fontSize: 14,
    color: '#999',
  },
  bottomMenu: {
    flexDirection: 'row' as any,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center' as any,
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  menuTextActive: {
    color: '#2196F3',
    fontWeight: 'bold' as any,
  },
  createButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: -20,
  },
  modal: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    backgroundColor: '#2196F3',
    padding: 16,
    flexDirection: 'row' as any,
    justifyContent: 'space-between' as any,
    alignItems: 'center' as any,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold' as any,
    color: '#fff',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  detailDate: {
    fontSize: 13,
    color: '#999',
    marginBottom: 20,
  },
  detailContentBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  detailContent: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  detailTags: {
    marginBottom: 20,
  },
  detailTagsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: 'bold' as any,
  },
  tagBig: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagBigText: {
    fontSize: 13,
    color: '#2196F3',
    marginLeft: 6,
    fontWeight: 'bold' as any,
  },
  createContent: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold' as any,
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 12,
  },
  inputCreate: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top' as any,
  },
  helpText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginBottom: 20,
  },
  buttonCreate: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 20,
  },
  buttonUpdate: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row' as any,
    justifyContent: 'center' as any,
    alignItems: 'center' as any,
    marginTop: 20,
  },
  detailActions: {
    flexDirection: 'row' as any,
    marginTop: 20,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'center' as any,
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  editBtnText: {
    color: '#2196F3',
    fontSize: 15,
    fontWeight: 'bold' as any,
    marginLeft: 8,
  },
  deleteBtn: {
    flex: 1,
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    justifyContent: 'center' as any,
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  deleteBtnText: {
    color: '#F44336',
    fontSize: 15,
    fontWeight: 'bold' as any,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end' as any,
  },
  profileModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center' as any,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  profileEmail: {
    fontSize: 16,
    color: '#1a1a1a',
    marginTop: 12,
    fontWeight: 'bold' as any,
  },
  profileOption: {
    flexDirection: 'row' as any,
    alignItems: 'center' as any,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileOptionText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 16,
  },
  profileClose: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center' as any,
  },
  profileCloseText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold' as any,
  },
});
