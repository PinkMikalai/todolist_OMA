const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controller/todolist.controller.js');
// Router class
class Router {
  constructor() {
    this.routes = [];
  }

  // enregistre une route
  addRoute(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  // gère les requêtes entrantes
  async handle(req, res, method, path) {
    // trouve la route correspondante
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      if (route.method === method) {
        const match = this.matchPath(route.path, path);
        if (match) {
          matchedRoute = route;
          params = match.params || {};
          break;
        }
      }
    }

    if (matchedRoute) {
      try {
        // Ajouter les paramètres à req
        req.params = params;
        await matchedRoute.handler(req, res);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  }

  // correspondance de chemin avec support des paramètres dynamiques
  matchPath(routePath, requestPath) {
    // Correspondance exacte
    if (routePath === requestPath) {
      return { match: true, params: {} };
    }

    // Gestion des paramètres dynamiques (ex: /api/todos/:id)
    const routeParts = routePath.split('/');
    const requestParts = requestPath.split('/');

    if (routeParts.length !== requestParts.length) {
      return false;
    }

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        // C'est un paramètre dynamique
        const paramName = routeParts[i].substring(1);
        params[paramName] = requestParts[i];
      } else if (routeParts[i] !== requestParts[i]) {
        // Les parties ne correspondent pas
        return false;
      }
    }

    return { match: true, params };
  }

  // méthodes de convenance
  get(path, handler) {
    this.addRoute('GET', path, handler);
  }

  post(path, handler) {
    this.addRoute('POST', path, handler);
  }

  put(path, handler) {
    this.addRoute('PUT', path, handler);
  }

  delete(path, handler) {
    this.addRoute('DELETE', path, handler);
  }
}

const router = new Router();

// affiche les taches
router.get('/api/todos', getTasks);
router.get('/api/todos/:id', getTaskById);


  // crée  modif une tache
router.post('/api/todos', createTask);
router.put('/api/todos/:id', updateTask);


  // supprime une tache
router.delete('/api/todos/:id', deleteTask);

module.exports = router;