# Prompt Hub — Frontend

Application Angular de partage et de découverte de prompts. Permet de parcourir, créer, éditer et voter sur des prompts organisés par catégories.

Projet réalisé à partir du tutoriel de **[Gaëtan Rouziès](https://www.youtube.com/@GaetanRouzies)**, puis personnalisé et étendu avec des fonctionnalités supplémentaires (authentification complète, système de votes, feedback utilisateur, optimisations de performance).

## Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| Angular | 21.2 | Framework frontend |
| TypeScript | 5.9 | Langage principal |
| RxJS | 7.8 | Programmation réactive |
| Vitest | 4.0 | Tests unitaires |
| Prettier | 3.8 | Formatage du code |
| SCSS | — | Styles avec variables CSS custom |

## Fonctionnalités

- **Authentification** — Inscription, connexion et déconnexion via JWT (cookies httpOnly)
- **CRUD de prompts** — Création, lecture, mise à jour et suppression
- **Restriction par auteur** — Seul le créateur d'un prompt peut le modifier ou le supprimer
- **Système de votes** — Upvote / downvote avec toggle (un seul vote actif par utilisateur)
- **Catégorisation** — Organisation des prompts par catégories
- **Thème clair / sombre** — Basculement avec persistance dans `localStorage`
- **Feedback utilisateur** — Notifications toast (succès, erreur, info)
- **Copie presse-papier** — Copie rapide du contenu d'un prompt
- **Responsive design** — Adapté mobile, tablette et desktop
- **Lazy loading** — Chargement différé des routes et des composants
- **`@defer` blocks** — Chargement viewport/idle des cards et du toast
- **OnPush** — Change detection optimisé sur tous les composants

## Architecture

```
src/app/
├── auth/
│   ├── auth-form/          # Page connexion / inscription
│   ├── auth.service.ts     # Gestion de l'état auth (signals)
│   ├── auth.guard.ts       # Guard fonctionnel de route
│   ├── auth.interceptor.ts # Injection withCredentials
│   └── user.model.ts       # Interface User
├── prompts/
│   ├── prompt-list/        # Liste des prompts (route principale)
│   ├── prompt-card/        # Carte individuelle (display + edit)
│   ├── prompt-form/        # Formulaire de création
│   ├── prompt-service.ts   # Appels API (CRUD + votes)
│   ├── prompt.models.ts    # Interface Prompt
│   ├── category-service.ts # Appels API catégories
│   └── category.models.ts  # Interface Category
├── shared/
│   ├── toast.service.ts    # Service de notifications (signals)
│   └── toast/              # Composant toast
├── navbar/                 # Barre de navigation
├── app.routes.ts           # Routing (lazy loading)
├── app.config.ts           # Providers (interceptors, router)
├── app.ts                  # Composant racine
└── theme.service.ts        # Gestion du thème clair/sombre
```

## Routes

| Chemin | Composant | Guard | Description |
|--------|-----------|-------|-------------|
| `/` | — | — | Redirection vers `/prompts` |
| `/auth` | AuthForm | — | Connexion / inscription |
| `/prompts` | PromptList | — | Liste des prompts |
| `/prompts/create` | PromptForm | `authGuard` | Création d'un prompt |
| `**` | — | — | Redirection vers `/prompts` |

## Démarrage

### Prérequis

- Node.js 18+
- npm 10+
- Le backend Prompt Hub lancé sur le port 3000

### Installation

```bash
npm install
```

### Lancement

```bash
# Mode développement
npm start
```

L'application est accessible sur `http://localhost:4200/`.

### Tests

```bash
# Lancer les tests (exécution unique)
npm test

# Build de production
npm run build
```

### Formatage

```bash
npm run format
```

## Configuration

Les fichiers d'environnement se trouvent dans `src/environments/` :

```typescript
// environment.development.ts
export const environment = {
  apiUrl: 'http://localhost:3000/'
}
```

L'authentification utilise des cookies httpOnly. L'intercepteur HTTP ajoute automatiquement `withCredentials: true` sur toutes les requêtes.

## Performance

Le bundle est optimisé avec les techniques suivantes :

- **Lazy loading des routes** — Chaque page est un chunk séparé (`auth-form`, `prompt-form`, `prompt-list`)
- **`@defer (on viewport)`** — Les prompt cards se chargent au scroll avec un skeleton placeholder
- **`@defer (on idle)`** — Le toast est chargé quand le navigateur est idle
- **`@defer (on immediate)`** — Le formulaire d'édition inline est chargé après le premier rendu
- **`ChangeDetectionStrategy.OnPush`** — Sur tous les composants (réduction des re-renders)
- **`computed()` signals** — Valeurs mémoïsées au lieu de getters classiques

## Remerciements

Projet initié à partir du tutoriel Angular de **[Gaëtan Rouziès](https://www.youtube.com/@GaetanRouzies)** — [Vidéo de la formation](https://www.youtube.com/watch?v=3llJm3LO1e4). La base du projet (initialisation, structure, concepts fondamentaux) provient de sa chaîne YouTube. Le projet a ensuite été personnalisé et étendu avec l'authentification complète, le système de votes, les guards, les feedbacks utilisateur et les optimisations de performance.
