"use strict";
// Sistema de Espionaje Corporativo - Tipos y Estructuras Base
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoAgente = exports.EspecialidadAgente = exports.EstadoMision = exports.TipoMisionEspionaje = void 0;
// --- Enumeraciones ---
/** Tipos de misiones de espionaje disponibles */
var TipoMisionEspionaje;
(function (TipoMisionEspionaje) {
    TipoMisionEspionaje["RECOPILACION_INFO"] = "recopilacion_info";
    TipoMisionEspionaje["ROBO_TECNOLOGIA"] = "robo_tecnologia";
    TipoMisionEspionaje["SABOTAJE"] = "sabotaje";
    TipoMisionEspionaje["MANIPULACION_MERCADO"] = "manipulacion_mercado"; // Influir en el mercado
})(TipoMisionEspionaje || (exports.TipoMisionEspionaje = TipoMisionEspionaje = {}));
/** Estados posibles de una misión de espionaje */
var EstadoMision;
(function (EstadoMision) {
    EstadoMision["PLANIFICANDO"] = "planificando";
    EstadoMision["EN_PROGRESO"] = "en_progreso";
    EstadoMision["COMPLETADA"] = "completada";
    EstadoMision["FALLIDA"] = "fallida";
    EstadoMision["DESCUBIERTA"] = "descubierta"; // Misión detectada por el objetivo
})(EstadoMision || (exports.EstadoMision = EstadoMision = {}));
/** Especialidades de los agentes de espionaje */
var EspecialidadAgente;
(function (EspecialidadAgente) {
    EspecialidadAgente["INFORMACION"] = "informacion";
    EspecialidadAgente["TECNOLOGIA"] = "tecnologia";
    EspecialidadAgente["SABOTAJE"] = "sabotaje";
    EspecialidadAgente["MANIPULACION"] = "manipulacion";
    EspecialidadAgente["GENERALISTA"] = "generalista"; // Habilidades equilibradas
})(EspecialidadAgente || (exports.EspecialidadAgente = EspecialidadAgente = {}));
/** Estados posibles de un agente de espionaje */
var EstadoAgente;
(function (EstadoAgente) {
    EstadoAgente["DISPONIBLE"] = "disponible";
    EstadoAgente["EN_MISION"] = "en_mision";
    EstadoAgente["RECUPERANDOSE"] = "recuperandose";
    EstadoAgente["CAPTURADO"] = "capturado";
    EstadoAgente["RETIRADO"] = "retirado"; // Ya no forma parte de la agencia
})(EstadoAgente || (exports.EstadoAgente = EstadoAgente = {}));
// Exportar tipos para uso en otros módulos
exports.default = {
    TipoMisionEspionaje,
    EstadoMision,
    EspecialidadAgente,
    EstadoAgente,
    AgenteEspionaje,
    MisionEspionaje,
    ResultadoMision,
    Efecto,
    Consecuencia,
    DepartamentoContraespionaje
};
