// Componente Table para visualización de datos tabulares
import React, { useState } from 'react';
import './Table.css';

interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  format?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  pagination?: boolean;
  rowsPerPage?: number;
  actions?: {
    label: string;
    icon?: string;
    onClick: (row: any) => void;
    disabled?: (row: any) => boolean;
  }[];
  onRowClick?: (row: any) => void;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  pagination = true,
  rowsPerPage = 10,
  actions,
  onRowClick,
  className = '',
  emptyMessage = 'No hay datos disponibles',
  loading = false
}) => {
  // Estado para paginación
  const [page, setPage] = useState(0);
  
  // Estado para ordenamiento
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  
  // Función para manejar el ordenamiento
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    
    if (!column || column.sortable === false) {
      return;
    }
    
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === columnId) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key: columnId, direction });
  };
  
  // Ordenar datos
  const sortedData = React.useMemo(() => {
    if (!sortConfig) {
      return data;
    }
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);
  
  // Calcular datos paginados
  const paginatedData = React.useMemo(() => {
    if (!pagination) {
      return sortedData;
    }
    
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, pagination, page, rowsPerPage]);
  
  // Calcular número total de páginas
  const pageCount = Math.ceil(data.length / rowsPerPage);
  
  // Función para cambiar de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  // Renderizar celdas con formato
  const renderCell = (row: any, column: Column) => {
    const value = row[column.id];
    
    if (column.format) {
      return column.format(value);
    }
    
    return value;
  };
  
  return (
    <div className={`table-container ${className} ${loading ? 'loading' : ''}`}>
      {loading && (
        <div className="table-loading-overlay">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
        </div>
      )}
      
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.id}
                className={`
                  ${column.sortable !== false ? 'sortable' : ''}
                  ${sortConfig?.key === column.id ? `sorted-${sortConfig.direction}` : ''}
                  ${column.align ? `align-${column.align}` : ''}
                `}
                style={{ width: column.width }}
                onClick={() => handleSort(column.id)}
              >
                {column.label}
                {column.sortable !== false && (
                  <span className="sort-icon">
                    {sortConfig?.key === column.id && sortConfig.direction === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="actions-column">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? 'clickable' : ''}
              >
                {columns.map(column => (
                  <td 
                    key={column.id}
                    className={column.align ? `align-${column.align}` : ''}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="actions-cell">
                    {actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        className="action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                        disabled={action.disabled ? action.disabled(row) : false}
                      >
                        {action.icon && <span className="action-icon">{action.icon}</span>}
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className="empty-row">
              <td colSpan={columns.length + (actions ? 1 : 0)}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {pagination && pageCount > 1 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(0)}
            disabled={page === 0}
          >
            «
          </button>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 0}
          >
            ‹
          </button>
          
          <span className="pagination-info">
            Página {page + 1} de {pageCount}
          </span>
          
          <button
            className="pagination-button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= pageCount - 1}
          >
            ›
          </button>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={page >= pageCount - 1}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
