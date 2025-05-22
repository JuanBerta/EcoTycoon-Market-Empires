/**
 * Sistema de Competencia Estratégica - Tipos y Estructuras Base
 * 
 * Este archivo define las enumeraciones, interfaces y tipos necesarios para
 * el sistema de competencia estratégica en EcoTycoon: Market Empires.
 */

// --- Enumeraciones ---

/** Tipos de alianzas estratégicas disponibles */
export enum TipoAlianza {
  COMERCIAL = 'comercial',                 // Acuerdos de compra/venta preferente
  TECNOLOGICA = 'tecnologica',             // Compartir tecnologías o I+D
  LOGISTICA = 'logistica',                 // Compartir infraestructura logística
  PRODUCCION = 'produccion',               // Compartir capacidad productiva
  MARKETING = 'marketing',                 // Campañas de marketing conjuntas
  EXCLUSIVIDAD = 'exclusividad',           // Acuerdos de exclusividad
  JOINT_VENTURE = 'joint_venture'          // Empresa conjunta para proyecto específico
}

/** Estados posibles de una alianza */
export enum EstadoAlianza {
  PROPUESTA = 'propuesta',                 // Propuesta inicial
  NEGOCIANDO = 'negociando',               // En proceso de negociación
  ACTIVA = 'activa',                       // Alianza en vigor
  DETERIORADA = 'deteriorada',             // Alianza con problemas
  TERMINADA = 'terminada',                 // Alianza finalizada normalmente
  ROTA = 'rota'                            // Alianza rota por incumplimiento
}

/** Tipos de estrategias competitivas */
export enum TipoEstrategiaCompetitiva {
  GUERRA_PRECIOS = 'guerra_precios',       // Reducción agresiva de precios
  BLOQUEO_RECURSOS = 'bloqueo_recursos',   // Acaparar recursos clave
  INNOVACION_DISRUPTIVA = 'innovacion',    // Lanzar productos innovadores
  MARKETING_AGRESIVO = 'marketing',        // Campaña de marketing intensiva
  EXPANSION_TERRITORIAL = 'expansion',     // Expansión rápida a nuevos mercados
  MEJORA_CALIDAD = 'calidad',              // Enfoque en calidad superior
  DIVERSIFICACION = 'diversificacion'      // Diversificación de productos
}

/** Niveles de intensidad de una estrategia competitiva */
export enum IntensidadEstrategia {
  BAJA = 'baja',                           // Intensidad baja
  MEDIA = 'media',                         // Intensidad media
  ALTA = 'alta',                           // Intensidad alta
  EXTREMA = 'extrema'                      // Intensidad extrema
}

/** Estados de una estrategia competitiva */
export enum EstadoEstrategia {
  PLANIFICADA = 'planificada',             // En fase de planificación
  INICIADA = 'iniciada',                   // Recién iniciada
  EN_PROGRESO = 'en_progreso',             // En ejecución
  FINALIZADA = 'finalizada',               // Completada normalmente
  CANCELADA = 'cancelada'                  // Cancelada antes de completarse
}

/** Tipos de respuestas a estrategias competitivas */
export enum TipoRespuestaCompetitiva {
  IGNORAR = 'ignorar',                     // No responder
  IGUALAR = 'igualar',                     // Igualar la estrategia
  CONTRAATACAR = 'contraatacar',           // Responder con otra estrategia
  NEGOCIAR = 'negociar',                   // Buscar acuerdo o alianza
  DENUNCIAR = 'denunciar'                  // Denunciar prácticas anticompetitivas
}

// --- Interfaces ---

/** Representa una alianza estratégica entre empresas */
export interface AlianzaEstrategica {
  id: string;                              // Identificador único
  tipo: TipoAlianza;                       // Tipo de alianza
  empresasParticipantes: string[];         // IDs de empresas participantes
  fechaInicio: number;                     // Día de juego de inicio
  fechaFin?: number;                       // Día de juego de finalización (si tiene)
  duracion: number;                        // Duración en días de juego
  estado: EstadoAlianza;                   // Estado actual
  condiciones: {                           // Condiciones de la alianza
    descripcion: string;                   // Descripción de la condición
    cumplimiento: number;                  // Nivel de cumplimiento (0-100)
  }[];
  beneficios: {                            // Beneficios para cada participante
    empresaId: string;                     // ID de la empresa
    descripcion: string;                   // Descripción del beneficio
    valorEstimado: number;                 // Valor estimado del beneficio
    valorRealizado: number;                // Valor realmente obtenido
  }[];
  nivelConfianza: number;                  // Nivel de confianza mutua (0-100)
  historialEventos: {                      // Historial de eventos importantes
    fecha: number;                         // Día del evento
    descripcion: string;                   // Descripción del evento
    impacto: number;                       // Impacto en la alianza (-100 a 100)
  }[];
  renovacionAutomatica: boolean;           // Si se renueva automáticamente
  clausulasEspeciales: string[];           // Cláusulas especiales del acuerdo
}

