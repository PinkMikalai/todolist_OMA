# Todolist Frontend

Application React pour gérer vos tâches avec filtres, recherche et tri.

## 🚀 Installation

```bash
# Installer les dépendances
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet avec :

```env
VITE_API_URL=http://localhost:3000
```

Remplacez le port si votre backend utilise un autre port.

## 🏃 Démarrage

```bash
# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite).

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── TaskCard.jsx    # Carte d'affichage d'une tâche
│   ├── TaskForm.jsx    # Formulaire de création/modification
│   ├── FilterBar.jsx   # Barre de filtres et recherche
│   └── TaskList.jsx    # Liste des tâches
├── pages/              # Pages de l'application
│   └── HomePage.jsx    # Page principale
├── services/           # Services API
│   └── api.js          # Fonctions pour appeler le backend
└── utils/              # Utilitaires
    └── constants.js    # Constantes (couleurs, options de tri)
```

## 🎯 Fonctionnalités

- ✅ Création, modification et suppression de tâches
- 🔍 Recherche par titre ou description
- 🎨 Filtrage par thème, statut et priorité
- 📊 Tri par date, priorité ou titre
- 🎯 Changement de statut directement depuis la carte
- 📱 Design responsive

## 🔌 API Backend requise

Le frontend s'attend à ce que le backend expose les endpoints suivants :

- `GET /api/tasks` - Récupérer toutes les tâches
- `GET /api/tasks/:id` - Récupérer une tâche par ID
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche
- `GET /api/themes` - Récupérer tous les thèmes
- `GET /api/statuses` - Récupérer tous les statuts
- `GET /api/priorities` - Récupérer toutes les priorités

## 📦 Build pour production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

## 🧪 Linter

```bash
npm run lint
```
