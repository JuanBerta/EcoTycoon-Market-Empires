// Sistema de Espionaje Corporativo - Módulo Principal

import { 
  AgenteEspionaje, 
  MisionEspionaje,
  ResultadoMision,
  DepartamentoContraespionaje,
  TipoMisionEspionaje,
  EstadoMision,
  EstadoAgente
} from './espionageTypes';
import GestorAgentes from './gestorAgentes';
import GestorMisiones from './gestorMisiones';
import SistemaContraespionaje from './sistemaContraespionaje';

/**
 * Clase principal que coordina todo el sistema de espionaje corporativo
 */
export class SistemaEspionaje {
  private gestorAgentes: GestorAgentes;
  private gestorMisiones: GestorMisiones;
  private sistemaContraespionaje: SistemaContraespionaje;
  
  // Día actual del juego (se actualiza desde fuera)
  private diaActual: number = 0;
  
  constructor(
    sistemaEconomico: any,
    sistemaProduccion: any,
    sistemaNPCs: any,
    sistemaNotificaciones: any
  ) {
    // Inicializar componentes
    this.gestorAgentes = new GestorAgentes();
    this.gestorMisiones = new GestorMisiones(
      sistemaEconomico,
      sistemaProduccion,
      sistemaNPCs,
      sistemaNotificaciones
    );
    this.sistemaContraespionaje = new SistemaContraespionaje(
      sistemaNotificaciones
    );
  }
  
  /**
   * Actualiza el sistema de espionaje (llamar cada día de juego)
   * @param diaActual Día actual del juego
   */
  public actualizar(diaActual: number): void {
    this.diaActual = diaActual;
    
    // Actualizar agentes
    this.gestorAgentes.actualizarAgentes();
    
    // Actualizar misiones
    const misionesActualizadas = this.gestorMisiones.actualizarMisiones(diaActual);
    
    // Actualizar departamentos de contraespionaje
    this.sistemaContraespionaje.actualizarDepartamentos();
  }
  
  /**
   * Genera agentes disponibles para reclutar
   * @param cantidad Número de agentes a generar
   * @param nivelJugador Nivel del jugador
   * @returns Lista de agentes disponibles
   */
  public generarAgentesDisponibles(cantidad: number, nivelJugador: number): AgenteEspionaje[] {
    return this.gestorAgentes.generarAgentesDisponibles(cantidad, nivelJugador);
  }
  
  /**
   * Contrata a un agente de la lista de disponibles
   * @param agenteId ID del agente a contratar
   * @returns El agente contratado o null si no se pudo contratar
   */
  public contratarAgente(agenteId: string): AgenteEspionaje | null {
    return this.gestorAgentes.contratarAgente(agenteId);
  }
  
  /**
   * Despide a un agente contratado
   * @param agenteId ID del agente a despedir
   * @returns true si se despidió correctamente, false si no
   */
  public despedirAgente(agenteId: string): boolean {
    return this.gestorAgentes.despedirAgente(agenteId);
  }
  
  /**
   * Crea una nueva misión de espionaje
   * @param tipo Tipo de misión
   * @param objetivoEmpresaId ID de la empresa objetivo
   * @param objetivoEspecifico Detalle específico del objetivo
   * @param agenteAsignadoId ID del agente asignado
   * @returns La misión creada o null si no se pudo crear
   */
  public crearMision(
    tipo: TipoMisionEspionaje,
    objetivoEmpresaId: string,
    objetivoEspecifico: string,
    agenteAsignadoId: string
  ): MisionEspionaje | null {
    // Verificar que el agente está disponible
    const agente = this.gestorAgentes.obtenerAgente(agenteAsignadoId);
    if (!agente || agente.estado !== EstadoAgente.DISPONIBLE) {
      return null;
    }
    
    // Crear la misión
    const mision = this.gestorMisiones.crearMision(
      tipo,
      objetivoEmpresaId,
      objetivoEspecifico,
      agenteAsignadoId,
      this.diaActual
    );
    
    if (!mision) {
      return null;
    }
    
    // Asignar agente a la misión
    this.gestorAgentes.asignarAgenteAMision(agenteAsignadoId, mision.id);
    
    return mision;
  }
  
