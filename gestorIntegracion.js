"use strict";
/**
 * Sistema de Fusiones y Adquisiciones - Gestor de Integración
 *
 * Este módulo implementa la lógica para gestionar el proceso de integración
 * post-fusión o adquisición entre empresas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorIntegracion = void 0;
const fusionesTypes_1 = require("./fusionesTypes");
/**
 * Clase que gestiona los procesos de integración post-fusión/adquisición
 */
class GestorIntegracion {
    constructor() {
        this.procesos = new Map();
        // Inicialización
    }
    /**
     * Inicia un nuevo proceso de integración tras un acuerdo
     * @param negociacion Negociación completada
     * @param acuerdo Acuerdo final
     * @returns El proceso de integración creado
     */
    iniciarProcesoIntegracion(negociacion, acuerdo) {
        if (!negociacion.acuerdoFinal) {
            throw new Error(`La negociación ${negociacion.id} no tiene un acuerdo final`);
        }
        // Generar ID único para el proceso
        const id = `integracion_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const fechaActual = Date.now();
        // Calcular duración estimada basada en complejidad
        const duracionEstimada = this.calcularDuracionEstimada(acuerdo);
        // Crear etapas de integración
        const etapasIntegracion = this.generarEtapasIntegracion(negociacion, acuerdo);
        // Crear el proceso de integración
        const proceso = {
            id,
            negociacionId: negociacion.id,
            acuerdoId: negociacion.id, // Usamos el mismo ID que la negociación para el acuerdo
            empresaAdquiridaId: negociacion.tipoOperacion === 'fusion' ? undefined : negociacion.empresaObjetivoId,
            empresaFusionadaId: negociacion.tipoOperacion === 'fusion' ? `fusion_${negociacion.empresaIniciadoraId}_${negociacion.empresaObjetivoId}` : undefined,
            fechaInicio: fechaActual,
            duracionEstimada,
            progreso: 0,
            inversionIntegracion: this.calcularInversionInicial(acuerdo),
            costoAcumulado: 0,
            estado: fusionesTypes_1.EstadoIntegracion.EN_PROGRESO,
            etapasIntegracion,
            metricasClave: this.inicializarMetricas(negociacion, acuerdo),
            sinergiasRealizadas: {
                reduccionCostos: 0,
                aumentoIngresos: 0,
                mejoraEficiencia: 0,
                valorRealizado: 0
            },
            informesProgreso: [{
                    fecha: fechaActual,
                    resumen: "Proceso de integración iniciado",
                    logros: ["Plan de integración establecido"],
                    problemas: []
                }]
        };
        // Almacenar el proceso
        this.procesos.set(id, proceso);
        return proceso;
    }
    /**
     * Calcula la duración estimada del proceso de integración
     * @param acuerdo Acuerdo final
     * @returns Duración estimada en días
     */
    calcularDuracionEstimada(acuerdo) {
        // Base: 30 días
        let duracion = 30;
        // Ajustar según desafíos de integración
        const desafiosTotales = acuerdo.desafiosIntegracion.reduce((total, desafio) => total + desafio.severidad, 0);
        // Cada punto de severidad añade 5 días
        duracion += desafiosTotales * 5;
        // Ajustar según tamaño de la operación
        if (acuerdo.precioFinal > 10000000) {
            duracion += 30; // +30 días para operaciones grandes
        }
        else if (acuerdo.precioFinal > 5000000) {
            duracion += 15; // +15 días para operaciones medianas
        }
        return duracion;
    }
    /**
     * Calcula la inversión inicial necesaria para el proceso de integración
     * @param acuerdo Acuerdo final
     * @returns Monto de inversión inicial
     */
    calcularInversionInicial(acuerdo) {
        // Base: 5% del precio de la operación
        let inversion = acuerdo.precioFinal * 0.05;
        // Ajustar según desafíos de integración
        const desafiosTotales = acuerdo.desafiosIntegracion.reduce((total, desafio) => total + desafio.severidad, 0);
        // Cada punto de severidad añade 0.5% adicional
        inversion += acuerdo.precioFinal * (desafiosTotales * 0.005);
        // Ajustar según sinergias esperadas (mayor potencial = mayor inversión)
        inversion += acuerdo.sinergiasEstimadas.valorTotal * 0.1;
        return Math.round(inversion);
    }
    /**
     * Genera las etapas del proceso de integración
     * @param negociacion Negociación completada
     * @param acuerdo Acuerdo final
     * @returns Lista de etapas de integración
     */
    generarEtapasIntegracion(negociacion, acuerdo) {
        const etapas = [
            {
                nombre: "planificacion_detallada",
                progreso: 0,
                problemas: []
            },
            {
                nombre: "comunicacion_stakeholders",
                progreso: 0,
                problemas: []
            },
            {
                nombre: "integracion_equipos_directivos",
                progreso: 0,
                problemas: []
            }
        ];
        // Añadir etapas según tipo de operación
        if (negociacion.tipoOperacion === 'fusion') {
            etapas.push({
                nombre: "fusion_legal_entidades",
                progreso: 0,
                problemas: []
            }, {
                nombre: "unificacion_marca",
                progreso: 0,
                problemas: []
            });
        }
        // Etapas comunes para todas las operaciones
        etapas.push({
            nombre: "integracion_sistemas",
            progreso: 0,
            problemas: []
        }, {
            nombre: "optimizacion_procesos",
            progreso: 0,
            problemas: []
        }, {
            nombre: "consolidacion_instalaciones",
            progreso: 0,
            problemas: []
        }, {
            nombre: "armonizacion_culturas",
            progreso: 0,
            problemas: []
        }, {
            nombre: "evaluacion_final",
            progreso: 0,
            problemas: []
        });
        return etapas;
    }
    /**
     * Inicializa las métricas clave para el seguimiento del proceso
     * @param negociacion Negociación completada
     * @param acuerdo Acuerdo final
     * @returns Objeto con métricas iniciales
     */
    inicializarMetricas(negociacion, acuerdo) {
        return {
            moral_empleados: 70, // Comienza en 70%
            retencion_clientes: 95, // Comienza en 95%
            retencion_talento: 90, // Comienza en 90%
            eficiencia_operativa: 80, // Comienza en 80%
            satisfaccion_accionistas: 85, // Comienza en 85%
            integracion_sistemas: 0, // Comienza en 0%
            integracion_procesos: 0, // Comienza en 0%
            realizacion_sinergias: 0 // Comienza en 0%
        };
    }
    /**
     * Actualiza el progreso de un proceso de integración
     * @param procesoId ID del proceso de integración
     * @param diasTranscurridos Días transcurridos desde la última actualización
     * @returns El proceso actualizado
     */
    actualizarProgreso(procesoId, diasTranscurridos = 1) {
        // Obtener el proceso
        const proceso = this.obtenerProceso(procesoId);
        if (!proceso) {
            throw new Error(`Proceso de integración no encontrado: ${procesoId}`);
        }
        // Si ya está completado o con problemas, no actualizar
        if (proceso.estado === fusionesTypes_1.EstadoIntegracion.COMPLETADA ||
            proceso.estado === fusionesTypes_1.EstadoIntegracion.FALLIDA) {
            return proceso;
        }
        const fechaActual = Date.now();
        // Calcular progreso base según tiempo transcurrido
        const progresoBase = (diasTranscurridos / proceso.duracionEstimada) * 100;
        // Ajustar según inversión (más inversión = progreso más rápido)
        const factorInversion = proceso.inversionIntegracion / (proceso.inversionIntegracion * 0.05);
        const progresoAjustado = progresoBase * Math.min(1.5, Math.max(0.5, factorInversion));
        // Actualizar progreso general
        proceso.progreso = Math.min(100, proceso.progreso + progresoAjustado);
        // Actualizar costo acumulado
        const costoIncremental = (proceso.inversionIntegracion / proceso.duracionEstimada) * diasTranscurridos;
        proceso.costoAcumulado += costoIncremental;
        // Actualizar etapas de integración
        this.actualizarEtapas(proceso, progresoAjustado);
        // Actualizar métricas clave
        this.actualizarMetricas(proceso, diasTranscurridos);
        // Actualizar sinergias realizadas
        this.actualizarSinergias(proceso);
        // Generar informe de progreso si es necesario
        if (Math.floor(proceso.progreso / 10) > Math.floor((proceso.progreso - progresoAjustado) / 10)) {
            // Cada 10% de progreso, generar un informe
            this.generarInformeProgreso(proceso);
        }
        // Verificar si el proceso está completado
        if (proceso.progreso >= 100) {
            proceso.estado = fusionesTypes_1.EstadoIntegracion.COMPLETADA;
            proceso.duracionReal = Math.ceil((fechaActual - proceso.fechaInicio) / (24 * 60 * 60 * 1000)); // Convertir a días
            // Informe final
            proceso.informesProgreso.push({
                fecha: fechaActual,
                resumen: "Proceso de integración completado",
                logros: [
                    `Duración total: ${proceso.duracionReal} días`,
                    `Costo total: ${proceso.costoAcumulado.toLocaleString()} créditos`,
                    `Sinergias realizadas: ${proceso.sinergiasRealizadas.valorRealizado.toLocaleString()} créditos`
                ],
                problemas: []
            });
        }
        // Guardar el proceso actualizado
        this.procesos.set(procesoId, proceso);
        return proceso;
    }
    /**
     * Actualiza el progreso de las etapas de integración
     * @param proceso Proceso de integración
     * @param progresoAjustado Progreso ajustado a aplicar
     */
    actualizarEtapas(proceso, progresoAjustado) {
        // Determinar qué etapas actualizar según el progreso general
        const etapasActivas = [];
        if (proceso.progreso < 20) {
            // Fase inicial: planificación y comunicación
            etapasActivas.push("planificacion_detallada", "comunicacion_stakeholders");
        }
        else if (proceso.progreso < 40) {
            // Fase temprana: equipos directivos y aspectos legales
            etapasActivas.push("integracion_equipos_directivos", "fusion_legal_entidades", "unificacion_marca");
        }
        else if (proceso.progreso < 70) {
            // Fase media: sistemas y procesos
            etapasActivas.push("integracion_sistemas", "optimizacion_procesos");
        }
        else if (proceso.progreso < 90) {
            // Fase tardía: instalaciones y cultura
            etapasActivas.push("consolidacion_instalaciones", "armonizacion_culturas");
        }
        else {
            // Fase final: evaluación
            etapasActivas.push("evaluacion_final");
        }
        // Actualizar progreso de etapas activas
        for (let i = 0; i < proceso.etapasIntegracion.length; i++) {
            const etapa = proceso.etapasIntegracion[i];
            if (etapasActivas.includes(etapa.nombre)) {
                // Distribuir el progreso entre las etapas activas
                const progresoEtapa = progresoAjustado * (2 / etapasActivas.length);
                etapa.progreso = Math.min(100, etapa.progreso + progresoEtapa);
                // Posibilidad de problemas aleatorios
                if (Math.random() < 0.05 && etapa.progreso < 90) { // 5% de probabilidad
                    const problemasPosibles = this.getProblemasPosiblesPorEtapa(etapa.nombre);
                    const problema = problemasPosibles[Math.floor(Math.random() * problemasPosibles.length)];
                    if (!etapa.problemas.includes(problema)) {
                        etapa.problemas.push(problema);
                        // Reducir progreso por problema
                        etapa.progreso = Math.max(etapa.progreso - 5, 0);
                    }
                }
            }
            else if (etapa.progreso < 100) {
                // Etapas no activas avanzan más lentamente
                etapa.progreso = Math.min(100, etapa.progreso + (progresoAjustado * 0.2));
            }
        }
    }
    /**
     * Obtiene problemas posibles según la etapa de integración
     * @param nombreEtapa Nombre de la etapa
     * @returns Lista de problemas posibles
     */
    getProblemasPosiblesPorEtapa(nombreEtapa) {
        const problemasPorEtapa = {
            "planificacion_detallada": [
                "Falta de información detallada",
                "Objetivos poco claros",
                "Recursos insuficientes asignados"
            ],
            "comunicacion_stakeholders": [
                "Resistencia de empleados clave",
                "Preocupación de clientes importantes",
                "Rumores negativos en medios"
            ],
            "integracion_equipos_directivos": [
                "Conflictos de liderazgo",
                "Diferencias en estilos de gestión",
                "Renuncias de directivos clave"
            ],
            "fusion_legal_entidades": [
                "Complicaciones regulatorias",
                "Problemas con contratos existentes",
                "Retrasos en aprobaciones oficiales"
            ],
            "unificacion_marca": [
                "Resistencia a cambios de marca",
                "Confusión en el mercado",
                "Pérdida de valor de marca"
            ],
            "integracion_sistemas": [
                "Incompatibilidades técnicas",
                "Pérdida de datos",
                "Interrupciones de servicio"
            ],
            "optimizacion_procesos": [
                "Duplicación de funciones",
                "Ineficiencias en nuevos procesos",
                "Resistencia al cambio operativo"
            ],
            "consolidacion_instalaciones": [
                "Costos de reubicación mayores a lo esperado",
                "Problemas logísticos",
                "Pérdida de productividad temporal"
            ],
            "armonizacion_culturas": [
                "Choque cultural significativo",
                "Alta rotación de personal",
                "Baja moral de empleados"
            ],
            "evaluacion_final": [
                "Sinergias por debajo de lo esperado",
                "Costos superiores a lo presupuestado",
                "Objetivos de integración no alcanzados"
            ]
        };
        return problemasPorEtapa[nombreEtapa] || [
            "Problema inesperado en la integración",
            "Retrasos en el cronograma",
            "Costos adicionales no previstos"
        ];
    }
    /**
     * Actualiza las métricas clave del proceso de integración
     * @param proceso Proceso de integración
     * @param diasTranscurridos Días transcurridos
     */
    actualizarMetricas(proceso, diasTranscurridos) {
        // Factores que afectan las métricas
        const factorProblemas = 1 - (this.contarProblemasActivos(proceso) * 0.05);
        const factorProgreso = proceso.progreso / 100;
        const factorInversion = Math.min(1.2, Math.max(0.8, proceso.inversionIntegracion / (proceso.inversionIntegracion * 0.05)));
        // Actualizar cada métrica
        const metricas = proceso.metricasClave;
        // Moral de empleados: tiende a bajar al inicio y recuperarse con el tiempo
        if (proceso.progreso < 30) {
            metricas.moral_empleados = Math.max(50, metricas.moral_empleados - (1 * diasTranscurridos * factorProblemas));
        }
        else {
            metricas.moral_empleados = Math.min(95, metricas.moral_empleados + (0.5 * diasTranscurridos * factorProblemas * factorInversion));
        }
        // Retención de clientes: puede verse afectada por la integración
        metricas.retencion_clientes = Math.max(70, metricas.retencion_clientes - (0.2 * diasTranscurridos * (1 - factorProblemas)));
        // Retención de talento: crítica durante la integración
        metricas.retencion_talento = Math.max(60, metricas.retencion_talento - (0.3 * diasTranscurridos * (1 - factorProblemas * factorInversion)));
        // Eficiencia operativa: mejora con el progreso
        metricas.eficiencia_operativa = Math.min(100, 80 + (20 * factorProgreso * factorProblemas));
        // Satisfacción de accionistas: depende del progreso y problemas
        metricas.satisfaccion_accionistas = Math.min(100, 85 + (15 * factorProgreso * factorProblemas));
        // Integración de sistemas: avanza con el progreso
        metricas.integracion_sistemas = Math.min(100, factorProgreso * 100 * factorProblemas);
        // Integración de pr
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
    }
}
exports.GestorIntegracion = GestorIntegracion;
