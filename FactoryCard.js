"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Componente FactoryCard para mostrar información de fábricas
const react_1 = __importDefault(require("react"));
require("./FactoryCard.css");
const Card_1 = __importDefault(require("../common/Card"));
const FactoryCard = ({ factory, selected = false, onClick, loading = false }) => {
    // Iconos según tipo de fábrica
    const factoryIcons = {
        'food': '🍔',
        'electronics': '💻',
        'textiles': '👕',
        'chemicals': '🧪',
        'luxury': '💎',
        'automotive': '🚗',
        'furniture': '🪑',
        'construction': '🏗️'
    };
    // Colores según tipo de fábrica
    const factoryColors = {
        'food': '#34a853',
        'electronics': '#1a73e8',
        'textiles': '#fbbc05',
        'chemicals': '#ea4335',
        'luxury': '#673ab7',
        'automotive': '#ff5722',
        'furniture': '#795548',
        'construction': '#607d8b'
    };
    // Determinar color de eficiencia
    const getEfficiencyColor = (value) => {
        if (value >= 80)
            return '#34a853';
        if (value >= 60)
            return '#fbbc05';
        return '#ea4335';
    };
    // Determinar color de utilización
    const getUtilizationColor = (value) => {
        if (value >= 90)
            return '#ea4335'; // Sobrecarga
        if (value >= 70)
            return '#34a853'; // Óptimo
        if (value >= 50)
            return '#fbbc05'; // Bajo
        return '#ea4335'; // Crítico
    };
    const icon = factoryIcons[factory.type] || '🏭';
    const color = factoryColors[factory.type] || '#5f6368';
    return (react_1.default.createElement(Card_1.default, { title: "", className: `factory-card ${selected ? 'selected' : ''}`, loading: loading },
        react_1.default.createElement("div", { className: "factory-card-content", onClick: onClick },
            react_1.default.createElement("div", { className: "factory-header" },
                react_1.default.createElement("div", { className: "factory-icon", style: { backgroundColor: `${color}20`, color } }, icon),
                react_1.default.createElement("div", { className: "factory-name-container" },
                    react_1.default.createElement("h4", { className: "factory-name" }, factory.name),
                    react_1.default.createElement("div", { className: "factory-location" }, factory.location))),
            react_1.default.createElement("div", { className: "factory-metrics" },
                react_1.default.createElement("div", { className: "metric" },
                    react_1.default.createElement("div", { className: "metric-label" }, "Eficiencia"),
                    react_1.default.createElement("div", { className: "metric-value", style: { color: getEfficiencyColor(factory.efficiency) } },
                        factory.efficiency,
                        "%")),
                react_1.default.createElement("div", { className: "metric" },
                    react_1.default.createElement("div", { className: "metric-label" }, "Capacidad"),
                    react_1.default.createElement("div", { className: "metric-value" }, factory.capacity)),
                react_1.default.createElement("div", { className: "metric" },
                    react_1.default.createElement("div", { className: "metric-label" }, "Utilizaci\u00F3n"),
                    react_1.default.createElement("div", { className: "metric-value", style: { color: getUtilizationColor(factory.utilization) } },
                        factory.utilization,
                        "%"))),
            react_1.default.createElement("div", { className: "factory-products" },
                react_1.default.createElement("div", { className: "products-label" }, "Productos:"),
                react_1.default.createElement("div", { className: "products-list" }, factory.products.map((product, index) => (react_1.default.createElement("span", { key: index, className: "product-tag" }, product))))))));
};
exports.default = FactoryCard;
