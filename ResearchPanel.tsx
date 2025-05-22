// Aplicación de optimizaciones de rendimiento al ResearchPanel
import React, { useCallback, useMemo } from 'react';
import './ResearchPanel.css';
import Card from '../common/Card';
import Table from '../common/Table';
import Chart from '../common/Chart';
import { 
  optimizeComponent, 
  useOptimizedData, 
  useOptimizedCallback,
  BatchedRender,
  VirtualizedList
} from '../../utils/performanceOptimizations';

// Datos simulados para el panel de I+D (optimizados con useMemo)
const useMockData = () => {
  return useMemo(() => ({
    technologies: [
      {
        id: 'tech1',
        name: 'Automatización Avanzada',
        category: 'production',
        level: 2,
        currentLevel: 1,
        cost: 50000,
        timeRequired: 14,
        benefits: ['+20% Eficiencia de Producción', '-15% Costos Operativos'],
        description: 'Sistemas avanzados de automatización para líneas de producción.'
      },
      {
        id: 'tech2',
        name: 'Eco-materiales',
        category: 'materials',
        level: 1,
        currentLevel: 0,
        cost: 30000,
        timeRequired: 10,
        benefits: ['-15% Costo de Materiales', '+10% Calidad de Producto'],
        description: 'Materiales sostenibles y ecológicos para producción.'
      },
      {
        id: 'tech3',
        name: 'Logística Inteligente',
        category: 'logistics',
        level: 2,
        currentLevel: 0,
        cost: 45000,
        timeRequired: 12,
        benefits: ['-20% Tiempo de Entrega', '-10% Costos Logísticos'],
        description: 'Sistemas de optimización de rutas y gestión de inventario.'
      },
      {
        id: 'tech4',
        name: 'Análisis Predictivo',
        category: 'market',
        level: 3,
        currentLevel: 1,
        cost: 60000,
        timeRequired: 18,
        benefits: ['+25% Precisión de Previsión', '+15% Detección de Oportunidades'],
        description: 'Algoritmos avanzados para predecir tendencias de mercado.'
      },
      {
        id: 'tech5',
        name: 'Energía Renovable',
        category: 'infrastructure',
        level: 2,
        currentLevel: 0,
        cost: 70000,
        timeRequired: 20,
        benefits: ['-30% Costos Energéticos', '+20% Reputación'],
        description: 'Implementación de fuentes de energía renovable en instalaciones.'
      }
    ],
    activeProjects: [
      {
        id: 'proj1',
        name: 'Automatización Avanzada',
        investment: 50000,
        progress: 67,
        timeRemaining: 5,
        researchers: 3,
        status: 'active'
      },
      {
        id: 'proj2',
        name: 'Análisis Predictivo',
        investment: 60000,
        progress: 33,
        timeRemaining: 12,
        researchers: 4,
        status: 'active'
      }
    ],
    productPrototypes: [
      {
        id: 'proto1',
        name: 'Alimentos Orgánicos Premium',
        category: 'food',
        developmentCost: 25000,
        marketPotential: 85,
        timeToMarket: 8,
        status: 'testing'
      },
      {
        id: 'proto2',
        name: 'Dispositivo Electrónico Avanzado',
        category: 'electronics',
        developmentCost: 120000,
        marketPotential: 90,
        timeToMarket: 15,
        status: 'development'
      },
      {
        id: 'proto3',
        name: 'Textiles Ecológicos',
        category: 'textiles',
        developmentCost: 40000,
        marketPotential: 75,
        timeToMarket: 6,
        status: 'ready'
      }
    ],
    competitorInnovation: {
      labels: ['Alimentos', 'Electrónica', 'Textiles', 'Químicos', 'Lujo'],
      series: [
        {
          name: 'Tu Innovación',
          data: [70, 85, 60, 50, 75],
          color: '#1a73e8'
        },
        {
          name: 'Competidor Alpha',
          data: [80, 70, 50, 60, 65],
          color: '#ea4335'
        },
        {
          name: 'Competidor Beta',
          data: [60, 90, 70, 40, 80],
          color: '#fbbc05'
        }
      ]
    }
  }), []);
};

