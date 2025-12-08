/**
 * Service API pour communiquer avec le backend
 * Toutes les fonctions retournent des Promises avec les données JSON
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Récupère toutes les tâches
 * @returns {Promise<Array>} Liste des tâches
 */
export const getAllTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
};

/**
 * Récupère une tâche par son ID
 * @param {number} id - ID de la tâche
 * @returns {Promise<Object>} Tâche
 */
export const getTaskById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${id}`);
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
 * @param {Object} taskData - Données de la tâche
 * @param {string} taskData.titre - Titre de la tâche
 * @param {string} taskData.description - Description de la tâche
 * @param {number} taskData.theme_id - ID du thème
 * @param {number} taskData.status_id - ID du statut
 * @param {number} taskData.priority_id - ID de la priorité
 * @returns {Promise<Object>} Tâche créée
 */
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
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
 * @param {number} id - ID de la tâche
 * @param {Object} taskData - Données de la tâche à mettre à jour
 * @returns {Promise<Object>} Tâche mise à jour
 */
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
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
 * @param {number} id - ID de la tâche
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/tasks/${id}`, {
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
 * @returns {Promise<Array>} Liste des thèmes
 */
export const getThemes = async () => {
  try {
    const response = await fetch(`${API_URL}/api/themes`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des thèmes:', error);
    throw error;
  }
};

/**
 * Récupère tous les statuts
 * @returns {Promise<Array>} Liste des statuts
 */
export const getStatuses = async () => {
  try {
    const response = await fetch(`${API_URL}/api/statuses`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des statuts:', error);
    throw error;
  }
};

/**
 * Récupère toutes les priorités
 * @returns {Promise<Array>} Liste des priorités
 */
export const getPriorities = async () => {
  try {
    const response = await fetch(`${API_URL}/api/priorities`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des priorités:', error);
    throw error;
  }
};

