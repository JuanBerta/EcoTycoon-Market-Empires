"use strict";
// Sistema económico básico - Funciones de cálculo
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInitialEconomicData = exports.simulateMarketFluctuations = exports.calculateDemand = exports.calculatePrice = void 0;
// Constantes para el sistema económico
const MIN_PRICE_FACTOR = 0.5; // Factor mínimo para el precio base
const MAX_PRICE_FACTOR = 2.0; // Factor máximo para el precio base
const DEMAND_IMPACT = 0.01; // Impacto de la demanda en el precio (por punto de demanda)
const SUPPLY_IMPACT = 0.01; // Impacto de la oferta en el precio (por punto de oferta)
const RANDOM_FACTOR = 0.05; // Factor aleatorio máximo para fluctuaciones
/**
 * Calcula el precio actual de un producto basado en oferta, demanda y otros factores
 * @param basePrice Precio base del producto
 * @param demand Demanda actual (0-100)
 * @param supply Oferta actual (0-100)
 * @param globalDemandFactor Factor global de demanda
 * @param globalSupplyFactor Factor global de oferta
 * @param inflationRate Tasa de inflación
 * @returns Precio calculado
 */
const calculatePrice = (basePrice, demand, supply, globalDemandFactor = 1.0, globalSupplyFactor = 1.0, inflationRate = 0.0) => {
    // Normalizar demanda y oferta (0-100)
    const normalizedDemand = Math.max(0, Math.min(100, demand));
    const normalizedSupply = Math.max(0, Math.min(100, supply));
    // Calcular factor de demanda-oferta
    // Cuando la demanda > oferta, el precio sube
    // Cuando la oferta > demanda, el precio baja
    const demandSupplyRatio = (normalizedDemand * globalDemandFactor) /
        (normalizedSupply * globalSupplyFactor || 1);
    // Calcular factor de precio basado en la relación demanda/oferta
    let priceFactor = 1.0;
    if (demandSupplyRatio > 1) {
        // Alta demanda, precio sube
        priceFactor = 1.0 + (demandSupplyRatio - 1) * DEMAND_IMPACT * 10;
    }
    else if (demandSupplyRatio < 1) {
        // Alta oferta, precio baja
        priceFactor = 1.0 - (1 - demandSupplyRatio) * SUPPLY_IMPACT * 5;
    }
    // Limitar el factor de precio
    priceFactor = Math.max(MIN_PRICE_FACTOR, Math.min(MAX_PRICE_FACTOR, priceFactor));
    // Aplicar inflación
    const inflationFactor = 1.0 + inflationRate;
    // Añadir pequeña fluctuación aleatoria
    const randomFluctuation = 1.0 + (Math.random() * 2 - 1) * RANDOM_FACTOR;
    // Calcular precio final
    const finalPrice = basePrice * priceFactor * inflationFactor * randomFluctuation;
    // Redondear a 2 decimales
    return Math.round(finalPrice * 100) / 100;
};
exports.calculatePrice = calculatePrice;
/**
 * Calcula la demanda de un producto basada en varios factores
 * @param baseDemand Demanda base del producto
 * @param population Población de la ubicación
 * @param wealthLevel Nivel de riqueza de la ubicación (0-100)
 * @param productQuality Calidad del producto (0-100)
 * @param price Precio actual
 * @param competitorPrices Precios de competidores
 * @returns Demanda calculada (0-100)
 */
const calculateDemand = (baseDemand, population, wealthLevel, productQuality, price, competitorPrices = []) => {
    // Normalizar valores
    const normalizedWealthLevel = Math.max(0, Math.min(100, wealthLevel));
    const normalizedQuality = Math.max(0, Math.min(100, productQuality));
    // Calcular precio promedio de competidores
    const avgCompetitorPrice = competitorPrices.length > 0
        ? competitorPrices.reduce((sum, p) => sum + p, 0) / competitorPrices.length
        : price;
    // Factor de precio relativo (menor precio = mayor demanda)
    const priceFactor = avgCompetitorPrice > 0
        ? Math.min(2.0, avgCompetitorPrice / price)
        : 1.0;
    // Factor de calidad (mayor calidad = mayor demanda)
    const qualityFactor = 0.5 + (normalizedQuality / 100) * 0.5;
    // Factor de riqueza (ajusta la sensibilidad al precio vs calidad)
    // Con mayor riqueza, la calidad importa más que el precio
    const wealthFactor = normalizedWealthLevel / 100;
    // Población normalizada (para evitar valores extremos)
    const populationFactor = Math.min(2.0, 1.0 + (Math.log10(population) / 5));
    // Calcular demanda combinando factores
    let demand = baseDemand;
    // Ajustar por precio y calidad, ponderados por riqueza
    demand *= (priceFactor * (1 - wealthFactor) + qualityFactor * wealthFactor);
    // Ajustar por población
    demand *= populationFactor;
    // Añadir pequeña variación aleatoria
    demand *= (1 + (Math.random() * 0.2 - 0.1));
    // Limitar a rango 0-100
    return Math.max(0, Math.min(100, demand));
};
exports.calculateDemand = calculateDemand;
/**
 * Simula fluctuaciones de mercado para productos
 * @param products Lista de productos con precios, demanda y oferta
 * @param globalDemandFactor Factor global de demanda
 * @param globalSupplyFactor Factor global de oferta
 * @param inflationRate Tasa de inflación
 * @returns Productos actualizados con nuevos precios
 */
