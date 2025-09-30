# Workout Tracker API (Node.js/Express)

## Ejecutar

```bash
npm install
npm run dev
```

Servidor: `http://localhost:3000`

## Endpoints principales

Base: `/api/v1`

- GET `/users` — lista de usuarios
  - Query: `role`, `search`
- GET `/users/:id` — detalle
- POST `/users` — crear usuario
- PUT `/users/:id` — actualización completa
- PATCH `/users/:id` — actualización parcial
- DELETE `/users/:id` — elimina (204 No Content)

- GET `/workouts` — lista de rutinas
  - Query: `difficulty`, `search`, `limit`
- GET `/workouts/:id` — detalle
- POST `/workouts` — crear rutina
- PUT `/workouts/:id` — actualización completa
- PATCH `/workouts/:id` — actualización parcial
- DELETE `/workouts/:id` — 204

- GET `/exercises` — lista de ejercicios
  - Query: `muscle`, `search`, `limit`
- GET `/exercises/:id` — detalle
- POST `/exercises` — crear ejercicio
- PUT `/exercises/:id` — actualización completa
- PATCH `/exercises/:id` — actualización parcial
- DELETE `/exercises/:id` — 204

Extras:
- GET `/api` — info de versiones
- GET `/api/headers-demo` — lectura y set de cabeceras

### Ejemplos Postman

POST `/api/v1/users`
```json
{
  "name": "Carlos Perez",
  "email": "carlos@example.com",
  "role": "admin"
}
```

POST `/api/v1/workouts`
```json
{
  "name": "Full Body",
  "difficulty": "medium"
}
```

POST `/api/v1/exercises`
```json
{
  "name": "Push Up",
  "muscle": "chest",
  "difficulty": "easy"
}
```


