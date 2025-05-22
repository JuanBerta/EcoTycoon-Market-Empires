"use strict";
// Componente principal para integrar todos los paneles de espionaje
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaEspionajeUI = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const PanelAgentes_1 = __importDefault(require("./PanelAgentes"));
const PanelMisiones_1 = __importDefault(require("./PanelMisiones"));
require("./EspionajeUI.css");
/**
 * Componente principal que integra todos los paneles del sistema de espionaje
 */
const SistemaEspionajeUI = () => {
    // Estados locales
    const [seccionActiva, setSeccionActiva] = (0, react_1.useState)('agentes');
    // Datos del sistema de contraespionaje
    const departamentoContraespionaje = (0, react_redux_1.useSelector)((state) => state.espionaje.departamentoContraespionaje);
    const historialIncidentes = (0, react_redux_1.useSelector)((state) => state.espionaje.historialIncidentes);
    return (react_1.default.createElement("div", { className: "sistema-espionaje-container" },
        react_1.default.createElement("div", { className: "espionaje-header" },
            react_1.default.createElement("h1", null, "Centro de Operaciones de Inteligencia"),
            react_1.default.createElement("div", { className: "espionaje-nav" },
                react_1.default.createElement("button", { className: `nav-btn ${seccionActiva === 'agentes' ? 'active' : ''}`, onClick: () => setSeccionActiva('agentes') }, "Gesti\u00F3n de Agentes"),
                react_1.default.createElement("button", { className: `nav-btn ${seccionActiva === 'misiones' ? 'active' : ''}`, onClick: () => setSeccionActiva('misiones') }, "Operaciones"),
                react_1.default.createElement("button", { className: `nav-btn ${seccionActiva === 'contraespionaje' ? 'active' : ''}`, onClick: () => setSeccionActiva('contraespionaje') }, "Contraespionaje"))),
        react_1.default.createElement("div", { className: "espionaje-content" },
            seccionActiva === 'agentes' && react_1.default.createElement(PanelAgentes_1.default, null),
            seccionActiva === 'misiones' && react_1.default.createElement(PanelMisiones_1.default, null),
            seccionActiva === 'contraespionaje' && react_1.default.createElement(PanelContraespionaje, { departamento: departamentoContraespionaje, historialIncidentes: historialIncidentes }))));
};
exports.SistemaEspionajeUI = SistemaEspionajeUI;
const PanelContraespionaje = ({ departamento, historialIncidentes }) => {
    const dispatch = useDispatch();
    // Estados locales
    const [nivelSeguridad, setNivelSeguridad] = (0, react_1.useState)((departamento === null || departamento === void 0 ? void 0 : departamento.nivelSeguridadGeneral) || 1);
    const [presupuesto, setPresupuesto] = (0, react_1.useState)((departamento === null || departamento === void 0 ? void 0 : departamento.presupuestoMensual) || 10000);
    const [personal, setPersonal] = (0, react_1.useState)((departamento === null || departamento === void 0 ? void 0 : departamento.personalAsignado) || 5);
    const [tecnologiasSeleccionadas, setTecnologiasSeleccionadas] = (0, react_1.useState)((departamento === null || departamento === void 0 ? void 0 : departamento.tecnologiasSeguridad) || []);
    // Tecnologías disponibles (en un caso real, vendrían del sistema de investigación)
    const tecnologiasDisponibles = [
        { id: 'tech_firewall', nombre: 'Firewall Avanzado', costo: 5000 },
        { id: 'tech_encryption', nombre: 'Encriptación de Datos', costo: 8000 },
        { id: 'tech_surveillance', nombre: 'Sistema de Vigilancia', costo: 12000 },
        { id: 'tech_authentication', nombre: 'Autenticación Biométrica', costo: 15000 },
        { id: 'tech_honeypot', nombre: 'Sistema Honeypot', costo: 20000 }
    ];
    // Actualizar configuración
    const actualizarConfiguracion = () => {
        dispatch({
            type: 'espionaje/configurarContraespionaje',
            payload: {
                nivelSeguridad,
                presupuesto,
                personal,
                tecnologias: tecnologiasSeleccionadas
            }
        });
    };
    // Alternar selección de tecnología
    const toggleTecnologia = (tecId) => {
        if (tecnologiasSeleccionadas.includes(tecId)) {
            setTecnologiasSeleccionadas(tecnologiasSeleccionadas.filter(id => id !== tecId));
        }
        else {
            setTecnologiasSeleccionadas([...tecnologiasSeleccionadas, tecId]);
        }
    };
    // Calcular eficiencia estimada
    const calcularEficienciaEstimada = () => {
        // Base según nivel de seguridad (1-5)
        let eficiencia = nivelSeguridad * 10; // 10-50 base
        // Factor de presupuesto
        const factorPresupuesto = Math.min(30, presupuesto / 10000); // Hasta +30
        // Factor de personal
        const factorPersonal = Math.min(20, (personal / 10) * 5); // Hasta +20
        // Factor de tecnologías
        const factorTecnologias = Math.min(25, tecnologiasSeleccionadas.length * 5); // Hasta +25
        // Sumar todos los factores
        eficiencia += factorPresupuesto + factorPersonal + factorTecnologias;
        // Limitar a 0-100
        return Math.max(0, Math.min(100, Math.floor(eficiencia)));
    };
    return (react_1.default.createElement("div", { className: "panel-espionaje panel-contraespionaje" },
        react_1.default.createElement("div", { className: "panel-header" },
            react_1.default.createElement("h2", null, "Departamento de Contraespionaje")),
        react_1.default.createElement("div", { className: "panel-content" },
            react_1.default.createElement("div", { className: "contraespionaje-grid" },
                react_1.default.createElement("div", { className: "configuracion-contraespionaje" },
                    react_1.default.createElement("h3", null, "Configuraci\u00F3n de Seguridad"),
                    react_1.default.createElement("div", { className: "campo-slider" },
                        react_1.default.createElement("label", null, "Nivel de Seguridad General:"),
                        react_1.default.createElement("div", { className: "slider-container" },
                            react_1.default.createElement("input", { type: "range", min: "1", max: "5", value: nivelSeguridad, onChange: (e) => setNivelSeguridad(Number(e.target.value)) }),
                            react_1.default.createElement("span", null, nivelSeguridad)),
                        react_1.default.createElement("p", { className: "descripcion" }, "Determina el nivel base de protecci\u00F3n contra espionaje.")),
                    react_1.default.createElement("div", { className: "campo" },
                        react_1.default.createElement("label", null, "Presupuesto Mensual:"),
                        react_1.default.createElement("input", { type: "number", value: presupuesto, onChange: (e) => setPresupuesto(Number(e.target.value)), min: "0", step: "1000" }),
                        react_1.default.createElement("p", { className: "descripcion" }, "Fondos asignados para operaciones de contraespionaje.")),
                    react_1.default.createElement("div", { className: "campo" },
                        react_1.default.createElement("label", null, "Personal Asignado:"),
                        react_1.default.createElement("input", { type: "number", value: personal, onChange: (e) => setPersonal(Number(e.target.value)), min: "0", step: "1" }),
                        react_1.default.createElement("p", { className: "descripcion" }, "N\u00FAmero de agentes de seguridad en el departamento.")),
                    react_1.default.createElement("div", { className: "tecnologias-seguridad" },
                        react_1.default.createElement("h4", null, "Tecnolog\u00EDas de Seguridad"),
                        react_1.default.createElement("div", { className: "lista-tecnologias" }, tecnologiasDisponibles.map(tec => (react_1.default.createElement("div", { key: tec.id, className: `tecnologia-item ${tecnologiasSeleccionadas.includes(tec.id) ? 'seleccionada' : ''}`, onClick: () => toggleTecnologia(tec.id) },
                            react_1.default.createElement("div", { className: "tec-checkbox" },
                                react_1.default.createElement("input", { type: "checkbox", checked: tecnologiasSeleccionadas.includes(tec.id), onChange: () => { } })),
                            react_1.default.createElement("div", { className: "tec-info" },
                                react_1.default.createElement("span", { className: "tec-nombre" }, tec.nombre),
                                react_1.default.createElement("span", { className: "tec-costo" },
                                    "$",
                                    tec.costo.toLocaleString()))))))),
                    react_1.default.createElement("button", { className: "btn-actualizar", onClick: actualizarConfiguracion }, "Actualizar Configuraci\u00F3n")),
                react_1.default.createElement("div", { className: "estadisticas-contraespionaje" },
                    react_1.default.createElement("h3", null, "Estad\u00EDsticas de Protecci\u00F3n"),
                    react_1.default.createElement("div", { className: "eficiencia-deteccion" },
                        react_1.default.createElement("h4", null, "Eficiencia de Detecci\u00F3n"),
                        react_1.default.createElement("div", { className: "medidor-circular" },
                            react_1.default.createElement("svg", { viewBox: "0 0 100 100" },
                                react_1.default.createElement("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#2a2a4a", strokeWidth: "10" }),
                                react_1.default.createElement("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#4cc9f0", strokeWidth: "10", strokeDasharray: `${2 * Math.PI * 45 * calcularEficienciaEstimada() / 100} ${2 * Math.PI * 45}`, strokeDashoffset: "0", transform: "rotate(-90 50 50)" }),
                                react_1.default.createElement("text", { x: "50", y: "50", textAnchor: "middle", dominantBaseline: "middle", fontSize: "20", fill: "#e6e6e6" },
                                    calcularEficienciaEstimada(),
                                    "%"))),
                        react_1.default.createElement("p", { className: "descripcion" }, "Capacidad para detectar intentos de espionaje enemigo.")),
                    react_1.default.createElement("div", { className: "factores-eficiencia" },
                        react_1.default.createElement("h4", null, "Factores de Eficiencia"),
                        react_1.default.createElement("ul", null,
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("span", null, "Nivel de Seguridad:"),
                                react_1.default.createElement("span", null,
                                    "+",
                                    nivelSeguridad * 10,
                                    "%")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("span", null, "Presupuesto:"),
                                react_1.default.createElement("span", null,
                                    "+",
                                    Math.min(30, Math.floor(presupuesto / 10000)),
                                    "%")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("span", null, "Personal:"),
                                react_1.default.createElement("span", null,
                                    "+",
                                    Math.min(20, Math.floor((personal / 10) * 5)),
                                    "%")),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("span", null, "Tecnolog\u00EDas:"),
                                react_1.default.createElement("span", null,
                                    "+",
                                    Math.min(25, tecnologiasSeleccionadas.length * 5),
                                    "%")))),
                    react_1.default.createElement("div", { className: "costo-total" },
                        react_1.default.createElement("h4", null, "Costo Total Mensual"),
                        react_1.default.createElement("div", { className: "costo-valor" },
                            "$",
                            (presupuesto + tecnologiasSeleccionadas.reduce((total, tecId) => {
                                const tec = tecnologiasDisponibles.find(t => t.id === tecId);
                                return total + (tec ? tec.costo / 12 : 0); // Costo mensual (anual / 12)
                            }, 0)).toLocaleString())))),
            react_1.default.createElement("div", { className: "historial-incidentes" },
                react_1.default.createElement("h3", null, "Historial de Incidentes"),
                historialIncidentes.length === 0 ? (react_1.default.createElement("p", { className: "no-data" }, "No se han detectado intentos de espionaje.")) : (react_1.default.createElement("table", null,
                    react_1.default.createElement("thead", null,
                        react_1.default.createElement("tr", null,
                            react_1.default.createElement("th", null, "ID Incidente"),
                            react_1.default.createElement("th", null, "Fecha"),
                            react_1.default.createElement("th", null, "Tipo"),
                            react_1.default.createElement("th", null, "Origen"),
                            react_1.default.createElement("th", null, "Estado"))),
                    react_1.default.createElement("tbody", null, historialIncidentes.map((incidenteId, index) => (react_1.default.createElement("tr", { key: incidenteId },
                        react_1.default.createElement("td", null, incidenteId),
                        react_1.default.createElement("td", null,
                            "D\u00EDa ",
                            Math.floor(Math.random() * 100) + 1),
                        react_1.default.createElement("td", null, ['Recopilación', 'Sabotaje', 'Robo'][Math.floor(Math.random() * 3)]),
                        react_1.default.createElement("td", null, ['Competidor A', 'Competidor B', 'Desconocido'][Math.floor(Math.random() * 3)]),
                        react_1.default.createElement("td", null, ['Neutralizado', 'En Investigación'][Math.floor(Math.random() * 2)])))))))))));
};
exports.default = exports.SistemaEspionajeUI;
