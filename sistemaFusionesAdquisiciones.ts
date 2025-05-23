/**
 * Sistema de Fusiones y Adquisiciones - Sistema Central
 * 
 * Este módulo integra todos los componentes del sistema de fusiones y adquisiciones
 * y proporciona una interfaz unificada para su uso.
 */

import { 
  TipoOperacionMA,
  EstadoNegociacion,
  TerminoFinanciacion,
  EstadoIntegracion,
  ValoracionEmpresa,
  OfertaMA,
  NegociacionMA,
  AcuerdoMA,
  ProcesoIntegracion,
  ObjetivoMA
} from './fusionesTypes';

import GestorValoracion from './gestorValoracion';
import GestorNegociaciones from './gestorNegociaciones';
import GestorIntegracion from './gestorIntegracion';

/**
 * Clase principal que integra todos los componentes del sistema de M&A
 */
export class SistemaFusionesAdquisiciones {
  private gestorValoracion: GestorValoracion;
  private gestorNegociaciones: GestorNegociaciones;
  private gestorIntegracion: GestorIntegracion;
  private negociaciones: Map<string, NegociacionMA> = new Map(); // Added for simulation as per subtask instruction

  constructor() {
    this.gestorValoracion = new GestorValoracion();
    this.gestorNegociaciones = new GestorNegociaciones(this.gestorValoracion);
    this.gestorIntegracion = new GestorIntegracion();
  }
  
  /**
   * Busca objetivos potenciales para M&A
   * @param criterios Criterios de búsqueda opcionales
   * @returns Lista de objetivos potenciales
   */
  public buscarObjetivosPotenciales(criterios?: {
    sector?: string,
    tamanoMaximo?: number,
    presupuestoMaximo?: number,
    compatibilidadMinima?: number
  }): ObjetivoMA[] {
    return this.gestorValoracion.buscarObjetivosPotenciales(criterios);
  }
  
  /**
   * Valora una empresa objetivo
   * @param empresaId ID de la empresa a valorar
   * @param datosAdicionales Datos adicionales para mejorar la precisión
   * @returns Objeto de valoración con estimaciones
   */
  public valorarEmpresa(
    empresaId: string,
    datosAdicionales?: any
  ): ValoracionEmpresa {
    // Assuming datosFinancieros, datosActivos, etc. are fetched or passed differently if undefined
    // For now, passing undefined as per original call signature if not provided.
    const mockDatosFinancieros = datosAdicionales?.financieros || { /* default empty or minimal structure */ };
    const mockDatosActivos = datosAdicionales?.activos || { /* default */ };
    const mockDatosProduccion = datosAdicionales?.produccion || { /* default */ };
    const mockDatosComerciales = datosAdicionales?.comerciales || { /* default */ };

    return this.gestorValoracion.valorarEmpresa(
        empresaId, 
        mockDatosFinancieros, 
        mockDatosActivos, 
        mockDatosProduccion, 
        mockDatosComerciales
    );
  }
  
  /**
   * Inicia una nueva negociación de M&A
   * @param empresaIniciadoraId ID de la empresa que inicia la negociación
   * @param empresaObjetivoId ID de la empresa objetivo
   * @param tipoOperacion Tipo de operación propuesta
   * @param esHostil Indica si es una OPA hostil
   * @returns La negociación creada
   */
  public iniciarNegociacion(
    empresaIniciadoraId: string,
    empresaObjetivoId: string,
    tipoOperacion: TipoOperacionMA,
    esHostil: boolean = false
  ): NegociacionMA {
    const negociacion = this.gestorNegociaciones.iniciarNegociacion(
      empresaIniciadoraId,
      empresaObjetivoId,
      tipoOperacion,
      esHostil
    );
    this.negociaciones.set(negociacion.id, negociacion); // Store for simulation access
    return negociacion;
  }
  
