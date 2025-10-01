# API de Seguimiento de Entrenamientos (Node.js/Express)

## Descripción

Sistema backend completo para seguimiento de entrenamientos que incluye:
- Gestión de usuarios con autenticación JWT
- Catálogo de ejercicios individuales
- Creación y gestión de rutinas de entrenamiento
- Asociación de ejercicios con rutinas (sets, reps, peso)
- Programación de horarios de entrenamiento
- Seguimiento de progreso y estadísticas

## Instalación y Ejecución

```bash
npm install
npm run dev
```

Servidor: `http://localhost:3000`

## Recursos Principales

Base: `/api/v1`

### 1. Usuarios (`/usuarios`)
- **GET** `/usuarios` — Lista de usuarios (filtros: `rol`, `busqueda`)
- **GET** `/usuarios/:id` — Detalle de usuario
- **POST** `/usuarios` — Crear usuario
- **PUT** `/usuarios/:id` — Actualización completa
- **PATCH** `/usuarios/:id` — Actualización parcial
- **DELETE** `/usuarios/:id` — Eliminar usuario

### 2. Ejercicios (`/ejercicios`)
- **GET** `/ejercicios` — Lista de ejercicios (filtros: `grupoMuscular`, `busqueda`, `limite`)
- **GET** `/ejercicios/:id` — Detalle de ejercicio
- **POST** `/ejercicios` — Crear ejercicio
- **PUT** `/ejercicios/:id` — Actualización completa
- **PATCH** `/ejercicios/:id` — Actualización parcial
- **DELETE** `/ejercicios/:id` — Eliminar ejercicio

### 3. Rutinas (`/rutinas`)
- **GET** `/rutinas` — Lista de rutinas (filtros: `dificultad`, `busqueda`, `limite`, `categoria`)
- **GET** `/rutinas/:id` — Detalle de rutina
- **POST** `/rutinas` — Crear rutina
- **PUT** `/rutinas/:id` — Actualización completa
- **PATCH** `/rutinas/:id` — Actualización parcial
- **DELETE** `/rutinas/:id` — Eliminar rutina

### 4. Ejercicios de Rutinas (`/rutinas/:rutinaId/ejercicios`)
- **GET** `/rutinas/:rutinaId/ejercicios` — Lista de ejercicios de una rutina
- **GET** `/rutinas/:rutinaId/ejercicios/:id` — Detalle de ejercicio en rutina
- **POST** `/rutinas/:rutinaId/ejercicios` — Agregar ejercicio a rutina
- **PUT** `/rutinas/:rutinaId/ejercicios/:id` — Actualizar ejercicio en rutina
- **PATCH** `/rutinas/:rutinaId/ejercicios/:id` — Actualización parcial
- **DELETE** `/rutinas/:rutinaId/ejercicios/:id` — Eliminar ejercicio de rutina
- **PUT** `/rutinas/:rutinaId/ejercicios/reordenar` — Reordenar ejercicios

### 5. Horarios (`/horarios`)
- **GET** `/horarios` — Lista de horarios (filtros: `usuarioId`, `rutinaId`, `fecha`, `estado`)
- **GET** `/horarios/proximos` — Próximos entrenamientos
- **GET** `/horarios/dia/:fecha` — Horarios de un día específico
- **GET** `/horarios/:id` — Detalle de horario
- **POST** `/horarios` — Crear horario
- **PUT** `/horarios/:id` — Actualización completa
- **PATCH** `/horarios/:id` — Actualización parcial
- **DELETE** `/horarios/:id` — Eliminar horario

### 6. Progreso (`/progreso`)
- **GET** `/progreso` — Lista de registros de progreso
- **GET** `/progreso/resumen` — Resumen de progreso del usuario
- **GET** `/progreso/ejercicio/estadisticas` — Estadísticas de ejercicio específico
- **GET** `/progreso/:id` — Detalle de progreso
- **POST** `/progreso` — Registrar progreso
- **PUT** `/progreso/:id` — Actualización completa
- **DELETE** `/progreso/:id` — Eliminar progreso

## Ejemplos de Uso

### Crear Usuario
```json
POST /api/v1/usuarios
{
  "nombre": "Carlos Pérez",
  "email": "carlos@example.com",
  "rol": "usuario"
}
```

### Crear Ejercicio
```json
POST /api/v1/ejercicios
{
  "nombre": "Press de Banca",
  "grupoMuscular": "pecho",
  "dificultad": "intermedio",
  "descripcion": "Ejercicio para desarrollar el pecho y tríceps",
  "instrucciones": "Acuéstate en el banco, baja la barra al pecho y empuja hacia arriba"
}
```

### Crear Rutina
```json
POST /api/v1/rutinas
{
  "nombre": "Rutina de Fuerza",
  "dificultad": "intermedio",
  "descripcion": "Rutina enfocada en ganancia de fuerza",
  "duracionEstimada": 90,
  "categoria": "fuerza"
}
```

### Agregar Ejercicio a Rutina
```json
POST /api/v1/rutinas/w1/ejercicios
{
  "ejercicioId": "e1",
  "series": 4,
  "repeticiones": 8,
  "peso": 60,
  "tiempoDescanso": 120,
  "orden": 1,
  "notas": "Mantener forma estricta"
}
```

### Programar Entrenamiento
```json
POST /api/v1/horarios
{
  "usuarioId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "rutinaId": "w1",
  "fecha": "2025-09-20",
  "horaInicio": "08:00",
  "horaFin": "09:30",
  "notas": "Entrenamiento matutino",
  "recordatorio": true
}
```

### Registrar Progreso
```json
POST /api/v1/progreso
{
  "usuarioId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "rutinaId": "w1",
  "fecha": "2025-09-20",
  "duracionReal": 85,
  "caloriasQuemadas": 450,
  "peso": 72.5,
  "notas": "Entrenamiento excelente",
  "ejerciciosCompletados": [
    {
      "ejercicioId": "e1",
      "series": 4,
      "repeticiones": 8,
      "peso": 60,
      "completado": true,
      "pesoUsado": 65,
      "repeticionesRealizadas": 8
    }
  ]
}
```

## Endpoints Adicionales

- **GET** `/api` — Información de versiones y recursos
- **GET** `/api/headers-demo` — Demo de lectura y configuración de cabeceras

## Documentación Completa

Para más detalles, consulta la [documentación completa](./docs/exercises.md) que incluye:
- Descripción detallada de todos los recursos
- Ejemplos de uso completos
- Filtros y parámetros de consulta
- Estados y validaciones
- Códigos de error

## Características Técnicas

- **Framework**: Express.js
- **Lenguaje**: JavaScript (Node.js)
- **Almacenamiento**: En memoria (temporal)
- **Validación**: Formato de fechas y horas
- **Filtros**: Búsqueda y filtrado avanzado
- **Respuestas**: JSON con códigos HTTP apropiados
- **Idioma**: Completamente en español