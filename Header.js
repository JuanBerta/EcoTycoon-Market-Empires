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
Object.defineProperty(exports, "__esModule", { value: true });
// Componente Header
const react_1 = __importStar(require("react"));
require("./Header.css");
const Header = ({ playerMoney = 100000, gameTime = { day: 1, month: 1, year: 1 }, notifications = [] }) => {
    const [showNotifications, setShowNotifications] = (0, react_1.useState)(false);
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    return (react_1.default.createElement("header", { className: "game-header" },
        react_1.default.createElement("div", { className: "header-logo" },
            react_1.default.createElement("h1", null, "EcoTycoon")),
        react_1.default.createElement("div", { className: "header-info" },
            react_1.default.createElement("div", { className: "game-time" },
                react_1.default.createElement("span", { className: "time-label" }, "D\u00EDa:"),
                react_1.default.createElement("span", { className: "time-value" }, gameTime.day),
                react_1.default.createElement("span", { className: "time-label" }, "Mes:"),
                react_1.default.createElement("span", { className: "time-value" }, gameTime.month),
                react_1.default.createElement("span", { className: "time-label" }, "A\u00F1o:"),
                react_1.default.createElement("span", { className: "time-value" }, gameTime.year)),
            react_1.default.createElement("div", { className: "player-money" },
                react_1.default.createElement("span", { className: "money-value" }, formatMoney(playerMoney)))),
        react_1.default.createElement("div", { className: "header-actions" },
            react_1.default.createElement("div", { className: "notifications-container" },
                react_1.default.createElement("button", { className: "notifications-button", onClick: toggleNotifications },
                    react_1.default.createElement("span", { className: "icon" }, "\uD83D\uDD14"),
                    notifications.length > 0 && (react_1.default.createElement("span", { className: "notification-badge" }, notifications.length))),
                showNotifications && notifications.length > 0 && (react_1.default.createElement("div", { className: "notifications-dropdown" },
                    react_1.default.createElement("h3", null, "Notificaciones"),
                    react_1.default.createElement("ul", { className: "notifications-list" }, notifications.map(notification => (react_1.default.createElement("li", { key: notification.id, className: `notification-item ${notification.type}` }, notification.message))))))),
            react_1.default.createElement("button", { className: "settings-button" },
                react_1.default.createElement("span", { className: "icon" }, "\u2699\uFE0F")))));
};
exports.default = Header;
