import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipos para el sistema económico
export interface Price {
  min: number;
  max: number;
  current: number;
  trend: 'rising' | 'falling' | 'stable';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: Price;
  productionCost: number;
  productionTime: number; // en horas de juego
  demand: number; // 0-100
  supply: number; // 0-100
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  basePrice: Price;
  availability: number; // 0-100
}

export interface EconomyState {
  products: Record<string, Product>;
  resources: Record<string, Resource>;
  globalDemandFactor: number; // Multiplicador global de demanda
  globalSupplyFactor: number; // Multiplicador global de oferta
  inflationRate: number; // Tasa de inflación
  lastUpdated: number; // Timestamp de la última actualización
}

// Estado inicial
const initialState: EconomyState = {
  products: {},
  resources: {},
  globalDemandFactor: 1.0,
  globalSupplyFactor: 1.0,
  inflationRate: 0.0,
  lastUpdated: Date.now()
};

// Slice para el sistema económico
export const economySlice = createSlice({
  name: 'economy',
  initialState,
  reducers: {
    // Actualizar precio de un producto
    updateProductPrice: (state, action: PayloadAction<{ productId: string; newPrice: number }>) => {
      const { productId, newPrice } = action.payload;
      if (state.products[productId]) {
        const oldPrice = state.products[productId].basePrice.current;
        state.products[productId].basePrice.current = newPrice;
        state.products[productId].basePrice.trend = 
          newPrice > oldPrice ? 'rising' : newPrice < oldPrice ? 'falling' : 'stable';
      }
    },
    
    // Actualizar demanda de un producto
    updateProductDemand: (state, action: PayloadAction<{ productId: string; newDemand: number }>) => {
      const { productId, newDemand } = action.payload;
      if (state.products[productId]) {
        state.products[productId].demand = Math.max(0, Math.min(100, newDemand));
      }
    },
    
    // Actualizar oferta de un producto
    updateProductSupply: (state, action: PayloadAction<{ productId: string; newSupply: number }>) => {
      const { productId, newSupply } = action.payload;
      if (state.products[productId]) {
        state.products[productId].supply = Math.max(0, Math.min(100, newSupply));
      }
    },
    
    // Añadir un nuevo producto
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products[action.payload.id] = action.payload;
    },
    
    // Añadir un nuevo recurso
    addResource: (state, action: PayloadAction<Resource>) => {
      state.resources[action.payload.id] = action.payload;
    },
    
    // Actualizar factores globales
    updateGlobalFactors: (state, action: PayloadAction<{ demandFactor?: number; supplyFactor?: number; inflationRate?: number }>) => {
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
export const { 
  updateProductPrice, 
  updateProductDemand, 
  updateProductSupply,
  addProduct,
  addResource,
  updateGlobalFactors,
  simulateEconomicCycle
} = economySlice.actions;

export default economySlice.reducer;
