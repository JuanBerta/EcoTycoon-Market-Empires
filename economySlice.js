"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateEconomicCycle = exports.updateGlobalFactors = exports.addResource = exports.addProduct = exports.updateProductSupply = exports.updateProductDemand = exports.updateProductPrice = exports.economySlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Estado inicial
const initialState = {
    products: {},
    resources: {},
    globalDemandFactor: 1.0,
    globalSupplyFactor: 1.0,
    inflationRate: 0.0,
    lastUpdated: Date.now()
};
// Slice para el sistema económico
exports.economySlice = (0, toolkit_1.createSlice)({
    name: 'economy',
    initialState,
    reducers: {
        // Actualizar precio de un producto
        updateProductPrice: (state, action) => {
            const { productId, newPrice } = action.payload;
            if (state.products[productId]) {
                const oldPrice = state.products[productId].basePrice.current;
                state.products[productId].basePrice.current = newPrice;
                state.products[productId].basePrice.trend =
                    newPrice > oldPrice ? 'rising' : newPrice < oldPrice ? 'falling' : 'stable';
            }
        },
        // Actualizar demanda de un producto
        updateProductDemand: (state, action) => {
            const { productId, newDemand } = action.payload;
            if (state.products[productId]) {
                state.products[productId].demand = Math.max(0, Math.min(100, newDemand));
            }
        },
        // Actualizar oferta de un producto
        updateProductSupply: (state, action) => {
            const { productId, newSupply } = action.payload;
            if (state.products[productId]) {
                state.products[productId].supply = Math.max(0, Math.min(100, newSupply));
            }
        },
        // Añadir un nuevo producto
        addProduct: (state, action) => {
            state.products[action.payload.id] = action.payload;
        },
        // Añadir un nuevo recurso
        addResource: (state, action) => {
            state.resources[action.payload.id] = action.payload;
        },
        // Actualizar factores globales
        updateGlobalFactors: (state, action) => {
            const { demandFactor, supplyFactor, inflationRate } = action.payload;
            if (demandFactor !== undefined) {
                state.globalDemandFactor = demandFactor;
            }
            if (supplyFactor !== undefined) {
                state.globalSupplyFactor = supplyFactor;
            }
            if (inflationRate !== undefined) {
                state.inflationRate = inflationRate;
            }
            state.lastUpdated = Date.now();
        },
        // Simular ciclo económico
        simulateEconomicCycle: (state) => {
            // Aquí implementaremos la lógica para simular cambios en la economía
            // basados en oferta, demanda, inflación, etc.
            // Por ahora, solo actualizamos el timestamp
            state.lastUpdated = Date.now();
        }
    }
});
// Exportar acciones y reducer
_a = exports.economySlice.actions, exports.updateProductPrice = _a.updateProductPrice, exports.updateProductDemand = _a.updateProductDemand, exports.updateProductSupply = _a.updateProductSupply, exports.addProduct = _a.addProduct, exports.addResource = _a.addResource, exports.updateGlobalFactors = _a.updateGlobalFactors, exports.simulateEconomicCycle = _a.simulateEconomicCycle;
exports.default = exports.economySlice.reducer;
