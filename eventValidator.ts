// Sistema de validación para el Sistema de Eventos Dinámicos
import { 
  EventoBase, 
  Efecto, 
  OpcionRespuesta, 
  Condicion,
  EstadoEvento,
  TipoEvento,
  AlcanceEvento,
  Severidad,
  TipoCondicion,
  OperadorComparacion,
  TipoEfecto,
  GestorEventos,
  SistemaEventosDinamicos,
  ConfiguracionEventos,
  EstadoJuego
} from './eventSystem';

// Interfaz para resultados de validación
interface ResultadoValidacion {
  exito: boolean;
  mensaje: string;
  detalles?: any;
}

// Clase para validar eventos individuales
export class ValidadorEventos {
  // Validar estructura básica de un evento
  public validarEvento(evento: EventoBase): ResultadoValidacion {
    try {
      // Verificar campos obligatorios
      if (!evento.id || !evento.nombre || !evento.descripcion) {
        return {
          exito: false,
          mensaje: 'Evento incompleto: faltan campos obligatorios (id, nombre, descripcion)'
        };
      }
      
      // Verificar enumeraciones
      if (!Object.values(TipoEvento).includes(evento.tipo)) {
        return {
          exito: false,
          mensaje: `Tipo de evento inválido: ${evento.tipo}`
        };
      }
      
      if (!Object.values(AlcanceEvento).includes(evento.alcance)) {
        return {
          exito: false,
          mensaje: `Alcance de evento inválido: ${evento.alcance}`
        };
      }
      
      if (!Object.values(Severidad).includes(evento.severidad)) {
        return {
          exito: false,
          mensaje: `Severidad de evento inválida: ${evento.severidad}`
        };
      }
      
      if (!Object.values(EstadoEvento).includes(evento.estado)) {
        return {
          exito: false,
          mensaje: `Estado de evento inválido: ${evento.estado}`
        };
      }
      
      // Verificar duración
      if (typeof evento.duracion !== 'number' || evento.duracion <= 0) {
        return {
          exito: false,
          mensaje: `Duración de evento inválida: ${evento.duracion}`
        };
      }
      
      // Verificar probabilidad
      if (typeof evento.probabilidadBase !== 'number' || 
          evento.probabilidadBase < 0 || 
          evento.probabilidadBase > 100) {
        return {
          exito: false,
          mensaje: `Probabilidad base inválida: ${evento.probabilidadBase}`
        };
      }
      
      // Validar condiciones
      const resultadoCondiciones = this.validarCondiciones(evento.condicionesActivacion);
      if (!resultadoCondiciones.exito) {
        return resultadoCondiciones;
      }
      
      // Validar efectos
      const resultadoEfectos = this.validarEfectos(evento.efectos);
      if (!resultadoEfectos.exito) {
        return resultadoEfectos;
      }
      
      // Validar opciones de respuesta
      const resultadoOpciones = this.validarOpcionesRespuesta(evento.opcionesRespuesta);
      if (!resultadoOpciones.exito) {
        return resultadoOpciones;
      }
      
      // Verificar eventos relacionados
      if (!Array.isArray(evento.eventosRelacionados)) {
        return {
          exito: false,
          mensaje: 'Eventos relacionados debe ser un array'
        };
      }
      
      // Verificar icono
      if (!evento.icono) {
        return {
          exito: false,
          mensaje: 'Falta icono para el evento'
        };
      }
      
      return {
        exito: true,
        mensaje: 'Evento válido',
        detalles: {
          id: evento.id,
          nombre: evento.nombre
        }
      };
    } catch (error) {
      return {
        exito: false,
        mensaje: `Error al validar evento: ${error.message}`
      };
    }
  }
  
  // Validar condiciones
  private validarCondiciones(condiciones: Condicion[]): ResultadoValidacion {
    if (!Array.isArray(condiciones)) {
      return {
        exito: false,
        mensaje: 'Condiciones debe ser un array'
      };
    }
    
    for (let i = 0; i < condiciones.length; i++) {
      const condicion = condiciones[i];
      
      // Verificar tipo de condición
      if (!Object.values(TipoCondicion).includes(condicion.tipo)) {
        return {
          exito: false,
          mensaje: `Tipo de condición inválido en posición ${i}: ${condicion.tipo}`
        };
      }
      
      // Verificar operador
      if (!Object.values(OperadorComparacion).includes(condicion.operador)) {
        return {
          exito: false,
          mensaje: `Operador de comparación inválido en posición ${i}: ${condicion.operador}`
        };
      }
      
      // Verificar parámetro
      if (!condicion.parametro) {
        return {
          exito: false,
          mensaje: `Falta parámetro en condición en posición ${i}`
        };
      }
      
      // Verificar valor
      if (condicion.valor === undefined || condicion.valor === null) {
        return {
          exito: false,
          mensaje: `Falta valor en condición en posición ${i}`
        };
      }
      
      // Verificar descripción
      if (!condicion.descripcion) {
        return {
          exito: false,
          mensaje: `Falta descripción en condición en posición ${i}`
        };
      }
    }
    
    return {
      exito: true,
      mensaje: 'Condiciones válidas'
    };
  }
  
