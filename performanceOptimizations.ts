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
export const VirtualizedList = ({ items, height, itemHeight, renderItem, bufferSize = 5 }) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  const visibleItems = useMemo(() => {
    // Calculate the start index (first visible item)
    const theoreticalStartIndex = Math.floor(scrollTop / itemHeight);
    // Apply buffer before the visible area
    const startIndex = Math.max(0, theoreticalStartIndex - bufferSize);
    
    // Calculate the number of items that can fit in the visible area
    const visibleItemCount = Math.ceil(height / itemHeight);
    
    // Calculate the end index (last item to render, including buffer after visible area)
    const endIndex = Math.min(
      items.length,
      theoreticalStartIndex + visibleItemCount + bufferSize // Buffer after
    );
    
    // Ensure startIndex is not greater than endIndex if items.length is small
    // And also ensure actualStart is within bounds of items array
    const actualStartIndex = Math.max(0, Math.min(startIndex, items.length > 0 ? items.length -1 : 0));
    const actualEndIndex = Math.min(items.length, Math.max(actualStartIndex, endIndex));


    return items.slice(actualStartIndex, actualEndIndex).map((item, index) => ({
      ...item,
      // The 'key' for React elements should be unique, often the item's id.
      // The 'index' prop here refers to the original index in the 'items' array.
      index: actualStartIndex + index, 
      style: {
        position: 'absolute',
        top: (actualStartIndex + index) * itemHeight,
        height: itemHeight,
        width: '100%' // Ensure items take full width
      }
    }));
  }, [items, scrollTop, height, itemHeight, bufferSize]);
  
  return (
    <div
      style={{ height, overflowY: 'auto', position: 'relative' }} // Changed overflow to overflowY
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}> {/* Added position relative here as well */}
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
