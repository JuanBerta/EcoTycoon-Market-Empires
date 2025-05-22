"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Componente Footer
const react_1 = __importDefault(require("react"));
require("./Footer.css");
const Footer = ({ gameSpeed = 'normal', onSpeedChange, systemMessages = [] }) => {
    return (react_1.default.createElement("footer", { className: "game-footer" },
        react_1.default.createElement("div", { className: "time-controls" },
            react_1.default.createElement("button", { className: `speed-button ${gameSpeed === 'paused' ? 'active' : ''}`, onClick: () => onSpeedChange('paused') }, "\u23F8\uFE0F"),
            react_1.default.createElement("button", { className: `speed-button ${gameSpeed === 'normal' ? 'active' : ''}`, onClick: () => onSpeedChange('normal') }, "\u25B6\uFE0F"),
            react_1.default.createElement("button", { className: `speed-button ${gameSpeed === 'fast' ? 'active' : ''}`, onClick: () => onSpeedChange('fast') }, "\u23E9"),
            react_1.default.createElement("button", { className: `speed-button ${gameSpeed === 'ultra' ? 'active' : ''}`, onClick: () => onSpeedChange('ultra') }, "\u23ED\uFE0F")),
        react_1.default.createElement("div", { className: "system-messages" }, systemMessages.length > 0 ? (react_1.default.createElement("span", { className: "message" }, systemMessages[systemMessages.length - 1])) : (react_1.default.createElement("span", { className: "message default" }, "Sistema funcionando correctamente"))),
        react_1.default.createElement("div", { className: "footer-actions" },
            react_1.default.createElement("button", { className: "save-button" }, "\uD83D\uDCBE Guardar"))));
};
exports.default = Footer;