// Componente optimizado para tarjeta de tecnología
const TechCard = React.memo(({ 
  tech, 
  onResearch 
}: { 
  tech: any, 
  onResearch: (techId: string) => void 
}) => {
  // Funciones auxiliares para categorías (memoizadas)
  const getCategoryName = useCallback((category: string): string => {
    const categories: Record<string, string> = {
      'production': 'Producción',
      'materials': 'Materiales',
      'logistics': 'Logística',
      'market': 'Mercado',
      'infrastructure': 'Infraestructura'
    };
    
    return categories[category] || category;
  }, []);
  
  const getCategoryIcon = useCallback((category: string): string => {
    const icons: Record<string, string> = {
      'production': '🏭',
      'materials': '🧪',
      'logistics': '🚚',
      'market': '📊',
      'infrastructure': '🏢'
    };
    
    return icons[category] || '🔬';
  }, []);
  
  const getCategoryColor = useCallback((category: string, opacity: number): string => {
    const colors: Record<string, string> = {
      'production': `rgba(26, 115, 232, ${opacity})`,
      'materials': `rgba(52, 168, 83, ${opacity})`,
      'logistics': `rgba(251, 188, 5, ${opacity})`,
      'market': `rgba(234, 67, 53, ${opacity})`,
      'infrastructure': `rgba(103, 58, 183, ${opacity})`
    };
    
    return colors[category] || `rgba(95, 99, 104, ${opacity})`;
  }, []);

  // Manejador de click optimizado
  const handleResearchClick = useCallback(() => {
    onResearch(tech.id);
  }, [tech.id, onResearch]);

  return (
    <div className="tech-card">
      <div className="tech-header">
        <div 
          className="tech-icon" 
          style={{ 
            backgroundColor: getCategoryColor(tech.category, 0.1),
            color: getCategoryColor(tech.category, 1)
          }}
        >
          {getCategoryIcon(tech.category)}
        </div>
        <div className="tech-title">
          <h4 className="tech-name">{tech.name}</h4>
          <div className="tech-category">{getCategoryName(tech.category)}</div>
        </div>
        <div className="tech-level">
          <div className="level-indicator">
            <span className="current-level">{tech.currentLevel}</span>
            <span className="level-separator">/</span>
            <span className="max-level">{tech.level}</span>
          </div>
          <div className="level-label">Nivel</div>
        </div>
      </div>
      
      <div className="tech-description">
        {tech.description}
      </div>
      
      <div className="tech-benefits">
        <div className="benefits-label">Beneficios:</div>
        <ul className="benefits-list">
          {tech.benefits.map((benefit: string, index: number) => (
            <li key={index} className="benefit-item">{benefit}</li>
          ))}
        </ul>
      </div>
      
      <div className="tech-footer">
        <div className="tech-cost">
          <div className="cost-label">Costo:</div>
          <div className="cost-value">${tech.cost.toLocaleString()}</div>
        </div>
        <div className="tech-time">
          <div className="time-label">Tiempo:</div>
          <div className="time-value">{tech.timeRequired} días</div>
        </div>
        <button 
          className="research-button"
          disabled={tech.currentLevel >= tech.level}
          onClick={handleResearchClick}
        >
          {tech.currentLevel >= tech.level ? 'Completado' : 'Investigar'}
        </button>
      </div>
    </div>
  );
});

interface ResearchPanelProps {
  loading?: boolean;
}

