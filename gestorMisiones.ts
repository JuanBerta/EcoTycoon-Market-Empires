// Sistema de Espionaje Corporativo - Gestor de Misiones

import { 
  MisionEspionaje, 
  TipoMisionEspionaje, 
  EstadoMision,
  ResultadoMision,
  Efecto,
  Consecuencia,
  AgenteEspionaje,
  EspecialidadAgente,
  EstadoAgente,
  DepartamentoContraespionaje
} from './espionageTypes';

/**
 * Clase que gestiona la creación, ejecución y resolución de misiones de espionaje
 */
export class GestorMisiones {
  private misiones: Map<string, MisionEspionaje> = new Map();
  private misionesCompletadas: MisionEspionaje[] = [];
  private ultimoIdMision: number = 0;
  
  // Sistemas externos (inyectados)
  private sistemaEconomico: any;
  private sistemaProduccion: any;
  private sistemaNPCs: any;
  private sistemaNotificaciones: any;
  
  constructor(
    sistemaEconomico: any,
    sistemaProduccion: any,
    sistemaNPCs: any,
    sistemaNotificaciones: any
  ) {
    this.sistemaEconomico = sistemaEconomico;
    this.sistemaProduccion = sistemaProduccion;
    this.sistemaNPCs = sistemaNPCs;
    this.sistemaNotificaciones = sistemaNotificaciones;
  }
  
  /**
   * Crea una nueva misión de espionaje
   * @param tipo Tipo de misión
   * @param objetivoEmpresaId ID de la empresa objetivo
   * @param objetivoEspecifico Detalle específico del objetivo
   * @param agenteAsignadoId ID del agente asignado
   * @param diaActual Día actual del juego
   * @returns La misión creada o null si no se pudo crear
   */
  public crearMision(
    tipo: TipoMisionEspionaje,
    objetivoEmpresaId: string,
    objetivoEspecifico: string,
    agenteAsignadoId: string,
    diaActual: number
  ): MisionEspionaje | null {
    // Verificar que el objetivo existe
    const empresaObjetivo = this.sistemaNPCs.obtenerEmpresa(objetivoEmpresaId);
    if (!empresaObjetivo) {
      return null;
    }
    
    // Calcular duración estimada según tipo y complejidad
    const duracionBase = this.calcularDuracionBase(tipo);
    const complejidad = this.calcularComplejidad(tipo, objetivoEspecifico, empresaObjetivo);
    const duracionEstimada = Math.floor(duracionBase * complejidad);
    
    // Calcular costo de la operación
    const costoBase = this.calcularCostoBase(tipo);
    const costoOperacion = Math.floor(costoBase * complejidad);
    
    // Calcular probabilidades base
    const probabilidadExitoBase = this.calcularProbabilidadExito(tipo, empresaObjetivo);
    const probabilidadDeteccionBase = this.calcularProbabilidadDeteccion(tipo, empresaObjetivo);
    
    // Crear la misión
    const mision: MisionEspionaje = {
      id: `mission_${++this.ultimoIdMision}`,
      tipo,
      objetivoEmpresaId,
      objetivoEspecifico,
      agenteAsignadoId,
      fechaInicio: diaActual,
      duracionEstimada,
      costoOperacion,
      probabilidadExitoBase,
      probabilidadDeteccionBase,
      estado: EstadoMision.PLANIFICANDO
    };
    
    // Guardar la misión
    this.misiones.set(mision.id, mision);
    
    return mision;
  }
  
  /**
   * Inicia una misión planificada
   * @param misionId ID de la misión a iniciar
   * @returns true si se inició correctamente, false si no
   */
  public iniciarMision(misionId: string): boolean {
    const mision = this.misiones.get(misionId);
    
    if (!mision || mision.estado !== EstadoMision.PLANIFICANDO) {
      return false;
    }
    
    // Actualizar estado
    mision.estado = EstadoMision.EN_PROGRESO;
    
    // Actualizar en la colección
    this.misiones.set(misionId, mision);
    
    // Notificar inicio de misión
    this.sistemaNotificaciones.agregarNotificacion({
      titulo: "Misión de espionaje iniciada",
      mensaje: `La misión ${mision.id} ha comenzado. Duración estimada: ${mision.duracionEstimada} días.`,
      tipo: "espionaje",
      icono: "spy_mission_start"
    });
    
    return true;
  }
  
