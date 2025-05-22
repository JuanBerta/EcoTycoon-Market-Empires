// Aplicación de optimizaciones de rendimiento al LogisticsPanel
import React, { useCallback, useMemo } from 'react';
import './LogisticsPanel.css';
import Card from '../common/Card';
import Table from '../common/Table';
import Chart from '../common/Chart';
import { 
  optimizeComponent, 
  useOptimizedData, 
  useOptimizedCallback,
  BatchedRender
} from '../../utils/performanceOptimizations';

// Datos simulados para el panel de logística (optimizados con useMemo)
const useMockData = () => {
  return useMemo(() => ({
    warehouses: [
      { 
        id: 'wh1', 
        name: 'Almacén Central', 
        type: 'general', 
        capacity: 1000,
        occupation: 85,
        location: 'Región Central',
        products: ['Alimentos', 'Electrónica', 'Textiles']
      },
      { 
        id: 'wh2', 
        name: 'Almacén Refrigerado', 
        type: 'refrigerated', 
        capacity: 500,
        occupation: 62,
        location: 'Región Norte',
        products: ['Alimentos Perecederos', 'Productos Químicos']
      },
      { 
        id: 'wh3', 
        name: 'Almacén de Alta Seguridad', 
        type: 'secure', 
        capacity: 300,
        occupation: 40,
        location: 'Región Sur',
        products: ['Electrónica Avanzada', 'Artículos de Lujo']
      }
    ],
    routes: [
      { 
        id: 'route1', 
        origin: 'Fábrica de Alimentos', 
        destination: 'Almacén Central',
        distance: 120,
        time: 2.5,
        cost: 1200,
        efficiency: 85,
        products: ['Alimentos Básicos', 'Alimentos Gourmet']
      },
      { 
        id: 'route2', 
        origin: 'Almacén Central', 
        destination: 'Tienda Principal',
        distance: 50,
        time: 1.0,
        cost: 500,
        efficiency: 90,
        products: ['Alimentos Básicos', 'Electrónica Básica']
      },
      { 
        id: 'route3', 
        origin: 'Planta Electrónica', 
        destination: 'Almacén de Alta Seguridad',
        distance: 200,
        time: 4.0,
        cost: 2000,
        efficiency: 75,
        products: ['Electrónica Avanzada', 'Componentes']
      },
      { 
        id: 'route4', 
        origin: 'Almacén Refrigerado', 
        destination: 'Tienda Norte',
        distance: 80,
        time: 1.5,
        cost: 800,
        efficiency: 80,
        products: ['Alimentos Perecederos']
      }
    ],
    supplyPlan: [
      { 
        id: 'supply1', 
        product: 'Alimentos Básicos', 
        stock: 250,
        demand: 300,
        status: 'shortage',
        supplier: 'Proveedor Alpha',
        leadTime: 3,
        orderCost: 15000
      },
      { 
        id: 'supply2', 
        product: 'Electrónica Básica', 
        stock: 180,
        demand: 100,
        status: 'excess',
        supplier: 'Proveedor Beta',
        leadTime: 5,
        orderCost: 25000
      },
      { 
        id: 'supply3', 
        product: 'Ropa Básica', 
        stock: 120,
        demand: 125,
        status: 'optimal',
        supplier: 'Proveedor Gamma',
        leadTime: 4,
        orderCost: 12000
      },
      { 
        id: 'supply4', 
        product: 'Componentes Electrónicos', 
        stock: 90,
        demand: 150,
        status: 'critical',
        supplier: 'Proveedor Delta',
        leadTime: 7,
        orderCost: 30000
      }
    ],
    logisticsCosts: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      series: [
        {
          name: 'Transporte',
          data: [12000, 13500, 13000, 14500, 15000, 14000],
          color: '#1a73e8'
        },
        {
          name: 'Almacenamiento',
          data: [8000, 8200, 8500, 9000, 9200, 9500],
          color: '#34a853'
        },
        {
          name: 'Gestión',
          data: [3000, 3200, 3100, 3300, 3400, 3500],
          color: '#fbbc05'
        }
      ]
    }
  }), []);
};

