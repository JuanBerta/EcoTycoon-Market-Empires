// Sistema de Fusiones y Adquisiciones - Tipos y Enumeraciones

/**
 * Enumeración para los tipos de transacciones corporativas
 */
export enum TipoTransaccionCorporativa {
  ADQUISICION_COMPLETA = 'adquisicion_completa',
  FUSION = 'fusion',
  COMPRA_PARTICIPACION = 'compra_participacion',
  VENTA_DIVISION = 'venta_division',
  JOINT_VENTURE = 'joint_venture'
}

/**
 * Enumeración para los estados de una transacción
 */
export enum EstadoTransaccion {
  PROPUESTA = 'propuesta',
  NEGOCIACION = 'negociacion',
  DILIGENCIA = 'diligencia',
  ACUERDO = 'acuerdo',
  APROBACION_REGULATORIA = 'aprobacion_regulatoria',
  CIERRE = 'cierre',
  INTEGRACION = 'integracion',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
  RECHAZADA = 'rechazada'
}

/**
 * Enumeración para los métodos de financiación
 */
export enum MetodoFinanciacion {
  EFECTIVO = 'efectivo',
  ACCIONES = 'acciones',
  DEUDA = 'deuda',
  MIXTO = 'mixto'
}

/**
 * Enumeración para los métodos de valoración
 */
export enum MetodoValoracion {
  MULTIPLO_EBITDA = 'multiplo_ebitda',
  FLUJO_CAJA_DESCONTADO = 'flujo_caja_descontado',
  VALOR_ACTIVOS = 'valor_activos',
  VALOR_MERCADO = 'valor_mercado'
}

/**
 * Enumeración para las estrategias de integración post-fusión
 */
export enum EstrategiaIntegracion {
  ABSORCION = 'absorcion',
  PRESERVACION = 'preservacion',
  SIMBIOSIS = 'simbiosis',
  HOLDING = 'holding'
}

/**
 * Interfaz para la valoración de una empresa
 */
export interface ValoracionEmpresa {
  empresaId: string;
  fechaValoracion: number;
  valorTotal: number;
  valorPorAccion?: number;
  metodoValoracion: MetodoValoracion;
  multiplicador?: number;
  tasaDescuento?: number;
  detallesValoracion: {
    valorActivos: number;
    valorPasivos: number;
    ebitdaAnual?: number;
    flujoCajaProyectado?: number[];
    valorMercado?: number;
  };
  factoresAjuste: {
    nombre: string;
    descripcion: string;
    porcentajeAjuste: number;
  }[];
}

/**
 * Interfaz para una oferta de adquisición o fusión
 */
export interface OfertaTransaccion {
  id: string;
  fechaCreacion: number;
  tipo: TipoTransaccionCorporativa;
  empresaCompradoraId: string;
  empresaObjetivoId: string;
  estado: EstadoTransaccion;
  valorOferta: number;
  porcentajeAdquisicion: number; // 100 para adquisición completa
  metodoFinanciacion: MetodoFinanciacion;
  detallesFinanciacion: {
    efectivo?: number;
    acciones?: {
      cantidad: number;
      valorUnitario: number;
    };
    deuda?: {
      monto: number;
      tasaInteres: number;
      plazo: number; // en meses
    };
  };
  condiciones: {
    descripcion: string;
    cumplida: boolean;
  }[];
  fechasImportantes: {
    propuesta: number;
    inicioNegociacion?: number;
    acuerdoInicial?: number;
    cierrePrevisto?: number;
    cierreReal?: number;
  };
  contraofertasRecibidas: {
    fecha: number;
    valorOferta: number;
    porcentajeAdquisicion: number;
    metodoFinanciacion: MetodoFinanciacion;
    detallesFinanciacion: any;
    condiciones: string[];
    aceptada: boolean;
  }[];
}

/**
 * Interfaz para el proceso de integración post-fusión
 */
export interface ProcesoIntegracion {
  transaccionId: string;
  estrategia: EstrategiaIntegracion;
  fechaInicio: number;
  duracionEstimada: number; // en días
  duracionReal?: number;
  etapasIntegracion: {
    nombre: string;
    descripcion: string;
    fechaInicio: number;
    duracionEstimada: number;
    completada: boolean;
    problemas?: {
      descripcion: string;
      impacto: number; // 1-10
      resuelto: boolean;
    }[];
  }[];
  sinergiasPrevistas: {
    tipo: 'costo' | 'ingreso' | 'operativa';
    descripcion: string;
    valorEstimado: number;
    valorReal?: number;
    lograda: boolean;
  }[];
  riesgosIdentificados: {
    descripcion: string;
    probabilidad: number; // 0-1
    impacto: number; // 1-10
    estrategiaMitigacion: string;
    materializado: boolean;
  }[];
  resultadosFinancieros: {
    costoTotal: number;
    ahorrosGenerados?: number;
    ingresosSinergicos?: number;
    retornoInversion?: number;
  };
}

/**
 * Interfaz para el historial de transacciones corporativas
 */
export interface HistorialTransacciones {
  transaccionesJugador: OfertaTransaccion[];
  transaccionesNPC: OfertaTransaccion[];
  procesosIntegracion: ProcesoIntegracion[];
}

export default {
  TipoTransaccionCorporativa,
  EstadoTransaccion,
  MetodoFinanciacion,
  MetodoValoracion,
  EstrategiaIntegracion
};