  /**
   * Actualiza el estado de todas las misiones activas (llamar cada día de juego)
   * @param diaActual Día actual del juego
   * @returns Array de misiones que han cambiado de estado
   */
  public actualizarMisiones(diaActual: number): MisionEspionaje[] {
    const misionesActualizadas: MisionEspionaje[] = [];
    
    this.misiones.forEach((mision, id) => {
      if (mision.estado === EstadoMision.EN_PROGRESO) {
        // Calcular días transcurridos
        const diasTranscurridos = diaActual - mision.fechaInicio;
        
        // Verificar si la misión ha terminado
        if (diasTranscurridos >= mision.duracionEstimada) {
          // Resolver la misión
          this.resolverMision(id, diaActual);
          misionesActualizadas.push(this.misiones.get(id)!);
        }
      }
    });
    
    return misionesActualizadas;
  }
  
  /**
   * Resuelve una misión activa
   * @param misionId ID de la misión a resolver
   * @param diaActual Día actual del juego
   * @returns El resultado de la misión o null si no se pudo resolver
   */
  public resolverMision(misionId: string, diaActual: number): ResultadoMision | null {
    const mision = this.misiones.get(misionId);
    
    if (!mision || mision.estado !== EstadoMision.EN_PROGRESO) {
      return null;
    }
    
    // Obtener información necesaria
    const empresaObjetivo = this.sistemaNPCs.obtenerEmpresa(mision.objetivoEmpresaId);
    const agente = this.sistemaNPCs.obtenerAgente(mision.agenteAsignadoId);
    
    if (!empresaObjetivo || !agente) {
      return null;
    }
    
    // Calcular probabilidad final de éxito
    const probExito = this.calcularProbabilidadExitoFinal(mision, agente, empresaObjetivo);
    
    // Calcular probabilidad final de detección
    const probDeteccion = this.calcularProbabilidadDeteccionFinal(mision, agente, empresaObjetivo);
    
    // Determinar éxito
    const exito = Math.random() * 100 < probExito;
    
    // Determinar detección
    const detectado = Math.random() * 100 < probDeteccion;
    
    // Crear resultado base
    const resultado: ResultadoMision = {
      exito,
      detectado,
      fechaFinalizacion: diaActual,
      consecuenciasAgente: {
        nuevoEstado: EstadoAgente.DISPONIBLE, // Default, will be overridden
        cambioExperiencia: exito ? 10 : 5, // Base experience
        cambioNotoriedad: detectado ? 15 : 0 // Base notoriety
      }
    };
    
    // Procesar según tipo de misión y resultado
    switch (mision.tipo) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        this.procesarResultadoRecopilacion(resultado, mision, exito, detectado, empresaObjetivo);
        break;
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        this.procesarResultadoRoboTecnologia(resultado, mision, exito, detectado, empresaObjetivo);
        break;
      case TipoMisionEspionaje.SABOTAJE:
        this.procesarResultadoSabotaje(resultado, mision, exito, detectado, empresaObjetivo);
        break;
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        this.procesarResultadoManipulacion(resultado, mision, exito, detectado, empresaObjetivo);
        break;
    }
    
    // Procesar consecuencias generales de detección (si no fueron manejadas específicamente)
    if (detectado && !resultado.consecuenciasJugador) { // Check if not already set by specific processors
      this.procesarConsecuenciasDeteccion(resultado, mision, empresaObjetivo);
    }
    
    // Actualizar estado de la misión
    if (detectado && resultado.consecuenciasAgente.nuevoEstado === EstadoAgente.CAPTURADO) {
        mision.estado = EstadoMision.DESCUBIERTA; // More specific if captured
    } else if (detectado) {
        mision.estado = EstadoMision.DESCUBIERTA;
    } else if (exito) {
        mision.estado = EstadoMision.COMPLETADA;
    } else {
        mision.estado = EstadoMision.FALLIDA;
    }
    
    mision.resultado = resultado;
    mision.duracionReal = diaActual - mision.fechaInicio;
    
    // Actualizar en la colección
    this.misiones.set(misionId, mision);
    
    // Mover a misiones completadas
    this.misionesCompletadas.push(mision);
    
