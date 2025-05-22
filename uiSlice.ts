// Integración de la UI con el sistema económico y entidades
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { economicSystem } from '../engine/economy/economicSystem';
import { regionSystem } from '../engine/entities/regionSystem';
import { productionSystem } from '../engine/entities/productionSystem';
import { npcSystem } from '../engine/ai/npcSystem';

// Tipos para la integración
interface UIState {
  loading: {
    dashboard: boolean;
    production: boolean;
    market: boolean;
    logistics: boolean;
    research: boolean;
  };
  activePanel: 'dashboard' | 'production' | 'market' | 'logistics' | 'research';
  notifications: Array<{
    id: string;
    type: 'info' | 'warning' | 'alert';
    message: string;
    timestamp: number;
    read: boolean;
  }>;
  selectedEntities: {
    factory: string | null;
    warehouse: string | null;
    region: string | null;
    product: string | null;
  };
  filters: {
    market: {
      category: string;
      region: string;
      period: string;
    };
    research: {
      category: string;
      level: string;
    };
  };
}

// Estado inicial
const initialState: UIState = {
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
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ panel: keyof UIState['loading']; status: boolean }>) => {
      state.loading[action.payload.panel] = action.payload.status;
    },
    setActivePanel: (state, action: PayloadAction<UIState['activePanel']>) => {
      state.activePanel = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UIState['notifications'][0], 'timestamp' | 'read'>>) => {
      state.notifications.push({
        ...action.payload,
        timestamp: Date.now(),
        read: false,
      });
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setSelectedEntity: (state, action: PayloadAction<{ type: keyof UIState['selectedEntities']; id: string | null }>) => {
      state.selectedEntities[action.payload.type] = action.payload.id;
    },
    setMarketFilter: (state, action: PayloadAction<Partial<UIState['filters']['market']>>) => {
      state.filters.market = { ...state.filters.market, ...action.payload };
    },
    setResearchFilter: (state, action: PayloadAction<Partial<UIState['filters']['research']>>) => {
      state.filters.research = { ...state.filters.research, ...action.payload };
    },
  },
});

// Acciones
export const {
  setLoading,
  setActivePanel,
  addNotification,
  markNotificationAsRead,
  clearNotifications,
  setSelectedEntity,
  setMarketFilter,
  setResearchFilter,
} = uiSlice.actions;

// Thunks para integración con el sistema económico
export const loadDashboardData = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoading({ panel: 'dashboard', status: true }));
    
    // Obtener datos del sistema económico
    const economicData = await economicSystem.getEconomicSummary();
    const competitorData = await npcSystem.getCompetitorSummary();
    
    // Actualizar el estado con los datos obtenidos
    // (Aquí se actualizarían los slices correspondientes con los datos)
    
    // Notificar eventos importantes
    const events = economicSystem.getRecentEvents();
    events.forEach(event => {
      dispatch(addNotification({
        id: `event-${event.id}`,
        type: event.severity as 'info' | 'warning' | 'alert',
        message: event.message,
      }));
    });
    
    dispatch(setLoading({ panel: 'dashboard', status: false }));
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    dispatch(setLoading({ panel: 'dashboard', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al cargar datos del dashboard',
    }));
  }
};

export const loadProductionData = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoading({ panel: 'production', status: true }));
    
    // Obtener datos del sistema de producción
    const factories = await productionSystem.getFactories();
    const productionLines = await productionSystem.getProductionLines();
    const resources = await productionSystem.getResources();
    
    // Actualizar el estado con los datos obtenidos
    // (Aquí se actualizarían los slices correspondientes con los datos)
    
    dispatch(setLoading({ panel: 'production', status: false }));
  } catch (error) {
    console.error('Error loading production data:', error);
    dispatch(setLoading({ panel: 'production', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al cargar datos de producción',
    }));
  }
};

