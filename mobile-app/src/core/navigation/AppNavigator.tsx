import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import NotesListScreen from '../../features/notes/screens/NotesListScreen';

export type RootStackParamList = {
  Login: undefined;
  NotesList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="NotesList" 
          component={NotesListScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
