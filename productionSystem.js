"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateProduction = exports.updateProductionProgress = exports.createProductionProcess = exports.calculateProductionCost = exports.calculateProductQuality = exports.calculateProductionTime = exports.generateInitialProductionRecipes = void 0;
// Sistema de producción simple
const uuid_1 = require("uuid");
/**
 * Genera recetas de producción iniciales para los productos básicos
 * @returns Lista de recetas de producción
 */
const generateInitialProductionRecipes = () => {
    return [
        {
            id: 'recipe-1',
            productId: 'product-1', // Alimentos Básicos
            name: 'Producción de Alimentos Básicos',
            description: 'Proceso estándar para producir alimentos básicos',
            inputs: [
                {
                    resourceId: 'resource-1', // Materias Primas Agrícolas
                    amount: 2
                }
            ],
            baseProductionTime: 24, // 24 horas de juego
            baseProductionCost: 15,
            outputAmount: 10,
            qualityLevel: 50,
            techLevel: 1
        },
        {
            id: 'recipe-2',
            productId: 'product-2', // Electrónica Básica
            name: 'Ensamblaje de Electrónica Básica',
            description: 'Proceso de ensamblaje de dispositivos electrónicos básicos',
            inputs: [
                {
                    resourceId: 'resource-2', // Componentes Electrónicos
                    amount: 3
                }
            ],
            baseProductionTime: 48, // 48 horas de juego
            baseProductionCost: 70,
            outputAmount: 5,
            qualityLevel: 60,
            techLevel: 2
        },
        {
            id: 'recipe-3',
            productId: 'product-3', // Ropa
            name: 'Confección de Ropa',
            description: 'Proceso de fabricación de prendas de vestir',
            inputs: [
                {
                    resourceId: 'resource-3', // Textiles
                    amount: 2
                }
            ],
            baseProductionTime: 36, // 36 horas de juego
            baseProductionCost: 25,
            outputAmount: 8,
            qualityLevel: 55,
            techLevel: 1
        }
    ];
};
exports.generateInitialProductionRecipes = generateInitialProductionRecipes;
/**
 * Calcula el tiempo real de producción basado en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param workerSkill Habilidad de los trabajadores (0-100)
 * @param techLevel Nivel tecnológico de la fábrica (1-5)
 * @returns Tiempo de producción en horas de juego
 */
const calculateProductionTime = (recipe, factoryEfficiency, workerSkill, techLevel) => {
    // Normalizar valores
    const normalizedEfficiency = Math.max(0, Math.min(100, factoryEfficiency)) / 100;
    const normalizedSkill = Math.max(0, Math.min(100, workerSkill)) / 100;
    const techFactor = Math.max(1, Math.min(5, techLevel)) / recipe.techLevel;
    // Base time
    let productionTime = recipe.baseProductionTime;
    // Ajustar por eficiencia (mayor eficiencia = menor tiempo)
    productionTime *= (1.5 - normalizedEfficiency * 0.5);
    // Ajustar por habilidad (mayor habilidad = menor tiempo)
    productionTime *= (1.3 - normalizedSkill * 0.3);
    // Ajustar por nivel tecnológico (mayor nivel = menor tiempo)
    productionTime *= (1 / techFactor);
    // Añadir pequeña variación aleatoria (±10%)
    const randomFactor = 0.9 + Math.random() * 0.2;
    return Math.max(1, Math.round(productionTime * randomFactor));
};
exports.calculateProductionTime = calculateProductionTime;
/**
 * Calcula la calidad del producto basada en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param workerSkill Habilidad de los trabajadores (0-100)
 * @param resourceQuality Calidad de los recursos utilizados (0-100)
 * @returns Calidad del producto (0-100)
 */
const calculateProductQuality = (recipe, factoryEfficiency, workerSkill, resourceQuality) => {
    // Normalizar valores
    const normalizedEfficiency = Math.max(0, Math.min(100, factoryEfficiency)) / 100;
    const normalizedSkill = Math.max(0, Math.min(100, workerSkill)) / 100;
    const normalizedResourceQuality = Math.max(0, Math.min(100, resourceQuality)) / 100;
    // Base quality
    let quality = recipe.qualityLevel;
    // Factores de ponderación
    const efficiencyWeight = 0.2;
    const skillWeight = 0.4;
    const resourceWeight = 0.4;
    // Calcular calidad ajustada
    quality = quality * (1 +
        (normalizedEfficiency - 0.5) * efficiencyWeight +
        (normalizedSkill - 0.5) * skillWeight +
        (normalizedResourceQuality - 0.5) * resourceWeight);
    // Limitar a rango 0-100
    return Math.max(0, Math.min(100, Math.round(quality)));
};
exports.calculateProductQuality = calculateProductQuality;
/**
 * Calcula el costo real de producción basado en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param resourceCosts Costos de los recursos utilizados
 * @param locationFactor Factor de costo de la ubicación (1.0 = normal)
 * @returns Costo de producción
 */
