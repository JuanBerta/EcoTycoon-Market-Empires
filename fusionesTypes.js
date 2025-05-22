"use strict";
// Sistema de Fusiones y Adquisiciones - Tipos y Enumeraciones
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstrategiaIntegracion = exports.MetodoValoracion = exports.MetodoFinanciacion = exports.EstadoTransaccion = exports.TipoTransaccionCorporativa = void 0;
/**
 * Enumeración para los tipos de transacciones corporativas
 */
var TipoTransaccionCorporativa;
(function (TipoTransaccionCorporativa) {
    TipoTransaccionCorporativa["ADQUISICION_COMPLETA"] = "adquisicion_completa";
    TipoTransaccionCorporativa["FUSION"] = "fusion";
    TipoTransaccionCorporativa["COMPRA_PARTICIPACION"] = "compra_participacion";
    TipoTransaccionCorporativa["VENTA_DIVISION"] = "venta_division";
    TipoTransaccionCorporativa["JOINT_VENTURE"] = "joint_venture";
})(TipoTransaccionCorporativa || (exports.TipoTransaccionCorporativa = TipoTransaccionCorporativa = {}));
/**
 * Enumeración para los estados de una transacción
 */
var EstadoTransaccion;
(function (EstadoTransaccion) {
    EstadoTransaccion["PROPUESTA"] = "propuesta";
    EstadoTransaccion["NEGOCIACION"] = "negociacion";
    EstadoTransaccion["DILIGENCIA"] = "diligencia";
    EstadoTransaccion["ACUERDO"] = "acuerdo";
    EstadoTransaccion["APROBACION_REGULATORIA"] = "aprobacion_regulatoria";
    EstadoTransaccion["CIERRE"] = "cierre";
    EstadoTransaccion["INTEGRACION"] = "integracion";
    EstadoTransaccion["COMPLETADA"] = "completada";
    EstadoTransaccion["CANCELADA"] = "cancelada";
    EstadoTransaccion["RECHAZADA"] = "rechazada";
})(EstadoTransaccion || (exports.EstadoTransaccion = EstadoTransaccion = {}));
/**
 * Enumeración para los métodos de financiación
 */
var MetodoFinanciacion;
(function (MetodoFinanciacion) {
    MetodoFinanciacion["EFECTIVO"] = "efectivo";
    MetodoFinanciacion["ACCIONES"] = "acciones";
    MetodoFinanciacion["DEUDA"] = "deuda";
    MetodoFinanciacion["MIXTO"] = "mixto";
})(MetodoFinanciacion || (exports.MetodoFinanciacion = MetodoFinanciacion = {}));
/**
 * Enumeración para los métodos de valoración
 */
var MetodoValoracion;
(function (MetodoValoracion) {
    MetodoValoracion["MULTIPLO_EBITDA"] = "multiplo_ebitda";
    MetodoValoracion["FLUJO_CAJA_DESCONTADO"] = "flujo_caja_descontado";
    MetodoValoracion["VALOR_ACTIVOS"] = "valor_activos";
    MetodoValoracion["VALOR_MERCADO"] = "valor_mercado";
})(MetodoValoracion || (exports.MetodoValoracion = MetodoValoracion = {}));
/**
 * Enumeración para las estrategias de integración post-fusión
 */
var EstrategiaIntegracion;
(function (EstrategiaIntegracion) {
    EstrategiaIntegracion["ABSORCION"] = "absorcion";
    EstrategiaIntegracion["PRESERVACION"] = "preservacion";
    EstrategiaIntegracion["SIMBIOSIS"] = "simbiosis";
    EstrategiaIntegracion["HOLDING"] = "holding";
})(EstrategiaIntegracion || (exports.EstrategiaIntegracion = EstrategiaIntegracion = {}));
exports.default = {
    TipoTransaccionCorporativa,
    EstadoTransaccion,
    MetodoFinanciacion,
    MetodoValoracion,
    EstrategiaIntegracion
};
