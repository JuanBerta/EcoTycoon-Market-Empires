"use strict";
// Integración del Sistema de Espionaje con el Sistema Económico
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegracionEspionajeEconomico = void 0;
/**
 * Clase que maneja la integración entre el sistema de espionaje y el sistema económico
 */
class IntegracionEspionajeEconomico {
    constructor(sistemaEspionaje, sistemaEconomico) {
        this.sistemaEspionaje = sistemaEspionaje;
        this.sistemaEconomico = sistemaEconomico;
    }
    /**
     * Aplica efectos económicos resultantes de operaciones de espionaje
     * @param efectos Lista de efectos a aplicar
     * @param objetivo Objetivo de los efectos (empresa, mercado, etc.)
     * @returns Número de efectos aplicados correctamente
     */
    aplicarEfectosEconomicos(efectos, objetivo) {
        let efectosAplicados = 0;
        efectos.forEach(efecto => {
            switch (efecto.tipo) {
                case 'precio_mercado':
                    this.modificarPrecioMercado(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'valor_acciones':
                    this.modificarValorAcciones(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'demanda':
                    this.modificarDemanda(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'tasa_interes':
                    this.modificarTasaInteres(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'impuestos':
                    this.modificarImpuestos(efecto.objetivo, Number(efecto.valor), efecto.duracion);
                    efectosAplicados++;
                    break;
                case 'dinero':
                    this.modificarDinero(efecto.objetivo, Number(efecto.valor));
                    efectosAplicados++;
                    break;
            }
        });
        return efectosAplicados;
    }
    /**
     * Calcula el costo total de operaciones de espionaje para un período
     * @param diasPeriodo Número de días en el período
     * @returns Costo total en el período
     */
    calcularCostoOperacionesEspionaje(diasPeriodo) {
        // Costo de agentes
        const costoAgentes = this.sistemaEspionaje.obtenerCostoMensualAgentes() * (diasPeriodo / 30);
        // Costo de misiones activas (estimado)
        const misionesActivas = this.sistemaEspionaje.obtenerMisionesActivas();
        const costoMisiones = misionesActivas.reduce((total, mision) => total + mision.costoOperacion, 0);
        // Costo de contraespionaje
        const departamento = this.sistemaEspionaje.obtenerDepartamentoContraespionaje();
        const costoContraespionaje = departamento ?
            departamento.presupuestoMensual * (diasPeriodo / 30) : 0;
        return costoAgentes + costoMisiones + costoContraespionaje;
    }
    /**
     * Calcula el retorno de inversión de operaciones de espionaje
     * @param diasPeriodo Número de días en el período
     * @returns Porcentaje de ROI
     */
    calcularROIEspionaje(diasPeriodo) {
        // Costo total
        const costoTotal = this.calcularCostoOperacionesEspionaje(diasPeriodo);
        // Beneficios estimados (simplificado)
        const misionesCompletadas = this.sistemaEspionaje.obtenerMisionesCompletadas()
            .filter(m => { var _a; return (_a = m.resultado) === null || _a === void 0 ? void 0 : _a.exito; });
        let beneficioEstimado = 0;
        misionesCompletadas.forEach(mision => {
            var _a, _b, _c;
            if ((_a = mision.resultado) === null || _a === void 0 ? void 0 : _a.impactoSabotaje) {
                // Beneficio por sabotaje (daño a competidor)
                beneficioEstimado += 50000; // Valor estimado simplificado
            }
            if ((_b = mision.resultado) === null || _b === void 0 ? void 0 : _b.tecnologiaRobadaId) {
                // Beneficio por tecnología robada
                beneficioEstimado += 200000; // Valor estimado simplificado
            }
            if ((_c = mision.resultado) === null || _c === void 0 ? void 0 : _c.informacionObtenida) {
                // Beneficio por información
                beneficioEstimado += 30000; // Valor estimado simplificado
            }
        });
        // Calcular ROI
        return costoTotal > 0 ? ((beneficioEstimado - costoTotal) / costoTotal) * 100 : 0;
    }
    // Métodos privados para aplicar efectos específicos
    modificarPrecioMercado(objetivo, porcentaje, duracion) {
        this.sistemaEconomico.modificarPrecioMercado(objetivo, porcentaje, duracion);
    }
    modificarValorAcciones(objetivo, porcentaje, duracion) {
        this.sistemaEconomico.modificarValorAcciones(objetivo, porcentaje, duracion);
    }
    modificarDemanda(objetivo, porcentaje, duracion) {
        this.sistemaEconomico.modificarDemanda(objetivo, porcentaje, duracion);
    }
    modificarTasaInteres(objetivo, porcentaje, duracion) {
        this.sistemaEconomico.modificarTasaInteres(objetivo, porcentaje, duracion);
    }
    modificarImpuestos(objetivo, porcentaje, duracion) {
        this.sistemaEconomico.modificarImpuestos(objetivo, porcentaje, duracion);
    }
    modificarDinero(objetivo, cantidad) {
        this.sistemaEconomico.modificarDinero(objetivo, cantidad);
    }
}
exports.IntegracionEspionajeEconomico = IntegracionEspionajeEconomico;
exports.default = IntegracionEspionajeEconomico;
