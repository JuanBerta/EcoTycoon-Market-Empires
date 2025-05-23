// Optimizaciones de rendimiento para componentes UI
import React, { useCallback, useMemo } from 'react';

// Función para optimizar componentes con React.memo
export const optimizeComponent = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    // Implementar lógica personalizada de comparación si es necesario
    // Por defecto, React.memo hace una comparación superficial de props.
    // Retornar true si las props son iguales y no se necesita re-renderizar.
    // Retornar false si las props son diferentes y se necesita re-renderizar.
    // La lógica actual 'return false;' significa que siempre se re-renderizará si las props cambian,
    // lo cual es el comportamiento por defecto si no se provee un comparador.
    // Para una optimización real, se debería implementar una comparación profunda o selectiva.
    // Ejemplo: return prevProps.id === nextProps.id;
    return Object.keys(prevProps).length === Object.keys(nextProps).length &&
           Object.keys(prevProps).every(key => prevProps[key] === nextProps[key]);
  });
};

// Hook personalizado para memoizar datos complejos
export const useOptimizedData = (data: any, dependencies: any[] = []) => {
  return useMemo(() => {
    // Procesamiento de datos que puede ser costoso
    // Ejemplo: const processedData = data.map(item => ({ ...item, computed: heavyComputation(item) }));
    // return processedData;
    return data;
  }, dependencies);
};

// Hook personalizado para memoizar callbacks
export const useOptimizedCallback = (callback: (...args: any[]) => any, dependencies: any[] = []) => {
  return useCallback(callback, dependencies);
};

// Función para optimizar renderizado condicional
export const OptimizedRender: React.FC<{ condition: boolean; children: React.ReactNode; fallback?: React.ReactNode | null }> = ({ condition, children, fallback = null }) => {
  return useMemo(() => {
    return condition ? children : fallback;
  }, [condition, children, fallback]);
};

// Componente para renderizado diferido (lazy loading)
export const DeferredRender: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 100 }) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return shouldRender ? <>{children}</> : null;
};

// Componente para renderizado por lotes
interface BatchedRenderProps {
  items: any[];
  batchSize?: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export const BatchedRender: React.FC<BatchedRenderProps> = ({ items, batchSize = 10, renderItem }) => {
  const [visibleItems, setVisibleItems] = React.useState<any[]>([]);
  const [currentBatch, setCurrentBatch] = React.useState(1);
  
  React.useEffect(() => {
    const endIndex = currentBatch * batchSize;
    setVisibleItems(items.slice(0, endIndex));
  }, [items, currentBatch, batchSize]);
  
  const loadMore = useCallback(() => {
    if (currentBatch * batchSize < items.length) {
      setCurrentBatch(prev => prev + 1);
    }
  }, [currentBatch, items.length, batchSize]);
  
  return (
    <>
      {visibleItems.map((item, index) => renderItem(item, index))}
      {currentBatch * batchSize < items.length && (
        <button onClick={loadMore} className="load-more-button">Cargar más</button>
      )}
    </>
  );
};

// Función para optimizar listas con virtualización
interface VirtualizedListProps {
  items: any[];
  height: number;
  itemHeight: number;
  renderItem: (item: any) => React.ReactNode; // item will have style and index
  bufferSize?: number;
}

export const VirtualizedList: React.FC<VirtualizedListProps> = ({ items, height, itemHeight, renderItem, bufferSize = 5 }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => { // Typed event
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  
  const visibleItems = useMemo(() => {
    const theoreticalStartIndex = Math.floor(scrollTop / itemHeight);
    const startIndex = Math.max(0, theoreticalStartIndex - bufferSize);
    
    const visibleItemCount = Math.ceil(height / itemHeight);
    
    const endIndex = Math.min(
      items.length,
      theoreticalStartIndex + visibleItemCount + bufferSize 
    );
    
    const actualStartIndex = Math.max(0, Math.min(startIndex, items.length > 0 ? items.length -1 : 0));
    const actualEndIndex = Math.min(items.length, Math.max(actualStartIndex, endIndex));

    return items.slice(actualStartIndex, actualEndIndex).map((itemData, index) => {
      const originalIndex = actualStartIndex + index;
      return { // Pass an object to renderItem that includes the item data, style, and original index
        ...itemData, // Spread original item data
        originalIndex: originalIndex, // Pass original index
        style: {
          position: 'absolute',
          top: originalIndex * itemHeight,
          height: itemHeight,
          width: '100%' 
        }
      };
    });
  }, [items, scrollTop, height, itemHeight, bufferSize]);
  
  return (
    <div
      style={{ height, overflowY: 'auto', position: 'relative' }} 
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}> 
        {visibleItems.map(itemWithStyle => renderItem(itemWithStyle))}
      </div>
    </div>
  );
};

// Exportar todas las utilidades
export default {
  optimizeComponent,
  useOptimizedData,
  useOptimizedCallback,
  OptimizedRender,
  DeferredRender,
  BatchedRender,
  VirtualizedList
};