// Componente optimizado para tarjeta de almacén
const WarehouseCard = React.memo(({ 
  warehouse, 
  selected, 
  onClick 
}: { 
  warehouse: any, 
  selected: boolean, 
  onClick: () => void 
}) => {
  return (
    <div 
      key={warehouse.id}
      className={`warehouse-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="warehouse-icon">
        {warehouse.type === 'refrigerated' ? '❄️' : 
         warehouse.type === 'secure' ? '🔒' : '🏢'}
      </div>
      <div className="warehouse-info">
        <h4 className="warehouse-name">{warehouse.name}</h4>
        <div className="warehouse-location">{warehouse.location}</div>
        <div className="warehouse-capacity">
          <div className="capacity-bar-container">
            <div 
              className="capacity-bar" 
              style={{ 
                width: `${warehouse.occupation}%`,
                backgroundColor: warehouse.occupation > 90 ? '#ea4335' : 
                                warehouse.occupation > 75 ? '#fbbc05' : '#34a853'
              }}
            ></div>
            <span className="capacity-text">
              {warehouse.occupation}% de {warehouse.capacity} unidades
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

interface LogisticsPanelProps {
  loading?: boolean;
}

const LogisticsPanel: React.FC<LogisticsPanelProps> = ({
  loading = false
}) => {
  // Obtener datos optimizados
  const mockData = useMockData();
  
  // Estado para almacén seleccionado (usando useState normal ya que cambia con interacción)
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<string | null>(null);
  
  // Columnas para la tabla de rutas (memoizadas)
  const routeColumns = useMemo(() => [
    { id: 'origin', label: 'Origen', sortable: true },
    { id: 'destination', label: 'Destino', sortable: true },
    { 
      id: 'distance', 
      label: 'Distancia', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value} km`
    },
    { 
      id: 'time', 
      label: 'Tiempo', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value} h`
    },
    { 
      id: 'cost', 
      label: 'Costo', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `$${value}`
    },
    { 
      id: 'efficiency', 
      label: 'Eficiencia', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        let color = '#ea4335';
        if (value >= 80) color = '#34a853';
        else if (value >= 70) color = '#fbbc05';
        
        return (
          <span style={{ color, fontWeight: 'bold' }}>{value}%</span>
        );
      }
    }
  ], []);
  
  // Columnas para la tabla de plan de suministro (memoizadas)
  const supplyColumns = useMemo(() => [
    { id: 'product', label: 'Producto', sortable: true },
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
          'shortage': { label: 'Escasez', color: '#fbbc05' },
          'optimal': { label: 'Óptimo', color: '#34a853' },
          'excess': { label: 'Exceso', color: '#1a73e8' }
        };
        
        const status = statusMap[value] || { label: value, color: '#5f6368' };
        
        return (
          <span className="status-badge" style={{ backgroundColor: status.color }}>
            {status.label}
          </span>
        );
      }
    },
    { 
      id: 'leadTime', 
      label: 'Tiempo de Entrega', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value} días`
    },
    { 
      id: 'orderCost', 
      label: 'Costo de Pedido', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `$${value}`
    }
  ], []);
  
  // Acciones para la tabla de plan de suministro (memoizadas)
  const supplyActions = useMemo(() => [
    {
      label: 'Pedir',
      icon: '🛒',
      onClick: (row: any) => console.log('Pedir suministro', row),
      disabled: (row: any) => row.status === 'excess'
    },
    {
      label: 'Ajustar',
      icon: '⚙️',
      onClick: (row: any) => console.log('Ajustar plan', row),
      disabled: () => false
    }
  ], []);
  
  // Callbacks optimizados
  const handleWarehouseSelect = useOptimizedCallback((warehouseId: string) => {
    setSelectedWarehouse(prevId => prevId === warehouseId ? null : warehouseId);
  }, []);

  const handleRouteClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionada ruta', row);
  }, []);

  const handleSupplyClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionado suministro', row);
  }, []);

  // Renderizado optimizado de tarjetas de almacenes
  const renderWarehouseCards = useCallback(() => {
    return (
      <div className="warehouses-grid">
        <BatchedRender
          items={mockData.warehouses}
          batchSize={10}
          renderItem={(warehouse, index) => (
            <WarehouseCard 
              key={warehouse.id}
              warehouse={warehouse}
              selected={selectedWarehouse === warehouse.id}
              onClick={() => handleWarehouseSelect(warehouse.id)}
            />
          )}
        />
        <div className="new-warehouse-card">
          <div className="new-warehouse-content">
            <div className="plus-icon">+</div>
            <div className="new-warehouse-text">Nuevo Almacén</div>
          </div>
        </div>
      </div>
    );
  }, [mockData.warehouses, selectedWarehouse, handleWarehouseSelect]);

  return (
    <div className="logistics-panel">
      <div className="logistics-header">
        <h2>Gestión Logística</h2>
        <div className="logistics-actions">
          <button className="action-button primary">
            <span className="icon">➕</span>
            Nuevo Almacén
          </button>
          <button className="action-button">
            <span className="icon">➕</span>
            Nueva Ruta
          </button>
        </div>
      </div>
      
      <div className="logistics-grid">
        <Card 
          title="Red de Distribución" 
          className="distribution-map-card"
          loading={loading}
        >
          <div className="distribution-map">
            <div className="map-placeholder">
              <div className="map-region north">Norte</div>
              <div className="map-region central">Central</div>
              <div className="map-region south">Sur</div>
              
              <div className="map-node factory" style={{ top: '30%', left: '40%' }}>
                <div className="node-icon">🏭</div>
                <div className="node-label">Fábrica de Alimentos</div>
              </div>
              
              <div className="map-node factory" style={{ top: '60%', left: '60%' }}>
                <div className="node-icon">🏭</div>
                <div className="node-label">Planta Electrónica</div>
              </div>
              
              <div className="map-node warehouse" style={{ top: '45%', left: '50%' }}>
                <div className="node-icon">🏢</div>
                <div className="node-label">Almacén Central</div>
              </div>
              
              <div className="map-node warehouse" style={{ top: '25%', left: '30%' }}>
                <div className="node-icon">❄️</div>
                <div className="node-label">Almacén Refrigerado</div>
              </div>
              
              <div className="map-node warehouse" style={{ top: '70%', left: '70%' }}>
                <div className="node-icon">🔒</div>
                <div className="node-label">Almacén de Alta Seguridad</div>
              </div>
              
              <div className="map-node store" style={{ top: '40%', left: '65%' }}>
                <div className="node-icon">🏪</div>
                <div className="node-label">Tienda Principal</div>
              </div>
              
              <div className="map-node store" style={{ top: '20%', left: '45%' }}>
                <div className="node-icon">🏪</div>
                <div className="node-label">Tienda Norte</div>
              </div>
              
              {/* Rutas */}
              <svg className="routes-svg">
                <path d="M 40% 30% L 50% 45%" className="route-path" />
                <path d="M 50% 45% L 65% 40%" className="route-path" />
                <path d="M 60% 60% L 70% 70%" className="route-path" />
                <path d="M 30% 25% L 45% 20%" className="route-path" />
              </svg>
            </div>
          </div>
        </Card>
        
        <div className="warehouses-section">
          <h3>Almacenes</h3>
          {renderWarehouseCards()}
        </div>
        
        <Card 
          title="Rutas de Distribución" 
          className="routes-card"
          loading={loading}
        >
          <Table 
            columns={routeColumns}
            data={mockData.routes}
            pagination={true}
            rowsPerPage={5}
            actions={[
              {
                label: 'Optimizar',
                icon: '⚡',
                onClick: (row) => console.log('Optimizar ruta', row)
              },
              {
                label: 'Detalles',
                icon: '🔍',
                onClick: (row) => console.log('Ver detalles de ruta', row)
              }
            ]}
            onRowClick={handleRouteClick}
          />
        </Card>
        
        <div className="supply-costs-grid">
          <Card 
            title="Planificación de Suministro" 
            className="supply-card"
            loading={loading}
          >
            <Table 
              columns={supplyColumns}
              data={mockData.supplyPlan}
              pagination={false}
              actions={supplyActions}
              onRowClick={handleSupplyClick}
            />
          </Card>
          
          <Card 
            title="Costos Logísticos" 
            className="costs-card"
            loading={loading}
          >
            <Chart 
              type="area"
              labels={mockData.logisticsCosts.labels}
              series={mockData.logisticsCosts.series}
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
export default optimizeComponent(LogisticsPanel);
