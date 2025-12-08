import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getThemes,
  getStatuses,
  getPriorities,
} from '../services/api';
import './HomePage.css';

function HomePage() {
  // ===== ÉTATS =====
  // Les données récupérées du backend
  const [tasks, setTasks] = useState([]); // Liste de toutes les tâches
  const [themes, setThemes] = useState([]); // Liste des thèmes
  const [statuses, setStatuses] = useState([]); // Liste des statuts
  const [priorities, setPriorities] = useState([]); // Liste des priorités

  // Les états de l'interface
  const [loading, setLoading] = useState(true); // Est-ce qu'on charge les données ?
  const [error, setError] = useState(null); // Message d'erreur s'il y en a
  const [showForm, setShowForm] = useState(false); // Afficher le formulaire ?
  const [editingTask, setEditingTask] = useState(null); // Quelle tâche on modifie (null = nouvelle tâche)

  // Les filtres
  const [filters, setFilters] = useState({
    search: '', // Texte de recherche
    theme_id: '', // ID du thème filtré
    status_id: '', // ID du statut filtré
    priority_id: '', // ID de la priorité filtrée
  });
  const [sortBy, setSortBy] = useState('date_desc'); // Comment trier les tâches

  // ===== CHARGER LES DONNÉES AU DÉMARRAGE =====
  useEffect(() => {
    loadData();
  }, []);

  // Fonction pour charger toutes les données depuis le backend
  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // On charge toutes les données en même temps
      const tasksData = await getAllTasks();
      const themesData = await getThemes();
      const statusesData = await getStatuses();
      const prioritiesData = await getPriorities();

      // On met à jour les états avec les données reçues
      setTasks(tasksData);
      setThemes(themesData);
      setStatuses(statusesData);
      setPriorities(prioritiesData);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors du chargement. Vérifiez que le backend est démarré.');
    } finally {
      setLoading(false);
    }
  }

  // ===== CRÉER DES OBJETS POUR FACILITER L'ACCÈS =====
  // On transforme les tableaux en objets pour trouver rapidement un nom par ID
  // Exemple: themesMap[1] = "Work"
  const themesMap = {};
  themes.forEach((theme) => {
    themesMap[theme.id] = theme.name;
  });

  const statusesMap = {};
  statuses.forEach((status) => {
    statusesMap[status.Id] = status.Name;
  });

  const prioritiesMap = {};
  priorities.forEach((priority) => {
    prioritiesMap[priority.id] = priority.name;
  });

  // ===== FILTRER ET TRIER LES TÂCHES =====
  function getFilteredTasks() {
    let result = [...tasks]; // Copie de la liste des tâches

    // Filtre par recherche (titre ou description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((task) => {
        const titreMatch = task.titre.toLowerCase().includes(searchLower);
        const descMatch = task.description && task.description.toLowerCase().includes(searchLower);
        return titreMatch || descMatch;
      });
    }

    // Filtre par thème
    if (filters.theme_id) {
      result = result.filter((task) => task.theme_id === parseInt(filters.theme_id));
    }

    // Filtre par statut
    if (filters.status_id) {
      result = result.filter((task) => task.status_id === parseInt(filters.status_id));
    }

    // Filtre par priorité
    if (filters.priority_id) {
      result = result.filter((task) => task.priority_id === parseInt(filters.priority_id));
    }

    // Tri des tâches
    result.sort((a, b) => {
      if (sortBy === 'date_desc') {
        // Plus récent en premier
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === 'date_asc') {
        // Plus ancien en premier
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortBy === 'priority_desc') {
        // Priorité haute en premier
        return b.priority_id - a.priority_id;
      } else if (sortBy === 'priority_asc') {
        // Priorité basse en premier
        return a.priority_id - b.priority_id;
      } else if (sortBy === 'title_asc') {
        // Titre A-Z
        return a.titre.localeCompare(b.titre);
      } else if (sortBy === 'title_desc') {
        // Titre Z-A
        return b.titre.localeCompare(a.titre);
      }
      return 0;
    });

    return result;
  }

  const filteredTasks = getFilteredTasks();

  // ===== FONCTIONS POUR GÉRER LES TÂCHES =====

  // Créer une nouvelle tâche
  async function handleCreateTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]); // Ajouter la nouvelle tâche à la liste
      setShowForm(false); // Cacher le formulaire
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la création.');
      throw err;
    }
  }

  // Modifier une tâche existante
  async function handleUpdateTask(taskData) {
    try {
      const updatedTask = await updateTask(editingTask.Id, taskData);
      // Remplacer l'ancienne tâche par la nouvelle dans la liste
      const newTasks = tasks.map((task) =>
        task.Id === editingTask.Id ? updatedTask : task
      );
      setTasks(newTasks);
      setEditingTask(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la modification.');
      throw err;
    }
  }

  // Supprimer une tâche
  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId);
      // Retirer la tâche de la liste
      const newTasks = tasks.filter((task) => task.Id !== taskId);
      setTasks(newTasks);
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de la suppression.');
      throw err;
    }
  }

  // Changer le statut d'une tâche
  async function handleStatusChange(taskId, newStatusId) {
    try {
      // Trouver la tâche à modifier
      const task = tasks.find((t) => t.Id === taskId);
      if (!task) return;

      // Mettre à jour avec le nouveau statut
      const updatedTask = await updateTask(taskId, {
        ...task,
        status_id: newStatusId,
      });

      // Remplacer dans la liste
      const newTasks = tasks.map((t) => (t.Id === taskId ? updatedTask : t));
      setTasks(newTasks);
      setError(null);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors du changement de statut.');
    }
  }

  // Afficher le formulaire pour modifier une tâche
  function handleEditTask(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  // Cacher le formulaire
  function handleCancelForm() {
    setEditingTask(null);
    setShowForm(false);
  }

  // Afficher le formulaire pour créer une nouvelle tâche
  function handleNewTask() {
    setEditingTask(null);
    setShowForm(true);
  }

  // ===== AFFICHAGE =====
  return (
    <div className="home-page">
      {/* En-tête */}
      <header className="app-header">
        <h1 className="app-title">📋 Todolist OMA</h1>
        <p className="app-subtitle">Gérez vos tâches efficacement</p>
      </header>

      {/* Message d'erreur */}
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="error-close">
            ×
          </button>
        </div>
      )}

      {/* Contenu principal */}
      <main className="app-main">
        {/* Afficher le formulaire ou le bouton "Nouvelle tâche" */}
        {showForm ? (
          <TaskForm
            task={editingTask}
            themes={themes}
            statuses={statuses}
            priorities={priorities}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancelForm}
          />
        ) : (
          <button onClick={handleNewTask} className="btn-new-task">
            + Nouvelle tâche
          </button>
        )}

        {/* Barre de filtres (seulement si les données sont chargées) */}
        {!loading && (
          <FilterBar
            themes={themes}
            statuses={statuses}
            priorities={priorities}
            onFilterChange={setFilters}
            onSortChange={setSortBy}
          />
        )}

        {/* Liste des tâches */}
        <TaskList
          tasks={filteredTasks}
          themes={themesMap}
          statuses={statusesMap}
          priorities={prioritiesMap}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default HomePage;
