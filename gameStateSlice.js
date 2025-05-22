"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTutorial = exports.startGame = exports.markAllNotificationsAsRead = exports.markNotificationAsRead = exports.addNotification = exports.toggleEventActive = exports.addEvent = exports.togglePause = exports.setGameSpeed = exports.advanceTime = exports.gameStateSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// Estado inicial
const initialState = {
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
exports.gameStateSlice = (0, toolkit_1.createSlice)({
    name: 'gameState',
    initialState,
    reducers: {
        // Avanzar el tiempo del juego
        advanceTime: (state, action) => {
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
        setGameSpeed: (state, action) => {
            state.time.speed = action.payload;
        },
        // Pausar o reanudar el juego
        togglePause: (state) => {
            state.gamePaused = !state.gamePaused;
        },
        // Añadir un evento al juego
        addEvent: (state, action) => {
            state.events[action.payload.id] = action.payload;
        },
        // Activar o desactivar un evento
        toggleEventActive: (state, action) => {
            const { eventId, active } = action.payload;
            if (state.events[eventId]) {
                state.events[eventId].isActive = active;
            }
        },
        // Añadir una notificación
        addNotification: (state, action) => {
            const notification = Object.assign(Object.assign({}, action.payload), { id: `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`, timestamp: Date.now(), read: false });
            state.notifications.unshift(notification);
            // Limitar a 50 notificaciones
            if (state.notifications.length > 50) {
                state.notifications = state.notifications.slice(0, 50);
            }
        },
        // Marcar notificación como leída
        markNotificationAsRead: (state, action) => {
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
        startGame: (state, action) => {
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
_a = exports.gameStateSlice.actions, exports.advanceTime = _a.advanceTime, exports.setGameSpeed = _a.setGameSpeed, exports.togglePause = _a.togglePause, exports.addEvent = _a.addEvent, exports.toggleEventActive = _a.toggleEventActive, exports.addNotification = _a.addNotification, exports.markNotificationAsRead = _a.markNotificationAsRead, exports.markAllNotificationsAsRead = _a.markAllNotificationsAsRead, exports.startGame = _a.startGame, exports.completeTutorial = _a.completeTutorial;
exports.default = exports.gameStateSlice.reducer;
