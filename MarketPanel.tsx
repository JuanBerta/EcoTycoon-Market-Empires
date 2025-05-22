// Aplicación de optimizaciones de rendimiento al MarketPanel
import React, { useCallback, useMemo } from 'react';
import './MarketPanel.css';
import Card from '../common/Card';
import Chart from '../common/Chart';
import Table from '../common/Table';
import { 
  optimizeComponent, 
  useOptimizedData, 
  useOptimizedCallback,
  BatchedRender
} from '../../utils/performanceOptimizations';

// Datos simulados para el panel de mercado (optimizados con useMemo)
const useMockData = () => {
  return useMemo(() => ({
    priceData: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      series: [
        {
          name: 'Tu precio',
          data: [100, 105, 103, 107, 110, 112],
          color: '#1a73e8'
        },
        {
          name: 'Precio medio',
          data: [95, 98, 100, 103, 105, 108],
          color: '#5f6368'
        },
        {
          name: 'Competidor principal',
          data: [90, 95, 97, 100, 102, 105],
          color: '#ea4335'
        }
      ]
    },
    regions: [
      { id: 'north', name: 'Región Norte', demandLevel: 40, competition: 30, growth: 5 },
      { id: 'central', name: 'Región Central', demandLevel: 65, competition: 70, growth: 2 },
      { id: 'south', name: 'Región Sur', demandLevel: 80, competition: 50, growth: 8 }
    ],
    competitors: [
      { 
        id: 'comp1', 
        name: 'Competidor Alpha', 
        marketShare: 25, 
        priceLevel: 'premium', 
        quality: 85,
        regions: ['Región Central', 'Región Sur'],
        products: ['Electrónica Avanzada', 'Alimentos Gourmet']
      },
      { 
        id: 'comp2', 
        name: 'Innovaciones Beta', 
        marketShare: 15, 
        priceLevel: 'low', 
        quality: 65,
        regions: ['Región Norte', 'Región Central'],
        products: ['Electrónica Básica', 'Textiles Industriales']
      },
      { 
        id: 'comp3', 
        name: 'Corporación Gamma', 
        marketShare: 30, 
        priceLevel: 'medium', 
        quality: 75,
        regions: ['Región Central', 'Región Sur'],
        products: ['Alimentos Básicos', 'Productos Químicos']
      },
      { 
        id: 'comp4', 
        name: 'Emprendimientos Delta', 
        marketShare: 10, 
        priceLevel: 'premium', 
        quality: 90,
        regions: ['Región Sur'],
        products: ['Artículos de Lujo', 'Textiles Premium']
      }
    ],
    opportunities: [
      { 
        id: 'opp1', 
        product: 'Alimentos Gourmet', 
        region: 'Región Norte', 
        demand: 'Alta', 
        competition: 'Baja',
        potential: 85,
        investment: 50000
      },
      { 
        id: 'opp2', 
        product: 'Electrónica Avanzada', 
        region: 'Región Central', 
        demand: 'Media', 
        competition: 'Alta',
        potential: 60,
        investment: 120000
      },
      { 
        id: 'opp3', 
        product: 'Textiles Premium', 
        region: 'Región Sur', 
        demand: 'Alta', 
        competition: 'Media',
        potential: 75,
        investment: 80000
      },
      { 
        id: 'opp4', 
        product: 'Productos Químicos', 
        region: 'Región Norte', 
        demand: 'Baja', 
        competition: 'Baja',
        potential: 50,
        investment: 40000
      }
    ]
  }), []);
};

