// Componente Card común reutilizable
import React, { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  actions, 
  className = '',
  loading = false
}) => {
  return (
    <div className={`card ${className} ${loading ? 'loading' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      
      <div className="card-content">
        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Cargando datos...</p>
          </div>
        ) : (
          children
        )}
      </div>
      
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;
