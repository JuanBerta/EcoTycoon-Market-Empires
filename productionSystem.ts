// Sistema de producción simple
import { v4 as uuidv4 } from 'uuid';

// Tipos para el sistema de producción
export interface ProductionRecipe {
  id: string;
  productId: string;
  name: string;
  description: string;
  inputs: Array<{
    resourceId: string;
    amount: number;
  }>;
  baseProductionTime: number; // en horas de juego
  baseProductionCost: number;
  outputAmount: number;
  qualityLevel: number; // 0-100
  techLevel: number; // 1-5
}

export interface ProductionProcess {
  id: string;
  recipeId: string;
  factoryId: string;
  startTime: number; // timestamp
  endTime: number; // timestamp
  progress: number; // 0-100
  efficiency: number; // 0-100, afecta tiempo y calidad
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  resourcesAllocated: boolean;
}

export interface ProductionStats {
  totalProduced: Record<string, number>; // productId -> cantidad
  averageQuality: Record<string, number>; // productId -> calidad promedio
  averageTime: Record<string, number>; // productId -> tiempo promedio
  totalCost: Record<string, number>; // productId -> costo total
}

/**
 * Genera recetas de producción iniciales para los productos básicos
 * @returns Lista de recetas de producción
 */
export const generateInitialProductionRecipes = (): ProductionRecipe[] => {
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

/**
 * Calcula el tiempo real de producción basado en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param workerSkill Habilidad de los trabajadores (0-100)
 * @param techLevel Nivel tecnológico de la fábrica (1-5)
 * @returns Tiempo de producción en horas de juego
 */
export const calculateProductionTime = (
  recipe: ProductionRecipe,
  factoryEfficiency: number,
  workerSkill: number,
  techLevel: number
): number => {
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

/**
 * Calcula la calidad del producto basada en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param workerSkill Habilidad de los trabajadores (0-100)
 * @param resourceQuality Calidad de los recursos utilizados (0-100)
 * @returns Calidad del producto (0-100)
 */
export const calculateProductQuality = (
  recipe: ProductionRecipe,
  factoryEfficiency: number,
  workerSkill: number,
  resourceQuality: number
): number => {
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
  quality = quality * (
    1 + 
    (normalizedEfficiency - 0.5) * efficiencyWeight +
    (normalizedSkill - 0.5) * skillWeight +
    (normalizedResourceQuality - 0.5) * resourceWeight
  );
  
  // Limitar a rango 0-100
  return Math.max(0, Math.min(100, Math.round(quality)));
};

/**
 * Calcula el costo real de producción basado en varios factores
 * @param recipe Receta de producción
 * @param factoryEfficiency Eficiencia de la fábrica (0-100)
 * @param resourceCosts Costos de los recursos utilizados
 * @param locationFactor Factor de costo de la ubicación (1.0 = normal)
 * @returns Costo de producción
 */
export const calculateProductionCost = (
  recipe: ProductionRecipe,
  factoryEfficiency: number,
  resourceCosts: Record<string, number>,
  locationFactor: number = 1.0
): number => {
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

/**
 * Crea un nuevo proceso de producción
 * @param recipeId ID de la receta a utilizar
 * @param factoryId ID de la fábrica
 * @param efficiency Eficiencia de producción
 * @param gameTime Tiempo actual del juego
 * @returns Proceso de producción creado
 */
export const createProductionProcess = (
  recipeId: string,
  factoryId: string,
  efficiency: number,
  gameTime: number,
  duration: number
): ProductionProcess => {
  return {
    id: `process-${uuidv4()}`,
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

/**
 * Actualiza el progreso de un proceso de producción
 * @param process Proceso de producción a actualizar
 * @param currentTime Tiempo actual del juego
 * @returns Proceso actualizado con nuevo progreso y estado
 */
export const updateProductionProgress = (
  process: ProductionProcess,
  currentTime: number
): ProductionProcess => {
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
  
  return {
    ...process,
    progress,
    status
  };
};

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
export const simulateProduction = (
  recipe: ProductionRecipe,
  factoryEfficiency: number,
  workerSkill: number,
  resourceQuality: number,
  resourceCosts: Record<string, number>,
  locationFactor: number = 1.0
): {
  productId: string;
  quantity: number;
  quality: number;
  productionTime: number;
  productionCost: number;
} => {
  // Calcular tiempo, calidad y costo
  const productionTime = calculateProductionTime(recipe, factoryEfficiency, workerSkill, recipe.techLevel);
  const quality = calculateProductQuality(recipe, factoryEfficiency, workerSkill, resourceQuality);
  const productionCost = calculateProductionCost(recipe, factoryEfficiency, resourceCosts, locationFactor);
  
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
