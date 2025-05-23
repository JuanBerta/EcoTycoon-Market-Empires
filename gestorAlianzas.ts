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
    
    if (propuesta.empresasObjetivo.length > 1) {
      const todasAceptaron = propuesta.empresasObjetivo.every(empresaId => {
        return Array.from(this.propuestas.values()).some(p => 
          p.id !== propuesta.id && 
          p.empresaProponente === propuesta.empresaProponente && 
          p.empresasObjetivo.includes(empresaId) && 
          p.estado === 'aceptada' 
        );
      });
      
      if (todasAceptaron) {
        empresasParticipantes.push(...propuesta.empresasObjetivo);
      } else {
        empresasParticipantes.push(empresaAceptante);
      }
    } else {
      empresasParticipantes.push(empresaAceptante);
    }
    
    const condiciones = propuesta.condicionesPropuestas.map(condicion => ({
      descripcion: condicion.descripcion,
      cumplimiento: 100 
    }));
    
    const beneficios = propuesta.beneficiosPropuestos.map(beneficio => ({
      empresaId: beneficio.empresaId,
      descripcion: beneficio.descripcion,
      valorEstimado: beneficio.valorEstimado,
      valorRealizado: 0 
    }));
    
    const alianza: AlianzaEstrategica = {
      id,
      tipo: propuesta.tipo,
      empresasParticipantes: [...new Set(empresasParticipantes)], // Ensure unique participants
      fechaInicio: fechaActual,
      duracion: propuesta.duracionPropuesta,
      estado: EstadoAlianza.ACTIVA,
      condiciones,
      beneficios,
      nivelConfianza: 80, 
      historialEventos: [{
        fecha: fechaActual,
        descripcion: 'Alianza establecida',
        impacto: 50 
      }],
      renovacionAutomatica: false, 
      clausulasEspeciales: []
    };
    
    this.alianzas.set(id, alianza);
    return alianza;
  }
  
  private crearContrapropuesta(
    propuestaOriginal: PropuestaAlianza,
    empresaContraproponente: string,
    detallesContrapropuesta: {
      duracion: number;
      condiciones: { descripcion: string; importancia: number }[];
      beneficios: { empresaId: string; descripcion: string; valorEstimado: number }[];
    }
  ): PropuestaAlianza {
    const id = `propuesta_alianza_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    const contrapropuesta: PropuestaAlianza = {
      id,
      tipo: propuestaOriginal.tipo,
      empresaProponente: empresaContraproponente,
      empresasObjetivo: [propuestaOriginal.empresaProponente], 
      fechaPropuesta: fechaActual,
      duracionPropuesta: detallesContrapropuesta.duracion,
      condicionesPropuestas: detallesContrapropuesta.condiciones,
      beneficiosPropuestos: detallesContrapropuesta.beneficios,
      estado: 'pendiente',
      contrapropuestaId: propuestaOriginal.id 
    };
    
    this.propuestas.set(id, contrapropuesta);
    return contrapropuesta;
  }
  
  public actualizarAlianza(
    alianzaId: string,
    diasTranscurridos: number = 1
  ): AlianzaEstrategica {
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    
    const fechaActual = Date.now();
    
    if (alianza.fechaFin && alianza.fechaFin <= fechaActual) {
         alianza.estado = EstadoAlianza.TERMINADA;
         this.alianzas.set(alianzaId, alianza);
         return alianza;
    }

    if (!alianza.fechaFin && (alianza.fechaInicio + (alianza.duracion * 24 * 60 * 60 * 1000) <= fechaActual)) {
      if (alianza.renovacionAutomatica) {
        alianza.duracion += 365; 
        alianza.historialEventos.push({
          fecha: fechaActual,
          descripcion: 'Alianza renovada automáticamente',
          impacto: 20 
        });
      } else {
        alianza.estado = EstadoAlianza.TERMINADA;
        alianza.fechaFin = fechaActual; 
        alianza.historialEventos.push({
          fecha: fechaActual,
          descripcion: 'Alianza finalizada por vencimiento del plazo',
          impacto: 0 
        });
        this.alianzas.set(alianzaId, alianza);
        return alianza;
      }
    }
    
    this.actualizarCumplimientoCondiciones(alianza, diasTranscurridos);
    this.actualizarBeneficiosRealizados(alianza, diasTranscurridos);
    this.actualizarNivelConfianza(alianza);
    
    if (alianza.nivelConfianza < 30 && alianza.estado === EstadoAlianza.ACTIVA) {
      alianza.estado = EstadoAlianza.DETERIORADA;
      alianza.historialEventos.push({
        fecha: fechaActual,
        descripcion: 'Alianza deteriorada por bajo nivel de confianza',
        impacto: -30 
      });
    }
    
    if (alianza.nivelConfianza > 50 && alianza.estado === EstadoAlianza.DETERIORADA) {
      alianza.estado = EstadoAlianza.ACTIVA;
      alianza.historialEventos.push({
        fecha: fechaActual,
        descripcion: 'Alianza recuperada tras mejora en nivel de confianza',
        impacto: 30 
      });
    }
    
    this.alianzas.set(alianzaId, alianza);
    return alianza;
  }
  
  private actualizarCumplimientoCondiciones(
    alianza: AlianzaEstrategica,
    diasTranscurridos: number
  ): void {
    for (const condicion of alianza.condiciones) {
      if (condicion.descripcion === "condicion_especial") { 
        if (alianza.nivelConfianza > 90) {
          condicion.cumplimiento = 100;
        } else {
          condicion.cumplimiento = 0;
        }
      } else { 
        const probabilidadCambio = 0.1 * diasTranscurridos;
        if (Math.random() < probabilidadCambio) {
          const cambio = Math.random() < 0.7 ? 5 : -10; 
          condicion.cumplimiento = Math.max(0, Math.min(100, condicion.cumplimiento + cambio));
          if (Math.abs(cambio) >= 10) {
            alianza.historialEventos.push({
              fecha: Date.now(),
              descripcion: cambio > 0 
                ? `Mejora en cumplimiento de condición: ${condicion.descripcion}`
                : `Deterioro en cumplimiento de condición: ${condicion.descripcion}`,
              impacto: cambio / 2 
            });
          }
        }
      }
    }
  }
  
  private actualizarBeneficiosRealizados(
    alianza: AlianzaEstrategica,
    diasTranscurridos: number
  ): void {
    const tiempoTotalMs = alianza.duracion * 24 * 60 * 60 * 1000;
    const tiempoTranscurridoMs = Date.now() - alianza.fechaInicio;
    const progresoTiempo = Math.min(1, tiempoTranscurridoMs / Math.max(1, tiempoTotalMs));

    const cumplimientoPromedio = alianza.condiciones.length > 0
      ? alianza.condiciones.reduce((sum, condicion) => sum + condicion.cumplimiento, 0) / alianza.condiciones.length
      : 100;

    const factorEfectividad = (cumplimientoPromedio / 100) * (alianza.nivelConfianza / 100);

    for (const beneficio of alianza.beneficios) {
      const valorEsperadoTotal = beneficio.valorEstimado;
      
      const diasTotalesAlianza = alianza.duracion;
      const diasDesdeInicio = tiempoTranscurridoMs / (1000 * 60 * 60 * 24);
      const diasHastaPeriodoAnterior = Math.max(0, diasDesdeInicio - diasTranscurridos);

      const progresoTiempoPeriodoAnterior = Math.min(1, diasHastaPeriodoAnterior / Math.max(1, diasTotalesAlianza));
      const valorRealizablePeriodoAnterior = valorEsperadoTotal * progresoTiempoPeriodoAnterior * factorEfectividad;
      
      const valorRealizableActual = valorEsperadoTotal * progresoTiempo * factorEfectividad;
      
      const incrementoPotencialEnPeriodo = valorRealizableActual - valorRealizablePeriodoAnterior;
      
      const variabilidad = 0.2; 
      const factorVariabilidad = 1 + (Math.random() * variabilidad * 2 - variabilidad);
      
      beneficio.valorRealizado += incrementoPotencialEnPeriodo * factorVariabilidad;
      beneficio.valorRealizado = Math.max(0, Math.min(beneficio.valorEstimado, beneficio.valorRealizado));
    }
  }

  private actualizarNivelConfianza(alianza: AlianzaEstrategica): void {
    const cumplimientoPromedio = alianza.condiciones.length > 0
      ? alianza.condiciones.reduce((sum, condicion) => sum + condicion.cumplimiento, 0) / alianza.condiciones.length
      : 100;

    let cambioConfianza = 0;

    if (cumplimientoPromedio > 80) {
      cambioConfianza += (cumplimientoPromedio - 80) / 10; 
    } else if (cumplimientoPromedio < 50) {
      cambioConfianza -= (50 - cumplimientoPromedio) / 5; 
    }

    const progresoBeneficios = alianza.beneficios.length > 0 
        ? alianza.beneficios.reduce((sum, b) => sum + (b.valorRealizado / Math.max(1,b.valorEstimado)), 0) / alianza.beneficios.length 
        : 1; 
    const progresoTiempo = (Date.now() - alianza.fechaInicio) / Math.max(1, (alianza.duracion * 24 * 60 * 60 * 1000));

    if (progresoBeneficios > progresoTiempo + 0.1) { 
        cambioConfianza += 2;
    } else if (progresoBeneficios < progresoTiempo - 0.2 && progresoTiempo > 0.1) { 
        cambioConfianza -= 5;
    }
    
    const eventosRecientes = (alianza.historialEventos || []).filter(e => e.fecha > Date.now() - (7 * 24 * 60 * 60 * 1000));
    eventosRecientes.forEach(evento => {
      cambioConfianza += (evento.impacto || 0) / 20; 
    });

    alianza.nivelConfianza = Math.max(0, Math.min(100, alianza.nivelConfianza + cambioConfianza));
  }

  public registrarEvento(alianzaId: string, descripcion: string, impacto: number): AlianzaEstrategica {
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    if (!alianza.historialEventos) { // Ensure historialEventos exists
        alianza.historialEventos = [];
    }
    alianza.historialEventos.push({ fecha: Date.now(), descripcion, impacto });
    this.actualizarNivelConfianza(alianza); 
    this.alianzas.set(alianzaId, alianza);
    return alianza;
  }

  public terminarAlianza(alianzaId: string, razon: string, esRuptura: boolean = false): AlianzaEstrategica {
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    alianza.estado = esRuptura ? EstadoAlianza.ROTA : EstadoAlianza.TERMINADA;
    alianza.fechaFin = Date.now();
    if (!alianza.historialEventos) {
        alianza.historialEventos = [];
    }
    alianza.historialEventos.push({
      fecha: Date.now(),
      descripcion: `Alianza ${esRuptura ? 'rota' : 'terminada'}: ${razon}`,
      impacto: esRuptura ? -50 : -10
    });
    this.alianzas.set(alianzaId, alianza);
    return alianza;
  }

  public modificarAlianza(alianzaId: string, modificaciones: Partial<AlianzaEstrategica>): AlianzaEstrategica {
    let alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    alianza = { ...alianza, ...modificaciones };
    if (!alianza.historialEventos) {
        alianza.historialEventos = [];
    }
    alianza.historialEventos.push({
        fecha: Date.now(),
        descripcion: `Términos de la alianza modificados.`,
        impacto: 0 
    });
    this.alianzas.set(alianzaId, alianza);
    return alianza;
  }

  public evaluarEfectividadAlianza(alianzaId: string): { efectividadGeneral: number; detalle: any } {
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) {
      throw new Error(`Alianza no encontrada: ${alianzaId}`);
    }
    const cumplimientoPromedio = alianza.condiciones.length > 0 ?
        alianza.condiciones.reduce((sum, c) => sum + c.cumplimiento, 0) / alianza.condiciones.length : 100;
    
    let progresoBeneficios = 0;
    if (alianza.beneficios.length > 0) {
        const totalEstimado = alianza.beneficios.reduce((sum, b) => sum + Math.max(1, b.valorEstimado),0);
        const totalRealizado = alianza.beneficios.reduce((sum, b) => sum + b.valorRealizado,0);
        progresoBeneficios = (totalRealizado / Math.max(1, totalEstimado)) * 100;
    }
    progresoBeneficios = Math.min(100, Math.max(0, progresoBeneficios));

    const efectividadGeneral = (cumplimientoPromedio * 0.4) + (progresoBeneficios * 0.4) + (alianza.nivelConfianza * 0.2);
    return {
        efectividadGeneral: Math.round(efectividadGeneral),
        detalle: { cumplimientoPromedio, progresoBeneficios, nivelConfianza: alianza.nivelConfianza }
    };
  }
  
  public generarInformeAlianza(alianzaId: string): string {
    const alianza = this.obtenerAlianza(alianzaId);
    if (!alianza) return `Alianza ${alianzaId} no encontrada.`;

    let informe = `Informe de Alianza: ${alianza.id} (${alianza.tipo})\n`;
    informe += `Estado: ${alianza.estado}, Confianza: ${alianza.nivelConfianza.toFixed(1)}%\n`;
    informe += `Participantes: ${alianza.empresasParticipantes.join(', ')}\n`;
    informe += `Duración: ${alianza.duracion} días (Inició: ${new Date(alianza.fechaInicio).toLocaleDateString()})\n`;
    if(alianza.fechaFin) {
        informe += `Finalizó: ${new Date(alianza.fechaFin).toLocaleDateString()}\n`;
    }
    
    informe += "\nCondiciones:\n";
    (alianza.condiciones || []).forEach(c => {
        informe += `- ${c.descripcion}: Cumplimiento ${c.cumplimiento.toFixed(1)}%\n`;
    });

    informe += "\nBeneficios:\n";
    (alianza.beneficios || []).forEach(b => {
        informe += `- Para ${b.empresaId} (${b.descripcion}): Estimado ${b.valorEstimado.toLocaleString()}, Realizado ${b.valorRealizado.toFixed(0).toLocaleString()}\n`;
    });
    
    informe += "\nEventos Recientes (últimos 5):\n";
    (alianza.historialEventos || []).slice(-5).forEach(e => { 
        informe += `- ${new Date(e.fecha).toLocaleDateString()}: ${e.descripcion} (Impacto: ${e.impacto})\n`;
    });
    
    const efectividad = this.evaluarEfectividadAlianza(alianzaId);
    informe += `\nEfectividad General Estimada: ${efectividad.efectividadGeneral}%\n`;
    
    return informe;
  }

  public obtenerAlianza(alianzaId: string): AlianzaEstrategica | undefined {
    return this.alianzas.get(alianzaId);
  }

  public obtenerAlianzas(filtros?: { empresaId?: string; estado?: EstadoAlianza; tipo?: TipoAlianza }): AlianzaEstrategica[] {
    let resultado = Array.from(this.alianzas.values());
    if (filtros) {
      if (filtros.empresaId) {
        resultado = resultado.filter(a => a.empresasParticipantes.includes(filtros.empresaId!));
      }
      if (filtros.estado) {
        resultado = resultado.filter(a => a.estado === filtros.estado);
      }
      if (filtros.tipo) {
        resultado = resultado.filter(a => a.tipo === filtros.tipo);
      }
    }
    return resultado;
  }

  public obtenerPropuesta(propuestaId: string): PropuestaAlianza | undefined {
    return this.propuestas.get(propuestaId);
  }

  public obtenerPropuestas(filtros?: { empresaId?: string; estado?: 'pendiente' | 'aceptada' | 'rechazada' | 'contrapropuesta'; tipo?: TipoAlianza }): PropuestaAlianza[] {
    let resultado = Array.from(this.propuestas.values());
    if (filtros) {
      if (filtros.empresaId) {
        resultado = resultado.filter(p => p.empresaProponente === filtros.empresaId || p.empresasObjetivo.includes(filtros.empresaId!));
      }
      if (filtros.estado) {
        resultado = resultado.filter(p => p.estado === filtros.estado);
      }
      if (filtros.tipo) {
        resultado = resultado.filter(p => p.tipo === filtros.tipo);
      }
    }
    return resultado;
  }
}