    // Notificar resultado
    this.notificarResultadoMision(mision);
    
    return resultado;
  }
  
  /**
   * Obtiene todas las misiones activas
   */
  public obtenerMisionesActivas(): MisionEspionaje[] {
    return Array.from(this.misiones.values())
      .filter(mision => mision.estado === EstadoMision.EN_PROGRESO);
  }
  
  /**
   * Obtiene todas las misiones planificadas
   */
  public obtenerMisionesPlanificadas(): MisionEspionaje[] {
    return Array.from(this.misiones.values())
      .filter(mision => mision.estado === EstadoMision.PLANIFICANDO);
  }
  
  /**
   * Obtiene todas las misiones completadas
   */
  public obtenerMisionesCompletadas(): MisionEspionaje[] {
    return this.misionesCompletadas;
  }
  
  /**
   * Obtiene una misión específica por ID
   */
  public obtenerMision(misionId: string): MisionEspionaje | undefined {
    return this.misiones.get(misionId);
  }
  
  // Métodos privados auxiliares
  
  private calcularDuracionBase(tipo: TipoMisionEspionaje): number {
    switch (tipo) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        return 5; // 5 días base
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        return 10; // 10 días base
      case TipoMisionEspionaje.SABOTAJE:
        return 7; // 7 días base
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        return 14; // 14 días base
      default:
        return 7;
    }
  }
  
  private calcularComplejidad(tipo: TipoMisionEspionaje, objetivo: string, empresa: any): number {
    // Factores base según tipo
    let complejidadBase = 1.0;
    
    // Ajustar según tamaño de empresa
    const factorTamano = (empresa.tamano || 5) / 10; // Asumiendo escala 1-10, default 5
    
    // Ajustar según objetivo específico
    let factorObjetivo = 1.0;
    if (objetivo.includes("avanzado") || objetivo.includes("secreto")) {
      factorObjetivo = 1.5;
    }
    
    return complejidadBase * factorTamano * factorObjetivo;
  }
  
  private calcularCostoBase(tipo: TipoMisionEspionaje): number {
    switch (tipo) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        return 10000;
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        return 25000;
      case TipoMisionEspionaje.SABOTAJE:
        return 20000;
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        return 30000;
      default:
        return 15000;
    }
  }
  
  private calcularProbabilidadExito(tipo: TipoMisionEspionaje, empresa: any): number {
    // Probabilidad base según tipo
    let probBase = 0;
    switch (tipo) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        probBase = 80;
        break;
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        probBase = 60;
        break;
      case TipoMisionEspionaje.SABOTAJE:
        probBase = 70;
        break;
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        probBase = 50;
        break;
    }
    
    // Ajustar según nivel de seguridad de la empresa
    const nivelSeguridad = empresa.contraespionaje?.nivelSeguridadGeneral || 1;
    const factorSeguridad = 1 - (nivelSeguridad * 0.1); // 10% menos por nivel
    
    return Math.max(10, Math.min(90, probBase * factorSeguridad));
  }
  
  private calcularProbabilidadDeteccion(tipo: TipoMisionEspionaje, empresa: any): number {
    // Probabilidad base según tipo
    let probBase = 0;
    switch (tipo) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        probBase = 20;
        break;
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        probBase = 40;
        break;
      case TipoMisionEspionaje.SABOTAJE:
        probBase = 50;
        break;
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        probBase = 30;
        break;
    }
    
    // Ajustar según nivel de seguridad de la empresa
    const nivelSeguridad = empresa.contraespionaje?.nivelSeguridadGeneral || 1;
    const factorSeguridad = 1 + (nivelSeguridad * 0.2); // 20% más por nivel
    
    return Math.max(10, Math.min(90, probBase * factorSeguridad));
  }
  
  private calcularProbabilidadExitoFinal(
    mision: MisionEspionaje, 
    agente: AgenteEspionaje, 
    empresa: any
  ): number {
    let probFinal = mision.probabilidadExitoBase;
    
    // Ajustar según habilidad del agente
    probFinal += (agente.nivelHabilidad - 3) * 10; // +/-10% por nivel respecto a 3
    
    // Bonificación por especialidad
    if (this.esEspecialidadRelevante(agente.especialidad, mision.tipo)) {
      probFinal += 15; // +15% si es especialista
    }
    
    // Ajustar según experiencia
    probFinal += Math.min(10, (agente.experiencia || 0) / 10); // Hasta +10% por experiencia
    
    // Limitar rango
    return Math.max(5, Math.min(95, probFinal));
  }
  
  private calcularProbabilidadDeteccionFinal(
    mision: MisionEspionaje, 
    agente: AgenteEspionaje, 
    empresa: any
  ): number {
    let probFinal = mision.probabilidadDeteccionBase;
    
    // Ajustar según notoriedad del agente
    probFinal += (agente.notoriedad || 0) / 5; // Hasta +20% por notoriedad máxima
    
    // Reducción por habilidad
    probFinal -= (agente.nivelHabilidad - 3) * 5; // +/-5% por nivel respecto a 3
    
    // Bonificación por especialidad (reduce probabilidad)
    if (this.esEspecialidadRelevante(agente.especialidad, mision.tipo)) {
      probFinal -= 10; // -10% si es especialista
    }
    
    // Ajustar según eficiencia de detección del objetivo
    if (empresa.contraespionaje) {
      probFinal += (empresa.contraespionaje.eficienciaDeteccionCalculada || 0) / 5; // Hasta +20%
    }
    
    // Limitar rango
    return Math.max(5, Math.min(95, probFinal));
  }
  
  private esEspecialidadRelevante(especialidad: EspecialidadAgente, tipoMision: TipoMisionEspionaje): boolean {
    if (especialidad === EspecialidadAgente.GENERALISTA) {
      return false; // No hay bonificación para generalistas
    }
    
    switch (tipoMision) {
      case TipoMisionEspionaje.RECOPILACION_INFO:
        return especialidad === EspecialidadAgente.INFORMACION;
      case TipoMisionEspionaje.ROBO_TECNOLOGIA:
        return especialidad === EspecialidadAgente.TECNOLOGIA;
      case TipoMisionEspionaje.SABOTAJE:
        return especialidad === EspecialidadAgente.SABOTAJE;
      case TipoMisionEspionaje.MANIPULACION_MERCADO:
        return especialidad === EspecialidadAgente.MANIPULACION;
      default:
        return false;
    }
  }
  
  private procesarResultadoRecopilacion(
    resultado: ResultadoMision,
    mision: MisionEspionaje,
    exito: boolean,
    detectado: boolean,
    empresa: any
  ): void {
    if (exito) {
      // Generar información obtenida según objetivo específico
      resultado.informacionObtenida = this.generarInformacionObtenida(mision.objetivoEspecifico, empresa);
    }
    
    // Consecuencias para el agente
    if (detectado) {
      resultado.consecuenciasAgente.tiempoRecuperacion = 3; // 3 días de recuperación
      resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.RECUPERANDOSE;
    }
  }
  
  private procesarResultadoRoboTecnologia(
    resultado: ResultadoMision,
    mision: MisionEspionaje,
    exito: boolean,
    detectado: boolean,
    empresa: any
  ): void {
    if (exito) {
      // Identificar tecnología robada
      resultado.tecnologiaRobadaId = mision.objetivoEspecifico;
      
      // Aplicar efectos (desbloqueo de tecnología para el jugador)
      // Esto se procesará en el sistema de investigación
    }
    
    // Consecuencias para el agente
    if (detectado) {
      // Mayor riesgo de captura en robo de tecnología
      const probabilidadCaptura = 40; // 40% de ser capturado si es detectado
      
      if (Math.random() * 100 < probabilidadCaptura) {
        resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.CAPTURADO;
      } else {
        resultado.consecuenciasAgente.tiempoRecuperacion = 7; // 7 días de recuperación
        resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.RECUPERANDOSE;
      }
    }
  }
  
  private procesarResultadoSabotaje(
    resultado: ResultadoMision,
    mision: MisionEspionaje,
    exito: boolean,
    detectado: boolean,
    empresa: any // Este 'empresa' es la empresa objetivo del sabotaje
  ): void {
    if (exito) {
      // Generar efectos de sabotaje según objetivo
      resultado.impactoSabotaje = this.generarEfectosSabotaje(mision.objetivoEspecifico);
      
      // Aplicar efectos al objetivo
      this.aplicarEfectos(resultado.impactoSabotaje, empresa);

      // Consecuencias para el agente si fue detectado AUN SIENDO EXITOSO
      if (detectado) {
        const probabilidadCapturaExitoDetectado = 30; // Menor probabilidad si tuvo éxito pero fue detectado
        if (Math.random() * 100 < probabilidadCapturaExitoDetectado) {
          resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.CAPTURADO;
        } else {
          resultado.consecuenciasAgente.tiempoRecuperacion = 15; // Más tiempo por ser detectado
          resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.RECUPERANDOSE;
        }
        resultado.consecuenciasAgente.cambioNotoriedad = (resultado.consecuenciasAgente.cambioNotoriedad || 0) + 20; // Aumenta más la notoriedad
      } else {
        // Exito y no detectado
         resultado.consecuenciasAgente.cambioNotoriedad = (resultado.consecuenciasAgente.cambioNotoriedad || 0) + 5;
      }
    } else { // Misión fallida (!exito)
      resultado.impactoSabotaje = { tipo: "ninguno", magnitud: 0 }; // No hubo impacto de sabotaje

      if (detectado) { // Falló Y fue detectado
        resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.CAPTURADO;
        resultado.consecuenciasAgente.cambioNotoriedad = (resultado.consecuenciasAgente.cambioNotoriedad || 0) + 25; // Máximo aumento de notoriedad
        // Consecuencias para la empresa que lanzó la misión (atacante)
        resultado.consecuenciasEmpresa = { reputacion: -20, alertaMaxima: true };
      } else { // Falló y NO fue detectado
        resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.RECUPERANDOSE;
        resultado.consecuenciasAgente.tiempoRecuperacion = 5; // Menor tiempo si no fue detectado
        resultado.consecuenciasAgente.cambioNotoriedad = (resultado.consecuenciasAgente.cambioNotoriedad || 0) + 2;
      }
    }
  }
  
  private procesarResultadoManipulacion(
    resultado: ResultadoMision,
    mision: MisionEspionaje,
    exito: boolean,
    detectado: boolean,
    empresa: any
  ): void {
    if (exito) {
      // Generar efectos de manipulación
      resultado.impactoManipulacion = this.generarEfectosManipulacion(mision.objetivoEspecifico);
      
      // Aplicar efectos al mercado/empresa
      this.aplicarEfectos(resultado.impactoManipulacion, empresa);
    }
    
    // Consecuencias para el agente
    if (detectado) {
      resultado.consecuenciasAgente.tiempoRecuperacion = 5;
      resultado.consecuenciasAgente.nuevoEstado = EstadoAgente.RECUPERANDOSE;
      resultado.consecuenciasAgente.cambioNotoriedad = (resultado.consecuenciasAgente.cambioNotoriedad || 0) + 10;
    }
  }
  
  private procesarConsecuenciasDeteccion(
    resultado: ResultadoMision,
    mision: MisionEspionaje,
    empresaObjetivo: any
  ): void {
    // Consecuencias para el jugador/empresa que lanzó la misión
    // Solo añadir si no fueron establecidas por una lógica más específica (como en sabotaje fallido y detectado)
    if (!resultado.consecuenciasEmpresa) {
        resultado.consecuenciasJugador = resultado.consecuenciasJugador || []; // Ensure array exists
        resultado.consecuenciasJugador.push({
          descripcion: `Misión ${mision.tipo} contra ${empresaObjetivo.nombre} fue detectada.`,
          efectos: [
            { 
              tipo: 'cambio_reputacion', 
              objetivo: 'empresa_ejecutora', // Asumiendo que hay una forma de identificarla
              valor: -15, // Penalización de reputación
              descripcion: 'Reputación dañada por misión de espionaje detectada.'
            }
          ]
        });
    }
    
    // Alerta a la empresa objetivo
    this.sistemaNotificaciones.agregarNotificacion({
      titulo: "Intento de espionaje detectado!",
      mensaje: `Hemos detectado y neutralizado una misión de espionaje tipo ${mision.tipo} contra nuestras operaciones.`,
      tipo: "alerta_seguridad",
      icono: "spy_detected",
      empresaIdDestino: mision.objetivoEmpresaId // Notificación para la empresa objetivo
    });
  }
  
  private generarInformacionObtenida(objetivoEspecifico: string, empresa: any): any {
    // Simulación de obtención de datos
    switch (objetivoEspecifico) {
      case "datos_financieros":
        return {
          ingresos_anuales: empresa.metricas?.ingresosAnuales || 0,
          margen_beneficio: empresa.metricas?.margenBeneficio || 0,
          deuda_total: empresa.metricas?.deudaTotal || 0
        };
      case "planes_expansion":
        return empresa.planes?.expansion || { proximos_mercados: [], inversion_prevista: 0 };
      default:
        return { informacion: "Datos genéricos sobre " + objetivoEspecifico };
    }
  }
  
  private generarEfectosSabotaje(objetivoEspecifico: string): Efecto[] {
    // Simulación de efectos de sabotaje
    switch (objetivoEspecifico) {
      case "maquinaria_principal":
        return [{ 
          tipo: 'reduccion_eficiencia_produccion', 
          objetivo: 'empresa_objetivo', 
          valor: -30, // Reducción del 30%
          duracion: 10, // 10 días
          descripcion: "Daño crítico a maquinaria principal, eficiencia reducida."
        }];
      case "red_distribucion":
         return [{ 
          tipo: 'interrupcion_logistica', 
          objetivo: 'empresa_objetivo', 
          valor: 5, // 5 días de interrupción
          descripcion: "Red de distribución sabotada, entregas retrasadas."
        }];
      default:
        return [{ 
          tipo: 'danos_menores', 
          objetivo: 'empresa_objetivo', 
          valor: -50000, // Costo de reparación
          descripcion: "Sabotaje menor causando daños y costos de reparación."
        }];
    }
  }
  
  private generarEfectosManipulacion(objetivoEspecifico: string): Efecto[] {
    // Simulación de efectos de manipulación de mercado
     switch (objetivoEspecifico) {
      case "precio_acciones_competidor":
        return [{ 
          tipo: 'variacion_precio_acciones', 
          objetivo: 'empresa_objetivo', 
          valor: -15, // Caída del 15%
          duracion: 5, 
          descripcion: "Rumores falsos causan caída temporal en el precio de las acciones."
        }];
      case "confianza_consumidores_producto_X":
         return [{ 
          tipo: 'cambio_percepcion_producto', 
          objetivo: 'producto_X', 
          valor: -25, // Reducción del 25% en confianza
          descripcion: "Campaña de desinformación afecta la confianza en el Producto X."
        }];
      default:
        return [{ 
          tipo: 'inestabilidad_mercado_general', 
          objetivo: 'mercado_sectorial', 
          valor: 0.1, // Aumento de volatilidad
          descripcion: "Acciones de manipulación generan incertidumbre en el sector."
        }];
    }
  }
  
  private aplicarEfectos(efectos: Efecto[] | undefined, empresa: any): void {
    if (!efectos) return;
    
    efectos.forEach(efecto => {
      // Lógica para aplicar efectos a través de los sistemas externos
      // Ejemplo: this.sistemaEconomico.aplicarEfecto(efecto, empresa.id);
      console.log(`Aplicando efecto: ${efecto.descripcion} a ${empresa.nombre || efecto.objetivo}`);
    });
  }
  
  private notificarResultadoMision(mision: MisionEspionaje): void {
    const resultado = mision.resultado;
    if (!resultado) return;
    
    let titulo = `Misión ${mision.id} (${mision.tipo}) `;
    let mensaje = `Objetivo: ${mision.objetivoEspecifico} en ${mision.objetivoEmpresaId}.\n`;
    
    if (resultado.exito) {
      titulo += "EXITOSA";
      mensaje += "Resultado: Éxito. ";
    } else {
      titulo += "FALLIDA";
      mensaje += "Resultado: Fracaso. ";
    }
    
    if (resultado.detectado) {
      titulo += " (DETECTADA)";
      mensaje += "La misión fue detectada por el objetivo.";
    } else {
      mensaje += "La misión no fue detectada.";
    }
    
    this.sistemaNotificaciones.agregarNotificacion({
      titulo,
      mensaje,
      tipo: "espionaje_resultado",
      icono: resultado.exito ? (resultado.detectado ? "spy_mission_success_detected" : "spy_mission_success") : "spy_mission_fail"
    });
  }
}