  // Validar efectos
  private validarEfectos(efectos: Efecto[]): ResultadoValidacion {
    if (!Array.isArray(efectos)) {
      return {
        exito: false,
        mensaje: 'Efectos debe ser un array'
      };
    }
    
    for (let i = 0; i < efectos.length; i++) {
      const efecto = efectos[i];
      
      // Verificar tipo de efecto
      if (!Object.values(TipoEfecto).includes(efecto.tipo)) {
        return {
          exito: false,
          mensaje: `Tipo de efecto inválido en posición ${i}: ${efecto.tipo}`
        };
      }
      
      // Verificar objetivo
      if (!efecto.objetivo) {
        return {
          exito: false,
          mensaje: `Falta objetivo en efecto en posición ${i}`
        };
      }
      
      // Verificar modificador
      if (typeof efecto.modificador !== 'number') {
        return {
          exito: false,
          mensaje: `Modificador inválido en efecto en posición ${i}: ${efecto.modificador}`
        };
      }
      
      // Verificar esTemporal
      if (typeof efecto.esTemporal !== 'boolean') {
        return {
          exito: false,
          mensaje: `Campo esTemporal inválido en efecto en posición ${i}: ${efecto.esTemporal}`
        };
      }
      
      // Verificar descripción
      if (!efecto.descripcion) {
        return {
          exito: false,
          mensaje: `Falta descripción en efecto en posición ${i}`
        };
      }
    }
    
    return {
      exito: true,
      mensaje: 'Efectos válidos'
    };
  }
  
  // Validar opciones de respuesta
  private validarOpcionesRespuesta(opciones: OpcionRespuesta[]): ResultadoValidacion {
    if (!Array.isArray(opciones)) {
      return {
        exito: false,
        mensaje: 'Opciones de respuesta debe ser un array'
      };
    }
    
    for (let i = 0; i < opciones.length; i++) {
      const opcion = opciones[i];
      
      // Verificar campos obligatorios
      if (!opcion.id || !opcion.titulo || !opcion.descripcion) {
        return {
          exito: false,
          mensaje: `Opción de respuesta incompleta en posición ${i}: faltan campos obligatorios`
        };
      }
      
      // Verificar costo
      if (typeof opcion.costo !== 'number' || opcion.costo < 0) {
        return {
          exito: false,
          mensaje: `Costo inválido en opción de respuesta en posición ${i}: ${opcion.costo}`
        };
      }
      
      // Verificar tiempo de implementación
      if (typeof opcion.tiempoImplementacion !== 'number' || opcion.tiempoImplementacion < 0) {
        return {
          exito: false,
          mensaje: `Tiempo de implementación inválido en opción de respuesta en posición ${i}: ${opcion.tiempoImplementacion}`
        };
      }
      
      // Validar efectos
      const resultadoEfectos = this.validarEfectos(opcion.efectos);
      if (!resultadoEfectos.exito) {
        return {
          exito: false,
          mensaje: `Error en efectos de opción de respuesta en posición ${i}: ${resultadoEfectos.mensaje}`
        };
      }
      
      // Validar requisitos
      const resultadoRequisitos = this.validarCondiciones(opcion.requisitos);
      if (!resultadoRequisitos.exito) {
        return {
          exito: false,
          mensaje: `Error en requisitos de opción de respuesta en posición ${i}: ${resultadoRequisitos.mensaje}`
        };
      }
      
      // Validar consecuencias
      if (!Array.isArray(opcion.consecuencias)) {
        return {
          exito: false,
          mensaje: `Consecuencias debe ser un array en opción de respuesta en posición ${i}`
        };
      }
      
      for (let j = 0; j < opcion.consecuencias.length; j++) {
        const consecuencia = opcion.consecuencias[j];
        
        // Verificar descripción
        if (!consecuencia.descripcion) {
          return {
            exito: false,
            mensaje: `Falta descripción en consecuencia en posición ${j} de opción de respuesta en posición ${i}`
          };
        }
        
        // Verificar probabilidad
        if (typeof consecuencia.probabilidad !== 'number' || 
            consecuencia.probabilidad < 0 || 
            consecuencia.probabilidad > 100) {
          return {
            exito: false,
            mensaje: `Probabilidad inválida en consecuencia en posición ${j} de opción de respuesta en posición ${i}: ${consecuencia.probabilidad}`
          };
        }
        
        // Validar efectos
        const resultadoEfectosConsecuencia = this.validarEfectos(consecuencia.efectos);
        if (!resultadoEfectosConsecuencia.exito) {
          return {
            exito: false,
            mensaje: `Error en efectos de consecuencia en posición ${j} de opción de respuesta en posición ${i}: ${resultadoEfectosConsecuencia.mensaje}`
          };
        }
      }
    }
    
    return {
      exito: true,
      mensaje: 'Opciones de respuesta válidas'
    };
  }
}

