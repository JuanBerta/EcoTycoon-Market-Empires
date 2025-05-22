"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualizedList = exports.BatchedRender = exports.DeferredRender = exports.OptimizedRender = exports.useOptimizedCallback = exports.useOptimizedData = exports.optimizeComponent = void 0;
// Optimizaciones de rendimiento para componentes UI
const react_1 = __importStar(require("react"));
// Función para optimizar componentes con React.memo
const optimizeComponent = (Component) => {
    return react_1.default.memo(Component, (prevProps, nextProps) => {
        // Implementar lógica personalizada de comparación si es necesario
        return false; // Por defecto, siempre re-renderizar (cambiar en implementaciones específicas)
    });
};
exports.optimizeComponent = optimizeComponent;
// Hook personalizado para memoizar datos complejos
const useOptimizedData = (data, dependencies = []) => {
    return (0, react_1.useMemo)(() => {
        // Procesamiento de datos que puede ser costoso
        return data;
    }, dependencies);
};
exports.useOptimizedData = useOptimizedData;
// Hook personalizado para memoizar callbacks
const useOptimizedCallback = (callback, dependencies = []) => {
    return (0, react_1.useCallback)(callback, dependencies);
};
exports.useOptimizedCallback = useOptimizedCallback;
// Función para optimizar renderizado condicional
const OptimizedRender = ({ condition, children, fallback = null }) => {
    return (0, react_1.useMemo)(() => {
        return condition ? children : fallback;
    }, [condition, children, fallback]);
};
exports.OptimizedRender = OptimizedRender;
// Componente para renderizado diferido (lazy loading)
const DeferredRender = ({ children, delay = 100 }) => {
    const [shouldRender, setShouldRender] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        const timer = setTimeout(() => {
            setShouldRender(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return shouldRender ? children : null;
};
exports.DeferredRender = DeferredRender;
// Componente para renderizado por lotes
const BatchedRender = ({ items, batchSize = 10, renderItem }) => {
    const [visibleItems, setVisibleItems] = react_1.default.useState([]);
    const [currentBatch, setCurrentBatch] = react_1.default.useState(1);
    react_1.default.useEffect(() => {
        const endIndex = currentBatch * batchSize;
        setVisibleItems(items.slice(0, endIndex));
    }, [items, currentBatch, batchSize]);
    const loadMore = (0, react_1.useCallback)(() => {
        if (currentBatch * batchSize < items.length) {
            setCurrentBatch(prev => prev + 1);
        }
    }, [currentBatch, items.length, batchSize]);
    return { visibleItems, : .map(renderItem) };
    {
        currentBatch * batchSize < items.length && onClick;
        {
            loadMore;
        }
         > Cargar;
        más < /button>;
    }
};
exports.BatchedRender = BatchedRender;
/>;
;
;
// Función para optimizar listas con virtualización
const VirtualizedList = ({ items, height, itemHeight, renderItem }) => {
    const [scrollTop, setScrollTop] = react_1.default.useState(0);
    const handleScroll = (0, react_1.useCallback)((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);
    const visibleItems = (0, react_1.useMemo)(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + Math.ceil(height / itemHeight) + 1, items.length);
        return items.slice(startIndex, endIndex).map((item, index) => (Object.assign(Object.assign({}, item), { index: startIndex + index, style: {
                position: 'absolute',
                top: (startIndex + index) * itemHeight,
                height: itemHeight
            } })));
    }, [items, scrollTop, height, itemHeight]);
    return style = {};
    {
        height, overflow;
        'auto', position;
        'relative';
    }
};
exports.VirtualizedList = VirtualizedList;
onScroll = { handleScroll }
    >
        style;
{
    {
        height: items.length * itemHeight;
    }
}
 >
    { visibleItems, : .map(item => renderItem(item)) }
    < /div>
    < /div>;
;
;
// Exportar todas las utilidades
exports.default = {
    optimizeComponent: exports.optimizeComponent,
    useOptimizedData: exports.useOptimizedData,
    useOptimizedCallback: exports.useOptimizedCallback,
    OptimizedRender: exports.OptimizedRender,
    DeferredRender: exports.DeferredRender,
    BatchedRender: exports.BatchedRender,
    VirtualizedList: exports.VirtualizedList
};
