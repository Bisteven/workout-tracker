// Sembrador de datos para ejercicios
const ejercicios = [
  // PECHO
  {
    nombre: "Flexiones",
    grupoMuscular: "pecho",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio básico para fortalecer el pecho, hombros y tríceps",
    instrucciones: "Colócate en posición de plancha, baja el cuerpo hasta casi tocar el suelo y empuja hacia arriba"
  },
  {
    nombre: "Press de Banca",
    grupoMuscular: "pecho",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Ejercicio fundamental para desarrollar el pecho y tríceps",
    instrucciones: "Acuéstate en el banco, baja la barra al pecho y empuja hacia arriba"
  },
  {
    nombre: "Aperturas con Mancuernas",
    grupoMuscular: "pecho",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Ejercicio de aislamiento para el pecho",
    instrucciones: "Acuéstate en el banco, abre los brazos con mancuernas y cierra en arco"
  },
  {
    nombre: "Fondos en Paralelas",
    grupoMuscular: "pecho",
    categoria: "fuerza",
    dificultad: "avanzado",
    descripcion: "Ejercicio avanzado para pecho y tríceps",
    instrucciones: "Sujétate en las paralelas, baja el cuerpo y empuja hacia arriba"
  },

  // ESPALDA
  {
    nombre: "Dominadas",
    grupoMuscular: "espalda",
    categoria: "fuerza",
    dificultad: "avanzado",
    descripcion: "Ejercicio fundamental para la espalda y bíceps",
    instrucciones: "Cuelga de una barra, tira hacia arriba hasta que el mentón pase la barra"
  },
  {
    nombre: "Remo con Barra",
    grupoMuscular: "espalda",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Ejercicio para desarrollar la espalda y bíceps",
    instrucciones: "Inclínate hacia adelante, tira la barra hacia el abdomen"
  },
  {
    nombre: "Jalones al Pecho",
    grupoMuscular: "espalda",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio de máquina para la espalda",
    instrucciones: "Sentado, tira la barra hacia el pecho manteniendo la espalda recta"
  },
  {
    nombre: "Peso Muerto",
    grupoMuscular: "espalda",
    categoria: "fuerza",
    dificultad: "avanzado",
    descripcion: "Ejercicio compuesto para espalda, glúteos y piernas",
    instrucciones: "Con la barra en el suelo, levántala manteniendo la espalda recta"
  },

  // PIERNAS
  {
    nombre: "Sentadillas",
    grupoMuscular: "piernas",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio fundamental para fortalecer las piernas y glúteos",
    instrucciones: "Párate con los pies separados al ancho de los hombros, baja como si te fueras a sentar"
  },
  {
    nombre: "Sentadillas con Peso",
    grupoMuscular: "piernas",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Sentadillas con peso adicional para mayor intensidad",
    instrucciones: "Con peso en los hombros, baja hasta que los muslos estén paralelos al suelo"
  },
  {
    nombre: "Zancadas",
    grupoMuscular: "piernas",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio unilateral para piernas y glúteos",
    instrucciones: "Da un paso largo hacia adelante, baja la rodilla trasera casi al suelo"
  },
  {
    nombre: "Prensa de Piernas",
    grupoMuscular: "piernas",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio de máquina para las piernas",
    instrucciones: "Sentado en la máquina, empuja el peso con las piernas"
  },

  // HOMBROS
  {
    nombre: "Elevaciones Laterales",
    grupoMuscular: "hombros",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio de aislamiento para los deltoides laterales",
    instrucciones: "Con mancuernas, eleva los brazos lateralmente hasta la altura de los hombros"
  },
  {
    nombre: "Press Militar",
    grupoMuscular: "hombros",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Ejercicio compuesto para hombros y tríceps",
    instrucciones: "De pie o sentado, presiona la barra por encima de la cabeza"
  },
  {
    nombre: "Elevaciones Frontales",
    grupoMuscular: "hombros",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio para los deltoides frontales",
    instrucciones: "Con mancuernas, eleva los brazos hacia adelante hasta la altura de los hombros"
  },

  // BRAZOS
  {
    nombre: "Curl de Bíceps",
    grupoMuscular: "brazos",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio básico para los bíceps",
    instrucciones: "Con mancuernas, flexiona los brazos llevando el peso hacia los hombros"
  },
  {
    nombre: "Extensiones de Tríceps",
    grupoMuscular: "brazos",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio para los tríceps",
    instrucciones: "Con mancuerna, extiende el brazo por encima de la cabeza"
  },
  {
    nombre: "Fondos de Tríceps",
    grupoMuscular: "brazos",
    categoria: "fuerza",
    dificultad: "intermedio",
    descripcion: "Ejercicio de peso corporal para tríceps",
    instrucciones: "Sentado en el borde de una silla, baja el cuerpo flexionando los brazos"
  },

  // CORE
  {
    nombre: "Plancha",
    grupoMuscular: "core",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio isométrico para el core",
    instrucciones: "Mantén la posición de plancha con el cuerpo recto"
  },
  {
    nombre: "Abdominales",
    grupoMuscular: "core",
    categoria: "fuerza",
    dificultad: "facil",
    descripcion: "Ejercicio básico para los abdominales",
    instrucciones: "Acostado, levanta el torso hacia las rodillas"
  },
  {
    nombre: "Mountain Climbers",
    grupoMuscular: "core",
    categoria: "cardio",
    dificultad: "intermedio",
    descripcion: "Ejercicio dinámico para core y cardio",
    instrucciones: "En posición de plancha, alterna llevando las rodillas al pecho"
  },

  // CARDIO
  {
    nombre: "Burpees",
    grupoMuscular: "general",
    categoria: "cardio",
    dificultad: "avanzado",
    descripcion: "Ejercicio completo de cardio y fuerza",
    instrucciones: "Combinación de sentadilla, flexión y salto"
  },
  {
    nombre: "Jumping Jacks",
    grupoMuscular: "general",
    categoria: "cardio",
    dificultad: "facil",
    descripcion: "Ejercicio de cardio básico",
    instrucciones: "Salta abriendo y cerrando piernas y brazos"
  },
  {
    nombre: "High Knees",
    grupoMuscular: "general",
    categoria: "cardio",
    dificultad: "facil",
    descripcion: "Ejercicio de cardio de alta intensidad",
    instrucciones: "Corre en el lugar llevando las rodillas al pecho"
  },

  // FLEXIBILIDAD
  {
    nombre: "Estiramiento de Cuádriceps",
    grupoMuscular: "piernas",
    categoria: "flexibilidad",
    dificultad: "facil",
    descripcion: "Estiramiento para los cuádriceps",
    instrucciones: "De pie, flexiona la rodilla llevando el talón al glúteo"
  },
  {
    nombre: "Estiramiento de Isquiotibiales",
    grupoMuscular: "piernas",
    categoria: "flexibilidad",
    dificultad: "facil",
    descripcion: "Estiramiento para los isquiotibiales",
    instrucciones: "Sentado, extiende una pierna y alcanza hacia el pie"
  },
  {
    nombre: "Estiramiento de Espalda",
    grupoMuscular: "espalda",
    categoria: "flexibilidad",
    dificultad: "facil",
    descripcion: "Estiramiento para la espalda",
    instrucciones: "Sentado, cruza una pierna y gira el torso hacia el lado opuesto"
  }
];

