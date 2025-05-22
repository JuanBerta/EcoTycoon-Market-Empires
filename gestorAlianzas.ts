/**
 * Sistema de Competencia Estratégica - Gestor de Alianzas
 * 
 * Este módulo implementa la lógica para gestionar alianzas estratégicas
 * entre empresas en EcoTycoon: Market Empires.
 */

import { 
  TipoAlianza,
  EstadoAlianza,
  AlianzaEstrategica,
  PropuestaAlianza
} from './competitionTypes';

/**
 * Clase que gestiona las alianzas estratégicas entre empresas
 */
export class GestorAlianzas {
  private alianzas: Map<string, AlianzaEstrategica> = new Map();
  private propuestas: Map<string, PropuestaAlianza> = new Map();
  
  constructor() {
    // Inicialización
  }
  
  /**
   * Crea una nueva propuesta de alianza
   * @param empresaProponente ID de la empresa que propone la alianza
   * @param empresasObjetivo IDs de las empresas a las que se propone
   * @param tipo Tipo de alianza propuesta
   * @param duracion Duración propuesta en días de juego
   * @param condiciones Condiciones propuestas
   * @param beneficios Beneficios ofrecidos
   * @returns La propuesta creada
   */
  public crearPropuestaAlianza(
    empresaProponente: string,
    empresasObjetivo: string[],
    tipo: TipoAlianza,
    duracion: number,
    condiciones: { descripcion: string; importancia: number }[],
    beneficios: { empresaId: string; descripcion: string; valorEstimado: number }[]
  ): PropuestaAlianza {
    // Generar ID único para la propuesta
    const id = `propuesta_alianza_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Crear la propuesta
    const propuesta: PropuestaAlianza = {
      id,
      tipo,
      empresaProponente,
      empresasObjetivo,
      fechaPropuesta: fechaActual,
      duracionPropuesta: duracion,
      condicionesPropuestas: condiciones,
      beneficiosPropuestos: beneficios,
      estado: 'pendiente'
    };
    
    // Almacenar la propuesta
    this.propuestas.set(id, propuesta);
    
    return propuesta;
  }
  
  /**
   * Responde a una propuesta de alianza
   * @param propuestaId ID de la propuesta
   * @param empresaRespondiente ID de la empresa que responde
   * @param respuesta Tipo de respuesta (aceptar, rechazar, contrapropuesta)
   * @param detallesRespuesta Detalles adicionales de la respuesta
   * @returns La propuesta actualizada o la nueva contrapropuesta
   */
  public responderPropuesta(
    propuestaId: string,
    empresaRespondiente: string,
    respuesta: 'aceptar' | 'rechazar' | 'contrapropuesta',
    detallesRespuesta?: {
      motivoRechazo?: string;
      contrapropuesta?: {
        duracion: number;
        condiciones: { descripcion: string; importancia: number }[];
        beneficios: { empresaId: string; descripcion: string; valorEstimado: number }[];
      };
    }
  ): PropuestaAlianza | AlianzaEstrategica {
    // Obtener la propuesta
    const propuesta = this.obtenerPropuesta(propuestaId);
    if (!propuesta) {
      throw new Error(`Propuesta no encontrada: ${propuestaId}`);
    }
    
    // Verificar que la empresa respondiente es una de las empresas objetivo
    if (!propuesta.empresasObjetivo.includes(empresaRespondiente)) {
      throw new Error(`La empresa ${empresaRespondiente} no es destinataria de la propuesta ${propuestaId}`);
    }
    
    const fechaActual = Date.now();
    
    // Procesar según tipo de respuesta
    switch (respuesta) {
      case 'aceptar':
        // Actualizar estado de la propuesta
        propuesta.estado = 'aceptada';
        propuesta.fechaRespuesta = fechaActual;
        
        // Crear la alianza
        const alianza = this.crearAlianzaDesdeAceptacion(propuesta, empresaRespondiente);
        
        // Guardar la propuesta actualizada
        this.propuestas.set(propuestaId, propuesta);
        
        return alianza;
        
      case 'rechazar':
        // Actualizar estado de la propuesta
        propuesta.estado = 'rechazada';
        propuesta.fechaRespuesta = fechaActual;
        propuesta.motivoRechazo = detallesRespuesta?.motivoRechazo || 'No se especificó motivo';
        
        // Guardar la propuesta actualizada
        this.propuestas.set(propuestaId, propuesta);
        
        return propuesta;
        
      case 'contrapropuesta':
        if (!detallesRespuesta?.contrapropuesta) {
          throw new Error('Detalles de contrapropuesta requeridos');
        }
        
        // Actualizar estado de la propuesta original
        propuesta.estado = 'contrapropuesta';
        propuesta.fechaRespuesta = fechaActual;
        
        // Guardar la propuesta actualizada
        this.propuestas.set(propuestaId, propuesta);
        
        // Crear la contrapropuesta
        const contrapropuesta = this.crearContrapropuesta(
          propuesta,
          empresaRespondiente,
          detallesRespuesta.contrapropuesta
        );
        
        return contrapropuesta;
        
      default:
        throw new Error(`Tipo de respuesta no válido: ${respuesta}`);
    }
  }
  
  /**
   * Crea una alianza a partir de una propuesta aceptada
   * @param propuesta Propuesta aceptada
   * @param empresaAceptante Empresa que aceptó la propuesta
   * @returns La alianza creada
   */
  private crearAlianzaDesdeAceptacion(
    propuesta: PropuestaAlianza,
    empresaAceptante: string
  ): AlianzaEstrategica {
    // Generar ID único para la alianza
    const id = `alianza_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Determinar participantes (puede ser bilateral o multilateral)
    const empresasParticipantes = [propuesta.empresaProponente];
    
    // Si es multilateral, incluir todas las empresas objetivo
    // Si es bilateral, incluir solo la empresa aceptante
    if (propuesta.empresasObjetivo.length > 1) {
      // Multilateral: verificar si todas han aceptado
      const todasAceptaron = propuesta.empresasObjetivo.every(empresaId => {
        // Buscar si hay propuestas aceptadas para esta empresa
        return Array.from(this.propuestas.values()).some(p => 
          p.id !== propuesta.id && // No es la misma propuesta
          p.empresaProponente === propuesta.empresaProponente && // Mismo proponente
          p.empresasObjetivo.includes(empresaId) && // Incluye esta empresa
          p.estado === 'aceptada' // Ha sido aceptada
        );
      });
      
      if (todasAceptaron) {
        // Incluir todas las empresas objetivo
        empresasParticipantes.push(...propuesta.empresasObjetivo);
      } else {
        // Solo incluir la empresa aceptante
        empresasParticipantes.push(empresaAceptante);
      }
    } else {
      // Bilateral: incluir solo la empresa aceptante
      empresasParticipantes.push(empresaAceptante);
    }
    
    // Convertir condiciones propuestas a condiciones de alianza
    const condiciones = propuesta.condicionesPropuestas.map(condicion => ({
      descripcion: condicion.descripcion,
      cumplimiento: 100 // Inicialmente se asume cumplimiento total
    }));
    
    // Convertir beneficios propuestos a beneficios de alianza
    const beneficios = propuesta.beneficiosPropuestos.map(beneficio => ({
      empresaId: beneficio.empresaId,
      descripcion: beneficio.descripcion,
      valorEstimado: beneficio.valorEstimado,
      valorRealizado: 0 // Inicialmente no se ha realizado ningún valor
    }));
    
    // Crear la alianza
    const alianza: AlianzaEstrategica = {
      id,
      tipo: propuesta.tipo,
      empresasParticipantes,
      fechaInicio: fechaActual,
      duracion: propuesta.duracionPropuesta,
      estado: EstadoAlianza.ACTIVA,
      condiciones,
      beneficios,
      nivelConfianza: 80, // Nivel inicial de confianza
      historialEventos: [{
        fecha: fechaActual,
        descripcion: 'Alianza establecida',
        impacto: 50 // Impacto positivo inicial
      }],
      renovacionAutomatica: false, // Por defecto no se renueva automáticamente
      clausulasEspeciales: []
    };
    
    // Almacenar la alianza
    this.alianzas.set(id, alianza);
    
    return alianza;
  }
  
