import { useState } from 'react';
import './FilterBar.css';

// Composant pour filtrer et trier les tâches
function FilterBar({ themes, statuses, priorities, onFilterChange, onSortChange }) {
  // État des filtres
  const [filters, setFilters] = useState({
    search: '',
    theme_id: '',
    status_id: '',
    priority_id: '',
  });

  const [sortBy, setSortBy] = useState('date_desc');

  // Fonction appelée quand on change un filtre
  function handleFilterChange(name, value) {
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters); // Envoyer au parent
  }

  // Fonction appelée quand on change le tri
  function handleSortChange(e) {
    const newSort = e.target.value;
    setSortBy(newSort);
    onSortChange(newSort); // Envoyer au parent
  }

  // Réinitialiser tous les filtres
  function handleReset() {
    const resetFilters = {
      search: '',
      theme_id: '',
      status_id: '',
      priority_id: '',
    };
    setFilters(resetFilters);
    setSortBy('date_desc');
    onFilterChange(resetFilters);
    onSortChange('date_desc');
  }

  // Vérifier s'il y a des filtres actifs
  const hasActiveFilters =
    filters.search ||
    filters.theme_id ||
    filters.status_id ||
    filters.priority_id ||
    sortBy !== 'date_desc';

  return (
    <div className="filter-bar">
      <div className="filter-section">
        {/* Recherche par texte */}
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">
            Recherche
          </label>
          <input
            type="text"
            id="search"
            className="filter-input"
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        {/* Filtre par thème */}
        <div className="filter-group">
          <label htmlFor="theme_filter" className="filter-label">
            Thème
          </label>
          <select
            id="theme_filter"
            className="filter-select"
            value={filters.theme_id}
            onChange={(e) => handleFilterChange('theme_id', e.target.value)}
          >
            <option value="">Tous les thèmes</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par statut */}
        <div className="filter-group">
          <label htmlFor="status_filter" className="filter-label">
            Statut
          </label>
          <select
            id="status_filter"
            className="filter-select"
            value={filters.status_id}
            onChange={(e) => handleFilterChange('status_id', e.target.value)}
          >
            <option value="">Tous les statuts</option>
            {statuses.map((status) => (
              <option key={status.Id} value={status.Id}>
                {status.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par priorité */}
        <div className="filter-group">
          <label htmlFor="priority_filter" className="filter-label">
            Priorité
          </label>
          <select
            id="priority_filter"
            className="filter-select"
            value={filters.priority_id}
            onChange={(e) => handleFilterChange('priority_id', e.target.value)}
          >
            <option value="">Toutes les priorités</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tri */}
        <div className="filter-group">
          <label htmlFor="sort" className="filter-label">
            Trier par
          </label>
          <select
            id="sort"
            className="filter-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date_desc">Plus récent</option>
            <option value="date_asc">Plus ancien</option>
            <option value="priority_desc">Priorité haute</option>
            <option value="priority_asc">Priorité basse</option>
            <option value="title_asc">Titre A-Z</option>
            <option value="title_desc">Titre Z-A</option>
          </select>
        </div>

        {/* Bouton réinitialiser (seulement si des filtres sont actifs) */}
        {hasActiveFilters && (
          <div className="filter-group">
            <button
              type="button"
              onClick={handleReset}
              className="btn-reset"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
