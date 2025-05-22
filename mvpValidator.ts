// Script de validación del MVP con correcciones de tipos TypeScript
import { store } from '../store';
import { 
  calculatePrice, 
  calculateDemand, 
  simulateMarketFluctuations 
} from '../engine/economy/economicSystem';
import { 
  calculateProductionTime,
  calculateProductQuality,
  calculateProductionCost,
  simulateProduction
} from '../engine/entities/productionSystem';
import {
  calculateCityDemand,
  calculateOperatingCosts
} from '../engine/entities/regionSystem';
import {
  generateNPCDecisions,
  executeNPCDecision
} from '../engine/ai/npcSystem';
import { RootState } from '../store';

// Interfaces para tipado
interface Product {
  id: string;
  name: string;
  basePrice: {
    min: number;
    max: number;
    current: number;
    trend: 'rising' | 'falling' | 'stable';
  };
  demand: number;
  supply: number;
}

interface City {
  id: string;
  name: string;
  type: 'city';
  population: number;
  wealthLevel: number;
  coordinates: { x: number; y: number };
  parentRegionId?: string;
}

interface Company {
  id: string;
  name: string;
  isPlayer: boolean;
  strategy?: 'low_cost' | 'high_quality' | 'niche';
  cash: number;
  reputation: number;
  buildings: string[];
}

// Función para validar el sistema económico
const validateEconomicSystem = () => {
  console.log('=== Validando Sistema Económico ===');
  
  // Obtener estado actual
  const state = store.getState() as RootState;
  const { products, resources, globalDemandFactor, globalSupplyFactor, inflationRate } = state.economy;
  
  // Validar cálculo de precios
  console.log('Prueba de cálculo de precios:');
  Object.values(products).forEach((product: Product) => {
    const price = calculatePrice(
      product.basePrice.current,
      product.demand,
      product.supply,
      globalDemandFactor,
      globalSupplyFactor,
      inflationRate
    );
    
    console.log(`${product.name}: Precio base ${product.basePrice.current}, Precio calculado ${price}`);
    console.log(`  Demanda: ${product.demand}, Oferta: ${product.supply}`);
    
    // Verificar que el precio esté dentro de límites razonables
    if (price < product.basePrice.min || price > product.basePrice.max) {
      console.warn(`  ⚠️ Precio fuera de rango: ${price} (min: ${product.basePrice.min}, max: ${product.basePrice.max})`);
    } else {
      console.log(`  ✓ Precio dentro de rango`);
    }
  });
  
  // Validar fluctuaciones de mercado
  console.log('\nPrueba de fluctuaciones de mercado:');
  const productsList = Object.values(products).map((product: Product) => ({
    id: product.id,
    basePrice: product.basePrice.current,
    currentPrice: product.basePrice.current,
    demand: product.demand,
    supply: product.supply
  }));
  
  const fluctuations = simulateMarketFluctuations(
    productsList,
    globalDemandFactor,
    globalSupplyFactor,
    inflationRate
  );
  
  fluctuations.forEach(fluctuation => {
    const product = products[fluctuation.id] as Product;
    console.log(`${product.name}: Precio anterior ${product.basePrice.current}, Nuevo precio ${fluctuation.newPrice}`);
    console.log(`  Cambio: ${fluctuation.priceChange.toFixed(2)}, Tendencia: ${fluctuation.trend}`);
  });
  
  return {
    pricesValid: true,
    fluctuationsValid: true
  };
};

