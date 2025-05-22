/**
 * Sistema de Fusiones y Adquisiciones - Gestor de Negociaciones
 * 
 * Este módulo implementa la lógica para gestionar negociaciones
 * de fusiones y adquisiciones entre empresas.
 */

import { 
  NegociacionMA, 
  OfertaMA,
  TipoOperacionMA,
  EstadoNegociacion,
  TerminoFinanciacion,
  AcuerdoMA,
  ValoracionEmpresa
} from './fusionesTypes';

import { GestorValoracion } from './gestorValoracion';

/**
 * Clase que gestiona las negociaciones de fusiones y adquisiciones
 */
export class GestorNegociaciones {
  private negociaciones: Map<string, NegociacionMA> = new Map();
  private ofertas: Map<string, OfertaMA> = new Map();
  private acuerdos: Map<string, AcuerdoMA> = new Map();
  private gestorValoracion: GestorValoracion;
  
  constructor(gestorValoracion: GestorValoracion) {
    this.gestorValoracion = gestorValoracion;
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
    // Generar ID único para la negociación
    const id = `negociacion_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Crear la negociación
    const negociacion: NegociacionMA = {
      id,
      tipoOperacion,
      empresaIniciadoraId,
      empresaObjetivoId,
      estado: EstadoNegociacion.IDENTIFICACION,
      ofertas: [],
      fechaInicio: fechaActual,
      fechaUltimaActividad: fechaActual,
      notasNegociacion: [],
      esHostil
    };
    
    // Almacenar la negociación
    this.negociaciones.set(id, negociacion);
    
    // Añadir nota inicial
    this.agregarNotaNegociacion(id, `Negociación iniciada por ${empresaIniciadoraId} para ${tipoOperacion} ${esHostil ? '(OPA hostil)' : ''}`);
    
    return negociacion;
  }
  
  /**
   * Realiza la valoración de la empresa objetivo en una negociación
   * @param negociacionId ID de la negociación
   * @param datosAdicionales Datos adicionales para la valoración
   * @returns La negociación actualizada con la valoración
   */
  public realizarValoracion(
    negociacionId: string,
    datosAdicionales?: any
  ): NegociacionMA {
    // Obtener la negociación
    const negociacion = this.obtenerNegociacion(negociacionId);
    if (!negociacion) {
      throw new Error(`Negociación no encontrada: ${negociacionId}`);
    }
    
    // Verificar que está en estado adecuado
    if (negociacion.estado !== EstadoNegociacion.IDENTIFICACION) {
      throw new Error(`Estado incorrecto para valoración: ${negociacion.estado}`);
    }
    
    // Realizar la valoración
    const valoracion = this.gestorValoracion.valorarEmpresa(
      negociacion.empresaObjetivoId,
      undefined,
      datosAdicionales
    );
    
    // Actualizar la negociación
    negociacion.valoracion = valoracion;
    negociacion.estado = EstadoNegociacion.VALORACION;
    negociacion.fechaUltimaActividad = Date.now();
    
    // Añadir nota
    this.agregarNotaNegociacion(
      negociacionId, 
      `Valoración realizada: ${valoracion.valorEstimadoMin.toLocaleString()} - ${valoracion.valorEstimadoMax.toLocaleString()} créditos (${valoracion.metodoPrincipal})`
    );
    
    // Guardar la negociación actualizada
    this.negociaciones.set(negociacionId, negociacion);
    
    return negociacion;
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
    // Obtener la negociación
    const negociacion = this.obtenerNegociacion(negociacionId);
    if (!negociacion) {
      throw new Error(`Negociación no encontrada: ${negociacionId}`);
    }
    
    // Verificar que está en estado adecuado
    if (negociacion.estado !== EstadoNegociacion.VALORACION) {
      throw new Error(`Estado incorrecto para oferta inicial: ${negociacion.estado}`);
    }
    
    // Generar ID único para la oferta
    const ofertaId = `oferta_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Crear la oferta
    const nuevaOferta: OfertaMA = {
      id: ofertaId,
      tipoOperacion: negociacion.tipoOperacion,
      empresaOfertanteId: negociacion.empresaIniciadoraId,
      empresaObjetivoId: negociacion.empresaObjetivoId,
      precioOfertado: oferta.precioOfertado,
      porcentajeAdquisicion: oferta.porcentajeAdquisicion,
      terminosFinanciacion: oferta.terminosFinanciacion,
      detallesFinanciacion: oferta.detallesFinanciacion,
      condiciones: oferta.condiciones || [],
      fechaOferta: fechaActual,
      fechaExpiracion: oferta.fechaExpiracion,
      estado: 'pendiente'
    };
    
    // Almacenar la oferta
    this.ofertas.set(ofertaId, nuevaOferta);
    
    // Actualizar la negociación
    negociacion.ofertas.push(nuevaOferta);
    negociacion.estado = EstadoNegociacion.OFERTA_INICIAL;
    negociacion.fechaUltimaActividad = fechaActual;
    
    // Añadir nota
    this.agregarNotaNegociacion(
      negociacionId, 
      `Oferta inicial presentada: ${nuevaOferta.precioOfertado.toLocaleString()} créditos (${nuevaOferta.terminosFinanciacion})`
    );
    
    // Guardar la negociación actualizada
    this.negociaciones.set(negociacionId, negociacion);
    
    return negociacion;
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
    // Obtener la oferta
    const oferta = this.obtenerOferta(ofertaId);
    if (!oferta) {
      throw new Error(`Oferta no encontrada: ${ofertaId}`);
    }
    
    // Buscar la negociación asociada
    let negociacion: NegociacionMA | undefined;
    for (const [_, neg] of this.negociaciones.entries()) {
      if (neg.ofertas.some(o => o.id === ofertaId)) {
        negociacion = neg;
        break;
      }
    }
    
    if (!negociacion) {
      throw new Error(`Negociación no encontrada para oferta: ${ofertaId}`);
    }
    
    // Obtener la valoración
    const valoracion = negociacion.valoracion;
    if (!valoracion) {
      throw new Error(`Valoración no disponible para negociación: ${negociacion.id}`);
    }
    
    // Evaluar el precio
    const valorMedio = (valoracion.valorEstimadoMin + valoracion.valorEstimadoMax) / 2;
    const precioAdecuado = oferta.precioOfertado >= valoracion.valorEstimadoMin;
    const premioPorcentaje = ((oferta.precioOfertado / valorMedio) - 1) * 100;
    
    // Evaluar términos de financiación
    let terminosAceptables = true;
    const comentariosTerminos: string[] = [];
    
    switch (oferta.terminosFinanciacion) {
      case TerminoFinanciacion.EFECTIVO:
        // El efectivo siempre es preferible
        comentariosTerminos.push("El pago en efectivo es favorable para los accionistas.");
        break;
      case TerminoFinanciacion.ACCIONES:
        // Evaluar si las acciones son atractivas
        terminosAceptables = premioPorcentaje > 15; // Requiere mayor premio si es en acciones
        comentariosTerminos.push(
          terminosAceptables 
            ? "El intercambio de acciones ofrece un premio suficiente."
            : "El intercambio de acciones no ofrece suficiente valor."
        );
        break;
      case TerminoFinanciacion.DEUDA:
        // La deuda es menos atractiva
        terminosAceptables = premioPorcentaje > 25; // Requiere premio aún mayor
        comentariosTerminos.push(
          terminosAceptables 
            ? "La financiación mediante deuda es aceptable dado el premio ofrecido."
            : "La financiación mediante deuda presenta riesgos no compensados por el precio."
        );
        break;
      case TerminoFinanciacion.MIXTO:
        // Depende de la proporción
        terminosAceptables = premioPorcentaje > 10; // Premio intermedio
        comentariosTerminos.push(
          terminosAceptables 
            ? "La combinación de métodos de pago es equilibrada."
            : "La estructura mixta de financiación no es óptima."
        );
        break;
    }
    
    // Evaluar condiciones
    const condicionesAceptables = oferta.condiciones.length <= 3; // Simplificado
    const comentariosCondiciones: string[] = [];
    
    if (oferta.condiciones.length === 0) {
      comentariosCondiciones.push("La ausencia de condiciones adicionales es positiva.");
    } else if (condicionesAceptables) {
      comentariosCondiciones.push("Las condiciones son razonables y aceptables.");
    } else {
      comentariosCondiciones.push("Hay demasiadas condiciones que complican la operación.");
    }
    
    // Calcular probabilidad de aceptación
    let probabilidadAceptacion = 0;
    
    if (precioAdecuado) {
      // Base: 50% si el precio es adecuado
      probabilidadAceptacion = 50;
      
      // Ajustar por premio
      if (premioPorcentaje > 30) {
        probabilidadAceptacion += 30;
      } else if (premioPorcentaje > 20) {
        probabilidadAceptacion += 20;
      } else if (premioPorcentaje > 10) {
        probabilidadAceptacion += 10;
      } else if (premioPorcentaje > 0) {
        probabilidadAceptacion += 5;
      } else {
        probabilidadAceptacion -= 10;
      }
      
      // Ajustar por términos
      if (oferta.terminosFinanciacion === TerminoFinanciacion.EFECTIVO) {
        probabilidadAceptacion += 15;
      } else if (oferta.terminosFinanciacion === TerminoFinanciacion.ACCIONES) {
        probabilidadAceptacion -= 5;
      } else if (oferta.terminosFinanciacion === TerminoFinanciacion.DEUDA) {
        probabilidadAceptacion -= 10;
      }
      
      // Ajustar por condiciones
      if (oferta.condiciones.length === 0) {
        probabilidadAceptacion += 10;
      } else if (oferta.condiciones.length > 3) {
        probabilidadAceptacion -= 15;
      } else {
        probabilidadAceptacion -= 5;
      }
      
      // Ajustar por hostilidad
      if (negociacion.esHostil) {
        probabilidadAceptacion -= 30;
      }
    } else {
      // Si el precio no es adecuado, probabilidad baja
      probabilidadAceptacion = 10;
      
      // Aún así, ajustar por otros factores
      if (oferta.terminosFinanciacion === TerminoFinanciacion.EFECTIVO) {
        probabilidadAceptacion += 5;
      }
      
      if (oferta.condiciones.length === 0) {
        probabilidadAceptacion += 5;
      }
      
      // Hostilidad reduce aún más
      if (negociacion.esHostil) {
        probabilidadAceptacion = Math.max(5, probabilidadAceptacion - 10);
      }
    }
    
    // Limitar al rango 0-100
    probabilidadAceptacion = Math.max(0, Math.min(100, probabilidadAceptacion));
    
    // Comentarios generales
    const comentariosGenerales: string[] = [];
    
    if (probabilidadAceptacion > 80) {
      comentariosGenerales.push("La oferta es muy atractiva y tiene alta probabilidad de aceptación.");
    } else if (probabilidadAceptacion > 60) {
      comentariosGenerales.push("La oferta es favorable y tiene buenas posibilidades de aceptación.");
    } else if (probabilidadAceptacion > 40) {
      comentariosGenerales.push("La oferta es aceptable pero podría requerir mejoras para ser aprobada.");
    } else if (probabilidadAceptacion > 20) {
      comentariosGenerales.push("La oferta es débil y probablemente será rechazada sin mejoras significativas.");
    } else {
      comentariosGenerales.push("La oferta es inadecuada y tiene muy pocas posibilidades de aceptación.");
    }
    
    // Combinar comentarios
    const comentarios = [
      ...comentariosGenerales,
      ...comentariosTerminos,
      ...comentariosCondiciones
    ];
    
    return {
      oferta,
      valoracion,
      evaluacion: {
        precioAdecuado,
        premioPorcentaje,
        terminosAceptables,
        condicionesAceptables,
        probabilidadAceptacion,
        comentarios
      }
    };
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
    // Obtener la oferta
    const oferta = this.obtenerOferta(ofertaId);
    if (!oferta) {
      throw new Error(`Oferta no encontrada: ${ofertaId}`);
    }
    
    // Buscar la negociación asociada
    let negociacion: NegociacionMA | undefined;
    let negociacionId: string = '';
    
    for (const [id, neg] of this.negociaciones.entries()) {
      if (neg.ofertas.some(o => o.id === ofertaId)) {
        negociacion = neg;
        negociacionId = id;
        break;
      }
    }
    
    if (!negociacion) {
      throw new Error(`Negociación no encontrada para oferta: ${ofertaId}`);
    }
    
    const fechaActual = Date.now();
    
    // Procesar según tipo de respuesta
    switch (respuesta) {
      case 'aceptar':
        // Actualizar estado de la oferta
        oferta.estado = 'aceptada';
        this.ofertas.set(ofertaId, oferta);
        
        // Actualizar negociación
        negociacion.estado = EstadoNegociacion.ACUERDO_PRELIMINAR;
        negociacion.fechaUltimaActividad = fechaActual;
        
        // Añadir nota
        this.agregarNotaNegociacion(
          negociacionId, 
          `Oferta aceptada: ${oferta.precioOfertado.toLocaleString()} créditos`
        );
        break;
        
      case 'rechazar':
        // Actualizar estado de la oferta
        oferta.estado = 'rechazada';
        this.ofertas.set(ofertaId, oferta);
        
        // Verificar si hay más ofertas pendientes
        const hayOfertasPendientes = negociacion.ofertas.some(o => o.estado === 'pendiente' && o.id !== ofertaId);
        
        // Actualizar negociación
        if (!hayOfertasPendientes) {
          negociacion.estado = EstadoNegociacion.RECHAZADA;
        }
        negociacion.fechaUltimaActividad = fechaActual;
        
        // Añadir nota
        this.agregarNotaNegociacion(
          negociacionId, 
          `Oferta rechazada: ${oferta.precioOfertado.toLocaleString()} créditos`
        );
        break;
        
      case 'contraoferta':
        if (!contraoferta) {
          throw new Error('Detalles de contraoferta requeridos');
        }
        
        // Actualizar estado de la oferta original
        oferta.estado = 'rechazada';
        this.ofertas.set(ofertaId, oferta);
        
        // Generar ID único para la contraoferta
        const contraofertaId = `oferta_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        
        // Crear la contraoferta
        const n
(Content truncated due to size limit. Use line ranges to read in chunks)