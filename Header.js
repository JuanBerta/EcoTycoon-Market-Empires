"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Componente Header
var react_1 = require("react");
require("./Header.css");
var Header = function (_a) {
    var _b = _a.playerMoney, playerMoney = _b === void 0 ? 100000 : _b, _c = _a.gameTime, gameTime = _c === void 0 ? { day: 1, month: 1, year: 1 } : _c, _d = _a.notifications, notifications = _d === void 0 ? [] : _d;
    var _e = (0, react_1.useState)(false), showNotifications = _e[0], setShowNotifications = _e[1];
    var formatMoney = function (amount) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };
    var toggleNotifications = function () {
        setShowNotifications(!showNotifications);
    };
    return (<header className="game-header">
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
          <button className="notifications-button" onClick={toggleNotifications}>
            <span className="icon">🔔</span>
            {notifications.length > 0 && (<span className="notification-badge">{notifications.length}</span>)}
          </button>
          
          {showNotifications && notifications.length > 0 && (<div className="notifications-dropdown">
              <h3>Notificaciones</h3>
              <ul className="notifications-list">
                {notifications.map(function (notification) { return (<li key={notification.id} className={"notification-item ".concat(notification.type)}>
                    {notification.message}
                  </li>); })}
              </ul>
            </div>)}
        </div>
        
        <button className="settings-button">
          <span className="icon">⚙️</span>
        </button>
      </div>
    </header>);
};
exports.default = Header;