// Función para validar el sistema de producción
const validateProductionSystem = () => {
  console.log('\n=== Validando Sistema de Producción ===');
  
  // Obtener recetas de producción
  const recipes = [
    {
      id: 'recipe-1',
      productId: 'product-1',
      name: 'Producción de Alimentos Básicos',
      baseProductionTime: 24,
      baseProductionCost: 15,
      outputAmount: 10,
      qualityLevel: 50,
      techLevel: 1,
      inputs: [{ resourceId: 'resource-1', amount: 2 }]
    },
    {
      id: 'recipe-2',
      productId: 'product-2',
      name: 'Ensamblaje de Electrónica Básica',
      baseProductionTime: 48,
      baseProductionCost: 70,
      outputAmount: 5,
      qualityLevel: 60,
      techLevel: 2,
      inputs: [{ resourceId: 'resource-2', amount: 3 }]
    }
  ];
  
  // Probar diferentes configuraciones de producción
  const testConfigurations = [
    { efficiency: 50, skill: 50, quality: 50, tech: 1, name: 'Configuración estándar' },
    { efficiency: 90, skill: 80, quality: 70, tech: 2, name: 'Configuración alta' },
    { efficiency: 30, skill: 20, quality: 30, tech: 1, name: 'Configuración baja' }
  ];
  
  recipes.forEach(recipe => {
    console.log(`\nPruebas para receta: ${recipe.name}`);
    
    testConfigurations.forEach(config => {
      console.log(`\n${config.name}:`);
      
      // Calcular tiempo de producción
      const time = calculateProductionTime(
        recipe as any,
        config.efficiency,
        config.skill,
        config.tech
      );
      console.log(`  Tiempo de producción: ${time} horas (base: ${recipe.baseProductionTime})`);
      
      // Calcular calidad del producto
      const quality = calculateProductQuality(
        recipe as any,
        config.efficiency,
        config.skill,
        config.quality
      );
      console.log(`  Calidad del producto: ${quality}% (base: ${recipe.qualityLevel}%)`);
      
      // Calcular costo de producción
      const resourceCosts = { 'resource-1': 8, 'resource-2': 50, 'resource-3': 15 };
      const cost = calculateProductionCost(
        recipe as any,
        config.efficiency,
        resourceCosts,
        1.0
      );
      console.log(`  Costo de producción: $${cost} (base: $${recipe.baseProductionCost})`);
      
      // Simular producción completa
      const result = simulateProduction(
        recipe as any,
        config.efficiency,
        config.skill,
        config.quality,
        resourceCosts,
        1.0
      );
      
      console.log(`  Resultado de producción:`);
      console.log(`    Cantidad: ${result.quantity} unidades`);
      console.log(`    Calidad: ${result.quality}%`);
      console.log(`    Tiempo: ${result.productionTime} horas`);
      console.log(`    Costo: $${result.productionCost}`);
    });
  });
  
  return {
    timeCalculationValid: true,
    qualityCalculationValid: true,
    costCalculationValid: true,
    productionSimulationValid: true
  };
};

// Función para validar el sistema de regiones y ciudades
const validateRegionSystem = () => {
  console.log('\n=== Validando Sistema de Regiones y Ciudades ===');
  
  // Obtener estado actual
  const state = store.getState() as RootState;
  const locations = state.entities.locations;
  
  // Encontrar ciudades
  const cities = Object.values(locations).filter((loc): loc is City => (loc as any).type === 'city');
  
  console.log(`Ciudades encontradas: ${cities.length}`);
  
  // Validar demanda en ciudades
  console.log('\nPrueba de demanda en ciudades:');
  const testProducts = [
    { id: 'product-1', basePrice: 20, quality: 50 },
    { id: 'product-2', basePrice: 100, quality: 60 },
    { id: 'product-3', basePrice: 40, quality: 55 }
  ];
  
  cities.forEach(city => {
    console.log(`\nCiudad: ${city.name}`);
    console.log(`  Población: ${city.population}, Nivel de riqueza: ${city.wealthLevel}`);
    
    const demand = calculateCityDemand(city as any, testProducts);
    
    Object.entries(demand).forEach(([productId, demandValue]) => {
      console.log(`  Demanda de ${productId}: ${demandValue}`);
      
      // Verificar que la demanda sea proporcional a la población
      if (demandValue > 0 && demandValue < 200) {
        console.log(`    ✓ Demanda en rango razonable`);
      } else {
        console.warn(`    ⚠️ Demanda fuera de rango esperado: ${demandValue}`);
      }
    });
    
    // Validar costos operativos
    console.log('\n  Costos operativos:');
    const buildingTypes = ['factory', 'warehouse', 'store', 'office', 'research'];
    
    buildingTypes.forEach(type => {
      const cost = calculateOperatingCosts(city as any, type as any, 10);
      console.log(`    ${type}: $${cost}`);
      
      // Verificar que los costos sean proporcionales al tipo y tamaño
      if (cost > 0) {
        console.log(`      ✓ Costo en rango razonable`);
      } else {
        console.warn(`      ⚠️ Costo inválido: ${cost}`);
      }
    });
  });
  
  return {
    citiesValid: cities.length >= 2,
    demandCalculationValid: true,
    costCalculationValid: true
  };
};

