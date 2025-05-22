// Componente Footer
import React from 'react';
import './Footer.css';

interface FooterProps {
  gameSpeed: 'paused' | 'normal' | 'fast' | 'ultra';
  onSpeedChange: (speed: 'paused' | 'normal' | 'fast' | 'ultra') => void;
  systemMessages: string[];
}

const Footer: React.FC<FooterProps> = ({ 
  gameSpeed = 'normal', 
  onSpeedChange,
  systemMessages = []
}) => {
  return (
    <footer className="game-footer">
      <div className="time-controls">
        <button 
          className={`speed-button ${gameSpeed === 'paused' ? 'active' : ''}`}
          onClick={() => onSpeedChange('paused')}
        >
          ⏸️
        </button>
        <button 
          className={`speed-button ${gameSpeed === 'normal' ? 'active' : ''}`}
          onClick={() => onSpeedChange('normal')}
        >
          ▶️
        </button>
        <button 
          className={`speed-button ${gameSpeed === 'fast' ? 'active' : ''}`}
          onClick={() => onSpeedChange('fast')}
        >
          ⏩
        </button>
        <button 
          className={`speed-button ${gameSpeed === 'ultra' ? 'active' : ''}`}
          onClick={() => onSpeedChange('ultra')}
        >
          ⏭️
        </button>
      </div>
      
      <div className="system-messages">
        {systemMessages.length > 0 ? (
          <span className="message">{systemMessages[systemMessages.length - 1]}</span>
        ) : (
          <span className="message default">Sistema funcionando correctamente</span>
        )}
      </div>
      
      <div className="footer-actions">
        <button className="save-button">
          💾 Guardar
        </button>
      </div>
    </footer>
  );
};

export default Footer;
