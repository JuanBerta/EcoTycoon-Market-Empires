// Componentes UI principales para EcoTycoon
import React from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { togglePause, setGameSpeed } from '../store/slices/gameStateSlice';

// Componente principal de la interfaz de usuario
export const GameUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const gameState = useAppSelector(state => state.gameState);
  
  return (
    <div className="game-ui">
      <header className="game-header">
        <h1>EcoTycoon: Market Empires</h1>
        <GameControls />
      </header>
      
      <main className="game-main">
        <div className="game-sidebar">
          <CompanyInfo />
          <ResourcesPanel />
        </div>
        
        <div className="game-content">
          <GameMap />
          <NotificationsPanel />
        </div>
      </main>
      
      <footer className="game-footer">
        <GameTime />
        <GameStats />
      </footer>
    </div>
  );
};

// Controles del juego (pausa, velocidad)
export const GameControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { gamePaused, time } = useAppSelector(state => state.gameState);
  
  const handlePauseToggle = () => {
    dispatch(togglePause());
  };
  
  const handleSpeedChange = (speed: 'paused' | 'normal' | 'fast' | 'ultra') => {
    dispatch(setGameSpeed(speed));
  };
  
  return (
    <div className="game-controls">
      <button 
        onClick={handlePauseToggle}
        className="control-button"
      >
        {gamePaused ? 'Play' : 'Pause'}
      </button>
      
      <div className="speed-controls">
        <button 
          onClick={() => handleSpeedChange('normal')}
          className={`speed-button ${time.speed === 'normal' ? 'active' : ''}`}
        >
          1x
        </button>
        <button 
          onClick={() => handleSpeedChange('fast')}
          className={`speed-button ${time.speed === 'fast' ? 'active' : ''}`}
        >
          2x
        </button>
        <button 
          onClick={() => handleSpeedChange('ultra')}
          className={`speed-button ${time.speed === 'ultra' ? 'active' : ''}`}
        >
          3x
        </button>
      </div>
    </div>
  );
};

// Información de la compañía del jugador
export const CompanyInfo: React.FC = () => {
  const playerCompanyId = useAppSelector(state => state.entities.playerCompanyId);
  const companies = useAppSelector(state => state.entities.companies);
  
  if (!playerCompanyId || !companies[playerCompanyId]) {
    return <div className="company-info">No company data available</div>;
  }
  
  const playerCompany = companies[playerCompanyId];
  
  return (
    <div className="company-info">
      <h2>{playerCompany.name}</h2>
      <div className="company-stats">
        <div className="stat">
          <span className="stat-label">Cash:</span>
          <span className="stat-value">${playerCompany.cash.toLocaleString()}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Reputation:</span>
          <span className="stat-value">{playerCompany.reputation}/100</span>
        </div>
        <div className="stat">
          <span className="stat-label">Buildings:</span>
          <span className="stat-value">{playerCompany.buildings.length}</span>
        </div>
      </div>
    </div>
  );
};

// Panel de recursos
export const ResourcesPanel: React.FC = () => {
  const resources = useAppSelector(state => state.economy.resources);
  
  return (
    <div className="resources-panel">
      <h3>Resources</h3>
      <div className="resources-list">
        {Object.values(resources).map(resource => (
          <div key={resource.id} className="resource-item">
            <span className="resource-name">{resource.name}</span>
            <span className="resource-price">${resource.basePrice.current}</span>
            <span className={`resource-trend ${resource.basePrice.trend}`}>
              {resource.basePrice.trend === 'rising' ? '↑' : 
               resource.basePrice.trend === 'falling' ? '↓' : '→'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mapa del juego
export const GameMap: React.FC = () => {
  const locations = useAppSelector(state => state.entities.locations);
  
  return (
    <div className="game-map">
      <h3>Game Map</h3>
      <div className="map-container">
        {/* Aquí iría el renderizado del mapa con Pixi.js */}
        <div className="map-placeholder">
          <p>Map Visualization</p>
          <p>Regions: {Object.keys(locations).length}</p>
        </div>
      </div>
    </div>
  );
};

// Panel de notificaciones
export const NotificationsPanel: React.FC = () => {
  const notifications = useAppSelector(state => state.gameState.notifications);
  
  return (
    <div className="notifications-panel">
      <h3>Notifications</h3>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.slice(0, 5).map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
            >
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-time">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Tiempo del juego
export const GameTime: React.FC = () => {
  const { time } = useAppSelector(state => state.gameState);
  
  return (
    <div className="game-time">
      <div className="date">
        Day {time.day}, Month {time.month}, Year {time.year}
      </div>
      <div className="time">
        {time.hour.toString().padStart(2, '0')}:{time.minute.toString().padStart(2, '0')}
      </div>
    </div>
  );
};

// Estadísticas del juego
export const GameStats: React.FC = () => {
  // Aquí se mostrarían estadísticas generales del juego
  return (
    <div className="game-stats">
      <div className="stat">
        <span className="stat-label">Market Index:</span>
        <span className="stat-value">1,245</span>
      </div>
      <div className="stat">
        <span className="stat-label">Global Demand:</span>
        <span className="stat-value">High</span>
      </div>
      <div className="stat">
        <span className="stat-label">Competition:</span>
        <span className="stat-value">Medium</span>
      </div>
    </div>
  );
};
