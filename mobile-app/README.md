# 📱 Application Mobile Flutter - Notes Collaboratives

Application mobile offline-first développée avec Flutter pour la gestion de notes collaboratives.

## 📋 Table des matières

- [Caractéristiques](#caractéristiques)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Build](#build)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)

## ✨ Caractéristiques

- ✅ Mode **offline-first** avec cache local
- ✅ Synchronisation automatique en arrière-plan
- ✅ Support Markdown avec prévisualisation
- ✅ Authentification sécurisée
- ✅ Recherche et filtrage des notes
- ✅ Partage de notes
- ✅ Support Android et iOS
- ✅ Architecture Clean (Feature-First)

## 🛠️ Technologies

| Technologie | Version | Description |
|------------|---------|-------------|
| Flutter | 3.x | Framework mobile |
| Dart | 3.x | Langage |
| Riverpod | 2.4.x | State management |
| Dio | 5.x | Client HTTP |
| Sqflite | 2.x | Base de données locale |
| Hive | 2.x | Cache key-value |
| Go Router | 12.x | Navigation |
| Freezed | 2.x | Code generation |
| flutter_markdown | 0.6.x | Rendu Markdown |

## 📦 Prérequis

### Outils requis

- Flutter SDK 3.x ou supérieur
- Dart SDK 3.x ou supérieur
- Android Studio (pour Android)
- Xcode (pour iOS - macOS uniquement)

### Vérification

```bash
flutter doctor
```

Assurez-vous que toutes les vérifications passent.

## 🚀 Installation

```bash
cd mobile-app

# Installer les dépendances
flutter pub get

# Générer le code
flutter pub run build_runner build --delete-conflicting-outputs
```

## ⚙️ Configuration

### Configuration de l'API

**lib/core/config/app_config.dart**
```dart
class AppConfig {
  // Android Emulator: 10.0.2.2
  // iOS Simulator: localhost
  // Device physique: IP locale (ex: 192.168.1.100)
  static const String apiBaseUrl = 'http://10.0.2.2:8080/api/v1';
  static const int apiTimeout = 30000;
  
  static const bool enableOfflineMode = true;
  static const String dbName = 'notes_local.db';
  static const int dbVersion = 1;
  
  static const String tokenKey = 'auth_token';
  static const String refreshTokenKey = 'refresh_token';
}
```

### Configuration Android

**android/app/build.gradle**
```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.notes.mobile"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### Configuration iOS

**ios/Runner/Info.plist**
```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

## 🏃 Lancement

### Mode développement

```bash
# Liste des devices disponibles
flutter devices

# Lancer sur un device spécifique
flutter run -d <device_id>

# Android
flutter run -d android

# iOS
flutter run -d ios

# Mode debug avec hot reload
flutter run --debug
```

### Mode release

```bash
flutter run --release
```

## 🔨 Build

### Android

```bash
# APK
flutter build apk --release

# App Bundle (pour Google Play)
flutter build appbundle --release

# Fichiers générés dans: build/app/outputs/
```

### iOS

```bash
# Nécessite macOS et Xcode
flutter build ios --release

# Ouvrir dans Xcode pour signature et upload
open ios/Runner.xcworkspace
```

## 🧪 Tests

### Tests unitaires

```bash
# Tous les tests
flutter test

# Tests avec couverture
flutter test --coverage

# Générer rapport HTML
genhtml coverage/lcov.info -o coverage/html
# Ouvrir: coverage/html/index.html
```

### Tests d'intégration

```bash
flutter test integration_test/
```

### Tests widgets

```bash
flutter test test/widgets/
```

### Analyse statique

```bash
# Analyser le code
flutter analyze

# Formater le code
dart format .

# Fix automatique
dart fix --apply
```

## 📁 Structure du projet

```
mobile-app/
├── lib/
│   ├── features/                     # Modules fonctionnels
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── auth_local_datasource.dart
│   │   │   │   │   └── auth_remote_datasource.dart
│   │   │   │   ├── models/
│   │   │   │   │   ├── login_request.dart
│   │   │   │   │   └── auth_response.dart
│   │   │   │   └── repositories/
│   │   │   │       └── auth_repository_impl.dart
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.dart
│   │   │   │   ├── repositories/
│   │   │   │   │   └── auth_repository.dart
│   │   │   │   └── usecases/
│   │   │   │       ├── login_usecase.dart
│   │   │   │       └── logout_usecase.dart
│   │   │   └── presentation/
│   │   │       ├── providers/
│   │   │       │   └── auth_provider.dart
│   │   │       ├── screens/
│   │   │       │   ├── login_screen.dart
│   │   │       │   └── register_screen.dart
│   │   │       └── widgets/
│   │   │           ├── login_form.dart
│   │   │           └── auth_button.dart
│   │   │
│   │   ├── notes/
│   │   │   ├── data/
│   │   │   │   ├── datasources/
│   │   │   │   │   ├── note_local_datasource.dart
│   │   │   │   │   └── note_remote_datasource.dart
│   │   │   │   ├── models/
│   │   │   │   │   ├── note_model.dart
│   │   │   │   │   └── note_request.dart
│   │   │   │   └── repositories/
│   │   │   │       └── note_repository_impl.dart
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── note.dart
│   │   │   │   ├── repositories/
│   │   │   │   │   └── note_repository.dart
│   │   │   │   └── usecases/
│   │   │   │       ├── get_notes_usecase.dart
│   │   │   │       ├── create_note_usecase.dart
│   │   │   │       ├── update_note_usecase.dart
│   │   │   │       └── delete_note_usecase.dart
│   │   │   └── presentation/
│   │   │       ├── providers/
│   │   │       │   └── notes_provider.dart
│   │   │       ├── screens/
│   │   │       │   ├── notes_list_screen.dart
│   │   │       │   ├── note_detail_screen.dart
│   │   │       │   └── note_editor_screen.dart
│   │   │       └── widgets/
│   │   │           ├── note_card.dart
│   │   │           ├── note_search_bar.dart
│   │   │           └── markdown_editor.dart
│   │   │
│   │   └── sync/                     # Synchronisation
│   │       ├── data/
│   │       │   └── sync_manager.dart
│   │       ├── domain/
│   │       │   └── sync_strategy.dart
│   │       └── presentation/
│   │           └── sync_indicator.dart
│   │
│   ├── data/                         # Couche données partagée
│   │   ├── local/
│   │   │   ├── database/
│   │   │   │   ├── app_database.dart
│   │   │   │   └── dao/
│   │   │   │       ├── note_dao.dart
│   │   │   │       └── user_dao.dart
│   │   │   └── cache/
│   │   │       └── hive_cache.dart
│   │   │
│   │   ├── remote/
│   │   │   ├── api_client.dart
│   │   │   ├── endpoints.dart
│   │   │   └── interceptors/
│   │   │       ├── auth_interceptor.dart
│   │   │       └── error_interceptor.dart
│   │   │
│   │   └── repositories/             # Implémentations
│   │
│   ├── core/                         # Services centraux
│   │   ├── config/
│   │   │   └── app_config.dart
│   │   ├── network/
│   │   │   ├── network_info.dart
│   │   │   └── connectivity_service.dart
│   │   ├── storage/
│   │   │   ├── secure_storage.dart
│   │   │   └── preferences_storage.dart
│   │   ├── theme/
│   │   │   ├── app_theme.dart
│   │   │   ├── app_colors.dart
│   │   │   └── app_text_styles.dart
│   │   ├── utils/
│   │   │   ├── date_formatter.dart
│   │   │   ├── validators.dart
│   │   │   └── extensions.dart
│   │   └── error/
│   │       ├── failures.dart
│   │       └── exceptions.dart
│   │
│   ├── shared/                       # Widgets partagés
│   │   ├── widgets/
│   │   │   ├── custom_button.dart
│   │   │   ├── custom_text_field.dart
│   │   │   ├── loading_indicator.dart
│   │   │   ├── error_widget.dart
│   │   │   └── empty_state.dart
│   │   └── constants/
│   │       ├── app_constants.dart
│   │       └── app_strings.dart
│   │
│   └── main.dart                     # Point d'entrée
│
├── test/                             # Tests unitaires
│   ├── features/
│   ├── core/
│   └── shared/
│
├── integration_test/                 # Tests d'intégration
│   └── app_test.dart
│
├── android/                          # Configuration Android
├── ios/                              # Configuration iOS
├── assets/                           # Ressources
├── pubspec.yaml
└── README.md
```

## 🏗️ Architecture

### Clean Architecture + Feature-First

```
┌─────────────────────────────────────┐
│        Presentation Layer           │
│   (Screens, Widgets, Providers)     │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│         Domain Layer                │
│  (Entities, UseCases, Repositories) │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│          Data Layer                 │
│  (Models, Datasources, Repository   │
│          Implementations)           │
└─────────────────────────────────────┘
```

### State Management (Riverpod)

```dart
// notes_provider.dart
@riverpod
class NotesNotifier extends _$NotesNotifier {
  @override
  Future<List<Note>> build() async {
    final repository = ref.read(noteRepositoryProvider);
    return repository.getNotes();
  }
  
  Future<void> createNote(Note note) async {
    final repository = ref.read(noteRepositoryProvider);
    await repository.createNote(note);
    ref.invalidateSelf();
  }
}

// Usage dans un widget
class NotesListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notesAsync = ref.watch(notesNotifierProvider);
    
    return notesAsync.when(
      data: (notes) => ListView.builder(...),
      loading: () => CircularProgressIndicator(),
      error: (error, stack) => ErrorWidget(error),
    );
  }
}
```

### Synchronisation offline

```dart
class SyncManager {
  Future<void> syncNotes() async {
    if (!await networkInfo.isConnected) {
      return;
    }
    
    // 1. Upload local changes
    final localChanges = await localDataSource.getPendingChanges();
    for (final change in localChanges) {
      await remoteDataSource.syncChange(change);
    }
    
    // 2. Download remote changes
    final remoteChanges = await remoteDataSource.getChanges();
    await localDataSource.applyChanges(remoteChanges);
  }
}
```

## 🚢 Déploiement

### Google Play Store

1. Créer un keystore de signature
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias upload
```

2. Configurer `android/key.properties`
3. Build l'app bundle
```bash
flutter build appbundle --release
```

4. Upload sur Google Play Console

### Apple App Store

1. Configurer le provisioning profile dans Xcode
2. Build l'application
```bash
flutter build ios --release
```

3. Archiver et uploader via Xcode

## 📝 Conventions de code

- Utiliser le style guide Dart officiel
- Nommer les fichiers en snake_case
- Nommer les classes en PascalCase
- Utiliser Freezed pour les modèles immutables
- Utiliser Riverpod pour le state management
- Documenter les fonctions publiques

## 📝 Licence

MIT