  /**
   * Crea una contrapropuesta a partir de una propuesta original
   * @param propuestaOriginal Propuesta original
   * @param empresaContraproponente Empresa que hace la contrapropuesta
   * @param detallesContrapropuesta Detalles de la contrapropuesta
   * @returns La contrapropuesta creada
   */
  private crearContrapropuesta(
    propuestaOriginal: PropuestaAlianza,
    empresaContraproponente: string,
    detallesContrapropuesta: {
      duracion: number;
      condiciones: { descripcion: string; importancia: number }[];
      beneficios: { empresaId: string; descripcion: string; valorEstimado: number }[];
    }
  ): PropuestaAlianza {
    // Generar ID único para la contrapropuesta
    const id = `propuesta_alianza_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Crear la contrapropuesta
    const contrapropuesta: PropuestaAlianza = {
      id,
      tipo: propuestaOriginal.tipo,
      empresaProponente: empresaContraproponente,
      empresasObjetivo: [propuestaOriginal.empresaProponente], // Invertir roles
      fechaPropuesta: fechaActual,
      duracionPropuesta: detallesContrapropuesta.duracion,
      condicionesPropuestas: detallesContrapropuesta.condiciones,
      beneficiosPropuestos: detallesContrapropuesta.beneficios,
      estado: 'pendiente',
      contrapropuestaId: propuestaOriginal.id // Referencia a la propuesta original
    };
    
    // Almacenar la contrapropuesta
    this.propuestas.set(id, contrapropuesta);
    
    return contrapropuesta;
  }
  
  /**
   * Actualiza el estado de una alianza existente
   * @param alianzaId ID de la alianza
   * @param diasTranscurridos Días transcurridos desde la última actualización
   * @returns La alianza actualizada
   */
  public actualizarAlianza(
    alianzaId: string,
    diasTranscurridos: number = 1
  ): AlianzaEstrategica {
    // Obtener la alianza
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    
    const fechaActual = Date.now();
    
    // Verificar si la alianza ha expirado
    if (alianza.fechaInicio + (alianza.duracion * 24 * 60 * 60 * 1000) <= fechaActual) {
      // La alianza ha llegado a su fin natural
      if (alianza.renovacionAutomatica) {
        // Renovar la alianza
        alianza.duracion += 365; // Añadir un año (simplificado)
        
        // Registrar evento
        alianza.historialEventos.push({
          fecha: fechaActual,
          descripcion: 'Alianza renovada automáticamente',
          impacto: 20 // Impacto positivo moderado
        });
      } else {
        // Terminar la alianza
        alianza.estado = EstadoAlianza.TERMINADA;
        alianza.fechaFin = fechaActual;
        
        // Registrar evento
        alianza.historialEventos.push({
          fecha: fechaActual,
          descripcion: 'Alianza finalizada por vencimiento del plazo',
          impacto: 0 // Impacto neutral
        });
        
        // Guardar la alianza actualizada
        this.alianzas.set(alianzaId, alianza);
        
        return alianza;
      }
    }
    
    // Actualizar cumplimiento de condiciones
    this.actualizarCumplimientoCondiciones(alianza, diasTranscurridos);
    
    // Actualizar beneficios realizados
    this.actualizarBeneficiosRealizados(alianza, diasTranscurridos);
    
    // Actualizar nivel de confianza
    this.actualizarNivelConfianza(alianza);
    
    // Verificar si la alianza está deteriorada
    if (alianza.nivelConfianza < 30 && alianza.estado === EstadoAlianza.ACTIVA) {
      alianza.estado = EstadoAlianza.DETERIORADA;
      
      // Registrar evento
      alianza.historialEventos.push({
        fecha: fechaActual,
        descripcion: 'Alianza deteriorada por bajo nivel de confianza',
        impacto: -30 // Impacto negativo significativo
      });
    }
    
    // Verificar si la alianza se ha recuperado
    if (alianza.nivelConfianza > 50 && alianza.estado === EstadoAlianza.DETERIORADA) {
      alianza.estado = EstadoAlianza.ACTIVA;
      
      // Registrar evento
      alianza.historialEventos.push({
        fecha: fechaActual,
        descripcion: 'Alianza recuperada tras mejora en nivel de confianza',
        impacto: 30 // Impacto positivo significativo
      });
    }
    
    // Guardar la alianza actualizada
    this.alianzas.set(alianzaId, alianza);
    
    return alianza;
  }
  
  /**
   * Actualiza el cumplimiento de las condiciones de una alianza
   * @param alianza Alianza a actualizar
   * @param diasTranscurridos Días transcurridos
   */
  private actualizarCumplimientoCondiciones(
    alianza: AlianzaEstrategica,
    diasTranscurridos: number
  ): void {
    // Para cada condición, simular cambios en el cumplimiento
    for (const condicion of alianza.condiciones) {
      // Probabilidad base de cambio en cumplimiento
      const probabilidadCambio = 0.1 * diasTranscurridos;
      
      if (Math.random() < probabilidadCambio) {
        // Determinar si mejora o empeora
        const cambio = Math.random() < 0.7 ? 5 : -10; // Más probable mejorar que empeorar
        
        // Aplicar cambio
        condicion.cumplimiento = Math.max(0, Math.min(100, condicion.cumplimiento + cambio));
        
        // Si el cambio es significativo, registrar evento
        if (Math.abs(cambio) >= 10) {
          alianza.historialEventos.push({
            fecha: Date.now(),
            descripcion: cambio > 0 
              ? `Mejora en cumplimiento de condición: ${condicion.descripcion}`
              : `Deterioro en cumplimiento de condición: ${condicion.descripcion}`,
            impacto: cambio / 2 // Impacto proporcional al cambio
          });
        }
      }
    }
  }
  
  /**
   * Actualiza los beneficios realizados de una alianza
   * @param alianza Alianza a actualizar
   * @param diasTranscurridos Días transcurridos
   */
  private actualizarBeneficiosRealizados(
    alianza: AlianzaEstrategica,
    diasTranscurridos: number
  ): void {
    // Calcular progreso de la alianza (0-1)
    const tiempoTotal = alianza.duracion * 24 * 60 * 60 * 1000;
    const tiempoTranscurrido = Date.now() - alianza.fechaInicio;
    const progreso = Math.min(1, tiempoTranscurrido / tiempoTotal);
    
    // Calcular nivel de cumplimiento promedio
    const cumplimientoPromedio = alianza.condiciones.reduce(
      (sum, condicion) => sum + condicion.cumplimiento, 0
    ) / Math.max(1, alianza.condiciones.length);
    
    // Factor de efectividad basado en cumplimiento y confianza
    const factorEfectividad = (cumplimientoPromedio / 100) * (alianza.nivelConfianza / 100);
    
    // Para cada beneficio, actualizar valor realizado
    for (const beneficio of alianza.beneficios) {
      // Valor esperado en este punto del tiempo
      const valorEsperado = beneficio.valorEstimado * progreso;
      
      // Valor real considerando efectividad
      const valorReal = valorEsperado * factorEfectividad;
      
      // Incremento diario promedio
      const incrementoDiario = (valorReal - beneficio.valorRealizado) / Math.max(1, diasTranscurridos);
      
      // Aplicar incremento con algo de variabilidad
      const variabilidad = 0.2; // 20% de variabilidad
      const factorVariabilidad = 1 + (Math.random() * variabilidad * 2 - variabilidad);
      
      beneficio.valorRealizado += incrementoDiario * factorVariabilidad;
      
      // Limitar a valor estimado
      beneficio.valorRealizado = Math.min(beneficio.valorEstimado, beneficio.valorRealizado);
    }
    
    // Si hay un cambio significativo en beneficios, registrar evento
    const beneficioTotal = alianza.beneficios.reduce(
      (sum, beneficio) => sum + beneficio.valorRealizado, 0
    );
    
    // Registrar evento cada 25% de beneficio total realizado
    const beneficioEstimadoTotal = alianza.beneficios.reduce(
      (sum, beneficio) => sum + beneficio.valorEstimado, 0
    );
    
    const porc
(Content truncated due to size limit. Use line ranges to read in chunks)