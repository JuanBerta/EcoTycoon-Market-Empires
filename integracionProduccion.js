"use strict";
// Integración del Sistema de Espionaje con el Sistema de Producción
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegracionEspionajeProduccion = void 0;
/**
 * Clase que maneja la integración entre el sistema de espionaje y el sistema de producción
 */
class IntegracionEspionajeProduccion {
    constructor(sistemaEspionaje, sistemaProduccion) {
        this.sistemaEspionaje = sistemaEspionaje;
        this.sistemaProduccion = sistemaProduccion;
    }
    /**
     * Aplica efectos de producción resultantes de operaciones de espionaje
     * @param efectos Lista de efectos a aplicar
     * @param objetivo Objetivo de los efectos (empresa, fábrica, etc.)
     * @returns Número de efectos aplicados correctamente
     */
    aplicarEfectosProduccion(efectos, objetivo) {
        let efectosAplicados = 0;
        efectos.forEach(efecto => {
            switch (efecto.tipo) {
                case 'eficiencia_produccion':
                    this.modificarEficienciaProduccion(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'calidad_producto':
                    this.modificarCalidadProducto(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'velocidad_produccion':
                    this.modificarVelocidadProduccion(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'costo_produccion':
                    this.modificarCostoProduccion(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'disponibilidad_materias':
                    this.modificarDisponibilidadMaterias(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
            }
        });
        return efectosAplicados;
    }
    /**
     * Aplica tecnologías robadas al sistema de producción
     * @param tecnologiaId ID de la tecnología robada
     * @param nivelImplementacion Nivel de implementación (0-100)
     * @returns true si se aplicó correctamente, false si no
     */
    aplicarTecnologiaRobada(tecnologiaId, nivelImplementacion) {
        try {
            // Verificar si la tecnología existe en el sistema
            const tecnologiaExiste = this.sistemaProduccion.verificarTecnologia(tecnologiaId);
            if (!tecnologiaExiste) {
                return false;
            }
            // Aplicar la tecnología con un nivel de implementación reducido
            // (ya que es robada y no desarrollada internamente)
            const nivelEfectivo = Math.min(100, Math.max(0, nivelImplementacion));
            this.sistemaProduccion.implementarTecnologia(tecnologiaId, nivelEfectivo, true // Marcar como adquirida externamente
            );
            return true;
        }
        catch (error) {
            console.error(`Error al aplicar tecnología robada: ${error}`);
            return false;
        }
    }
    /**
     * Evalúa el impacto de sabotaje en la producción de un competidor
     * @param empresaId ID de la empresa afectada
     * @returns Estimación del impacto económico del sabotaje
     */
    evaluarImpactoSabotaje(empresaId) {
        // Obtener datos de producción de la empresa
        const datosProduccion = this.sistemaProduccion.obtenerDatosProduccion(empresaId);
        if (!datosProduccion) {
            return 0;
        }
        // Calcular pérdidas por reducción de eficiencia
        const perdidaEficiencia = datosProduccion.produccionDiaria *
            (datosProduccion.modificadorEficiencia / 100) *
            datosProduccion.valorUnitario;
        // Calcular pérdidas por reducción de calidad
        const perdidaCalidad = datosProduccion.produccionDiaria *
            (datosProduccion.modificadorCalidad / 100) *
            datosProduccion.valorUnitario * 0.5;
        // Calcular pérdidas totales
        return perdidaEficiencia + perdidaCalidad;
    }
    /**
     * Obtiene información sobre la producción de un competidor
     * @param empresaId ID de la empresa objetivo
     * @returns Datos de producción o null si no están disponibles
     */
    obtenerInformacionProduccion(empresaId) {
        try {
            return this.sistemaProduccion.obtenerDatosProduccion(empresaId);
        }
        catch (error) {
            console.error(`Error al obtener información de producción: ${error}`);
            return null;
        }
    }
    // Métodos privados para aplicar efectos específicos
    modificarEficienciaProduccion(objetivo, porcentaje, duracion) {
        this.sistemaProduccion.modificarEficiencia(objetivo, porcentaje, duracion);
    }
    modificarCalidadProducto(objetivo, porcentaje, duracion) {
        this.sistemaProduccion.modificarCalidad(objetivo, porcentaje, duracion);
    }
    modificarVelocidadProduccion(objetivo, porcentaje, duracion) {
        this.sistemaProduccion.modificarVelocidad(objetivo, porcentaje, duracion);
    }
    modificarCostoProduccion(objetivo, porcentaje, duracion) {
        this.sistemaProduccion.modificarCostos(objetivo, porcentaje, duracion);
    }
    modificarDisponibilidadMaterias(objetivo, porcentaje, duracion) {
        this.sistemaProduccion.modificarDisponibilidadMaterias(objetivo, porcentaje, duracion);
    }
}
exports.IntegracionEspionajeProduccion = IntegracionEspionajeProduccion;
exports.default = IntegracionEspionajeProduccion;
