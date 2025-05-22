"use strict";
// Componentes de UI para el Sistema de Espionaje - Gestión de Agentes
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelAgentes = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const espionageTypes_1 = require("../../engine/espionage/espionageTypes");
require("./EspionajeUI.css");
/**
 * Panel principal para la gestión de agentes de espionaje
 */
const PanelAgentes = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Obtener datos del estado global
    const agentes = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes);
    const agentesDisponibles = (0, react_redux_1.useSelector)((state) => state.espionaje.agentesDisponibles);
    const presupuestoMensual = (0, react_redux_1.useSelector)((state) => state.espionaje.presupuestoAgentes);
    const costoMensualTotal = (0, react_redux_1.useSelector)((state) => state.espionaje.costoMensualAgentes);
    // Estados locales
    const [tabActiva, setTabActiva] = (0, react_1.useState)('contratados');
    const [agenteSeleccionado, setAgenteSeleccionado] = (0, react_1.useState)(null);
    const [mostrarDetalles, setMostrarDetalles] = (0, react_1.useState)(false);
    // Acciones
    const contratarAgente = (agenteId) => {
        dispatch({ type: 'espionaje/contratarAgente', payload: agenteId });
    };
    const despedirAgente = (agenteId) => {
        dispatch({ type: 'espionaje/despedirAgente', payload: agenteId });
    };
    const actualizarPresupuesto = (nuevoPresupuesto) => {
        dispatch({ type: 'espionaje/actualizarPresupuestoAgentes', payload: nuevoPresupuesto });
    };
    const generarNuevosAgentes = () => {
        dispatch({ type: 'espionaje/generarAgentesDisponibles' });
    };
    const verDetallesAgente = (agenteId) => {
        setAgenteSeleccionado(agenteId);
        setMostrarDetalles(true);
    };
    // Renderizar panel
    return (react_1.default.createElement("div", { className: "panel-espionaje panel-agentes" },
        react_1.default.createElement("div", { className: "panel-header" },
            react_1.default.createElement("h2", null, "Gesti\u00F3n de Agentes de Espionaje"),
            react_1.default.createElement("div", { className: "presupuesto-container" },
                react_1.default.createElement("label", null, "Presupuesto Mensual:"),
                react_1.default.createElement("input", { type: "number", value: presupuestoMensual, onChange: (e) => actualizarPresupuesto(Number(e.target.value)), min: "0", step: "1000" }),
                react_1.default.createElement("span", { className: costoMensualTotal > presupuestoMensual ? "costo-excedido" : "costo-normal" },
                    "Costo Actual: $",
                    costoMensualTotal.toLocaleString()))),
        react_1.default.createElement("div", { className: "tabs-container" },
            react_1.default.createElement("div", { className: `tab ${tabActiva === 'contratados' ? 'active' : ''}`, onClick: () => setTabActiva('contratados') },
                "Agentes Contratados (",
                agentes.length,
                ")"),
            react_1.default.createElement("div", { className: `tab ${tabActiva === 'disponibles' ? 'active' : ''}`, onClick: () => setTabActiva('disponibles') },
                "Agentes Disponibles (",
                agentesDisponibles.length,
                ")")),
        react_1.default.createElement("div", { className: "panel-content" },
            tabActiva === 'contratados' ? (react_1.default.createElement(TablaAgentesContratados, { agentes: agentes, onDespedir: despedirAgente, onVerDetalles: verDetallesAgente })) : (react_1.default.createElement(TablaAgentesDisponibles, { agentes: agentesDisponibles, onContratar: contratarAgente, onVerDetalles: verDetallesAgente })),
            tabActiva === 'disponibles' && (react_1.default.createElement("button", { className: "btn-generar-agentes", onClick: generarNuevosAgentes }, "Buscar Nuevos Agentes"))),
        mostrarDetalles && agenteSeleccionado && (react_1.default.createElement(DetallesAgente, { agenteId: agenteSeleccionado, onClose: () => setMostrarDetalles(false) }))));
};
exports.PanelAgentes = PanelAgentes;
const TablaAgentesContratados = ({ agentes, onDespedir, onVerDetalles }) => {
    return (react_1.default.createElement("div", { className: "tabla-agentes" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Nombre"),
                    react_1.default.createElement("th", null, "Especialidad"),
                    react_1.default.createElement("th", null, "Nivel"),
                    react_1.default.createElement("th", null, "Estado"),
                    react_1.default.createElement("th", null, "Costo Mensual"),
                    react_1.default.createElement("th", null, "Acciones"))),
            react_1.default.createElement("tbody", null, agentes.length === 0 ? (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 6, className: "no-data" }, "No hay agentes contratados"))) : (agentes.map(agente => (react_1.default.createElement("tr", { key: agente.id, className: `estado-${agente.estado.toLowerCase()}` },
                react_1.default.createElement("td", null, agente.nombre),
                react_1.default.createElement("td", null, traducirEspecialidad(agente.especialidad)),
                react_1.default.createElement("td", null,
                    agente.nivelHabilidad,
                    " / 5"),
                react_1.default.createElement("td", null, traducirEstado(agente.estado)),
                react_1.default.createElement("td", null,
                    "$",
                    agente.costoMensual.toLocaleString()),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn-detalles", onClick: () => onVerDetalles(agente.id) }, "Detalles"),
                    agente.estado !== espionageTypes_1.EstadoAgente.EN_MISION && (react_1.default.createElement("button", { className: "btn-despedir", onClick: () => onDespedir(agente.id) }, "Despedir")))))))))));
};
const TablaAgentesDisponibles = ({ agentes, onContratar, onVerDetalles }) => {
    return (react_1.default.createElement("div", { className: "tabla-agentes" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "Nombre"),
                    react_1.default.createElement("th", null, "Especialidad"),
                    react_1.default.createElement("th", null, "Nivel"),
                    react_1.default.createElement("th", null, "Lealtad"),
                    react_1.default.createElement("th", null, "Costo Mensual"),
                    react_1.default.createElement("th", null, "Acciones"))),
            react_1.default.createElement("tbody", null, agentes.length === 0 ? (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 6, className: "no-data" }, "No hay agentes disponibles para contratar"))) : (agentes.map(agente => (react_1.default.createElement("tr", { key: agente.id },
                react_1.default.createElement("td", null, agente.nombre),
                react_1.default.createElement("td", null, traducirEspecialidad(agente.especialidad)),
                react_1.default.createElement("td", null,
                    agente.nivelHabilidad,
                    " / 5"),
                react_1.default.createElement("td", null,
                    agente.lealtad,
                    " / 5"),
                react_1.default.createElement("td", null,
                    "$",
                    agente.costoMensual.toLocaleString()),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn-detalles", onClick: () => onVerDetalles(agente.id) }, "Detalles"),
                    react_1.default.createElement("button", { className: "btn-contratar", onClick: () => onContratar(agente.id) }, "Contratar"))))))))));
};
const DetallesAgente = ({ agenteId, onClose }) => {
    // Obtener datos del agente
    const agente = (0, react_redux_1.useSelector)((state) => {
        const contratados = state.espionaje.agentes.find((a) => a.id === agenteId);
        if (contratados)
            return contratados;
        return state.espionaje.agentesDisponibles.find((a) => a.id === agenteId);
    });
    // Historial de misiones (si está contratado)
    const historialMisiones = (0, react_redux_1.useSelector)((state) => state.espionaje.misiones.filter((m) => m.agenteAsignadoId === agenteId));
    if (!agente) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "modal-detalles-agente" },
        react_1.default.createElement("div", { className: "modal-content" },
            react_1.default.createElement("div", { className: "modal-header" },
                react_1.default.createElement("h3", null, "Detalles del Agente"),
                react_1.default.createElement("button", { className: "btn-cerrar", onClick: onClose }, "\u00D7")),
            react_1.default.createElement("div", { className: "modal-body" },
                react_1.default.createElement("div", { className: "info-agente" },
                    react_1.default.createElement("div", { className: "info-principal" },
                        react_1.default.createElement("h4", null, agente.nombre),
                        react_1.default.createElement("p", { className: "especialidad" }, traducirEspecialidad(agente.especialidad)),
                        react_1.default.createElement("p", { className: "estado" }, traducirEstado(agente.estado))),
                    react_1.default.createElement("div", { className: "stats-agente" },
                        react_1.default.createElement("div", { className: "stat" },
                            react_1.default.createElement("label", null, "Nivel de Habilidad:"),
                            react_1.default.createElement("div", { className: "stat-bar" },
                                react_1.default.createElement("div", { className: "stat-fill", style: { width: `${agente.nivelHabilidad * 20}%` } })),
                            react_1.default.createElement("span", null,
                                agente.nivelHabilidad,
                                "/5")),
                        react_1.default.createElement("div", { className: "stat" },
                            react_1.default.createElement("label", null, "Lealtad:"),
                            react_1.default.createElement("div", { className: "stat-bar" },
                                react_1.default.createElement("div", { className: "stat-fill", style: { width: `${agente.lealtad * 20}%` } })),
                            react_1.default.createElement("span", null,
                                agente.lealtad,
                                "/5")),
                        react_1.default.createElement("div", { className: "stat" },
                            react_1.default.createElement("label", null, "Experiencia:"),
                            react_1.default.createElement("div", { className: "stat-bar" },
                                react_1.default.createElement("div", { className: "stat-fill", style: { width: `${Math.min(100, agente.experiencia)}%` } })),
                            react_1.default.createElement("span", null,
                                agente.experiencia,
                                " pts")),
                        react_1.default.createElement("div", { className: "stat" },
                            react_1.default.createElement("label", null, "Notoriedad:"),
                            react_1.default.createElement("div", { className: "stat-bar notoriedad" },
                                react_1.default.createElement("div", { className: "stat-fill", style: { width: `${agente.notoriedad}%` } })),
                            react_1.default.createElement("span", null,
                                agente.notoriedad,
                                "%"))),
                    react_1.default.createElement("div", { className: "info-adicional" },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, "Costo Mensual:"),
                            " $",
                            agente.costoMensual.toLocaleString()),
                        agente.estado === espionageTypes_1.EstadoAgente.RECUPERANDOSE && (react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, "Tiempo de Recuperaci\u00F3n:"),
                            " ",
                            agente.tiempoRecuperacionRestante,
                            " d\u00EDas")),
                        agente.estado === espionageTypes_1.EstadoAgente.EN_MISION && (react_1.default.createElement("p", null,
                            react_1.default.createElement("strong", null, "En Misi\u00F3n:"),
                            " ",
                            agente.misionActualId)))),
                historialMisiones && historialMisiones.length > 0 && (react_1.default.createElement("div", { className: "historial-misiones" },
                    react_1.default.createElement("h4", null, "Historial de Misiones"),
                    react_1.default.createElement("table", null,
                        react_1.default.createElement("thead", null,
                            react_1.default.createElement("tr", null,
                                react_1.default.createElement("th", null, "ID"),
                                react_1.default.createElement("th", null, "Tipo"),
                                react_1.default.createElement("th", null, "Estado"),
                                react_1.default.createElement("th", null, "Resultado"))),
                        react_1.default.createElement("tbody", null, historialMisiones.map((mision) => (react_1.default.createElement("tr", { key: mision.id },
                            react_1.default.createElement("td", null, mision.id),
                            react_1.default.createElement("td", null, traducirTipoMision(mision.tipo)),
                            react_1.default.createElement("td", null, traducirEstadoMision(mision.estado)),
                            react_1.default.createElement("td", null, mision.resultado ? (mision.resultado.exito ?
                                mision.resultado.detectado ? "Éxito (Detectado)" : "Éxito"
                                : mision.resultado.detectado ? "Fracaso (Detectado)" : "Fracaso") : "En curso"))))))))))));
};
// Funciones auxiliares para traducir enumeraciones
function traducirEspecialidad(especialidad) {
    switch (especialidad) {
        case espionageTypes_1.EspecialidadAgente.INFORMACION:
            return "Recopilación de Información";
        case espionageTypes_1.EspecialidadAgente.TECNOLOGIA:
            return "Robo de Tecnología";
        case espionageTypes_1.EspecialidadAgente.SABOTAJE:
            return "Operaciones de Sabotaje";
        case espionageTypes_1.EspecialidadAgente.MANIPULACION:
            return "Manipulación de Mercados";
        case espionageTypes_1.EspecialidadAgente.GENERALISTA:
            return "Generalista";
        default:
            return "Desconocida";
    }
}
function traducirEstado(estado) {
    switch (estado) {
        case espionageTypes_1.EstadoAgente.DISPONIBLE:
            return "Disponible";
        case espionageTypes_1.EstadoAgente.EN_MISION:
            return "En Misión";
        case espionageTypes_1.EstadoAgente.RECUPERANDOSE:
            return "Recuperándose";
        case espionageTypes_1.EstadoAgente.CAPTURADO:
            return "Capturado";
        case espionageTypes_1.EstadoAgente.RETIRADO:
            return "Retirado";
        default:
            return "Desconocido";
    }
}
function traducirTipoMision(tipo) {
    switch (tipo) {
        case 'recopilacion_info':
            return "Recopilación de Información";
        case 'robo_tecnologia':
            return "Robo de Tecnología";
        case 'sabotaje':
            return "Sabotaje";
        case 'manipulacion_mercado':
            return "Manipulación de Mercado";
        default:
            return "Desconocido";
    }
}
function traducirEstadoMision(estado) {
    switch (estado) {
        case 'planificando':
            return "Planificando";
        case 'en_progreso':
            return "En Progreso";
        case 'completada':
            return "Completada";
        case 'fallida':
            return "Fallida";
        case 'descubierta':
            return "Descubierta";
        default:
            return "Desconocido";
    }
}
exports.default = exports.PanelAgentes;
