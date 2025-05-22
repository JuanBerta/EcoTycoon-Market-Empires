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
// Componente Sidebar
const react_1 = __importStar(require("react"));
require("./Sidebar.css");
const Sidebar = ({ onMenuItemClick }) => {
    // Menú predefinido
    const [menuItems, setMenuItems] = (0, react_1.useState)([
        { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
        { id: 'production', label: 'Producción', icon: '🏭' },
        { id: 'market', label: 'Mercado', icon: '📈' },
        { id: 'logistics', label: 'Logística', icon: '🚚' },
        { id: 'research', label: 'I+D', icon: '💡' },
        { id: 'finance', label: 'Finanzas', icon: '💰' },
    ]);
    const [collapsed, setCollapsed] = (0, react_1.useState)(false);
    const handleMenuClick = (id) => {
        // Actualizar estado activo
        const updatedMenu = menuItems.map(item => (Object.assign(Object.assign({}, item), { active: item.id === id })));
        setMenuItems(updatedMenu);
        onMenuItemClick(id);
    };
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (react_1.default.createElement("aside", { className: `sidebar ${collapsed ? 'collapsed' : ''}` },
        react_1.default.createElement("div", { className: "sidebar-toggle", onClick: toggleSidebar }, collapsed ? '»' : '«'),
        react_1.default.createElement("nav", { className: "sidebar-menu" },
            react_1.default.createElement("ul", null, menuItems.map(item => (react_1.default.createElement("li", { key: item.id, className: `menu-item ${item.active ? 'active' : ''}`, onClick: () => handleMenuClick(item.id) },
                react_1.default.createElement("span", { className: "menu-icon" }, item.icon),
                !collapsed && react_1.default.createElement("span", { className: "menu-label" }, item.label)))))),
        react_1.default.createElement("div", { className: "sidebar-footer" },
            react_1.default.createElement("button", { className: "help-button" }, collapsed ? '?' : 'Ayuda'))));
};
exports.default = Sidebar;