// Clase para validar el sistema completo
export class ValidadorSistemaEventos {
  private validadorEventos: ValidadorEventos;
  
  constructor() {
    this.validadorEventos = new ValidadorEventos();
  }
  
  // Validar base de datos de eventos
  public validarBaseDatosEventos(eventos: EventoBase[]): ResultadoValidacion {
    if (!Array.isArray(eventos)) {
      return {
        exito: false,
        mensaje: 'La base de datos de eventos debe ser un array'
      };
    }
    
    if (eventos.length === 0) {
      return {
        exito: false,
        mensaje: 'La base de datos de eventos está vacía'
      };
    }
    
    const resultados: { [id: string]: ResultadoValidacion } = {};
    let eventosValidos = 0;
    let eventosInvalidos = 0;
    
    // Validar cada evento
    for (const evento of eventos) {
      const resultado = this.validadorEventos.validarEvento(evento);
      resultados[evento.id] = resultado;
      
      if (resultado.exito) {
        eventosValidos++;
      } else {
        eventosInvalidos++;
      }
    }
    
    // Verificar IDs únicos
    const ids = eventos.map(e => e.id);
    const idsUnicos = new Set(ids);
    
    if (ids.length !== idsUnicos.size) {
      return {
        exito: false,
        mensaje: 'Hay IDs duplicados en la base de datos de eventos',
        detalles: {
          resultados,
          eventosValidos,
          eventosInvalidos,
          idsDuplicados: ids.filter((id, index) => ids.indexOf(id) !== index)
        }
      };
    }
    
    return {
      exito: eventosInvalidos === 0,
      mensaje: eventosInvalidos === 0 
        ? `Todos los ${eventosValidos} eventos son válidos` 
        : `${eventosInvalidos} eventos inválidos de ${eventos.length} total`,
      detalles: {
        resultados,
        eventosValidos,
        eventosInvalidos
      }
    };
  }
  
  // Validar configuración del sistema
  public validarConfiguracion(config: ConfiguracionEventos): ResultadoValidacion {
    try {
      // Verificar frecuencia base
      if (typeof config.frecuenciaBase !== 'number' || 
          config.frecuenciaBase < 0 || 
          config.frecuenciaBase > 100) {
        return {
          exito: false,
          mensaje: `Frecuencia base inválida: ${config.frecuenciaBase}`
        };
      }
      
      // Verificar máximo de eventos simultáneos
      if (typeof config.maxEventosSimultaneos !== 'number' || 
          config.maxEventosSimultaneos <= 0 || 
          !Number.isInteger(config.maxEventosSimultaneos)) {
        return {
          exito: false,
          mensaje: `Máximo de eventos simultáneos inválido: ${config.maxEventosSimultaneos}`
        };
      }
      
      // Verificar factor de dificultad
      if (typeof config.factorDificultad !== 'number' || config.factorDificultad <= 0) {
        return {
          exito: false,
          mensaje: `Factor de dificultad inválido: ${config.factorDificultad}`
        };
      }
      
      // Verificar balance positivo/negativo
      if (typeof config.balancePositivoNegativo !== 'number' || 
          config.balancePositivoNegativo < 0 || 
          config.balancePositivoNegativo > 1) {
        return {
          exito: false,
          mensaje: `Balance positivo/negativo inválido: ${config.balancePositivoNegativo}`
        };
      }
      
      return {
        exito: true,
        mensaje: 'Configuración válida'
      };
    } catch (error) {
      return {
        exito: false,
        mensaje: `Error al validar configuración: ${error.message}`
      };
    }
  }
  