  /**
   * Realiza la valoración de la empresa objetivo en una negociación
   * @param negociacionId ID de la negociación
   * @param datosAdicionales Datos adicionales para la valoración
   * @returns La negociación actualizada con la valoración
   */
  public realizarValoracionEnNegociacion(
    negociacionId: string,
    datosAdicionales?: any
  ): NegociacionMA {
    return this.gestorNegociaciones.realizarValoracion(negociacionId, datosAdicionales);
  }
  
  /**
   * Presenta una oferta inicial en una negociación
   * @param negociacionId ID de la negociación
   * @param oferta Detalles de la oferta
   * @returns La negociación actualizada con la oferta
   */
  public presentarOfertaInicial(
    negociacionId: string,
    oferta: {
      precioOfertado: number;
      porcentajeAdquisicion?: number;
      terminosFinanciacion: TerminoFinanciacion;
      detallesFinanciacion?: any;
      condiciones?: string[];
      fechaExpiracion?: number;
    }
  ): NegociacionMA {
    return this.gestorNegociaciones.presentarOfertaInicial(negociacionId, oferta);
  }
  
  /**
   * Evalúa una oferta desde la perspectiva de la empresa objetivo
   * @param ofertaId ID de la oferta a evaluar
   * @returns Objeto con la evaluación de la oferta
   */
  public evaluarOferta(ofertaId: string): {
    oferta: OfertaMA;
    valoracion: ValoracionEmpresa;
    evaluacion: {
      precioAdecuado: boolean;
      premioPorcentaje: number;
      terminosAceptables: boolean;
      condicionesAceptables: boolean;
      probabilidadAceptacion: number;
      comentarios: string[];
    };
  } {
    return this.gestorNegociaciones.evaluarOferta(ofertaId);
  }
  
  /**
   * Procesa la respuesta a una oferta (aceptación, rechazo o contraoferta)
   * @param ofertaId ID de la oferta a responder
   * @param respuesta Tipo de respuesta
   * @param contraoferta Detalles de la contraoferta si aplica
   * @returns La negociación actualizada
   */
  public responderOferta(
    ofertaId: string,
    respuesta: 'aceptar' | 'rechazar' | 'contraoferta',
    contraoferta?: {
      precioSolicitado: number;
      porcentajeAdquisicion?: number;
      terminosFinanciacion: TerminoFinanciacion;
      detallesFinanciacion?: any;
      condiciones?: string[];
      fechaExpiracion?: number;
    }
  ): NegociacionMA {
    return this.gestorNegociaciones.responderOferta(ofertaId, respuesta, contraoferta);
  }
  
  /**
   * Inicia el proceso de due diligence para una negociación con acuerdo preliminar
   * @param negociacionId ID de la negociación
   * @returns La negociación actualizada
   */
  public iniciarDueDiligence(negociacionId: string): NegociacionMA {
    return this.gestorNegociaciones.iniciarDueDiligence(negociacionId);
  }
  
  /**
   * Completa el proceso de due diligence y reporta hallazgos
   * @param negociacionId ID de la negociación
   * @param resultados Resultados del due diligence
   * @returns La negociación actualizada
   */
  public completarDueDiligence(
    negociacionId: string,
    resultados: {
      exitoso: boolean;
      hallazgos: {
        tipo: 'positivo' | 'neutral' | 'negativo';
        descripcion: string;
        impactoValoracion: number;
      }[];
      ajusteValoracion: number;
      recomendacion: 'continuar' | 'renegociar' | 'cancelar';
    }
  ): NegociacionMA {
    return this.gestorNegociaciones.completarDueDiligence(negociacionId, resultados);
  }
  
