// Integración de MainLayout con los componentes de layout
import React from 'react';
import './MainLayout.css';

// Componentes de layout
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
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
  onMenuItemClick: (id: string) => void;
  gameSpeed: 'paused' | 'normal' | 'fast' | 'ultra';
  onSpeedChange: (speed: 'paused' | 'normal' | 'fast' | 'ultra') => void;
  systemMessages: string[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  playerMoney, 
  gameTime, 
  notifications,
  onMenuItemClick,
  gameSpeed,
  onSpeedChange,
  systemMessages
}) => {
  return (
    <div className="main-layout">
      <Header 
        playerMoney={playerMoney}
        gameTime={gameTime}
        notifications={notifications}
      />
      <div className="main-content-wrapper">
        <Sidebar onMenuItemClick={onMenuItemClick} />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer 
        gameSpeed={gameSpeed}
        onSpeedChange={onSpeedChange}
        systemMessages={systemMessages}
      />
    </div>
  );
};

export default MainLayout;