// Función para obtener ejercicios por categoría
function obtenerEjerciciosPorCategoria(categoria) {
  return ejercicios.filter(ejercicio => ejercicio.categoria === categoria);
}

// Función para obtener ejercicios por grupo muscular
function obtenerEjerciciosPorGrupoMuscular(grupoMuscular) {
  return ejercicios.filter(ejercicio => ejercicio.grupoMuscular === grupoMuscular);
}

// Función para obtener ejercicios por dificultad
function obtenerEjerciciosPorDificultad(dificultad) {
  return ejercicios.filter(ejercicio => ejercicio.dificultad === dificultad);
}

// Función para obtener todos los ejercicios
function obtenerTodosLosEjercicios() {
  return ejercicios;
}

// Función para obtener categorías disponibles
function obtenerCategorias() {
  const categorias = [...new Set(ejercicios.map(ejercicio => ejercicio.categoria))];
  return categorias;
}

// Función para obtener grupos musculares disponibles
function obtenerGruposMusculares() {
  const grupos = [...new Set(ejercicios.map(ejercicio => ejercicio.grupoMuscular))];
  return grupos;
}

// Función para obtener dificultades disponibles
function obtenerDificultades() {
  const dificultades = [...new Set(ejercicios.map(ejercicio => ejercicio.dificultad))];
  return dificultades;
}

module.exports = {
  ejercicios,
  obtenerEjerciciosPorCategoria,
  obtenerEjerciciosPorGrupoMuscular,
  obtenerEjerciciosPorDificultad,
  obtenerTodosLosEjercicios,
  obtenerCategorias,
  obtenerGruposMusculares,
  obtenerDificultades
};

