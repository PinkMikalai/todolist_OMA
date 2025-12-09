/**
 * Service API pour communiquer avec le backend
 * Adapté pour utiliser /api/todos et le port 4000
 */

// Port par défaut du backend : 4000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Récupère toutes les tâches
 */
export const getAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/todos`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    // Si le backend retourne un objet avec un message, adapter selon votre format
    // Pour l'instant, on suppose qu'il retourne directement un tableau
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
};

/**
 * Récupère une tâche par son ID
 */
export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération de la tâche ${id}:`, error);
    throw error;
  }
};

/**
 * Crée une nouvelle tâche
 */
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    throw error;
  }
};

/**
 * Met à jour une tâche existante
 */
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la tâche ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime une tâche
 */
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression de la tâche ${id}:`, error);
    throw error;
  }
};

/**
 * Récupère tous les thèmes
 * Données statiques basées sur votre base de données
 * (Pas de route backend pour l'instant)
 */
export const getThemes = async () => {
  // Données statiques correspondant à votre base de données
  return [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Health' },
    { id: 4, name: 'Hobbies' },
    { id: 5, name: 'Shopping' },
    { id: 6, name: 'Finance' },
    { id: 7, name: 'Education' },
  ];
};

/**
 * Récupère tous les statuts
 * Données statiques basées sur votre base de données
 * (Pas de route backend pour l'instant)
 */
export const getStatuses = async () => {
  // Données statiques correspondant à votre base de données
  return [
    { Id: 1, Name: 'To do' },
    { Id: 2, Name: 'In progress' },
    { Id: 3, Name: 'Completed' },
  ];
};

/**
 * Récupère toutes les priorités
 * Données statiques basées sur votre base de données
 * (Pas de route backend pour l'instant)
 */
export const getPriorities = async () => {
  // Données statiques correspondant à votre base de données
  return [
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' },
  ];
};