  /**
   * Finaliza una negociación con un acuerdo final
   * @param negociacionId ID de la negociación
   * @param detallesAcuerdo Detalles del acuerdo final
   * @returns El acuerdo creado
   */
  public cerrarAcuerdo(
    negociacionId: string,
    detallesAcuerdo: {
      precioFinal: number;
      porcentajeAdquirido?: number;
      terminosFinales: {
        metodoPago: TerminoFinanciacion;
        detallesPago: any;
        condicionesEspeciales: string[];
        clausulasAdicionales: string[];
      };
      sinergiasEstimadas: {
        reduccionCostos: number;
        aumentoIngresos: number;
        mejoraEficiencia: number;
        valorTotal: number;
      };
      desafiosIntegracion: {
        tipo: string;
        severidad: number;
        descripcion: string;
      }[];
    }
  ): AcuerdoMA {
    return this.gestorNegociaciones.cerrarAcuerdo(negociacionId, detallesAcuerdo);
  }
  
  /**
   * Inicia un nuevo proceso de integración tras un acuerdo
   * @param negociacionId ID de la negociación completada
   * @returns El proceso de integración creado
   */
  public iniciarIntegracion(negociacionId: string): ProcesoIntegracion {
    const negociacion = this.gestorNegociaciones.obtenerNegociacion(negociacionId);
    if (!negociacion) {
      throw new Error(`Negociación no encontrada: ${negociacionId}`);
    }
    
    const acuerdo = negociacion.acuerdoFinal || this.gestorNegociaciones.obtenerAcuerdo(negociacionId);
    if (!acuerdo) {
      throw new Error(`Acuerdo no encontrado para negociación: ${negociacionId}`);
    }
    
    return this.gestorIntegracion.iniciarProcesoIntegracion(negociacion, acuerdo);
  }
  
  /**
   * Actualiza el progreso de un proceso de integración
   * @param procesoId ID del proceso de integración
   * @param diasTranscurridos Días transcurridos desde la última actualización
   * @returns El proceso actualizado
   */
  public actualizarProgresoIntegracion(
    procesoId: string,
    diasTranscurridos: number = 1
  ): ProcesoIntegracion {
    return this.gestorIntegracion.actualizarProgreso(procesoId, diasTranscurridos);
  }
  
  /**
   * Resuelve un problema específico en una etapa de integración
   * @param procesoId ID del proceso de integración
   * @param etapaNombre Nombre de la etapa
   * @param problema Descripción del problema
   * @param inversionAdicional Inversión adicional para resolver el problema
   * @returns El proceso actualizado
   */
  public resolverProblemaIntegracion(
    procesoId: string,
    etapaNombre: string,
    problema: string,
    inversionAdicional: number
  ): ProcesoIntegracion {
    return this.gestorIntegracion.resolverProblema(
      procesoId,
      etapaNombre,
      problema,
      inversionAdicional
    );
  }
  
  /**
   * Aumenta la inversión en el proceso de integración
   * @param procesoId ID del proceso de integración
   * @param montoAdicional Monto adicional a invertir
   * @param areaDestino Área a la que se destina la inversión
   * @returns El proceso actualizado
   */
  public aumentarInversionIntegracion(
    procesoId: string,
    montoAdicional: number,
    areaDestino: string
  ): ProcesoIntegracion {
    return this.gestorIntegracion.aumentarInversion(
      procesoId,
      montoAdicional,
      areaDestino
    );
  }
  
  /**
   * Genera un informe detallado del proceso de integración
   * @param procesoId ID del proceso
   * @returns Texto con informe detallado
   */
  public generarInformeIntegracion(procesoId: string): string {
    return this.gestorIntegracion.generarInformeDetallado(procesoId);
  }
  
  /**
   * Obtiene una negociación por su ID
   * @param negociacionId ID de la negociación
   * @returns La negociación o undefined si no existe
   */
  public obtenerNegociacion(negociacionId: string): NegociacionMA | undefined {
    // First try the gestor, then the local map for simulation purposes
    return this.gestorNegociaciones.obtenerNegociacion(negociacionId) || this.negociaciones.get(negociacionId);
  }
  
