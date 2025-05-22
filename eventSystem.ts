// Sistema de Eventos Dinámicos para EcoTycoon: Market Empires
// Implementación basada en el modelo diseñado

// Enumeraciones
export enum TipoEvento {
  ECONOMICO = 'economico',
  REGIONAL = 'regional',
  INDUSTRIA = 'industria',
  COMPETIDOR = 'competidor',
  GLOBAL = 'global'
}

export enum AlcanceEvento {
  GLOBAL = 'global',
  REGIONAL = 'regional',
  SECTORIAL = 'sectorial'
}

export enum Severidad {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta'
}

export enum EstadoEvento {
  PENDIENTE = 'pendiente',
  ACTIVO = 'activo',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado'
}

export enum TipoCondicion {
  TIEMPO_JUEGO = 'tiempo_juego',
  DINERO_JUGADOR = 'dinero_jugador',
  REGION_ACTIVA = 'region_activa',
  INDUSTRIA_ACTIVA = 'industria_activa',
  EVENTO_PREVIO = 'evento_previo',
  NIVEL_DIFICULTAD = 'nivel_dificultad',
  TEMPORADA = 'temporada',
  REPUTACION = 'reputacion',
  TECNOLOGIA = 'tecnologia',
  COMPETIDOR_ACTIVO = 'competidor_activo'
}

export enum OperadorComparacion {
  IGUAL = '==',
  DIFERENTE = '!=',
  MAYOR = '>',
  MENOR = '<',
  MAYOR_IGUAL = '>=',
  MENOR_IGUAL = '<=',
  CONTIENE = 'contains',
  NO_CONTIENE = 'not_contains'
}

export enum TipoEfecto {
  // Efectos económicos
  PRECIO_COMPRA = 'precio_compra',
  PRECIO_VENTA = 'precio_venta',
  DEMANDA = 'demanda',
  COSTO_PRODUCCION = 'costo_produccion',
  TASA_INTERES = 'tasa_interes',
  IMPUESTOS = 'impuestos',
  
  // Efectos de producción
  EFICIENCIA_FABRICA = 'eficiencia_fabrica',
  DISPONIBILIDAD_MATERIAS = 'disponibilidad_materias',
  CALIDAD_PRODUCTO = 'calidad_producto',
  VELOCIDAD_PRODUCCION = 'velocidad_produccion',
  COSTOS_OPERATIVOS = 'costos_operativos',
  
  // Efectos logísticos
  TIEMPO_ENTREGA = 'tiempo_entrega',
  COSTO_TRANSPORTE = 'costo_transporte',
  CAPACIDAD_ALMACENAMIENTO = 'capacidad_almacenamiento',
  DISPONIBILIDAD_RUTAS = 'disponibilidad_rutas',
  PERDIDAS_TRANSITO = 'perdidas_transito',
  
  // Efectos de mercado
  PREFERENCIAS_CONSUMIDOR = 'preferencias_consumidor',
  NIVEL_COMPETENCIA = 'nivel_competencia',
  OPORTUNIDADES_MERCADO = 'oportunidades_mercado',
  REPUTACION_MARCA = 'reputacion_marca',
  LEALTAD_CLIENTES = 'lealtad_clientes',
  
  // Efectos de investigación
  VELOCIDAD_INVESTIGACION = 'velocidad_investigacion',
  COSTO_DESARROLLO = 'costo_desarrollo',
  DISPONIBILIDAD_TECNOLOGIAS = 'disponibilidad_tecnologias',
  OBSOLESCENCIA_PRODUCTOS = 'obsolescencia_productos',
  INNOVACION_DISRUPTIVA = 'innovacion_disruptiva',
  
  // Otros efectos
  RIESGO_OPERACIONAL = 'riesgo_operacional'
}

// Interfaces
export interface Condicion {
  tipo: TipoCondicion;
  parametro: string;
  operador: OperadorComparacion;
  valor: any;
  descripcion: string;
}

export interface Efecto {
  tipo: TipoEfecto;
  objetivo: string;
  modificador: number;
  esTemporal: boolean;
  descripcion: string;
}

export interface Consecuencia {
  descripcion: string;
  probabilidad: number;
  eventoResultante?: string;
  efectos: Efecto[];
}

export interface OpcionRespuesta {
  id: string;
  titulo: string;
  descripcion: string;
  costo: number;
  tiempoImplementacion: number;
  efectos: Efecto[];
  requisitos: Condicion[];
  consecuencias: Consecuencia[];
}

