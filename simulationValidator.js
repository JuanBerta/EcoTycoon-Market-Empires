"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntitiesIntegration = validateEntitiesIntegration;
exports.validateNPCGeneration = validateNPCGeneration;
exports.validateEconomicBalance = validateEconomicBalance;
// Sistema de validación e integración para entidades avanzadas y NPCs dinámicos
const productDatabase_1 = require("../entities/productDatabase");
const factorySystem_1 = require("../entities/factorySystem");
const warehouseSystem_1 = require("../entities/warehouseSystem");
const storeSystem_1 = require("../entities/storeSystem");
const npcGenerationSystem_1 = require("./npcGenerationSystem");
// Función para validar la integración de productos y entidades especializadas
function validateEntitiesIntegration(gameState) {
    const issues = [];
    const recommendations = [];
    // 1. Validar productos
    try {
        const products = (0, productDatabase_1.generateProductsDatabase)();
        // Verificar cantidad de productos por categoría
        const productsByCategory = {
            [productDatabase_1.ProductCategory.FOOD]: 0,
            [productDatabase_1.ProductCategory.ELECTRONICS]: 0,
            [productDatabase_1.ProductCategory.TEXTILES]: 0,
            [productDatabase_1.ProductCategory.INDUSTRIAL]: 0,
            [productDatabase_1.ProductCategory.CONSUMER_GOODS]: 0
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
    }
    catch (error) {
        issues.push(`Error al validar productos: ${error}`);
        recommendations.push('Revisar implementación de la base de datos de productos');
    }
    // 2. Validar fábricas
    try {
        const factoryTemplates = (0, factorySystem_1.generateFactoryTemplates)();
        // Verificar cobertura de especializaciones
        const specializationCoverage = {
            [factorySystem_1.FactorySpecialization.MASS_PRODUCTION]: false,
            [factorySystem_1.FactorySpecialization.QUALITY_PRODUCTION]: false,
            [factorySystem_1.FactorySpecialization.AUTOMATED]: false,
            [factorySystem_1.FactorySpecialization.ARTISANAL]: false,
            [factorySystem_1.FactorySpecialization.SUSTAINABLE]: false,
            [factorySystem_1.FactorySpecialization.FLEXIBLE]: false,
            [factorySystem_1.FactorySpecialization.SPECIALIZED]: false,
            [factorySystem_1.FactorySpecialization.RESEARCH_ORIENTED]: false
        };
        // Verificar cobertura de categorías
        const categoryCoverage = {
            [productDatabase_1.ProductCategory.FOOD]: false,
            [productDatabase_1.ProductCategory.ELECTRONICS]: false,
            [productDatabase_1.ProductCategory.TEXTILES]: false,
            [productDatabase_1.ProductCategory.INDUSTRIAL]: false,
            [productDatabase_1.ProductCategory.CONSUMER_GOODS]: false
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
        const testFactory = (0, factorySystem_1.createFactory)(Object.keys(factoryTemplates)[0], 'region-1', 'player-1', 'Test Factory');
        if (!testFactory || !testFactory.id) {
            issues.push('Error al crear fábrica de prueba');
            recommendations.push('Revisar función de creación de fábricas');
        }
    }
    catch (error) {
        issues.push(`Error al validar fábricas: ${error}`);
        recommendations.push('Revisar implementación del sistema de fábricas');
    }
    // 3. Validar almacenes
    try {
        const warehouseTemplates = (0, warehouseSystem_1.generateWarehouseTemplates)();
        // Verificar cobertura de especializaciones
        const specializationCoverage = {
            [warehouseSystem_1.WarehouseSpecialization.GENERAL]: false,
            [warehouseSystem_1.WarehouseSpecialization.REFRIGERATED]: false,
            [warehouseSystem_1.WarehouseSpecialization.HIGH_SECURITY]: false,
            [warehouseSystem_1.WarehouseSpecialization.HAZARDOUS]: false,
            [warehouseSystem_1.WarehouseSpecialization.AUTOMATED]: false,
            [warehouseSystem_1.WarehouseSpecialization.BULK]: false,
            [warehouseSystem_1.WarehouseSpecialization.DISTRIBUTION]: false,
            [warehouseSystem_1.WarehouseSpecialization.TEMPORARY]: false
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
        const testWarehouse = (0, warehouseSystem_1.createWarehouse)(Object.keys(warehouseTemplates)[0], 'region-1', 'player-1', 'Test Warehouse');
        if (!testWarehouse || !testWarehouse.id) {
            issues.push('Error al crear almacén de prueba');
            recommendations.push('Revisar función de creación de almacenes');
        }
    }
    catch (error) {
        issues.push(`Error al validar almacenes: ${error}`);
        recommendations.push('Revisar implementación del sistema de almacenes');
    }
    // 4. Validar tiendas
    try {
        const storeTemplates = (0, storeSystem_1.generateStoreTemplates)();
        // Verificar cobertura de especializaciones
        const specializationCoverage = {
            [storeSystem_1.StoreSpecialization.GENERAL]: false,
            [storeSystem_1.StoreSpecialization.SPECIALIZED]: false,
            [storeSystem_1.StoreSpecialization.DISCOUNT]: false,
            [storeSystem_1.StoreSpecialization.PREMIUM]: false,
            [storeSystem_1.StoreSpecialization.OUTLET]: false,
            [storeSystem_1.StoreSpecialization.DEPARTMENT]: false,
            [storeSystem_1.StoreSpecialization.CONVENIENCE]: false,
            [storeSystem_1.StoreSpecialization.ONLINE]: false
        };
        // Verificar cobertura de categorías
        const categoryCoverage = {
            [productDatabase_1.ProductCategory.FOOD]: false,
            [productDatabase_1.ProductCategory.ELECTRONICS]: false,
            [productDatabase_1.ProductCategory.TEXTILES]: false,
            [productDatabase_1.ProductCategory.INDUSTRIAL]: false,
            [productDatabase_1.ProductCategory.CONSUMER_GOODS]: false,
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
        const testStore = (0, storeSystem_1.createStore)(Object.keys(storeTemplates)[0], 'region-1', 'player-1', 'Test Store');
        if (!testStore || !testStore.id) {
            issues.push('Error al crear tienda de prueba');
            recommendations.push('Revisar función de creación de tiendas');
        }
    }
    catch (error) {
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
function validateNPCGeneration(gameState) {
    const issues = [];
    const recommendations = [];
    const generatedNPCs = [];
    try {
        // Verificar si la función de decisión funciona
        const shouldGenerate = (0, npcGenerationSystem_1.shouldGenerateNPC)(gameState);
        // Generar parámetros a partir del estado del juego
        const params = (0, npcGenerationSystem_1.generateParamsFromGameState)(gameState);
        if (!params) {
            issues.push('Error al generar parámetros para NPCs');
            recommendations.push('Revisar función generateParamsFromGameState');
        }
        // Verificar cobertura de tipos de compañías
        const typeCoverage = {
            [npcGenerationSystem_1.NPCCompanyType.STARTUP]: false,
            [npcGenerationSystem_1.NPCCompanyType.CORPORATION]: false,
            [npcGenerationSystem_1.NPCCompanyType.SPECIALIST]: false,
            [npcGenerationSystem_1.NPCCompanyType.DISRUPTOR]: false,
            [npcGenerationSystem_1.NPCCompanyType.TRADITIONAL]: false
        };
        // Generar múltiples NPCs para verificar diversidad
        for (let i = 0; i < 10; i++) {
            const npc = (0, npcGenerationSystem_1.generateNPCCompany)(params);
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
            npc.preferredProducts.forEach((productId) => uniqueProductPreferences.add(productId));
        });
        if (uniqueProductPreferences.size < 5) {
            issues.push(`Baja diversidad de preferencias de productos: solo ${uniqueProductPreferences.size} productos diferentes`);
            recommendations.push('Revisar algoritmo de selección de productos preferidos');
        }
        // Verificar función principal de generación dinámica
        const dynamicNPC = (0, npcGenerationSystem_1.processDynamicNPCGeneration)(gameState);
        if (dynamicNPC) {
            generatedNPCs.push(dynamicNPC);
        }
    }
    catch (error) {
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
function validateEconomicBalance(gameState) {
    const issues = [];
    const recommendations = [];
    const metrics = {};
    try {
        // Extraer datos relevantes del estado del juego
        const { products, resources, globalDemandFactor, globalSupplyFactor } = gameState.economy;
        const { companies, playerCompanyId } = gameState.entities;
        // Calcular métricas de equilibrio
        // 1. Ratio oferta/demanda por categoría
        const supplyDemandRatio = {
            [productDatabase_1.ProductCategory.FOOD]: 0,
            [productDatabase_1.ProductCategory.ELECTRONICS]: 0,
            [productDatabase_1.ProductCategory.TEXTILES]: 0,
            [productDatabase_1.ProductCategory.INDUSTRIAL]: 0,
            [productDatabase_1.ProductCategory.CONSUMER_GOODS]: 0
        };
        const categoryProducts = {
            [productDatabase_1.ProductCategory.FOOD]: 0,
            [productDatabase_1.ProductCategory.ELECTRONICS]: 0,
            [productDatabase_1.ProductCategory.TEXTILES]: 0,
            [productDatabase_1.ProductCategory.INDUSTRIAL]: 0,
            [productDatabase_1.ProductCategory.CONSUMER_GOODS]: 0
        };
        Object.values(products).forEach((product) => {
            const category = product.category;
            supplyDemandRatio[category] += (product.supply / Math.max(1, product.demand));
            categoryProducts[category]++;
        });
        // Calcular promedio por categoría
        Object.entries(supplyDemandRatio).forEach(([category, total]) => {
            const count = categoryProducts[category];
            if (count > 0) {
                const ratio = total / count;
                supplyDemandRatio[category] = ratio;
                metrics[`supply_demand_ratio_${category}`] = ratio;
                // Verificar desequilibrios
                if (ratio < 0.5) {
                    issues.push(`Oferta muy baja para categoría ${category}: ${(ratio * 100).toFixed(1)}% de la demanda`);
                    recommendations.push(`Aumentar producción o reducir demanda para categoría ${category}`);
                }
                else if (ratio > 1.5) {
                    issues.push(`Sobreproducción para categoría ${category}: ${(ratio * 100).toFixed(1)}% de la demanda`);
                    recommendations.push(`Reducir producción o aumentar demanda para categoría ${category}`);
                }
            }
        });
        // 2. Distribución de riqueza entre NPCs
        const npcCompanies = Object.values(companies).filter((company) => company.id !== playerCompanyId);
        if (npcCompanies.length > 0) {
            // Calcular estadísticas de capital
            const cashValues = npcCompanies.map((company) => company.cash);
            const totalCash = cashValues.reduce((sum, cash) => sum + cash, 0);
            const averageCash = totalCash / npcCompanies.length;
            const maxCash = Math.max(...cashValues);
            const minCash = Math.min(...cashValues);
            metrics.npc_count = npcCompanies.length;
            metrics.npc_total_cash = totalCash;
            (Content);
            truncated;
            due;
            to;
            size;
            limit.Use;
            line;
            ranges;
            to;
            read in chunks;
        }
    }
    finally { }
}