  // Validar integración con sistemas
  public validarIntegracion(
    sistemaEventos: SistemaEventosDinamicos,
    estadoJuego: EstadoJuego
  ): ResultadoValidacion {
    try {
      // Verificar que se pueden obtener eventos activos
      const eventosActivos = sistemaEventos.obtenerEventosActivos();
      if (!Array.isArray(eventosActivos)) {
        return {
          exito: false,
          mensaje: 'Error al obtener eventos activos'
        };
      }
      
      // Verificar que se puede obtener historial
      const historialEventos = sistemaEventos.obtenerHistorialEventos();
      if (!Array.isArray(historialEventos)) {
        return {
          exito: false,
          mensaje: 'Error al obtener historial de eventos'
        };
      }
      
      // Verificar que se puede actualizar el sistema
      try {
        sistemaEventos.actualizar(estadoJuego.tiempoJuego, estadoJuego);
      } catch (error) {
        return {
          exito: false,
          mensaje: `Error al actualizar el sistema: ${error.message}`
        };
      }
      
      return {
        exito: true,
        mensaje: 'Integración válida',
        detalles: {
          eventosActivos: eventosActivos.length,
          historialEventos: historialEventos.length
        }
      };
    } catch (error) {
      return {
        exito: false,
        mensaje: `Error al validar integración: ${error.message}`
      };
    }
  }
  
  // Realizar pruebas de simulación
  public simularEventos(
    sistemaEventos: SistemaEventosDinamicos,
    estadoJuego: EstadoJuego,
    ciclos: number = 10
  ): ResultadoValidacion {
    try {
      const resultados: any[] = [];
      
      // Simular varios ciclos de juego
      for (let i = 0; i < ciclos; i++) {
        // Avanzar tiempo de juego
        estadoJuego.tiempoJuego += 1;
        
        // Actualizar sistema
        sistemaEventos.actualizar(estadoJuego.tiempoJuego, estadoJuego);
        
        // Obtener eventos activos
        const eventosActivos = sistemaEventos.obtenerEventosActivos();
        
        // Registrar resultado
        resultados.push({
          ciclo: i + 1,
          tiempoJuego: estadoJuego.tiempoJuego,
          eventosActivos: eventosActivos.length,
          eventosActivosIds: eventosActivos.map(e => e.id)
        });
        
        // Si hay eventos activos, probar responder a uno
        if (eventosActivos.length > 0) {
          const evento = eventosActivos[0];
          if (evento.opcionesRespuesta.length > 0) {
            const respuesta = evento.opcionesRespuesta[0];
            const resultadoRespuesta = sistemaEventos.procesarRespuestaJugador(
              evento.id,
              respuesta.id,
              estadoJuego
            );
            
            resultados[i].respuestaProcesada = resultadoRespuesta;
          }
        }
      }
      
      return {
        exito: true,
        mensaje: `Simulación completada: ${ciclos} ciclos`,
        detalles: {
          resultados
        }
      };
    } catch (error) {
      return {
        exito: false,
        mensaje: `Error en simulación: ${error.message}`
      };
    }
  }
  
  // Validación completa del sistema
  public validacionCompleta(
    eventos: EventoBase[],
    configuracion: ConfiguracionEventos,
    sistemaEventos: SistemaEventosDinamicos,
    estadoJuego: EstadoJuego
  ): ResultadoValidacion {
    // Validar base de datos de eventos
    const resultadoEventos = this.validarBaseDatosEventos(eventos);
    if (!resultadoEventos.exito) {
      return {
        exito: false,
        mensaje: `Error en base de datos de eventos: ${resultadoEventos.mensaje}`,
        detalles: {
          resultadoEventos
        }
      };
    }
    
    // Validar configuración
    const resultadoConfig = this.validarConfiguracion(configuracion);
    if (!resultadoConfig.exito) {
      return {
        exito: false,
        mensaje: `Error en configuración: ${resultadoConfig.mensaje}`,
        detalles: {
          resultadoConfig
        }
      };
    }
    
    // Validar integración
    const resultadoIntegracion = this.validarIntegracion(sistemaEventos, estadoJuego);
    if (!resultadoIntegracion.exito) {
      return {
        exito: false,
        mensaje: `Error en integración: ${resultadoIntegracion.mensaje}`,
        detalles: {
          resultadoIntegracion
        }
      };
    }
    
    // Simular eventos
    const resultadoSimulacion = this.simularEventos(sistemaEventos, estadoJuego);
    if (!resultadoSimulacion.exito) {
      return {
        exito: false,
        mensaje: `Error en simulación: ${resultadoSimulacion.mensaje}`,
        detalles: {
          resultadoSimulacion
        }
      };
    }
    
    return {
      exito: true,
      mensaje: 'Validación completa exitosa',
      detalles: {
        resultadoEventos,
        resultadoConfig,
        resultadoIntegracion,
        resultadoSimulacion
      }
    };
  }
}

// Exportar clases
export default {
  ValidadorEventos,
  ValidadorSistemaEventos
};