export interface EventoBase {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoEvento;
  alcance: AlcanceEvento;
  duracion: number;
  severidad: Severidad;
  probabilidadBase: number;
  condicionesActivacion: Condicion[];
  efectos: Efecto[];
  opcionesRespuesta: OpcionRespuesta[];
  eventosRelacionados: string[];
  icono: string;
  sonido?: string;
  fechaInicio?: number;
  fechaFin?: number;
  estado: EstadoEvento;
}

export interface ConfiguracionEventos {
  frecuenciaBase: number;
  maxEventosSimultaneos: number;
  factorDificultad: number;
  balancePositivoNegativo: number;
}

export interface EstadoJuego {
  tiempoJuego: number;
  dineroJugador: number;
  regionesActivas: string[];
  industriasActivas: string[];
  eventosOcurridos: string[];
  nivelDificultad: number;
  temporadaActual: string;
  reputacion: number;
  tecnologiasDesbloqueadas: string[];
  competidoresActivos: string[];
  [key: string]: any; // Para propiedades adicionales
}

// Clase principal para gestionar eventos
export class GestorEventos {
  private eventosDisponibles: EventoBase[];
  private eventosActivos: EventoBase[];
  private eventosHistoricos: EventoBase[];
  private configuracion: ConfiguracionEventos;
  private callbacks: {
    onEventoActivado: ((evento: EventoBase) => void) | null;
    onEventoFinalizado: ((evento: EventoBase) => void) | null;
    onEfectosAplicados: ((efectos: Efecto[], evento: EventoBase) => void) | null;
    onEfectosRevertidos: ((efectos: Efecto[], evento: EventoBase) => void) | null;
  };
  
  constructor(configuracion: ConfiguracionEventos) {
    this.eventosDisponibles = [];
    this.eventosActivos = [];
    this.eventosHistoricos = [];
    this.configuracion = configuracion;
    this.callbacks = {
      onEventoActivado: null,
      onEventoFinalizado: null,
      onEfectosAplicados: null,
      onEfectosRevertidos: null
    };
  }
  
  // Registrar callbacks para eventos del sistema
  public registrarCallback(
    tipo: 'onEventoActivado' | 'onEventoFinalizado' | 'onEfectosAplicados' | 'onEfectosRevertidos',
    callback: any
  ): void {
    this.callbacks[tipo] = callback;
  }
  
  // Cargar eventos desde la base de datos o archivo
  public cargarEventos(eventos: EventoBase[]): void {
    this.eventosDisponibles = [...eventos];
    console.log(`Cargados ${this.eventosDisponibles.length} eventos en el sistema`);
  }
  
  // Actualizar estado de eventos activos
  public actualizarEventos(tiempoActual: number, estadoJuego: EstadoJuego): void {
    // Verificar eventos que han expirado
    const eventosExpirados = this.eventosActivos.filter(evento => {
      return evento.fechaFin !== undefined && evento.fechaFin <= tiempoActual;
    });
    
    // Finalizar eventos expirados
    for (const evento of eventosExpirados) {
      this.finalizarEvento(evento.id, tiempoActual);
    }
    
    // Generar nuevos eventos si es posible
    if (this.eventosActivos.length < this.configuracion.maxEventosSimultaneos) {
      const nuevosEventos = this.generarEventos(estadoJuego);
      
      // Activar nuevos eventos
      for (const evento of nuevosEventos) {
        this.activarEvento(evento.id, tiempoActual);
      }
    }
  }
  
  // Generar nuevos eventos basados en probabilidad
  public generarEventos(estadoJuego: EstadoJuego): EventoBase[] {
    const eventosGenerados: EventoBase[] = [];
    const eventosDisponiblesNoActivos = this.eventosDisponibles.filter(
      evento => !this.eventosActivos.some(e => e.id === evento.id)
    );
    
    // Calcular cuántos eventos podemos generar
    const espacioDisponible = this.configuracion.maxEventosSimultaneos - this.eventosActivos.length;
    if (espacioDisponible <= 0) return [];
    
    // Calcular probabilidad ajustada según dificultad
    const probabilidadAjustada = this.configuracion.frecuenciaBase * this.configuracion.factorDificultad;
    
    // Intentar generar eventos
    for (const evento of eventosDisponiblesNoActivos) {
      // Verificar si el evento puede activarse
      if (this.verificarCondiciones(evento, estadoJuego)) {
        // Calcular probabilidad final
        const probabilidadFinal = evento.probabilidadBase * (probabilidadAjustada / 100);
        
        // Tirar los dados
        if (Math.random() * 100 <= probabilidadFinal) {
          eventosGenerados.push(evento);
          
          // Verificar si hemos alcanzado el límite
          if (eventosGenerados.length >= espacioDisponible) {
            break;
          }
        }
      }
    }
    
    return eventosGenerados;
  }
  
