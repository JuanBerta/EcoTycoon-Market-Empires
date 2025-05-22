// Sistema de validación e integración para entidades avanzadas y NPCs dinámicos
import { generateProductsDatabase, ProductCategory, MarketSegment } from '../entities/productDatabase';
import { generateFactoryTemplates, createFactory, FactorySpecialization } from '../entities/factorySystem';
import { generateWarehouseTemplates, createWarehouse, WarehouseSpecialization } from '../entities/warehouseSystem';
import { generateStoreTemplates, createStore, StoreSpecialization } from '../entities/storeSystem';
import { 
  generateNPCCompany, 
  processDynamicNPCGeneration, 
  NPCCompanyType,
  shouldGenerateNPC,
  generateParamsFromGameState
} from './npcGenerationSystem';

// Función para validar la integración de productos y entidades especializadas
export function validateEntitiesIntegration(gameState: any): {
  success: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // 1. Validar productos
  try {
    const products = generateProductsDatabase();
    
    // Verificar cantidad de productos por categoría
    const productsByCategory: Record<ProductCategory, number> = {
      [ProductCategory.FOOD]: 0,
      [ProductCategory.ELECTRONICS]: 0,
      [ProductCategory.TEXTILES]: 0,
      [ProductCategory.INDUSTRIAL]: 0,
      [ProductCategory.CONSUMER_GOODS]: 0
    };
    
    Object.values(products).forEach(product => {
      productsByCategory[product.category]++;
    });
    
    // Verificar distribución equilibrada
    const totalProducts = Object.values(productsByCategory).reduce((sum, count) => sum + count, 0);
    Object.entries(productsByCategory).forEach(([category, count]) => {
      const percentage = (count / totalProducts) * 100;
      if (percentage < 10) {
        issues.push(`Baja representación de productos en categoría ${category}: ${percentage.toFixed(1)}%`);
        recommendations.push(`Añadir más productos a la categoría ${category}`);
      }
    });
    
    // Verificar atributos de productos
    let productsWithMissingAttributes = 0;
    Object.values(products).forEach(product => {
      if (!product.basePrice || !product.qualityRange || !product.productionComplexity) {
        productsWithMissingAttributes++;
      }
    });
    
    if (productsWithMissingAttributes > 0) {
      issues.push(`${productsWithMissingAttributes} productos tienen atributos esenciales faltantes`);
      recommendations.push('Revisar y completar atributos faltantes en productos');
    }
    
  } catch (error) {
    issues.push(`Error al validar productos: ${error}`);
    recommendations.push('Revisar implementación de la base de datos de productos');
  }
  
  // 2. Validar fábricas
  try {
    const factoryTemplates = generateFactoryTemplates();
    
    // Verificar cobertura de especializaciones
    const specializationCoverage: Record<FactorySpecialization, boolean> = {
      [FactorySpecialization.MASS_PRODUCTION]: false,
      [FactorySpecialization.QUALITY_PRODUCTION]: false,
      [FactorySpecialization.AUTOMATED]: false,
      [FactorySpecialization.ARTISANAL]: false,
      [FactorySpecialization.SUSTAINABLE]: false,
      [FactorySpecialization.FLEXIBLE]: false,
      [FactorySpecialization.SPECIALIZED]: false,
      [FactorySpecialization.RESEARCH_ORIENTED]: false
    };
    
    // Verificar cobertura de categorías
    const categoryCoverage: Record<ProductCategory, boolean> = {
      [ProductCategory.FOOD]: false,
      [ProductCategory.ELECTRONICS]: false,
      [ProductCategory.TEXTILES]: false,
      [ProductCategory.INDUSTRIAL]: false,
      [ProductCategory.CONSUMER_GOODS]: false
    };
    
    Object.values(factoryTemplates).forEach(template => {
      if (template.specialization) {
        specializationCoverage[template.specialization] = true;
      }
      if (template.productionCategory) {
        categoryCoverage[template.productionCategory] = true;
      }
    });
    
    // Verificar especializaciones faltantes
    const missingSpecializations = Object.entries(specializationCoverage)
      .filter(([, covered]) => !covered)
      .map(([spec]) => spec);
    
    if (missingSpecializations.length > 0) {
      issues.push(`Faltan plantillas para las siguientes especializaciones de fábricas: ${missingSpecializations.join(', ')}`);
      recommendations.push('Añadir plantillas para todas las especializaciones de fábricas');
    }
    
    // Verificar categorías faltantes
    const missingCategories = Object.entries(categoryCoverage)
      .filter(([, covered]) => !covered)
      .map(([cat]) => cat);
    
    if (missingCategories.length > 0) {
      issues.push(`Faltan fábricas para las siguientes categorías de productos: ${missingCategories.join(', ')}`);
      recommendations.push('Añadir fábricas para todas las categorías de productos');
    }
    
    // Probar creación de fábrica
    const testFactory = createFactory(
      Object.keys(factoryTemplates)[0],
      'region-1',
      'player-1',
      'Test Factory'
    );
    
    if (!testFactory || !testFactory.id) {
      issues.push('Error al crear fábrica de prueba');
      recommendations.push('Revisar función de creación de fábricas');
    }
    
  } catch (error) {
    issues.push(`Error al validar fábricas: ${error}`);
    recommendations.push('Revisar implementación del sistema de fábricas');
  }
  
  // 3. Validar almacenes
  try {
    const warehouseTemplates = generateWarehouseTemplates();
    
    // Verificar cobertura de especializaciones
    const specializationCoverage: Record<WarehouseSpecialization, boolean> = {
      [WarehouseSpecialization.GENERAL]: false,
      [WarehouseSpecialization.REFRIGERATED]: false,
      [WarehouseSpecialization.HIGH_SECURITY]: false,
      [WarehouseSpecialization.HAZARDOUS]: false,
      [WarehouseSpecialization.AUTOMATED]: false,
      [WarehouseSpecialization.BULK]: false,
      [WarehouseSpecialization.DISTRIBUTION]: false,
      [WarehouseSpecialization.TEMPORARY]: false
    };
    
    Object.values(warehouseTemplates).forEach(template => {
      if (template.specialization) {
        specializationCoverage[template.specialization] = true;
      }
    });
    
    // Verificar especializaciones faltantes
    const missingSpecializations = Object.entries(specializationCoverage)
      .filter(([, covered]) => !covered)
      .map(([spec]) => spec);
    
    if (missingSpecializations.length > 0) {
      issues.push(`Faltan plantillas para las siguientes especializaciones de almacenes: ${missingSpecializations.join(', ')}`);
      recommendations.push('Añadir plantillas para todas las especializaciones de almacenes');
    }
    
    // Probar creación de almacén
    const testWarehouse = createWarehouse(
      Object.keys(warehouseTemplates)[0],
      'region-1',
      'player-1',
      'Test Warehouse'
    );
    
    if (!testWarehouse || !testWarehouse.id) {
      issues.push('Error al crear almacén de prueba');
      recommendations.push('Revisar función de creación de almacenes');
    }
    
  } catch (error) {
    issues.push(`Error al validar almacenes: ${error}`);
    recommendations.push('Revisar implementación del sistema de almacenes');
  }
  
  // 4. Validar tiendas
  try {
    const storeTemplates = generateStoreTemplates();
    
    // Verificar cobertura de especializaciones
    const specializationCoverage: Record<StoreSpecialization, boolean> = {
      [StoreSpecialization.GENERAL]: false,
      [StoreSpecialization.SPECIALIZED]: false,
      [StoreSpecialization.DISCOUNT]: false,
      [StoreSpecialization.PREMIUM]: false,
      [StoreSpecialization.OUTLET]: false,
      [StoreSpecialization.DEPARTMENT]: false,
      [StoreSpecialization.CONVENIENCE]: false,
      [StoreSpecialization.ONLINE]: false
    };
    
    // Verificar cobertura de categorías
    const categoryCoverage: Record<ProductCategory | 'mixed', boolean> = {
      [ProductCategory.FOOD]: false,
      [ProductCategory.ELECTRONICS]: false,
      [ProductCategory.TEXTILES]: false,
      [ProductCategory.INDUSTRIAL]: false,
      [ProductCategory.CONSUMER_GOODS]: false,
      'mixed': false
    };
    
    Object.values(storeTemplates).forEach(template => {
      if (template.specialization) {
        specializationCoverage[template.specialization] = true;
      }
      if (template.storeCategory) {
        categoryCoverage[template.storeCategory] = true;
      }
    });
    
    // Verificar especializaciones faltantes
    const missingSpecializations = Object.entries(specializationCoverage)
      .filter(([, covered]) => !covered)
      .map(([spec]) => spec);
    
    if (missingSpecializations.length > 0) {
      issues.push(`Faltan plantillas para las siguientes especializaciones de tiendas: ${missingSpecializations.join(', ')}`);
      recommendations.push('Añadir plantillas para todas las especializaciones de tiendas');
    }
    
    // Verificar categorías faltantes
    const missingCategories = Object.entries(categoryCoverage)
      .filter(([, covered]) => !covered)
      .map(([cat]) => cat);
    
    if (missingCategories.length > 0) {
      issues.push(`Faltan tiendas para las siguientes categorías: ${missingCategories.join(', ')}`);
      recommendations.push('Añadir tiendas para todas las categorías');
    }
    
    // Probar creación de tienda
    const testStore = createStore(
      Object.keys(storeTemplates)[0],
      'region-1',
      'player-1',
      'Test Store'
    );
    
    if (!testStore || !testStore.id) {
      issues.push('Error al crear tienda de prueba');
      recommendations.push('Revisar función de creación de tiendas');
    }
    
  } catch (error) {
    issues.push(`Error al validar tiendas: ${error}`);
    recommendations.push('Revisar implementación del sistema de tiendas');
  }
  
  return {
    success: issues.length === 0,
    issues,
    recommendations
  };
}

