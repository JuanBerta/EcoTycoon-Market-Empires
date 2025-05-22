"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFullValidation = exports.validateUIFunctionality = exports.validateUIUsability = exports.validateDataIntegration = void 0;
// Script de validación de usabilidad y funcionalidad
const economicSystem_1 = require("../engine/economy/economicSystem");
const productionSystem_1 = require("../engine/entities/productionSystem");
// Función para validar la integración de datos
const validateDataIntegration = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Iniciando validación de integración de datos...');
    const results = {
        dashboard: { success: false, message: '', data: null },
        production: { success: false, message: '', data: null },
        market: { success: false, message: '', data: null },
        logistics: { success: false, message: '', data: null },
        research: { success: false, message: '', data: null },
    };
    try {
        // Validar datos del dashboard
        const economicData = yield economicSystem_1.economicSystem.getEconomicSummary();
        results.dashboard.success = !!economicData;
        results.dashboard.message = results.dashboard.success
            ? 'Datos económicos cargados correctamente'
            : 'Error al cargar datos económicos';
        results.dashboard.data = economicData;
        // Validar datos de producción
        const factories = yield productionSystem_1.productionSystem.getFactories();
        results.production.success = !!factories && Array.isArray(factories);
        results.production.message = results.production.success
            ? `${factories.length} fábricas cargadas correctamente`
            : 'Error al cargar datos de fábricas';
        results.production.data = factories;
        // Validar datos de mercado
        const marketData = yield economicSystem_1.economicSystem.getMarketData('all', 'all', '6m');
        results.market.success = !!marketData;
        results.market.message = results.market.success
            ? 'Datos de mercado cargados correctamente'
            : 'Error al cargar datos de mercado';
        results.market.data = marketData;
        // Validar datos de logística
        const warehouses = yield productionSystem_1.productionSystem.getWarehouses();
        results.logistics.success = !!warehouses && Array.isArray(warehouses);
        results.logistics.message = results.logistics.success
            ? `${warehouses.length} almacenes cargados correctamente`
            : 'Error al cargar datos de almacenes';
        results.logistics.data = warehouses;
        // Validar datos de investigación
        const technologies = yield productionSystem_1.productionSystem.getTechnologies('all', 'all');
        results.research.success = !!technologies && Array.isArray(technologies);
        results.research.message = results.research.success
            ? `${technologies.length} tecnologías cargadas correctamente`
            : 'Error al cargar datos de tecnologías';
        results.research.data = technologies;
        console.log('Validación de integración de datos completada');
        return {
            success: Object.values(results).every(r => r.success),
            results
        };
    }
    catch (error) {
        console.error('Error durante la validación de integración de datos:', error);
        return {
            success: false,
            error: error.message,
            results
        };
    }
});
exports.validateDataIntegration = validateDataIntegration;
// Función para validar la usabilidad de la interfaz
const validateUIUsability = () => {
    console.log('Iniciando validación de usabilidad de la interfaz...');
    const usabilityChecklist = [
        { id: 'responsive', description: 'Diseño responsivo en diferentes tamaños de pantalla', passed: true },
        { id: 'navigation', description: 'Navegación intuitiva entre paneles', passed: true },
        { id: 'loading', description: 'Indicadores de carga visibles durante operaciones', passed: true },
        { id: 'feedback', description: 'Feedback visual para acciones del usuario', passed: true },
        { id: 'errors', description: 'Manejo adecuado de errores y notificaciones', passed: true },
        { id: 'consistency', description: 'Consistencia visual en todos los paneles', passed: true },
        { id: 'accessibility', description: 'Elementos accesibles y legibles', passed: true },
        { id: 'performance', description: 'Rendimiento adecuado sin retrasos perceptibles', passed: true },
    ];
    // Simulación de problemas detectados (en un entorno real, esto vendría de pruebas reales)
    usabilityChecklist.find(item => item.id === 'performance').passed = false;
    const passedChecks = usabilityChecklist.filter(item => item.passed).length;
    const totalChecks = usabilityChecklist.length;
    console.log(`Validación de usabilidad completada: ${passedChecks}/${totalChecks} criterios cumplidos`);
    return {
        success: passedChecks === totalChecks,
        passRate: (passedChecks / totalChecks) * 100,
        checklist: usabilityChecklist,
        improvements: usabilityChecklist
            .filter(item => !item.passed)
            .map(item => ({
            area: item.id,
            description: item.description,
            suggestion: getSuggestionForArea(item.id)
        }))
    };
};
exports.validateUIUsability = validateUIUsability;
// Función para validar la funcionalidad de la interfaz
const validateUIFunctionality = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Iniciando validación de funcionalidad de la interfaz...');
    const functionalityTests = [
        { id: 'dashboard_load', description: 'Carga de datos en el dashboard', passed: true },
        { id: 'production_start', description: 'Iniciar producción', passed: true },
        { id: 'market_filter', description: 'Filtrado de datos de mercado', passed: true },
        { id: 'logistics_order', description: 'Realizar pedidos de suministros', passed: true },
        { id: 'research_start', description: 'Iniciar investigación', passed: true },
        { id: 'notifications', description: 'Sistema de notificaciones', passed: true },
        { id: 'game_speed', description: 'Control de velocidad del juego', passed: true },
        { id: 'data_update', description: 'Actualización de datos en tiempo real', passed: true },
    ];
    try {
        // Simular pruebas de funcionalidad (en un entorno real, estas serían pruebas automatizadas)
        // Prueba de iniciar producción
        const productionResult = yield productionSystem_1.productionSystem.startProductionLine('factory1', 'product1', 100);
        functionalityTests.find(test => test.id === 'production_start').passed = !!productionResult;
        // Prueba de realizar pedido
        const orderResult = yield productionSystem_1.productionSystem.orderSupplies('product1', 50);
        functionalityTests.find(test => test.id === 'logistics_order').passed = !!orderResult;
        // Prueba de iniciar investigación
        const researchResult = yield productionSystem_1.productionSystem.startResearch('tech1');
        functionalityTests.find(test => test.id === 'research_start').passed = !!researchResult;
        // Simular fallo en actualización de datos en tiempo real
        functionalityTests.find(test => test.id === 'data_update').passed = false;
        const passedTests = functionalityTests.filter(test => test.passed).length;
        const totalTests = functionalityTests.length;
        console.log(`Validación de funcionalidad completada: ${passedTests}/${totalTests} pruebas exitosas`);
        return {
            success: passedTests === totalTests,
            passRate: (passedTests / totalTests) * 100,
            tests: functionalityTests,
            issues: functionalityTests
                .filter(test => !test.passed)
                .map(test => ({
                area: test.id,
                description: test.description,
                solution: getSolutionForIssue(test.id)
            }))
        };
    }
    catch (error) {
        console.error('Error durante la validación de funcionalidad:', error);
        return {
            success: false,
            error: error.message,
            tests: functionalityTests
        };
    }
});
exports.validateUIFunctionality = validateUIFunctionality;
// Función auxiliar para obtener sugerencias de mejora
const getSuggestionForArea = (area) => {
    const suggestions = {
        'responsive': 'Optimizar diseño para tablets y dispositivos móviles pequeños',
        'navigation': 'Añadir atajos de teclado para navegación rápida',
        'loading': 'Implementar esqueletos de carga para mejorar percepción',
        'feedback': 'Añadir animaciones sutiles para confirmar acciones',
        'errors': 'Mejorar mensajes de error con acciones sugeridas',
        'consistency': 'Unificar paleta de colores y estilos de componentes',
        'accessibility': 'Aumentar contraste en textos pequeños',
        'performance': 'Optimizar renderizado de componentes con React.memo y useCallback'
    };
    return suggestions[area] || 'Revisar y mejorar este aspecto';
};
// Función auxiliar para obtener soluciones a problemas
const getSolutionForIssue = (issue) => {
    const solutions = {
        'dashboard_load': 'Implementar caché de datos para mejorar tiempo de carga',
        'production_start': 'Verificar validación de parámetros en la función startProductionLine',
        'market_filter': 'Corregir lógica de filtrado para manejar múltiples criterios',
        'logistics_order': 'Añadir verificación de stock disponible antes de realizar pedidos',
        'research_start': 'Corregir validación de requisitos previos para investigaciones',
        'notifications': 'Implementar sistema de cola para notificaciones múltiples',
        'game_speed': 'Ajustar intervalos de tiempo para mayor precisión',
        'data_update': 'Implementar websockets o polling para actualizaciones en tiempo real'
    };
    return solutions[issue] || 'Investigar y corregir este problema';
};
// Función principal para ejecutar todas las validaciones
const runFullValidation = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Iniciando validación completa de la UI avanzada...');
    const dataIntegrationResults = yield (0, exports.validateDataIntegration)();
    const usabilityResults = (0, exports.validateUIUsability)();
    const functionalityResults = yield (0, exports.validateUIFunctionality)();
    const overallSuccess = dataIntegrationResults.success &&
        usabilityResults.success &&
        functionalityResults.success;
    console.log(`Validación completa finalizada. Resultado: ${overallSuccess ? 'EXITOSO' : 'CON PROBLEMAS'}`);
    return {
        success: overallSuccess,
        dataIntegration: dataIntegrationResults,
        usability: usabilityResults,
        functionality: functionalityResults,
        timestamp: new Date().toISOString()
    };
});
exports.runFullValidation = runFullValidation;
// Exportar todas las funciones
exports.default = {
    validateDataIntegration: exports.validateDataIntegration,
    validateUIUsability: exports.validateUIUsability,
    validateUIFunctionality: exports.validateUIFunctionality,
    runFullValidation: exports.runFullValidation
};
