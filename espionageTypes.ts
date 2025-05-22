// Sistema de Espionaje Corporativo - Tipos y Estructuras Base

// --- Enumeraciones ---

/** Tipos de misiones de espionaje disponibles */
export enum TipoMisionEspionaje {
  RECOPILACION_INFO = 'recopilacion_info', // Obtener datos sobre competidores
  ROBO_TECNOLOGIA = 'robo_tecnologia',     // Adquirir tecnología enemiga
  SABOTAJE = 'sabotaje',                 // Dañar operaciones enemigas
  MANIPULACION_MERCADO = 'manipulacion_mercado' // Influir en el mercado
}

/** Estados posibles de una misión de espionaje */
export enum EstadoMision {
  PLANIFICANDO = 'planificando', // Misión en preparación
  EN_PROGRESO = 'en_progreso',   // Misión activa
  COMPLETADA = 'completada',     // Misión finalizada con éxito o fracaso
  FALLIDA = 'fallida',           // Misión fracasada sin detección (puede solaparse con COMPLETADA)
  DESCUBIERTA = 'descubierta'    // Misión detectada por el objetivo
}

/** Especialidades de los agentes de espionaje */
export enum EspecialidadAgente {
  INFORMACION = 'informacion', // Experto en recopilar datos
  TECNOLOGIA = 'tecnologia',   // Experto en robo tecnológico
  SABOTAJE = 'sabotaje',     // Experto en operaciones disruptivas
  MANIPULACION = 'manipulacion', // Experto en influir mercados/personas
  GENERALISTA = 'generalista'  // Habilidades equilibradas
}

/** Estados posibles de un agente de espionaje */
export enum EstadoAgente {
  DISPONIBLE = 'disponible',       // Listo para una misión
  EN_MISION = 'en_mision',         // Actualmente en una operación
  RECUPERANDOSE = 'recuperandose', // No disponible temporalmente tras misión
  CAPTURADO = 'capturado',       // Perdido, no disponible permanentemente
  RETIRADO = 'retirado'          // Ya no forma parte de la agencia
}

// --- Interfaces ---

/** Representa un agente de espionaje individual */
export interface AgenteEspionaje {
  id: string;                   // Identificador único del agente
  nombre: string;               // Nombre (posiblemente alias)
  especialidad: EspecialidadAgente; // Área de expertise
  nivelHabilidad: number;       // Nivel general de habilidad (1-5)
  lealtad: number;              // Nivel de lealtad (1-5, afecta riesgo de traición)
  costoMensual: number;         // Salario del agente
  experiencia: number;          // Puntos de experiencia acumulados
  notoriedad: number;           // Nivel de reconocimiento (0-100, afecta riesgo detección)
  estado: EstadoAgente;         // Estado actual del agente
  tiempoRecuperacionRestante?: number; // Días restantes si está recuperándose
  misionActualId?: string;     // ID de la misión si está en una
}

/** Representa una operación de espionaje planificada o en curso */
export interface MisionEspionaje {
  id: string;                   // Identificador único de la misión
  tipo: TipoMisionEspionaje;    // Tipo de operación
  objetivoEmpresaId: string;    // ID de la empresa objetivo
  objetivoEspecifico: string;   // Detalle del objetivo (e.g., 'tecnologia_X', 'fabrica_Y')
  agenteAsignadoId: string;     // ID del agente responsable
  fechaInicio: number;          // Día de juego en que comenzó
  duracionEstimada: number;     // Duración prevista en días
  duracionReal?: number;        // Duración final en días
  costoOperacion: number;       // Costo monetario de la misión
  probabilidadExitoBase: number; // Probabilidad inicial de éxito (0-100)
  probabilidadDeteccionBase: number; // Probabilidad inicial de detección (0-100)
  estado: EstadoMision;         // Estado actual de la misión
  resultado?: ResultadoMision; // Detalles del desenlace si está completada
}

/** Describe el resultado final de una misión de espionaje */
export interface ResultadoMision {
  exito: boolean;               // ¿Se logró el objetivo principal?
  detectado: boolean;           // ¿Fue descubierta la operación?
  fechaFinalizacion: number;    // Día de juego en que terminó
  informacionObtenida?: any;   // Datos específicos si fue misión de información
  tecnologiaRobadaId?: string; // ID de la tecnología si fue robo
  impactoSabotaje?: Efecto[];  // Efectos aplicados si fue sabotaje
  impactoManipulacion?: Efecto[]; // Efectos en el mercado si fue manipulación
  consecuenciasJugador?: Consecuencia[]; // Impacto en el jugador (reputación, multas)
  consecuenciasAgente: {        // Impacto en el agente
    nuevoEstado: EstadoAgente;
    cambioExperiencia?: number;
    cambioNotoriedad?: number;
    tiempoRecuperacion?: number;
  };
}

/** Representa un efecto aplicado como resultado de una misión o consecuencia */
export interface Efecto {
  tipo: string; // Tipo de efecto (e.g., 'reduccion_eficiencia', 'aumento_costo')
  objetivo: string; // A quién afecta (e.g., 'empresa_objetivo', 'mercado_global')
  valor: number | string; // Magnitud del efecto
  duracion?: number; // Duración en días (si es temporal)
  descripcion: string; // Texto descriptivo del efecto
}

/** Representa una consecuencia específica de una misión (positiva o negativa) */
export interface Consecuencia {
  descripcion: string; // Texto descriptivo
  probabilidad?: number; // Probabilidad de que ocurra (0-100, si no es segura)
  efectos: Efecto[]; // Efectos asociados a esta consecuencia
}

/** Configuración del departamento de contraespionaje de una empresa */
export interface DepartamentoContraespionaje {
  empresaId: string;
  nivelSeguridadGeneral: number; // Nivel base de seguridad (1-5)
  presupuestoMensual: number;   // Inversión en seguridad
  personalAsignado: number;     // Número de agentes de seguridad
  tecnologiasSeguridad: string[]; // IDs de tecnologías defensivas implementadas
  eficienciaDeteccionCalculada: number; // Eficiencia resultante (0-100)
  historialIncidentes: string[]; // IDs de misiones detectadas
}

// Exportar tipos para uso en otros módulos
export default {
  TipoMisionEspionaje,
  EstadoMision,
  EspecialidadAgente,
  EstadoAgente,
  AgenteEspionaje,
  MisionEspionaje,
  ResultadoMision,
  Efecto,
  Consecuencia,
  DepartamentoContraespionaje
};
