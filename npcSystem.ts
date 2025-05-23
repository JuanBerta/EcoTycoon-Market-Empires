// Sistema de IA para NPCs
import { v4 as uuidv4 } from 'uuid';

// Tipos para el sistema de IA de NPCs
export interface NPCCompany {
  id: string;
  name: string;
  strategy: 'low_cost' | 'high_quality' | 'niche';
  cash: number;
  reputation: number; // 0-100
  aggressiveness: number; // 0-100, determina la agresividad en decisiones
  riskTolerance: number; // 0-100, determina la tolerancia al riesgo
  preferredProducts: string[]; // IDs de productos preferidos
  preferredRegions: string[]; // IDs de regiones preferidas
  buildings: string[]; // IDs de edificios
  contracts: string[]; // IDs de contratos
  lastDecisionTime: number; // timestamp de la última decisión
}

export interface NPCDecision {
  id: string;
  companyId: string;
  type: 'build' | 'produce' | 'buy' | 'sell' | 'expand' | 'contract' | 'price_change';
  priority: number; // 0-100, mayor = más prioritario
  parameters: Record<string, any>; // Parámetros específicos de la decisión
  expectedProfit: number; // Beneficio esperado
  risk: number; // 0-100, riesgo asociado
  timeToExecute: number; // timestamp para ejecutar
  executed: boolean;
}

/**
 * Genera compañías NPC iniciales
 * @returns Lista de compañías NPC
 */
export const generateInitialNPCCompanies = (): NPCCompany[] => {
  return [
    {
      id: 'npc-company-1',
      name: 'Industrias Económicas',
      strategy: 'low_cost',
      cash: 100000,
      reputation: 60,
      aggressiveness: 40,
      riskTolerance: 30,
      preferredProducts: ['product-1', 'product-3'], // Alimentos y Ropa
      preferredRegions: ['region-1'],
      buildings: [],
      contracts: [],
      lastDecisionTime: Date.now()
    },
    {
      id: 'npc-company-2',
      name: 'Tecnología Premium',
      strategy: 'high_quality',
      cash: 150000,
      reputation: 75,
      aggressiveness: 60,
      riskTolerance: 50,
      preferredProducts: ['product-2'], // Electrónica
      preferredRegions: ['region-1'],
      buildings: [],
      contracts: [],
      lastDecisionTime: Date.now()
    },
    {
      id: 'npc-company-3',
      name: 'Especialistas Agrícolas',
      strategy: 'niche',
      cash: 80000,
      reputation: 65,
      aggressiveness: 30,
      riskTolerance: 40,
      preferredProducts: ['product-1'], // Alimentos
      preferredRegions: ['region-1'],
      buildings: [],
      contracts: [],
      lastDecisionTime: Date.now()
    }
  ];
};

/**
 * Evalúa el mercado y genera decisiones para una compañía NPC
 * @param company Compañía NPC
 * @param marketData Datos del mercado (precios, demanda, oferta)
 * @param regions Datos de regiones disponibles
 * @param currentTime Tiempo actual del juego
 * @returns Lista de decisiones generadas
 */
