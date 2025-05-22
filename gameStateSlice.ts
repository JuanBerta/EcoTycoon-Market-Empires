import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipos para el estado del juego
export interface GameTime {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  speed: 'paused' | 'normal' | 'fast' | 'ultra';
  lastTick: number; // timestamp del último tick
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: 'economic' | 'political' | 'natural' | 'company';
  severity: 'low' | 'medium' | 'high';
  affectedRegions: string[]; // IDs de regiones afectadas
  effects: {
    economyFactors?: {
      demandFactor?: number;
      supplyFactor?: number;
      inflationRate?: number;
    };
    productFactors?: Record<string, {
      demandChange?: number;
      supplyChange?: number;
      priceChange?: number;
    }>;
  };
  startTime: GameTime;
  duration: number; // en días de juego
  isActive: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
  read: boolean;
}

export interface GameStateState {
  time: GameTime;
  events: Record<string, GameEvent>;
  notifications: Notification[];
  tutorialCompleted: boolean;
  difficulty: 'easy' | 'normal' | 'hard';
  gameStarted: boolean;
  gamePaused: boolean;
}

// Estado inicial
const initialState: GameStateState = {
  time: {
    day: 1,
    month: 1,
    year: 2025,
    hour: 8,
    minute: 0,
    speed: 'normal',
    lastTick: Date.now()
  },
  events: {},
  notifications: [],
  tutorialCompleted: false,
  difficulty: 'normal',
  gameStarted: false,
  gamePaused: true
};

// Slice para el estado del juego
export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    // Avanzar el tiempo del juego
    advanceTime: (state, action: PayloadAction<{ minutes: number }>) => {
      const { minutes } = action.payload;
      
      // Avanzar minutos
      state.time.minute += minutes;
      
      // Ajustar horas si es necesario
      while (state.time.minute >= 60) {
        state.time.minute -= 60;
        state.time.hour += 1;
      }
      
      // Ajustar días si es necesario
      while (state.time.hour >= 24) {
        state.time.hour -= 24;
        state.time.day += 1;
      }
      
      // Ajustar meses si es necesario (simplificado)
      while (state.time.day > 30) {
        state.time.day -= 30;
        state.time.month += 1;
      }
      
      // Ajustar años si es necesario
      while (state.time.month > 12) {
        state.time.month -= 12;
        state.time.year += 1;
      }
      
      // Actualizar timestamp del último tick
      state.time.lastTick = Date.now();
    },
    
    // Cambiar la velocidad del juego
    setGameSpeed: (state, action: PayloadAction<GameTime['speed']>) => {
      state.time.speed = action.payload;
    },
    
    // Pausar o reanudar el juego
    togglePause: (state) => {
      state.gamePaused = !state.gamePaused;
    },
    
    // Añadir un evento al juego
    addEvent: (state, action: PayloadAction<GameEvent>) => {
      state.events[action.payload.id] = action.payload;
    },
    
    // Activar o desactivar un evento
    toggleEventActive: (state, action: PayloadAction<{ eventId: string; active: boolean }>) => {
      const { eventId, active } = action.payload;
      if (state.events[eventId]) {
        state.events[eventId].isActive = active;
      }
    },
    
    // Añadir una notificación
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: Date.now(),
        read: false
      };
      
      state.notifications.unshift(notification);
      
      // Limitar a 50 notificaciones
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    
    // Marcar notificación como leída
    markNotificationAsRead: (state, action: PayloadAction<{ notificationId: string }>) => {
      const { notificationId } = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    },
    
    // Marcar todas las notificaciones como leídas
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    
    // Iniciar el juego
    startGame: (state, action: PayloadAction<{ difficulty: GameStateState['difficulty'] }>) => {
      state.difficulty = action.payload.difficulty;
      state.gameStarted = true;
      state.gamePaused = false;
      state.time.lastTick = Date.now();
    },
    
    // Completar tutorial
    completeTutorial: (state) => {
      state.tutorialCompleted = true;
    }
  }
});

// Exportar acciones y reducer
export const { 
  advanceTime,
  setGameSpeed,
  togglePause,
  addEvent,
  toggleEventActive,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  startGame,
  completeTutorial
} = gameStateSlice.actions;

export default gameStateSlice.reducer;
