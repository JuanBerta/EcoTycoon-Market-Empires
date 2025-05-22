"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProduction = exports.updateProductionProgress = exports.startProduction = exports.updateWarehouseInventory = exports.updateCompanyCash = exports.addCompany = exports.addBuilding = exports.addLocation = exports.entitiesSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Estado inicial
const initialState = {
    locations: {},
    buildings: {},
    companies: {},
    playerCompanyId: null
};
// Slice para entidades
exports.entitiesSlice = (0, toolkit_1.createSlice)({
    name: 'entities',
    initialState,
    reducers: {
        // Añadir una nueva ubicación
        addLocation: (state, action) => {
            state.locations[action.payload.id] = action.payload;
        },
        // Añadir un nuevo edificio
        addBuilding: (state, action) => {
            state.buildings[action.payload.id] = action.payload;
        },
        // Añadir una nueva compañía
        addCompany: (state, action) => {
            state.companies[action.payload.id] = action.payload;
            // Si es la compañía del jugador, actualizamos el ID
            if (action.payload.isPlayer) {
                state.playerCompanyId = action.payload.id;
            }
        },
        // Actualizar el dinero de una compañía
        updateCompanyCash: (state, action) => {
            const { companyId, amount } = action.payload;
            if (state.companies[companyId]) {
                state.companies[companyId].cash += amount;
            }
        },
        // Actualizar el inventario de un almacén
        updateWarehouseInventory: (state, action) => {
            const { warehouseId, itemId, quantity, isAddition } = action.payload;
            const warehouse = state.buildings[warehouseId];
            if (warehouse && warehouse.type === 'warehouse') {
                if (isAddition) {
                    warehouse.inventory[itemId] = (warehouse.inventory[itemId] || 0) + quantity;
                    warehouse.usedCapacity += quantity;
                }
                else {
                    const currentQuantity = warehouse.inventory[itemId] || 0;
                    const newQuantity = Math.max(0, currentQuantity - quantity);
                    warehouse.inventory[itemId] = newQuantity;
                    warehouse.usedCapacity -= (currentQuantity - newQuantity);
                }
            }
        },
        // Iniciar producción en una fábrica
        startProduction: (state, action) => {
            const { factoryId, productId, duration } = action.payload;
            const factory = state.buildings[factoryId];
            if (factory && factory.type === 'factory') {
                const now = Date.now();
                factory.currentProduction = {
                    productId,
                    progress: 0,
                    startTime: now,
                    endTime: now + duration
                };
            }
        },
        // Actualizar progreso de producción
        updateProductionProgress: (state, action) => {
            const { factoryId, progress } = action.payload;
            const factory = state.buildings[factoryId];
            if (factory && factory.type === 'factory' && factory.currentProduction) {
                factory.currentProduction.progress = Math.min(100, Math.max(0, progress));
            }
        },
        // Completar producción
        completeProduction: (state, action) => {
            const { factoryId } = action.payload;
            const factory = state.buildings[factoryId];
            if (factory && factory.type === 'factory' && factory.currentProduction) {
                factory.currentProduction = null;
            }
        }
    }
});
// Exportar acciones y reducer
_a = exports.entitiesSlice.actions, exports.addLocation = _a.addLocation, exports.addBuilding = _a.addBuilding, exports.addCompany = _a.addCompany, exports.updateCompanyCash = _a.updateCompanyCash, exports.updateWarehouseInventory = _a.updateWarehouseInventory, exports.startProduction = _a.startProduction, exports.updateProductionProgress = _a.updateProductionProgress, exports.completeProduction = _a.completeProduction;
exports.default = exports.entitiesSlice.reducer;
