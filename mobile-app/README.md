# Application Mobile React Native – Notes Suite

Client mobile Expo pour consulter et éditer les notes synchronisées avec l’API Spring Boot.

## Stack
- React Native 0.81 (Expo SDK 54)
- TypeScript 5.9
- React Navigation (stack)
- Axios + interceptors JWT
- AsyncStorage pour la persistance locale

## Prérequis
- Node.js 18+
- npm 9+ ou Yarn
- Expo CLI (`npm install -g expo-cli`) si besoin
- Accès réseau au backend (`http://<host>:8080/api/v1`)

## Installation
```bash
cd mobile-app
npm install
```

## Configuration API
L’URL de base est définie dans `src/core/api/apiClient.ts` :
```ts
const API_BASE_URL = 'http://192.168.1.57:8080/api/v1';
```
Adaptez-la à votre machine (par ex. IP locale accessible par les devices).

## Lancement
```bash
npm start           # démarre Expo
npm run android     # ouvre un émulateur / device Android
npm run ios         # nécessite macOS + Xcode
```
Scanner le QR code avec l’app Expo Go ou utiliser un émulateur configuré.

## Scripts utiles
```bash
npm run web         # Expo web
npm run lint        # si ESLint configuré
```

## Fonctionnalités clés
- Connexion / inscription avec stockage JWT dans AsyncStorage
- Liste paginée avec recherche texte
- Consultation, création, mise à jour et suppression de notes
- Consultation des notes partagées via token
- Génération de liens de partage depuis les écrans de détail
- Navigation stack + bottom actions, formulaires contrôlés et validations basiques

## Architecture
```
mobile-app/
├── app.json, package.json
├── App.tsx                # Navigation principale
├── src/
│   ├── core/
│   │   ├── api/          # Axios + interceptors JWT
│   │   ├── navigation/   # configuration Router
│   │   ├── storage/      # gestion des tokens
│   │   └── types/        # modèles partagés
│   ├── features/
│   │   ├── auth/         # écrans login/register + service
│   │   └── notes/        # listes, détail, formulaires, service
│   └── shared/           # composants communs
└── assets/               # icônes Expo
```

## Limitations
- Mode offline-first non finalisé (cache local limité à l’authentification)
- Pas de synchronisation différée ni résolution de conflits
- Les notifications locales et tests automatisés ne sont pas encore couverts

Documentez ici toute modification sur les endpoints consommés ou sur les prérequis mobiles afin d’aligner l’équipe web et backend.