  /**
   * Obtiene todas las negociaciones
   * @param filtros Filtros opcionales
   * @returns Lista de negociaciones
   */
  public obtenerNegociaciones(filtros?: {
    empresaId?: string;
    estado?: EstadoNegociacion;
    tipoOperacion?: TipoOperacionMA;
  }): NegociacionMA[] {
    return this.gestorNegociaciones.obtenerNegociaciones(filtros);
  }
  
  /**
   * Obtiene una oferta por su ID
   * @param ofertaId ID de la oferta
   * @returns La oferta o undefined si no existe
   */
  public obtenerOferta(ofertaId: string): OfertaMA | undefined {
    return this.gestorNegociaciones.obtenerOferta(ofertaId);
  }
  
  /**
   * Obtiene un acuerdo por el ID de la negociación
   * @param negociacionId ID de la negociación
   * @returns El acuerdo o undefined si no existe
   */
  public obtenerAcuerdo(negociacionId: string): AcuerdoMA | undefined {
    return this.gestorNegociaciones.obtenerAcuerdo(negociacionId);
  }
  
  /**
   * Obtiene un proceso de integración por su ID
   * @param procesoId ID del proceso
   * @returns El proceso o undefined si no existe
   */
  public obtenerProcesoIntegracion(procesoId: string): ProcesoIntegracion | undefined {
    return this.gestorIntegracion.obtenerProceso(procesoId);
  }
  
  /**
   * Obtiene todos los procesos de integración
   * @param filtros Filtros opcionales
   * @returns Lista de procesos
   */
  public obtenerProcesosIntegracion(filtros?: {
    empresaId?: string;
    estado?: EstadoIntegracion;
  }): ProcesoIntegracion[] {
    return this.gestorIntegracion.obtenerProcesos(filtros);
  }
  
  /**
   * Simula el comportamiento de NPCs en respuesta a ofertas
   * @param ofertaId ID de la oferta a evaluar
   * @returns Decisión simulada del NPC
   */
  public simularRespuestaNPC(ofertaId: string): {
    decision: 'aceptar' | 'rechazar' | 'contraoferta';
    razon: string;
    contraoferta?: any;
  } {
    // Obtener la evaluación de la oferta
    const evaluacion = this.evaluarOferta(ofertaId);
    
    // Simular decisión basada en probabilidad de aceptación
    const probabilidad = evaluacion.evaluacion.probabilidadAceptacion;
    const aleatorio = Math.random() * 100;
    
    if (aleatorio < probabilidad) {
      // Aceptar la oferta
      return {
        decision: 'aceptar',
        razon: 'La oferta cumple con nuestras expectativas y valoración.'
      };
    } else if (aleatorio < probabilidad + 30) {
      // Presentar contraoferta
      const precioOriginal = evaluacion.oferta.precioOfertado;
      const valorMedio = (evaluacion.valoracion.valorEstimadoMin + evaluacion.valoracion.valorEstimadoMax) / 2;
      
      // Calcular precio de contraoferta (10-30% más alto)
      const incremento = 1 + (Math.random() * 0.2 + 0.1);
      const precioContraoferta = Math.max(
        precioOriginal * incremento,
        valorMedio * 1.05
      );
      
      return {
        decision: 'contraoferta',
        razon: 'La oferta es interesante pero insuficiente. Proponemos términos mejorados.',
        contraoferta: {
          precioSolicitado: Math.round(precioContraoferta),
          porcentajeAdquisicion: evaluacion.oferta.porcentajeAdquisicion,
          terminosFinanciacion: evaluacion.oferta.terminosFinanciacion,
          condiciones: evaluacion.oferta.condiciones
        }
      };
    } else {
      // Rechazar la oferta
      return {
        decision: 'rechazar',
        razon: 'La oferta está muy por debajo de nuestras expectativas y valoración.'
      };
    }
  }
  