const simulateMarketFluctuations = (products, globalDemandFactor = 1.0, globalSupplyFactor = 1.0, inflationRate = 0.0) => {
    return products.map(product => {
        const oldPrice = product.currentPrice;
        const newPrice = (0, exports.calculatePrice)(product.basePrice, product.demand, product.supply, globalDemandFactor, globalSupplyFactor, inflationRate);
        const priceChange = newPrice - oldPrice;
        const percentChange = oldPrice > 0 ? (priceChange / oldPrice) * 100 : 0;
        // Determinar tendencia
        let trend = 'stable';
        if (percentChange > 1) {
            trend = 'rising';
        }
        else if (percentChange < -1) {
            trend = 'falling';
        }
        return {
            id: product.id,
            newPrice,
            priceChange,
            trend
        };
    });
};
exports.simulateMarketFluctuations = simulateMarketFluctuations;
/**
 * Genera datos iniciales para el sistema económico
 * @returns Datos económicos iniciales
 */
const generateInitialEconomicData = () => {
    // Productos básicos para el MVP
    const products = [
        {
            id: 'product-1',
            name: 'Alimentos Básicos',
            description: 'Productos alimenticios de primera necesidad',
            basePrice: {
                min: 10,
                max: 30,
                current: 20,
                trend: 'stable'
            },
            productionCost: 15,
            productionTime: 24, // 24 horas de juego
            demand: 70, // Alta demanda inicial
            supply: 60 // Oferta moderada inicial
        },
        {
            id: 'product-2',
            name: 'Electrónica Básica',
            description: 'Dispositivos electrónicos de uso común',
            basePrice: {
                min: 50,
                max: 150,
                current: 100,
                trend: 'stable'
            },
            productionCost: 70,
            productionTime: 48, // 48 horas de juego
            demand: 50, // Demanda media inicial
            supply: 40 // Oferta media-baja inicial
        },
        {
            id: 'product-3',
            name: 'Ropa',
            description: 'Prendas de vestir de uso diario',
            basePrice: {
                min: 20,
                max: 80,
                current: 40,
                trend: 'stable'
            },
            productionCost: 25,
            productionTime: 36, // 36 horas de juego
            demand: 60, // Demanda media-alta inicial
            supply: 65 // Oferta ligeramente superior a demanda
        }
    ];
    // Recursos básicos
    const resources = [
        {
            id: 'resource-1',
            name: 'Materias Primas Agrícolas',
            description: 'Recursos básicos para la producción de alimentos',
            basePrice: {
                min: 5,
                max: 15,
                current: 8,
                trend: 'stable'
            },
            availability: 80 // Alta disponibilidad
        },
        {
            id: 'resource-2',
            name: 'Componentes Electrónicos',
            description: 'Piezas para la fabricación de dispositivos electrónicos',
            basePrice: {
                min: 30,
                max: 90,
                current: 50,
                trend: 'stable'
            },
            availability: 50 // Disponibilidad media
        },
        {
            id: 'resource-3',
            name: 'Textiles',
            description: 'Materiales para la confección de ropa',
            basePrice: {
                min: 10,
                max: 30,
                current: 15,
                trend: 'stable'
            },
            availability: 70 // Disponibilidad alta
        }
    ];
    return {
        products: products.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {}),
        resources: resources.reduce((acc, resource) => {
            acc[resource.id] = resource;
            return acc;
        }, {}),
        globalDemandFactor: 1.0,
        globalSupplyFactor: 1.0,
        inflationRate: 0.0,
        lastUpdated: Date.now()
    };
};
exports.generateInitialEconomicData = generateInitialEconomicData;
