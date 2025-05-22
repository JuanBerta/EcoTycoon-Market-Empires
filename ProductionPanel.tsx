// Aplicación de optimizaciones de rendimiento al ProductionPanel
import React, { useCallback, useMemo } from 'react';
import './ProductionPanel.css';
import Card from '../common/Card';
import Table from '../common/Table';
import Chart from '../common/Chart';
import FactoryCard from './FactoryCard';
import { 
  optimizeComponent, 
  useOptimizedData, 
  useOptimizedCallback,
  VirtualizedList
} from '../../utils/performanceOptimizations';

// Datos simulados para el panel de producción (optimizados con useMemo)
const useMockData = () => {
  return useMemo(() => ({
    factories: [
      { 
        id: 'factory1', 
        name: 'Fábrica de Alimentos', 
        type: 'food', 
        efficiency: 85, 
        capacity: 100,
        utilization: 75,
        location: 'Región Central',
        products: ['Alimentos Básicos', 'Alimentos Gourmet']
      },
      { 
        id: 'factory2', 
        name: 'Planta Electrónica', 
        type: 'electronics', 
        efficiency: 72, 
        capacity: 80,
        utilization: 90,
        location: 'Región Sur',
        products: ['Electrónica Básica', 'Componentes Avanzados']
      },
      { 
        id: 'factory3', 
        name: 'Textiles Modernos', 
        type: 'textiles', 
        efficiency: 80, 
        capacity: 120,
        utilization: 60,
        location: 'Región Norte',
        products: ['Ropa Básica', 'Textiles Industriales']
      }
    ],
    productionLines: [
      { 
        id: 'line1', 
        factoryId: 'factory1',
        product: 'Alimentos Básicos', 
        quantity: 100, 
        quality: 75, 
        timeRemaining: 120, // en minutos
        progress: 67,
        cost: 5000,
        status: 'active'
      },
      { 
        id: 'line2', 
        factoryId: 'factory2',
        product: 'Electrónica Básica', 
        quantity: 50, 
        quality: 85, 
        timeRemaining: 240, // en minutos
        progress: 33,
        cost: 12000,
        status: 'active'
      },
      { 
        id: 'line3', 
        factoryId: 'factory3',
        product: 'Ropa Básica', 
        quantity: 75, 
        quality: 80, 
        timeRemaining: 180, // en minutos
        progress: 50,
        cost: 7500,
        status: 'active'
      },
      { 
        id: 'line4', 
        factoryId: 'factory1',
        product: 'Alimentos Gourmet', 
        quantity: 25, 
        quality: 95, 
        timeRemaining: 0, // en minutos
        progress: 100,
        cost: 8000,
        status: 'completed'
      }
    ],
    resources: [
      { id: 'res1', name: 'Materias Primas Alimentarias', stock: 250, demand: 300, status: 'low' },
      { id: 'res2', name: 'Componentes Electrónicos', stock: 180, demand: 100, status: 'high' },
      { id: 'res3', name: 'Materiales Textiles', stock: 120, demand: 125, status: 'optimal' },
      { id: 'res4', name: 'Embalajes', stock: 400, demand: 350, status: 'high' },
      { id: 'res5', name: 'Productos Químicos', stock: 80, demand: 150, status: 'critical' }
    ],
    qualityData: {
      labels: ['Alimentos', 'Electrónica', 'Textiles', 'Químicos', 'Lujo'],
      series: [
        {
          name: 'Tu Calidad',
          data: [85, 78, 80, 65, 90],
          color: '#1a73e8'
        },
        {
          name: 'Media del Mercado',
          data: [70, 75, 72, 68, 82],
          color: '#5f6368'
        }
      ]
    }
  }), []);
};

interface ProductionPanelProps {
  loading?: boolean;
}