  /**
   * Integra los efectos de una fusión o adquisición en los sistemas económicos y de producción
   * @param procesoId ID del proceso de integración
   * @returns Resumen de los efectos aplicados
   */
  public aplicarEfectosIntegracion(procesoId: string): {
    efectosEconomicos: any[];
    efectosProduccion: any[];
    efectosReputacion: any;
  } {
    const proceso = this.obtenerProcesoIntegracion(procesoId);
    if (!proceso) {
      throw new Error(`Proceso de integración no encontrado: ${procesoId}`);
    }
    
    // Verificar que el proceso tenga progreso suficiente
    if (proceso.progreso < 25) {
      throw new Error(`El proceso de integración no tiene suficiente progreso para aplicar efectos: ${proceso.progreso}%`);
    }
    
    // Calcular efectos basados en el progreso y las sinergias
    const factorProgreso = proceso.progreso / 100;
    const sinergias = proceso.sinergiasRealizadas;
    
    // Efectos económicos
    const efectosEconomicos = [
      {
        tipo: 'reduccion_costos',
        valor: sinergias.reduccionCostos * factorProgreso,
        descripcion: `Reducción de costos del ${(sinergias.reduccionCostos * factorProgreso).toFixed(1)}% por sinergias de integración`
      },
      {
        tipo: 'aumento_ingresos',
        valor: sinergias.aumentoIngresos * factorProgreso,
        descripcion: `Aumento de ingresos del ${(sinergias.aumentoIngresos * factorProgreso).toFixed(1)}% por expansión de mercado`
      }
    ];
    
    // Efectos en producción
    const efectosProduccion = [
      {
        tipo: 'mejora_eficiencia',
        valor: sinergias.mejoraEficiencia * factorProgreso,
        descripcion: `Mejora de eficiencia del ${(sinergias.mejoraEficiencia * factorProgreso).toFixed(1)}% en instalaciones productivas`
      },
      {
        tipo: 'capacidad_adicional',
        valor: 20 * factorProgreso, // 20% máximo de capacidad adicional
        descripcion: `Aumento de capacidad productiva del ${(20 * factorProgreso).toFixed(1)}% por adquisición de instalaciones`
      }
    ];
    
    // Efectos en reputación
    const efectosReputacion = {
      tipo: 'cambio_reputacion',
      valor: proceso.estado === EstadoIntegracion.CON_PROBLEMAS ? -5 * factorProgreso : 5 * factorProgreso,
      descripcion: proceso.estado === EstadoIntegracion.CON_PROBLEMAS 
        ? `Reducción de reputación del ${(5 * factorProgreso).toFixed(1)}% por problemas en la integración`
        : `Aumento de reputación del ${(5 * factorProgreso).toFixed(1)}% por integración exitosa`
    };
    
    return {
      efectosEconomicos,
      efectosProduccion,
      efectosReputacion
    };
  }

  // Nuevos métodos solicitados
  public obtenerAcuerdosRecientes(empresaId: string, limite: number): AcuerdoMA[] {
    // Esta es una implementación simulada. En un sistema real, se accedería
    // a una base de datos o a una colección interna de acuerdos.
    const todosLosAcuerdos = this.simularAcuerdosExistentes(empresaId);
    
    // Ordenar por fecha descendente (asumiendo que los acuerdos tienen una fecha)
    // y tomar el límite. Si AcuerdoMA no tiene fecha, este ordenamiento necesitará ajuste.
    // Para la simulación, asumiré que podemos acceder a una fecha a través de la negociación.
    return todosLosAcuerdos
      .sort((a, b) => {
        const negA = this.obtenerNegociacion(a.negociacionId); // Uses the class's obtenerNegociacion
        const negB = this.obtenerNegociacion(b.negociacionId); // Uses the class's obtenerNegociacion
        return (negB?.fechaUltimaActividad || 0) - (negA?.fechaUltimaActividad || 0);
      })
      .slice(0, limite);
  }

