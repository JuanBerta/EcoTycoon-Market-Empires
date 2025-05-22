"use strict";
/**
 * Sistema de Fusiones y Adquisiciones - Sistema Central
 *
 * Este módulo integra todos los componentes del sistema de fusiones y adquisiciones
 * y proporciona una interfaz unificada para su uso.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaFusionesAdquisiciones = void 0;
const fusionesTypes_1 = require("./fusionesTypes");
const gestorValoracion_1 = __importDefault(require("./gestorValoracion"));
const gestorNegociaciones_1 = __importDefault(require("./gestorNegociaciones"));
const gestorIntegracion_1 = __importDefault(require("./gestorIntegracion"));
/**
 * Clase principal que integra todos los componentes del sistema de M&A
 */
class SistemaFusionesAdquisiciones {
    constructor() {
        this.gestorValoracion = new gestorValoracion_1.default();
        this.gestorNegociaciones = new gestorNegociaciones_1.default(this.gestorValoracion);
        this.gestorIntegracion = new gestorIntegracion_1.default();
    }
    /**
     * Busca objetivos potenciales para M&A
     * @param criterios Criterios de búsqueda opcionales
     * @returns Lista de objetivos potenciales
     */
    buscarObjetivosPotenciales(criterios) {
        return this.gestorValoracion.buscarObjetivosPotenciales(criterios);
    }
    /**
     * Valora una empresa objetivo
     * @param empresaId ID de la empresa a valorar
     * @param datosAdicionales Datos adicionales para mejorar la precisión
     * @returns Objeto de valoración con estimaciones
     */
    valorarEmpresa(empresaId, datosAdicionales) {
        return this.gestorValoracion.valorarEmpresa(empresaId, undefined, datosAdicionales);
    }
    /**
     * Inicia una nueva negociación de M&A
     * @param empresaIniciadoraId ID de la empresa que inicia la negociación
     * @param empresaObjetivoId ID de la empresa objetivo
     * @param tipoOperacion Tipo de operación propuesta
     * @param esHostil Indica si es una OPA hostil
     * @returns La negociación creada
     */
    iniciarNegociacion(empresaIniciadoraId, empresaObjetivoId, tipoOperacion, esHostil = false) {
        return this.gestorNegociaciones.iniciarNegociacion(empresaIniciadoraId, empresaObjetivoId, tipoOperacion, esHostil);
    }
    /**
     * Realiza la valoración de la empresa objetivo en una negociación
     * @param negociacionId ID de la negociación
     * @param datosAdicionales Datos adicionales para la valoración
     * @returns La negociación actualizada con la valoración
     */
    realizarValoracionEnNegociacion(negociacionId, datosAdicionales) {
        return this.gestorNegociaciones.realizarValoracion(negociacionId, datosAdicionales);
    }
    /**
     * Presenta una oferta inicial en una negociación
     * @param negociacionId ID de la negociación
     * @param oferta Detalles de la oferta
     * @returns La negociación actualizada con la oferta
     */
    presentarOfertaInicial(negociacionId, oferta) {
        return this.gestorNegociaciones.presentarOfertaInicial(negociacionId, oferta);
    }
    /**
     * Evalúa una oferta desde la perspectiva de la empresa objetivo
     * @param ofertaId ID de la oferta a evaluar
     * @returns Objeto con la evaluación de la oferta
     */
    evaluarOferta(ofertaId) {
        return this.gestorNegociaciones.evaluarOferta(ofertaId);
    }
    /**
     * Procesa la respuesta a una oferta (aceptación, rechazo o contraoferta)
     * @param ofertaId ID de la oferta a responder
     * @param respuesta Tipo de respuesta
     * @param contraoferta Detalles de la contraoferta si aplica
     * @returns La negociación actualizada
     */
    responderOferta(ofertaId, respuesta, contraoferta) {
        return this.gestorNegociaciones.responderOferta(ofertaId, respuesta, contraoferta);
    }
    /**
     * Inicia el proceso de due diligence para una negociación con acuerdo preliminar
     * @param negociacionId ID de la negociación
     * @returns La negociación actualizada
     */
    iniciarDueDiligence(negociacionId) {
        return this.gestorNegociaciones.iniciarDueDiligence(negociacionId);
    }
    /**
     * Completa el proceso de due diligence y reporta hallazgos
     * @param negociacionId ID de la negociación
     * @param resultados Resultados del due diligence
     * @returns La negociación actualizada
     */
    completarDueDiligence(negociacionId, resultados) {
        return this.gestorNegociaciones.completarDueDiligence(negociacionId, resultados);
    }
    /**
     * Finaliza una negociación con un acuerdo final
     * @param negociacionId ID de la negociación
     * @param detallesAcuerdo Detalles del acuerdo final
     * @returns El acuerdo creado
     */
    cerrarAcuerdo(negociacionId, detallesAcuerdo) {
        return this.gestorNegociaciones.cerrarAcuerdo(negociacionId, detallesAcuerdo);
    }
    /**
     * Inicia un nuevo proceso de integración tras un acuerdo
     * @param negociacionId ID de la negociación completada
     * @returns El proceso de integración creado
     */
    iniciarIntegracion(negociacionId) {
        const negociacion = this.gestorNegociaciones.obtenerNegociacion(negociacionId);
        if (!negociacion) {
            throw new Error(`Negociación no encontrada: ${negociacionId}`);
        }
        const acuerdo = this.gestorNegociaciones.obtenerAcuerdo(negociacionId);
        if (!acuerdo) {
            throw new Error(`Acuerdo no encontrado para negociación: ${negociacionId}`);
        }
        return this.gestorIntegracion.iniciarProcesoIntegracion(negociacion, acuerdo);
    }
    /**
     * Actualiza el progreso de un proceso de integración
     * @param procesoId ID del proceso de integración
     * @param diasTranscurridos Días transcurridos desde la última actualización
     * @returns El proceso actualizado
     */
    actualizarProgresoIntegracion(procesoId, diasTranscurridos = 1) {
        return this.gestorIntegracion.actualizarProgreso(procesoId, diasTranscurridos);
    }
    /**
     * Resuelve un problema específico en una etapa de integración
     * @param procesoId ID del proceso de integración
     * @param etapaNombre Nombre de la etapa
     * @param problema Descripción del problema
     * @param inversionAdicional Inversión adicional para resolver el problema
     * @returns El proceso actualizado
     */
    resolverProblemaIntegracion(procesoId, etapaNombre, problema, inversionAdicional) {
        return this.gestorIntegracion.resolverProblema(procesoId, etapaNombre, problema, inversionAdicional);
    }
    /**
     * Aumenta la inversión en el proceso de integración
     * @param procesoId ID del proceso de integración
     * @param montoAdicional Monto adicional a invertir
     * @param areaDestino Área a la que se destina la inversión
     * @returns El proceso actualizado
     */
    aumentarInversionIntegracion(procesoId, montoAdicional, areaDestino) {
        return this.gestorIntegracion.aumentarInversion(procesoId, montoAdicional, areaDestino);
    }
    /**
     * Genera un informe detallado del proceso de integración
     * @param procesoId ID del proceso
     * @returns Texto con informe detallado
     */
    generarInformeIntegracion(procesoId) {
        return this.gestorIntegracion.generarInformeDetallado(procesoId);
    }
    /**
     * Obtiene una negociación por su ID
     * @param negociacionId ID de la negociación
     * @returns La negociación o undefined si no existe
     */
    obtenerNegociacion(negociacionId) {
        return this.gestorNegociaciones.obtenerNegociacion(negociacionId);
    }
    /**
     * Obtiene todas las negociaciones
     * @param filtros Filtros opcionales
     * @returns Lista de negociaciones
     */
    obtenerNegociaciones(filtros) {
        return this.gestorNegociaciones.obtenerNegociaciones(filtros);
    }
    /**
     * Obtiene una oferta por su ID
     * @param ofertaId ID de la oferta
     * @returns La oferta o undefined si no existe
     */
    obtenerOferta(ofertaId) {
        return this.gestorNegociaciones.obtenerOferta(ofertaId);
    }
    /**
     * Obtiene un acuerdo por el ID de la negociación
     * @param negociacionId ID de la negociación
     * @returns El acuerdo o undefined si no existe
     */
    obtenerAcuerdo(negociacionId) {
        return this.gestorNegociaciones.obtenerAcuerdo(negociacionId);
    }
    /**
     * Obtiene un proceso de integración por su ID
     * @param procesoId ID del proceso
     * @returns El proceso o undefined si no existe
     */
    obtenerProcesoIntegracion(procesoId) {
        return this.gestorIntegracion.obtenerProceso(procesoId);
    }
    /**
     * Obtiene todos los procesos de integración
     * @param filtros Filtros opcionales
     * @returns Lista de procesos
     */
    obtenerProcesosIntegracion(filtros) {
        return this.gestorIntegracion.obtenerProcesos(filtros);
    }
    /**
     * Simula el comportamiento de NPCs en respuesta a ofertas
     * @param ofertaId ID de la oferta a evaluar
     * @returns Decisión simulada del NPC
     */
    simularRespuestaNPC(ofertaId) {
        // Obtener la evaluación de la oferta
        const evaluacion = this.evaluarOferta(ofertaId);
        // Simular decisión basada en probabilidad de aceptación
        const probabilidad = evaluacion.evaluacion.probabilidadAceptacion;
        const aleatorio = Math.random() * 100;
        if (aleatorio < probabilidad) {
            // Aceptar la oferta
            return {
                decision: 'aceptar',
                razon: 'La oferta cumple con nuestras expectativas y valoración.'
            };
        }
        else if (aleatorio < probabilidad + 30) {
            // Presentar contraoferta
            const precioOriginal = evaluacion.oferta.precioOfertado;
            const valorMedio = (evaluacion.valoracion.valorEstimadoMin + evaluacion.valoracion.valorEstimadoMax) / 2;
            // Calcular precio de contraoferta (10-30% más alto)
            const incremento = 1 + (Math.random() * 0.2 + 0.1);
            const precioContraoferta = Math.max(precioOriginal * incremento, valorMedio * 1.05);
            return {
                decision: 'contraoferta',
                razon: 'La oferta es interesante pero insuficiente. Proponemos términos mejorados.',
                contraoferta: {
                    precioSolicitado: Math.round(precioContraoferta),
                    porcentajeAdquisicion: evaluacion.oferta.porcentajeAdquisicion,
                    terminosFinanciacion: evaluacion.oferta.terminosFinanciacion,
                    condiciones: evaluacion.oferta.condiciones
                }
            };
        }
        else {
            // Rechazar la oferta
            return {
                decision: 'rechazar',
                razon: 'La oferta está muy por debajo de nuestras expectativas y valoración.'
            };
        }
    }
    /**
     * Integra los efectos de una fusión o adquisición en los sistemas económicos y de producción
     * @param procesoId ID del proceso de integración
     * @returns Resumen de los efectos aplicados
     */
    aplicarEfectosIntegracion(procesoId) {
        const proceso = this.obtenerProcesoIntegracion(procesoId);
        if (!proceso) {
            throw new Error(`Proceso de integración no encontrado: ${procesoId}`);
        }
        // Verificar que el proceso tenga progreso suficiente
        if (proceso.progreso < 25) {
            throw new Error(`El proceso de integración no tiene suficiente progreso para aplicar efectos: ${proceso.progreso}%`);
        }
        // Calcular efectos basados en el progreso y las sinergias
        const factorProgreso = proceso.progreso / 100;
        const sinergias = proceso.sinergiasRealizadas;
        // Efectos económicos
        const efectosEconomicos = [
            {
                tipo: 'reduccion_costos',
                valor: sinergias.reduccionCostos * factorProgreso,
                descripcion: `Reducción de costos del ${(sinergias.reduccionCostos * factorProgreso).toFixed(1)}% por sinergias de integración`
            },
            {
                tipo: 'aumento_ingresos',
                valor: sinergias.aumentoIngresos * factorProgreso,
                descripcion: `Aumento de ingresos del ${(sinergias.aumentoIngresos * factorProgreso).toFixed(1)}% por expansión de mercado`
            }
        ];
        // Efectos en producción
        const efectosProduccion = [
            {
                tipo: 'mejora_eficiencia',
                valor: sinergias.mejoraEficiencia * factorProgreso,
                descripcion: `Mejora de eficiencia del ${(sinergias.mejoraEficiencia * factorProgreso).toFixed(1)}% en instalaciones productivas`
            },
            {
                tipo: 'capacidad_adicional',
                valor: 20 * factorProgreso, // 20% máximo de capacidad adicional
                descripcion: `Aumento de capacidad productiva del ${(20 * factorProgreso).toFixed(1)}% por adquisición de instalaciones`
            }
        ];
        // Efectos en reputación
        const efectosReputacion = {
            tipo: 'cambio_reputacion',
            valor: proceso.estado === fusionesTypes_1.EstadoIntegracion.CON_PROBLEMAS ? -5 * factorProgreso : 5 * factorProgreso,
            descripcion: proceso.estado === fusionesTypes_1.EstadoIntegracion.CON_PROBLEMAS
                ? `Reducción de reputación del ${(5 * factorProgreso).toFixed(1)}% por problemas en la integración`
                : `Aumento de reputación del ${(5 * factorProgreso).toFixed(1)}% por integración exitosa`
        };
        return {
            efectosEconomicos,
            efectosProduccion,
            efectosReputacion
        };
    }
}
exports.SistemaFusionesAdquisiciones = SistemaFusionesAdquisiciones;
// Exportar la clase para us
(Content);
truncated;
due;
to;
size;
limit.Use;
line;
ranges;
to;
read in chunks;
