"use strict";
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
// Aplicación de optimizaciones de rendimiento al DashboardPanel
const react_1 = __importStar(require("react"));
require("./DashboardPanel.css");
const Card_1 = __importDefault(require("../common/Card"));
const Chart_1 = __importDefault(require("../common/Chart"));
const Table_1 = __importDefault(require("../common/Table"));
const performanceOptimizations_1 = require("../../utils/performanceOptimizations");
// Componente optimizado para KPI
const KPICard = react_1.default.memo(({ title, value, trend, trendValue, icon }) => {
    return (react_1.default.createElement("div", { className: "kpi-card" },
        react_1.default.createElement(Card_1.default, null,
            react_1.default.createElement("div", { className: "kpi-content" },
                icon && react_1.default.createElement("div", { className: "kpi-icon" }, icon),
                react_1.default.createElement("div", { className: "kpi-data" },
                    react_1.default.createElement("div", { className: "kpi-title" }, title),
                    react_1.default.createElement("div", { className: "kpi-value" }, value),
                    react_1.default.createElement("div", { className: `kpi-trend ${trend}` }, trendValue))))));
});
// Componente optimizado para alertas
const AlertItem = react_1.default.memo(({ type, message, time }) => {
    return (react_1.default.createElement("div", { className: `alert-item ${type}` },
        react_1.default.createElement("div", { className: "alert-icon" }, type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : '🚨'),
        react_1.default.createElement("div", { className: "alert-content" },
            react_1.default.createElement("div", { className: "alert-message" }, message),
            react_1.default.createElement("div", { className: "alert-time" }, time))));
});
// Componente principal optimizado
const DashboardPanel = ({ loading = false, playerMoney = 0, playerAssets = 0, playerLiabilities = 0 }) => {
    // Datos optimizados para KPIs
    const kpiData = (0, performanceOptimizations_1.useOptimizedData)([
        {
            title: 'Efectivo',
            value: `$${playerMoney.toLocaleString()}`,
            trend: playerMoney > 90000 ? 'positive' : 'negative',
            trendValue: playerMoney > 90000 ? '+5.2%' : '-3.8%',
            icon: '💰'
        },
        {
            title: 'Activos',
            value: `$${playerAssets.toLocaleString()}`,
            trend: 'positive',
            trendValue: '+8.7%',
            icon: '📈'
        },
        {
            title: 'Pasivos',
            value: `$${playerLiabilities.toLocaleString()}`,
            trend: 'negative',
            trendValue: '+2.3%',
            icon: '📉'
        },
        {
            title: 'Patrimonio Neto',
            value: `$${(playerAssets - playerLiabilities).toLocaleString()}`,
            trend: 'positive',
            trendValue: '+12.1%',
            icon: '💎'
        }
    ], [playerMoney, playerAssets, playerLiabilities]);
    // Datos optimizados para gráficos
    const chartData = (0, performanceOptimizations_1.useOptimizedData)({
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        series: [
            {
                name: 'Ingresos',
                data: [30000, 35000, 32000, 40000, 45000, 50000],
                color: '#34a853'
            },
            {
                name: 'Gastos',
                data: [25000, 28000, 26000, 30000, 32000, 35000],
                color: '#ea4335'
            },
            {
                name: 'Beneficio',
                data: [5000, 7000, 6000, 10000, 13000, 15000],
                color: '#1a73e8'
            }
        ]
    }, []);
    // Datos optimizados para alertas
    const alertsData = (0, performanceOptimizations_1.useOptimizedData)([
        {
            type: 'alert',
            message: 'Escasez crítica de materias primas en Región Norte',
            time: 'Hace 5 min'
        },
        {
            type: 'warning',
            message: 'Competidor ha reducido precios en sector electrónica',
            time: 'Hace 15 min'
        },
        {
            type: 'info',
            message: 'Nueva oportunidad de mercado detectada en Región Sur',
            time: 'Hace 30 min'
        },
        {
            type: 'info',
            message: 'Investigación completada: Automatización Avanzada',
            time: 'Hace 45 min'
        }
    ], []);
    // Datos optimizados para competidores
    const competitorsData = (0, performanceOptimizations_1.useOptimizedData)([
        { id: 1, name: 'Competidor Alpha', marketShare: 25, growth: 5.2, threat: 'high' },
        { id: 2, name: 'Innovaciones Beta', marketShare: 15, growth: -2.1, threat: 'medium' },
        { id: 3, name: 'Corporación Gamma', marketShare: 30, growth: 1.8, threat: 'high' },
        { id: 4, name: 'Emprendimientos Delta', marketShare: 10, growth: 8.5, threat: 'low' }
    ], []);
    // Columnas optimizadas para la tabla
    const competitorColumns = (0, react_1.useMemo)(() => [
        { id: 'name', label: 'Competidor', sortable: true },
        {
            id: 'marketShare',
            label: 'Cuota de Mercado',
            sortable: true,
            align: 'right',
            format: (value) => `${value}%`
        },
        {
            id: 'growth',
            label: 'Crecimiento',
            sortable: true,
            align: 'right',
            format: (value) => {
                const color = value > 0 ? '#34a853' : '#ea4335';
                return (react_1.default.createElement("span", { style: { color, fontWeight: 'bold' } },
                    value > 0 ? '+' : '',
                    value,
                    "%"));
            }
        },
        {
            id: 'threat',
            label: 'Amenaza',
            sortable: true,
            format: (value) => {
                const threatLevels = {
                    'high': { color: '#ea4335' },
                    'medium': { color: '#fbbc05' },
                    'low': { color: '#34a853' }
                };
                const level = threatLevels[value] || { color: '#5f6368' };
                return (react_1.default.createElement("span", { style: { color: level.color, fontWeight: 'bold' } }, value.charAt(0).toUpperCase() + value.slice(1)));
            }
        }
    ], []);
    // Callbacks optimizados
    const handleCompetitorClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Competidor seleccionado:', row);
    }, []);
    const handleAlertClick = (0, performanceOptimizations_1.useOptimizedCallback)((alert) => {
        console.log('Alerta seleccionada:', alert);
    }, []);
    return (react_1.default.createElement("div", { className: "dashboard-panel" },
        react_1.default.createElement("div", { className: "dashboard-header" },
            react_1.default.createElement("h2", null, "Panel de Control"),
            react_1.default.createElement("div", { className: "dashboard-date" }, new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }))),
        react_1.default.createElement("div", { className: "dashboard-grid" },
            react_1.default.createElement("div", { className: "kpi-row" }, kpiData.map((kpi, index) => (react_1.default.createElement(KPICard, { key: index, title: kpi.title, value: kpi.value, trend: kpi.trend, trendValue: kpi.trendValue, icon: kpi.icon })))),
            react_1.default.createElement("div", { className: "dashboard-row" },
                react_1.default.createElement(Card_1.default, { title: "Rendimiento Financiero", className: "financial-chart-card", loading: loading },
                    react_1.default.createElement(Chart_1.default, { type: "line", labels: chartData.labels, series: chartData.series, height: 300, showGrid: true, showLegend: true })),
                react_1.default.createElement(Card_1.default, { title: "Alertas Recientes", className: "alerts-card", loading: loading },
                    react_1.default.createElement("div", { className: "alerts-list" },
                        react_1.default.createElement(performanceOptimizations_1.BatchedRender, { items: alertsData, batchSize: 10, renderItem: (alert, index) => (react_1.default.createElement("div", { key: index, onClick: () => handleAlertClick(alert) },
                                react_1.default.createElement(AlertItem, { type: alert.type, message: alert.message, time: alert.time }))) })))),
            react_1.default.createElement("div", { className: "dashboard-row" },
                react_1.default.createElement(Card_1.default, { title: "Mapa de Actividad", className: "map-card", loading: loading },
                    react_1.default.createElement("div", { className: "map-placeholder" },
                        react_1.default.createElement("div", { className: "map-region north" }, "Regi\u00F3n Norte"),
                        react_1.default.createElement("div", { className: "map-region central" }, "Regi\u00F3n Central"),
                        react_1.default.createElement("div", { className: "map-region south" }, "Regi\u00F3n Sur"),
                        react_1.default.createElement("div", { className: "map-marker", style: { top: '25%', left: '40%' } },
                            "\uD83C\uDFED",
                            react_1.default.createElement("div", { className: "activity-indicator" }, "+")),
                        react_1.default.createElement("div", { className: "map-marker", style: { top: '45%', left: '55%' } },
                            "\uD83C\uDFEA",
                            react_1.default.createElement("div", { className: "activity-indicator" }, "++")),
                        react_1.default.createElement("div", { className: "map-marker", style: { top: '70%', left: '35%' } },
                            "\uD83C\uDFED",
                            react_1.default.createElement("div", { className: "activity-indicator" }, "+++")))),
                react_1.default.createElement(Card_1.default, { title: "An\u00E1lisis de Competencia", className: "competitors-card", loading: loading },
                    react_1.default.createElement(Table_1.default, { columns: competitorColumns, data: competitorsData, pagination: false, onRowClick: handleCompetitorClick }))))));
};
// Exportar componente optimizado
exports.default = (0, performanceOptimizations_1.optimizeComponent)(DashboardPanel);