const ResearchPanel: React.FC<ResearchPanelProps> = ({
  loading = false
}) => {
  // Obtener datos optimizados
  const mockData = useMockData();
  
  // Estados para filtros (usando useState normal ya que cambian con interacción)
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [levelFilter, setLevelFilter] = React.useState('all');
  
  // Filtrar tecnologías según filtros (optimizado)
  const filteredTechnologies = useMemo(() => {
    return mockData.technologies.filter(tech => {
      if (categoryFilter !== 'all' && tech.category !== categoryFilter) return false;
      if (levelFilter !== 'all' && tech.level !== parseInt(levelFilter)) return false;
      return true;
    });
  }, [mockData.technologies, categoryFilter, levelFilter]);
  
  // Columnas para la tabla de proyectos activos (memoizadas)
  const projectColumns = useMemo(() => [
    { id: 'name', label: 'Proyecto', sortable: true },
    { 
      id: 'investment', 
      label: 'Inversión', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `$${value.toLocaleString()}`
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
      id: 'timeRemaining', 
      label: 'Tiempo Restante', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value} días`
    },
    { 
      id: 'researchers', 
      label: 'Investigadores', 
      sortable: true,
      align: 'right' as const
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
          'cancelled': { label: 'Cancelado', color: '#ea4335' }
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
  
  // Columnas para la tabla de prototipos (memoizadas)
  const prototypeColumns = useMemo(() => [
    { id: 'name', label: 'Producto', sortable: true },
    { id: 'category', label: 'Categoría', sortable: true },
    { 
      id: 'developmentCost', 
      label: 'Costo Desarrollo', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `$${value.toLocaleString()}`
    },
    { 
      id: 'marketPotential', 
      label: 'Potencial', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => {
        let color = '#ea4335';
        if (value >= 80) color = '#34a853';
        else if (value >= 70) color = '#fbbc05';
        
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
      id: 'timeToMarket', 
      label: 'Tiempo al Mercado', 
      sortable: true,
      align: 'right' as const,
      format: (value: number) => `${value} semanas`
    },
    { 
      id: 'status', 
      label: 'Estado', 
      sortable: true,
      format: (value: string) => {
        const statusMap: Record<string, { label: string, color: string }> = {
          'development': { label: 'En Desarrollo', color: '#1a73e8' },
          'testing': { label: 'En Pruebas', color: '#fbbc05' },
          'ready': { label: 'Listo', color: '#34a853' },
          'cancelled': { label: 'Cancelado', color: '#ea4335' }
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
  
  // Callbacks optimizados
  const handleCategoryChange = useOptimizedCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value);
  }, []);

  const handleLevelChange = useOptimizedCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevelFilter(e.target.value);
  }, []);

  const handleResearch = useOptimizedCallback((techId: string) => {
    console.log('Iniciar investigación de tecnología:', techId);
  }, []);

  const handleProjectClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionado proyecto', row);
  }, []);

  const handlePrototypeClick = useOptimizedCallback((row: any) => {
    console.log('Seleccionado prototipo', row);
  }, []);

  // Renderizado optimizado de tarjetas de tecnología
  const renderTechnologyCards = useCallback(() => {
    return (
      <div className="tech-cards-grid">
        <BatchedRender
          items={filteredTechnologies}
          batchSize={5}
          renderItem={(tech, index) => (
            <TechCard 
              key={tech.id} 
              tech={tech} 
              onResearch={handleResearch} 
            />
          )}
        />
      </div>
    );
  }, [filteredTechnologies, handleResearch]);

  return (
    <div className="research-panel">
      <div className="research-header">
        <h2>Investigación y Desarrollo</h2>
        <div className="research-actions">
          <button className="action-button primary">
            <span className="icon">💰</span>
            Aumentar Presupuesto
          </button>
          <button className="action-button">
            <span className="icon">👨‍🔬</span>
            Contratar Investigadores
          </button>
        </div>
      </div>
      
      <div className="research-grid">
        <div className="tech-tree-section">
          <div className="tech-tree-header">
            <h3>Árbol Tecnológico</h3>
            <div className="tech-filters">
              <div className="filter-group">
                <label>Categoría:</label>
                <select 
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                >
                  <option value="all">Todas</option>
                  <option value="production">Producción</option>
                  <option value="materials">Materiales</option>
                  <option value="logistics">Logística</option>
                  <option value="market">Mercado</option>
                  <option value="infrastructure">Infraestructura</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Nivel:</label>
                <select 
                  value={levelFilter}
                  onChange={handleLevelChange}
                >
                  <option value="all">Todos</option>
                  <option value="1">Nivel 1</option>
                  <option value="2">Nivel 2</option>
                  <option value="3">Nivel 3</option>
                </select>
              </div>
            </div>
          </div>
          
          {renderTechnologyCards()}
        </div>
        
        <Card 
          title="Proyectos Activos" 
          className="active-projects-card"
          loading={loading}
          actions={
            <button className="action-button small">
              <span className="icon">➕</span>
              Nuevo Proyecto
            </button>
          }
        >
          <Table 
            columns={projectColumns}
            data={mockData.activeProjects}
            pagination={false}
            actions={[
              {
                label: 'Pausar',
                icon: '⏸️',
                onClick: (row) => console.log('Pausar proyecto', row),
                disabled: (row) => row.status !== 'active'
              },
              {
                label: 'Detalles',
                icon: '🔍',
                onClick: (row) => console.log('Ver detalles de proyecto', row),
        
(Content truncated due to size limit. Use line ranges to read in chunks)