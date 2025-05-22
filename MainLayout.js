"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Integración de MainLayout con los componentes de layout
const react_1 = __importDefault(require("react"));
require("./MainLayout.css");
// Componentes de layout
const Header_1 = __importDefault(require("./Header"));
const Sidebar_1 = __importDefault(require("./Sidebar"));
const Footer_1 = __importDefault(require("./Footer"));
const MainLayout = ({ children, playerMoney, gameTime, notifications, onMenuItemClick, gameSpeed, onSpeedChange, systemMessages }) => {
    return (react_1.default.createElement("div", { className: "main-layout" },
        react_1.default.createElement(Header_1.default, { playerMoney: playerMoney, gameTime: gameTime, notifications: notifications }),
        react_1.default.createElement("div", { className: "main-content-wrapper" },
            react_1.default.createElement(Sidebar_1.default, { onMenuItemClick: onMenuItemClick }),
            react_1.default.createElement("main", { className: "main-content" }, children)),
        react_1.default.createElement(Footer_1.default, { gameSpeed: gameSpeed, onSpeedChange: onSpeedChange, systemMessages: systemMessages })));
};
exports.default = MainLayout;