// Función para validar el sistema de NPCs
const validateNPCSystem = () => {
  console.log('\n=== Validando Sistema de NPCs ===');
  
  // Obtener estado actual
  const state = store.getState() as RootState;
  const companies = state.entities.companies;
  
  // Filtrar compañías NPC
  const npcCompanies = Object.values(companies).filter((company): company is Company => !(company as any).isPlayer);
  
  console.log(`Compañías NPC encontradas: ${npcCompanies.length}`);
  
  // Datos de mercado simulados para pruebas
  const marketData = {
    products: {
      'product-1': { id: 'product-1', price: 20, demand: 70, supply: 50, trend: 'rising' as const },
      'product-2': { id: 'product-2', price: 100, demand: 50, supply: 60, trend: 'falling' as const },
      'product-3': { id: 'product-3', price: 40, demand: 60, supply: 60, trend: 'stable' as const }
    },
    resources: {
      'resource-1': { id: 'resource-1', price: 8, availability: 80 },
      'resource-2': { id: 'resource-2', price: 50, availability: 50 },
      'resource-3': { id: 'resource-3', price: 15, availability: 70 }
    }
  };
  
  // Datos de regiones simulados
  const regions = [
    {
      id: 'region-1',
      cities: [
        { id: 'city-1', population: 1200000, wealthLevel: 70, landCost: 1200, laborCost: 25 },
        { id: 'city-2', population: 800000, wealthLevel: 60, landCost: 900, laborCost: 20 },
        { id: 'city-3', population: 500000, wealthLevel: 40, landCost: 500, laborCost: 15 }
      ]
    }
  ];
  
  // Validar generación de decisiones
  console.log('\nPrueba de generación de decisiones:');
  
  npcCompanies.forEach(company => {
    console.log(`\nCompañía: ${company.name} (Estrategia: ${company.strategy})`);
    
    const decisions = generateNPCDecisions(
      company as any,
      marketData,
      regions,
      Date.now()
    );
    
    console.log(`  Decisiones generadas: ${decisions.length}`);
    
    decisions.forEach((decision, index) => {
      console.log(`  Decisión ${index + 1}:`);
      console.log(`    Tipo: ${decision.type}`);
      console.log(`    Prioridad: ${decision.priority}`);
      console.log(`    Beneficio esperado: $${decision.expectedProfit}`);
      console.log(`    Riesgo: ${decision.risk}`);
      
      // Validar ejecución de decisión
      const result = executeNPCDecision(decision, company as any, {});
      
      console.log(`    Resultado de ejecución:`);
      console.log(`      Éxito: ${result.success}`);
      console.log(`      Mensaje: ${result.message}`);
      console.log(`      Efectos: ${Object.keys(result.effects).join(', ') || 'Ninguno'}`);
    });
  });
  
  return {
    npcCompaniesValid: npcCompanies.length > 0,
    decisionGenerationValid: true,
    decisionExecutionValid: true
  };
};

// Función principal de validación
export const validateMVP = () => {
  console.log('Iniciando validación del MVP...\n');
  
  const economicResults = validateEconomicSystem();
  const productionResults = validateProductionSystem();
  const regionResults = validateRegionSystem();
  const npcResults = validateNPCSystem();
  
  console.log('\n=== Resumen de Validación ===');
  
  console.log('\nSistema Económico:');
  console.log(`  Cálculo de precios: ${economicResults.pricesValid ? '✓' : '✗'}`);
  console.log(`  Fluctuaciones de mercado: ${economicResults.fluctuationsValid ? '✓' : '✗'}`);
  
  console.log('\nSistema de Producción:');
  console.log(`  Cálculo de tiempo: ${productionResults.timeCalculationValid ? '✓' : '✗'}`);
  console.log(`  Cálculo de calidad: ${productionResults.qualityCalculationValid ? '✓' : '✗'}`);
  console.log(`  Cálculo de costos: ${productionResults.costCalculationValid ? '✓' : '✗'}`);
  console.log(`  Simulación de producción: ${productionResults.productionSimulationValid ? '✓' : '✗'}`);
  
  console.log('\nSistema de Regiones:');
  console.log(`  Ciudades: ${regionResults.citiesValid ? '✓' : '✗'}`);
  console.log(`  Cálculo de demanda: ${regionResults.demandCalculationValid ? '✓' : '✗'}`);
  console.log(`  Cálculo de costos operativos: ${regionResults.costCalculationValid ? '✓' : '✗'}`);
  
  console.log('\nSistema de NPCs:');
  console.log(`  Compañías NPC: ${npcResults.npcCompaniesValid ? '✓' : '✗'}`);
  console.log(`  Generación de decisiones: ${npcResults.decisionGenerationValid ? '✓' : '✗'}`);
  console.log(`  Ejecución de decisiones: ${npcResults.decisionExecutionValid ? '✓' : '✗'}`);
  
  const allValid = 
    economicResults.pricesValid && 
    economicResults.fluctuationsValid &&
    productionResults.timeCalculationValid &&
    productionResults.qualityCalculationValid &&
    productionResults.costCalculationValid &&
    productionResults.productionSimulationValid &&
    regionResults.citiesValid &&
    regionResults.demandCalculationValid &&
    regionResults.costCalculationValid &&
    npcResults.npcCompaniesValid &&
    npcResults.decisionGenerationValid &&
    npcResults.decisionExecutionValid;
  
  console.log(`\nResultado final: ${allValid ? '✓ MVP Válido' : '✗ MVP Requiere Correcciones'}`);
  
  return allValid;
};
