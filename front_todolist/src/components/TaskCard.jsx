import { useState } from 'react';
import { PRIORITY_COLORS, PRIORITY_BG_COLORS, STATUS_COLORS, STATUS_BG_COLORS } from '../utils/constants';
import './TaskCard.css';

// Composant qui affiche une carte pour une tâche
function TaskCard({ task, themes, statuses, priorities, onEdit, onDelete, onStatusChange }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Trouver les noms à partir des IDs
  const themeName = themes[task.theme_id] || 'Inconnu';
  const statusName = statuses[task.status_id] || 'Inconnu';
  const priorityName = priorities[task.priority_id] || 'Inconnu';

  // Couleurs selon la priorité et le statut
  const priorityColor = PRIORITY_COLORS[priorityName] || '#6b7280';
  const priorityBgColor = PRIORITY_BG_COLORS[priorityName] || '#f3f4f6';
  const statusColor = STATUS_COLORS[statusName] || '#6b7280';
  const statusBgColor = STATUS_BG_COLORS[statusName] || '#f3f4f6';

  // Fonction pour supprimer une tâche
  async function handleDelete() {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.Id);
      } finally {
        setIsDeleting(false);
      }
    }
  }

  // Fonction quand on change le statut
  async function handleStatusChange(e) {
    const newStatusId = parseInt(e.target.value);
    if (newStatusId !== task.status_id) {
      await onStatusChange(task.Id, newStatusId);
    }
  }

  // Formater une date pour l'affichage
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className={`task-card ${isDeleting ? 'deleting' : ''}`}>
      {/* En-tête avec titre et priorité */}
      <div className="task-card-header">
        <h3 className="task-title">{task.titre}</h3>
        <span
          className="priority-badge"
          style={{
            backgroundColor: priorityBgColor,
            color: priorityColor,
            borderColor: priorityColor,
          }}
        >
          {priorityName}
        </span>
      </div>

      {/* Description si elle existe */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Informations (thème et statut) */}
      <div className="task-card-meta">
        <div className="task-meta-item">
          <span className="meta-label">Thème:</span>
          <span className="meta-value theme-badge">{themeName}</span>
        </div>
        <div className="task-meta-item">
          <span className="meta-label">Statut:</span>
          <select
            className="status-select"
            value={task.status_id}
            onChange={handleStatusChange}
            style={{
              backgroundColor: statusBgColor,
              color: statusColor,
              borderColor: statusColor,
            }}
          >
            {Object.entries(statuses).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pied de page avec dates et boutons */}
      <div className="task-card-footer">
        <div className="task-dates">
          <small className="task-date">
            Créée le: {formatDate(task.created_at)}
          </small>
          {task.updated_at !== task.created_at && (
            <small className="task-date">
              Modifiée le: {formatDate(task.updated_at)}
            </small>
          )}
        </div>
        <div className="task-actions">
          <button
            className="btn btn-edit"
            onClick={() => onEdit(task)}
            disabled={isDeleting}
          >
            Modifier
          </button>
          <button
            className="btn btn-delete"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
