// Integración del Sistema de Espionaje con el Sistema de NPCs

import { SistemaEspionaje } from './sistemaEspionaje';
import { Efecto, MisionEspionaje, ResultadoMision, EstadoMision } from './espionageTypes';

/**
 * Clase que maneja la integración entre el sistema de espionaje y el sistema de NPCs
 */
export class IntegracionEspionajeNPCs {
  private sistemaEspionaje: SistemaEspionaje;
  private sistemaNPCs: any; // Sistema de NPCs del juego
  
  constructor(sistemaEspionaje: SistemaEspionaje, sistemaNPCs: any) {
    this.sistemaEspionaje = sistemaEspionaje;
    this.sistemaNPCs = sistemaNPCs;
  }
  
  /**
   * Aplica efectos a NPCs resultantes de operaciones de espionaje
   * @param efectos Lista de efectos a aplicar
   * @param objetivo Objetivo de los efectos (empresa NPC)
   * @returns Número de efectos aplicados correctamente
   */
  public aplicarEfectosNPCs(efectos: Efecto[], objetivo: string): number {
    let efectosAplicados = 0;
    
    efectos.forEach(efecto => {
      switch (efecto.tipo) {
        case 'reputacion':
          this.modificarReputacion(efecto.objetivo, Number(efecto.valor));
          efectosAplicados++;
          break;
        case 'lealtad_clientes':
          this.modificarLealtadClientes(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'nivel_competencia':
          this.modificarNivelCompetencia(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'eficiencia_general':
          this.modificarEficienciaGeneral(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'evento':
          this.desencadenarEvento(efecto.objetivo, String(efecto.valor));
          efectosAplicados++;
          break;
      }
    });
    
    return efectosAplicados;
  }
  
  /**
   * Genera misiones de espionaje de NPCs contra el jugador
   * @param diaActual Día actual del juego
   * @returns Número de misiones generadas
   */
  public generarMisionesEspionajeNPC(diaActual: number): number {
    // Obtener NPCs activos que podrían realizar espionaje
    const npcsActivos = this.sistemaNPCs.obtenerNPCsActivos()
      .filter(npc => npc.nivelAgresividad > 3); // Solo NPCs agresivos
    
    let misionesGeneradas = 0;
    
    // Para cada NPC, decidir si realiza espionaje
    npcsActivos.forEach(npc => {
      // Probabilidad base según agresividad (1-10)
      const probabilidadBase = npc.nivelAgresividad * 5; // 5-50%
      
      // Ajustar según relación con el jugador
      const relacionJugador = npc.relacionJugador || 50; // 0-100
      const factorRelacion = 1 - (relacionJugador / 100); // 0-1
      
      // Probabilidad final
      const probabilidadFinal = probabilidadBase * factorRelacion;
      
      // Decidir si realiza espionaje
      if (Math.random() * 100 < probabilidadFinal) {
        // Crear misión de espionaje
        this.crearMisionEspionajeNPC(npc.id, diaActual);
        misionesGeneradas++;
      }
    });
    
    return misionesGeneradas;
  }
  
  /**
   * Procesa las represalias de NPCs por espionaje detectado
   * @param mision Misión de espionaje detectada
   * @returns true si se generó represalia, false si no
   */
  public procesarRepresaliasNPC(mision: MisionEspionaje): boolean {
    if (mision.estado !== EstadoMision.DESCUBIERTA) {
      return false;
    }
    
    // Obtener NPC objetivo
    const npc = this.sistemaNPCs.obtenerNPC(mision.objetivoEmpresaId);
    
    if (!npc) {
      return false;
    }
    
    // Probabilidad de represalia según agresividad
    const probabilidadRepresalia = 30 + (npc.nivelAgresividad * 7); // 37-100%
    
    // Decidir si hay represalia
    if (Math.random() * 100 < probabilidadRepresalia) {
      // Determinar tipo de represalia
      const tipoRepresalia = this.determinarTipoRepresalia(mision, npc);
      
      // Ejecutar represalia
      this.ejecutarRepresalia(tipoRepresalia, npc.id, mision);
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Actualiza la relación entre NPCs y el jugador basado en actividades de espionaje
   * @returns Número de relaciones actualizadas
   */
  public actualizarRelacionesNPCs(): number {
    // Obtener misiones completadas recientes
    const misionesRecientes = this.sistemaEspionaje.obtenerMisionesCompletadas()
      .filter(m => m.estado === EstadoMision.DESCUBIERTA);
    
    let relacionesActualizadas = 0;
    
    // Para cada misión descubierta, actualizar relación
    misionesRecientes.forEach(mision => {
      // Obtener NPC objetivo
      const npc = this.sistemaNPCs.obtenerNPC(mision.objetivoEmpresaId);
      
      if (!npc) {
        return;
      }
      
      // Calcular cambio en relación
      let cambioRelacion = -15; // Base: -15 puntos
      
      // Ajustar según tipo de misión
      switch (mision.tipo) {
        case 'sabotaje':
          cambioRelacion -= 15; // -30 total
          break;
        case 'robo_tecnologia':
          cambioRelacion -= 10; // -25 total
          break;
        case 'manipulacion_mercado':
          cambioRelacion -= 5; // -20 total
          break;
      }
      
      // Aplicar cambio
      this.sistemaNPCs.modificarRelacion(npc.id, 'jugador', cambioRelacion);
      relacionesActualizadas++;
    });
    
    return relacionesActualizadas;
  }
  
  // Métodos privados
  
  private crearMisionEspionajeNPC(npcId: string, diaActual: number): void {
    // Obtener NPC
    const npc = this.sistemaNPCs.obtenerNPC(npcId);
    
    if (!npc) {
      return;
    }
    
    // Determinar tipo de misión según perfil del NPC
    let tipoMision = 'recopilacion_info'; // Por defecto
    
    if (npc.enfoque === 'tecnologia' && npc.nivelAgresividad > 7) {
      tipoMision = 'robo_tecnologia';
    } else if (npc.enfoque === 'expansion' && npc.nivelAgresividad > 8) {
      tipoMision = 'sabotaje';
    } else if (npc.enfoque === 'marketing' && npc.nivelAgresividad > 6) {
      tipoMision = 'manipulacion_mercado';
    }
    
    // Determinar objetivo específico
    let objetivoEspecifico = 'general';
    
    switch (tipoMision) {
      case 'recopilacion_info':
        objetivoEspecifico = ['finanzas', 'produccion', 'estrategia', 'mercado'][Math.floor(Math.random() * 4)];
        break;
      case 'robo_tecnologia':
        // Obtener tecnologías del jugador
        const tecnologiasJugador = this.sistemaNPCs.obtenerTecnologiasJugador();
        if (tecnologiasJugador.length > 0) {
          objetivoEspecifico = tecnologiasJugador[Math.floor(Math.random() * tecnologiasJugador.length)].id;
        }
        break;
      case 'sabotaje':
        objetivoEspecifico = ['fabrica', 'logistica', 'sistemas'][Math.floor(Math.random() * 3)];
        break;
      case 'manipulacion_mercado':
        objetivoEspecifico = ['reputacion', 'precio_mercado'][Math.floor(Math.random() * 2)];
        break;
    }
    
    // Crear la misión en el sistema de NPCs
    this.sistemaNPCs.crearMisionEspionaje(
      npcId,
      'jugador', // Objetivo es el jugador
      tipoMision,
      objetivoEspecifico,
      diaActual
    );
  }
  
  private determinarTipoRepresalia(mision: MisionEspionaje, npc: any): string {
    // Tipos de represalia posibles
    const tiposRepresalia = [
      'contraespionaje',
      'sabotaje',
      'guerra_precios',
      'denuncia_legal',
      'robo_personal'
    ];
    
    // Pesos según tipo de misión original y perfil del NPC
    let pesos = [1, 1, 1, 1, 1]; // Pesos iguales por defecto
    
    // Ajustar según tipo de misión original
    switch (mision.tipo) {
      case 'sabotaje':
        pesos[1] += 3; // Mayor probabilidad de sabotaje como respuesta
        pesos[3] += 2; // Mayor probabilidad de denuncia legal
        break;
      case 'robo_tecnologia':
        pesos[0] += 3; // Mayor probabilidad de contraespionaje
        pesos[4] += 2; // Mayor probabilidad de robo de personal
        break;
      case 'manipulacion_mercado':
        pesos[2] += 3; // Mayor probabilidad de guerra de precios
        break;
    }
    
    // Ajustar según perfil del NPC
    if (npc.enfoque === 'tecnologia') {
      pesos[0] += 2; // Más contraespionaje
      pesos[4] += 1; // Más robo de personal
    } else if (npc.enfoque === 'expansion') {
      pesos[1] += 2; // Más sabotaje
      pesos[2] += 1; // Más guerra de precios
    } else if (npc.enfoque === 'legal') {
      pesos[3] += 3; // Más denuncia legal
    }
    
    // Seleccionar tipo según pesos
    let totalPeso = pesos.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalPeso;
    let acumulado = 0;
    
    for (let i = 0; i < pesos.length; i++) {
      acumulado += pesos[i];
      if (random < acumulado) {
        return tiposRepresalia[i];
      }
    }
    
    return tiposRepresalia[0]; // Por defecto
  }
  
  private ejecutarRepresalia(tipo: string, npcId: string, misionOriginal: MisionEspionaje): void {
    switch (tipo) {
      case 'contraespionaje':
        // Crear misión de contraespionaje del NPC
        this.crearMisionEspionajeNPC(npcId, misionOriginal.fechaInicio + misionOriginal.duracionEstimada);
        break;
      case 'sabotaje':
        // Crear evento de sabotaje
        this.sistemaNPCs.crearEventoSabotaje(npcId, 'jugador', 'fabrica');
        break;
      case 'guerra_precios':
        // Iniciar guerra de precios
        this.sistemaNPCs.iniciarGuerraPrecios(npcId, 'jugador');
        break;
      case 'denuncia_legal':
        // Crear evento legal
        this.sistemaNPCs.crearEventoLegal(npcId, 'jugador', 'espionaje');
        break;
      case 'robo_personal':
        // Intentar robar personal clave
        this.sistemaNPCs.intentarRoboPersonal(npcId, 'jugador');
        break;
    }
  }
  
  private modificarReputacion(objetivo: string, valor: number): void {
    this.sistemaNPCs.modificarReputacion(objetivo, valor);
  }
  
  private modificarLealtadClientes(objetivo: string, valor: number, duracion?: number): void {
    this.sistemaNPCs.modificarLealtadClientes(objetivo, valor, duracion);
  }
  
  private modificarNivelCompetencia(objetivo: string, valor: number, duracion?: number): void {
    this.sistemaNPCs.modificarNivelCompetencia(objetivo, valor, duracion);
  }
  
  private modificarEficienciaGeneral(objetivo: string, valor: number, duracion?: number): void {
    this.sistemaNPCs.modificarEficienciaGeneral(objetivo, valor, duracion);
  }
  
  private desencadenarEvento(objetivo: string, tipoEvento: string): void {
    this.sistemaNPCs.desencadenarEvento(objetivo, tipoEvento);
  }
}

export default IntegracionEspionajeNPCs;
