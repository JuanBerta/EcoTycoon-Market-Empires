"use strict";
/**
 * Sistema de Competencia Estratégica - Tipos y Estructuras Base
 *
 * Este archivo define las enumeraciones, interfaces y tipos necesarios para
 * el sistema de competencia estratégica en EcoTycoon: Market Empires.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRespuestaCompetitiva = exports.EstadoEstrategia = exports.IntensidadEstrategia = exports.TipoEstrategiaCompetitiva = exports.EstadoAlianza = exports.TipoAlianza = void 0;
// --- Enumeraciones ---
/** Tipos de alianzas estratégicas disponibles */
var TipoAlianza;
(function (TipoAlianza) {
    TipoAlianza["COMERCIAL"] = "comercial";
    TipoAlianza["TECNOLOGICA"] = "tecnologica";
    TipoAlianza["LOGISTICA"] = "logistica";
    TipoAlianza["PRODUCCION"] = "produccion";
    TipoAlianza["MARKETING"] = "marketing";
    TipoAlianza["EXCLUSIVIDAD"] = "exclusividad";
    TipoAlianza["JOINT_VENTURE"] = "joint_venture"; // Empresa conjunta para proyecto específico
})(TipoAlianza || (exports.TipoAlianza = TipoAlianza = {}));
/** Estados posibles de una alianza */
var EstadoAlianza;
(function (EstadoAlianza) {
    EstadoAlianza["PROPUESTA"] = "propuesta";
    EstadoAlianza["NEGOCIANDO"] = "negociando";
    EstadoAlianza["ACTIVA"] = "activa";
    EstadoAlianza["DETERIORADA"] = "deteriorada";
    EstadoAlianza["TERMINADA"] = "terminada";
    EstadoAlianza["ROTA"] = "rota"; // Alianza rota por incumplimiento
})(EstadoAlianza || (exports.EstadoAlianza = EstadoAlianza = {}));
/** Tipos de estrategias competitivas */
var TipoEstrategiaCompetitiva;
(function (TipoEstrategiaCompetitiva) {
    TipoEstrategiaCompetitiva["GUERRA_PRECIOS"] = "guerra_precios";
    TipoEstrategiaCompetitiva["BLOQUEO_RECURSOS"] = "bloqueo_recursos";
    TipoEstrategiaCompetitiva["INNOVACION_DISRUPTIVA"] = "innovacion";
    TipoEstrategiaCompetitiva["MARKETING_AGRESIVO"] = "marketing";
    TipoEstrategiaCompetitiva["EXPANSION_TERRITORIAL"] = "expansion";
    TipoEstrategiaCompetitiva["MEJORA_CALIDAD"] = "calidad";
    TipoEstrategiaCompetitiva["DIVERSIFICACION"] = "diversificacion"; // Diversificación de productos
})(TipoEstrategiaCompetitiva || (exports.TipoEstrategiaCompetitiva = TipoEstrategiaCompetitiva = {}));
/** Niveles de intensidad de una estrategia competitiva */
var IntensidadEstrategia;
(function (IntensidadEstrategia) {
    IntensidadEstrategia["BAJA"] = "baja";
    IntensidadEstrategia["MEDIA"] = "media";
    IntensidadEstrategia["ALTA"] = "alta";
    IntensidadEstrategia["EXTREMA"] = "extrema"; // Intensidad extrema
})(IntensidadEstrategia || (exports.IntensidadEstrategia = IntensidadEstrategia = {}));
/** Estados de una estrategia competitiva */
var EstadoEstrategia;
(function (EstadoEstrategia) {
    EstadoEstrategia["PLANIFICADA"] = "planificada";
    EstadoEstrategia["INICIADA"] = "iniciada";
    EstadoEstrategia["EN_PROGRESO"] = "en_progreso";
    EstadoEstrategia["FINALIZADA"] = "finalizada";
    EstadoEstrategia["CANCELADA"] = "cancelada"; // Cancelada antes de completarse
})(EstadoEstrategia || (exports.EstadoEstrategia = EstadoEstrategia = {}));
/** Tipos de respuestas a estrategias competitivas */
var TipoRespuestaCompetitiva;
(function (TipoRespuestaCompetitiva) {
    TipoRespuestaCompetitiva["IGNORAR"] = "ignorar";
    TipoRespuestaCompetitiva["IGUALAR"] = "igualar";
    TipoRespuestaCompetitiva["CONTRAATACAR"] = "contraatacar";
    TipoRespuestaCompetitiva["NEGOCIAR"] = "negociar";
    TipoRespuestaCompetitiva["DENUNCIAR"] = "denunciar"; // Denunciar prácticas anticompetitivas
})(TipoRespuestaCompetitiva || (exports.TipoRespuestaCompetitiva = TipoRespuestaCompetitiva = {}));
