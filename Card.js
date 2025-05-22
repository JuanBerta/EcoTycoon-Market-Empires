"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Componente Card común reutilizable
const react_1 = __importDefault(require("react"));
require("./Card.css");
const Card = ({ title, children, actions, className = '', loading = false }) => {
    return (react_1.default.createElement("div", { className: `card ${className} ${loading ? 'loading' : ''}` },
        react_1.default.createElement("div", { className: "card-header" },
            react_1.default.createElement("h3", { className: "card-title" }, title)),
        react_1.default.createElement("div", { className: "card-content" }, loading ? (react_1.default.createElement("div", { className: "loading-indicator" },
            react_1.default.createElement("div", { className: "spinner" }),
            react_1.default.createElement("p", null, "Cargando datos..."))) : (children)),
        actions && (react_1.default.createElement("div", { className: "card-actions" }, actions))));
};
exports.default = Card;
