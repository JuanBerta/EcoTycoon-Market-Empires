"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStats = exports.GameTime = exports.NotificationsPanel = exports.GameMap = exports.ResourcesPanel = exports.CompanyInfo = exports.GameControls = exports.GameUI = void 0;
// Componentes UI principales para EcoTycoon
const react_1 = __importDefault(require("react"));
const store_1 = require("../store");
const gameStateSlice_1 = require("../store/slices/gameStateSlice");
// Componente principal de la interfaz de usuario
const GameUI = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    const gameState = (0, store_1.useAppSelector)(state => state.gameState);
    return (react_1.default.createElement("div", { className: "game-ui" },
        react_1.default.createElement("header", { className: "game-header" },
            react_1.default.createElement("h1", null, "EcoTycoon: Market Empires"),
            react_1.default.createElement(exports.GameControls, null)),
        react_1.default.createElement("main", { className: "game-main" },
            react_1.default.createElement("div", { className: "game-sidebar" },
                react_1.default.createElement(exports.CompanyInfo, null),
                react_1.default.createElement(exports.ResourcesPanel, null)),
            react_1.default.createElement("div", { className: "game-content" },
                react_1.default.createElement(exports.GameMap, null),
                react_1.default.createElement(exports.NotificationsPanel, null))),
        react_1.default.createElement("footer", { className: "game-footer" },
            react_1.default.createElement(exports.GameTime, null),
            react_1.default.createElement(exports.GameStats, null))));
};
exports.GameUI = GameUI;
// Controles del juego (pausa, velocidad)
const GameControls = () => {
    const dispatch = (0, store_1.useAppDispatch)();
    const { gamePaused, time } = (0, store_1.useAppSelector)(state => state.gameState);
    const handlePauseToggle = () => {
        dispatch((0, gameStateSlice_1.togglePause)());
    };
    const handleSpeedChange = (speed) => {
        dispatch((0, gameStateSlice_1.setGameSpeed)(speed));
    };
    return (react_1.default.createElement("div", { className: "game-controls" },
        react_1.default.createElement("button", { onClick: handlePauseToggle, className: "control-button" }, gamePaused ? 'Play' : 'Pause'),
        react_1.default.createElement("div", { className: "speed-controls" },
            react_1.default.createElement("button", { onClick: () => handleSpeedChange('normal'), className: `speed-button ${time.speed === 'normal' ? 'active' : ''}` }, "1x"),
            react_1.default.createElement("button", { onClick: () => handleSpeedChange('fast'), className: `speed-button ${time.speed === 'fast' ? 'active' : ''}` }, "2x"),
            react_1.default.createElement("button", { onClick: () => handleSpeedChange('ultra'), className: `speed-button ${time.speed === 'ultra' ? 'active' : ''}` }, "3x"))));
};
exports.GameControls = GameControls;
// Información de la compañía del jugador
const CompanyInfo = () => {
    const playerCompanyId = (0, store_1.useAppSelector)(state => state.entities.playerCompanyId);
    const companies = (0, store_1.useAppSelector)(state => state.entities.companies);
    if (!playerCompanyId || !companies[playerCompanyId]) {
        return react_1.default.createElement("div", { className: "company-info" }, "No company data available");
    }
    const playerCompany = companies[playerCompanyId];
    return (react_1.default.createElement("div", { className: "company-info" },
        react_1.default.createElement("h2", null, playerCompany.name),
        react_1.default.createElement("div", { className: "company-stats" },
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement("span", { className: "stat-label" }, "Cash:"),
                react_1.default.createElement("span", { className: "stat-value" },
                    "$",
                    playerCompany.cash.toLocaleString())),
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement("span", { className: "stat-label" }, "Reputation:"),
                react_1.default.createElement("span", { className: "stat-value" },
                    playerCompany.reputation,
                    "/100")),
            react_1.default.createElement("div", { className: "stat" },
                react_1.default.createElement("span", { className: "stat-label" }, "Buildings:"),
                react_1.default.createElement("span", { className: "stat-value" }, playerCompany.buildings.length)))));
};
exports.CompanyInfo = CompanyInfo;
// Panel de recursos
const ResourcesPanel = () => {
    const resources = (0, store_1.useAppSelector)(state => state.economy.resources);
    return (react_1.default.createElement("div", { className: "resources-panel" },
        react_1.default.createElement("h3", null, "Resources"),
        react_1.default.createElement("div", { className: "resources-list" }, Object.values(resources).map(resource => (react_1.default.createElement("div", { key: resource.id, className: "resource-item" },
            react_1.default.createElement("span", { className: "resource-name" }, resource.name),
            react_1.default.createElement("span", { className: "resource-price" },
                "$",
                resource.basePrice.current),
            react_1.default.createElement("span", { className: `resource-trend ${resource.basePrice.trend}` }, resource.basePrice.trend === 'rising' ? '↑' :
                resource.basePrice.trend === 'falling' ? '↓' : '→')))))));
};
exports.ResourcesPanel = ResourcesPanel;
// Mapa del juego
const GameMap = () => {
    const locations = (0, store_1.useAppSelector)(state => state.entities.locations);
    return (react_1.default.createElement("div", { className: "game-map" },
        react_1.default.createElement("h3", null, "Game Map"),
        react_1.default.createElement("div", { className: "map-container" },
            react_1.default.createElement("div", { className: "map-placeholder" },
                react_1.default.createElement("p", null, "Map Visualization"),
                react_1.default.createElement("p", null,
                    "Regions: ",
                    Object.keys(locations).length)))));
};
exports.GameMap = GameMap;
// Panel de notificaciones
const NotificationsPanel = () => {
    const notifications = (0, store_1.useAppSelector)(state => state.gameState.notifications);
    return (react_1.default.createElement("div", { className: "notifications-panel" },
        react_1.default.createElement("h3", null, "Notifications"),
        react_1.default.createElement("div", { className: "notifications-list" }, notifications.length === 0 ? (react_1.default.createElement("p", null, "No notifications")) : (notifications.slice(0, 5).map(notification => (react_1.default.createElement("div", { key: notification.id, className: `notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}` },
            react_1.default.createElement("h4", null, notification.title),
            react_1.default.createElement("p", null, notification.message),
            react_1.default.createElement("span", { className: "notification-time" }, new Date(notification.timestamp).toLocaleTimeString()))))))));
};
exports.NotificationsPanel = NotificationsPanel;
// Tiempo del juego
const GameTime = () => {
    const { time } = (0, store_1.useAppSelector)(state => state.gameState);
    return (react_1.default.createElement("div", { className: "game-time" },
        react_1.default.createElement("div", { className: "date" },
            "Day ",
            time.day,
            ", Month ",
            time.month,
            ", Year ",
            time.year),
        react_1.default.createElement("div", { className: "time" },
            time.hour.toString().padStart(2, '0'),
            ":",
            time.minute.toString().padStart(2, '0'))));
};
exports.GameTime = GameTime;
// Estadísticas del juego
const GameStats = () => {
    // Aquí se mostrarían estadísticas generales del juego
    return (react_1.default.createElement("div", { className: "game-stats" },
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "stat-label" }, "Market Index:"),
            react_1.default.createElement("span", { className: "stat-value" }, "1,245")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "stat-label" }, "Global Demand:"),
            react_1.default.createElement("span", { className: "stat-value" }, "High")),
        react_1.default.createElement("div", { className: "stat" },
            react_1.default.createElement("span", { className: "stat-label" }, "Competition:"),
            react_1.default.createElement("span", { className: "stat-value" }, "Medium"))));
};
exports.GameStats = GameStats;