  /**
   * Inicia una misión planificada
   * @param misionId ID de la misión a iniciar
   * @returns true si se inició correctamente, false si no
   */
  public iniciarMision(misionId: string): boolean {
    return this.gestorMisiones.iniciarMision(misionId);
  }
  
  /**
   * Resuelve una misión activa (normalmente no se llama directamente)
   * @param misionId ID de la misión a resolver
   * @returns El resultado de la misión o null si no se pudo resolver
   */
  public resolverMision(misionId: string): ResultadoMision | null {
    const resultado = this.gestorMisiones.resolverMision(misionId, this.diaActual);
    
    if (resultado && resultado.consecuenciasAgente) {
      // Actualizar estado del agente según resultado
      this.gestorAgentes.procesarResultadoMision(
        this.gestorMisiones.obtenerMision(misionId)?.agenteAsignadoId || "",
        resultado
      );
    }
    
    return resultado;
  }
  
  /**
   * Configura el departamento de contraespionaje del jugador
   * @param nivelSeguridad Nivel de seguridad general (1-5)
   * @param presupuesto Presupuesto mensual asignado
   * @param personal Cantidad de personal asignado
   * @param tecnologias Array de IDs de tecnologías de seguridad
   * @returns El departamento configurado
   */
  public configurarContraespionaje(
    nivelSeguridad: number,
    presupuesto: number,
    personal: number,
    tecnologias: string[]
  ): DepartamentoContraespionaje {
    return this.sistemaContraespionaje.configurarDepartamento(
      'jugador', // ID fijo para el jugador
      nivelSeguridad,
      presupuesto,
      personal,
      tecnologias
    );
  }
  
  /**
   * Obtiene todos los agentes contratados
   */
  public obtenerAgentes(): AgenteEspionaje[] {
    return this.gestorAgentes.obtenerAgentes();
  }
  
  /**
   * Obtiene los agentes disponibles para contratar
   */
  public obtenerAgentesDisponiblesParaContratar(): AgenteEspionaje[] {
    return this.gestorAgentes.obtenerAgentesDisponiblesParaContratar();
  }
  
  /**
   * Obtiene los agentes disponibles para asignar a misiones
   */
  public obtenerAgentesDisponiblesParaMisiones(): AgenteEspionaje[] {
    return this.gestorAgentes.obtenerAgentesDisponiblesParaMisiones();
  }
  
  /**
   * Obtiene todas las misiones activas
   */
  public obtenerMisionesActivas(): MisionEspionaje[] {
    return this.gestorMisiones.obtenerMisionesActivas();
  }
  
  /**
   * Obtiene todas las misiones planificadas
   */
  public obtenerMisionesPlanificadas(): MisionEspionaje[] {
    return this.gestorMisiones.obtenerMisionesPlanificadas();
  }
  
  /**
   * Obtiene todas las misiones completadas
   */
  public obtenerMisionesCompletadas(): MisionEspionaje[] {
    return this.gestorMisiones.obtenerMisionesCompletadas();
  }
  
  /**
   * Obtiene el departamento de contraespionaje del jugador
   */
  public obtenerDepartamentoContraespionaje(): DepartamentoContraespionaje | undefined {
    return this.sistemaContraespionaje.obtenerDepartamento('jugador');
  }
  
  /**
   * Obtiene el historial de incidentes de espionaje contra el jugador
   */
  public obtenerHistorialIncidentes(): string[] {
    return this.sistemaContraespionaje.obtenerHistorialIncidentes('jugador');
  }
  
  /**
   * Establece el presupuesto mensual para agentes
   */
  public establecerPresupuestoAgentes(presupuesto: number): void {
    this.gestorAgentes.establecerPresupuestoMensual(presupuesto);
  }
  
  /**
   * Obtiene el costo mensual total de todos los agentes
   */
  public obtenerCostoMensualAgentes(): number {
    return this.gestorAgentes.obtenerCostoMensualTotal();
  }
}

export default SistemaEspionaje;
