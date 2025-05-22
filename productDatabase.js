"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketSegment = exports.ProductCategory = void 0;
exports.generateProductsDatabase = generateProductsDatabase;
// Enumeraciones
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["FOOD"] = "food";
    ProductCategory["ELECTRONICS"] = "electronics";
    ProductCategory["TEXTILES"] = "textiles";
    ProductCategory["INDUSTRIAL"] = "industrial";
    ProductCategory["CONSUMER_GOODS"] = "consumer_goods";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
var MarketSegment;
(function (MarketSegment) {
    MarketSegment["BUDGET"] = "budget";
    MarketSegment["MAINSTREAM"] = "mainstream";
    MarketSegment["PREMIUM"] = "premium";
    MarketSegment["LUXURY"] = "luxury";
    MarketSegment["SPECIALIZED"] = "specialized";
})(MarketSegment || (exports.MarketSegment = MarketSegment = {}));
// Generador de productos
function generateProductsDatabase() {
    const products = {};
    // Añadir productos de alimentos
    const foodProducts = generateFoodProducts();
    foodProducts.forEach(product => {
        products[product.id] = product;
    });
    // Añadir productos electrónicos
    const electronicsProducts = generateElectronicsProducts();
    electronicsProducts.forEach(product => {
        products[product.id] = product;
    });
    // Añadir productos textiles
    const textileProducts = generateTextileProducts();
    textileProducts.forEach(product => {
        products[product.id] = product;
    });
    // Añadir productos industriales
    const industrialProducts = generateIndustrialProducts();
    industrialProducts.forEach(product => {
        products[product.id] = product;
    });
    // Añadir productos de consumo
    const consumerProducts = generateConsumerProducts();
    consumerProducts.forEach(product => {
        products[product.id] = product;
    });
    return products;
}
// Generadores específicos por categoría
function generateFoodProducts() {
    return [
        {
            id: 'food-basic-1',
            name: 'Alimentos Básicos',
            description: 'Productos alimenticios esenciales para el consumo diario.',
            category: ProductCategory.FOOD,
            subcategory: 'básicos',
            basePrice: {
                min: 10,
                max: 30,
                current: 15,
                trend: 'stable'
            },
            productionComplexity: 20,
            resourceRequirements: [
                { resourceId: 'resource-agricultural-1', amount: 2, isOptional: false },
                { resourceId: 'resource-water-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 12,
            qualityRange: { min: 30, max: 80 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 10,
            necessityFactor: 90,
            durability: 30,
            sustainability: 60,
            innovationLevel: 20,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.2 },
                { month: 12, demandModifier: 1.5 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 90
            },
            icon: 'food_basic_icon',
            demand: 100,
            supply: 80
        },
        {
            id: 'food-processed-1',
            name: 'Alimentos Procesados',
            description: 'Alimentos transformados con mayor vida útil y facilidad de preparación.',
            category: ProductCategory.FOOD,
            subcategory: 'procesados',
            basePrice: {
                min: 15,
                max: 40,
                current: 25,
                trend: 'rising'
            },
            productionComplexity: 40,
            resourceRequirements: [
                { resourceId: 'resource-agricultural-1', amount: 1, isOptional: false },
                { resourceId: 'resource-chemical-1', amount: 1, isOptional: false },
                { resourceId: 'resource-packaging-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 18,
            qualityRange: { min: 20, max: 70 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 20,
            necessityFactor: 70,
            durability: 60,
            sustainability: 40,
            innovationLevel: 30,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.2 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 120
            },
            icon: 'food_processed_icon',
            demand: 80,
            supply: 70
        },
        {
            id: 'food-gourmet-1',
            name: 'Productos Gourmet',
            description: 'Alimentos de alta calidad para paladares exigentes.',
            category: ProductCategory.FOOD,
            subcategory: 'gourmet',
            basePrice: {
                min: 40,
                max: 120,
                current: 70,
                trend: 'rising'
            },
            productionComplexity: 70,
            resourceRequirements: [
                { resourceId: 'resource-agricultural-premium-1', amount: 2, isOptional: false },
                { resourceId: 'resource-spices-1', amount: 1, isOptional: false },
                { resourceId: 'resource-packaging-premium-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 24,
            qualityRange: { min: 70, max: 100 },
            targetMarketSegment: MarketSegment.LUXURY,
            luxuryFactor: 80,
            necessityFactor: 20,
            durability: 40,
            sustainability: 70,
            innovationLevel: 60,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 0.9 },
                { month: 12, demandModifier: 1.8 }
            ],
            trendCycle: {
                currentPhase: 'emerging',
                phaseStartTime: Date.now(),
                phaseDuration: 150
            },
            icon: 'food_gourmet_icon',
            demand: 40,
            supply: 30
        },
        {
            id: 'food-beverage-1',
            name: 'Bebidas Refrescantes',
            description: 'Bebidas para satisfacer la sed y disfrutar en cualquier momento.',
            category: ProductCategory.FOOD,
            subcategory: 'bebidas',
            basePrice: {
                min: 8,
                max: 25,
                current: 12,
                trend: 'stable'
            },
            productionComplexity: 30,
            resourceRequirements: [
                { resourceId: 'resource-water-1', amount: 2, isOptional: false },
                { resourceId: 'resource-flavoring-1', amount: 1, isOptional: false },
                { resourceId: 'resource-packaging-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 10,
            qualityRange: { min: 40, max: 90 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 30,
            necessityFactor: 60,
            durability: 90,
            sustainability: 50,
            innovationLevel: 40,
            seasonality: [
                { month: 1, demandModifier: 0.7 },
                { month: 6, demandModifier: 1.5 },
                { month: 12, demandModifier: 0.8 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 100
            },
            icon: 'food_beverage_icon',
            demand: 120,
            supply: 100
        },
        {
            id: 'food-organic-1',
            name: 'Alimentos Orgánicos',
            description: 'Productos cultivados sin pesticidas ni químicos artificiales.',
            category: ProductCategory.FOOD,
            subcategory: 'orgánicos',
            basePrice: {
                min: 25,
                max: 60,
                current: 40,
                trend: 'rising'
            },
            productionComplexity: 50,
            resourceRequirements: [
                { resourceId: 'resource-agricultural-organic-1', amount: 3, isOptional: false },
                { resourceId: 'resource-packaging-eco-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 20,
            qualityRange: { min: 60, max: 95 },
            targetMarketSegment: MarketSegment.PREMIUM,
            luxuryFactor: 60,
            necessityFactor: 40,
            durability: 25,
            sustainability: 90,
            innovationLevel: 70,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 1.1 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 180
            },
            icon: 'food_organic_icon',
            demand: 60,
            supply: 40
        }
    ];
}
function generateElectronicsProducts() {
    return [
        {
            id: 'electronics-basic-1',
            name: 'Electrónica Básica',
            description: 'Dispositivos electrónicos simples para uso cotidiano.',
            category: ProductCategory.ELECTRONICS,
            subcategory: 'básica',
            basePrice: {
                min: 30,
                max: 80,
                current: 50,
                trend: 'stable'
            },
            productionComplexity: 50,
            resourceRequirements: [
                { resourceId: 'resource-plastic-1', amount: 1, isOptional: false },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-electronic-components-1', amount: 2, isOptional: false }
            ],
            baseProductionTime: 24,
            qualityRange: { min: 40, max: 80 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 40,
            necessityFactor: 60,
            durability: 70,
            sustainability: 50,
            innovationLevel: 60,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 0.9 },
                { month: 12, demandModifier: 1.5 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 120
            },
            icon: 'electronics_basic_icon',
            demand: 90,
            supply: 80
        },
        {
            id: 'electronics-advanced-1',
            name: 'Electrónica Avanzada',
            description: 'Dispositivos electrónicos sofisticados con tecnología de punta.',
            category: ProductCategory.ELECTRONICS,
            subcategory: 'avanzada',
            basePrice: {
                min: 100,
                max: 300,
                current: 180,
                trend: 'rising'
            },
            productionComplexity: 80,
            resourceRequirements: [
                { resourceId: 'resource-plastic-premium-1', amount: 1, isOptional: false },
                { resourceId: 'resource-metal-premium-1', amount: 2, isOptional: false },
                { resourceId: 'resource-electronic-components-advanced-1', amount: 3, isOptional: false },
                { resourceId: 'resource-rare-materials-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 48,
            qualityRange: { min: 60, max: 100 },
            targetMarketSegment: MarketSegment.PREMIUM,
            luxuryFactor: 70,
            necessityFactor: 40,
            durability: 80,
            sustainability: 60,
            innovationLevel: 90,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 0.8 },
                { month: 12, demandModifier: 1.4 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 180
            },
            icon: 'electronics_advanced_icon',
            demand: 60,
            supply: 50
        },
        {
            id: 'electronics-components-1',
            name: 'Componentes Electrónicos',
            description: 'Piezas y componentes para la fabricación de dispositivos electrónicos.',
            category: ProductCategory.ELECTRONICS,
            subcategory: 'componentes',
            basePrice: {
                min: 20,
                max: 60,
                current: 35,
                trend: 'stable'
            },
            productionComplexity: 60,
            resourceRequirements: [
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-silicon-1', amount: 2, isOptional: false },
                { resourceId: 'resource-chemical-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 20,
            qualityRange: { min: 50, max: 95 },
            targetMarketSegment: MarketSegment.SPECIALIZED,
            luxuryFactor: 20,
            necessityFactor: 30,
            durability: 90,
            sustainability: 70,
            innovationLevel: 80,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 150
            },
            icon: 'electronics_components_icon',
            demand: 100,
            supply: 90
        },
        {
            id: 'electronics-communication-1',
            name: 'Dispositivos de Comunicación',
            description: 'Equipos para comunicación personal y profesional.',
            category: ProductCategory.ELECTRONICS,
            subcategory: 'comunicación',
            basePrice: {
                min: 80,
                max: 250,
                current: 150,
                trend: 'rising'
            },
            productionComplexity: 70,
            resourceRequirements: [
                { resourceId: 'resource-plastic-1', amount: 1, isOptional: false },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-electronic-components-1', amount: 2, isOptional: false },
                { resourceId: 'resource-electronic-components-advanced-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 36,
            qualityRange: { min: 50, max: 95 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 60,
            necessityFactor: 70,
            durability: 75,
            sustainability: 55,
            innovationLevel: 85,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 0.9 },
                { month: 12, demandModifier: 1.3 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 160
            },
            icon: 'electronics_communication_icon',
            demand: 85,
            supply: 75
        },
        {
            id: 'electronics-computing-1',
            name: 'Equipos Informáticos',
            description: 'Ordenadores y equipos para procesamiento de datos.',
            category: ProductCategory.ELECTRONICS,
            subcategory: 'informática',
            basePrice: {
                min: 200,
                max: 800,
                current: 450,
                trend: 'stable'
            },
            productionComplexity: 85,
            resourceRequirements: [
                { resourceId: 'resource-plastic-premium-1', amount: 2, isOptional: false },
                { resourceId: 'resource-metal-premium-1', amount: 2, isOptional: false },
                { resourceId: 'resource-electronic-components-advanced-1', amount: 4, isOptional: false },
                { resourceId: 'resource-rare-materials-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 60,
            qualityRange: { min: 60, max: 100 },
            targetMarketSegment: MarketSegment.PREMIUM,
            luxuryFactor: 65,
            necessityFactor: 50,
            durability: 85,
            sustainability: 65,
            innovationLevel: 95,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 0.8 },
                { month: 12, demandModifier: 1.2 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 200
            },
            icon: 'electronics_computing_icon',
            demand: 70,
            supply: 60
        }
    ];
}
function generateTextileProducts() {
    return [
        {
            id: 'textiles-clothing-1',
            name: 'Ropa Básica',
            description: 'Prendas de vestir esenciales para uso diario.',
            category: ProductCategory.TEXTILES,
            subcategory: 'ropa',
            basePrice: {
                min: 15,
                max: 40,
                current: 25,
                trend: 'stable'
            },
            productionComplexity: 30,
            resourceRequirements: [
                { resourceId: 'resource-fabric-1', amount: 2, isOptional: false },
                { resourceId: 'resource-thread-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 16,
            qualityRange: { min: 30, max: 70 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 20,
            necessityFactor: 80,
            durability: 60,
            sustainability: 50,
            innovationLevel: 30,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.2 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 90
            },
            icon: 'textiles_clothing_icon',
            demand: 110,
            supply: 100
        },
        {
            id: 'textiles-luxury-1',
            name: 'Ropa de Lujo',
            description: 'Prendas de alta costura con materiales premium y diseño exclusivo.',
            category: ProductCategory.TEXTILES,
            subcategory: 'lujo',
            basePrice: {
                min: 100,
                max: 500,
                current: 250,
                trend: 'rising'
            },
            productionComplexity: 70,
            resourceRequirements: [
                { resourceId: 'resource-fabric-premium-1', amount: 3, isOptional: false },
                { resourceId: 'resource-thread-premium-1', amount: 2, isOptional: false },
                { resourceId: 'resource-accessories-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 40,
            qualityRange: { min: 80, max: 100 },
            targetMarketSegment: MarketSegment.LUXURY,
            luxuryFactor: 90,
            necessityFactor: 10,
            durability: 80,
            sustainability: 60,
            innovationLevel: 80,
            seasonality: [
                { month: 1, demandModifier: 0.8 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.5 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 120
            },
            icon: 'textiles_luxury_icon',
            demand: 40,
            supply: 30
        },
        {
            id: 'textiles-industrial-1',
            name: 'Textiles Industriales',
            description: 'Materiales textiles para uso industrial y técnico.',
            category: ProductCategory.TEXTILES,
            subcategory: 'industrial',
            basePrice: {
                min: 40,
                max: 120,
                current: 70,
                trend: 'stable'
            },
            productionComplexity: 60,
            resourceRequirements: [
                { resourceId: 'resource-fabric-industrial-1', amount: 3, isOptional: false },
                { resourceId: 'resource-chemical-1', amount: 1, isOptional: false },
                { resourceId: 'resource-synthetic-1', amount: 2, isOptional: false }
            ],
            baseProductionTime: 30,
            qualityRange: { min: 60, max: 90 },
            targetMarketSegment: MarketSegment.SPECIALIZED,
            luxuryFactor: 10,
            necessityFactor: 40,
            durability: 90,
            sustainability: 40,
            innovationLevel: 70,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 180
            },
            icon: 'textiles_industrial_icon',
            demand: 60,
            supply: 55
        },
        {
            id: 'textiles-footwear-1',
            name: 'Calzado',
            description: 'Zapatos y botas para diferentes usos y estilos.',
            category: ProductCategory.TEXTILES,
            subcategory: 'calzado',
            basePrice: {
                min: 30,
                max: 120,
                current: 60,
                trend: 'stable'
            },
            productionComplexity: 50,
            resourceRequirements: [
                { resourceId: 'resource-leather-1', amount: 2, isOptional: false },
                { resourceId: 'resource-rubber-1', amount: 1, isOptional: false },
                { resourceId: 'resource-thread-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 24,
            qualityRange: { min: 40, max: 90 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 50,
            necessityFactor: 70,
            durability: 75,
            sustainability: 55,
            innovationLevel: 50,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.3 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 150
            },
            icon: 'textiles_footwear_icon',
            demand: 90,
            supply: 80
        },
        {
            id: 'textiles-accessories-1',
            name: 'Accesorios de Moda',
            description: 'Complementos para vestimenta como bolsos, cinturones y joyería.',
            category: ProductCategory.TEXTILES,
            subcategory: 'accesorios',
            basePrice: {
                min: 20,
                max: 150,
                current: 45,
                trend: 'rising'
            },
            productionComplexity: 40,
            resourceRequirements: [
                { resourceId: 'resource-leather-1', amount: 1, isOptional: false },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-fabric-1', amount: 1, isOptional: true }
            ],
            baseProductionTime: 20,
            qualityRange: { min: 50, max: 95 },
            targetMarketSegment: MarketSegment.PREMIUM,
            luxuryFactor: 70,
            necessityFactor: 30,
            durability: 70,
            sustainability: 60,
            innovationLevel: 75,
            seasonality: [
                { month: 1, demandModifier: 0.8 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.6 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 100
            },
            icon: 'textiles_accessories_icon',
            demand: 70,
            supply: 60
        }
    ];
}
function generateIndustrialProducts() {
    return [
        {
            id: 'industrial-construction-1',
            name: 'Materiales de Construcción',
            description: 'Materiales básicos para la construcción de edificios e infraestructuras.',
            category: ProductCategory.INDUSTRIAL,
            subcategory: 'construcción',
            basePrice: {
                min: 50,
                max: 150,
                current: 80,
                trend: 'stable'
            },
            productionComplexity: 40,
            resourceRequirements: [
                { resourceId: 'resource-stone-1', amount: 3, isOptional: false },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-wood-1', amount: 2, isOptional: false }
            ],
            baseProductionTime: 24,
            qualityRange: { min: 40, max: 80 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 10,
            necessityFactor: 60,
            durability: 90,
            sustainability: 50,
            innovationLevel: 40,
            seasonality: [
                { month: 1, demandModifier: 0.7 },
                { month: 6, demandModifier: 1.3 },
                { month: 12, demandModifier: 0.8 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 200
            },
            icon: 'industrial_construction_icon',
            demand: 100,
            supply: 90
        },
        {
            id: 'industrial-machinery-1',
            name: 'Maquinaria Industrial',
            description: 'Equipos y maquinaria para procesos industriales.',
            category: ProductCategory.INDUSTRIAL,
            subcategory: 'maquinaria',
            basePrice: {
                min: 200,
                max: 1000,
                current: 500,
                trend: 'stable'
            },
            productionComplexity: 80,
            resourceRequirements: [
                { resourceId: 'resource-metal-premium-1', amount: 4, isOptional: false },
                { resourceId: 'resource-electronic-components-1', amount: 2, isOptional: false },
                { resourceId: 'resource-plastic-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 72,
            qualityRange: { min: 60, max: 95 },
            targetMarketSegment: MarketSegment.SPECIALIZED,
            luxuryFactor: 20,
            necessityFactor: 50,
            durability: 85,
            sustainability: 60,
            innovationLevel: 75,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 300
            },
            icon: 'industrial_machinery_icon',
            demand: 50,
            supply: 45
        },
        {
            id: 'industrial-tools-1',
            name: 'Herramientas',
            description: 'Herramientas manuales y eléctricas para uso profesional.',
            category: ProductCategory.INDUSTRIAL,
            subcategory: 'herramientas',
            basePrice: {
                min: 30,
                max: 150,
                current: 70,
                trend: 'rising'
            },
            productionComplexity: 50,
            resourceRequirements: [
                { resourceId: 'resource-metal-1', amount: 2, isOptional: false },
                { resourceId: 'resource-plastic-1', amount: 1, isOptional: false },
                { resourceId: 'resource-rubber-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 30,
            qualityRange: { min: 50, max: 90 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 30,
            necessityFactor: 70,
            durability: 80,
            sustainability: 65,
            innovationLevel: 60,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 1.1 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 180
            },
            icon: 'industrial_tools_icon',
            demand: 80,
            supply: 70
        },
        {
            id: 'industrial-chemicals-1',
            name: 'Productos Químicos Industriales',
            description: 'Sustancias químicas para procesos industriales y manufactura.',
            category: ProductCategory.INDUSTRIAL,
            subcategory: 'químicos',
            basePrice: {
                min: 60,
                max: 200,
                current: 120,
                trend: 'stable'
            },
            productionComplexity: 70,
            resourceRequirements: [
                { resourceId: 'resource-chemical-base-1', amount: 3, isOptional: false },
                { resourceId: 'resource-water-1', amount: 2, isOptional: false },
                { resourceId: 'resource-mineral-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 36,
            qualityRange: { min: 60, max: 90 },
            targetMarketSegment: MarketSegment.SPECIALIZED,
            luxuryFactor: 10,
            necessityFactor: 40,
            durability: 70,
            sustainability: 30,
            innovationLevel: 70,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 240
            },
            icon: 'industrial_chemicals_icon',
            demand: 70,
            supply: 65
        },
        {
            id: 'industrial-equipment-1',
            name: 'Equipamiento Especializado',
            description: 'Equipos técnicos para industrias específicas.',
            category: ProductCategory.INDUSTRIAL,
            subcategory: 'equipamiento',
            basePrice: {
                min: 300,
                max: 1500,
                current: 800,
                trend: 'rising'
            },
            productionComplexity: 90,
            resourceRequirements: [
                { resourceId: 'resource-metal-premium-1', amount: 3, isOptional: false },
                { resourceId: 'resource-electronic-components-advanced-1', amount: 3, isOptional: false },
                { resourceId: 'resource-rare-materials-1', amount: 1, isOptional: false },
                { resourceId: 'resource-plastic-premium-1', amount: 2, isOptional: false }
            ],
            baseProductionTime: 96,
            qualityRange: { min: 70, max: 100 },
            targetMarketSegment: MarketSegment.SPECIALIZED,
            luxuryFactor: 30,
            necessityFactor: 60,
            durability: 90,
            sustainability: 70,
            innovationLevel: 90,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.0 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 360
            },
            icon: 'industrial_equipment_icon',
            demand: 40,
            supply: 30
        }
    ];
}
function generateConsumerProducts() {
    return [
        {
            id: 'consumer-household-1',
            name: 'Artículos para el Hogar',
            description: 'Productos esenciales para el mantenimiento y decoración del hogar.',
            category: ProductCategory.CONSUMER_GOODS,
            subcategory: 'hogar',
            basePrice: {
                min: 20,
                max: 80,
                current: 40,
                trend: 'stable'
            },
            productionComplexity: 40,
            resourceRequirements: [
                { resourceId: 'resource-plastic-1', amount: 2, isOptional: false },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: false },
                { resourceId: 'resource-fabric-1', amount: 1, isOptional: true }
            ],
            baseProductionTime: 20,
            qualityRange: { min: 40, max: 85 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 30,
            necessityFactor: 70,
            durability: 75,
            sustainability: 60,
            innovationLevel: 50,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.1 },
                { month: 12, demandModifier: 1.2 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 150
            },
            icon: 'consumer_household_icon',
            demand: 90,
            supply: 80
        },
        {
            id: 'consumer-personal-care-1',
            name: 'Productos de Cuidado Personal',
            description: 'Artículos para la higiene y el cuidado personal.',
            category: ProductCategory.CONSUMER_GOODS,
            subcategory: 'cuidado personal',
            basePrice: {
                min: 10,
                max: 50,
                current: 25,
                trend: 'rising'
            },
            productionComplexity: 30,
            resourceRequirements: [
                { resourceId: 'resource-chemical-1', amount: 1, isOptional: false },
                { resourceId: 'resource-water-1', amount: 1, isOptional: false },
                { resourceId: 'resource-packaging-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 12,
            qualityRange: { min: 30, max: 90 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 40,
            necessityFactor: 80,
            durability: 60,
            sustainability: 50,
            innovationLevel: 60,
            seasonality: [
                { month: 1, demandModifier: 1.0 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.1 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 120
            },
            icon: 'consumer_personal_care_icon',
            demand: 110,
            supply: 100
        },
        {
            id: 'consumer-toys-1',
            name: 'Juguetes y Entretenimiento',
            description: 'Productos para el ocio y entretenimiento.',
            category: ProductCategory.CONSUMER_GOODS,
            subcategory: 'entretenimiento',
            basePrice: {
                min: 15,
                max: 100,
                current: 35,
                trend: 'stable'
            },
            productionComplexity: 50,
            resourceRequirements: [
                { resourceId: 'resource-plastic-1', amount: 2, isOptional: false },
                { resourceId: 'resource-fabric-1', amount: 1, isOptional: true },
                { resourceId: 'resource-electronic-components-1', amount: 1, isOptional: true }
            ],
            baseProductionTime: 24,
            qualityRange: { min: 40, max: 90 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 50,
            necessityFactor: 30,
            durability: 70,
            sustainability: 55,
            innovationLevel: 75,
            seasonality: [
                { month: 1, demandModifier: 0.8 },
                { month: 6, demandModifier: 0.9 },
                { month: 12, demandModifier: 2.0 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 180
            },
            icon: 'consumer_toys_icon',
            demand: 80,
            supply: 70
        },
        {
            id: 'consumer-furniture-1',
            name: 'Muebles',
            description: 'Mobiliario para el hogar y oficina.',
            category: ProductCategory.CONSUMER_GOODS,
            subcategory: 'muebles',
            basePrice: {
                min: 100,
                max: 500,
                current: 250,
                trend: 'stable'
            },
            productionComplexity: 60,
            resourceRequirements: [
                { resourceId: 'resource-wood-1', amount: 3, isOptional: false },
                { resourceId: 'resource-fabric-1', amount: 1, isOptional: true },
                { resourceId: 'resource-metal-1', amount: 1, isOptional: true }
            ],
            baseProductionTime: 48,
            qualityRange: { min: 50, max: 95 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 60,
            necessityFactor: 50,
            durability: 85,
            sustainability: 70,
            innovationLevel: 55,
            seasonality: [
                { month: 1, demandModifier: 0.9 },
                { month: 6, demandModifier: 1.0 },
                { month: 12, demandModifier: 1.1 }
            ],
            trendCycle: {
                currentPhase: 'mature',
                phaseStartTime: Date.now(),
                phaseDuration: 240
            },
            icon: 'consumer_furniture_icon',
            demand: 60,
            supply: 50
        },
        {
            id: 'consumer-sports-1',
            name: 'Artículos Deportivos',
            description: 'Equipamiento y accesorios para actividades deportivas.',
            category: ProductCategory.CONSUMER_GOODS,
            subcategory: 'deportes',
            basePrice: {
                min: 30,
                max: 200,
                current: 80,
                trend: 'rising'
            },
            productionComplexity: 55,
            resourceRequirements: [
                { resourceId: 'resource-plastic-1', amount: 1, isOptional: false },
                { resourceId: 'resource-fabric-1', amount: 2, isOptional: false },
                { resourceId: 'resource-rubber-1', amount: 1, isOptional: false }
            ],
            baseProductionTime: 30,
            qualityRange: { min: 50, max: 95 },
            targetMarketSegment: MarketSegment.MAINSTREAM,
            luxuryFactor: 50,
            necessityFactor: 40,
            durability: 80,
            sustainability: 65,
            innovationLevel: 70,
            seasonality: [
                { month: 1, demandModifier: 1.2 },
                { month: 6, demandModifier: 1.5 },
                { month: 12, demandModifier: 0.8 }
            ],
            trendCycle: {
                currentPhase: 'growing',
                phaseStartTime: Date.now(),
                phaseDuration: 150
            },
            icon: 'consumer_sports_icon',
            demand: 75,
            supply: 65
        }
    ];
}
