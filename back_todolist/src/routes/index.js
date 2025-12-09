import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controller/todolist.controller.js';
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
    const route = this.routes.find(r => {
      const pathMatch = this.matchPath(r.path, path);
      return r.method === method && pathMatch;
    });

    if (route) {
      try {
        await route.handler(req, res);
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  }

  // correspondance de chemin simple (supporte les correspondances exactes)
  matchPath(routePath, requestPath) {
    return routePath === requestPath;
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

export default router;