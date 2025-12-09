import TaskCard from './TaskCard';
import './TaskList.css';

// Composant qui affiche la liste des tâches
function TaskList({
  tasks,
  themes,
  statuses,
  priorities,
  onEdit,
  onDelete,
  onStatusChange,
  loading,
}) {
  // Afficher un message de chargement
  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des tâches...</p>
      </div>
    );
  }

  // Afficher un message si aucune tâche
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>Aucune tâche trouvée.</p>
        <p className="empty-hint">Créez votre première tâche en utilisant le formulaire ci-dessus.</p>
      </div>
    );
  }

  // Afficher la liste des tâches
  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="task-list-title">
          Mes tâches <span className="task-count">({tasks.length})</span>
        </h2>
      </div>
      <div className="task-list-grid">
        {tasks.map((task) => {
          // Le backend utilise 'id' en minuscule, mais on gère les deux cas
          const taskId = task.id || task.Id;
          return (
            <TaskCard
              key={taskId}
              task={task}
              themes={themes}
              statuses={statuses}
              priorities={priorities}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TaskList;
