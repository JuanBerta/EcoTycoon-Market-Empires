"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCCompanyType = void 0;
exports.generateCompanyName = generateCompanyName;
exports.determineCompanyType = determineCompanyType;
exports.determineStrategy = determineStrategy;
exports.calculateInitialCash = calculateInitialCash;
exports.determineSpecialization = determineSpecialization;
exports.generateBehaviorTraits = generateBehaviorTraits;
exports.calculateInitialProfitMargin = calculateInitialProfitMargin;
exports.calculateInitialReputation = calculateInitialReputation;
exports.calculateInitialGrowthRate = calculateInitialGrowthRate;
exports.determineInitialStatus = determineInitialStatus;
exports.generateNPCCompany = generateNPCCompany;
exports.shouldGenerateNPC = shouldGenerateNPC;
exports.generateParamsFromGameState = generateParamsFromGameState;
exports.processDynamicNPCGeneration = processDynamicNPCGeneration;
// Implementación de generación dinámica de compañías NPC
const uuid_1 = require("uuid");
const productDatabase_1 = require("./productDatabase");
// Enumeraciones
var NPCCompanyType;
(function (NPCCompanyType) {
    NPCCompanyType["STARTUP"] = "startup";
    NPCCompanyType["CORPORATION"] = "corporation";
    NPCCompanyType["SPECIALIST"] = "specialist";
    NPCCompanyType["DISRUPTOR"] = "disruptor";
    NPCCompanyType["TRADITIONAL"] = "traditional";
})(NPCCompanyType || (exports.NPCCompanyType = NPCCompanyType = {}));
// Generador de nombres de compañías
function generateCompanyName(type, category) {
    const prefixes = {
        [NPCCompanyType.STARTUP]: ['Nova', 'Nexus', 'Quantum', 'Fusion', 'Spark', 'Pulse', 'Vertex', 'Zenith', 'Echo', 'Flux'],
        [NPCCompanyType.CORPORATION]: ['Global', 'United', 'International', 'Consolidated', 'Allied', 'Universal', 'Integrated', 'Strategic', 'Premier', 'Paramount'],
        [NPCCompanyType.SPECIALIST]: ['Elite', 'Precision', 'Expert', 'Specialized', 'Master', 'Artisan', 'Craft', 'Select', 'Prime', 'Focused'],
        [NPCCompanyType.DISRUPTOR]: ['Radical', 'Revolution', 'Shift', 'Breakthrough', 'Frontier', 'Edge', 'Horizon', 'Vanguard', 'Catalyst', 'Impulse'],
        [NPCCompanyType.TRADITIONAL]: ['Heritage', 'Legacy', 'Classic', 'Traditional', 'Vintage', 'Established', 'Foundry', 'Standard', 'Original', 'Timeless']
    };
    const suffixes = {
        [NPCCompanyType.STARTUP]: ['Tech', 'Labs', 'Dynamics', 'Systems', 'Solutions', 'Innovations', 'Ventures', 'Networks', 'Digital', 'Creations'],
        [NPCCompanyType.CORPORATION]: ['Corp', 'Industries', 'Enterprises', 'Holdings', 'Group', 'Conglomerate', 'Associates', 'Partners', 'International', 'Incorporated'],
        [NPCCompanyType.SPECIALIST]: ['Specialists', 'Experts', 'Craftsmen', 'Artisans', 'Masters', 'Professionals', 'Consultants', 'Advisors', 'Services', 'Solutions'],
        [NPCCompanyType.DISRUPTOR]: ['Innovations', 'Disruption', 'Frontiers', 'Breakthroughs', 'Revolution', 'Paradigm', 'Transformations', 'Concepts', 'Visionaries', 'Pioneers'],
        [NPCCompanyType.TRADITIONAL]: ['& Sons', '& Co.', 'Establishment', 'Traditions', 'Heritage', 'Classics', 'Foundry', 'Works', 'Crafts', 'Manufacturers']
    };
    const categorySuffixes = {
        [productDatabase_1.ProductCategory.FOOD]: ['Foods', 'Nutrition', 'Edibles', 'Cuisine', 'Gastronomy', 'Provisions', 'Delicacies', 'Eateries', 'Sustenance', 'Victuals'],
        [productDatabase_1.ProductCategory.ELECTRONICS]: ['Electronics', 'Devices', 'Circuits', 'Computing', 'Technology', 'Gadgets', 'Hardware', 'Systems', 'Appliances', 'Robotics'],
        [productDatabase_1.ProductCategory.TEXTILES]: ['Textiles', 'Fabrics', 'Garments', 'Apparel', 'Fashion', 'Clothing', 'Wearables', 'Threads', 'Attire', 'Couture'],
        [productDatabase_1.ProductCategory.INDUSTRIAL]: ['Industrial', 'Manufacturing', 'Machinery', 'Equipment', 'Tools', 'Construction', 'Engineering', 'Materials', 'Hardware', 'Fabrication'],
        [productDatabase_1.ProductCategory.CONSUMER_GOODS]: ['Goods', 'Products', 'Essentials', 'Lifestyle', 'Commodities', 'Necessities', 'Merchandise', 'Supplies', 'Accessories', 'Utilities']
    };
    // Seleccionar prefijo aleatorio
    const prefix = prefixes[type][Math.floor(Math.random() * prefixes[type].length)];
    // Seleccionar sufijo basado en categoría si está disponible, o usar sufijo general
    let suffix;
    if (category && Math.random() > 0.5) {
        suffix = categorySuffixes[category][Math.floor(Math.random() * categorySuffixes[category].length)];
    }
    else {
        suffix = suffixes[type][Math.floor(Math.random() * suffixes[type].length)];
    }
    // Combinar para formar el nombre
    return `${prefix} ${suffix}`;
}
// Determinar tipo de compañía basado en parámetros
function determineCompanyType(params) {
    // Probabilidades base para cada tipo
    const baseProbabilities = {
        [NPCCompanyType.STARTUP]: 0.2,
        [NPCCompanyType.CORPORATION]: 0.2,
        [NPCCompanyType.SPECIALIST]: 0.2,
        [NPCCompanyType.DISRUPTOR]: 0.2,
        [NPCCompanyType.TRADITIONAL]: 0.2
    };
    // Ajustar probabilidades según parámetros
    let adjustedProbabilities = Object.assign({}, baseProbabilities);
    // Ajuste por ciclo económico
    if (params.economicCycle === 'boom') {
        adjustedProbabilities[NPCCompanyType.STARTUP] += 0.1;
        adjustedProbabilities[NPCCompanyType.DISRUPTOR] += 0.1;
        adjustedProbabilities[NPCCompanyType.TRADITIONAL] -= 0.1;
    }
    else if (params.economicCycle === 'recession') {
        adjustedProbabilities[NPCCompanyType.STARTUP] -= 0.1;
        adjustedProbabilities[NPCCompanyType.CORPORATION] += 0.05;
        adjustedProbabilities[NPCCompanyType.TRADITIONAL] += 0.05;
    }
    // Ajuste por estatus económico regional
    if (params.regionEconomicStatus === 'wealthy') {
        adjustedProbabilities[NPCCompanyType.CORPORATION] += 0.05;
        adjustedProbabilities[NPCCompanyType.SPECIALIST] += 0.05;
    }
    else if (params.regionEconomicStatus === 'poor') {
        adjustedProbabilities[NPCCompanyType.TRADITIONAL] += 0.1;
        adjustedProbabilities[NPCCompanyType.CORPORATION] -= 0.05;
    }
    // Ajuste por tendencia de producto
    if (params.productTrend === 'rising') {
        adjustedProbabilities[NPCCompanyType.STARTUP] += 0.1;
        adjustedProbabilities[NPCCompanyType.DISRUPTOR] += 0.05;
    }
    else if (params.productTrend === 'falling') {
        adjustedProbabilities[NPCCompanyType.TRADITIONAL] += 0.1;
        adjustedProbabilities[NPCCompanyType.STARTUP] -= 0.05;
    }
    // Ajuste por dificultad
    if (params.difficulty === 'hard') {
        adjustedProbabilities[NPCCompanyType.CORPORATION] += 0.05;
        adjustedProbabilities[NPCCompanyType.DISRUPTOR] += 0.05;
    }
    else if (params.difficulty === 'easy') {
        adjustedProbabilities[NPCCompanyType.TRADITIONAL] += 0.05;
        adjustedProbabilities[NPCCompanyType.SPECIALIST] += 0.05;
    }
    // Normalizar probabilidades
    const total = Object.values(adjustedProbabilities).reduce((sum, prob) => sum + prob, 0);
    Object.keys(adjustedProbabilities).forEach(key => {
        adjustedProbabilities[key] /= total;
    });
    // Selección aleatoria basada en probabilidades ajustadas
    const random = Math.random();
    let cumulativeProbability = 0;
    for (const type of Object.keys(adjustedProbabilities)) {
        cumulativeProbability += adjustedProbabilities[type];
        if (random <= cumulativeProbability) {
            return type;
        }
    }
    // Fallback por si acaso
    return NPCCompanyType.TRADITIONAL;
}
// Determinar estrategia basada en tipo y condiciones de mercado
function determineStrategy(type, params) {
    // Probabilidades base para cada estrategia según tipo de compañía
    const baseProbabilities = {
        [NPCCompanyType.STARTUP]: {
            'low_cost': 0.2,
            'high_quality': 0.2,
            'niche': 0.3,
            'balanced': 0.1,
            'aggressive': 0.2
        },
        [NPCCompanyType.CORPORATION]: {
            'low_cost': 0.3,
            'high_quality': 0.2,
            'niche': 0.1,
            'balanced': 0.3,
            'aggressive': 0.1
        },
        [NPCCompanyType.SPECIALIST]: {
            'low_cost': 0.1,
            'high_quality': 0.4,
            'niche': 0.3,
            'balanced': 0.1,
            'aggressive': 0.1
        },
        [NPCCompanyType.DISRUPTOR]: {
            'low_cost': 0.2,
            'high_quality': 0.1,
            'niche': 0.2,
            'balanced': 0.1,
            'aggressive': 0.4
        },
        [NPCCompanyType.TRADITIONAL]: {
            'low_cost': 0.2,
            'high_quality': 0.2,
            'niche': 0.1,
            'balanced': 0.4,
            'aggressive': 0.1
        }
    };
    // Ajustar probabilidades según parámetros
    let adjustedProbabilities = Object.assign({}, baseProbabilities[type]);
    // Ajuste por ciclo económico
    if (params.economicCycle === 'boom') {
        adjustedProbabilities['high_quality'] += 0.1;
        adjustedProbabilities['aggressive'] += 0.1;
        adjustedProbabilities['low_cost'] -= 0.1;
    }
    else if (params.economicCycle === 'recession') {
        adjustedProbabilities['low_cost'] += 0.2;
        adjustedProbabilities['high_quality'] -= 0.1;
    }
    // Ajuste por estatus económico regional
    if (params.regionEconomicStatus === 'wealthy') {
        adjustedProbabilities['high_quality'] += 0.1;
        adjustedProbabilities['low_cost'] -= 0.1;
    }
    else if (params.regionEconomicStatus === 'poor') {
        adjustedProbabilities['low_cost'] += 0.2;
        adjustedProbabilities['high_quality'] -= 0.1;
    }
    // Ajuste por competencia
    if (params.competitorCount > 5) {
        adjustedProbabilities['niche'] += 0.1;
        adjustedProbabilities['balanced'] -= 0.05;
    }
    else if (params.competitorCount < 2) {
        adjustedProbabilities['balanced'] += 0.1;
        adjustedProbabilities['aggressive'] += 0.05;
    }
    // Normalizar probabilidades
    const total = Object.values(adjustedProbabilities).reduce((sum, prob) => sum + prob, 0);
    Object.keys(adjustedProbabilities).forEach(key => {
        adjustedProbabilities[key] /= total;
    });
    // Selección aleatoria basada en probabilidades ajustadas
    const random = Math.random();
    let cumulativeProbability = 0;
    for (const strategy of Object.keys(adjustedProbabilities)) {
        cumulativeProbability += adjustedProbabilities[strategy];
        if (random <= cumulativeProbability) {
            return strategy;
        }
    }
    // Fallback por si acaso
    return 'balanced';
}
// Calcular capital inicial basado en tipo, dificultad y ciclo económico
function calculateInitialCash(type, params) {
    // Valores base por tipo
    const baseCash = {
        [NPCCompanyType.STARTUP]: 50000,
        [NPCCompanyType.CORPORATION]: 500000,
        [NPCCompanyType.SPECIALIST]: 150000,
        [NPCCompanyType.DISRUPTOR]: 200000,
        [NPCCompanyType.TRADITIONAL]: 100000
    };
    // Multiplicador por dificultad
    const difficultyMultiplier = {
        'easy': 0.8,
        'normal': 1.0,
        'hard': 1.5
    };
    // Multiplicador por ciclo económico
    const cycleMultiplier = {
        'boom': 1.3,
        'growth': 1.1,
        'recession': 0.7,
        'recovery': 0.9
    };
    // Multiplicador por estatus económico regional
    const regionMultiplier = {
        'poor': 0.7,
        'developing': 1.0,
        'wealthy': 1.3
    };
    // Calcular capital inicial con variación aleatoria
    const baseAmount = baseCash[type];
    const multiplier = difficultyMultiplier[params.difficulty] *
        cycleMultiplier[params.economicCycle] *
        regionMultiplier[params.regionEconomicStatus];
    // Añadir variación aleatoria de ±20%
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 a 1.2
    return Math.round(baseAmount * multiplier * randomFactor);
}
// Determinar especialización basada en demanda insatisfecha
function determineSpecialization(params) {
    // Categorías disponibles
    const allCategories = [
        productDatabase_1.ProductCategory.FOOD,
        productDatabase_1.ProductCategory.ELECTRONICS,
        productDatabase_1.ProductCategory.TEXTILES,
        productDatabase_1.ProductCategory.INDUSTRIAL,
        productDatabase_1.ProductCategory.CONSUMER_GOODS
    ];
    // Si hay una categoría específica en los parámetros, priorizarla
    let preferredCategories = [];
    if (params.productCategory) {
        preferredCategories.push(params.productCategory);
        // Añadir 0-2 categorías adicionales aleatoriamente
        const additionalCategoriesCount = Math.floor(Math.random() * 3);
        const remainingCategories = allCategories.filter(c => c !== params.productCategory);
        for (let i = 0; i < additionalCategoriesCount; i++) {
            if (remainingCategories.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingCategories.length);
                preferredCategories.push(remainingCategories[randomIndex]);
                remainingCategories.splice(randomIndex, 1);
            }
        }
    }
    else {
        // Sin categoría específica, seleccionar 1-3 categorías aleatoriamente
        const categoriesCount = 1 + Math.floor(Math.random() * 3);
        const shuffledCategories = [...allCategories].sort(() => Math.random() - 0.5);
        preferredCategories = shuffledCategories.slice(0, categoriesCount);
    }
    // Seleccionar productos con mayor demanda insatisfecha
    let preferredProducts = [];
    if (Object.keys(params.unsatisfiedDemand).length > 0) {
        // Ordenar productos por demanda insatisfecha
        const sortedProducts = Object.entries(params.unsatisfiedDemand)
            .sort(([, demandA], [, demandB]) => demandB - demandA);
        // Seleccionar hasta 5 productos con mayor demanda
        const topProducts = sortedProducts.slice(0, 5).map(([productId]) => productId);
        // Añadir productos con probabilidad basada en demanda
        topProducts.forEach(productId => {
            // Mayor demanda = mayor probabilidad de ser seleccionado
            const demand = params.unsatisfiedDemand[productId];
            const probability = Math.min(0.9, demand / 100); // Máximo 90% de probabilidad
            if (Math.random() < probability) {
                preferredProducts.push(productId);
            }
        });
    }
    // Si no se seleccionaron productos por demanda, añadir IDs genéricos por categoría
    if (preferredProducts.length === 0) {
        preferredCategories.forEach(category => {
            const categoryPrefix = category.toLowerCase();
            // Añadir IDs genéricos para cada categoría
            for (let i = 1; i <= 2; i++) {
                preferredProducts.push(`${categoryPrefix}-${i}`);
            }
        });
    }
    return {
        categories: preferredCategories,
        products: preferredProducts
    };
}
// Generar características de comportamiento basadas en tipo
function generateBehaviorTraits(type) {
    // Rangos base por tipo de compañía
    const behaviorRanges = {
        [NPCCompanyType.STARTUP]: {
            aggressiveness: [50, 90],
            riskTolerance: [60, 95],
            innovationRate: [70, 100],
            adaptability: [60, 90]
        },
        [NPCCompanyType.CORPORATION]: {
            aggressiveness: [40, 70],
            riskTolerance: [30, 60],
            innovationRate: [30, 70],
            adaptability: [20, 60]
        },
        [NPCCompanyType.SPECIALIST]: {
            aggressiveness: [30, 60],
            riskTolerance: [40, 70],
            innovationRate: [50, 80],
            adaptability: [40, 70]
        },
        [NPCCompanyType.DISRUPTOR]: {
            aggressiveness: [70, 100],
            riskTolerance: [70, 100],
            innovationRate: [80, 100],
            adaptability: [70, 90]
        },
        [NPCCompanyType.TRADITIONAL]: {
            aggressiveness: [20, 50],
            riskTolerance: [20, 40],
            innovationRate: [10, 40],
            adaptability: [10, 50]
        }
    };
    // Generar valores aleatorios dentro de los rangos
    const ranges = behaviorRanges[type];
    return {
        aggressiveness: Math.floor(ranges.aggressiveness[0] + Math.random() * (ranges.aggressiveness[1] - ranges.aggressiveness[0])),
        riskTolerance: Math.floor(ranges.riskTolerance[0] + Math.random() * (ranges.riskTolerance[1] - ranges.riskTolerance[0])),
        innovationRate: Math.floor(ranges.innovationRate[0] + Math.random() * (ranges.innovationRate[1] - ranges.innovationRate[0])),
        adaptability: Math.floor(ranges.adaptability[0] + Math.random() * (ranges.adaptability[1] - ranges.adaptability[0]))
    };
}
// Calcular margen de beneficio inicial basado en tipo y estrategia
function calculateInitialProfitMargin(type, strategy) {
    // Valores base por estrategia
    const baseMargins = {
        'low_cost': 0.05, // 5%
        'high_quality': 0.15, // 15%
        'niche': 0.20, // 20%
        'balanced': 0.10, // 10%
        'aggressive': 0.08 // 8%
    };
    // Modificadores por tipo de compañía
    const typeModifiers = {
        [NPCCompanyType.STARTUP]: -0.02, // -2%
        [NPCCompanyType.CORPORATION]: 0.03, // +3%
        [NPCCompanyType.SPECIALIST]: 0.05, // +5%
        [NPCCompanyType.DISRUPTOR]: -0.01, // -1%
        [NPCCompanyType.TRADITIONAL]: 0.02 // +2%
    };
    // Calcular margen con variación aleatoria
    const baseMargin = baseMargins[strategy];
    const typeModifier = typeModifiers[type];
    // Añadir variación aleatoria de ±2%
    const randomVariation = -0.02 + Math.random() * 0.04;
    // Asegurar que el margen sea positivo
    return Math.max(0.01, baseMargin + typeModifier + randomVariation);
}
// Calcular reputación inicial basada en tipo
function calculateInitialReputation(type) {
    // Valores base por tipo
    const baseReputations = {
        [NPCCompanyType.STARTUP]: 40,
        [NPCCompanyType.CORPORATION]: 70,
        [NPCCompanyType.SPECIALIST]: 60,
        [NPCCompanyType.DISRUPTOR]: 50,
        [NPCCompanyType.TRADITIONAL]: 65
    };
    // Añadir variación aleatoria de ±10
    const randomVariation = -10 + Math.random() * 20;
    // Asegurar que la reputación esté entre 1 y 100
    return Math.min(100, Math.max(1, Math.round(baseReputations[type] + randomVariation)));
}
// Calcular tasa de crecimiento inicial basada en tipo y parámetros
function calculateInitialGrowthRate(type, params) {
    // Valores base por tipo
    const baseGrowthRates = {
        [NPCCompanyType.STARTUP]: 0.20, // 20%
        [NPCCompanyType.CORPORATION]: 0.05, // 5%
        [NPCCompanyType.SPECIALIST]: 0.10, // 10%
        [NPCCompanyType.DISRUPTOR]: 0.25, // 25%
        [NPCCompanyType.TRADITIONAL]: 0.03 // 3%
    };
    // Modificadores por ciclo económico
    const cycleModifiers = {
        'boom': 0.10, // +10%
        'growth': 0.05, // +5%
        'recession': -0.10, // -10%
        'recovery': 0.00 // 0%
    };
    // Calcular tasa con variación aleatoria
    const baseRate = baseGrowthRates[type];
    const cycleModifier = cycleModifiers[params.economicCycle];
    // Añadir variación aleatoria de ±5%
    const randomVariation = -0.05 + Math.random() * 0.10;
    // Asegurar que la tasa sea al menos -10% (decrecimiento) y como máximo 50%
    return Math.min(0.50, Math.max(-0.10, baseRate + cycleModifier + randomVariation));
}
// Determinar estado inicial basado en tipo
function determineInitialStatus(type) {
    // Probabilidades por tipo
    const statusProbabilities = {
        [NPCCompanyType.STARTUP]: {
            'startup': 0.8,
            'growing': 0.2,
            'established': 0.0,
            'declining': 0.0,
            'struggling': 0.0
        },
        [NPCCompanyType.CORPORATION]: {
            'startup': 0.0,
            'growing': 0.3,
            'established': 0.6,
            'declining': 0.1,
            'struggling': 0.0
        },
        [NPCCompanyType.SPECIALIST]: {
            'startup': 0.1,
            'growing': 0.3,
            'established': 0.5,
            'declining': 0.1,
            'struggling': 0.0
        },
        [NPCCompanyType.DISRUPTOR]: {
            'startup': 0.4,
            'growing': 0.5,
            'established': 0.1,
            'declining': 0.0,
            'struggling': 0.0
        },
        [NPCCompanyType.TRADITIONAL]: {
            'startup': 0.0,
            'growing': 0.1,
            'established': 0.7,
            'declining': 0.1,
            'struggling': 0.1
        }
    };
    // Selección aleatoria basada en probabilidades
    const random = Math.random();
    let cumulativeProbability = 0;
    const probabilities = statusProbabilities[type];
    for (const status of Object.keys(probabilities)) {
        cumulativeProbability += probabilities[status];
        if (random <= cumulativeProbability) {
            return status;
        }
    }
    // Fallback por si acaso
    return 'established';
}
// Función principal para generar una compañía NPC
function generateNPCCompany(params) {
    // Determinar tipo de compañía basado en parámetros
    const companyType = determineCompanyType(params);
    // Generar nombre basado en tipo y categoría
    const name = generateCompanyName(companyType, params.productCategory);
    // Determinar estrategia basada en tipo y condiciones de mercado
    const strategy = determineStrategy(companyType, params);
    // Calcular capital inicial basado en tipo, dificultad y ciclo económico
    const initialCash = calculateInitialCash(companyType, params);
    // Determinar especialización basada en demanda insatisfecha
    const specialization = determineSpecialization(params);
    // Generar características de comportamiento basadas en tipo
    const behavior = generateBehaviorTraits(companyType);
    // Calcular margen de beneficio inicial
    const profitMargin = calculateInitialProfitMargin(companyType, strategy);
    // Calcular reputación inicial
    const reputation = calculateInitialReputation(companyType);
    // Calcular tasa de crecimiento inicial
    const growthRate = calculateInitialGrowthRate(companyType, params);
    // Determinar estado inicial
    const status = determineInitialStatus(companyType);
    // Crear la compañía NPC
    return {
        id: `npc-${(0, uuid_1.v4)()}`,
        name,
        type: companyType,
        strategy,
        cash: initialCash,
        assets: initialCash * 0.8,
        liabilities: initialCash * 0.2,
        profitMargin,
        reputation,
        marketShare: {},
        aggressiveness: behavior.aggressiveness,
        riskTolerance: behavior.riskTolerance,
        innovationRate: behavior.innovationRate,
        adaptability: behavior.adaptability,
        preferredCategories: specialization.categories,
        preferredProducts: specialization.products,
        preferredRegions: [params.regionId],
        buildings: [],
        contracts: [],
        age: 0,
        growthRate,
        status,
        decisionHistory: [],
        lastDecisionTime: params.gameTime,
        relationWithPlayer: 0,
        competitorRelations: {}
    };
}
// Función para determinar si se debe generar una nueva compañía NPC
function shouldGenerateNPC(gameState) {
    // Extraer datos relevantes del estado del juego
    const { time, economicCycle, difficulty } = gameState;
    const { companies, playerCompanyId, regions } = gameState.entities;
    const { products, globalDemandFactor } = gameState.economy;
    // Contar compañías NPC existentes
    const npcCompanies = Object.values(companies).filter((company) => company.id !== playerCompanyId);
    const npcCount = npcCompanies.length;
    // Calcular demanda insatisfecha total
    let totalUnsatisfiedDemand = 0;
    Object.values(products).forEach((product) => {
        if (product.demand > product.supply) {
            totalUnsatisfiedDemand += (product.demand - product.supply);
        }
    });
    // Factores que aumentan la probabilidad de generación
    const factorsForGeneration = [
        // Pocas compañías NPC
        npcCount < 5 ? (5 - npcCount) * 0.1 : 0,
        // Alta demanda insatisfecha
        totalUnsatisfiedDemand > 100 ? Math.min(0.3, totalUnsatisfiedDemand / 1000) : 0,
        // Ciclo económico favorable
        economicCycle === 'boom' ? 0.2 :
            economicCycle === 'growth' ? 0.1 : 0,
        // Demanda global alta
        globalDemandFactor > 1.2 ? 0.15 : 0,
        // Tiempo de juego (más probable con el tiempo)
        Math.min(0.2, time.year / 20)
    ];
    // Calcular probabilidad base
    const baseProbability = 0.05; // 5% de probabilidad base por día de juego
    // Sumar factores
    const additionalProbability = factorsForGeneration.reduce((sum, factor) => sum + factor, 0);
    // Ajustar por dificultad
    const difficultyMultiplier = difficulty === 'easy' ? 0.7 :
        difficulty === 'hard' ? 1.3 : 1.0;
    // Calcular probabilidad final
    const finalProbability = (baseProbability + additionalProbability) * difficultyMultiplier;
    // Limitar a un máximo de 50% de probabilidad
    const cappedProbability = Math.min(0.5, finalProbability);
    // Decisión aleatoria basada en probabilidad
    return Math.random() < cappedProbability;
}
// Función para generar parámetros de generación a partir del estado del juego
function generateParamsFromGameState(gameState) {
    // Extraer datos relevantes del estado del juego
    const { time, difficulty } = gameState;
    const { companies, playerCompanyId, regions, locations } = gameState.entities;
    const { products, globalDemandFactor, globalSupplyFactor } = gameState.economy;
    // Contar compañías NPC existentes
    const npcCompanies = Object.values(companies).filter((company) => company.id !== playerCompanyId);
    const competitorCount = npcCompanies.length;
    // Calcular cuota de mercado del jugador (simplificado)
    const playerCompany = companies[playerCompanyId];
    let playerMarketShare = 0;
    if (playerCompany) {
        // Promedio de cuotas de mercado en diferentes productos
        const marketShares = Object.values(playerCompany.marketShare || {});
        if (marketShares.length > 0) {
            playerMarketShare = marketShares.reduce((sum, share) => sum + share, 0) / marketShares.length;
        }
    }
    // Calcular demanda insatisfecha por producto
    const unsatisfiedDemand = {};
    Object.entries(products).forEach(([productId, product]) => {
        if (product.demand > product.supply) {
            unsatisfiedDemand[productId] = product.demand - product.supply;
        }
    });
    // Determinar ciclo económico basado en factores del juego
    let economicCycle;
    if (globalDemandFactor > 1.2 && globalSupplyFactor < 1.0) {
        economicCycle = 'boom';
    }
    else if (globalDemandFactor > 1.0) {
        economicCycle = 'growth';
    }
    else if (globalDemandFactor < 0.8) {
        economicCycle = 'recession';
    }
    else {
        economicCycle = 'recovery';
    }
    // Seleccionar una región aleatoria
    const regionsList = Object.values(regions);
    const randomRegion = regionsList[Math.floor(Math.random() * regionsList.length)];
    const regionId = randomRegion.id;
    // Determinar estatus económico de la región
    let regionEconomicStatus;
    const regionWealthLevel = randomRegion.wealthLevel || 50;
    if (regionWealthLevel < 40) {
        regionEconomicStatus = 'poor';
    }
    else if (regionWealthLevel > 70) {
        regionEconomicStatus = 'wealthy';
    }
    else {
        regionEconomicStatus = 'developing';
    }
    // Seleccionar categoría de producto con mayor demanda insatisfecha (opcional)
    let productCategory;
    let productTrend;
    if (Object.keys(unsatisfiedDemand).length > 0) {
        // Encontrar el producto con mayor demanda insatisfecha
        const topProductId = Object.entries(unsatisfiedDemand)
            .sort(([, demandA], [, demandB]) => demandB - demandA)[0][0];
        const topProduct = products[topProductId];
        if (topProduct) {
            productCategory = topProduct.category;
            productTrend = topProduct.basePrice.trend;
        }
    }
    // Calcular tamaño de mercado (simplificado)
    const marketSize = Object.values(products).reduce((sum, product) => sum + (product.demand * product.basePrice.current), 0);
    return {
        marketSize,
        unsatisfiedDemand,
        competitorCount,
        playerMarketShare,
        gameTime: time.timestamp,
        economicCycle,
        regionId,
        regionEconomicStatus,
        productCategory,
        productTrend,
        difficulty
    };
}
// Función principal para el sistema de generación dinámica de NPCs
function processDynamicNPCGeneration(gameState) {
    // Verificar si se debe generar una nueva compañía NPC
    if (!shouldGenerateNPC(gameState)) {
        return null;
    }
    // Generar parámetros a partir del estado del juego
    const params = generateParamsFromGameState(gameState);
    // Generar la compañía NPC
    const newCompany = generateNPCCompany(params);
    return newCompany;
}