  private simularAcuerdosExistentes(empresaId: string): AcuerdoMA[] {
    // Simulación: Crear algunos acuerdos de ejemplo
    const acuerdosEjemplo: AcuerdoMA[] = [];
    const tiposOperacion = [TipoOperacionMA.ADQUISICION_COMPLETA, TipoOperacionMA.FUSION];
    const metodosPago = [TerminoFinanciacion.EFECTIVO, TerminoFinanciacion.ACCIONES, TerminoFinanciacion.MIXTO];

    for (let i = 0; i < 5; i++) {
      const negociacionIdSimulada = `neg_${empresaId}_acuerdo_${i}`;
      // Simular una negociación para obtener fecha
      if (!this.negociaciones.has(negociacionIdSimulada)) {
        const tipoOp = tiposOperacion[i % tiposOperacion.length];
        this.negociaciones.set(negociacionIdSimulada, {
          id: negociacionIdSimulada,
          tipoOperacion: tipoOp,
          empresaIniciadoraId: empresaId,
          empresaObjetivoId: `empresa_obj_${i}`,
          estado: EstadoNegociacion.ACUERDO_CERRADO, // Changed from ACUERDO_FINALIZADO
          ofertas: [],
          fechaInicio: Date.now() - (i * 1000 * 60 * 60 * 24 * 30), // Acuerdos mensuales
          fechaUltimaActividad: Date.now() - (i * 1000 * 60 * 60 * 24 * 30),
          notasNegociacion: [],
          // Add other required fields for NegociacionMA if any, e.g. acuerdoFinal, esHostil
          esHostil: false, // Default value
          acuerdoFinal: undefined, // Will be populated by the AcuerdoMA itself if needed by other logic
          valoracion: undefined, // Default or mock if needed
        } as NegociacionMA);
      }
      
      const negociacionSimulada = this.negociaciones.get(negociacionIdSimulada)!;

      acuerdosEjemplo.push({
        id: `acuerdo_${empresaId}_${i}`,
        negociacionId: negociacionIdSimulada,
        tipoOperacion: negociacionSimulada.tipoOperacion,
        empresaCompradoraId: empresaId,
        empresaVendidaId: `empresa_obj_${i}`,
        precioFinal: 1000000 * (i + 1),
        // porcentajeAdquirido: tipoOperacionMA.ADQUISICION ? 100 : undefined, // Corrected this line
        porcentajeAdquirido: negociacionSimulada.tipoOperacion === TipoOperacionMA.ADQUISICION_COMPLETA ? 100 : undefined,
        terminosFinanciacion: metodosPago[i % metodosPago.length], // Corrected from terminosFinales.metodoPago
        detallesFinanciacion: { info: `Detalles de pago simulados ${i}` }, // Corrected from terminosFinales.detallesPago
        condicionesFinales: [`Condición especial simulada ${i}`], // Corrected from terminosFinales.condicionesEspeciales
        // clausulasAdicionales: [`Cláusula adicional simulada ${i}`], // This was part of terminosFinales, moved to condicionesFinales for simplicity
        fechaFirma: Date.now() - (i * 1000 * 60 * 60 * 24 * 30), // Corrected from fechaAcuerdo
        sinergiasEstimadas: {
          reduccionCostos: 10000 * (i + 1),
          aumentoIngresos: 20000 * (i + 1),
          mejoraEficiencia: 5 + i,
          valorTotal: 30000 * (i + 1) + (5+i)*1000,
        },
        desafiosIntegracion: [{
          tipo: "Cultural", // Was 'tipo' in subtask, but AcuerdoMA has 'descripcion'
          severidad: 3 + i,
          descripcion: `Desafío cultural simulado ${i}`
        }],
        estado: EstadoTransaccion.ACUERDO // Added estado
      });
    }
    return acuerdosEjemplo;
  }
}
