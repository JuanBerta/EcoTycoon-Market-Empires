"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUnreadNotifications = exports.startResearch = exports.orderSupplies = exports.startProduction = exports.loadResearchData = exports.loadLogisticsData = exports.loadMarketData = exports.loadProductionData = exports.loadDashboardData = exports.setResearchFilter = exports.setMarketFilter = exports.setSelectedEntity = exports.clearNotifications = exports.markNotificationAsRead = exports.addNotification = exports.setActivePanel = exports.setLoading = void 0;
// Integración de la UI con el sistema económico y entidades
const toolkit_1 = require("@reduxjs/toolkit");
const economicSystem_1 = require("../engine/economy/economicSystem");
const productionSystem_1 = require("../engine/entities/productionSystem");
const npcSystem_1 = require("../engine/ai/npcSystem");
// Estado inicial
const initialState = {
    loading: {
        dashboard: false,
        production: false,
        market: false,
        logistics: false,
        research: false,
    },
    activePanel: 'dashboard',
    notifications: [],
    selectedEntities: {
        factory: null,
        warehouse: null,
        region: null,
        product: null,
    },
    filters: {
        market: {
            category: 'all',
            region: 'all',
            period: '6m',
        },
        research: {
            category: 'all',
            level: 'all',
        },
    },
};
// Slice para la UI
const uiSlice = (0, toolkit_1.createSlice)({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading[action.payload.panel] = action.payload.status;
        },
        setActivePanel: (state, action) => {
            state.activePanel = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications.push(Object.assign(Object.assign({}, action.payload), { timestamp: Date.now(), read: false }));
        },
        markNotificationAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
        },
        clearNotifications: (state) => {
            state.notifications = [];
        },
        setSelectedEntity: (state, action) => {
            state.selectedEntities[action.payload.type] = action.payload.id;
        },
        setMarketFilter: (state, action) => {
            state.filters.market = Object.assign(Object.assign({}, state.filters.market), action.payload);
        },
        setResearchFilter: (state, action) => {
            state.filters.research = Object.assign(Object.assign({}, state.filters.research), action.payload);
        },
    },
});
// Acciones
_a = uiSlice.actions, exports.setLoading = _a.setLoading, exports.setActivePanel = _a.setActivePanel, exports.addNotification = _a.addNotification, exports.markNotificationAsRead = _a.markNotificationAsRead, exports.clearNotifications = _a.clearNotifications, exports.setSelectedEntity = _a.setSelectedEntity, exports.setMarketFilter = _a.setMarketFilter, exports.setResearchFilter = _a.setResearchFilter;
// Thunks para integración con el sistema económico
const loadDashboardData = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'dashboard', status: true }));
        // Obtener datos del sistema económico
        const economicData = yield economicSystem_1.economicSystem.getEconomicSummary();
        const competitorData = yield npcSystem_1.npcSystem.getCompetitorSummary();
        // Actualizar el estado con los datos obtenidos
        // (Aquí se actualizarían los slices correspondientes con los datos)
        // Notificar eventos importantes
        const events = economicSystem_1.economicSystem.getRecentEvents();
        events.forEach(event => {
            dispatch((0, exports.addNotification)({
                id: `event-${event.id}`,
                type: event.severity,
                message: event.message,
            }));
        });
        dispatch((0, exports.setLoading)({ panel: 'dashboard', status: false }));
    }
    catch (error) {
        console.error('Error loading dashboard data:', error);
        dispatch((0, exports.setLoading)({ panel: 'dashboard', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al cargar datos del dashboard',
        }));
    }
});
exports.loadDashboardData = loadDashboardData;
const loadProductionData = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'production', status: true }));
        // Obtener datos del sistema de producción
        const factories = yield productionSystem_1.productionSystem.getFactories();
        const productionLines = yield productionSystem_1.productionSystem.getProductionLines();
        const resources = yield productionSystem_1.productionSystem.getResources();
        // Actualizar el estado con los datos obtenidos
        // (Aquí se actualizarían los slices correspondientes con los datos)
        dispatch((0, exports.setLoading)({ panel: 'production', status: false }));
    }
    catch (error) {
        console.error('Error loading production data:', error);
        dispatch((0, exports.setLoading)({ panel: 'production', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al cargar datos de producción',
        }));
    }
});
exports.loadProductionData = loadProductionData;
const loadMarketData = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    const { filters } = getState().ui.filters.market;
    try {
        dispatch((0, exports.setLoading)({ panel: 'market', status: true }));
        // Obtener datos del sistema económico con filtros
        const marketData = yield economicSystem_1.economicSystem.getMarketData(filters.category, filters.region, filters.period);
        const competitorData = yield npcSystem_1.npcSystem.getCompetitorAnalysis();
        const opportunities = yield economicSystem_1.economicSystem.getMarketOpportunities();
        // Actualizar el estado con los datos obtenidos
        // (Aquí se actualizarían los slices correspondientes con los datos)
        dispatch((0, exports.setLoading)({ panel: 'market', status: false }));
    }
    catch (error) {
        console.error('Error loading market data:', error);
        dispatch((0, exports.setLoading)({ panel: 'market', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al cargar datos de mercado',
        }));
    }
});
exports.loadMarketData = loadMarketData;
const loadLogisticsData = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'logistics', status: true }));
        // Obtener datos del sistema logístico
        const warehouses = yield productionSystem_1.productionSystem.getWarehouses();
        const routes = yield productionSystem_1.productionSystem.getDistributionRoutes();
        const supplyPlan = yield productionSystem_1.productionSystem.getSupplyPlan();
        // Actualizar el estado con los datos obtenidos
        // (Aquí se actualizarían los slices correspondientes con los datos)
        dispatch((0, exports.setLoading)({ panel: 'logistics', status: false }));
    }
    catch (error) {
        console.error('Error loading logistics data:', error);
        dispatch((0, exports.setLoading)({ panel: 'logistics', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al cargar datos de logística',
        }));
    }
});
exports.loadLogisticsData = loadLogisticsData;
const loadResearchData = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    const { filters } = getState().ui.filters.research;
    try {
        dispatch((0, exports.setLoading)({ panel: 'research', status: true }));
        // Obtener datos del sistema de investigación
        const technologies = yield productionSystem_1.productionSystem.getTechnologies(filters.category, filters.level);
        const activeProjects = yield productionSystem_1.productionSystem.getResearchProjects();
        const prototypes = yield productionSystem_1.productionSystem.getProductPrototypes();
        // Actualizar el estado con los datos obtenidos
        // (Aquí se actualizarían los slices correspondientes con los datos)
        dispatch((0, exports.setLoading)({ panel: 'research', status: false }));
    }
    catch (error) {
        console.error('Error loading research data:', error);
        dispatch((0, exports.setLoading)({ panel: 'research', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al cargar datos de investigación',
        }));
    }
});
exports.loadResearchData = loadResearchData;
// Acciones para interactuar con el sistema económico
const startProduction = (factoryId, productId, quantity) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'production', status: true }));
        // Iniciar producción en el sistema
        yield productionSystem_1.productionSystem.startProductionLine(factoryId, productId, quantity);
        // Recargar datos de producción
        dispatch((0, exports.loadProductionData)());
        dispatch((0, exports.addNotification)({
            id: `production-${Date.now()}`,
            type: 'info',
            message: `Producción de ${quantity} unidades iniciada con éxito`,
        }));
    }
    catch (error) {
        console.error('Error starting production:', error);
        dispatch((0, exports.setLoading)({ panel: 'production', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al iniciar producción',
        }));
    }
});
exports.startProduction = startProduction;
const orderSupplies = (productId, quantity) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'logistics', status: true }));
        // Ordenar suministros en el sistema
        yield productionSystem_1.productionSystem.orderSupplies(productId, quantity);
        // Recargar datos de logística
        dispatch((0, exports.loadLogisticsData)());
        dispatch((0, exports.addNotification)({
            id: `order-${Date.now()}`,
            type: 'info',
            message: `Pedido de ${quantity} unidades realizado con éxito`,
        }));
    }
    catch (error) {
        console.error('Error ordering supplies:', error);
        dispatch((0, exports.setLoading)({ panel: 'logistics', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al realizar pedido',
        }));
    }
});
exports.orderSupplies = orderSupplies;
const startResearch = (technologyId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch((0, exports.setLoading)({ panel: 'research', status: true }));
        // Iniciar investigación en el sistema
        yield productionSystem_1.productionSystem.startResearch(technologyId);
        // Recargar datos de investigación
        dispatch((0, exports.loadResearchData)());
        dispatch((0, exports.addNotification)({
            id: `research-${Date.now()}`,
            type: 'info',
            message: `Investigación iniciada con éxito`,
        }));
    }
    catch (error) {
        console.error('Error starting research:', error);
        dispatch((0, exports.setLoading)({ panel: 'research', status: false }));
        dispatch((0, exports.addNotification)({
            id: `error-${Date.now()}`,
            type: 'alert',
            message: 'Error al iniciar investigación',
        }));
    }
});
exports.startResearch = startResearch;
// Selector para obtener notificaciones no leídas
const selectUnreadNotifications = (state) => {
    return state.ui.notifications.filter(n => !n.read);
};
exports.selectUnreadNotifications = selectUnreadNotifications;
exports.default = uiSlice.reducer;
