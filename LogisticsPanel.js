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
// Aplicación de optimizaciones de rendimiento al LogisticsPanel
const react_1 = __importStar(require("react"));
require("./LogisticsPanel.css");
const Card_1 = __importDefault(require("../common/Card"));
const Table_1 = __importDefault(require("../common/Table"));
const Chart_1 = __importDefault(require("../common/Chart"));
const performanceOptimizations_1 = require("../../utils/performanceOptimizations");
// Datos simulados para el panel de logística (optimizados con useMemo)
const useMockData = () => {
    return (0, react_1.useMemo)(() => ({
        warehouses: [
            {
                id: 'wh1',
                name: 'Almacén Central',
                type: 'general',
                capacity: 1000,
                occupation: 85,
                location: 'Región Central',
                products: ['Alimentos', 'Electrónica', 'Textiles']
            },
            {
                id: 'wh2',
                name: 'Almacén Refrigerado',
                type: 'refrigerated',
                capacity: 500,
                occupation: 62,
                location: 'Región Norte',
                products: ['Alimentos Perecederos', 'Productos Químicos']
            },
            {
                id: 'wh3',
                name: 'Almacén de Alta Seguridad',
                type: 'secure',
                capacity: 300,
                occupation: 40,
                location: 'Región Sur',
                products: ['Electrónica Avanzada', 'Artículos de Lujo']
            }
        ],
        routes: [
            {
                id: 'route1',
                origin: 'Fábrica de Alimentos',
                destination: 'Almacén Central',
                distance: 120,
                time: 2.5,
                cost: 1200,
                efficiency: 85,
                products: ['Alimentos Básicos', 'Alimentos Gourmet']
            },
            {
                id: 'route2',
                origin: 'Almacén Central',
                destination: 'Tienda Principal',
                distance: 50,
                time: 1.0,
                cost: 500,
                efficiency: 90,
                products: ['Alimentos Básicos', 'Electrónica Básica']
            },
            {
                id: 'route3',
                origin: 'Planta Electrónica',
                destination: 'Almacén de Alta Seguridad',
                distance: 200,
                time: 4.0,
                cost: 2000,
                efficiency: 75,
                products: ['Electrónica Avanzada', 'Componentes']
            },
            {
                id: 'route4',
                origin: 'Almacén Refrigerado',
                destination: 'Tienda Norte',
                distance: 80,
                time: 1.5,
                cost: 800,
                efficiency: 80,
                products: ['Alimentos Perecederos']
            }
        ],
        supplyPlan: [
            {
                id: 'supply1',
                product: 'Alimentos Básicos',
                stock: 250,
                demand: 300,
                status: 'shortage',
                supplier: 'Proveedor Alpha',
                leadTime: 3,
                orderCost: 15000
            },
            {
                id: 'supply2',
                product: 'Electrónica Básica',
                stock: 180,
                demand: 100,
                status: 'excess',
                supplier: 'Proveedor Beta',
                leadTime: 5,
                orderCost: 25000
            },
            {
                id: 'supply3',
                product: 'Ropa Básica',
                stock: 120,
                demand: 125,
                status: 'optimal',
                supplier: 'Proveedor Gamma',
                leadTime: 4,
                orderCost: 12000
            },
            {
                id: 'supply4',
                product: 'Componentes Electrónicos',
                stock: 90,
                demand: 150,
                status: 'critical',
                supplier: 'Proveedor Delta',
                leadTime: 7,
                orderCost: 30000
            }
        ],
        logisticsCosts: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            series: [
                {
                    name: 'Transporte',
                    data: [12000, 13500, 13000, 14500, 15000, 14000],
                    color: '#1a73e8'
                },
                {
                    name: 'Almacenamiento',
                    data: [8000, 8200, 8500, 9000, 9200, 9500],
                    color: '#34a853'
                },
                {
                    name: 'Gestión',
                    data: [3000, 3200, 3100, 3300, 3400, 3500],
                    color: '#fbbc05'
                }
            ]
        }
    }), []);
};
// Componente optimizado para tarjeta de almacén
const WarehouseCard = react_1.default.memo(({ warehouse, selected, onClick }) => {
    return (react_1.default.createElement("div", { key: warehouse.id, className: `warehouse-card ${selected ? 'selected' : ''}`, onClick: onClick },
        react_1.default.createElement("div", { className: "warehouse-icon" }, warehouse.type === 'refrigerated' ? '❄️' :
            warehouse.type === 'secure' ? '🔒' : '🏢'),
        react_1.default.createElement("div", { className: "warehouse-info" },
            react_1.default.createElement("h4", { className: "warehouse-name" }, warehouse.name),
            react_1.default.createElement("div", { className: "warehouse-location" }, warehouse.location),
            react_1.default.createElement("div", { className: "warehouse-capacity" },
                react_1.default.createElement("div", { className: "capacity-bar-container" },
                    react_1.default.createElement("div", { className: "capacity-bar", style: {
                            width: `${warehouse.occupation}%`,
                            backgroundColor: warehouse.occupation > 90 ? '#ea4335' :
                                warehouse.occupation > 75 ? '#fbbc05' : '#34a853'
                        } }),
                    react_1.default.createElement("span", { className: "capacity-text" },
                        warehouse.occupation,
                        "% de ",
                        warehouse.capacity,
                        " unidades"))))));
});
const LogisticsPanel = ({ loading = false }) => {
    // Obtener datos optimizados
    const mockData = useMockData();
    // Estado para almacén seleccionado (usando useState normal ya que cambia con interacción)
    const [selectedWarehouse, setSelectedWarehouse] = react_1.default.useState(null);
    // Columnas para la tabla de rutas (memoizadas)
    const routeColumns = (0, react_1.useMemo)(() => [
        { id: 'origin', label: 'Origen', sortable: true },
        { id: 'destination', label: 'Destino', sortable: true },
        {
            id: 'distance',
            label: 'Distancia',
            sortable: true,
            align: 'right',
            format: (value) => `${value} km`
        },
        {
            id: 'time',
            label: 'Tiempo',
            sortable: true,
            align: 'right',
            format: (value) => `${value} h`
        },
        {
            id: 'cost',
            label: 'Costo',
            sortable: true,
            align: 'right',
            format: (value) => `$${value}`
        },
        {
            id: 'efficiency',
            label: 'Eficiencia',
            sortable: true,
            align: 'right',
            format: (value) => {
                let color = '#ea4335';
                if (value >= 80)
                    color = '#34a853';
                else if (value >= 70)
                    color = '#fbbc05';
                return (react_1.default.createElement("span", { style: { color, fontWeight: 'bold' } },
                    value,
                    "%"));
            }
        }
    ], []);
    // Columnas para la tabla de plan de suministro (memoizadas)
    const supplyColumns = (0, react_1.useMemo)(() => [
        { id: 'product', label: 'Producto', sortable: true },
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
                    'shortage': { label: 'Escasez', color: '#fbbc05' },
                    'optimal': { label: 'Óptimo', color: '#34a853' },
                    'excess': { label: 'Exceso', color: '#1a73e8' }
                };
                const status = statusMap[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "status-badge", style: { backgroundColor: status.color } }, status.label));
            }
        },
        {
            id: 'leadTime',
            label: 'Tiempo de Entrega',
            sortable: true,
            align: 'right',
            format: (value) => `${value} días`
        },
        {
            id: 'orderCost',
            label: 'Costo de Pedido',
            sortable: true,
            align: 'right',
            format: (value) => `$${value}`
        }
    ], []);
    // Acciones para la tabla de plan de suministro (memoizadas)
    const supplyActions = (0, react_1.useMemo)(() => [
        {
            label: 'Pedir',
            icon: '🛒',
            onClick: (row) => console.log('Pedir suministro', row),
            disabled: (row) => row.status === 'excess'
        },
        {
            label: 'Ajustar',
            icon: '⚙️',
            onClick: (row) => console.log('Ajustar plan', row),
            disabled: () => false
        }
    ], []);
    // Callbacks optimizados
    const handleWarehouseSelect = (0, performanceOptimizations_1.useOptimizedCallback)((warehouseId) => {
        setSelectedWarehouse(prevId => prevId === warehouseId ? null : warehouseId);
    }, []);
    const handleRouteClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionada ruta', row);
    }, []);
    const handleSupplyClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionado suministro', row);
    }, []);
    // Renderizado optimizado de tarjetas de almacenes
    const renderWarehouseCards = (0, react_1.useCallback)(() => {
        return (react_1.default.createElement("div", { className: "warehouses-grid" },
            react_1.default.createElement(performanceOptimizations_1.BatchedRender, { items: mockData.warehouses, batchSize: 10, renderItem: (warehouse, index) => (react_1.default.createElement(WarehouseCard, { key: warehouse.id, warehouse: warehouse, selected: selectedWarehouse === warehouse.id, onClick: () => handleWarehouseSelect(warehouse.id) })) }),
            react_1.default.createElement("div", { className: "new-warehouse-card" },
                react_1.default.createElement("div", { className: "new-warehouse-content" },
                    react_1.default.createElement("div", { className: "plus-icon" }, "+"),
                    react_1.default.createElement("div", { className: "new-warehouse-text" }, "Nuevo Almac\u00E9n")))));
    }, [mockData.warehouses, selectedWarehouse, handleWarehouseSelect]);
    return (react_1.default.createElement("div", { className: "logistics-panel" },
        react_1.default.createElement("div", { className: "logistics-header" },
            react_1.default.createElement("h2", null, "Gesti\u00F3n Log\u00EDstica"),
            react_1.default.createElement("div", { className: "logistics-actions" },
                react_1.default.createElement("button", { className: "action-button primary" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nuevo Almac\u00E9n"),
                react_1.default.createElement("button", { className: "action-button" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nueva Ruta"))),
        react_1.default.createElement("div", { className: "logistics-grid" },
            react_1.default.createElement(Card_1.default, { title: "Red de Distribuci\u00F3n", className: "distribution-map-card", loading: loading },
                react_1.default.createElement("div", { className: "distribution-map" },
                    react_1.default.createElement("div", { className: "map-placeholder" },
                        react_1.default.createElement("div", { className: "map-region north" }, "Norte"),
                        react_1.default.createElement("div", { className: "map-region central" }, "Central"),
                        react_1.default.createElement("div", { className: "map-region south" }, "Sur"),
                        react_1.default.createElement("div", { className: "map-node factory", style: { top: '30%', left: '40%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83C\uDFED"),
                            react_1.default.createElement("div", { className: "node-label" }, "F\u00E1brica de Alimentos")),
                        react_1.default.createElement("div", { className: "map-node factory", style: { top: '60%', left: '60%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83C\uDFED"),
                            react_1.default.createElement("div", { className: "node-label" }, "Planta Electr\u00F3nica")),
                        react_1.default.createElement("div", { className: "map-node warehouse", style: { top: '45%', left: '50%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83C\uDFE2"),
                            react_1.default.createElement("div", { className: "node-label" }, "Almac\u00E9n Central")),
                        react_1.default.createElement("div", { className: "map-node warehouse", style: { top: '25%', left: '30%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\u2744\uFE0F"),
                            react_1.default.createElement("div", { className: "node-label" }, "Almac\u00E9n Refrigerado")),
                        react_1.default.createElement("div", { className: "map-node warehouse", style: { top: '70%', left: '70%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83D\uDD12"),
                            react_1.default.createElement("div", { className: "node-label" }, "Almac\u00E9n de Alta Seguridad")),
                        react_1.default.createElement("div", { className: "map-node store", style: { top: '40%', left: '65%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83C\uDFEA"),
                            react_1.default.createElement("div", { className: "node-label" }, "Tienda Principal")),
                        react_1.default.createElement("div", { className: "map-node store", style: { top: '20%', left: '45%' } },
                            react_1.default.createElement("div", { className: "node-icon" }, "\uD83C\uDFEA"),
                            react_1.default.createElement("div", { className: "node-label" }, "Tienda Norte")),
                        react_1.default.createElement("svg", { className: "routes-svg" },
                            react_1.default.createElement("path", { d: "M 40% 30% L 50% 45%", className: "route-path" }),
                            react_1.default.createElement("path", { d: "M 50% 45% L 65% 40%", className: "route-path" }),
                            react_1.default.createElement("path", { d: "M 60% 60% L 70% 70%", className: "route-path" }),
                            react_1.default.createElement("path", { d: "M 30% 25% L 45% 20%", className: "route-path" }))))),
            react_1.default.createElement("div", { className: "warehouses-section" },
                react_1.default.createElement("h3", null, "Almacenes"),
                renderWarehouseCards()),
            react_1.default.createElement(Card_1.default, { title: "Rutas de Distribuci\u00F3n", className: "routes-card", loading: loading },
                react_1.default.createElement(Table_1.default, { columns: routeColumns, data: mockData.routes, pagination: true, rowsPerPage: 5, actions: [
                        {
                            label: 'Optimizar',
                            icon: '⚡',
                            onClick: (row) => console.log('Optimizar ruta', row)
                        },
                        {
                            label: 'Detalles',
                            icon: '🔍',
                            onClick: (row) => console.log('Ver detalles de ruta', row)
                        }
                    ], onRowClick: handleRouteClick })),
            react_1.default.createElement("div", { className: "supply-costs-grid" },
                react_1.default.createElement(Card_1.default, { title: "Planificaci\u00F3n de Suministro", className: "supply-card", loading: loading },
                    react_1.default.createElement(Table_1.default, { columns: supplyColumns, data: mockData.supplyPlan, pagination: false, actions: supplyActions, onRowClick: handleSupplyClick })),
                react_1.default.createElement(Card_1.default, { title: "Costos Log\u00EDsticos", className: "costs-card", loading: loading },
                    react_1.default.createElement(Chart_1.default, { type: "area", labels: mockData.logisticsCosts.labels, series: mockData.logisticsCosts.series, height: 220, showGrid: true, showLegend: true }))))));
};
// Exportar componente optimizado
exports.default = (0, performanceOptimizations_1.optimizeComponent)(LogisticsPanel);