// Componente optimizado para el panel de producción
const ProductionPanel: React.FC<ProductionPanelProps> = ({
  loading = false
}) => {
  // Obtener datos optimizados
  const mockData = useMockData();
  
  // Estado para fábrica seleccionada (usando useState normal ya que cambia con interacción)
  const [selectedFactory, setSelectedFactory] = React.useState<string | null>(null);
  
  // Filtrar líneas de producción por fábrica seleccionada (optimizado)
  const filteredProductionLines = useMemo(() => {
    return selectedFactory 
      ? mockData.productionLines.filter(line => line.factoryId === selectedFactory)
      : mockData.productionLines;
  }, [selectedFactory, mockData.productionLines]);
  
  // Columnas para la tabla de líneas de producción (memoizadas)
  const productionColumns = useMemo(() => [
    { id: 'product', label: 'Producto', sortable: true },
    { 
      id: 'quantity', 
      label: 'Cantidad', 
      sortable: true,
      align: 'right' as const
    },
    { 
      id: 'quality', 
      label: 'Calidad', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value}%`
    },
    { 
      id: 'timeRemaining', 
      label: 'Tiempo Restante', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        if (value === 0) return 'Completado';
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}h ${minutes}m`;
      }
    },
    { 
      id: 'progress', 
      label: 'Progreso', 
      sortable: true,
      format: (value: number) => (
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${value}%` }}
          ></div>
          <span className="progress-text">{value}%</span>
        </div>
      )
    },
    { 
      id: 'status', 
      label: 'Estado', 
      sortable: true,
      format: (value: string) => {
        const statusMap: Record<string, { label: string, color: string }> = {
          'active': { label: 'Activo', color: '#34a853' },
          'paused': { label: 'Pausado', color: '#fbbc05' },
          'completed': { label: 'Completado', color: '#1a73e8' },
          'error': { label: 'Error', color: '#ea4335' }
        };
        
        const status = statusMap[value] || { label: value, color: '#5f6368' };
        
        return (
          <span className="status-badge" style={{ backgroundColor: status.color }}>
            {status.label}
          </span>
        );
      }
    }
  ], []);
  
  // Columnas para la tabla de recursos (memoizadas)
  const resourceColumns = useMemo(() => [
    { id: 'name', label: 'Recurso', sortable: true },
    { 
      id: 'stock', 
      label: 'Stock Actual', 
      sortable: true,
      align: 'right' as const
    },
    { 
      id: 'demand', 
      label: 'Demanda Semanal', 
      sortable: true,
      align: 'right' as const
    },
    { 
      id: 'status', 
      label: 'Estado', 
      sortable: true,
      format: (value: string) => {
        const statusMap: Record<string, { label: string, color: string }> = {
          'critical': { label: 'Crítico', color: '#ea4335' },
          'low': { label: 'Bajo', color: '#fbbc05' },
          'optimal': { label: 'Óptimo', color: '#34a853' },
          'high': { label: 'Exceso', color: '#1a73e8' }
        };
        
        const status = statusMap[value] || { label: value, color: '#5f6368' };
        
        return (
          <span className="status-badge" style={{ backgroundColor: status.color }}>
            {status.label}
          </span>
        );
      }
    }
  ], []);
  
  // Acciones para la tabla de recursos (memoizadas)
  const resourceActions = useMemo(() => [
    {
      label: 'Pedir',
      icon: '🛒',
      onClick: (row: any) => console.log('Pedir recurso', row),
      disabled: (row: any) => row.status === 'high'
    }
  ], []);
  
  // Acciones para la tabla de líneas de producción (memoizadas)
  const productionActions = useMemo(() => [
    {
      label: 'Pausar',
      icon: '⏸️',
      onClick: (row: any) => console.log('Pausar línea', row),
      disabled: (row: any) => row.status !== 'active'
    },
    {
      label: 'Detalles',
      icon: '🔍',
      onClick: (row: any) => console.log('Ver detalles', row),
      disabled: () => false
    }
  ], []);

  // Callback optimizado para selección de fábrica
  const handleFactorySelect = useOptimizedCallback((factoryId: string) => {
    setSelectedFactory(prevId => prevId === factoryId ? null : factoryId);
  }, []);

  // Callback optimizado para click en fila de producción
  const handleProductionRowClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionada línea', row);
  }, []);

  // Renderizado optimizado de tarjetas de fábricas
  const renderFactoryCards = useCallback(() => {
    return (
      <div className="factories-grid">
        {mockData.factories.map(factory => (
          <FactoryCard 
            key={factory.id}
            factory={factory}
            selected={selectedFactory === factory.id}
            onClick={() => handleFactorySelect(factory.id)}
            loading={loading}
          />
        ))}
        <div className="new-factory-card">
          <div className="new-factory-content">
            <div className="plus-icon">+</div>
            <div className="new-factory-text">Nueva Fábrica</div>
          </div>
        </div>
      </div>
    );
  }, [mockData.factories, selectedFactory, loading, handleFactorySelect]);

  return (
    <div className="production-panel">
      <div className="production-header">
        <h2>Gestión de Producción</h2>
        <div className="production-actions">
          <button className="action-button primary">
            <span className="icon">➕</span>
            Nueva Fábrica
          </button>
          <button className="action-button">
            <span className="icon">➕</span>
            Nueva Línea
          </button>
        </div>
      </div>
      
      <div className="production-summary">
        <Card 
          title="Resumen de Producción" 
          loading={loading}
        >
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-label">Eficiencia Global</div>
              <div className="stat-value">78%</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Capacidad Utilizada</div>
              <div className="stat-value">75%</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Líneas Activas</div>
              <div className="stat-value">3</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Costo Operativo</div>
              <div className="stat-value">$24,500</div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="factories-section">
        <h3>Fábricas</h3>
        {renderFactoryCards()}
      </div>
      
      <div className="production-grid">
        <Card 
          title={`Líneas de Producción ${selectedFactory ? '- ' + mockData.factories.find(f => f.id === selectedFactory)?.name : 'Activas'}`}
          loading={loading}
          actions={
            <button className="action-button small">
              <span className="icon">➕</span>
              Nueva Línea
            </button>
          }
        >
          <Table 
            columns={productionColumns}
            data={filteredProductionLines}
            pagination={true}
            rowsPerPage={5}
            actions={productionActions}
            onRowClick={handleProductionRowClick}
            emptyMessage="No hay líneas de producción activas"
          />
        </Card>
        
        <div className="resources-quality-grid">
          <Card 
            title="Recursos"
            loading={loading}
            className="resources-card"
          >
            <Table 
              columns={resourceColumns}
              data={mockData.resources}
              pagination={false}
              actions={resourceActions}
              emptyMessage="No hay recursos disponibles"
            />
          </Card>
          
          <Card 
            title="Control de Calidad"
            loading={loading}
            className="quality-card"
          >
            <Chart 
              type="bar"
              labels={mockData.qualityData.labels}
              series={mockData.qualityData.series}
              height={220}
              showGrid={true}
              showLegend={true}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

// Exportar componente optimizado
export default optimizeComponent(ProductionPanel);
