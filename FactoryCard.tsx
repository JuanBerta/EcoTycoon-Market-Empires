// Componente FactoryCard para mostrar información de fábricas
import React from 'react';
import './FactoryCard.css';
import Card from '../common/Card';

interface Factory {
  id: string;
  name: string;
  type: string;
  efficiency: number;
  capacity: number;
  utilization: number;
  location: string;
  products: string[];
}

interface FactoryCardProps {
  factory: Factory;
  selected?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

const FactoryCard: React.FC<FactoryCardProps> = ({
  factory,
  selected = false,
  onClick,
  loading = false
}) => {
  // Iconos según tipo de fábrica
  const factoryIcons: Record<string, string> = {
    'food': '🍔',
    'electronics': '💻',
    'textiles': '👕',
    'chemicals': '🧪',
    'luxury': '💎',
    'automotive': '🚗',
    'furniture': '🪑',
    'construction': '🏗️'
  };
  
  // Colores según tipo de fábrica
  const factoryColors: Record<string, string> = {
    'food': '#34a853',
    'electronics': '#1a73e8',
    'textiles': '#fbbc05',
    'chemicals': '#ea4335',
    'luxury': '#673ab7',
    'automotive': '#ff5722',
    'furniture': '#795548',
    'construction': '#607d8b'
  };
  
  // Determinar color de eficiencia
  const getEfficiencyColor = (value: number) => {
    if (value >= 80) return '#34a853';
    if (value >= 60) return '#fbbc05';
    return '#ea4335';
  };
  
  // Determinar color de utilización
  const getUtilizationColor = (value: number) => {
    if (value >= 90) return '#ea4335'; // Sobrecarga
    if (value >= 70) return '#34a853'; // Óptimo
    if (value >= 50) return '#fbbc05'; // Bajo
    return '#ea4335'; // Crítico
  };
  
  const icon = factoryIcons[factory.type] || '🏭';
  const color = factoryColors[factory.type] || '#5f6368';
  
  return (
    <Card 
      title=""
      className={`factory-card ${selected ? 'selected' : ''}`}
      loading={loading}
    >
      <div className="factory-card-content" onClick={onClick}>
        <div className="factory-header">
          <div 
            className="factory-icon" 
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <div className="factory-name-container">
            <h4 className="factory-name">{factory.name}</h4>
            <div className="factory-location">{factory.location}</div>
          </div>
        </div>
        
        <div className="factory-metrics">
          <div className="metric">
            <div className="metric-label">Eficiencia</div>
            <div 
              className="metric-value" 
              style={{ color: getEfficiencyColor(factory.efficiency) }}
            >
              {factory.efficiency}%
            </div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Capacidad</div>
            <div className="metric-value">{factory.capacity}</div>
          </div>
          
          <div className="metric">
            <div className="metric-label">Utilización</div>
            <div 
              className="metric-value" 
              style={{ color: getUtilizationColor(factory.utilization) }}
            >
              {factory.utilization}%
            </div>
          </div>
        </div>
        
        <div className="factory-products">
          <div className="products-label">Productos:</div>
          <div className="products-list">
            {factory.products.map((product, index) => (
              <span key={index} className="product-tag">{product}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FactoryCard;
