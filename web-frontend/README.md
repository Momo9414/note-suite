# 🎨 Frontend Angular - Notes Collaboratives

Application web Angular pour la gestion de notes collaboratives.

## 📋 Table des matières

- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement](#lancement)
- [Build](#build)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)

## 🛠️ Technologies

| Technologie | Version | Description |
|------------|---------|-------------|
| Angular | 17.x | Framework frontend |
| TypeScript | 5.2.x | Langage |
| Angular Material | 17.x | Composants UI |
| RxJS | 7.8.x | Programmation réactive |
| ngx-markdown | 17.x | Rendu Markdown |
| Jasmine/Karma | - | Tests unitaires |
| Cypress | 13.x | Tests E2E |

## 📦 Prérequis

- Node.js 18.x LTS ou supérieur
- npm 9.x ou supérieur
- Angular CLI 17.x

```bash
npm install -g @angular/cli@17
```

## 🚀 Installation

```bash
cd web-frontend
npm install
```

## ⚙️ Configuration

### Environnements

Créer les fichiers d'environnement :

**src/environments/environment.ts** (Development)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  apiTimeout: 30000,
  tokenKey: 'notes_auth_token',
  refreshTokenKey: 'notes_refresh_token',
  enableDarkMode: true
};
```

**src/environments/environment.prod.ts** (Production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.notes-app.com/api/v1',
  apiTimeout: 30000,
  tokenKey: 'notes_auth_token',
  refreshTokenKey: 'notes_refresh_token',
  enableDarkMode: true
};
```

## 🏃 Lancement

### Mode développement

```bash
npm start
# ou
ng serve
```

Application accessible sur : **http://localhost:4200**

### Mode développement avec proxy API

```bash
ng serve --proxy-config proxy.conf.json
```

**proxy.conf.json**
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

### Watch mode

```bash
npm run watch
```

## 🔨 Build

### Build de développement

```bash
npm run build
```

### Build de production

```bash
npm run build:prod
```

Les fichiers de build seront dans `dist/`

## 🧪 Tests

### Tests unitaires

```bash
# Exécuter les tests
npm test

# Tests avec couverture
npm run test:coverage

# Rapport : coverage/index.html
```

### Tests E2E

```bash
npm run e2e
```

### Linting

```bash
# Vérifier le code
npm run lint

# Corriger automatiquement
npm run lint:fix
```

### Formatage

```bash
npm run format
```

## 📁 Structure du projet

```
web-frontend/
├── src/
│   ├── app/
│   │   ├── features/                 # Modules fonctionnels
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── auth.model.ts
│   │   │   │   └── auth.module.ts
│   │   │   │
│   │   │   ├── notes/
│   │   │   │   ├── components/
│   │   │   │   │   ├── note-list/
│   │   │   │   │   ├── note-detail/
│   │   │   │   │   ├── note-editor/
│   │   │   │   │   └── note-viewer/
│   │   │   │   ├── services/
│   │   │   │   │   └── note.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── note.model.ts
│   │   │   │   └── notes.module.ts
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── components/
│   │   │       │   ├── header/
│   │   │       │   ├── sidebar/
│   │   │       │   └── footer/
│   │   │       └── shared.module.ts
│   │   │
│   │   ├── core/                     # Services singleton
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── http.service.ts
│   │   │   │   ├── storage.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   └── core.module.ts
│   │   │
│   │   ├── shared/                   # Composants partagés
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   ├── modal/
│   │   │   │   ├── spinner/
│   │   │   │   └── toast/
│   │   │   ├── directives/
│   │   │   │   └── highlight.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   └── truncate.pipe.ts
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/                       # Ressources statiques
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── environments/                 # Configuration environnement
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles/                       # Styles globaux
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   └── styles.scss
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── package.json
├── Dockerfile
├── nginx.conf
└── README.md
```

## 🎨 Architecture

### Modules

- **CoreModule** : Services singleton (guards, interceptors)
- **SharedModule** : Composants/directives/pipes réutilisables
- **FeatureModules** : Modules fonctionnels (auth, notes, etc.)

### Services

```typescript
// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      credentials
    );
  }
}
```

### Guards

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/auth/login']);
  return false;
};
```

### Interceptors

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('notes_auth_token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
```

## 🚢 Déploiement

### Docker

```bash
docker build -t notes-frontend:1.0.0 .
docker run -p 4200:80 notes-frontend:1.0.0
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build:prod
npm install -g netlify-cli
netlify deploy --prod --dir=dist/notes-frontend-angular/browser
```

## 📝 Conventions de code

- Utiliser le style guide Angular officiel
- Nommer les composants avec le suffixe `.component.ts`
- Nommer les services avec le suffixe `.service.ts`
- Utiliser des interfaces TypeScript pour les modèles
- Documenter les fonctions publiques avec JSDoc

## 📝 Licence

MIT

