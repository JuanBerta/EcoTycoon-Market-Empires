import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipos para entidades del juego
export interface Location {
  id: string;
  name: string;
  type: 'city' | 'region';
  population: number;
  wealthLevel: number; // 0-100, afecta demanda de productos de lujo
  coordinates: { x: number; y: number };
  parentRegionId?: string; // Para ciudades dentro de regiones
}

export interface Building {
  id: string;
  name: string;
  type: 'factory' | 'warehouse' | 'store' | 'office' | 'research';
  locationId: string;
  size: number;
  level: number;
  efficiency: number; // 0-100
  condition: number; // 0-100
  operatingCosts: number;
  lastMaintenance: number; // Timestamp
}

export interface Factory extends Building {
  type: 'factory';
  productionCapacity: number;
  productionEfficiency: number;
  productsIds: string[];
  resourcesNeeded: Record<string, number>; // resourceId -> cantidad
  currentProduction: {
    productId: string;
    progress: number; // 0-100
    startTime: number;
    endTime: number;
  } | null;
}

export interface Warehouse extends Building {
  type: 'warehouse';
  capacity: number;
  usedCapacity: number;
  inventory: Record<string, number>; // productId/resourceId -> cantidad
}

export interface Store extends Building {
  type: 'store';
  salesCapacity: number;
  customerSatisfaction: number; // 0-100
  productsForSale: Record<string, { 
    quantity: number;
    price: number;
    quality: number;
  }>;
  dailySales: Record<string, number>; // productId -> cantidad
}

export interface Company {
  id: string;
  name: string;
  isPlayer: boolean;
  cash: number;
  reputation: number; // 0-100
  buildings: string[]; // IDs de edificios
  strategy?: 'low_cost' | 'high_quality' | 'niche';
}

export interface EntitiesState {
  locations: Record<string, Location>;
  buildings: Record<string, Building>;
  companies: Record<string, Company>;
  playerCompanyId: string | null;
}

// Estado inicial
const initialState: EntitiesState = {
  locations: {},
  buildings: {},
  companies: {},
  playerCompanyId: null
};

// Slice para entidades
export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    // Añadir una nueva ubicación
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations[action.payload.id] = action.payload;
    },
    
    // Añadir un nuevo edificio
    addBuilding: (state, action: PayloadAction<Building>) => {
      state.buildings[action.payload.id] = action.payload;
    },
    
    // Añadir una nueva compañía
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies[action.payload.id] = action.payload;
      
      // Si es la compañía del jugador, actualizamos el ID
      if (action.payload.isPlayer) {
        state.playerCompanyId = action.payload.id;
      }
    },
    
    // Actualizar el dinero de una compañía
    updateCompanyCash: (state, action: PayloadAction<{ companyId: string; amount: number }>) => {
      const { companyId, amount } = action.payload;
      if (state.companies[companyId]) {
        state.companies[companyId].cash += amount;
      }
    },
    
    // Actualizar el inventario de un almacén
    updateWarehouseInventory: (state, action: PayloadAction<{ 
      warehouseId: string; 
      itemId: string; 
      quantity: number;
      isAddition: boolean;
    }>) => {
      const { warehouseId, itemId, quantity, isAddition } = action.payload;
      const warehouse = state.buildings[warehouseId] as Warehouse;
      
      if (warehouse && warehouse.type === 'warehouse') {
        if (isAddition) {
          warehouse.inventory[itemId] = (warehouse.inventory[itemId] || 0) + quantity;
          warehouse.usedCapacity += quantity;
        } else {
          const currentQuantity = warehouse.inventory[itemId] || 0;
          const newQuantity = Math.max(0, currentQuantity - quantity);
          warehouse.inventory[itemId] = newQuantity;
          warehouse.usedCapacity -= (currentQuantity - newQuantity);
        }
      }
    },
    
    // Iniciar producción en una fábrica
    startProduction: (state, action: PayloadAction<{ 
      factoryId: string; 
      productId: string;
      duration: number; // en milisegundos
    }>) => {
      const { factoryId, productId, duration } = action.payload;
      const factory = state.buildings[factoryId] as Factory;
      
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
    updateProductionProgress: (state, action: PayloadAction<{ 
      factoryId: string; 
      progress: number;
    }>) => {
      const { factoryId, progress } = action.payload;
      const factory = state.buildings[factoryId] as Factory;
      
      if (factory && factory.type === 'factory' && factory.currentProduction) {
        factory.currentProduction.progress = Math.min(100, Math.max(0, progress));
      }
    },
    
    // Completar producción
    completeProduction: (state, action: PayloadAction<{ factoryId: string }>) => {
      const { factoryId } = action.payload;
      const factory = state.buildings[factoryId] as Factory;
      
      if (factory && factory.type === 'factory' && factory.currentProduction) {
        factory.currentProduction = null;
      }
    }
  }
});

// Exportar acciones y reducer
export const { 
  addLocation,
  addBuilding,
  addCompany,
  updateCompanyCash,
  updateWarehouseInventory,
  startProduction,
  updateProductionProgress,
  completeProduction
} = entitiesSlice.actions;

export default entitiesSlice.reducer;
