// Componente Header
import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  playerMoney: number;
  gameTime: {
    day: number;
    month: number;
    year: number;
  };
  notifications: Array<{
    id: string;
    type: 'info' | 'warning' | 'alert';
    message: string;
  }>;
}

const Header: React.FC<HeaderProps> = ({ 
  playerMoney = 100000, 
  gameTime = { day: 1, month: 1, year: 1 },
  notifications = []
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  return (
    <header className="game-header">
      <div className="header-logo">
        <h1>EcoTycoon</h1>
      </div>
      
      <div className="header-info">
        <div className="game-time">
          <span className="time-label">Día:</span>
          <span className="time-value">{gameTime.day}</span>
          <span className="time-label">Mes:</span>
          <span className="time-value">{gameTime.month}</span>
          <span className="time-label">Año:</span>
          <span className="time-value">{gameTime.year}</span>
        </div>
        
        <div className="player-money">
          <span className="money-value">{formatMoney(playerMoney)}</span>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="notifications-container">
          <button 
            className="notifications-button"
            onClick={toggleNotifications}
          >
            <span className="icon">🔔</span>
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
          
          {showNotifications && notifications.length > 0 && (
            <div className="notifications-dropdown">
              <h3>Notificaciones</h3>
              <ul className="notifications-list">
                {notifications.map(notification => (
                  <li 
                    key={notification.id} 
                    className={`notification-item ${notification.type}`}
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <button className="settings-button">
          <span className="icon">⚙️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
