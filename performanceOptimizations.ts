// Optimizaciones de rendimiento para componentes UI
import React, { useCallback, useMemo } from 'react';

// Función para optimizar componentes con React.memo
export const optimizeComponent = (Component) => {
  return React.memo(Component, (prevProps, nextProps) => {
    // Implementar lógica personalizada de comparación si es necesario
    return false; // Por defecto, siempre re-renderizar (cambiar en implementaciones específicas)
  });
};

// Hook personalizado para memoizar datos complejos
export const useOptimizedData = (data, dependencies = []) => {
  return useMemo(() => {
    // Procesamiento de datos que puede ser costoso
    return data;
  }, dependencies);
};

// Hook personalizado para memoizar callbacks
export const useOptimizedCallback = (callback, dependencies = []) => {
  return useCallback(callback, dependencies);
};

// Función para optimizar renderizado condicional
export const OptimizedRender = ({ condition, children, fallback = null }) => {
  return useMemo(() => {
    return condition ? children : fallback;
  }, [condition, children, fallback]);
};

// Componente para renderizado diferido (lazy loading)
export const DeferredRender = ({ children, delay = 100 }) => {
  const [shouldRender, setShouldRender] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return shouldRender ? children : null;
};

// Componente para renderizado por lotes
export const BatchedRender = ({ items, batchSize = 10, renderItem }) => {
  const [visibleItems, setVisibleItems] = React.useState([]);
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
      {visibleItems.map(renderItem)}
      {currentBatch * batchSize < items.length && (
        <button onClick={loadMore}>Cargar más</button>
      )}
    </>
  );
};

// Función para optimizar listas con virtualización
export const VirtualizedList = ({ items, height, itemHeight, renderItem }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(height / itemHeight) + 1,
      items.length
    );
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      index: startIndex + index,
      style: {
        position: 'absolute',
        top: (startIndex + index) * itemHeight,
        height: itemHeight
      }
    }));
  }, [items, scrollTop, height, itemHeight]);
  
  return (
    <div
      style={{ height, overflow: 'auto', position: 'relative' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map(item => renderItem(item))}
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
