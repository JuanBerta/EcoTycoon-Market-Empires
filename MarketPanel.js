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
// Aplicación de optimizaciones de rendimiento al MarketPanel
const react_1 = __importStar(require("react"));
require("./MarketPanel.css");
const Card_1 = __importDefault(require("../common/Card"));
const Chart_1 = __importDefault(require("../common/Chart"));
const Table_1 = __importDefault(require("../common/Table"));
const performanceOptimizations_1 = require("../../utils/performanceOptimizations");
// Datos simulados para el panel de mercado (optimizados con useMemo)
const useMockData = () => {
    return (0, react_1.useMemo)(() => ({
        priceData: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            series: [
                {
                    name: 'Tu precio',
                    data: [100, 105, 103, 107, 110, 112],
                    color: '#1a73e8'
                },
                {
                    name: 'Precio medio',
                    data: [95, 98, 100, 103, 105, 108],
                    color: '#5f6368'
                },
                {
                    name: 'Competidor principal',
                    data: [90, 95, 97, 100, 102, 105],
                    color: '#ea4335'
                }
            ]
        },
        regions: [
            { id: 'north', name: 'Región Norte', demandLevel: 40, competition: 30, growth: 5 },
            { id: 'central', name: 'Región Central', demandLevel: 65, competition: 70, growth: 2 },
            { id: 'south', name: 'Región Sur', demandLevel: 80, competition: 50, growth: 8 }
        ],
        competitors: [
            {
                id: 'comp1',
                name: 'Competidor Alpha',
                marketShare: 25,
                priceLevel: 'premium',
                quality: 85,
                regions: ['Región Central', 'Región Sur'],
                products: ['Electrónica Avanzada', 'Alimentos Gourmet']
            },
            {
                id: 'comp2',
                name: 'Innovaciones Beta',
                marketShare: 15,
                priceLevel: 'low',
                quality: 65,
                regions: ['Región Norte', 'Región Central'],
                products: ['Electrónica Básica', 'Textiles Industriales']
            },
            {
                id: 'comp3',
                name: 'Corporación Gamma',
                marketShare: 30,
                priceLevel: 'medium',
                quality: 75,
                regions: ['Región Central', 'Región Sur'],
                products: ['Alimentos Básicos', 'Productos Químicos']
            },
            {
                id: 'comp4',
                name: 'Emprendimientos Delta',
                marketShare: 10,
                priceLevel: 'premium',
                quality: 90,
                regions: ['Región Sur'],
                products: ['Artículos de Lujo', 'Textiles Premium']
            }
        ],
        opportunities: [
            {
                id: 'opp1',
                product: 'Alimentos Gourmet',
                region: 'Región Norte',
                demand: 'Alta',
                competition: 'Baja',
                potential: 85,
                investment: 50000
            },
            {
                id: 'opp2',
                product: 'Electrónica Avanzada',
                region: 'Región Central',
                demand: 'Media',
                competition: 'Alta',
                potential: 60,
                investment: 120000
            },
            {
                id: 'opp3',
                product: 'Textiles Premium',
                region: 'Región Sur',
                demand: 'Alta',
                competition: 'Media',
                potential: 75,
                investment: 80000
            },
            {
                id: 'opp4',
                product: 'Productos Químicos',
                region: 'Región Norte',
                demand: 'Baja',
                competition: 'Baja',
                potential: 50,
                investment: 40000
            }
        ]
    }), []);
};
// Componente optimizado para región de demanda
const DemandRegion = react_1.default.memo(({ region }) => {
    return (react_1.default.createElement("div", { key: region.id, className: "demand-region" },
        react_1.default.createElement("div", { className: "region-header" },
            react_1.default.createElement("h4", null, region.name),
            react_1.default.createElement("div", { className: "region-growth" },
                react_1.default.createElement("span", { className: region.growth > 0 ? 'positive' : 'negative' },
                    region.growth > 0 ? '+' : '',
                    region.growth,
                    "%"))),
        react_1.default.createElement("div", { className: "region-metrics" },
            react_1.default.createElement("div", { className: "region-metric" },
                react_1.default.createElement("div", { className: "metric-label" }, "Demanda"),
                react_1.default.createElement("div", { className: "demand-bar-container" },
                    react_1.default.createElement("div", { className: "demand-bar", style: { width: `${region.demandLevel}%` } }),
                    react_1.default.createElement("span", { className: "demand-value" },
                        region.demandLevel,
                        "%"))),
            react_1.default.createElement("div", { className: "region-metric" },
                react_1.default.createElement("div", { className: "metric-label" }, "Competencia"),
                react_1.default.createElement("div", { className: "competition-bar-container" },
                    react_1.default.createElement("div", { className: "competition-bar", style: { width: `${region.competition}%` } }),
                    react_1.default.createElement("span", { className: "competition-value" },
                        region.competition,
                        "%"))))));
});
const MarketPanel = ({ loading = false }) => {
    // Obtener datos optimizados
    const mockData = useMockData();
    // Estados para filtros (usando useState normal ya que cambian con interacción)
    const [categoryFilter, setCategoryFilter] = react_1.default.useState('all');
    const [regionFilter, setRegionFilter] = react_1.default.useState('all');
    const [periodFilter, setPeriodFilter] = react_1.default.useState('6m');
    // Columnas para la tabla de competidores (memoizadas)
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
            id: 'priceLevel',
            label: 'Nivel de Precio',
            sortable: true,
            format: (value) => {
                const priceLevels = {
                    'premium': { label: 'Premium', color: '#673ab7' },
                    'medium': { label: 'Medio', color: '#1a73e8' },
                    'low': { label: 'Económico', color: '#34a853' }
                };
                const level = priceLevels[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "price-level-badge", style: { color: level.color } }, level.label));
            }
        },
        {
            id: 'quality',
            label: 'Calidad',
            sortable: true,
            align: 'right',
            format: (value) => {
                let color = '#ea4335';
                if (value >= 80)
                    color = '#34a853';
                else if (value >= 65)
                    color = '#fbbc05';
                return (react_1.default.createElement("span", { style: { color } },
                    value,
                    "%"));
            }
        },
        {
            id: 'regions',
            label: 'Regiones',
            sortable: false,
            format: (value) => (react_1.default.createElement("div", { className: "regions-list" }, value.map((region, index) => (react_1.default.createElement("span", { key: index, className: "region-tag" }, region)))))
        }
    ], []);
    // Columnas para la tabla de oportunidades (memoizadas)
    const opportunityColumns = (0, react_1.useMemo)(() => [
        { id: 'product', label: 'Producto', sortable: true },
        { id: 'region', label: 'Región', sortable: true },
        {
            id: 'demand',
            label: 'Demanda',
            sortable: true,
            format: (value) => {
                const demandLevels = {
                    'Alta': { color: '#34a853' },
                    'Media': { color: '#fbbc05' },
                    'Baja': { color: '#ea4335' }
                };
                const level = demandLevels[value] || { color: '#5f6368' };
                return (react_1.default.createElement("span", { style: { color: level.color, fontWeight: 'bold' } }, value));
            }
        },
        {
            id: 'competition',
            label: 'Competencia',
            sortable: true,
            format: (value) => {
                const competitionLevels = {
                    'Alta': { color: '#ea4335' },
                    'Media': { color: '#fbbc05' },
                    'Baja': { color: '#34a853' }
                };
                const level = competitionLevels[value] || { color: '#5f6368' };
                return (react_1.default.createElement("span", { style: { color: level.color, fontWeight: 'bold' } }, value));
            }
        },
        {
            id: 'potential',
            label: 'Potencial',
            sortable: true,
            align: 'right',
            format: (value) => {
                let color = '#ea4335';
                if (value >= 75)
                    color = '#34a853';
                else if (value >= 60)
                    color = '#fbbc05';
                return (react_1.default.createElement("div", { className: "potential-container" },
                    react_1.default.createElement("div", { className: "potential-bar", style: { width: `${value}%`, backgroundColor: color } }),
                    react_1.default.createElement("span", { className: "potential-text" },
                        value,
                        "%")));
            }
        },
        {
            id: 'investment',
            label: 'Inversión',
            sortable: true,
            align: 'right',
            format: (value) => `$${value.toLocaleString()}`
        }
    ], []);
    // Acciones para la tabla de oportunidades (memoizadas)
    const opportunityActions = (0, react_1.useMemo)(() => [
        {
            label: 'Explorar',
            icon: '🔍',
            onClick: (row) => console.log('Explorar oportunidad', row)
        },
        {
            label: 'Invertir',
            icon: '💰',
            onClick: (row) => console.log('Invertir en oportunidad', row)
        }
    ], []);
    // Callbacks optimizados
    const handleCategoryChange = (0, performanceOptimizations_1.useOptimizedCallback)((e) => {
        setCategoryFilter(e.target.value);
    }, []);
    const handleRegionChange = (0, performanceOptimizations_1.useOptimizedCallback)((e) => {
        setRegionFilter(e.target.value);
    }, []);
    const handlePeriodChange = (0, performanceOptimizations_1.useOptimizedCallback)((e) => {
        setPeriodFilter(e.target.value);
    }, []);
    const handleCompetitorClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionado competidor', row);
    }, []);
    const handleOpportunityClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionada oportunidad', row);
    }, []);
    // Renderizado optimizado de regiones de demanda
    const renderDemandRegions = (0, react_1.useCallback)(() => {
        return (react_1.default.createElement("div", { className: "demand-map" },
            react_1.default.createElement(performanceOptimizations_1.BatchedRender, { items: mockData.regions, batchSize: 10, renderItem: (region, index) => (react_1.default.createElement(DemandRegion, { key: region.id, region: region })) })));
    }, [mockData.regions]);
    return (react_1.default.createElement("div", { className: "market-panel" },
        react_1.default.createElement("div", { className: "market-header" },
            react_1.default.createElement("h2", null, "An\u00E1lisis de Mercado"),
            react_1.default.createElement("div", { className: "market-filters" },
                react_1.default.createElement("div", { className: "filter-group" },
                    react_1.default.createElement("label", null, "Categor\u00EDa:"),
                    react_1.default.createElement("select", { value: categoryFilter, onChange: handleCategoryChange },
                        react_1.default.createElement("option", { value: "all" }, "Todas"),
                        react_1.default.createElement("option", { value: "food" }, "Alimentos"),
                        react_1.default.createElement("option", { value: "electronics" }, "Electr\u00F3nica"),
                        react_1.default.createElement("option", { value: "textiles" }, "Textiles"),
                        react_1.default.createElement("option", { value: "chemicals" }, "Qu\u00EDmicos"),
                        react_1.default.createElement("option", { value: "luxury" }, "Lujo"))),
                react_1.default.createElement("div", { className: "filter-group" },
                    react_1.default.createElement("label", null, "Regi\u00F3n:"),
                    react_1.default.createElement("select", { value: regionFilter, onChange: handleRegionChange },
                        react_1.default.createElement("option", { value: "all" }, "Todas"),
                        react_1.default.createElement("option", { value: "north" }, "Norte"),
                        react_1.default.createElement("option", { value: "central" }, "Central"),
                        react_1.default.createElement("option", { value: "south" }, "Sur"))),
                react_1.default.createElement("div", { className: "filter-group" },
                    react_1.default.createElement("label", null, "Per\u00EDodo:"),
                    react_1.default.createElement("select", { value: periodFilter, onChange: handlePeriodChange },
                        react_1.default.createElement("option", { value: "1m" }, "1 mes"),
                        react_1.default.createElement("option", { value: "3m" }, "3 meses"),
                        react_1.default.createElement("option", { value: "6m" }, "6 meses"),
                        react_1.default.createElement("option", { value: "1y" }, "1 a\u00F1o"))),
                react_1.default.createElement("button", { className: "filter-apply-button" }, "Aplicar Filtros"))),
        react_1.default.createElement("div", { className: "market-grid" },
            react_1.default.createElement(Card_1.default, { title: "Tendencias de Precios", className: "price-trends-card", loading: loading },
                react_1.default.createElement(Chart_1.default, { type: "line", labels: mockData.priceData.labels, series: mockData.priceData.series, height: 300, showGrid: true, showLegend: true })),
            react_1.default.createElement("div", { className: "market-row" },
                react_1.default.createElement(Card_1.default, { title: "Mapa de Calor de Demanda", className: "demand-map-card", loading: loading }, renderDemandRegions()),
                react_1.default.createElement(Card_1.default, { title: "An\u00E1lisis de Competencia", className: "competition-card", loading: loading },
                    react_1.default.createElement(Table_1.default, { columns: competitorColumns, data: mockData.competitors, pagination: false, actions: [
                            {
                                label: 'Detalles',
                                icon: '🔍',
                                onClick: (row) => console.log('Ver detalles de competidor', row)
                            }
                        ], onRowClick: handleCompetitorClick }))),
            react_1.default.createElement(Card_1.default, { title: "Oportunidades Detectadas", className: "opportunities-card", loading: loading },
                react_1.default.createElement(Table_1.default, { columns: opportunityColumns, data: mockData.opportunities, pagination: true, rowsPerPage: 5, actions: opportunityActions, onRowClick: handleOpportunityClick })))));
};
// Exportar componente optimizado
exports.default = (0, performanceOptimizations_1.optimizeComponent)(MarketPanel);
