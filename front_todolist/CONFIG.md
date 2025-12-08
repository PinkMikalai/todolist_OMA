# Configuration

## Variables d'environnement

Créez un fichier `.env` à la racine du dossier `front_todolist` avec le contenu suivant :

```env
VITE_API_URL=http://localhost:3000
```

**Important :** Remplacez `3000` par le port sur lequel votre backend écoute.

## Note pour Git

Le fichier `.env` ne doit **PAS** être commité dans Git (il devrait être dans `.gitignore`).

Pour que vos collaborateurs puissent configurer leur environnement, créez un fichier `.env.example` avec les valeurs par défaut (sans informations sensibles).