export const generateNPCDecisions = (
  company: NPCCompany,
  marketData: {
    products: Record<string, { 
      id: string;
      price: number;
      demand: number;
      supply: number;
      trend: 'rising' | 'falling' | 'stable';
    }>;
    resources: Record<string, {
      id: string;
      price: number;
      availability: number;
    }>;
  },
  regions: Array<{
    id: string;
    cities: Array<{
      id: string;
      population: number;
      wealthLevel: number;
      landCost: number;
      laborCost: number;
    }>;
  }>,
  currentTime: number
): NPCDecision[] => {
  const decisions: NPCDecision[] = [];
  
  // Solo generar decisiones si ha pasado suficiente tiempo desde la última vez
  const timeSinceLastDecision = currentTime - company.lastDecisionTime;
  if (timeSinceLastDecision < 24 * 60 * 60 * 1000) { // 24 horas en milisegundos
    return decisions;
  }
  
  // Evaluar oportunidades de producción
  company.preferredProducts.forEach(productId => {
    const product = marketData.products[productId];
    if (!product) return;
    
    // Verificar si hay buena oportunidad de producción
    if (product.demand > product.supply && product.trend !== 'falling') {
      // Calcular prioridad basada en la brecha entre demanda y oferta
      const gap = product.demand - product.supply;
      const priority = Math.min(100, Math.max(0, 40 + gap / 2));
      
      // Calcular beneficio esperado (simplificado)
      const expectedProfit = (product.price * 0.2) * Math.min(gap, 20);
      
      // Calcular riesgo basado en tendencia y volatilidad
      let risk = 50; // Riesgo base
      if (product.trend === 'rising') risk -= 20;
      if (product.trend === 'falling') risk += 20;
      
      // Ajustar por estrategia de la compañía
      if (company.strategy === 'low_cost' && product.price > 50) {
        // Menos interesado en productos caros
        return; 
      }
      
      if (company.strategy === 'high_quality' && product.price < 30) {
        // Menos interesado en productos baratos
        return; 
      }
      
      // Crear decisión de producción
      decisions.push({
        id: `decision-${uuidv4()}`,
        companyId: company.id,
        type: 'produce',
        priority,
        parameters: {
          productId,
          quantity: Math.min(gap, 20),
          targetQuality: company.strategy === 'high_quality' ? 80 : 50
        },
        expectedProfit,
        risk,
        timeToExecute: currentTime + Math.random() * 24 * 60 * 60 * 1000, // Entre ahora y 24h
        executed: false
      });
    }
  });
  
  // Evaluar oportunidades de expansión
  if (company.buildings.length < 3 && company.cash > 50000) {
    // Buscar la mejor ciudad para expandirse
    let bestCity: any = null; // Use 'any' or a proper City type if available
    let bestScore = 0;
    
    regions.forEach(region => {
      if (!company.preferredRegions.includes(region.id)) return;
      
      region.cities.forEach(city => {
        // Calcular puntuación de la ciudad basada en población, riqueza y costos
        let score = city.population / 100000; // Factor de población
        
        // Ajustar por nivel de riqueza según estrategia
        if (company.strategy === 'high_quality') {
          score *= (city.wealthLevel / 50); // Prefiere ciudades ricas
        } else if (company.strategy === 'low_cost') {
          score *= (2 - city.wealthLevel / 50); // Prefiere ciudades menos ricas
        }
        
        // Ajustar por costos
        const costFactor = (city.landCost + city.laborCost) / 1000;
        if (company.strategy === 'low_cost') {
          score /= Math.max(0.1, costFactor); 
        } else {
          score /= Math.max(0.1, Math.sqrt(costFactor)); 
        }
        
        if (score > bestScore) {
          bestScore = score;
          bestCity = city;
        }
      });
    });
    
    if (bestCity) {
      // Determinar tipo de edificio según estrategia
      let buildingType: 'factory' | 'store' | 'warehouse';
      if (company.buildings.length === 0) {
        buildingType = 'factory'; // Primera construcción siempre fábrica
      } else if (company.strategy === 'low_cost') {
        buildingType = Math.random() > 0.3 ? 'factory' : 'warehouse';
      } else if (company.strategy === 'high_quality') {
        buildingType = Math.random() > 0.4 ? 'factory' : 'store';
      } else {
        buildingType = Math.random() > 0.5 ? 'factory' : (Math.random() > 0.5 ? 'store' : 'warehouse');
      }
      
      // Calcular prioridad y riesgo
      const priority = company.buildings.length === 0 ? 90 : 70;
      const risk = 60; // Expansión siempre tiene riesgo moderado-alto
      
      // Crear decisión de construcción
      decisions.push({
        id: `decision-${uuidv4()}`,
        companyId: company.id,
        type: 'build',
        priority,
        parameters: {
          cityId: bestCity.id, 
          buildingType,
          size: company.strategy === 'high_quality' ? 15 : 10
        },
        expectedProfit: bestScore * 1000, // Estimación simple
        risk,
        timeToExecute: currentTime + Math.random() * 48 * 60 * 60 * 1000, // Entre ahora y 48h
        executed: false
      });
    }
  }
  
  // Evaluar oportunidades de compra de recursos
  Object.values(marketData.resources).forEach(resource => {
    // Verificar si el recurso es necesario para productos preferidos
    const isNeeded = company.preferredProducts.some(productId => {
      return true; // Simplified logic
    });
    
    if (isNeeded && resource.price < 20 && resource.availability > 50) {
      let quantity = Math.floor(resource.availability / 10);
      if (company.strategy === 'low_cost') {
        quantity *= 1.5; 
      }
      
      const maxAffordable = Math.floor(company.cash * 0.2 / Math.max(1, resource.price));
      quantity = Math.min(quantity, maxAffordable);
      
      if (quantity > 0) {
        decisions.push({
          id: `decision-${uuidv4()}`,
          companyId: company.id,
          type: 'buy',
          priority: 60,
          parameters: {
            resourceId: resource.id,
            quantity,
            maxPrice: resource.price * 1.1 
          },
          expectedProfit: quantity * resource.price * 0.2, 
          risk: 30, 
          timeToExecute: currentTime + Math.random() * 12 * 60 * 60 * 1000, 
          executed: false
        });
      }
    }
  });
  
  // Evaluar cambios de precio para productos en venta
  company.preferredProducts.forEach(productId => {
    const product = marketData.products[productId];
    if (!product) return;
    
    let priceChange = 0;
    if (company.strategy === 'low_cost') {
      priceChange = -5;
    } else if (company.strategy === 'high_quality') {
      priceChange = 10;
    } else {
      if (product.demand > product.supply) {
        priceChange = 5; 
      } else {
        priceChange = -3; 
      }
    }
    
    if (product.trend === 'rising') {
      priceChange += 3;
    } else if (product.trend === 'falling') {
      priceChange -= 3;
    }
    
    const newPrice = Math.max(product.price * 0.7, product.price + priceChange);
    
    if (Math.abs(newPrice - product.price) > 2) {
      decisions.push({
        id: `decision-${uuidv4()}`,
        companyId: company.id,
        type: 'price_change',
        priority: 50,
        parameters: {
          productId,
          newPrice
        },
        expectedProfit: Math.abs(newPrice - product.price) * 10, 
        risk: 40,
        timeToExecute: currentTime + Math.random() * 6 * 60 * 60 * 1000, 
        executed: false
      });
    }
  });
  
  const filteredDecisions = decisions.filter(decision => 
    decision.risk <= company.riskTolerance + 20 
  );
  
  filteredDecisions.sort((a, b) => b.priority - a.priority);
  
  const maxDecisions = Math.max(1, Math.floor(company.aggressiveness / 20));
  
  return filteredDecisions.slice(0, maxDecisions);
};

