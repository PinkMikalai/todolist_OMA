import { useState, useEffect } from 'react';
import './TaskForm.css';

// Composant formulaire pour créer ou modifier une tâche
function TaskForm({ task, themes, statuses, priorities, onSubmit, onCancel }) {
  // État du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    theme_id: '',
    status_id: '',
    priority_id: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quand on modifie une tâche, remplir le formulaire avec ses données
  useEffect(() => {
    if (task) {
      // Mode modification : remplir avec les données de la tâche
      setFormData({
        titre: task.titre || '',
        description: task.description || '',
        theme_id: task.theme_id || '',
        status_id: task.status_id || '',
        priority_id: task.priority_id || '',
      });
    } else {
      // Mode création : valeurs par défaut
      setFormData({
        titre: '',
        description: '',
        theme_id: themes.length > 0 ? themes[0].id : '',
        status_id: statuses.length > 0 ? statuses[0].Id : '',
        priority_id: priorities.length > 0 ? priorities[0].id : '',
      });
    }
    setErrors({});
  }, [task, themes, statuses, priorities]);

  // Fonction appelée quand on tape dans un champ
  function handleChange(e) {
    const { name, value } = e.target;
    
    // Convertir en nombre pour les IDs
    const newValue = name === 'theme_id' || name === 'status_id' || name === 'priority_id'
      ? parseInt(value)
      : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  }

  // Vérifier que le formulaire est valide
  function validate() {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est requis';
    }

    if (!formData.theme_id) {
      newErrors.theme_id = 'Le thème est requis';
    }

    if (!formData.status_id) {
      newErrors.status_id = 'Le statut est requis';
    }

    if (!formData.priority_id) {
      newErrors.priority_id = 'La priorité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Fonction appelée quand on soumet le formulaire
  async function handleSubmit(e) {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Vérifier que tout est valide
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      
      // Si c'est une nouvelle tâche, réinitialiser le formulaire
      if (!task) {
        setFormData({
          titre: '',
          description: '',
          theme_id: themes.length > 0 ? themes[0].id : '',
          status_id: statuses.length > 0 ? statuses[0].Id : '',
          priority_id: priorities.length > 0 ? priorities[0].id : '',
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="task-form-container">
      <h2 className="form-title">{task ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        {/* Champ Titre */}
        <div className="form-group">
          <label htmlFor="titre" className="form-label">
            Titre <span className="required">*</span>
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className={`form-input ${errors.titre ? 'error' : ''}`}
            placeholder="Entrez le titre de la tâche"
          />
          {errors.titre && <span className="error-message">{errors.titre}</span>}
        </div>

        {/* Champ Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
            placeholder="Entrez la description (optionnel)"
          />
        </div>

        {/* Champs Thème, Statut, Priorité */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="theme_id" className="form-label">
              Thème <span className="required">*</span>
            </label>
            <select
              id="theme_id"
              name="theme_id"
              value={formData.theme_id}
              onChange={handleChange}
              className={`form-select ${errors.theme_id ? 'error' : ''}`}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            {errors.theme_id && (
              <span className="error-message">{errors.theme_id}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status_id" className="form-label">
              Statut <span className="required">*</span>
            </label>
            <select
              id="status_id"
              name="status_id"
              value={formData.status_id}
              onChange={handleChange}
              className={`form-select ${errors.status_id ? 'error' : ''}`}
            >
              {statuses.map((status) => (
                <option key={status.Id} value={status.Id}>
                  {status.Name}
                </option>
              ))}
            </select>
            {errors.status_id && (
              <span className="error-message">{errors.status_id}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority_id" className="form-label">
              Priorité <span className="required">*</span>
            </label>
            <select
              id="priority_id"
              name="priority_id"
              value={formData.priority_id}
              onChange={handleChange}
              className={`form-select ${errors.priority_id ? 'error' : ''}`}
            >
              {priorities.map((priority) => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
            {errors.priority_id && (
              <span className="error-message">{errors.priority_id}</span>
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-cancel"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Enregistrement...'
              : task
                ? 'Modifier'
                : 'Créer'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