/** Representa una propuesta de alianza */
export interface PropuestaAlianza {
  id: string;                              // Identificador único
  tipo: TipoAlianza;                       // Tipo de alianza propuesta
  empresaProponente: string;               // ID de empresa que propone
  empresasObjetivo: string[];              // IDs de empresas a las que se propone
  fechaPropuesta: number;                  // Día de juego de la propuesta
  duracionPropuesta: number;               // Duración propuesta en días
  condicionesPropuestas: {                 // Condiciones propuestas
    descripcion: string;
    importancia: number;                   // Importancia (1-10)
  }[];
  beneficiosPropuestos: {                  // Beneficios ofrecidos
    empresaId: string;
    descripcion: string;
    valorEstimado: number;
  }[];
  estado: 'pendiente' | 'aceptada' | 'rechazada' | 'contrapropuesta';
  fechaRespuesta?: number;                 // Día de juego de la respuesta
  contrapropuestaId?: string;              // ID de contrapropuesta si existe
  motivoRechazo?: string;                  // Motivo de rechazo si fue rechazada
}

/** Representa una estrategia competitiva */
export interface EstrategiaCompetitiva {
  id: string;                              // Identificador único
  tipo: TipoEstrategiaCompetitiva;         // Tipo de estrategia
  empresaEjecutora: string;                // ID de empresa que ejecuta
  empresasObjetivo: string[];              // IDs de empresas objetivo
  fechaInicio: number;                     // Día de juego de inicio
  duracionPlanificada: number;             // Duración planificada en días
  duracionReal?: number;                   // Duración real al finalizar
  intensidad: IntensidadEstrategia;        // Nivel de intensidad
  estado: EstadoEstrategia;                // Estado actual
  progreso: number;                        // Progreso de ejecución (0-100)
  inversion: number;                       // Recursos invertidos
  costoAcumulado: number;                  // Costo acumulado hasta el momento
  efectosEsperados: {                      // Efectos esperados
    tipo: string;                          // Tipo de efecto
    descripcion: string;                   // Descripción del efecto
    valorEstimado: number;                 // Valor estimado del efecto
  }[];
  efectosReales: {                         // Efectos realmente conseguidos
    tipo: string;
    descripcion: string;
    valorRealizado: number;
  }[];
  respuestasCompetidores: {                // Respuestas de competidores
    empresaId: string;                     // ID de empresa que responde
    tipoRespuesta: TipoRespuestaCompetitiva; // Tipo de respuesta
    descripcion: string;                   // Descripción de la respuesta
    efectividad: number;                   // Efectividad de la respuesta (0-100)
    estrategiaContraataqueId?: string;     // ID de estrategia de contraataque
  }[];
  riesgosIdentificados: {                  // Riesgos identificados
    descripcion: string;                   // Descripción del riesgo
    probabilidad: number;                  // Probabilidad (0-100)
    impacto: number;                       // Impacto (1-10)
    materializado: boolean;                // Si se ha materializado
  }[];
  informesProgreso: {                      // Informes periódicos
    fecha: number;                         // Día del informe
    progreso: number;                      // Progreso en ese momento
    logros: string[];                      // Logros del período
    problemas: string[];                   // Problemas del período
  }[];
}

/** Representa una guerra de precios */
export interface GuerraPrecios extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.GUERRA_PRECIOS;
  productosAfectados: string[];            // IDs de productos afectados
  reduccionPreciosPorcentaje: number;      // % de reducción de precios
  presupuestoSubsidio: number;             // Presupuesto para subsidiar pérdidas
  presupuestoConsumido: number;            // Presupuesto ya consumido
  impactoEnMercado: {                      // Impacto en el mercado
    cuotaMercadoInicial: number;           // Cuota de mercado inicial (%)
    cuotaMercadoActual: number;            // Cuota de mercado actual (%)
    precioMedioInicial: number;            // Precio medio inicial
    precioMedioActual: number;             // Precio medio actual
  };
  umbralesFinalizacion: {                  // Condiciones para finalizar
    cuotaMercadoObjetivo: number;          // Cuota de mercado objetivo (%)
    competidoresRetirados: number;         // Número de competidores a retirar
    presupuestoMaximo: number;             // Presupuesto máximo a gastar
  };
}

/** Representa un bloqueo de recursos */
export interface BloqueoRecursos extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.BLOQUEO_RECURSOS;
  recursosObjetivo: string[];              // IDs de recursos a bloquear
  proveedoresControlados: string[];        // IDs de proveedores controlados
  porcentajeMercadoControlado: number;     // % del mercado controlado
  sobrecosteAdquisicion: number;           // Sobrecoste pagado por acaparar
  impactoEnPreciosMercado: number;         // % de aumento en precios de mercado
  reservasAcumuladas: {                    // Reservas acumuladas
    recursoId: string;                     // ID del recurso
    cantidad: number;                      // Cantidad acumulada
    valorMercado: number;                  // Valor de mercado actual
  }[];
  contratosExclusividad: {                 // Contratos de exclusividad
    proveedorId: string;                   // ID del proveedor
    duracion: number;                      // Duración en días
    penalizacionRuptura: number;           // Penalización por ruptura
  }[];
}

