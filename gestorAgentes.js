"use strict";
// Sistema de Espionaje Corporativo - Gestor de Agentes
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorAgentes = void 0;
const espionageTypes_1 = require("./espionageTypes");
/**
 * Clase que gestiona el reclutamiento, mantenimiento y asignación de agentes de espionaje
 */
class GestorAgentes {
    constructor() {
        this.agentes = new Map();
        this.agentesDisponibles = [];
        this.ultimoIdAgente = 0;
        this.presupuestoMensual = 0;
        this.costoMensualTotal = 0;
        // Inicializar con algunos agentes básicos si es necesario
    }
    /**
     * Genera un conjunto de agentes disponibles para reclutar
     * @param cantidad Número de agentes a generar
     * @param nivelJugador Nivel del jugador (afecta calidad de agentes)
     * @returns Lista de agentes disponibles para contratación
     */
    generarAgentesDisponibles(cantidad, nivelJugador) {
        this.agentesDisponibles = [];
        for (let i = 0; i < cantidad; i++) {
            const agente = this.generarAgenteAleatorio(nivelJugador);
            this.agentesDisponibles.push(agente);
        }
        return this.agentesDisponibles;
    }
    /**
     * Genera un agente con atributos aleatorios basados en el nivel del jugador
     */
    generarAgenteAleatorio(nivelJugador) {
        // Determinar especialidad aleatoriamente
        const especialidades = Object.values(espionageTypes_1.EspecialidadAgente);
        const especialidad = especialidades[Math.floor(Math.random() * especialidades.length)];
        // Calcular nivel de habilidad (influenciado por nivel del jugador)
        const nivelBase = Math.max(1, Math.min(5, Math.floor(nivelJugador / 5)));
        const variacion = Math.floor(Math.random() * 3) - 1; // -1, 0, o +1
        const nivelHabilidad = Math.max(1, Math.min(5, nivelBase + variacion));
        // Calcular lealtad (1-5)
        const lealtad = Math.max(1, Math.min(5, Math.floor(Math.random() * 5) + 1));
        // Calcular costo basado en habilidad y especialidad
        const costoBase = 5000 * nivelHabilidad;
        const multiplicadorEspecialidad = especialidad === espionageTypes_1.EspecialidadAgente.GENERALISTA ? 0.8 : 1.2;
        const costoMensual = Math.floor(costoBase * multiplicadorEspecialidad);
        // Generar nombre aleatorio
        const nombres = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
        const nombre = `Agente ${nombres[Math.floor(Math.random() * nombres.length)]}`;
        return {
            id: `agent_${++this.ultimoIdAgente}`,
            nombre,
            especialidad,
            nivelHabilidad,
            lealtad,
            costoMensual,
            experiencia: 0,
            notoriedad: Math.floor(Math.random() * 20), // 0-20 inicial
            estado: espionageTypes_1.EstadoAgente.DISPONIBLE
        };
    }
    /**
     * Contrata a un agente de la lista de disponibles
     * @param agenteId ID del agente a contratar
     * @returns El agente contratado o null si no se pudo contratar
     */
    contratarAgente(agenteId) {
        const agente = this.agentesDisponibles.find(a => a.id === agenteId);
        if (!agente) {
            return null;
        }
        // Añadir a la lista de agentes contratados
        this.agentes.set(agente.id, agente);
        // Actualizar costo mensual total
        this.costoMensualTotal += agente.costoMensual;
        // Eliminar de la lista de disponibles
        this.agentesDisponibles = this.agentesDisponibles.filter(a => a.id !== agenteId);
        return agente;
    }
    /**
     * Despide a un agente contratado
     * @param agenteId ID del agente a despedir
     * @returns true si se despidió correctamente, false si no
     */
    despedirAgente(agenteId) {
        const agente = this.agentes.get(agenteId);
        if (!agente) {
            return false;
        }
        // No se puede despedir a un agente en misión
        if (agente.estado === espionageTypes_1.EstadoAgente.EN_MISION) {
            return false;
        }
        // Actualizar costo mensual total
        this.costoMensualTotal -= agente.costoMensual;
        // Eliminar de la lista de agentes
        this.agentes.delete(agenteId);
        return true;
    }
    /**
     * Asigna un agente a una misión
     * @param agenteId ID del agente a asignar
     * @param misionId ID de la misión
     * @returns true si se asignó correctamente, false si no
     */
    asignarAgenteAMision(agenteId, misionId) {
        const agente = this.agentes.get(agenteId);
        if (!agente || agente.estado !== espionageTypes_1.EstadoAgente.DISPONIBLE) {
            return false;
        }
        // Actualizar estado del agente
        agente.estado = espionageTypes_1.EstadoAgente.EN_MISION;
        agente.misionActualId = misionId;
        // Actualizar en la colección
        this.agentes.set(agenteId, agente);
        return true;
    }
    /**
     * Procesa el resultado de una misión para un agente
     * @param agenteId ID del agente
     * @param resultado Resultado de la misión
     * @returns El agente actualizado o null si no existe
     */
    procesarResultadoMision(agenteId, resultado) {
        const agente = this.agentes.get(agenteId);
        if (!agente || agente.estado !== espionageTypes_1.EstadoAgente.EN_MISION) {
            return null;
        }
        // Actualizar estado según resultado
        agente.estado = resultado.consecuenciasAgente.nuevoEstado;
        // Actualizar experiencia si corresponde
        if (resultado.consecuenciasAgente.cambioExperiencia) {
            agente.experiencia += resultado.consecuenciasAgente.cambioExperiencia;
        }
        // Actualizar notoriedad si corresponde
        if (resultado.consecuenciasAgente.cambioNotoriedad) {
            agente.notoriedad = Math.max(0, Math.min(100, agente.notoriedad + resultado.consecuenciasAgente.cambioNotoriedad));
        }
        // Establecer tiempo de recuperación si corresponde
        if (resultado.consecuenciasAgente.tiempoRecuperacion &&
            agente.estado === espionageTypes_1.EstadoAgente.RECUPERANDOSE) {
            agente.tiempoRecuperacionRestante = resultado.consecuenciasAgente.tiempoRecuperacion;
        }
        // Limpiar referencia a misión
        agente.misionActualId = undefined;
        // Actualizar en la colección
        this.agentes.set(agenteId, agente);
        return agente;
    }
    /**
     * Actualiza el estado de todos los agentes (llamar cada día de juego)
     * @returns Número de agentes actualizados
     */
    actualizarAgentes() {
        let actualizados = 0;
        this.agentes.forEach((agente, id) => {
            // Procesar agentes en recuperación
            if (agente.estado === espionageTypes_1.EstadoAgente.RECUPERANDOSE && agente.tiempoRecuperacionRestante) {
                agente.tiempoRecuperacionRestante--;
                // Si terminó el tiempo de recuperación, volver a disponible
                if (agente.tiempoRecuperacionRestante <= 0) {
                    agente.estado = espionageTypes_1.EstadoAgente.DISPONIBLE;
                    agente.tiempoRecuperacionRestante = undefined;
                }
                this.agentes.set(id, agente);
                actualizados++;
            }
        });
        return actualizados;
    }
    /**
     * Obtiene todos los agentes contratados
     */
    obtenerAgentes() {
        return Array.from(this.agentes.values());
    }
    /**
     * Obtiene un agente específico por ID
     */
    obtenerAgente(agenteId) {
        return this.agentes.get(agenteId);
    }
    /**
     * Obtiene los agentes disponibles para contratar
     */
    obtenerAgentesDisponiblesParaContratar() {
        return this.agentesDisponibles;
    }
    /**
     * Obtiene los agentes disponibles para asignar a misiones
     */
    obtenerAgentesDisponiblesParaMisiones() {
        return Array.from(this.agentes.values())
            .filter(agente => agente.estado === espionageTypes_1.EstadoAgente.DISPONIBLE);
    }
    /**
     * Establece el presupuesto mensual para agentes
     */
    establecerPresupuestoMensual(presupuesto) {
        this.presupuestoMensual = presupuesto;
    }
    /**
     * Obtiene el costo mensual total de todos los agentes
     */
    obtenerCostoMensualTotal() {
        return this.costoMensualTotal;
    }
    /**
     * Verifica si el presupuesto es suficiente para los agentes actuales
     */
    esPresupuestoSuficiente() {
        return this.presupuestoMensual >= this.costoMensualTotal;
    }
}
exports.GestorAgentes = GestorAgentes;
exports.default = GestorAgentes;