// Función para validar la generación dinámica de NPCs
export function validateNPCGeneration(gameState: any): {
  success: boolean;
  issues: string[];
  recommendations: string[];
  generatedNPCs: any[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const generatedNPCs: any[] = [];
  
  try {
    // Verificar si la función de decisión funciona
    const shouldGenerate = shouldGenerateNPC(gameState);
    
    // Generar parámetros a partir del estado del juego
    const params = generateParamsFromGameState(gameState);
    
    if (!params) {
      issues.push('Error al generar parámetros para NPCs');
      recommendations.push('Revisar función generateParamsFromGameState');
    }
    
    // Verificar cobertura de tipos de compañías
    const typeCoverage: Record<NPCCompanyType, boolean> = {
      [NPCCompanyType.STARTUP]: false,
      [NPCCompanyType.CORPORATION]: false,
      [NPCCompanyType.SPECIALIST]: false,
      [NPCCompanyType.DISRUPTOR]: false,
      [NPCCompanyType.TRADITIONAL]: false
    };
    
    // Generar múltiples NPCs para verificar diversidad
    for (let i = 0; i < 10; i++) {
      const npc = generateNPCCompany(params);
      generatedNPCs.push(npc);
      
      if (npc.type) {
        typeCoverage[npc.type] = true;
      }
    }
    
    // Verificar tipos faltantes
    const missingTypes = Object.entries(typeCoverage)
      .filter(([, covered]) => !covered)
      .map(([type]) => type);
    
    if (missingTypes.length > 0) {
      issues.push(`No se generaron NPCs de los siguientes tipos: ${missingTypes.join(', ')}`);
      recommendations.push('Revisar probabilidades de generación de tipos de NPCs');
    }
    
    // Verificar diversidad de estrategias
    const strategies = new Set(generatedNPCs.map(npc => npc.strategy));
    if (strategies.size < 3) {
      issues.push(`Baja diversidad de estrategias en NPCs generados: solo ${strategies.size} estrategias diferentes`);
      recommendations.push('Revisar algoritmo de selección de estrategias');
    }
    
    // Verificar diversidad de preferencias de productos
    const uniqueProductPreferences = new Set();
    generatedNPCs.forEach(npc => {
      npc.preferredProducts.forEach((productId: string) => uniqueProductPreferences.add(productId));
    });
    
    if (uniqueProductPreferences.size < 5) {
      issues.push(`Baja diversidad de preferencias de productos: solo ${uniqueProductPreferences.size} productos diferentes`);
      recommendations.push('Revisar algoritmo de selección de productos preferidos');
    }
    
    // Verificar función principal de generación dinámica
    const dynamicNPC = processDynamicNPCGeneration(gameState);
    if (dynamicNPC) {
      generatedNPCs.push(dynamicNPC);
    }
    
  } catch (error) {
    issues.push(`Error al validar generación de NPCs: ${error}`);
    recommendations.push('Revisar implementación del sistema de generación de NPCs');
  }
  
  return {
    success: issues.length === 0,
    issues,
    recommendations,
    generatedNPCs
  };
}

// Función para validar el equilibrio económico con entidades avanzadas
export function validateEconomicBalance(gameState: any): {
  success: boolean;
  issues: string[];
  recommendations: string[];
  metrics: Record<string, number>;
} {
  const issues: string[] = [];
  const recommendations: string[] = [];
  const metrics: Record<string, number> = {};
  
  try {
    // Extraer datos relevantes del estado del juego
    const {
      products,
      resources,
      globalDemandFactor,
      globalSupplyFactor
    } = gameState.economy;
    
    const {
      companies,
      playerCompanyId
    } = gameState.entities;
    
    // Calcular métricas de equilibrio
    
    // 1. Ratio oferta/demanda por categoría
    const supplyDemandRatio: Record<ProductCategory, number> = {
      [ProductCategory.FOOD]: 0,
      [ProductCategory.ELECTRONICS]: 0,
      [ProductCategory.TEXTILES]: 0,
      [ProductCategory.INDUSTRIAL]: 0,
      [ProductCategory.CONSUMER_GOODS]: 0
    };
    
    const categoryProducts: Record<ProductCategory, number> = {
      [ProductCategory.FOOD]: 0,
      [ProductCategory.ELECTRONICS]: 0,
      [ProductCategory.TEXTILES]: 0,
      [ProductCategory.INDUSTRIAL]: 0,
      [ProductCategory.CONSUMER_GOODS]: 0
    };
    
    Object.values(products).forEach((product: any) => {
      const category = product.category;
      supplyDemandRatio[category] += (product.supply / Math.max(1, product.demand));
      categoryProducts[category]++;
    });
    
    // Calcular promedio por categoría
    Object.entries(supplyDemandRatio).forEach(([category, total]) => {
      const count = categoryProducts[category as ProductCategory];
      if (count > 0) {
        const ratio = total / count;
        supplyDemandRatio[category as ProductCategory] = ratio;
        metrics[`supply_demand_ratio_${category}`] = ratio;
        
        // Verificar desequilibrios
        if (ratio < 0.5) {
          issues.push(`Oferta muy baja para categoría ${category}: ${(ratio * 100).toFixed(1)}% de la demanda`);
          recommendations.push(`Aumentar producción o reducir demanda para categoría ${category}`);
        } else if (ratio > 1.5) {
          issues.push(`Sobreproducción para categoría ${category}: ${(ratio * 100).toFixed(1)}% de la demanda`);
          recommendations.push(`Reducir producción o aumentar demanda para categoría ${category}`);
        }
      }
    });
    
    // 2. Distribución de riqueza entre NPCs
    const npcCompanies = Object.values(companies).filter((company: any) => company.id !== playerCompanyId);
    
    if (npcCompanies.length > 0) {
      // Calcular estadísticas de capital
      const cashValues = npcCompanies.map((company: any) => company.cash);
      const totalCash = cashValues.reduce((sum: number, cash: number) => sum + cash, 0);
      const averageCash = totalCash / npcCompanies.length;
      const maxCash = Math.max(...cashValues);
      const minCash = Math.min(...cashValues);
      
      metrics.npc_count = npcCompanies.length;
      metrics.npc_total_cash = totalCash;
   
(Content truncated due to size limit. Use line ranges to read in chunks)