/**
 * Ejecuta una decisión de NPC
 * @param decision Decisión a ejecutar
 * @param company Compañía NPC
 * @param gameState Estado actual del juego
 * @returns Resultado de la ejecución
 */
export const executeNPCDecision = (
  decision: NPCDecision,
  company: NPCCompany,
  gameState: any 
): {
  success: boolean;
  effects: Record<string, any>;
  message: string;
} => {
  if (decision.type === 'build') {
    const buildingCost = decision.parameters.size * 5000;
    if (company.cash < buildingCost) {
      return { success: false, effects: {}, message: `${company.name} no tiene suficiente dinero para construir.` };
    }
    const buildingId = `building-${uuidv4()}`;
    return {
      success: true,
      effects: {
        cashChange: -buildingCost,
        newBuilding: { id: buildingId, type: decision.parameters.buildingType, cityId: decision.parameters.cityId, size: decision.parameters.size }
      },
      message: `${company.name} ha construido un nuevo ${decision.parameters.buildingType} en la ciudad.`
    };
  }
  
  if (decision.type === 'produce') {
    const productionCost = decision.parameters.quantity * 100;
    if (company.cash < productionCost) {
      return { success: false, effects: {}, message: `${company.name} no tiene suficiente dinero para producir.` };
    }
    return {
      success: true,
      effects: {
        cashChange: -productionCost,
        production: { productId: decision.parameters.productId, quantity: decision.parameters.quantity, quality: decision.parameters.targetQuality }
      },
      message: `${company.name} ha iniciado la producción de ${decision.parameters.quantity} unidades de producto.`
    };
  }
  
  if (decision.type === 'buy') {
    const totalCost = decision.parameters.quantity * decision.parameters.maxPrice;
    if (company.cash < totalCost) {
      return { success: false, effects: {}, message: `${company.name} no tiene suficiente dinero para comprar recursos.` };
    }
    return {
      success: true,
      effects: {
        cashChange: -totalCost,
        resourcePurchase: { resourceId: decision.parameters.resourceId, quantity: decision.parameters.quantity, price: decision.parameters.maxPrice }
      },
      message: `${company.name} ha comprado ${decision.parameters.quantity} unidades de recurso.`
    };
  }
  
  if (decision.type === 'price_change') {
    return {
      success: true,
      effects: {
        priceChange: { productId: decision.parameters.productId, newPrice: decision.parameters.newPrice }
      },
      message: `${company.name} ha cambiado el precio de su producto a ${decision.parameters.newPrice}.`
    };
  }
  
  return { success: false, effects: {}, message: `${company.name} intentó una acción no implementada.` };
};

/**
 * Actualiza el estado de una compañía NPC basado en los resultados de sus decisiones
 * @param company Compañía NPC a actualizar
 * @param executionResults Resultados de ejecución de decisiones
 * @param currentTime Tiempo actual del juego
 * @returns Compañía actualizada
 */
export const updateNPCCompany = (
  company: NPCCompany,
  executionResults: Array<{
    decision: NPCDecision;
    result: {
      success: boolean;
      effects: Record<string, any>; 
    };
  }>,
  currentTime: number
): NPCCompany => {
  let updatedCompany = { ...company };
  
  executionResults.forEach(({ result }) => {
    if (result.success) {
      // Actualizar efectivo
      if (result.effects.cashChange) {
        updatedCompany.cash += result.effects.cashChange;
      }
      
      // Actualizar reputación
      if (result.effects.reputationChange) {
        updatedCompany.reputation += result.effects.reputationChange;
        updatedCompany.reputation = Math.max(0, Math.min(100, updatedCompany.reputation)); // Cap reputation
      }
      
      // Actualizar edificios
      if (result.effects.newBuilding && result.effects.newBuilding.id) { 
        updatedCompany.buildings.push(result.effects.newBuilding.id);
      }
    }
  });
  
  updatedCompany.lastDecisionTime = currentTime;
  
  return updatedCompany;
};