  // Verificar si un evento puede activarse
  public verificarCondiciones(evento: EventoBase, estadoJuego: EstadoJuego): boolean {
    // Si no hay condiciones, siempre es verdadero
    if (evento.condicionesActivacion.length === 0) {
      return true;
    }
    
    // Verificar cada condición
    for (const condicion of evento.condicionesActivacion) {
      if (!this.evaluarCondicion(condicion, estadoJuego)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Evaluar una condición específica
  private evaluarCondicion(condicion: Condicion, estadoJuego: EstadoJuego): boolean {
    let valorActual: any;
    
    // Obtener el valor actual según el tipo de condición
    switch (condicion.tipo) {
      case TipoCondicion.TIEMPO_JUEGO:
        valorActual = estadoJuego.tiempoJuego;
        break;
      case TipoCondicion.DINERO_JUGADOR:
        valorActual = estadoJuego.dineroJugador;
        break;
      case TipoCondicion.REGION_ACTIVA:
        valorActual = estadoJuego.regionesActivas;
        break;
      case TipoCondicion.INDUSTRIA_ACTIVA:
        valorActual = estadoJuego.industriasActivas;
        break;
      case TipoCondicion.EVENTO_PREVIO:
        valorActual = estadoJuego.eventosOcurridos;
        break;
      case TipoCondicion.NIVEL_DIFICULTAD:
        valorActual = estadoJuego.nivelDificultad;
        break;
      case TipoCondicion.TEMPORADA:
        valorActual = estadoJuego.temporadaActual;
        break;
      case TipoCondicion.REPUTACION:
        valorActual = estadoJuego.reputacion;
        break;
      case TipoCondicion.TECNOLOGIA:
        valorActual = estadoJuego.tecnologiasDesbloqueadas;
        break;
      case TipoCondicion.COMPETIDOR_ACTIVO:
        valorActual = estadoJuego.competidoresActivos;
        break;
      default:
        console.warn(`Tipo de condición no reconocido: ${condicion.tipo}`);
        return false;
    }
    
    // Evaluar según el operador
    switch (condicion.operador) {
      case OperadorComparacion.IGUAL:
        return valorActual === condicion.valor;
      case OperadorComparacion.DIFERENTE:
        return valorActual !== condicion.valor;
      case OperadorComparacion.MAYOR:
        return valorActual > condicion.valor;
      case OperadorComparacion.MENOR:
        return valorActual < condicion.valor;
      case OperadorComparacion.MAYOR_IGUAL:
        return valorActual >= condicion.valor;
      case OperadorComparacion.MENOR_IGUAL:
        return valorActual <= condicion.valor;
      case OperadorComparacion.CONTIENE:
        if (Array.isArray(valorActual)) {
          return valorActual.includes(condicion.valor);
        }
        return false;
      case OperadorComparacion.NO_CONTIENE:
        if (Array.isArray(valorActual)) {
          return !valorActual.includes(condicion.valor);
        }
        return false;
      default:
        console.warn(`Operador de comparación no reconocido: ${condicion.operador}`);
        return false;
    }
  }
  
  // Activar un evento específico
  public activarEvento(eventoId: string, tiempoActual: number): boolean {
    // Buscar el evento
    const eventoIndex = this.eventosDisponibles.findIndex(e => e.id === eventoId);
    if (eventoIndex === -1) {
      console.warn(`Evento no encontrado: ${eventoId}`);
      return false;
    }
    
    // Verificar si ya está activo
    if (this.eventosActivos.some(e => e.id === eventoId)) {
      console.warn(`El evento ya está activo: ${eventoId}`);
      return false;
    }
    
    // Clonar el evento para no modificar el original
    const evento = { ...this.eventosDisponibles[eventoIndex] };
    
    // Establecer fechas de inicio y fin
    evento.fechaInicio = tiempoActual;
    evento.fechaFin = tiempoActual + evento.duracion;
    evento.estado = EstadoEvento.ACTIVO;
    
    // Añadir a eventos activos
    this.eventosActivos.push(evento);
    
    // Notificar activación
    if (this.callbacks.onEventoActivado) {
      this.callbacks.onEventoActivado(evento);
    }
    
    console.log(`Evento activado: ${evento.nombre} (ID: ${evento.id})`);
    return true;
  }
  
  // Finalizar un evento activo
  public finalizarEvento(eventoId: string, tiempoActual: number): boolean {
    // Buscar el evento activo
    const eventoIndex = this.eventosActivos.findIndex(e => e.id === eventoId);
    if (eventoIndex === -1) {
      console.warn(`Evento activo no encontrado: ${eventoId}`);
      return false;
    }
    
    // Obtener el evento
    const evento = this.eventosActivos[eventoIndex];
    
    // Actualizar estado
    evento.estado = EstadoEvento.COMPLETADO;
    
    // Mover a históricos
    this.eventosHistoricos.push(evento);
    
    // Eliminar de activos
    this.eventosActivos.splice(eventoIndex, 1);
    
    // Notificar finalización
    if (this.callbacks.onEventoFinalizado) {
      this.callbacks.onEventoFinalizado(evento);
    }
    
    console.log(`Evento finalizado: ${evento.nombre} (ID: ${evento.id})`);
    return true;
  }
  
  // Aplicar efectos de un evento
  public aplicarEfectos(evento: EventoBase, estadoJuego: EstadoJuego): void {
    // Notificar aplicación de efectos
    if (this.callbacks.onEfectosAplicados) {
      this.callbacks.onEfectosAplicados(evento.efectos, evento);
    }
    
    console.log(`Efectos aplicados para evento: ${evento.nombre} (ID: ${evento.id})`);
  }
  
  // Revertir efectos de un evento
  public revertirEfectos(evento: EventoBase, estadoJuego: EstadoJuego): void {
    // Filtrar solo efectos temporales
    const efectosTemporales = evento.efectos.filter(e => e.esTemporal);
    
    // Notificar reversión de efectos
    if (this.callbacks.onEfectosRevertidos) {
      this.callbacks.onEfectosRevertidos(efectosTemporales, evento);
    }
    
    console.log(`Efectos revertidos para evento: ${evento.nombre} (ID: ${evento.id})`);
  }
  
  // Procesar respuesta del jugador
  public procesarRespuesta(eventoId: string, respuestaId: string, estadoJuego: EstadoJuego): boolean {
    // Buscar el evento activo
    const evento = this.eventosActivos.find(e => e.id === eventoId);
    if (!evento) {
      console.warn(`Evento activo no encontrado: ${eventoId}`);
      return false;
    }
    
    // Buscar la opción de respuesta
    const respuesta = evento.opcionesRespuesta.find(r => r.id === respuestaId);
    if (!respuesta) {
      console.warn(`Opción de respuesta no encontrada: ${respuestaId}`);
      return false;
    }
    
    // Verificar requisitos
    for (const requisito of respuesta.requisitos) {
      if (!this.evaluarCondicion(requisito, estadoJuego)) {
        console.warn(`No se cumplen los requisitos para la respuesta: ${respuestaId}`);
        return false;
      }
    }
    
    // Aplicar efectos de la respuesta
    if (this.callbacks.onEfectosAplicados) {
      this.callbacks.onEfectosAplicados(respuesta.efectos, evento);
    }
    
    // Procesar consecuencias
    for (const consecuencia of respuesta.consecuencias) {
      // Tirar los dados para la probabilidad
      if (Math.random() * 100 <= consecuencia.probabilidad) {
        // Aplicar efectos de la consecuencia
        if (this.callbacks.onEfectosAplicados) {
          this.callbacks.onEfectosAplicados(consecuencia.efectos, evento);
        }
        
        // Activar evento resultante si existe
        if (consecuencia.eventoResultante) {
          const tiempoActual = estadoJuego.tiempoJuego;
          this.activarEvento(consecuencia.eventoResultante, tiempoActual);
        }
      }
    }
    
    console.log(`Respuesta procesada: ${respuesta.titulo} para evento ${evento.nombre}`);
    return true;
  }
  
  // Obtener eventos activos
  public obtenerEventosActivos(): EventoBase[] {
    return [...this.eventosActivos];
  }
  
  // Obtener historial de eventos
  public obtenerHistorialEventos(): EventoBase[] {
    return [...this.eventosHistoricos];
  }
  
  // Obtener evento por ID
  public obtenerEvento(eventoId: string): EventoBase | undefined {
    // Buscar en eventos disponibles
    let evento = this.eventosDisponibles.find(e => e.id === eventoId);
    if (evento) return { ...evento };
    
    // Buscar en eventos activos
    evento = this.eventosActivos.find(e => e.id === eventoId);
    if (evento) return { ...evento };
    
    // Buscar en eventos históricos
    evento = this.eventosHistoricos.find(e => e.id === eventoId);
    if (evento) return { ...evento };
    
    return undefined;
  }
  
  // Obtener configuración actual
  public obtenerConfiguracion(): ConfiguracionEventos {
    return { ...this.configuracion };
  }
  
  // Actualizar configuración
  public actualizarConfiguracion(nuevaConfig: Partial<ConfiguracionEventos>): void {
    this.configuracion = { ...this.configuracion, ...nuevaConfig };
    console.log('Configuración de eventos actualizada');
  }
}

// Clase para integrar el sistema de eventos con el sistema económico
export class IntegradorEconomico {
  private sistemaEconomico: any; // Referencia al sistema económico del juego
  
  constructor(sistemaEconomico: any) {
    this.sistemaEconomico = sistemaEconomico;
  }
  
  // Aplicar efectos económicos
  public aplicarEfectosEconomicos(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      switch (efecto.tipo) {
        case TipoEfecto.PRECIO_COMPRA:
          this.sistemaEconomico.modificarPrecioCompra(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.PRECIO_VENTA:
          this.sistemaEconomico.modificarPrecioVenta(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.DEMANDA:
          this.sistemaEconomico.modificarDemanda(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.COSTO_PRODUCCION:
          this.sistemaEconomico.modificarCostoProduccion(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.TASA_INTERES:
          this.sistemaEconomico.modificarTasaInteres(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.IMPUESTOS:
          this.sistemaEconomico.modificarImpuestos(efecto.objetivo, efecto.modificador);
          break;
      }
    }
  }
  
  // Revertir efectos económicos
  public revertirEfectosEconomicos(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      // Invertir el modificador para revertir el efecto
      const modificadorInvertido = -efecto.modificador;
      
      switch (efecto.tipo) {
        case TipoEfecto.PRECIO_COMPRA:
          this.sistemaEconomico.modificarPrecioCompra(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.PRECIO_VENTA:
          this.sistemaEconomico.modificarPrecioVenta(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.DEMANDA:
          this.sistemaEconomico.modificarDemanda(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.COSTO_PRODUCCION:
          this.sistemaEconomico.modificarCostoProduccion(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.TASA_INTERES:
          this.sistemaEconomico.modificarTasaInteres(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.IMPUESTOS:
          this.sistemaEconomico.modificarImpuestos(efecto.objetivo, modificadorInvertido);
          break;
      }
    }
  }
}

// Clase para integrar el sistema de eventos con el sistema de producción
export class IntegradorProduccion {
  private sistemaProduccion: any; // Referencia al sistema de producción del juego
  
  constructor(sistemaProduccion: any) {
    this.sistemaProduccion = sistemaProduccion;
  }
  
  // Aplicar efectos de producción
  public aplicarEfectosProduccion(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      switch (efecto.tipo) {
        case TipoEfecto.EFICIENCIA_FABRICA:
          this.sistemaProduccion.modificarEficienciaFabricas(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.DISPONIBILIDAD_MATERIAS:
          this.sistemaProduccion.modificarDisponibilidadMaterias(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.CALIDAD_PRODUCTO:
          this.sistemaProduccion.modificarCalidadProducto(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.VELOCIDAD_PRODUCCION:
          this.sistemaProduccion.modificarVelocidadProduccion(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.COSTOS_OPERATIVOS:
          this.sistemaProduccion.modificarCostosOperativos(efecto.objetivo, efecto.modificador);
          break;
      }
    }
  }
  
  // Revertir efectos de producción
  public revertirEfectosProduccion(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      // Invertir el modificador para revertir el efecto
      const modificadorInvertido = -efecto.modificador;
      
      switch (efecto.tipo) {
        case TipoEfecto.EFICIENCIA_FABRICA:
          this.sistemaProduccion.modificarEficienciaFabricas(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.DISPONIBILIDAD_MATERIAS:
          this.sistemaProduccion.modificarDisponibilidadMaterias(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.CALIDAD_PRODUCTO:
          this.sistemaProduccion.modificarCalidadProducto(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.VELOCIDAD_PRODUCCION:
          this.sistemaProduccion.modificarVelocidadProduccion(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.COSTOS_OPERATIVOS:
          this.sistemaProduccion.modificarCostosOperativos(efecto.objetivo, modificadorInvertido);
          break;
      }
    }
  }
}

// Clase para integrar el sistema de eventos con el sistema de logística
export class IntegradorLogistica {
  private sistemaLogistica: any; // Referencia al sistema de logística del juego
  
  constructor(sistemaLogistica: any) {
    this.sistemaLogistica = sistemaLogistica;
  }
  
  // Aplicar efectos logísticos
  public aplicarEfectosLogistica(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      switch (efecto.tipo) {
        case TipoEfecto.TIEMPO_ENTREGA:
          this.sistemaLogistica.modificarTiempoEntrega(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.COSTO_TRANSPORTE:
          this.sistemaLogistica.modificarCostoTransporte(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.CAPACIDAD_ALMACENAMIENTO:
          this.sistemaLogistica.modificarCapacidadAlmacenamiento(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.DISPONIBILIDAD_RUTAS:
          this.sistemaLogistica.modificarDisponibilidadRutas(efecto.objetivo, efecto.modificador);
          break;
        case TipoEfecto.PERDIDAS_TRANSITO:
          this.sistemaLogistica.modificarPerdidasTransito(efecto.objetivo, efecto.modificador);
          break;
      }
    }
  }
  
  // Revertir efectos logísticos
  public revertirEfectosLogistica(efectos: Efecto[]): void {
    for (const efecto of efectos) {
      // Invertir el modificador para revertir el efecto
      const modificadorInvertido = -efecto.modificador;
      
      switch (efecto.tipo) {
        case TipoEfecto.TIEMPO_ENTREGA:
          this.sistemaLogistica.modificarTiempoEntrega(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.COSTO_TRANSPORTE:
          this.sistemaLogistica.modificarCostoTransporte(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.CAPACIDAD_ALMACENAMIENTO:
          this.sistemaLogistica.modificarCapacidadAlmacenamiento(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.DISPONIBILIDAD_RUTAS:
          this.sistemaLogistica.modificarDisponibilidadRutas(efecto.objetivo, modificadorInvertido);
          break;
        case TipoEfecto.PERDIDAS_TRANSITO:
          this.sistemaLogistica.modificarPerdidasTransito(efecto.objetivo, modificadorInvertido);
          break;
      }
    }
  }
}

// Clase para integrar el sistema de eventos con el sistema de notificaciones
export class IntegradorNotificaciones {
  private sistemaNotificaciones: any; // Referencia al sistema de notificaciones del juego
  
  constructor(sistemaNotificaciones: any) {
    this.sistemaNotificaciones = sistemaNotificaciones;
  }
  
  // Notificar nuevo evento
  public notificarEvento(evento: EventoBase): void {
    // Determinar prioridad según severidad
    let prioridad = 'normal';
    if (evento.severidad === Severidad.ALTA) {
      prioridad = 'alta';
    } else if (evento.severidad === Severidad.BAJA) {
      prioridad = 'baja';
    }
    
    // Crear notificación
    const notificacion = {
      id: `notif-${evento.id}`,
      titulo: evento.nombre,
      mensaje: evento.descripcion,
      icono: evento.icono,
      prioridad: prioridad,
      timestamp: Date.now(),
      leido: false,
      eventoId: evento.id
    };
    
    // Enviar notificación
    this.sistemaNotificaciones.agregarNotificacion(notificacion);
    
    // Mostrar notificación emergente para eventos importantes
    if (prioridad === 'alta') {
      this.sistemaNotificaciones.mostrarNotificacionEmergente(notificacion);
    }
    
    // Reproducir sonido si está disponible
    if (evento.sonido) {
      this.sistemaNotificaciones.reproducirSonido(evento.sonido);
    }
  }
  
  // Notificar finalización de evento
  public notificarFinalizacionEvento(evento: EventoBase): void {
    // Crear notificación
    const notificacion = {
      id: `notif-fin-${evento.id}`,
      titulo: `Finalizado: ${evento.nombre}`,
      mensaje: `El evento "${evento.nombre}" ha finalizado.`,
      icono: evento.icono,
      prioridad: 'baja',
      timestamp: Date.now(),
      leido: false,
      eventoId: evento.id
    };
    
    // Enviar notificación
    this.sistemaNotificaciones.agregarNotificacion(notificacion);
  }
  
  // Actualizar feed de noticias
  public actualizarFeedNoticias(): void {
    this.sistemaNotificaciones.actualizarFeedNoticias();
  }
}

// Clase principal que coordina todo el sistema de eventos
export class SistemaEventosDinamicos {
  private gestorEventos: GestorEventos;
  private integradorEconomico: IntegradorEconomico;
  private integradorProduccion: IntegradorProduccion;
  private integradorLogistica: IntegradorLogistica;
  private integradorNotificaciones: IntegradorNotificaciones;
  
  constructor(
    sistemaEconomico: any,
    sistemaProduccion: any,
    sistemaLogistica: any,
    sistemaNotificaciones: any,
    configuracion: ConfiguracionEventos
  ) {
    // Inicializar gestor de eventos
    this.gestorEventos = new GestorEventos(configuracion);
    
    // Inicializar integradores
    this.integradorEconomico = new IntegradorEconomico(sistemaEconomico);
    this.integradorProduccion = new IntegradorProduccion(sistemaProduccion);
    this.integradorLogistica = new IntegradorLogistica(sistemaLogistica);
    this.integradorNotificaciones = new IntegradorNotificaciones(sistemaNotificaciones);
    
    // Registrar callbacks
    this.registrarCallbacks();
  }
  
  // Registrar callbacks para eventos del gestor
  private registrarCallbacks(): void {
    // Callback para evento activado
    this.gestorEventos.registrarCallback('onEventoActivado', (evento: EventoBase) => {
      // Notificar al jugador
      this.integradorNotificaciones.notificarEvento(evento);
      
      // Aplicar efectos según su tipo
      this.aplicarEfectos(evento.efectos);
    });
    
    // Callback para evento finalizado
    this.gestorEventos.registrarCallback('onEventoFinalizado', (evento: EventoBase) => {
      // Notificar al jugador
      this.integradorNotificaciones.notificarFinalizacionEvento(evento);
      
      // Revertir efectos temporales
      const efectosTemporales = evento.efectos.filter(e => e.esTemporal);
      this.revertirEfectos(efectosTemporales);
    });
    
    // Callback para efectos aplicados
    this.gestorEventos.registrarCallback('onEfectosAplicados', (efectos: Efecto[], evento: EventoBase) => {
      this.aplicarEfectos(efectos);
    });
    
    // Callback para efectos revertidos
    this.gestorEventos.registrarCallback('onEfectosRevertidos', (efectos: Efecto[], evento: EventoBase) => {
      this.revertirEfectos(efectos);
    });
  }
  
  // Aplicar efectos según su tipo
  private aplicarEfectos(efectos: Efecto[]): void {
    // Agrupar efectos por tipo
    const efectosEconomicos: Efecto[] = [];
    const efectosProduccion: Efecto[] = [];
    const efectosLogistica: Efecto[] = [];
    const otrosEfectos: Efecto[] = [];
    
    for (const efecto of efectos) {
      // Clasificar según el tipo
      const tipoEfecto = efecto.tipo;
      
      if (
        tipoEfecto === TipoEfecto.PRECIO_COMPRA ||
        tipoEfecto === TipoEfecto.PRECIO_VENTA ||
        tipoEfecto === TipoEfecto.DEMANDA ||
        tipoEfecto === TipoEfecto.COSTO_PRODUCCION ||
        tipoEfecto === TipoEfecto.TASA_INTERES ||
        tipoEfecto === TipoEfecto.IMPUESTOS
      ) {
        efectosEconomicos.push(efecto);
      } else if (
        tipoEfecto === TipoEfecto.EFICIENCIA_FABRICA ||
        tipoEfecto === TipoEfecto.DISPONIBILIDAD_MATERIAS ||
        tipoEfecto === TipoEfecto.CALIDAD_PRODUCTO ||
        tipoEfecto === TipoEfecto.VELOCIDAD_PRODUCCION ||
        tipoEfecto === TipoEfecto.COSTOS_OPERATIVOS
      ) {
        efectosProduccion.push(efecto);
      } else if (
        tipoEfecto === TipoEfecto.TIEMPO_ENTREGA ||
        tipoEfecto === TipoEfecto.COSTO_TRANSPORTE ||
        tipoEfecto === TipoEfecto.CAPACIDAD_ALMACENAMIENTO ||
        tipoEfecto === TipoEfecto.DISPONIBILIDAD_RUTAS ||
        tipoEfecto === TipoEfecto.PERDIDAS_TRANSITO
      ) {
        efectosLogistica.push(efecto);
      } else {
        otrosEfectos.push(efecto);
      }
    }
    
    // Aplicar efectos por sistema
    if (efectosEconomicos.length > 0) {
      this.integradorEconomico.aplicarEfectosEconomicos(efectosEconomicos);
    }
    
    if (efectosProduccion.length > 0) {
      this.integradorProduccion.aplicarEfectosProduccion(efectosProduccion);
    }
    
    if (efectosLogistica.length > 0) {
      this.integradorLogistica.aplicarEfectosLogistica(efectosLogistica);
    }
    
    // Otros efectos se manejan caso por caso
    for (const efecto of otrosEfectos) {
      console.log(`Efecto no categorizado aplicado: ${efecto.tipo} - ${efecto.descripcion}`);
    }
  }
  
  // Revertir efectos según su tipo
  private revertirEfectos(efectos: Efecto[]): void {
    // Agrupar efectos por tipo
    const efectosEconomicos: Efecto[] = [];
    const efectosProduccion: Efecto[] = [];
    const efectosLogistica: Efecto[] = [];
    const otrosEfectos: Efecto[] = [];
    
    for (const efecto of efectos) {
      // Clasificar según el tipo
      const tipoEfecto = efecto.tipo;
      
      if (
        tipoEfecto === TipoEfecto.PRECIO_COMPRA ||
        tipoEfecto === TipoEfecto.PRECIO_VENTA ||
        tipoEfecto === TipoEfecto.DEMANDA ||
        tipoEfecto === TipoEfecto.COSTO_PRODUCCION ||
        tipoEfecto === TipoEfecto.TASA_INTERES ||
        tipoEfecto === TipoEfecto.IMPUESTOS
      ) {
        efectosEconomicos.push(efecto);
      } else if (
        tipoEfecto === TipoEfecto.EFICIENCIA_FABRICA ||
        tipoEfecto === TipoEfecto.DISPONIBILIDAD_MATERIAS ||
        tipoEfecto === TipoEfecto.CALIDAD_PRODUCTO ||
        tipoEfecto === TipoEfecto.VELOCIDAD_PRODUCCION ||
        tipoEfecto === TipoEfecto.COSTOS_OPERATIVOS
      ) {
        efectosProduccion.push(efecto);
      } else if (
        tipoEfecto === TipoEfecto.TIEMPO_ENTREGA ||
        tipoEfecto === TipoEfecto.COSTO_TRANSPORTE ||
        tipoEfecto === TipoEfecto.CAPACIDAD_ALMACENAMIENTO ||
        tipoEfecto === TipoEfecto.DISPONIBILIDAD_RUTAS ||
        tipoEfecto === TipoEfecto.PERDIDAS_TRANSITO
      ) {
        efectosLogistica.push(efecto);
      } else {
        otrosEfectos.push(efecto);
      }
    }
    
    // Revertir efectos por sistema
    if (efectosEconomicos.length > 0) {
      this.integradorEconomico.revertirEfectosEconomicos(efectosEconomicos);
    }
    
    if (efectosProduccion.length > 0) {
      this.integradorProduccion.revertirEfectosProduccion(efectosProduccion);
    }
    
    if (efectosLogistica.length > 0) {
      this.integradorLogistica.revertirEfectosLogistica(efectosLogistica);
    }
    
    // Otros efectos se manejan caso por caso
    for (const efecto of otrosEfectos) {
      console.log(`Efecto no categorizado revertido: ${efecto.tipo} - ${efecto.descripcion}`);
    }
  }
  
  // Inicializar el sistema con eventos predefinidos
  public inicializar(eventos: EventoBase[]): void {
    this.gestorEventos.cargarEventos(eventos);
    console.log(`Sistema de Eventos Dinámicos inicializado con ${eventos.length} eventos`);
  }
  
  // Actualizar el sistema en cada ciclo de juego
  public actualizar(tiempoActual: number, estadoJuego: EstadoJuego): void {
    this.gestorEventos.actualizarEventos(tiempoActual, estadoJuego);
  }
  
  // Procesar respuesta del jugador a un evento
  public procesarRespuestaJugador(eventoId: string, respuestaId: string, estadoJuego: EstadoJuego): boolean {
    return this.gestorEventos.procesarRespuesta(eventoId, respuestaId, estadoJuego);
  }
  
  // Obtener eventos activos
  public obtenerEventosActivos(): EventoBase[] {
    return this.gestorEventos.obtenerEventosActivos();
  }
  
  // Obtener historial de eventos
  public obtenerHistorialEventos(): EventoBase[] {
    return this.gestorEventos.obtenerHistorialEventos();
  }
  
  // Obtener evento por ID
  public obtenerEvento(eventoId: string): EventoBase | undefined {
    return this.gestorEventos.obtenerEvento(eventoId);
  }
  
  // Actualizar configuración
  public actualizarConfiguracion(nuevaConfig: Partial<ConfiguracionEventos>): void {
    this.gestorEventos.actualizarConfiguracion(nuevaConfig);
  }
}

// Exportar todo el sistema
export default {
  SistemaEventosDinamicos,
  GestorEventos,
  IntegradorEconomico,
  IntegradorProduccion,
  IntegradorLogistica,
  IntegradorNotificaciones,
  TipoEvento,
  AlcanceEvento,
  Severidad,
  EstadoEvento,
  TipoCondicion,
  OperadorComparacion,
  TipoEfecto
};