export const loadMarketData = (): AppThunk => async (dispatch, getState) => {
  const { filters } = getState().ui.filters.market;
  
  try {
    dispatch(setLoading({ panel: 'market', status: true }));
    
    // Obtener datos del sistema económico con filtros
    const marketData = await economicSystem.getMarketData(filters.category, filters.region, filters.period);
    const competitorData = await npcSystem.getCompetitorAnalysis();
    const opportunities = await economicSystem.getMarketOpportunities();
    
    // Actualizar el estado con los datos obtenidos
    // (Aquí se actualizarían los slices correspondientes con los datos)
    
    dispatch(setLoading({ panel: 'market', status: false }));
  } catch (error) {
    console.error('Error loading market data:', error);
    dispatch(setLoading({ panel: 'market', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al cargar datos de mercado',
    }));
  }
};

export const loadLogisticsData = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setLoading({ panel: 'logistics', status: true }));
    
    // Obtener datos del sistema logístico
    const warehouses = await productionSystem.getWarehouses();
    const routes = await productionSystem.getDistributionRoutes();
    const supplyPlan = await productionSystem.getSupplyPlan();
    
    // Actualizar el estado con los datos obtenidos
    // (Aquí se actualizarían los slices correspondientes con los datos)
    
    dispatch(setLoading({ panel: 'logistics', status: false }));
  } catch (error) {
    console.error('Error loading logistics data:', error);
    dispatch(setLoading({ panel: 'logistics', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al cargar datos de logística',
    }));
  }
};

export const loadResearchData = (): AppThunk => async (dispatch, getState) => {
  const { filters } = getState().ui.filters.research;
  
  try {
    dispatch(setLoading({ panel: 'research', status: true }));
    
    // Obtener datos del sistema de investigación
    const technologies = await productionSystem.getTechnologies(filters.category, filters.level);
    const activeProjects = await productionSystem.getResearchProjects();
    const prototypes = await productionSystem.getProductPrototypes();
    
    // Actualizar el estado con los datos obtenidos
    // (Aquí se actualizarían los slices correspondientes con los datos)
    
    dispatch(setLoading({ panel: 'research', status: false }));
  } catch (error) {
    console.error('Error loading research data:', error);
    dispatch(setLoading({ panel: 'research', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al cargar datos de investigación',
    }));
  }
};

// Acciones para interactuar con el sistema económico
export const startProduction = (factoryId: string, productId: string, quantity: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading({ panel: 'production', status: true }));
    
    // Iniciar producción en el sistema
    await productionSystem.startProductionLine(factoryId, productId, quantity);
    
    // Recargar datos de producción
    dispatch(loadProductionData());
    
    dispatch(addNotification({
      id: `production-${Date.now()}`,
      type: 'info',
      message: `Producción de ${quantity} unidades iniciada con éxito`,
    }));
  } catch (error) {
    console.error('Error starting production:', error);
    dispatch(setLoading({ panel: 'production', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al iniciar producción',
    }));
  }
};

export const orderSupplies = (productId: string, quantity: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading({ panel: 'logistics', status: true }));
    
    // Ordenar suministros en el sistema
    await productionSystem.orderSupplies(productId, quantity);
    
    // Recargar datos de logística
    dispatch(loadLogisticsData());
    
    dispatch(addNotification({
      id: `order-${Date.now()}`,
      type: 'info',
      message: `Pedido de ${quantity} unidades realizado con éxito`,
    }));
  } catch (error) {
    console.error('Error ordering supplies:', error);
    dispatch(setLoading({ panel: 'logistics', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al realizar pedido',
    }));
  }
};

export const startResearch = (technologyId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading({ panel: 'research', status: true }));
    
    // Iniciar investigación en el sistema
    await productionSystem.startResearch(technologyId);
    
    // Recargar datos de investigación
    dispatch(loadResearchData());
    
    dispatch(addNotification({
      id: `research-${Date.now()}`,
      type: 'info',
      message: `Investigación iniciada con éxito`,
    }));
  } catch (error) {
    console.error('Error starting research:', error);
    dispatch(setLoading({ panel: 'research', status: false }));
    dispatch(addNotification({
      id: `error-${Date.now()}`,
      type: 'alert',
      message: 'Error al iniciar investigación',
    }));
  }
};

// Selector para obtener notificaciones no leídas
export const selectUnreadNotifications = (state: { ui: UIState }) => {
  return state.ui.notifications.filter(n => !n.read);
};

export default uiSlice.reducer;