/** Representa una estrategia de innovación disruptiva */
export interface InnovacionDisruptiva extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.INNOVACION_DISRUPTIVA;
  areaInnovacion: string;                  // Área de innovación
  inversionID: number;                     // Inversión en I+D
  tiempoDesarrollo: number;                // Tiempo de desarrollo en días
  probabilidadExito: number;               // Probabilidad de éxito (0-100)
  patentesPotenciales: number;             // Número de patentes potenciales
  patentesConseguidas: number;             // Patentes realmente conseguidas
  ventajaCompetitiva: number;              // Ventaja competitiva estimada (1-10)
  productosResultantes: string[];          // IDs de productos resultantes
}

/** Representa una campaña de marketing agresivo */
export interface MarketingAgresivo extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.MARKETING_AGRESIVO;
  canales: string[];                       // Canales utilizados
  presupuesto: number;                     // Presupuesto total
  gastosAcumulados: number;                // Gastos acumulados
  alcanceEstimado: number;                 // Alcance estimado (personas)
  alcanceReal: number;                     // Alcance real conseguido
  impactoEnMarca: number;                  // Impacto en valor de marca (%)
  conversionEstimada: number;              // Tasa de conversión estimada (%)
  conversionReal: number;                  // Tasa de conversión real (%)
  mensajesPrincipales: string[];           // Mensajes principales
  comparativaCompetidores: boolean;        // Si incluye comparativa directa
}

/** Representa una estrategia de expansión territorial */
export interface ExpansionTerritorial extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.EXPANSION_TERRITORIAL;
  regionesObjetivo: string[];              // IDs de regiones objetivo
  inversionPorRegion: {                    // Inversión por región
    regionId: string;                      // ID de la región
    inversion: number;                     // Inversión planificada
    gastado: number;                       // Inversión ya realizada
    progreso: number;                      // Progreso (0-100)
  }[];
  instalacionesPlanificadas: {             // Instalaciones planificadas
    tipo: string;                          // Tipo de instalación
    cantidad: number;                      // Cantidad planificada
    completadas: number;                   // Cantidad completada
  }[];
  penetracionMercado: {                    // Penetración de mercado
    regionId: string;                      // ID de la región
    cuotaInicial: number;                  // Cuota inicial (%)
    cuotaActual: number;                   // Cuota actual (%)
    cuotaObjetivo: number;                 // Cuota objetivo (%)
  }[];
}

/** Representa una estrategia de mejora de calidad */
export interface MejoraCalidad extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.MEJORA_CALIDAD;
  productosObjetivo: string[];             // IDs de productos objetivo
  inversionCalidad: number;                // Inversión en mejora de calidad
  aumentoCalidadEsperado: number;          // Aumento de calidad esperado (%)
  aumentoCalidadReal: number;              // Aumento de calidad real (%)
  certificacionesObjetivo: string[];       // Certificaciones objetivo
  certificacionesObtenidas: string[];      // Certificaciones obtenidas
  impactoEnPrecio: number;                 // Impacto en precio (%)
  impactoEnCostos: number;                 // Impacto en costos (%)
  percepcionConsumidores: number;          // Percepción de consumidores (0-100)
}

/** Representa una estrategia de diversificación */
export interface Diversificacion extends EstrategiaCompetitiva {
  tipo: TipoEstrategiaCompetitiva.DIVERSIFICACION;
  nuevosProductos: {                       // Nuevos productos
    nombre: string;                        // Nombre del producto
    categoria: string;                     // Categoría
    inversionDesarrollo: number;           // Inversión en desarrollo
    tiempoDesarrollo: number;              // Tiempo de desarrollo en días
    progreso: number;                      // Progreso (0-100)
    lanzado: boolean;                      // Si ya ha sido lanzado
  }[];
  nuevosSegmentos: string[];               // Nuevos segmentos de mercado
  adquisicionesPlanificadas: string[];     // IDs de empresas a adquirir
  adquisicionesCompletadas: string[];      // IDs de empresas adquiridas
  sinergiasPotenciales: number;            // Sinergias potenciales (valor)
  riesgosDiversificacion: {                // Riesgos específicos
    descripcion: string;                   // Descripción del riesgo
    probabilidad: number;                  // Probabilidad (0-100)
    impacto: number;                       // Impacto (1-10)
    mitigado: boolean;                     // Si ha sido mitigado
  }[];
}

/** Representa un análisis competitivo de un mercado */
export interface AnalisisCompetitivo {
  id: string;                              // Identificador único
  mercadoId: string;                       // ID del mercado analizado
  fechaAnalisis: number
(Content truncated due to size limit. Use line ranges to read in chunks)