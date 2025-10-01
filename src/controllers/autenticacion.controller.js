const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

// Simulamos una base de datos de usuarios con contraseñas hasheadas
let usuarios = [
  {
    id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    nombre: "Estiven Cataño",
    email: "estiven@example.com",
    contraseña: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    rol: "usuario",
    fechaCreacion: "2025-09-12T12:00:00Z"
  }
];

function registrarUsuario(req, res) {
  const { nombre, email, contraseña, rol } = req.body;
  
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ 
      error: 'Nombre, email y contraseña son requeridos' 
    });
  }
  
  // Verificar si el usuario ya existe
  const usuarioExistente = usuarios.find(u => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ 
      error: 'Ya existe un usuario con este email' 
    });
  }
  
  // Hash de la contraseña
  const saltRounds = 10;
  const contraseñaHasheada = bcrypt.hashSync(contraseña, saltRounds);
  
  const nuevoUsuario = {
    id: `${Date.now()}`,
    nombre,
    email,
    contraseña: contraseñaHasheada,
    rol: rol || 'usuario',
    fechaCreacion: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  
  // Crear token JWT
  const token = jwt.sign(
    { 
      id: nuevoUsuario.id, 
      email: nuevoUsuario.email, 
      rol: nuevoUsuario.rol 
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
  
  // No devolver la contraseña en la respuesta
  const { contraseña: _, ...usuarioSinContraseña } = nuevoUsuario;
  
  res.status(201).json({
    mensaje: 'Usuario registrado exitosamente',
    usuario: usuarioSinContraseña,
    token
  });
}

function iniciarSesion(req, res) {
  const { email, contraseña } = req.body;
  
  if (!email || !contraseña) {
    return res.status(400).json({ 
      error: 'Email y contraseña son requeridos' 
    });
  }
  
  // Buscar usuario por email
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ 
      error: 'Credenciales inválidas' 
    });
  }
  
  // Verificar contraseña
  const contraseñaValida = bcrypt.compareSync(contraseña, usuario.contraseña);
  if (!contraseñaValida) {
    return res.status(401).json({ 
      error: 'Credenciales inválidas' 
    });
  }
  
  // Crear token JWT
  const token = jwt.sign(
    { 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
  
  // No devolver la contraseña en la respuesta
  const { contraseña: _, ...usuarioSinContraseña } = usuario;
  
  res.status(200).json({
    mensaje: 'Inicio de sesión exitoso',
    usuario: usuarioSinContraseña,
    token
  });
}

function verificarToken(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acceso requerido' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const usuario = usuarios.find(u => u.id === decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
    
    const { contraseña: _, ...usuarioSinContraseña } = usuario;
    
    res.status(200).json({
      mensaje: 'Token válido',
      usuario: usuarioSinContraseña
    });
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido o expirado' 
    });
  }
}

function renovarToken(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acceso requerido' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const usuario = usuarios.find(u => u.id === decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
    
    // Crear nuevo token
    const nuevoToken = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        rol: usuario.rol 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    const { contraseña: _, ...usuarioSinContraseña } = usuario;
    
    res.status(200).json({
      mensaje: 'Token renovado exitosamente',
      usuario: usuarioSinContraseña,
      token: nuevoToken
    });
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido o expirado' 
    });
  }
}

function cerrarSesion(req, res) {
  // En un sistema real, aquí podrías invalidar el token en una blacklist
  // Por ahora solo devolvemos un mensaje de éxito
  res.status(200).json({
    mensaje: 'Sesión cerrada exitosamente'
  });
}

// Middleware para verificar autenticación
function verificarAutenticacion(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Token de acceso requerido' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const usuario = usuarios.find(u => u.id === decoded.id);
    
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
    
    // Agregar información del usuario al request
    req.usuario = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre
    };
    
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido o expirado' 
    });
  }
}

// Middleware para verificar roles
function verificarRol(rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ 
        error: 'Usuario no autenticado' 
      });
    }
    
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción' 
      });
    }
    
    next();
  };
}

module.exports = {
  registrarUsuario,
  iniciarSesion,
  verificarToken,
  renovarToken,
  cerrarSesion,
  verificarAutenticacion,
  verificarRol,
  usuarios // Exportar para uso en otros controladores
};
