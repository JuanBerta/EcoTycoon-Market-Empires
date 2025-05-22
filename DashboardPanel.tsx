// Aplicación de optimizaciones de rendimiento al DashboardPanel
import React, { useCallback, useMemo } from 'react';
import './DashboardPanel.css';
import Card from '../common/Card';
import Chart from '../common/Chart';
import Table from '../common/Table';
import { 
  optimizeComponent, 
  useOptimizedData, 
  useOptimizedCallback,
  BatchedRender
} from '../../utils/performanceOptimizations';

// Tipos para las props
interface DashboardPanelProps {
  loading?: boolean;
  playerMoney?: number;
  playerAssets?: number;
  playerLiabilities?: number;
}

// Componente optimizado para KPI
const KPICard = React.memo(({ title, value, trend, trendValue, icon }: {
  title: string;
  value: string | number;
  trend: 'positive' | 'negative' | 'neutral';
  trendValue: string;
  icon?: string;
}) => {
  return (
    <div className="kpi-card">
      <Card>
        <div className="kpi-content">
          {icon && <div className="kpi-icon">{icon}</div>}
          <div className="kpi-data">
            <div className="kpi-title">{title}</div>
            <div className="kpi-value">{value}</div>
            <div className={`kpi-trend ${trend}`}>
              {trendValue}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
});

// Componente optimizado para alertas
const AlertItem = React.memo(({ type, message, time }: {
  type: 'info' | 'warning' | 'alert';
  message: string;
  time: string;
}) => {
  return (
    <div className={`alert-item ${type}`}>
      <div className="alert-icon">
        {type === 'info' ? 'ℹ️' : type === 'warning' ? '⚠️' : '🚨'}
      </div>
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        <div className="alert-time">{time}</div>
      </div>
    </div>
  );
});

// Componente principal optimizado
const DashboardPanel: React.FC<DashboardPanelProps> = ({
  loading = false,
  playerMoney = 0,
  playerAssets = 0,
  playerLiabilities = 0
}) => {
  // Datos optimizados para KPIs
  const kpiData = useOptimizedData([
    {
      title: 'Efectivo',
      value: `$${playerMoney.toLocaleString()}`,
      trend: playerMoney > 90000 ? 'positive' : 'negative',
      trendValue: playerMoney > 90000 ? '+5.2%' : '-3.8%',
      icon: '💰'
    },
    {
      title: 'Activos',
      value: `$${playerAssets.toLocaleString()}`,
      trend: 'positive',
      trendValue: '+8.7%',
      icon: '📈'
    },
    {
      title: 'Pasivos',
      value: `$${playerLiabilities.toLocaleString()}`,
      trend: 'negative',
      trendValue: '+2.3%',
      icon: '📉'
    },
    {
      title: 'Patrimonio Neto',
      value: `$${(playerAssets - playerLiabilities).toLocaleString()}`,
      trend: 'positive',
      trendValue: '+12.1%',
      icon: '💎'
    }
  ], [playerMoney, playerAssets, playerLiabilities]);
  
  // Datos optimizados para gráficos
  const chartData = useOptimizedData({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    series: [
      {
        name: 'Ingresos',
        data: [30000, 35000, 32000, 40000, 45000, 50000],
        color: '#34a853'
      },
      {
        name: 'Gastos',
        data: [25000, 28000, 26000, 30000, 32000, 35000],
        color: '#ea4335'
      },
      {
        name: 'Beneficio',
        data: [5000, 7000, 6000, 10000, 13000, 15000],
        color: '#1a73e8'
      }
    ]
  }, []);
  
  // Datos optimizados para alertas
  const alertsData = useOptimizedData([
    {
      type: 'alert',
      message: 'Escasez crítica de materias primas en Región Norte',
      time: 'Hace 5 min'
    },
    {
      type: 'warning',
      message: 'Competidor ha reducido precios en sector electrónica',
      time: 'Hace 15 min'
    },
    {
      type: 'info',
      message: 'Nueva oportunidad de mercado detectada en Región Sur',
      time: 'Hace 30 min'
    },
    {
      type: 'info',
      message: 'Investigación completada: Automatización Avanzada',
      time: 'Hace 45 min'
    }
  ], []);
  
  // Datos optimizados para competidores
  const competitorsData = useOptimizedData([
    { id: 1, name: 'Competidor Alpha', marketShare: 25, growth: 5.2, threat: 'high' },
    { id: 2, name: 'Innovaciones Beta', marketShare: 15, growth: -2.1, threat: 'medium' },
    { id: 3, name: 'Corporación Gamma', marketShare: 30, growth: 1.8, threat: 'high' },
    { id: 4, name: 'Emprendimientos Delta', marketShare: 10, growth: 8.5, threat: 'low' }
  ], []);
  
  // Columnas optimizadas para la tabla
  const competitorColumns = useMemo(() => [
    { id: 'name', label: 'Competidor', sortable: true },
    { 
      id: 'marketShare', 
      label: 'Cuota de Mercado', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value}%`
    },
    { 
      id: 'growth', 
      label: 'Crecimiento', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        const color = value > 0 ? '#34a853' : '#ea4335';
        return (
          <span style={{ color, fontWeight: 'bold' }}>
            {value > 0 ? '+' : ''}{value}%
          </span>
        );
      }
    },
    { 
      id: 'threat', 
      label: 'Amenaza', 
      sortable: true,
      format: (value: string) => {
        const threatLevels: Record<string, { color: string }> = {
          'high': { color: '#ea4335' },
          'medium': { color: '#fbbc05' },
          'low': { color: '#34a853' }
        };
        
        const level = threatLevels[value] || { color: '#5f6368' };
        
        return (
          <span style={{ color: level.color, fontWeight: 'bold' }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      }
    }
  ], []);
  
  // Callbacks optimizados
  const handleCompetitorClick = useOptimizedCallback((row) => {
    console.log('Competidor seleccionado:', row);
  }, []);
  
  const handleAlertClick = useOptimizedCallback((alert) => {
    console.log('Alerta seleccionada:', alert);
  }, []);

  return (
    <div className="dashboard-panel">
      <div className="dashboard-header">
        <h2>Panel de Control</h2>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="kpi-row">
          {kpiData.map((kpi, index) => (
            <KPICard 
              key={index}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon}
            />
          ))}
        </div>
        
        <div className="dashboard-row">
          <Card 
            title="Rendimiento Financiero" 
            className="financial-chart-card"
            loading={loading}
          >
            <Chart 
              type="line"
              labels={chartData.labels}
              series={chartData.series}
              height={300}
              showGrid={true}
              showLegend={true}
            />
          </Card>
          
          <Card 
            title="Alertas Recientes" 
            className="alerts-card"
            loading={loading}
          >
            <div className="alerts-list">
              <BatchedRender
                items={alertsData}
                batchSize={10}
                renderItem={(alert, index) => (
                  <div key={index} onClick={() => handleAlertClick(alert)}>
                    <AlertItem
                      type={alert.type}
                      message={alert.message}
                      time={alert.time}
                    />
                  </div>
                )}
              />
            </div>
          </Card>
        </div>
        
        <div className="dashboard-row">
          <Card 
            title="Mapa de Actividad" 
            className="map-card"
            loading={loading}
          >
            <div className="map-placeholder">
              <div className="map-region north">Región Norte</div>
              <div className="map-region central">Región Central</div>
              <div className="map-region south">Región Sur</div>
              
              <div className="map-marker" style={{ top: '25%', left: '40%' }}>
                🏭
                <div className="activity-indicator">+</div>
              </div>
              <div className="map-marker" style={{ top: '45%', left: '55%' }}>
                🏪
                <div className="activity-indicator">++</div>
              </div>
              <div className="map-marker" style={{ top: '70%', left: '35%' }}>
                🏭
                <div className="activity-indicator">+++</div>
              </div>
            </div>
          </Card>
          
          <Card 
            title="Análisis de Competencia" 
            className="competitors-card"
            loading={loading}
          >
            <Table 
              columns={competitorColumns}
              data={competitorsData}
              pagination={false}
              onRowClick={handleCompetitorClick}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

// Exportar componente optimizado
export default optimizeComponent(DashboardPanel);
