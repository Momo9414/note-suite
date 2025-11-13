import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import NotesListScreen from '../../features/notes/screens/NotesListScreen';
import NoteFormScreen from '../../features/notes/screens/NoteFormScreen';
import NoteDetailScreen from '../../features/notes/screens/NoteDetailScreen';
import SharedNoteScreen from '../../features/notes/screens/SharedNoteScreen';

export type RootStackParamList = {
  Login: undefined;
  NotesList: undefined;
  NoteForm: { noteId?: string };
  NoteDetail: { noteId: string };
  SharedNote: { token: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="NotesList" 
          component={NotesListScreen}
          options={{ title: 'Mes Notes', headerShown: false }}
        />
        <Stack.Screen 
          name="NoteForm" 
          component={NoteFormScreen}
          options={{ title: 'Nouvelle note' }}
        />
        <Stack.Screen 
          name="NoteDetail" 
          component={NoteDetailScreen}
          options={{ title: 'Détails de la note' }}
        />
        <Stack.Screen 
          name="SharedNote" 
          component={SharedNoteScreen}
          options={{ title: 'Note partagée' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
