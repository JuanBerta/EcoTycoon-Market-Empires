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
// Componente principal para integrar todos los paneles
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
require("./App.css");
// Componentes de layout
const MainLayout_1 = __importDefault(require("./components/layout/MainLayout"));
// Componentes de paneles
const DashboardPanel_1 = __importDefault(require("./components/dashboard/DashboardPanel"));
const ProductionPanel_1 = __importDefault(require("./components/production/ProductionPanel"));
const MarketPanel_1 = __importDefault(require("./components/market/MarketPanel"));
const LogisticsPanel_1 = __importDefault(require("./components/logistics/LogisticsPanel"));
const ResearchPanel_1 = __importDefault(require("./components/research/ResearchPanel"));
// Acciones y selectores
const uiSlice_1 = require("./store/slices/uiSlice");
const App = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    // Obtener estado de Redux
    const activePanel = (0, react_redux_1.useSelector)((state) => state.ui.activePanel);
    const loading = (0, react_redux_1.useSelector)((state) => state.ui.loading);
    const notifications = (0, react_redux_1.useSelector)(uiSlice_1.selectUnreadNotifications);
    // Estado para simulación de datos del juego
    const [playerMoney, setPlayerMoney] = (0, react_1.useState)(100000);
    const [gameTime, setGameTime] = (0, react_1.useState)({ day: 1, month: 1, year: 1 });
    const [gameSpeed, setGameSpeed] = (0, react_1.useState)('normal');
    // Cargar datos iniciales
    (0, react_1.useEffect)(() => {
        // Cargar datos del panel activo
        loadPanelData(activePanel);
        // Simular actualización de tiempo de juego
        const timer = setInterval(() => {
            if (gameSpeed !== 'paused') {
                updateGameTime();
            }
        }, getSpeedInterval());
        return () => clearInterval(timer);
    }, [activePanel, gameSpeed]);
    // Función para cargar datos según el panel activo
    const loadPanelData = (panel) => {
        switch (panel) {
            case 'dashboard':
                dispatch((0, uiSlice_1.loadDashboardData)());
                break;
            case 'production':
                dispatch((0, uiSlice_1.loadProductionData)());
                break;
            case 'market':
                dispatch((0, uiSlice_1.loadMarketData)());
                break;
            case 'logistics':
                dispatch((0, uiSlice_1.loadLogisticsData)());
                break;
            case 'research':
                dispatch((0, uiSlice_1.loadResearchData)());
                break;
        }
    };
    // Función para actualizar el tiempo de juego
    const updateGameTime = () => {
        setGameTime(prevTime => {
            let newDay = prevTime.day + 1;
            let newMonth = prevTime.month;
            let newYear = prevTime.year;
            if (newDay > 30) {
                newDay = 1;
                newMonth++;
            }
            if (newMonth > 12) {
                newMonth = 1;
                newYear++;
            }
            return { day: newDay, month: newMonth, year: newYear };
        });
        // Simular cambios en dinero del jugador
        const change = Math.random() > 0.5 ?
            Math.floor(Math.random() * 5000) :
            -Math.floor(Math.random() * 3000);
        setPlayerMoney(prev => Math.max(0, prev + change));
    };
    // Obtener intervalo según velocidad
    const getSpeedInterval = () => {
        switch (gameSpeed) {
            case 'paused': return 1000;
            case 'normal': return 1000;
            case 'fast': return 500;
            case 'ultra': return 200;
            default: return 1000;
        }
    };
    // Manejar cambio de panel
    const handlePanelChange = (panelId) => {
        dispatch((0, uiSlice_1.setActivePanel)(panelId));
    };
    // Manejar cambio de velocidad
    const handleSpeedChange = (speed) => {
        setGameSpeed(speed);
    };
    // Renderizar panel activo
    const renderActivePanel = () => {
        switch (activePanel) {
            case 'dashboard':
                return react_1.default.createElement(DashboardPanel_1.default, { loading: loading.dashboard, playerMoney: playerMoney, playerAssets: 250000, playerLiabilities: 50000 });
            case 'production':
                return react_1.default.createElement(ProductionPanel_1.default, { loading: loading.production });
            case 'market':
                return react_1.default.createElement(MarketPanel_1.default, { loading: loading.market });
            case 'logistics':
                return react_1.default.createElement(LogisticsPanel_1.default, { loading: loading.logistics });
            case 'research':
                return react_1.default.createElement(ResearchPanel_1.default, { loading: loading.research });
            default:
                return react_1.default.createElement(DashboardPanel_1.default, { loading: loading.dashboard, playerMoney: playerMoney, playerAssets: 250000, playerLiabilities: 50000 });
        }
    };
    return (react_1.default.createElement(MainLayout_1.default, { playerMoney: playerMoney, gameTime: gameTime, notifications: notifications, onMenuItemClick: handlePanelChange, gameSpeed: gameSpeed, onSpeedChange: handleSpeedChange, systemMessages: ['Sistema funcionando correctamente'] }, renderActivePanel()));
};
exports.default = App;
