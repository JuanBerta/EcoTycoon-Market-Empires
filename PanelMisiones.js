"use strict";
// Componentes de UI para el Sistema de Espionaje - Planificación de Misiones
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
exports.PanelMisiones = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const espionageTypes_1 = require("../../engine/espionage/espionageTypes");
require("./EspionajeUI.css");
/**
 * Panel principal para la planificación y gestión de misiones de espionaje
 */
const PanelMisiones = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Obtener datos del estado global
    const misionesPlanificadas = (0, react_redux_1.useSelector)((state) => state.espionaje.misionesPlanificadas);
    const misionesActivas = (0, react_redux_1.useSelector)((state) => state.espionaje.misionesActivas);
    const misionesCompletadas = (0, react_redux_1.useSelector)((state) => state.espionaje.misionesCompletadas);
    const agentesDisponibles = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes.filter((a) => a.estado === espionageTypes_1.EstadoAgente.DISPONIBLE));
    const empresasObjetivo = (0, react_redux_1.useSelector)((state) => state.npcs.empresasActivas);
    // Estados locales
    const [tabActiva, setTabActiva] = (0, react_1.useState)('planificacion');
    const [misionSeleccionada, setMisionSeleccionada] = (0, react_1.useState)(null);
    const [mostrarDetalles, setMostrarDetalles] = (0, react_1.useState)(false);
    const [mostrarNuevaMision, setMostrarNuevaMision] = (0, react_1.useState)(false);
    // Acciones
    const iniciarMision = (misionId) => {
        dispatch({ type: 'espionaje/iniciarMision', payload: misionId });
    };
    const cancelarMision = (misionId) => {
        dispatch({ type: 'espionaje/cancelarMision', payload: misionId });
    };
    const verDetallesMision = (misionId) => {
        setMisionSeleccionada(misionId);
        setMostrarDetalles(true);
    };
    // Renderizar panel
    return (react_1.default.createElement("div", { className: "panel-espionaje panel-misiones" },
        react_1.default.createElement("div", { className: "panel-header" },
            react_1.default.createElement("h2", null, "Operaciones de Espionaje"),
            react_1.default.createElement("button", { className: "btn-nueva-mision", onClick: () => setMostrarNuevaMision(true), disabled: agentesDisponibles.length === 0 }, "Nueva Misi\u00F3n")),
        react_1.default.createElement("div", { className: "tabs-container" },
            react_1.default.createElement("div", { className: `tab ${tabActiva === 'planificacion' ? 'active' : ''}`, onClick: () => setTabActiva('planificacion') },
                "Planificaci\u00F3n (",
                misionesPlanificadas.length,
                ")"),
            react_1.default.createElement("div", { className: `tab ${tabActiva === 'activas' ? 'active' : ''}`, onClick: () => setTabActiva('activas') },
                "Misiones Activas (",
                misionesActivas.length,
                ")"),
            react_1.default.createElement("div", { className: `tab ${tabActiva === 'completadas' ? 'active' : ''}`, onClick: () => setTabActiva('completadas') },
                "Historial (",
                misionesCompletadas.length,
                ")")),
        react_1.default.createElement("div", { className: "panel-content" },
            tabActiva === 'planificacion' && (react_1.default.createElement(TablaMisionesPlanificadas, { misiones: misionesPlanificadas, onIniciar: iniciarMision, onCancelar: cancelarMision, onVerDetalles: verDetallesMision })),
            tabActiva === 'activas' && (react_1.default.createElement(TablaMisionesActivas, { misiones: misionesActivas, onVerDetalles: verDetallesMision })),
            tabActiva === 'completadas' && (react_1.default.createElement(TablaMisionesCompletadas, { misiones: misionesCompletadas, onVerDetalles: verDetallesMision }))),
        mostrarDetalles && misionSeleccionada && (react_1.default.createElement(DetallesMision, { misionId: misionSeleccionada, onClose: () => setMostrarDetalles(false) })),
        mostrarNuevaMision && (react_1.default.createElement(FormularioNuevaMision, { agentesDisponibles: agentesDisponibles, empresasObjetivo: empresasObjetivo, onClose: () => setMostrarNuevaMision(false) }))));
};
exports.PanelMisiones = PanelMisiones;
const TablaMisionesPlanificadas = ({ misiones, onIniciar, onCancelar, onVerDetalles }) => {
    // Obtener datos adicionales
    const agentes = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes);
    const empresas = (0, react_redux_1.useSelector)((state) => state.npcs.empresasActivas);
    // Función para obtener nombre de agente
    const getNombreAgente = (agenteId) => {
        const agente = agentes.find((a) => a.id === agenteId);
        return agente ? agente.nombre : 'Desconocido';
    };
    // Función para obtener nombre de empresa
    const getNombreEmpresa = (empresaId) => {
        const empresa = empresas.find((e) => e.id === empresaId);
        return empresa ? empresa.nombre : 'Desconocida';
    };
    return (react_1.default.createElement("div", { className: "tabla-misiones" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "ID"),
                    react_1.default.createElement("th", null, "Tipo"),
                    react_1.default.createElement("th", null, "Objetivo"),
                    react_1.default.createElement("th", null, "Agente"),
                    react_1.default.createElement("th", null, "Duraci\u00F3n Est."),
                    react_1.default.createElement("th", null, "Costo"),
                    react_1.default.createElement("th", null, "Prob. \u00C9xito"),
                    react_1.default.createElement("th", null, "Acciones"))),
            react_1.default.createElement("tbody", null, misiones.length === 0 ? (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 8, className: "no-data" }, "No hay misiones en planificaci\u00F3n"))) : (misiones.map(mision => (react_1.default.createElement("tr", { key: mision.id },
                react_1.default.createElement("td", null, mision.id),
                react_1.default.createElement("td", null, traducirTipoMision(mision.tipo)),
                react_1.default.createElement("td", null, getNombreEmpresa(mision.objetivoEmpresaId)),
                react_1.default.createElement("td", null, getNombreAgente(mision.agenteAsignadoId)),
                react_1.default.createElement("td", null,
                    mision.duracionEstimada,
                    " d\u00EDas"),
                react_1.default.createElement("td", null,
                    "$",
                    mision.costoOperacion.toLocaleString()),
                react_1.default.createElement("td", null,
                    mision.probabilidadExitoBase,
                    "%"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn-detalles", onClick: () => onVerDetalles(mision.id) }, "Detalles"),
                    react_1.default.createElement("button", { className: "btn-iniciar", onClick: () => onIniciar(mision.id) }, "Iniciar"),
                    react_1.default.createElement("button", { className: "btn-cancelar", onClick: () => onCancelar(mision.id) }, "Cancelar"))))))))));
};
const TablaMisionesActivas = ({ misiones, onVerDetalles }) => {
    // Obtener datos adicionales
    const agentes = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes);
    const empresas = (0, react_redux_1.useSelector)((state) => state.npcs.empresasActivas);
    const diaActual = (0, react_redux_1.useSelector)((state) => state.juego.diaActual);
    // Función para obtener nombre de agente
    const getNombreAgente = (agenteId) => {
        const agente = agentes.find((a) => a.id === agenteId);
        return agente ? agente.nombre : 'Desconocido';
    };
    // Función para obtener nombre de empresa
    const getNombreEmpresa = (empresaId) => {
        const empresa = empresas.find((e) => e.id === empresaId);
        return empresa ? empresa.nombre : 'Desconocida';
    };
    // Función para calcular progreso
    const calcularProgreso = (mision) => {
        const diasTranscurridos = diaActual - mision.fechaInicio;
        const porcentaje = Math.min(100, Math.floor((diasTranscurridos / mision.duracionEstimada) * 100));
        return porcentaje;
    };
    return (react_1.default.createElement("div", { className: "tabla-misiones" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "ID"),
                    react_1.default.createElement("th", null, "Tipo"),
                    react_1.default.createElement("th", null, "Objetivo"),
                    react_1.default.createElement("th", null, "Agente"),
                    react_1.default.createElement("th", null, "Inicio"),
                    react_1.default.createElement("th", null, "Progreso"),
                    react_1.default.createElement("th", null, "Acciones"))),
            react_1.default.createElement("tbody", null, misiones.length === 0 ? (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 7, className: "no-data" }, "No hay misiones activas"))) : (misiones.map(mision => (react_1.default.createElement("tr", { key: mision.id },
                react_1.default.createElement("td", null, mision.id),
                react_1.default.createElement("td", null, traducirTipoMision(mision.tipo)),
                react_1.default.createElement("td", null, getNombreEmpresa(mision.objetivoEmpresaId)),
                react_1.default.createElement("td", null, getNombreAgente(mision.agenteAsignadoId)),
                react_1.default.createElement("td", null,
                    "D\u00EDa ",
                    mision.fechaInicio),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("div", { className: "barra-progreso" },
                        react_1.default.createElement("div", { className: "progreso-fill", style: { width: `${calcularProgreso(mision)}%` } })),
                    react_1.default.createElement("span", null,
                        calcularProgreso(mision),
                        "%")),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn-detalles", onClick: () => onVerDetalles(mision.id) }, "Detalles"))))))))));
};
const TablaMisionesCompletadas = ({ misiones, onVerDetalles }) => {
    // Obtener datos adicionales
    const agentes = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes);
    const empresas = (0, react_redux_1.useSelector)((state) => state.npcs.empresasActivas);
    // Función para obtener nombre de agente
    const getNombreAgente = (agenteId) => {
        const agente = agentes.find((a) => a.id === agenteId);
        return agente ? agente.nombre : 'Desconocido';
    };
    // Función para obtener nombre de empresa
    const getNombreEmpresa = (empresaId) => {
        const empresa = empresas.find((e) => e.id === empresaId);
        return empresa ? empresa.nombre : 'Desconocida';
    };
    return (react_1.default.createElement("div", { className: "tabla-misiones" },
        react_1.default.createElement("table", null,
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", null,
                    react_1.default.createElement("th", null, "ID"),
                    react_1.default.createElement("th", null, "Tipo"),
                    react_1.default.createElement("th", null, "Objetivo"),
                    react_1.default.createElement("th", null, "Agente"),
                    react_1.default.createElement("th", null, "Estado"),
                    react_1.default.createElement("th", null, "Resultado"),
                    react_1.default.createElement("th", null, "Acciones"))),
            react_1.default.createElement("tbody", null, misiones.length === 0 ? (react_1.default.createElement("tr", null,
                react_1.default.createElement("td", { colSpan: 7, className: "no-data" }, "No hay misiones completadas"))) : (misiones.map(mision => (react_1.default.createElement("tr", { key: mision.id, className: `estado-${mision.estado.toLowerCase()}` },
                react_1.default.createElement("td", null, mision.id),
                react_1.default.createElement("td", null, traducirTipoMision(mision.tipo)),
                react_1.default.createElement("td", null, getNombreEmpresa(mision.objetivoEmpresaId)),
                react_1.default.createElement("td", null, getNombreAgente(mision.agenteAsignadoId)),
                react_1.default.createElement("td", null, traducirEstadoMision(mision.estado)),
                react_1.default.createElement("td", null, mision.resultado ? (mision.resultado.exito ?
                    mision.resultado.detectado ? "Éxito (Detectado)" : "Éxito"
                    : mision.resultado.detectado ? "Fracaso (Detectado)" : "Fracaso") : "Desconocido"),
                react_1.default.createElement("td", null,
                    react_1.default.createElement("button", { className: "btn-detalles", onClick: () => onVerDetalles(mision.id) }, "Detalles"))))))))));
};
const DetallesMision = ({ misionId, onClose }) => {
    // Obtener datos de la misión
    const mision = (0, react_redux_1.useSelector)((state) => {
        // Buscar en todas las listas de misiones
        const planificadas = state.espionaje.misionesPlanificadas.find((m) => m.id === misionId);
        if (planificadas)
            return planificadas;
        const activas = state.espionaje.misionesActivas.find((m) => m.id === misionId);
        if (activas)
            return activas;
        return state.espionaje.misionesCompletadas.find((m) => m.id === misionId);
    });
    // Datos adicionales
    const agentes = (0, react_redux_1.useSelector)((state) => state.espionaje.agentes);
    const empresas = (0, react_redux_1.useSelector)((state) => state.npcs.empresasActivas);
    const diaActual = (0, react_redux_1.useSelector)((state) => state.juego.diaActual);
    if (!mision) {
        return null;
    }
    // Obtener agente y empresa
    const agente = agentes.find((a) => a.id === mision.agenteAsignadoId);
    const empresa = empresas.find((e) => e.id === mision.objetivoEmpresaId);
    // Calcular progreso si está activa
    const calcularProgreso = () => {
        if (mision.estado !== espionageTypes_1.EstadoMision.EN_PROGRESO)
            return 100;
        const diasTranscurridos = diaActual - mision.fechaInicio;
        return Math.min(100, Math.floor((diasTranscurridos / mision.duracionEstimada) * 100));
    };
    return (react_1.default.createElement("div", { className: "modal-detalles-mision" },
        react_1.default.createElement("div", { className: "modal-content" },
            react_1.default.createElement("div", { className: "modal-header" },
                react_1.default.createElement("h3", null, "Detalles de la Misi\u00F3n"),
                react_1.default.createElement("button", { className: "btn-cerrar", onClick: onClose }, "\u00D7")),
            react_1.default.createElement("div", { className: "modal-body" },
                react_1.default.createElement("div", { className: "info-mision" },
                    react_1.default.createElement("div", { className: "info-principal" },
                        react_1.default.createElement("h4", null, mision.id),
                        react_1.default.createElement("p", { className: "tipo" }, traducirTipoMision(mision.tipo)),
                        react_1.default.createElement("p", { className: "estado" }, traducirEstadoMision(mision.estado))),
                    react_1.default.createElement("div", { className: "detalles-mision" },
                        react_1.default.createElement("div", { className: "seccion" },
                            react_1.default.createElement("h5", null, "Informaci\u00F3n General"),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Objetivo:"),
                                " ",
                                empresa ? empresa.nombre : 'Desconocido'),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Objetivo Espec\u00EDfico:"),
                                " ",
                                mision.objetivoEspecifico),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Agente Asignado:"),
                                " ",
                                agente ? agente.nombre : 'Desconocido'),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Costo de Operaci\u00F3n:"),
                                " $",
                                mision.costoOperacion.toLocaleString())),
                        react_1.default.createElement("div", { className: "seccion" },
                            react_1.default.createElement("h5", null, "Tiempos"),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Fecha de Inicio:"),
                                " D\u00EDa ",
                                mision.fechaInicio),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Duraci\u00F3n Estimada:"),
                                " ",
                                mision.duracionEstimada,
                                " d\u00EDas"),
                            mision.duracionReal && (react_1.default.createElement("p", null,
                                react_1.default.createElement("strong", null, "Duraci\u00F3n Real:"),
                                " ",
                                mision.duracionReal,
                                " d\u00EDas")),
                            mision.estado === espionageTypes_1.EstadoMision.EN_PROGRESO && (react_1.default.createElement("div", null,
                                react_1.default.createElement("p", null,
                                    react_1.default.createElement("strong", null, "Progreso:")),
                                react_1.default.createElement("div", { className: "barra-progreso" },
                                    react_1.default.createElement("div", { className: "progreso-fill", style: { width: `${calcularProgreso()}%` } })),
                                react_1.default.createElement("span", null,
                                    calcularProgreso(),
                                    "%"))),
                            "(Content truncated due to size limit. Use line ranges to read in chunks)")))))));
};
