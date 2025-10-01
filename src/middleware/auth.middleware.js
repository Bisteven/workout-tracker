const { verificarAutenticacion } = require('../controllers/autenticacion.controller');

// Middleware para aplicar autenticación a rutas específicas
function aplicarAutenticacion(router) {
  // Aplicar middleware de autenticación a todas las rutas del router
  router.use(verificarAutenticacion);
  return router;
}

module.exports = {
  aplicarAutenticacion
};

