"use strict";
// Sistema de Eventos Dinámicos para EcoTycoon: Market Empires
// Implementación basada en el modelo diseñado
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaEventosDinamicos = exports.IntegradorNotificaciones = exports.IntegradorLogistica = exports.IntegradorProduccion = exports.IntegradorEconomico = exports.GestorEventos = exports.TipoEfecto = exports.OperadorComparacion = exports.TipoCondicion = exports.EstadoEvento = exports.Severidad = exports.AlcanceEvento = exports.TipoEvento = void 0;
// Enumeraciones
var TipoEvento;
(function (TipoEvento) {
    TipoEvento["ECONOMICO"] = "economico";
    TipoEvento["REGIONAL"] = "regional";
    TipoEvento["INDUSTRIA"] = "industria";
    TipoEvento["COMPETIDOR"] = "competidor";
    TipoEvento["GLOBAL"] = "global";
})(TipoEvento || (exports.TipoEvento = TipoEvento = {}));
var AlcanceEvento;
(function (AlcanceEvento) {
    AlcanceEvento["GLOBAL"] = "global";
    AlcanceEvento["REGIONAL"] = "regional";
    AlcanceEvento["SECTORIAL"] = "sectorial";
})(AlcanceEvento || (exports.AlcanceEvento = AlcanceEvento = {}));
var Severidad;
(function (Severidad) {
    Severidad["BAJA"] = "baja";
    Severidad["MEDIA"] = "media";
    Severidad["ALTA"] = "alta";
})(Severidad || (exports.Severidad = Severidad = {}));
var EstadoEvento;
(function (EstadoEvento) {
    EstadoEvento["PENDIENTE"] = "pendiente";
    EstadoEvento["ACTIVO"] = "activo";
    EstadoEvento["COMPLETADO"] = "completado";
    EstadoEvento["CANCELADO"] = "cancelado";
})(EstadoEvento || (exports.EstadoEvento = EstadoEvento = {}));
var TipoCondicion;
(function (TipoCondicion) {
    TipoCondicion["TIEMPO_JUEGO"] = "tiempo_juego";
    TipoCondicion["DINERO_JUGADOR"] = "dinero_jugador";
    TipoCondicion["REGION_ACTIVA"] = "region_activa";
    TipoCondicion["INDUSTRIA_ACTIVA"] = "industria_activa";
    TipoCondicion["EVENTO_PREVIO"] = "evento_previo";
    TipoCondicion["NIVEL_DIFICULTAD"] = "nivel_dificultad";
    TipoCondicion["TEMPORADA"] = "temporada";
    TipoCondicion["REPUTACION"] = "reputacion";
    TipoCondicion["TECNOLOGIA"] = "tecnologia";
    TipoCondicion["COMPETIDOR_ACTIVO"] = "competidor_activo";
})(TipoCondicion || (exports.TipoCondicion = TipoCondicion = {}));
var OperadorComparacion;
(function (OperadorComparacion) {
    OperadorComparacion["IGUAL"] = "==";
    OperadorComparacion["DIFERENTE"] = "!=";
    OperadorComparacion["MAYOR"] = ">";
    OperadorComparacion["MENOR"] = "<";
    OperadorComparacion["MAYOR_IGUAL"] = ">=";
    OperadorComparacion["MENOR_IGUAL"] = "<=";
    OperadorComparacion["CONTIENE"] = "contains";
    OperadorComparacion["NO_CONTIENE"] = "not_contains";
})(OperadorComparacion || (exports.OperadorComparacion = OperadorComparacion = {}));
var TipoEfecto;
(function (TipoEfecto) {
    // Efectos económicos
    TipoEfecto["PRECIO_COMPRA"] = "precio_compra";
    TipoEfecto["PRECIO_VENTA"] = "precio_venta";
    TipoEfecto["DEMANDA"] = "demanda";
    TipoEfecto["COSTO_PRODUCCION"] = "costo_produccion";
    TipoEfecto["TASA_INTERES"] = "tasa_interes";
    TipoEfecto["IMPUESTOS"] = "impuestos";
    // Efectos de producción
    TipoEfecto["EFICIENCIA_FABRICA"] = "eficiencia_fabrica";
    TipoEfecto["DISPONIBILIDAD_MATERIAS"] = "disponibilidad_materias";
    TipoEfecto["CALIDAD_PRODUCTO"] = "calidad_producto";
    TipoEfecto["VELOCIDAD_PRODUCCION"] = "velocidad_produccion";
    TipoEfecto["COSTOS_OPERATIVOS"] = "costos_operativos";
    // Efectos logísticos
    TipoEfecto["TIEMPO_ENTREGA"] = "tiempo_entrega";
    TipoEfecto["COSTO_TRANSPORTE"] = "costo_transporte";
    TipoEfecto["CAPACIDAD_ALMACENAMIENTO"] = "capacidad_almacenamiento";
    TipoEfecto["DISPONIBILIDAD_RUTAS"] = "disponibilidad_rutas";
    TipoEfecto["PERDIDAS_TRANSITO"] = "perdidas_transito";
    // Efectos de mercado
    TipoEfecto["PREFERENCIAS_CONSUMIDOR"] = "preferencias_consumidor";
    TipoEfecto["NIVEL_COMPETENCIA"] = "nivel_competencia";
    TipoEfecto["OPORTUNIDADES_MERCADO"] = "oportunidades_mercado";
    TipoEfecto["REPUTACION_MARCA"] = "reputacion_marca";
    TipoEfecto["LEALTAD_CLIENTES"] = "lealtad_clientes";
    // Efectos de investigación
    TipoEfecto["VELOCIDAD_INVESTIGACION"] = "velocidad_investigacion";
    TipoEfecto["COSTO_DESARROLLO"] = "costo_desarrollo";
    TipoEfecto["DISPONIBILIDAD_TECNOLOGIAS"] = "disponibilidad_tecnologias";
    TipoEfecto["OBSOLESCENCIA_PRODUCTOS"] = "obsolescencia_productos";
    TipoEfecto["INNOVACION_DISRUPTIVA"] = "innovacion_disruptiva";
    // Otros efectos
    TipoEfecto["RIESGO_OPERACIONAL"] = "riesgo_operacional";
})(TipoEfecto || (exports.TipoEfecto = TipoEfecto = {}));
// Clase principal para gestionar eventos
class GestorEventos {
    constructor(configuracion) {
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
    registrarCallback(tipo, callback) {
        this.callbacks[tipo] = callback;
    }
    // Cargar eventos desde la base de datos o archivo
    cargarEventos(eventos) {
        this.eventosDisponibles = [...eventos];
        console.log(`Cargados ${this.eventosDisponibles.length} eventos en el sistema`);
    }
    // Actualizar estado de eventos activos
    actualizarEventos(tiempoActual, estadoJuego) {
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
    generarEventos(estadoJuego) {
        const eventosGenerados = [];
        const eventosDisponiblesNoActivos = this.eventosDisponibles.filter(evento => !this.eventosActivos.some(e => e.id === evento.id));
        // Calcular cuántos eventos podemos generar
        const espacioDisponible = this.configuracion.maxEventosSimultaneos - this.eventosActivos.length;
        if (espacioDisponible <= 0)
            return [];
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
    verificarCondiciones(evento, estadoJuego) {
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
    evaluarCondicion(condicion, estadoJuego) {
        let valorActual;
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
    activarEvento(eventoId, tiempoActual) {
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
        const evento = Object.assign({}, this.eventosDisponibles[eventoIndex]);
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
    finalizarEvento(eventoId, tiempoActual) {
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
    aplicarEfectos(evento, estadoJuego) {
        // Notificar aplicación de efectos
        if (this.callbacks.onEfectosAplicados) {
            this.callbacks.onEfectosAplicados(evento.efectos, evento);
        }
        console.log(`Efectos aplicados para evento: ${evento.nombre} (ID: ${evento.id})`);
    }
    // Revertir efectos de un evento
    revertirEfectos(evento, estadoJuego) {
        // Filtrar solo efectos temporales
        const efectosTemporales = evento.efectos.filter(e => e.esTemporal);
        // Notificar reversión de efectos
        if (this.callbacks.onEfectosRevertidos) {
            this.callbacks.onEfectosRevertidos(efectosTemporales, evento);
        }
        console.log(`Efectos revertidos para evento: ${evento.nombre} (ID: ${evento.id})`);
    }
    // Procesar respuesta del jugador
    procesarRespuesta(eventoId, respuestaId, estadoJuego) {
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
    obtenerEventosActivos() {
        return [...this.eventosActivos];
    }
    // Obtener historial de eventos
    obtenerHistorialEventos() {
        return [...this.eventosHistoricos];
    }
    // Obtener evento por ID
    obtenerEvento(eventoId) {
        // Buscar en eventos disponibles
        let evento = this.eventosDisponibles.find(e => e.id === eventoId);
        if (evento)
            return Object.assign({}, evento);
        // Buscar en eventos activos
        evento = this.eventosActivos.find(e => e.id === eventoId);
        if (evento)
            return Object.assign({}, evento);
        // Buscar en eventos históricos
        evento = this.eventosHistoricos.find(e => e.id === eventoId);
        if (evento)
            return Object.assign({}, evento);
        return undefined;
    }
    // Obtener configuración actual
    obtenerConfiguracion() {
        return Object.assign({}, this.configuracion);
    }
    // Actualizar configuración
    actualizarConfiguracion(nuevaConfig) {
        this.configuracion = Object.assign(Object.assign({}, this.configuracion), nuevaConfig);
        console.log('Configuración de eventos actualizada');
    }
}
exports.GestorEventos = GestorEventos;
// Clase para integrar el sistema de eventos con el sistema económico
class IntegradorEconomico {
    constructor(sistemaEconomico) {
        this.sistemaEconomico = sistemaEconomico;
    }
    // Aplicar efectos económicos
    aplicarEfectosEconomicos(efectos) {
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
    revertirEfectosEconomicos(efectos) {
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
exports.IntegradorEconomico = IntegradorEconomico;
// Clase para integrar el sistema de eventos con el sistema de producción
class IntegradorProduccion {
    constructor(sistemaProduccion) {
        this.sistemaProduccion = sistemaProduccion;
    }
    // Aplicar efectos de producción
    aplicarEfectosProduccion(efectos) {
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
    revertirEfectosProduccion(efectos) {
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
exports.IntegradorProduccion = IntegradorProduccion;
// Clase para integrar el sistema de eventos con el sistema de logística
class IntegradorLogistica {
    constructor(sistemaLogistica) {
        this.sistemaLogistica = sistemaLogistica;
    }
    // Aplicar efectos logísticos
    aplicarEfectosLogistica(efectos) {
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
    revertirEfectosLogistica(efectos) {
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
exports.IntegradorLogistica = IntegradorLogistica;
// Clase para integrar el sistema de eventos con el sistema de notificaciones
class IntegradorNotificaciones {
    constructor(sistemaNotificaciones) {
        this.sistemaNotificaciones = sistemaNotificaciones;
    }
    // Notificar nuevo evento
    notificarEvento(evento) {
        // Determinar prioridad según severidad
        let prioridad = 'normal';
        if (evento.severidad === Severidad.ALTA) {
            prioridad = 'alta';
        }
        else if (evento.severidad === Severidad.BAJA) {
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
    notificarFinalizacionEvento(evento) {
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
    actualizarFeedNoticias() {
        this.sistemaNotificaciones.actualizarFeedNoticias();
    }
}
exports.IntegradorNotificaciones = IntegradorNotificaciones;
// Clase principal que coordina todo el sistema de eventos
class SistemaEventosDinamicos {
    constructor(sistemaEconomico, sistemaProduccion, sistemaLogistica, sistemaNotificaciones, configuracion) {
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
    registrarCallbacks() {
        // Callback para evento activado
        this.gestorEventos.registrarCallback('onEventoActivado', (evento) => {
            // Notificar al jugador
            this.integradorNotificaciones.notificarEvento(evento);
            // Aplicar efectos según su tipo
            this.aplicarEfectos(evento.efectos);
        });
        // Callback para evento finalizado
        this.gestorEventos.registrarCallback('onEventoFinalizado', (evento) => {
            // Notificar al jugador
            this.integradorNotificaciones.notificarFinalizacionEvento(evento);
            // Revertir efectos temporales
            const efectosTemporales = evento.efectos.filter(e => e.esTemporal);
            this.revertirEfectos(efectosTemporales);
        });
        // Callback para efectos aplicados
        this.gestorEventos.registrarCallback('onEfectosAplicados', (efectos, evento) => {
            this.aplicarEfectos(efectos);
        });
        // Callback para efectos revertidos
        this.gestorEventos.registrarCallback('onEfectosRevertidos', (efectos, evento) => {
            this.revertirEfectos(efectos);
        });
    }
    // Aplicar efectos según su tipo
    aplicarEfectos(efectos) {
        // Agrupar efectos por tipo
        const efectosEconomicos = [];
        const efectosProduccion = [];
        const efectosLogistica = [];
        const otrosEfectos = [];
        for (const efecto of efectos) {
            // Clasificar según el tipo
            const tipoEfecto = efecto.tipo;
            if (tipoEfecto === TipoEfecto.PRECIO_COMPRA ||
                tipoEfecto === TipoEfecto.PRECIO_VENTA ||
                tipoEfecto === TipoEfecto.DEMANDA ||
                tipoEfecto === TipoEfecto.COSTO_PRODUCCION ||
                tipoEfecto === TipoEfecto.TASA_INTERES ||
                tipoEfecto === TipoEfecto.IMPUESTOS) {
                efectosEconomicos.push(efecto);
            }
            else if (tipoEfecto === TipoEfecto.EFICIENCIA_FABRICA ||
                tipoEfecto === TipoEfecto.DISPONIBILIDAD_MATERIAS ||
                tipoEfecto === TipoEfecto.CALIDAD_PRODUCTO ||
                tipoEfecto === TipoEfecto.VELOCIDAD_PRODUCCION ||
                tipoEfecto === TipoEfecto.COSTOS_OPERATIVOS) {
                efectosProduccion.push(efecto);
            }
            else if (tipoEfecto === TipoEfecto.TIEMPO_ENTREGA ||
                tipoEfecto === TipoEfecto.COSTO_TRANSPORTE ||
                tipoEfecto === TipoEfecto.CAPACIDAD_ALMACENAMIENTO ||
                tipoEfecto === TipoEfecto.DISPONIBILIDAD_RUTAS ||
                tipoEfecto === TipoEfecto.PERDIDAS_TRANSITO) {
                efectosLogistica.push(efecto);
            }
            else {
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
    revertirEfectos(efectos) {
        // Agrupar efectos por tipo
        const efectosEconomicos = [];
        const efectosProduccion = [];
        const efectosLogistica = [];
        const otrosEfectos = [];
        for (const efecto of efectos) {
            // Clasificar según el tipo
            const tipoEfecto = efecto.tipo;
            if (tipoEfecto === TipoEfecto.PRECIO_COMPRA ||
                tipoEfecto === TipoEfecto.PRECIO_VENTA ||
                tipoEfecto === TipoEfecto.DEMANDA ||
                tipoEfecto === TipoEfecto.COSTO_PRODUCCION ||
                tipoEfecto === TipoEfecto.TASA_INTERES ||
                tipoEfecto === TipoEfecto.IMPUESTOS) {
                efectosEconomicos.push(efecto);
            }
            else if (tipoEfecto === TipoEfecto.EFICIENCIA_FABRICA ||
                tipoEfecto === TipoEfecto.DISPONIBILIDAD_MATERIAS ||
                tipoEfecto === TipoEfecto.CALIDAD_PRODUCTO ||
                tipoEfecto === TipoEfecto.VELOCIDAD_PRODUCCION ||
                tipoEfecto === TipoEfecto.COSTOS_OPERATIVOS) {
                efectosProduccion.push(efecto);
            }
            else if (tipoEfecto === TipoEfecto.TIEMPO_ENTREGA ||
                tipoEfecto === TipoEfecto.COSTO_TRANSPORTE ||
                tipoEfecto === TipoEfecto.CAPACIDAD_ALMACENAMIENTO ||
                tipoEfecto === TipoEfecto.DISPONIBILIDAD_RUTAS ||
                tipoEfecto === TipoEfecto.PERDIDAS_TRANSITO) {
                efectosLogistica.push(efecto);
            }
            else {
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
    inicializar(eventos) {
        this.gestorEventos.cargarEventos(eventos);
        console.log(`Sistema de Eventos Dinámicos inicializado con ${eventos.length} eventos`);
    }
    // Actualizar el sistema en cada ciclo de juego
    actualizar(tiempoActual, estadoJuego) {
        this.gestorEventos.actualizarEventos(tiempoActual, estadoJuego);
    }
    // Procesar respuesta del jugador a un evento
    procesarRespuestaJugador(eventoId, respuestaId, estadoJuego) {
        return this.gestorEventos.procesarRespuesta(eventoId, respuestaId, estadoJuego);
    }
    // Obtener eventos activos
    obtenerEventosActivos() {
        return this.gestorEventos.obtenerEventosActivos();
    }
    // Obtener historial de eventos
    obtenerHistorialEventos() {
        return this.gestorEventos.obtenerHistorialEventos();
    }
    // Obtener evento por ID
    obtenerEvento(eventoId) {
        return this.gestorEventos.obtenerEvento(eventoId);
    }
    // Actualizar configuración
    actualizarConfiguracion(nuevaConfig) {
        this.gestorEventos.actualizarConfiguracion(nuevaConfig);
    }
}
exports.SistemaEventosDinamicos = SistemaEventosDinamicos;
// Exportar todo el sistema
exports.default = {
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
