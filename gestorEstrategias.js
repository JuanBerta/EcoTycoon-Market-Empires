"use strict";
/**
 * Sistema de Competencia Estratégica - Gestor de Estrategias
 *
 * Este módulo implementa la lógica para gestionar las diferentes
 * estrategias competitivas que las empresas pueden ejecutar.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorEstrategias = void 0;
const competitionTypes_1 = require("./competitionTypes");
/**
 * Clase que gestiona las estrategias competitivas
 */
class GestorEstrategias {
    constructor() {
        this.estrategias = new Map();
        // Inicialización
    }
    /**
     * Inicia una nueva estrategia competitiva
     * @param tipo Tipo de estrategia
     * @param empresaEjecutora ID de la empresa que ejecuta
     * @param empresasObjetivo IDs de las empresas objetivo
     * @param duracionPlanificada Duración planificada en días
     * @param intensidad Nivel de intensidad
     * @param inversion Inversión inicial
     * @param detallesEspecificos Detalles específicos según el tipo de estrategia
     * @returns La estrategia creada
     */
    iniciarEstrategia(tipo, empresaEjecutora, empresasObjetivo, duracionPlanificada, intensidad, inversion, detallesEspecificos) {
        // Generar ID único para la estrategia
        const id = `estrategia_${tipo}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const fechaActual = Date.now();
        // Crear la estrategia base
        let estrategia = {
            id,
            tipo,
            empresaEjecutora,
            empresasObjetivo,
            fechaInicio: fechaActual,
            duracionPlanificada,
            intensidad,
            estado: competitionTypes_1.EstadoEstrategia.INICIADA,
            progreso: 0,
            inversion,
            costoAcumulado: 0,
            efectosEsperados: [], // Se calcularán según el tipo
            efectosReales: [],
            respuestasCompetidores: [],
            riesgosIdentificados: [], // Se identificarán según el tipo
            informesProgreso: [{
                    fecha: fechaActual,
                    progreso: 0,
                    logros: ["Estrategia iniciada"],
                    problemas: []
                }]
        };
        // Añadir detalles específicos y calcular efectos/riesgos
        switch (tipo) {
            case competitionTypes_1.TipoEstrategiaCompetitiva.GUERRA_PRECIOS:
                estrategia = this.iniciarGuerraPrecios(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.BLOQUEO_RECURSOS:
                estrategia = this.iniciarBloqueoRecursos(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.INNOVACION_DISRUPTIVA:
                estrategia = this.iniciarInnovacion(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.MARKETING_AGRESIVO:
                estrategia = this.iniciarMarketing(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.EXPANSION_TERRITORIAL:
                estrategia = this.iniciarExpansion(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.MEJORA_CALIDAD:
                estrategia = this.iniciarMejoraCalidad(estrategia, detallesEspecificos);
                break;
            case competitionTypes_1.TipoEstrategiaCompetitiva.DIVERSIFICACION:
                estrategia = this.iniciarDiversificacion(estrategia, detallesEspecificos);
                break;
            default:
                throw new Error(`Tipo de estrategia no soportado: ${tipo}`);
        }
        // Almacenar la estrategia
        this.estrategias.set(id, estrategia);
        return estrategia;
    }
    /**
     * Inicializa los detalles específicos para una Guerra de Precios
     * @param estrategia Estrategia base
     * @param detalles Detalles específicos
     * @returns Estrategia de Guerra de Precios completa
     */
    iniciarGuerraPrecios(estrategia, detalles) {
        const guerraPrecios = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.GUERRA_PRECIOS, productosAfectados: detalles.productosAfectados, reduccionPreciosPorcentaje: detalles.reduccionPreciosPorcentaje, presupuestoSubsidio: detalles.presupuestoSubsidio, presupuestoConsumido: 0, impactoEnMercado: {
                cuotaMercadoInicial: 0, // Obtener del sistema de mercado
                cuotaMercadoActual: 0, // Obtener del sistema de mercado
                precioMedioInicial: 0, // Obtener del sistema de mercado
                precioMedioActual: 0 // Obtener del sistema de mercado
            }, umbralesFinalizacion: detalles.umbralesFinalizacion });
        // Calcular efectos esperados
        guerraPrecios.efectosEsperados = [
            {
                tipo: "aumento_cuota_mercado",
                descripcion: `Aumento esperado de cuota de mercado hasta ${detalles.umbralesFinalizacion.cuotaMercadoObjetivo}%`,
                valorEstimado: detalles.umbralesFinalizacion.cuotaMercadoObjetivo
            },
            {
                tipo: "reduccion_margenes",
                descripcion: `Reducción de márgenes de beneficio por precios bajos`,
                valorEstimado: -detalles.reduccionPreciosPorcentaje // Impacto negativo
            },
            {
                tipo: "retirada_competidores",
                descripcion: `Retirada esperada de ${detalles.umbralesFinalizacion.competidoresRetirados} competidores`,
                valorEstimado: detalles.umbralesFinalizacion.competidoresRetirados
            }
        ];
        // Identificar riesgos
        guerraPrecios.riesgosIdentificados = [
            {
                descripcion: "Guerra de precios prolongada que agota el presupuesto",
                probabilidad: 60,
                impacto: 8,
                materializado: false
            },
            {
                descripcion: "Daño a la imagen de marca por precios bajos",
                probabilidad: 30,
                impacto: 5,
                materializado: false
            },
            {
                descripcion: "Respuesta agresiva de competidores con mayores recursos",
                probabilidad: 50,
                impacto: 7,
                materializado: false
            }
        ];
        return guerraPrecios;
    }
    /**
     * Inicializa los detalles específicos para un Bloqueo de Recursos
     * @param estrategia Estrategia base
     * @param detalles Detalles específicos
     * @returns Estrategia de Bloqueo de Recursos completa
     */
    iniciarBloqueoRecursos(estrategia, detalles) {
        const bloqueoRecursos = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.BLOQUEO_RECURSOS, recursosObjetivo: detalles.recursosObjetivo, proveedoresControlados: [], porcentajeMercadoControlado: 0, sobrecosteAdquisicion: 0, impactoEnPreciosMercado: 0, reservasAcumuladas: [], contratosExclusividad: [] });
        // Calcular efectos esperados
        bloqueoRecursos.efectosEsperados = [
            {
                tipo: "control_mercado_recursos",
                descripcion: `Control esperado del ${detalles.porcentajeMercadoControladoObjetivo}% del mercado de recursos clave`,
                valorEstimado: detalles.porcentajeMercadoControladoObjetivo
            },
            {
                tipo: "aumento_costos_competidores",
                descripcion: `Aumento esperado de los costos de adquisición para competidores`,
                valorEstimado: 20 // 20% de aumento estimado
            },
            {
                tipo: "ventaja_costos_propia",
                descripcion: `Ventaja en costos de producción por acceso preferente a recursos`,
                valorEstimado: 10 // 10% de ventaja estimada
            }
        ];
        // Identificar riesgos
        bloqueoRecursos.riesgosIdentificados = [
            {
                descripcion: "Acumulación excesiva de inventario de recursos",
                probabilidad: 40,
                impacto: 6,
                materializado: false
            },
            {
                descripcion: "Investigación por prácticas anticompetitivas",
                probabilidad: 30,
                impacto: 9,
                materializado: false
            },
            {
                descripcion: "Aparición de proveedores alternativos o sustitutos",
                probabilidad: 50,
                impacto: 7,
                materializado: false
            }
        ];
        return bloqueoRecursos;
    }
    // --- Métodos para otros tipos de estrategias (Innovación, Marketing, etc.) ---
    // Implementar métodos similares: iniciarInnovacion, iniciarMarketing, etc.
    // Cada método debe:
    // 1. Crear el objeto específico (InnovacionDisruptiva, MarketingAgresivo, etc.)
    // 2. Calcular efectosEsperados específicos
    // 3. Identificar riesgosIdentificados específicos
    iniciarInnovacion(estrategia, detalles) {
        const innovacion = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.INNOVACION_DISRUPTIVA, areaInnovacion: detalles.areaInnovacion, inversionID: detalles.inversionID, tiempoDesarrollo: estrategia.duracionPlanificada, probabilidadExito: detalles.probabilidadExito, patentesPotenciales: detalles.patentesPotenciales, patentesConseguidas: 0, ventajaCompetitiva: detalles.ventajaCompetitivaEstimada, productosResultantes: [] });
        innovacion.efectosEsperados = [
            {
                tipo: "lanzamiento_producto_innovador",
                descripcion: `Lanzamiento de producto/tecnología disruptiva en ${detalles.areaInnovacion}`,
                valorEstimado: 1 // Representa el lanzamiento exitoso
            },
            {
                tipo: "obtencion_patentes",
                descripcion: `Obtención de ${detalles.patentesPotenciales} patentes clave`,
                valorEstimado: detalles.patentesPotenciales
            },
            {
                tipo: "aumento_cuota_mercado",
                descripcion: `Aumento significativo de cuota de mercado por ventaja competitiva`,
                valorEstimado: 15 // 15% de aumento estimado
            }
        ];
        innovacion.riesgosIdentificados = [
            {
                descripcion: "Fracaso del proyecto de I+D",
                probabilidad: 100 - detalles.probabilidadExito,
                impacto: 9,
                materializado: false
            },
            {
                descripcion: "Competencia imita rápidamente la innovación",
                probabilidad: 40,
                impacto: 7,
                materializado: false
            },
            {
                descripcion: "Costos de desarrollo superiores a lo previsto",
                probabilidad: 50,
                impacto: 6,
                materializado: false
            }
        ];
        return innovacion;
    }
    iniciarMarketing(estrategia, detalles) {
        const marketing = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.MARKETING_AGRESIVO, canales: detalles.canales, presupuesto: detalles.presupuesto, gastosAcumulados: 0, alcanceEstimado: detalles.alcanceEstimado, alcanceReal: 0, impactoEnMarca: 0, conversionEstimada: detalles.conversionEstimada, conversionReal: 0, mensajesPrincipales: detalles.mensajesPrincipales, comparativaCompetidores: detalles.comparativaCompetidores });
        marketing.efectosEsperados = [
            {
                tipo: "aumento_notoriedad_marca",
                descripcion: `Aumento de notoriedad de marca hasta un ${detalles.alcanceEstimado / 10000}% estimado`,
                valorEstimado: detalles.alcanceEstimado / 10000
            },
            {
                tipo: "aumento_ventas",
                descripcion: `Aumento de ventas por conversión del ${detalles.conversionEstimada}%`,
                valorEstimado: detalles.conversionEstimada
            },
            {
                tipo: "mejora_imagen_marca",
                descripcion: `Mejora de la imagen de marca`,
                valorEstimado: 5 // 5 puntos de mejora estimada
            }
        ];
        marketing.riesgosIdentificados = [
            {
                descripcion: "Campaña de marketing ineficaz o con bajo ROI",
                probabilidad: 40,
                impacto: 7,
                materializado: false
            },
            {
                descripcion: "Reacción negativa del público a mensajes agresivos",
                probabilidad: 30,
                impacto: 6,
                materializado: false
            },
            {
                descripcion: "Contra-campaña efectiva de la competencia",
                probabilidad: 50,
                impacto: 7,
                materializado: false
            }
        ];
        return marketing;
    }
    iniciarExpansion(estrategia, detalles) {
        const expansion = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.EXPANSION_TERRITORIAL, regionesObjetivo: detalles.regionesObjetivo, inversionPorRegion: detalles.inversionPorRegion.map(inv => (Object.assign(Object.assign({}, inv), { gastado: 0, progreso: 0 }))), instalacionesPlanificadas: detalles.instalacionesPlanificadas.map(inst => (Object.assign(Object.assign({}, inst), { completadas: 0 }))), penetracionMercado: detalles.cuotaObjetivoPorRegion.map(cuota => (Object.assign(Object.assign({}, cuota), { cuotaInicial: 0, cuotaActual: 0 }))) });
        expansion.efectosEsperados = [
            {
                tipo: "establecimiento_presencia_nuevas_regiones",
                descripcion: `Establecimiento de presencia en ${detalles.regionesObjetivo.length} nuevas regiones`,
                valorEstimado: detalles.regionesObjetivo.length
            },
            {
                tipo: "aumento_cuota_mercado_global",
                descripcion: `Aumento de la cuota de mercado global`,
                valorEstimado: 5 // 5% de aumento global estimado
            },
            {
                tipo: "diversificacion_geografica_ingresos",
                descripcion: `Diversificación geográfica de los ingresos`,
                valorEstimado: 1 // Representa la diversificación
            }
        ];
        expansion.riesgosIdentificados = [
            {
                descripcion: "Costos de expansión superiores a lo previsto",
                probabilidad: 50,
                impacto: 7,
                materializado: false
            },
            {
                descripcion: "Dificultades para adaptarse a mercados locales",
                probabilidad: 40,
                impacto: 6,
                materializado: false
            },
            {
                descripcion: "Fuerte resistencia de competidores locales establecidos",
                probabilidad: 60,
                impacto: 8,
                materializado: false
            }
        ];
        return expansion;
    }
    iniciarMejoraCalidad(estrategia, detalles) {
        const mejoraCalidad = Object.assign(Object.assign({}, estrategia), { tipo: competitionTypes_1.TipoEstrategiaCompetitiva.MEJORA_CALIDAD, productosObjetivo: detalles.productosObjetivo, inversionCalidad: detalles.inversionCalidad, aumentoCalidadEsperado: detalles.aumentoCalidadEsperado, aumentoCalidadReal: 0, certificacionesObjetivo: detalles.certificacionesObjetivo, certificacionesObtenidas: [], impactoEnPrecio: detalles.impactoEnPrecio, impactoEnCostos: detalles.impactoEnCostos, percepcionConsumid(Content, truncated, due, to, size, limit) { }, : .Use, line, ranges, to, read, chunks });
    }
}
exports.GestorEstrategias = GestorEstrategias;
