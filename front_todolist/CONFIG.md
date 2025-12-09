# Configuration

## Variables d'environnement

Créez un fichier `.env` à la racine du dossier `front_todolist` avec le contenu suivant :

```env
VITE_API_URL=http://localhost:4000
```

**Important :** Le port par défaut est `4000` (port du backend). Changez-le si votre backend utilise un autre port.

## Note pour Git

Le fichier `.env` ne doit **PAS** être commité dans Git (il devrait être dans `.gitignore`).

Pour que vos collaborateurs puissent configurer leur environnement, créez un fichier `.env.example` avec les valeurs par défaut (sans informations sensibles).