// Componente optimizado para región de demanda
const DemandRegion = React.memo(({ region }: { region: any }) => {
  return (
    <div key={region.id} className="demand-region">
      <div className="region-header">
        <h4>{region.name}</h4>
        <div className="region-growth">
          <span className={region.growth > 0 ? 'positive' : 'negative'}>
            {region.growth > 0 ? '+' : ''}{region.growth}%
          </span>
        </div>
      </div>
      
      <div className="region-metrics">
        <div className="region-metric">
          <div className="metric-label">Demanda</div>
          <div className="demand-bar-container">
            <div 
              className="demand-bar" 
              style={{ width: `${region.demandLevel}%` }}
            ></div>
            <span className="demand-value">{region.demandLevel}%</span>
          </div>
        </div>
        
        <div className="region-metric">
          <div className="metric-label">Competencia</div>
          <div className="competition-bar-container">
            <div 
              className="competition-bar" 
              style={{ width: `${region.competition}%` }}
            ></div>
            <span className="competition-value">{region.competition}%</span>
          </div>
        </div>
      </div>
    </div>
  );
});

interface MarketPanelProps {
  loading?: boolean;
}

const MarketPanel: React.FC<MarketPanelProps> = ({
  loading = false
}) => {
  // Obtener datos optimizados
  const mockData = useMockData();
  
  // Estados para filtros (usando useState normal ya que cambian con interacción)
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [periodFilter, setPeriodFilter] = React.useState('6m');
  
  // Columnas para la tabla de competidores (memoizadas)
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
      id: 'priceLevel', 
      label: 'Nivel de Precio', 
      sortable: true,
      format: (value: string) => {
        const priceLevels: Record<string, { label: string, color: string }> = {
          'premium': { label: 'Premium', color: '#673ab7' },
          'medium': { label: 'Medio', color: '#1a73e8' },
          'low': { label: 'Económico', color: '#34a853' }
        };
        
        const level = priceLevels[value] || { label: value, color: '#5f6368' };
        
        return (
          <span className="price-level-badge" style={{ color: level.color }}>
            {level.label}
          </span>
        );
      }
    },
    { 
      id: 'quality', 
      label: 'Calidad', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        let color = '#ea4335';
        if (value >= 80) color = '#34a853';
        else if (value >= 65) color = '#fbbc05';
        
        return (
          <span style={{ color }}>{value}%</span>
        );
      }
    },
    { 
      id: 'regions', 
      label: 'Regiones', 
      sortable: false,
      format: (value: string[]) => (
        <div className="regions-list">
          {value.map((region, index) => (
            <span key={index} className="region-tag">{region}</span>
          ))}
        </div>
      )
    }
  ], []);
  
  // Columnas para la tabla de oportunidades (memoizadas)
  const opportunityColumns = useMemo(() => [
    { id: 'product', label: 'Producto', sortable: true },
    { id: 'region', label: 'Región', sortable: true },
    { 
      id: 'demand', 
      label: 'Demanda', 
      sortable: true,
      format: (value: string) => {
        const demandLevels: Record<string, { color: string }> = {
          'Alta': { color: '#34a853' },
          'Media': { color: '#fbbc05' },
          'Baja': { color: '#ea4335' }
        };
        
        const level = demandLevels[value] || { color: '#5f6368' };
        
        return (
          <span style={{ color: level.color, fontWeight: 'bold' }}>
            {value}
          </span>
        );
      }
    },
    { 
      id: 'competition', 
      label: 'Competencia', 
      sortable: true,
      format: (value: string) => {
        const competitionLevels: Record<string, { color: string }> = {
          'Alta': { color: '#ea4335' },
          'Media': { color: '#fbbc05' },
          'Baja': { color: '#34a853' }
        };
        
        const level = competitionLevels[value] || { color: '#5f6368' };
        
        return (
          <span style={{ color: level.color, fontWeight: 'bold' }}>
            {value}
          </span>
        );
      }
    },
    { 
      id: 'potential', 
      label: 'Potencial', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        let color = '#ea4335';
        if (value >= 75) color = '#34a853';
        else if (value >= 60) color = '#fbbc05';
        
        return (
          <div className="potential-container">
            <div 
              className="potential-bar" 
              style={{ width: `${value}%`, backgroundColor: color }}
            ></div>
            <span className="potential-text">{value}%</span>
          </div>
        );
      }
    },
    { 
      id: 'investment', 
      label: 'Inversión', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `$${value.toLocaleString()}`
    }
  ], []);
  
  // Acciones para la tabla de oportunidades (memoizadas)
  const opportunityActions = useMemo(() => [
    {
      label: 'Explorar',
      icon: '🔍',
      onClick: (row: any) => console.log('Explorar oportunidad', row)
    },
    {
      label: 'Invertir',
      icon: '💰',
      onClick: (row: any) => console.log('Invertir en oportunidad', row)
    }
  ], []);

  // Callbacks optimizados
  const handleCategoryChange = useOptimizedCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  }, []);

  const handleRegionChange = useOptimizedCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(e.target.value);
  }, []);

  const handlePeriodChange = useOptimizedCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriodFilter(e.target.value);
  }, []);

  const handleCompetitorClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionado competidor', row);
  }, []);

  const handleOpportunityClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionada oportunidad', row);
  }, []);

  // Renderizado optimizado de regiones de demanda
  const renderDemandRegions = useCallback(() => {
    return (
      <div className="demand-map">
        <BatchedRender
          items={mockData.regions}
          batchSize={10}
          renderItem={(region, index) => (
            <DemandRegion key={region.id} region={region} />
          )}
        />
      </div>
    );
  }, [mockData.regions]);

  return (
    <div className="market-panel">
      <div className="market-header">
        <h2>Análisis de Mercado</h2>
        <div className="market-filters">
          <div className="filter-group">
            <label>Categoría:</label>
            <select 
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">Todas</option>
              <option value="food">Alimentos</option>
              <option value="electronics">Electrónica</option>
              <option value="textiles">Textiles</option>
              <option value="chemicals">Químicos</option>
              <option value="luxury">Lujo</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Región:</label>
            <select 
              value={regionFilter}
              onChange={handleRegionChange}
            >
              <option value="all">Todas</option>
              <option value="north">Norte</option>
              <option value="central">Central</option>
              <option value="south">Sur</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Período:</label>
            <select 
              value={periodFilter}
              onChange={handlePeriodChange}
            >
              <option value="1m">1 mes</option>
              <option value="3m">3 meses</option>
              <option value="6m">6 meses</option>
              <option value="1y">1 año</option>
            </select>
          </div>
          
          <button className="filter-apply-button">
            Aplicar Filtros
          </button>
        </div>
      </div>
      
      <div className="market-grid">
        <Card 
          title="Tendencias de Precios" 
          className="price-trends-card"
          loading={loading}
        >
          <Chart 
            type="line"
            labels={mockData.priceData.labels}
            series={mockData.priceData.series}
            height={300}
            showGrid={true}
            showLegend={true}
          />
        </Card>
        
        <div className="market-row">
          <Card 
            title="Mapa de Calor de Demanda" 
            className="demand-map-card"
            loading={loading}
          >
            {renderDemandRegions()}
          </Card>
          
          <Card 
            title="Análisis de Competencia" 
            className="competition-card"
            loading={loading}
          >
            <Table 
              columns={competitorColumns}
              data={mockData.competitors}
              pagination={false}
              actions={[
                {
                  label: 'Detalles',
                  icon: '🔍',
                  onClick: (row) => console.log('Ver detalles de competidor', row)
                }
              ]}
              onRowClick={handleCompetitorClick}
            />
          </Card>
        </div>
        
        <Card 
          title="Oportunidades Detectadas" 
          className="opportunities-card"
          loading={loading}
        >
          <Table 
            columns={opportunityColumns}
            data={mockData.opportunities}
            pagination={true}
            rowsPerPage={5}
            actions={opportunityActions}
            onRowClick={handleOpportunityClick}
          />
        </Card>
      </div>
    </div>
  );
};

// Exportar componente optimizado
export default optimizeComponent(MarketPanel);
