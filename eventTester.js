"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejecutarPruebasEventos = void 0;
// Script de prueba para validar el sistema de eventos dinámicos
const eventSystem_1 = require("./eventSystem");
const eventValidator_1 = require("./eventValidator");
// Crear mock de sistemas del juego
const mockSistemaEconomico = {
    modificarPrecioCompra: (objetivo, modificador) => {
        console.log(`[Economía] Modificando precio de compra de ${objetivo} en ${modificador}%`);
    },
    modificarPrecioVenta: (objetivo, modificador) => {
        console.log(`[Economía] Modificando precio de venta de ${objetivo} en ${modificador}%`);
    },
    modificarDemanda: (objetivo, modificador) => {
        console.log(`[Economía] Modificando demanda de ${objetivo} en ${modificador}%`);
    },
    modificarCostoProduccion: (objetivo, modificador) => {
        console.log(`[Economía] Modificando costo de producción de ${objetivo} en ${modificador}%`);
    },
    modificarTasaInteres: (objetivo, modificador) => {
        console.log(`[Economía] Modificando tasa de interés de ${objetivo} en ${modificador}%`);
    },
    modificarImpuestos: (objetivo, modificador) => {
        console.log(`[Economía] Modificando impuestos de ${objetivo} en ${modificador}%`);
    }
};
const mockSistemaProduccion = {
    modificarEficienciaFabricas: (objetivo, modificador) => {
        console.log(`[Producción] Modificando eficiencia de fábricas de ${objetivo} en ${modificador}%`);
    },
    modificarDisponibilidadMaterias: (objetivo, modificador) => {
        console.log(`[Producción] Modificando disponibilidad de materias de ${objetivo} en ${modificador}%`);
    },
    modificarCalidadProducto: (objetivo, modificador) => {
        console.log(`[Producción] Modificando calidad de producto de ${objetivo} en ${modificador}%`);
    },
    modificarVelocidadProduccion: (objetivo, modificador) => {
        console.log(`[Producción] Modificando velocidad de producción de ${objetivo} en ${modificador}%`);
    },
    modificarCostosOperativos: (objetivo, modificador) => {
        console.log(`[Producción] Modificando costos operativos de ${objetivo} en ${modificador}%`);
    }
};
const mockSistemaLogistica = {
    modificarTiempoEntrega: (objetivo, modificador) => {
        console.log(`[Logística] Modificando tiempo de entrega de ${objetivo} en ${modificador}%`);
    },
    modificarCostoTransporte: (objetivo, modificador) => {
        console.log(`[Logística] Modificando costo de transporte de ${objetivo} en ${modificador}%`);
    },
    modificarCapacidadAlmacenamiento: (objetivo, modificador) => {
        console.log(`[Logística] Modificando capacidad de almacenamiento de ${objetivo} en ${modificador}%`);
    },
    modificarDisponibilidadRutas: (objetivo, modificador) => {
        console.log(`[Logística] Modificando disponibilidad de rutas de ${objetivo} en ${modificador}%`);
    },
    modificarPerdidasTransito: (objetivo, modificador) => {
        console.log(`[Logística] Modificando pérdidas en tránsito de ${objetivo} en ${modificador}%`);
    }
};
const mockSistemaNotificaciones = {
    agregarNotificacion: (notificacion) => {
        console.log(`[Notificación] Nueva: ${notificacion.titulo} - ${notificacion.mensaje}`);
    },
    mostrarNotificacionEmergente: (notificacion) => {
        console.log(`[Notificación Emergente] ${notificacion.titulo} - ${notificacion.mensaje}`);
    },
    reproducirSonido: (sonido) => {
        console.log(`[Sonido] Reproduciendo: ${sonido}`);
    },
    actualizarFeedNoticias: () => {
        console.log(`[Feed] Actualizando feed de noticias`);
    }
};
// Crear eventos de prueba
const eventosTest = [
    // Evento económico: Crisis financiera
    {
        id: "econ_crisis_financiera_001",
        nombre: "Crisis Financiera Global",
        descripcion: "Una severa crisis financiera ha golpeado los mercados globales, afectando a todas las industrias y regiones.",
        tipo: eventSystem_1.TipoEvento.ECONOMICO,
        alcance: eventSystem_1.AlcanceEvento.GLOBAL,
        duracion: 90, // 90 días de juego
        severidad: eventSystem_1.Severidad.ALTA,
        probabilidadBase: 100, // 100% para pruebas
        condicionesActivacion: [
            {
                tipo: eventSystem_1.TipoCondicion.TIEMPO_JUEGO,
                parametro: "dias",
                operador: eventSystem_1.OperadorComparacion.MAYOR,
                valor: 1, // Para pruebas
                descripcion: "Al menos 1 día de juego transcurrido"
            }
        ],
        efectos: [
            {
                tipo: eventSystem_1.TipoEfecto.TASA_INTERES,
                objetivo: "global",
                modificador: 50, // +50% en tasas de interés
                esTemporal: true,
                descripcion: "Aumento del 50% en tasas de interés"
            },
            {
                tipo: eventSystem_1.TipoEfecto.DEMANDA,
                objetivo: "global",
                modificador: -30, // -30% en demanda general
                esTemporal: true,
                descripcion: "Reducción del 30% en demanda general"
            },
            {
                tipo: eventSystem_1.TipoEfecto.PRECIO_VENTA,
                objetivo: "global",
                modificador: -20, // -20% en precios de venta
                esTemporal: true,
                descripcion: "Caída del 20% en precios de venta"
            }
        ],
        opcionesRespuesta: [
            {
                id: "crisis_resp_1",
                titulo: "Reducir Operaciones",
                descripcion: "Reducir temporalmente la escala de operaciones para minimizar pérdidas.",
                costo: 50000,
                tiempoImplementacion: 7,
                efectos: [
                    {
                        tipo: eventSystem_1.TipoEfecto.COSTOS_OPERATIVOS,
                        objetivo: "global",
                        modificador: -25, // -25% en costos operativos
                        esTemporal: true,
                        descripcion: "Reducción del 25% en costos operativos"
                    }
                ],
                requisitos: [],
                consecuencias: [
                    {
                        descripcion: "Pérdida de participación de mercado",
                        probabilidad: 70,
                        efectos: [
                            {
                                tipo: eventSystem_1.TipoEfecto.REPUTACION_MARCA,
                                objetivo: "global",
                                modificador: -10,
                                esTemporal: false,
                                descripcion: "Pérdida del 10% de reputación"
                            }
                        ]
                    }
                ]
            },
            {
                id: "crisis_resp_2",
                titulo: "Invertir Agresivamente",
                descripcion: "Aprovechar la crisis para expandirse mientras la competencia se retrae.",
                costo: 500000,
                tiempoImplementacion: 14,
                efectos: [
                    {
                        tipo: eventSystem_1.TipoEfecto.NIVEL_COMPETENCIA,
                        objetivo: "global",
                        modificador: -40, // -40% en nivel de competencia
                        esTemporal: false,
                        descripcion: "Reducción del 40% en nivel de competencia"
                    }
                ],
                requisitos: [
                    {
                        tipo: eventSystem_1.TipoCondicion.DINERO_JUGADOR,
                        parametro: "capital",
                        operador: eventSystem_1.OperadorComparacion.MAYOR,
                        valor: 1000000,
                        descripcion: "Requiere al menos 1M de capital"
                    }
                ],
                consecuencias: [
                    {
                        descripcion: "Dominio de mercado post-crisis",
                        probabilidad: 60,
                        efectos: [
                            {
                                tipo: eventSystem_1.TipoEfecto.REPUTACION_MARCA,
                                objetivo: "global",
                                modificador: 20,
                                esTemporal: false,
                                descripcion: "Aumento del 20% en reputación"
                            }
                        ]
                    }
                ]
            }
        ],
        eventosRelacionados: ["econ_recuperacion_001"],
        icono: "assets/icons/events/financial_crisis.png",
        sonido: "assets/sounds/events/alarm_bell.mp3",
        estado: eventSystem_1.EstadoEvento.PENDIENTE
    },
    // Evento regional: Inundación
    {
        id: "reg_inundacion_001",
        nombre: "Inundaciones en Región Norte",
        descripcion: "Fuertes lluvias han causado inundaciones severas en la Región Norte, afectando infraestructura y cadenas de suministro.",
        tipo: eventSystem_1.TipoEvento.REGIONAL,
        alcance: eventSystem_1.AlcanceEvento.REGIONAL,
        duracion: 30, // 30 días de juego
        severidad: eventSystem_1.Severidad.ALTA,
        probabilidadBase: 100, // 100% para pruebas
        condicionesActivacion: [
            {
                tipo: eventSystem_1.TipoCondicion.TIEMPO_JUEGO,
                parametro: "dias",
                operador: eventSystem_1.OperadorComparacion.MAYOR,
                valor: 5, // Para pruebas
                descripcion: "Al menos 5 días de juego transcurridos"
            },
            {
                tipo: eventSystem_1.TipoCondicion.REGION_ACTIVA,
                parametro: "region",
                operador: eventSystem_1.OperadorComparacion.CONTIENE,
                valor: "norte",
                descripcion: "Región Norte está activa"
            }
        ],
        efectos: [
            {
                tipo: eventSystem_1.TipoEfecto.TIEMPO_ENTREGA,
                objetivo: "norte",
                modificador: 100, // +100% en tiempos de entrega
                esTemporal: true,
                descripcion: "Duplicación de tiempos de entrega en Región Norte"
            },
            {
                tipo: eventSystem_1.TipoEfecto.COSTO_TRANSPORTE,
                objetivo: "norte",
                modificador: 75, // +75% en costos de transporte
                esTemporal: true,
                descripcion: "Aumento del 75% en costos de transporte en Región Norte"
            },
            {
                tipo: eventSystem_1.TipoEfecto.EFICIENCIA_FABRICA,
                objetivo: "norte",
                modificador: -50, // -50% en eficiencia de fábricas
                esTemporal: true,
                descripcion: "Reducción del 50% en eficiencia de fábricas en Región Norte"
            }
        ],
        opcionesRespuesta: [
            {
                id: "inundacion_resp_1",
                titulo: "Ayuda Humanitaria",
                descripcion: "Destinar recursos a ayudar a la población afectada.",
                costo: 100000,
                tiempoImplementacion: 3,
                efectos: [
                    {
                        tipo: eventSystem_1.TipoEfecto.REPUTACION_MARCA,
                        objetivo: "norte",
                        modificador: 30, // +30% en reputación
                        esTemporal: false,
                        descripcion: "Aumento del 30% en reputación en Región Norte"
                    }
                ],
                requisitos: [],
                consecuencias: [
                    {
                        descripcion: "Lealtad duradera de clientes",
                        probabilidad: 80,
                        efectos: [
                            {
                                tipo: eventSystem_1.TipoEfecto.LEALTAD_CLIENTES,
                                objetivo: "norte",
                                modificador: 25,
                                esTemporal: false,
                                descripcion: "Aumento del 25% en lealtad de clientes en Región Norte"
                            }
                        ]
                    }
                ]
            }
        ],
        eventosRelacionados: [],
        icono: "assets/icons/events/flood.png",
        sonido: "assets/sounds/events/heavy_rain.mp3",
        estado: eventSystem_1.EstadoEvento.PENDIENTE
    }
];
// Configuración para pruebas
const configuracionTest = {
    frecuenciaBase: 20, // 20% de probabilidad base
    maxEventosSimultaneos: 3, // Máximo 3 eventos simultáneos
    factorDificultad: 1.0, // Factor normal
    balancePositivoNegativo: 0.5 // 50% positivos, 50% negativos
};
// Estado de juego para pruebas
const estadoJuegoTest = {
    tiempoJuego: 0, // Día 0
    dineroJugador: 2000000, // 2M de capital
    regionesActivas: ["norte", "central", "sur"],
    industriasActivas: ["alimentos", "electronica", "textil"],
    eventosOcurridos: [],
    nivelDificultad: 3, // Dificultad media
    temporadaActual: "primavera",
    reputacion: 75, // 75/100
    tecnologiasDesbloqueadas: ["logistica_avanzada", "automatizacion_basica"],
    competidoresActivos: ["competidor_1", "competidor_2"]
};
// Función principal de prueba
const ejecutarPruebasEventos = () => {
    console.log("=== INICIANDO PRUEBAS DEL SISTEMA DE EVENTOS DINÁMICOS ===");
    // Crear validador
    const validador = new eventValidator_1.ValidadorSistemaEventos();
    // Validar base de datos de eventos
    console.log("\n1. Validando base de datos de eventos...");
    const resultadoEventos = validador.validarBaseDatosEventos(eventosTest);
    console.log(`Resultado: ${resultadoEventos.exito ? 'ÉXITO' : 'ERROR'}`);
    console.log(`Mensaje: ${resultadoEventos.mensaje}`);
    // Validar configuración
    console.log("\n2. Validando configuración...");
    const resultadoConfig = validador.validarConfiguracion(configuracionTest);
    console.log(`Resultado: ${resultadoConfig.exito ? 'ÉXITO' : 'ERROR'}`);
    console.log(`Mensaje: ${resultadoConfig.mensaje}`);
    // Crear sistema de eventos
    console.log("\n3. Creando sistema de eventos...");
    const sistemaEventos = new eventSystem_1.SistemaEventosDinamicos(mockSistemaEconomico, mockSistemaProduccion, mockSistemaLogistica, mockSistemaNotificaciones, configuracionTest);
    // Inicializar sistema con eventos
    console.log("\n4. Inicializando sistema con eventos de prueba...");
    sistemaEventos.inicializar(eventosTest);
    // Validar integración
    console.log("\n5. Validando integración del sistema...");
    const resultadoIntegracion = validador.validarIntegracion(sistemaEventos, estadoJuegoTest);
    console.log(`Resultado: ${resultadoIntegracion.exito ? 'ÉXITO' : 'ERROR'}`);
    console.log(`Mensaje: ${resultadoIntegracion.mensaje}`);
    // Simular ciclos de juego
    console.log("\n6. Simulando ciclos de juego...");
    const resultadoSimulacion = validador.simularEventos(sistemaEventos, estadoJuegoTest, 10);
    console.log(`Resultado: ${resultadoSimulacion.exito ? 'ÉXITO' : 'ERROR'}`);
    console.log(`Mensaje: ${resultadoSimulacion.mensaje}`);
    // Mostrar resultados de la simulación
    if (resultadoSimulacion.exito && resultadoSimulacion.detalles) {
        console.log("\nResumen de simulación:");
        for (const ciclo of resultadoSimulacion.detalles.resultados) {
            console.log(`Ciclo ${ciclo.ciclo} (Día ${ciclo.tiempoJuego}): ${ciclo.eventosActivos} eventos activos`);
            if (ciclo.eventosActivos > 0) {
                console.log(`  Eventos: ${ciclo.eventosActivosIds.join(', ')}`);
            }
            if (ciclo.respuestaProcesada !== undefined) {
                console.log(`  Respuesta procesada: ${ciclo.respuestaProcesada ? 'Éxito' : 'Error'}`);
            }
        }
    }
    // Validación completa
    console.log("\n7. Realizando validación completa...");
    const resultadoCompleto = validador.validacionCompleta(eventosTest, configuracionTest, sistemaEventos, estadoJuegoTest);
    console.log(`Resultado final: ${resultadoCompleto.exito ? 'ÉXITO' : 'ERROR'}`);
    console.log(`Mensaje: ${resultadoCompleto.mensaje}`);
    console.log("\n=== PRUEBAS COMPLETADAS ===");
    return {
        resultadoEventos,
        resultadoConfig,
        resultadoIntegracion,
        resultadoSimulacion,
        resultadoCompleto
    };
};
exports.ejecutarPruebasEventos = ejecutarPruebasEventos;
// Exportar función de prueba
exports.default = {
    ejecutarPruebasEventos: exports.ejecutarPruebasEventos
};
