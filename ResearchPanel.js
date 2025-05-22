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
// Aplicación de optimizaciones de rendimiento al ResearchPanel
const react_1 = __importStar(require("react"));
require("./ResearchPanel.css");
const Card_1 = __importDefault(require("../common/Card"));
const Table_1 = __importDefault(require("../common/Table"));
const performanceOptimizations_1 = require("../../utils/performanceOptimizations");
// Datos simulados para el panel de I+D (optimizados con useMemo)
const useMockData = () => {
    return (0, react_1.useMemo)(() => ({
        technologies: [
            {
                id: 'tech1',
                name: 'Automatización Avanzada',
                category: 'production',
                level: 2,
                currentLevel: 1,
                cost: 50000,
                timeRequired: 14,
                benefits: ['+20% Eficiencia de Producción', '-15% Costos Operativos'],
                description: 'Sistemas avanzados de automatización para líneas de producción.'
            },
            {
                id: 'tech2',
                name: 'Eco-materiales',
                category: 'materials',
                level: 1,
                currentLevel: 0,
                cost: 30000,
                timeRequired: 10,
                benefits: ['-15% Costo de Materiales', '+10% Calidad de Producto'],
                description: 'Materiales sostenibles y ecológicos para producción.'
            },
            {
                id: 'tech3',
                name: 'Logística Inteligente',
                category: 'logistics',
                level: 2,
                currentLevel: 0,
                cost: 45000,
                timeRequired: 12,
                benefits: ['-20% Tiempo de Entrega', '-10% Costos Logísticos'],
                description: 'Sistemas de optimización de rutas y gestión de inventario.'
            },
            {
                id: 'tech4',
                name: 'Análisis Predictivo',
                category: 'market',
                level: 3,
                currentLevel: 1,
                cost: 60000,
                timeRequired: 18,
                benefits: ['+25% Precisión de Previsión', '+15% Detección de Oportunidades'],
                description: 'Algoritmos avanzados para predecir tendencias de mercado.'
            },
            {
                id: 'tech5',
                name: 'Energía Renovable',
                category: 'infrastructure',
                level: 2,
                currentLevel: 0,
                cost: 70000,
                timeRequired: 20,
                benefits: ['-30% Costos Energéticos', '+20% Reputación'],
                description: 'Implementación de fuentes de energía renovable en instalaciones.'
            }
        ],
        activeProjects: [
            {
                id: 'proj1',
                name: 'Automatización Avanzada',
                investment: 50000,
                progress: 67,
                timeRemaining: 5,
                researchers: 3,
                status: 'active'
            },
            {
                id: 'proj2',
                name: 'Análisis Predictivo',
                investment: 60000,
                progress: 33,
                timeRemaining: 12,
                researchers: 4,
                status: 'active'
            }
        ],
        productPrototypes: [
            {
                id: 'proto1',
                name: 'Alimentos Orgánicos Premium',
                category: 'food',
                developmentCost: 25000,
                marketPotential: 85,
                timeToMarket: 8,
                status: 'testing'
            },
            {
                id: 'proto2',
                name: 'Dispositivo Electrónico Avanzado',
                category: 'electronics',
                developmentCost: 120000,
                marketPotential: 90,
                timeToMarket: 15,
                status: 'development'
            },
            {
                id: 'proto3',
                name: 'Textiles Ecológicos',
                category: 'textiles',
                developmentCost: 40000,
                marketPotential: 75,
                timeToMarket: 6,
                status: 'ready'
            }
        ],
        competitorInnovation: {
            labels: ['Alimentos', 'Electrónica', 'Textiles', 'Químicos', 'Lujo'],
            series: [
                {
                    name: 'Tu Innovación',
                    data: [70, 85, 60, 50, 75],
                    color: '#1a73e8'
                },
                {
                    name: 'Competidor Alpha',
                    data: [80, 70, 50, 60, 65],
                    color: '#ea4335'
                },
                {
                    name: 'Competidor Beta',
                    data: [60, 90, 70, 40, 80],
                    color: '#fbbc05'
                }
            ]
        }
    }), []);
};
// Componente optimizado para tarjeta de tecnología
const TechCard = react_1.default.memo(({ tech, onResearch }) => {
    // Funciones auxiliares para categorías (memoizadas)
    const getCategoryName = (0, react_1.useCallback)((category) => {
        const categories = {
            'production': 'Producción',
            'materials': 'Materiales',
            'logistics': 'Logística',
            'market': 'Mercado',
            'infrastructure': 'Infraestructura'
        };
        return categories[category] || category;
    }, []);
    const getCategoryIcon = (0, react_1.useCallback)((category) => {
        const icons = {
            'production': '🏭',
            'materials': '🧪',
            'logistics': '🚚',
            'market': '📊',
            'infrastructure': '🏢'
        };
        return icons[category] || '🔬';
    }, []);
    const getCategoryColor = (0, react_1.useCallback)((category, opacity) => {
        const colors = {
            'production': `rgba(26, 115, 232, ${opacity})`,
            'materials': `rgba(52, 168, 83, ${opacity})`,
            'logistics': `rgba(251, 188, 5, ${opacity})`,
            'market': `rgba(234, 67, 53, ${opacity})`,
            'infrastructure': `rgba(103, 58, 183, ${opacity})`
        };
        return colors[category] || `rgba(95, 99, 104, ${opacity})`;
    }, []);
    // Manejador de click optimizado
    const handleResearchClick = (0, react_1.useCallback)(() => {
        onResearch(tech.id);
    }, [tech.id, onResearch]);
    return (react_1.default.createElement("div", { className: "tech-card" },
        react_1.default.createElement("div", { className: "tech-header" },
            react_1.default.createElement("div", { className: "tech-icon", style: {
                    backgroundColor: getCategoryColor(tech.category, 0.1),
                    color: getCategoryColor(tech.category, 1)
                } }, getCategoryIcon(tech.category)),
            react_1.default.createElement("div", { className: "tech-title" },
                react_1.default.createElement("h4", { className: "tech-name" }, tech.name),
                react_1.default.createElement("div", { className: "tech-category" }, getCategoryName(tech.category))),
            react_1.default.createElement("div", { className: "tech-level" },
                react_1.default.createElement("div", { className: "level-indicator" },
                    react_1.default.createElement("span", { className: "current-level" }, tech.currentLevel),
                    react_1.default.createElement("span", { className: "level-separator" }, "/"),
                    react_1.default.createElement("span", { className: "max-level" }, tech.level)),
                react_1.default.createElement("div", { className: "level-label" }, "Nivel"))),
        react_1.default.createElement("div", { className: "tech-description" }, tech.description),
        react_1.default.createElement("div", { className: "tech-benefits" },
            react_1.default.createElement("div", { className: "benefits-label" }, "Beneficios:"),
            react_1.default.createElement("ul", { className: "benefits-list" }, tech.benefits.map((benefit, index) => (react_1.default.createElement("li", { key: index, className: "benefit-item" }, benefit))))),
        react_1.default.createElement("div", { className: "tech-footer" },
            react_1.default.createElement("div", { className: "tech-cost" },
                react_1.default.createElement("div", { className: "cost-label" }, "Costo:"),
                react_1.default.createElement("div", { className: "cost-value" },
                    "$",
                    tech.cost.toLocaleString())),
            react_1.default.createElement("div", { className: "tech-time" },
                react_1.default.createElement("div", { className: "time-label" }, "Tiempo:"),
                react_1.default.createElement("div", { className: "time-value" },
                    tech.timeRequired,
                    " d\u00EDas")),
            react_1.default.createElement("button", { className: "research-button", disabled: tech.currentLevel >= tech.level, onClick: handleResearchClick }, tech.currentLevel >= tech.level ? 'Completado' : 'Investigar'))));
});
const ResearchPanel = ({ loading = false }) => {
    // Obtener datos optimizados
    const mockData = useMockData();
    // Estados para filtros (usando useState normal ya que cambian con interacción)
    const [categoryFilter, setCategoryFilter] = react_1.default.useState('all');
    const [levelFilter, setLevelFilter] = react_1.default.useState('all');
    // Filtrar tecnologías según filtros (optimizado)
    const filteredTechnologies = (0, react_1.useMemo)(() => {
        return mockData.technologies.filter(tech => {
            if (categoryFilter !== 'all' && tech.category !== categoryFilter)
                return false;
            if (levelFilter !== 'all' && tech.level !== parseInt(levelFilter))
                return false;
            return true;
        });
    }, [mockData.technologies, categoryFilter, levelFilter]);
    // Columnas para la tabla de proyectos activos (memoizadas)
    const projectColumns = (0, react_1.useMemo)(() => [
        { id: 'name', label: 'Proyecto', sortable: true },
        {
            id: 'investment',
            label: 'Inversión',
            sortable: true,
            align: 'right',
            format: (value) => `$${value.toLocaleString()}`
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
            id: 'timeRemaining',
            label: 'Tiempo Restante',
            sortable: true,
            align: 'right',
            format: (value) => `${value} días`
        },
        {
            id: 'researchers',
            label: 'Investigadores',
            sortable: true,
            align: 'right'
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
                    'cancelled': { label: 'Cancelado', color: '#ea4335' }
                };
                const status = statusMap[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "status-badge", style: { backgroundColor: status.color } }, status.label));
            }
        }
    ], []);
    // Columnas para la tabla de prototipos (memoizadas)
    const prototypeColumns = (0, react_1.useMemo)(() => [
        { id: 'name', label: 'Producto', sortable: true },
        { id: 'category', label: 'Categoría', sortable: true },
        {
            id: 'developmentCost',
            label: 'Costo Desarrollo',
            sortable: true,
            align: 'right',
            format: (value) => `$${value.toLocaleString()}`
        },
        {
            id: 'marketPotential',
            label: 'Potencial',
            sortable: true,
            align: 'right',
            format: (value) => {
                let color = '#ea4335';
                if (value >= 80)
                    color = '#34a853';
                else if (value >= 70)
                    color = '#fbbc05';
                return (react_1.default.createElement("div", { className: "potential-container" },
                    react_1.default.createElement("div", { className: "potential-bar", style: { width: `${value}%`, backgroundColor: color } }),
                    react_1.default.createElement("span", { className: "potential-text" },
                        value,
                        "%")));
            }
        },
        {
            id: 'timeToMarket',
            label: 'Tiempo al Mercado',
            sortable: true,
            align: 'right',
            format: (value) => `${value} semanas`
        },
        {
            id: 'status',
            label: 'Estado',
            sortable: true,
            format: (value) => {
                const statusMap = {
                    'development': { label: 'En Desarrollo', color: '#1a73e8' },
                    'testing': { label: 'En Pruebas', color: '#fbbc05' },
                    'ready': { label: 'Listo', color: '#34a853' },
                    'cancelled': { label: 'Cancelado', color: '#ea4335' }
                };
                const status = statusMap[value] || { label: value, color: '#5f6368' };
                return (react_1.default.createElement("span", { className: "status-badge", style: { backgroundColor: status.color } }, status.label));
            }
        }
    ], []);
    // Callbacks optimizados
    const handleCategoryChange = (0, performanceOptimizations_1.useOptimizedCallback)((e) => {
        setCategoryFilter(e.target.value);
    }, []);
    const handleLevelChange = (0, performanceOptimizations_1.useOptimizedCallback)((e) => {
        setLevelFilter(e.target.value);
    }, []);
    const handleResearch = (0, performanceOptimizations_1.useOptimizedCallback)((techId) => {
        console.log('Iniciar investigación de tecnología:', techId);
    }, []);
    const handleProjectClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionado proyecto', row);
    }, []);
    const handlePrototypeClick = (0, performanceOptimizations_1.useOptimizedCallback)((row) => {
        console.log('Seleccionado prototipo', row);
    }, []);
    // Renderizado optimizado de tarjetas de tecnología
    const renderTechnologyCards = (0, react_1.useCallback)(() => {
        return (react_1.default.createElement("div", { className: "tech-cards-grid" },
            react_1.default.createElement(performanceOptimizations_1.BatchedRender, { items: filteredTechnologies, batchSize: 5, renderItem: (tech, index) => (react_1.default.createElement(TechCard, { key: tech.id, tech: tech, onResearch: handleResearch })) })));
    }, [filteredTechnologies, handleResearch]);
    return (react_1.default.createElement("div", { className: "research-panel" },
        react_1.default.createElement("div", { className: "research-header" },
            react_1.default.createElement("h2", null, "Investigaci\u00F3n y Desarrollo"),
            react_1.default.createElement("div", { className: "research-actions" },
                react_1.default.createElement("button", { className: "action-button primary" },
                    react_1.default.createElement("span", { className: "icon" }, "\uD83D\uDCB0"),
                    "Aumentar Presupuesto"),
                react_1.default.createElement("button", { className: "action-button" },
                    react_1.default.createElement("span", { className: "icon" }, "\uD83D\uDC68\u200D\uD83D\uDD2C"),
                    "Contratar Investigadores"))),
        react_1.default.createElement("div", { className: "research-grid" },
            react_1.default.createElement("div", { className: "tech-tree-section" },
                react_1.default.createElement("div", { className: "tech-tree-header" },
                    react_1.default.createElement("h3", null, "\u00C1rbol Tecnol\u00F3gico"),
                    react_1.default.createElement("div", { className: "tech-filters" },
                        react_1.default.createElement("div", { className: "filter-group" },
                            react_1.default.createElement("label", null, "Categor\u00EDa:"),
                            react_1.default.createElement("select", { value: categoryFilter, onChange: handleCategoryChange },
                                react_1.default.createElement("option", { value: "all" }, "Todas"),
                                react_1.default.createElement("option", { value: "production" }, "Producci\u00F3n"),
                                react_1.default.createElement("option", { value: "materials" }, "Materiales"),
                                react_1.default.createElement("option", { value: "logistics" }, "Log\u00EDstica"),
                                react_1.default.createElement("option", { value: "market" }, "Mercado"),
                                react_1.default.createElement("option", { value: "infrastructure" }, "Infraestructura"))),
                        react_1.default.createElement("div", { className: "filter-group" },
                            react_1.default.createElement("label", null, "Nivel:"),
                            react_1.default.createElement("select", { value: levelFilter, onChange: handleLevelChange },
                                react_1.default.createElement("option", { value: "all" }, "Todos"),
                                react_1.default.createElement("option", { value: "1" }, "Nivel 1"),
                                react_1.default.createElement("option", { value: "2" }, "Nivel 2"),
                                react_1.default.createElement("option", { value: "3" }, "Nivel 3"))))),
                renderTechnologyCards()),
            react_1.default.createElement(Card_1.default, { title: "Proyectos Activos", className: "active-projects-card", loading: loading, actions: react_1.default.createElement("button", { className: "action-button small" },
                    react_1.default.createElement("span", { className: "icon" }, "\u2795"),
                    "Nuevo Proyecto") },
                react_1.default.createElement(Table_1.default, { columns: projectColumns, data: mockData.activeProjects, pagination: false, actions: [
                        {
                            label: 'Pausar',
                            icon: '⏸️',
                            onClick: (row) => console.log('Pausar proyecto', row),
                            disabled: (row) => row.status !== 'active'
                        },
                        {
                            label: 'Detalles',
                            icon: '🔍',
                            onClick: (row) => console.log('Ver detalles de proyecto', row),
                        }(Content, truncated, due, to, size, limit.Use, line, ranges, to, read in chunks)
                    ] })))));
};