const calculateProductionCost = (recipe, factoryEfficiency, resourceCosts, locationFactor = 1.0) => {
    // Normalizar eficiencia
    const normalizedEfficiency = Math.max(0, Math.min(100, factoryEfficiency)) / 100;
    // Costo base
    let cost = recipe.baseProductionCost;
    // Ajustar por eficiencia (mayor eficiencia = menor costo)
    cost *= (1.3 - normalizedEfficiency * 0.3);
    // Añadir costos de recursos
    let resourceCost = 0;
    recipe.inputs.forEach(input => {
        const unitCost = resourceCosts[input.resourceId] || 0;
        resourceCost += unitCost * input.amount;
    });
    // Costo total
    const totalCost = cost + resourceCost;
    // Ajustar por ubicación
    const adjustedCost = totalCost * locationFactor;
    // Añadir pequeña variación aleatoria (±5%)
    const randomFactor = 0.95 + Math.random() * 0.1;
    return Math.round(adjustedCost * randomFactor);
};
exports.calculateProductionCost = calculateProductionCost;
/**
 * Crea un nuevo proceso de producción
 * @param recipeId ID de la receta a utilizar
 * @param factoryId ID de la fábrica
 * @param efficiency Eficiencia de producción
 * @param gameTime Tiempo actual del juego
 * @returns Proceso de producción creado
 */
const createProductionProcess = (recipeId, factoryId, efficiency, gameTime, duration) => {
    return {
        id: `process-${(0, uuid_1.v4)()}`,
        recipeId,
        factoryId,
        startTime: gameTime,
        endTime: gameTime + duration,
        progress: 0,
        efficiency,
        status: 'queued',
        resourcesAllocated: false
    };
};
exports.createProductionProcess = createProductionProcess;
/**
 * Actualiza el progreso de un proceso de producción
 * @param process Proceso de producción a actualizar
 * @param currentTime Tiempo actual del juego
 * @returns Proceso actualizado con nuevo progreso y estado
 */
const updateProductionProgress = (process, currentTime) => {
    // Si no ha comenzado o ya está completado, no actualizar
    if (process.status === 'queued' || process.status === 'completed' || process.status === 'failed') {
        return process;
    }
    // Calcular progreso basado en tiempo transcurrido
    const totalDuration = process.endTime - process.startTime;
    const elapsed = currentTime - process.startTime;
    // Calcular porcentaje de progreso
    let progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    // Determinar estado
    let status = process.status;
    if (progress >= 100) {
        status = 'completed';
        progress = 100;
    }
    return Object.assign(Object.assign({}, process), { progress,
        status });
};
exports.updateProductionProgress = updateProductionProgress;
/**
 * Simula la producción completa y devuelve los resultados
 * @param recipe Receta utilizada
 * @param factoryEfficiency Eficiencia de la fábrica
 * @param workerSkill Habilidad de los trabajadores
 * @param resourceQuality Calidad de los recursos
 * @param resourceCosts Costos de los recursos
 * @param locationFactor Factor de costo de la ubicación
 * @returns Resultados de la producción
 */
const simulateProduction = (recipe, factoryEfficiency, workerSkill, resourceQuality, resourceCosts, locationFactor = 1.0) => {
    // Calcular tiempo, calidad y costo
    const productionTime = (0, exports.calculateProductionTime)(recipe, factoryEfficiency, workerSkill, recipe.techLevel);
    const quality = (0, exports.calculateProductQuality)(recipe, factoryEfficiency, workerSkill, resourceQuality);
    const productionCost = (0, exports.calculateProductionCost)(recipe, factoryEfficiency, resourceCosts, locationFactor);
    // Calcular cantidad producida (puede variar ligeramente)
    const outputVariation = 0.9 + Math.random() * 0.2; // ±10%
    const quantity = Math.round(recipe.outputAmount * outputVariation);
    return {
        productId: recipe.productId,
        quantity,
        quality,
        productionTime,
        productionCost
    };
};
exports.simulateProduction = simulateProduction;
