"use strict";
// Sistema de Espionaje Corporativo - Módulo Principal
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaEspionaje = void 0;
const espionageTypes_1 = require("./espionageTypes");
const gestorAgentes_1 = __importDefault(require("./gestorAgentes"));
const gestorMisiones_1 = __importDefault(require("./gestorMisiones"));
const sistemaContraespionaje_1 = __importDefault(require("./sistemaContraespionaje"));
/**
 * Clase principal que coordina todo el sistema de espionaje corporativo
 */
class SistemaEspionaje {
    constructor(sistemaEconomico, sistemaProduccion, sistemaNPCs, sistemaNotificaciones) {
        // Día actual del juego (se actualiza desde fuera)
        this.diaActual = 0;
        // Inicializar componentes
        this.gestorAgentes = new gestorAgentes_1.default();
        this.gestorMisiones = new gestorMisiones_1.default(sistemaEconomico, sistemaProduccion, sistemaNPCs, sistemaNotificaciones);
        this.sistemaContraespionaje = new sistemaContraespionaje_1.default(sistemaNotificaciones);
    }
    /**
     * Actualiza el sistema de espionaje (llamar cada día de juego)
     * @param diaActual Día actual del juego
     */
    actualizar(diaActual) {
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
    generarAgentesDisponibles(cantidad, nivelJugador) {
        return this.gestorAgentes.generarAgentesDisponibles(cantidad, nivelJugador);
    }
    /**
     * Contrata a un agente de la lista de disponibles
     * @param agenteId ID del agente a contratar
     * @returns El agente contratado o null si no se pudo contratar
     */
    contratarAgente(agenteId) {
        return this.gestorAgentes.contratarAgente(agenteId);
    }
    /**
     * Despide a un agente contratado
     * @param agenteId ID del agente a despedir
     * @returns true si se despidió correctamente, false si no
     */
    despedirAgente(agenteId) {
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
    crearMision(tipo, objetivoEmpresaId, objetivoEspecifico, agenteAsignadoId) {
        // Verificar que el agente está disponible
        const agente = this.gestorAgentes.obtenerAgente(agenteAsignadoId);
        if (!agente || agente.estado !== espionageTypes_1.EstadoAgente.DISPONIBLE) {
            return null;
        }
        // Crear la misión
        const mision = this.gestorMisiones.crearMision(tipo, objetivoEmpresaId, objetivoEspecifico, agenteAsignadoId, this.diaActual);
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
    iniciarMision(misionId) {
        return this.gestorMisiones.iniciarMision(misionId);
    }
    /**
     * Resuelve una misión activa (normalmente no se llama directamente)
     * @param misionId ID de la misión a resolver
     * @returns El resultado de la misión o null si no se pudo resolver
     */
    resolverMision(misionId) {
        var _a;
        const resultado = this.gestorMisiones.resolverMision(misionId, this.diaActual);
        if (resultado && resultado.consecuenciasAgente) {
            // Actualizar estado del agente según resultado
            this.gestorAgentes.procesarResultadoMision(((_a = this.gestorMisiones.obtenerMision(misionId)) === null || _a === void 0 ? void 0 : _a.agenteAsignadoId) || "", resultado);
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
    configurarContraespionaje(nivelSeguridad, presupuesto, personal, tecnologias) {
        return this.sistemaContraespionaje.configurarDepartamento('jugador', // ID fijo para el jugador
        nivelSeguridad, presupuesto, personal, tecnologias);
    }
    /**
     * Obtiene todos los agentes contratados
     */
    obtenerAgentes() {
        return this.gestorAgentes.obtenerAgentes();
    }
    /**
     * Obtiene los agentes disponibles para contratar
     */
    obtenerAgentesDisponiblesParaContratar() {
        return this.gestorAgentes.obtenerAgentesDisponiblesParaContratar();
    }
    /**
     * Obtiene los agentes disponibles para asignar a misiones
     */
    obtenerAgentesDisponiblesParaMisiones() {
        return this.gestorAgentes.obtenerAgentesDisponiblesParaMisiones();
    }
    /**
     * Obtiene todas las misiones activas
     */
    obtenerMisionesActivas() {
        return this.gestorMisiones.obtenerMisionesActivas();
    }
    /**
     * Obtiene todas las misiones planificadas
     */
    obtenerMisionesPlanificadas() {
        return this.gestorMisiones.obtenerMisionesPlanificadas();
    }
    /**
     * Obtiene todas las misiones completadas
     */
    obtenerMisionesCompletadas() {
        return this.gestorMisiones.obtenerMisionesCompletadas();
    }
    /**
     * Obtiene el departamento de contraespionaje del jugador
     */
    obtenerDepartamentoContraespionaje() {
        return this.sistemaContraespionaje.obtenerDepartamento('jugador');
    }
    /**
     * Obtiene el historial de incidentes de espionaje contra el jugador
     */
    obtenerHistorialIncidentes() {
        return this.sistemaContraespionaje.obtenerHistorialIncidentes('jugador');
    }
    /**
     * Establece el presupuesto mensual para agentes
     */
    establecerPresupuestoAgentes(presupuesto) {
        this.gestorAgentes.establecerPresupuestoMensual(presupuesto);
    }
    /**
     * Obtiene el costo mensual total de todos los agentes
     */
    obtenerCostoMensualAgentes() {
        return this.gestorAgentes.obtenerCostoMensualTotal();
    }
}
exports.SistemaEspionaje = SistemaEspionaje;
exports.default = SistemaEspionaje;
