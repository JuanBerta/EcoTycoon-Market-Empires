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
// Aplicación de optimizaciones de rendimiento al ProductionPanel
const react_1 = __importStar(require("react"));
require("./ProductionPanel.css");
const Card_1 = __importDefault(require("../common/Card"));
const Table_1 = __importDefault(require("../common/Table"));
const Chart_1 = __importDefault(require("../common/Chart"));
const FactoryCard_1 = __importDefault(require("./FactoryCard"));
const performanceOptimizations_1 = require("../../utils/performanceOptimizations");
// Datos simulados para el panel de producción (optimizados con useMemo)
const useMockData = () => {
    return (0, react_1.useMemo)(() => ({
        factories: [
            {
                id: 'factory1',
                name: 'Fábrica de Alimentos',
                type: 'food',
                efficiency: 85,
                capacity: 100,
                utilization: 75,
                location: 'Región Central',
                products: ['Alimentos Básicos', 'Alimentos Gourmet']
            },
            {
                id: 'factory2',
                name: 'Planta Electrónica',
                type: 'electronics',
                efficiency: 72,
                capacity: 80,
                utilization: 90,
                location: 'Región Sur',
                products: ['Electrónica Básica', 'Componentes Avanzados']
            },
            {
                id: 'factory3',
                name: 'Textiles Modernos',
                type: 'textiles',
                efficiency: 80,
                capacity: 120,
                utilization: 60,
                location: 'Región Norte',
                products: ['Ropa Básica', 'Textiles Industriales']
            }
        ],
        productionLines: [
            {
                id: 'line1',
                factoryId: 'factory1',
                product: 'Alimentos Básicos',
                quantity: 100,
                quality: 75,
                timeRemaining: 120, // en minutos
                progress: 67,
                cost: 5000,
                status: 'active'
            },
            {
                id: 'line2',
                factoryId: 'factory2',
                product: 'Electrónica Básica',
                quantity: 50,
                quality: 85,
                timeRemaining: 240, // en minutos
                progress: 33,
                cost: 12000,
                status: 'active'
            },
            {
                id: 'line3',
                factoryId: 'factory3',
                product: 'Ropa Básica',
                quantity: 75,
                quality: 80,
                timeRemaining: 180, // en minutos
                progress: 50,
                cost: 7500,
                status: 'active'
            },
            {
                id: 'line4',
                factoryId: 'factory1',
                product: 'Alimentos Gourmet',
                quantity: 25,
                quality: 95,
                timeRemaining: 0, // en minutos
                progress: 100,
                cost: 8000,
                status: 'completed'
            }
        ],
        resources: [
            { id: 'res1', name: 'Materias Primas Alimentarias', stock: 250, demand: 300, status: 'low' },
            { id: 'res2', name: 'Componentes Electrónicos', stock: 180, demand: 100, status: 'high' },
            { id: 'res3', name: 'Materiales Textiles', stock: 120, demand: 125, status: 'optimal' },
            { id: 'res4', name: 'Embalajes', stock: 400, demand: 350, status: 'high' },
            { id: 'res5', name: 'Productos Químicos', stock: 80, demand: 150, status: 'critical' }
        ],
        qualityData: {
            labels: ['Alimentos', 'Electrónica', 'Textiles', 'Químicos', 'Lujo'],
            series: [
                {
                    name: 'Tu Calidad',
                    data: [85, 78, 80, 65, 90],
                    color: '#1a73e8'
                },
                {
                    name: 'Media del Mercado',
                    data: [70, 75, 72, 68, 82],
                    color: '#5f6368'
                }
            ]
        }
    }), []);
};
// Componente optimizado para el panel de producción
const ProductionPanel = ({ loading = false }) => {
    var _a;
    // Obtener datos optimizados
    const mockData = useMockData();
    // Estado para fábrica seleccionada (usando useState normal ya que cambia con interacción)
    const [selectedFactory, setSelectedFactory] = react_1.default.useState(null);
    // Filtrar líneas de producción por fábrica seleccionada (optimizado)
    const filteredProductionLines = (0, react_1.useMemo)(() => {
        return selectedFactory
            ? mockData.productionLines.filter(line => line.factoryId === selectedFactory)
            : mockData.productionLines;
    }, [selectedFactory, mockData.productionLines]);
    // Columnas para la tabla de líneas de producción (memoizadas)
    const productionColumns = (0, react_1.useMemo)(() => [
        { id: 'product', label: 'Producto', sortable: true },
        {
            id: 'quantity',
            label: 'Cantidad',
            sortable: true,
            align: 'right'
        },
        {
            id: 'quality',
            label: 'Calidad',
            sortable: true,
            align: 'right',
            format: (value) => `${value}%`
        },
        {
            id: 'timeRemaining',
            label: 'Tiempo Restante',
            sortable: true,
            align: 'right',
            format: (value) => {
                if (value === 0)
                    return 'Completado';
                const hours = Math.floor(value / 60);
                const minutes = value % 60;
                return `${hours}h ${minutes}m`;
            }
        },
        {
            id: 'progress',
            label: 'Progreso',
            sortable: true,
            format: (value) => (react_1.default.createElement("div", { className: "progress-bar-container" },
                react_1.default.createElement("div", { className: "progress-bar", style: { width: `${value}%` } }),
                react_1.default.createElement("span", { className: "progress-text" },
                    value,
                    "%")))
        },
        {
            id: 'status',
            label: 'Estado',
            sortable: true,
            format: (value) => {
                const statusMap = {
                    'active': { label: 'Activo', color: '#34a853' },
                    'paused': { label: 'Pausado', color: '#fbbc05' },
                    'completed': { label: 'Completado', color: '#1a73e8' },
                    'error': { label: 'Error', color: '#ea4335' }
                };
                const status = statusMap[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "status-badge", style: { backgroundColor: status.color } }, status.label));
            }
        }
    ], []);
    // Columnas para la tabla de recursos (memoizadas)
    const resourceColumns = (0, react_1.useMemo)(() => [
        { id: 'name', label: 'Recurso', sortable: true },
        {
            id: 'stock',
            label: 'Stock Actual',
            sortable: true,
            align: 'right'
        },
        {
            id: 'demand',
            label: 'Demanda Semanal',
            sortable: true,
            align: 'right'
        },
        {
            id: 'status',
            label: 'Estado',
            sortable: true,
            format: (value) => {
                const statusMap = {
                    'critical': { label: 'Crítico', color: '#ea4335' },
                    'low': { label: 'Bajo', color: '#fbbc05' },
                    'optimal': { label: 'Óptimo', color: '#34a853' },
                    'high': { label: 'Exceso', color: '#1a73e8' }
                };
                const status = statusMap[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "status-badge", style: { backgroundColor: status.color } }, status.label));
            }
        }
    ], []);
    // Acciones para la tabla de recursos (memoizadas)
    const resourceActions = (0, react_1.useMemo)(() => [
        {
            label: 'Pedir',
            icon: '🛒',
            onClick: (row) => console.log('Pedir recurso', row),
            disabled: (row) => row.status === 'high'
        }
    ], []);
    // Acciones para la tabla de líneas de producción (memoizadas)
    const productionActions = (0, react_1.useMemo)(() => [
        {
            label: 'Pausar',
            icon: '⏸️',
            onClick: (row) => console.log('Pausar línea', row),
            disabled: (row) => row.status !== 'active'
        },
        {
            label: 'Detalles',
            icon: '🔍',
            onClick: (row) => console.log('Ver detalles', row),
            disabled: () => false
        }
    ], []);
    // Callback optimizado para selección de fábrica
    const handleFactorySelect = (0, performanceOptimizations_1.useOptimizedCallback)((factoryId) => {
        setSelectedFactory(prevId => prevId === factoryId ? null : factoryId);
    }, []);
    // Callback optimizado para click en fila de producción
    const handleProductionRowClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionada línea', row);
    }, []);
    // Renderizado optimizado de tarjetas de fábricas
    const renderFactoryCards = (0, react_1.useCallback)(() => {
        return (react_1.default.createElement("div", { className: "factories-grid" },
            mockData.factories.map(factory => (react_1.default.createElement(FactoryCard_1.default, { key: factory.id, factory: factory, selected: selectedFactory === factory.id, onClick: () => handleFactorySelect(factory.id), loading: loading }))),
            react_1.default.createElement("div", { className: "new-factory-card" },
                react_1.default.createElement("div", { className: "new-factory-content" },
                    react_1.default.createElement("div", { className: "plus-icon" }, "+"),
                    react_1.default.createElement("div", { className: "new-factory-text" }, "Nueva F\u00E1brica")))));
    }, [mockData.factories, selectedFactory, loading, handleFactorySelect]);
    return (react_1.default.createElement("div", { className: "production-panel" },
        react_1.default.createElement("div", { className: "production-header" },
            react_1.default.createElement("h2", null, "Gesti\u00F3n de Producci\u00F3n"),
            react_1.default.createElement("div", { className: "production-actions" },
                react_1.default.createElement("button", { className: "action-button primary" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nueva F\u00E1brica"),
                react_1.default.createElement("button", { className: "action-button" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nueva L\u00EDnea"))),
        react_1.default.createElement("div", { className: "production-summary" },
            react_1.default.createElement(Card_1.default, { title: "Resumen de Producci\u00F3n", loading: loading },
                react_1.default.createElement("div", { className: "summary-stats" },
                    react_1.default.createElement("div", { className: "stat-item" },
                        react_1.default.createElement("div", { className: "stat-label" }, "Eficiencia Global"),
                        react_1.default.createElement("div", { className: "stat-value" }, "78%")),
                    react_1.default.createElement("div", { className: "stat-item" },
                        react_1.default.createElement("div", { className: "stat-label" }, "Capacidad Utilizada"),
                        react_1.default.createElement("div", { className: "stat-value" }, "75%")),
                    react_1.default.createElement("div", { className: "stat-item" },
                        react_1.default.createElement("div", { className: "stat-label" }, "L\u00EDneas Activas"),
                        react_1.default.createElement("div", { className: "stat-value" }, "3")),
                    react_1.default.createElement("div", { className: "stat-item" },
                        react_1.default.createElement("div", { className: "stat-label" }, "Costo Operativo"),
                        react_1.default.createElement("div", { className: "stat-value" }, "$24,500"))))),
        react_1.default.createElement("div", { className: "factories-section" },
            react_1.default.createElement("h3", null, "F\u00E1bricas"),
            renderFactoryCards()),
        react_1.default.createElement("div", { className: "production-grid" },
            react_1.default.createElement(Card_1.default, { title: `Líneas de Producción ${selectedFactory ? '- ' + ((_a = mockData.factories.find(f => f.id === selectedFactory)) === null || _a === void 0 ? void 0 : _a.name) : 'Activas'}`, loading: loading, actions: react_1.default.createElement("button", { className: "action-button small" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nueva L\u00EDnea") },
                react_1.default.createElement(Table_1.default, { columns: productionColumns, data: filteredProductionLines, pagination: true, rowsPerPage: 5, actions: productionActions, onRowClick: handleProductionRowClick, emptyMessage: "No hay l\u00EDneas de producci\u00F3n activas" })),
            react_1.default.createElement("div", { className: "resources-quality-grid" },
                react_1.default.createElement(Card_1.default, { title: "Recursos", loading: loading, className: "resources-card" },
                    react_1.default.createElement(Table_1.default, { columns: resourceColumns, data: mockData.resources, pagination: false, actions: resourceActions, emptyMessage: "No hay recursos disponibles" })),
                react_1.default.createElement(Card_1.default, { title: "Control de Calidad", loading: loading, className: "quality-card" },
                    react_1.default.createElement(Chart_1.default, { type: "bar", labels: mockData.qualityData.labels, series: mockData.qualityData.series, height: 220, showGrid: true, showLegend: true }))))));
};
// Exportar componente optimizado
exports.default = (0, performanceOptimizations_1.optimizeComponent)(ProductionPanel);
