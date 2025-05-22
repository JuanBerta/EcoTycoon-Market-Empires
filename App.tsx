// Componente principal para integrar todos los paneles
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

// Componentes de layout
import MainLayout from './components/layout/MainLayout';

// Componentes de paneles
import DashboardPanel from './components/dashboard/DashboardPanel';
import ProductionPanel from './components/production/ProductionPanel';
import MarketPanel from './components/market/MarketPanel';
import LogisticsPanel from './components/logistics/LogisticsPanel';
import ResearchPanel from './components/research/ResearchPanel';

// Acciones y selectores
import { 
  setActivePanel, 
  loadDashboardData,
  loadProductionData,
  loadMarketData,
  loadLogisticsData,
  loadResearchData,
  selectUnreadNotifications
} from './store/slices/uiSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  
  // Obtener estado de Redux
  const activePanel = useSelector((state: any) => state.ui.activePanel);
  const loading = useSelector((state: any) => state.ui.loading);
  const notifications = useSelector(selectUnreadNotifications);
  
  // Estado para simulación de datos del juego
  const [playerMoney, setPlayerMoney] = useState(100000);
  const [gameTime, setGameTime] = useState({ day: 1, month: 1, year: 1 });
  const [gameSpeed, setGameSpeed] = useState<'paused' | 'normal' | 'fast' | 'ultra'>('normal');
  
  // Cargar datos iniciales
  useEffect(() => {
    // Cargar datos del panel activo
    loadPanelData(activePanel);
    
    // Simular actualización de tiempo de juego
    const timer = setInterval(() => {
      if (gameSpeed !== 'paused') {
        updateGameTime();
      }
    }, getSpeedInterval());
    
    return () => clearInterval(timer);
  }, [activePanel, gameSpeed]);
  
  // Función para cargar datos según el panel activo
  const loadPanelData = (panel: string) => {
    switch (panel) {
      case 'dashboard':
        dispatch(loadDashboardData());
        break;
      case 'production':
        dispatch(loadProductionData());
        break;
      case 'market':
        dispatch(loadMarketData());
        break;
      case 'logistics':
        dispatch(loadLogisticsData());
        break;
      case 'research':
        dispatch(loadResearchData());
        break;
    }
  };
  
  // Función para actualizar el tiempo de juego
  const updateGameTime = () => {
    setGameTime(prevTime => {
      let newDay = prevTime.day + 1;
      let newMonth = prevTime.month;
      let newYear = prevTime.year;
      
      if (newDay > 30) {
        newDay = 1;
        newMonth++;
      }
      
      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }
      
      return { day: newDay, month: newMonth, year: newYear };
    });
    
    // Simular cambios en dinero del jugador
    const change = Math.random() > 0.5 ? 
      Math.floor(Math.random() * 5000) : 
      -Math.floor(Math.random() * 3000);
    
    setPlayerMoney(prev => Math.max(0, prev + change));
  };
  
  // Obtener intervalo según velocidad
  const getSpeedInterval = () => {
    switch (gameSpeed) {
      case 'paused': return 1000;
      case 'normal': return 1000;
      case 'fast': return 500;
      case 'ultra': return 200;
      default: return 1000;
    }
  };
  
  // Manejar cambio de panel
  const handlePanelChange = (panelId: string) => {
    dispatch(setActivePanel(panelId as any));
  };
  
  // Manejar cambio de velocidad
  const handleSpeedChange = (speed: 'paused' | 'normal' | 'fast' | 'ultra') => {
    setGameSpeed(speed);
  };
  
  // Renderizar panel activo
  const renderActivePanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <DashboardPanel 
          loading={loading.dashboard}
          playerMoney={playerMoney}
          playerAssets={250000}
          playerLiabilities={50000}
        />;
      case 'production':
        return <ProductionPanel 
          loading={loading.production}
        />;
      case 'market':
        return <MarketPanel 
          loading={loading.market}
        />;
      case 'logistics':
        return <LogisticsPanel 
          loading={loading.logistics}
        />;
      case 'research':
        return <ResearchPanel 
          loading={loading.research}
        />;
      default:
        return <DashboardPanel 
          loading={loading.dashboard}
          playerMoney={playerMoney}
          playerAssets={250000}
          playerLiabilities={50000}
        />;
    }
  };

  return (
    <MainLayout 
      playerMoney={playerMoney}
      gameTime={gameTime}
      notifications={notifications}
      onMenuItemClick={handlePanelChange}
      gameSpeed={gameSpeed}
      onSpeedChange={handleSpeedChange}
      systemMessages={['Sistema funcionando correctamente']}
    >
      {renderActivePanel()}
    </MainLayout>
  );
};

export default App;
