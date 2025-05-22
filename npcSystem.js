"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNPCCompany = exports.executeNPCDecision = exports.generateNPCDecisions = exports.generateInitialNPCCompanies = void 0;
// Sistema de IA para NPCs
const uuid_1 = require("uuid");
/**
 * Genera compañías NPC iniciales
 * @returns Lista de compañías NPC
 */
const generateInitialNPCCompanies = () => {
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
exports.generateInitialNPCCompanies = generateInitialNPCCompanies;
/**
 * Evalúa el mercado y genera decisiones para una compañía NPC
 * @param company Compañía NPC
 * @param marketData Datos del mercado (precios, demanda, oferta)
 * @param regions Datos de regiones disponibles
 * @param currentTime Tiempo actual del juego
 * @returns Lista de decisiones generadas
 */
const generateNPCDecisions = (company, marketData, regions, currentTime) => {
    const decisions = [];
    // Solo generar decisiones si ha pasado suficiente tiempo desde la última vez
    const timeSinceLastDecision = currentTime - company.lastDecisionTime;
    if (timeSinceLastDecision < 24 * 60 * 60 * 1000) { // 24 horas en milisegundos
        return decisions;
    }
    // Evaluar oportunidades de producción
    company.preferredProducts.forEach(productId => {
        const product = marketData.products[productId];
        if (!product)
            return;
        // Verificar si hay buena oportunidad de producción
        if (product.demand > product.supply && product.trend !== 'falling') {
            // Calcular prioridad basada en la brecha entre demanda y oferta
            const gap = product.demand - product.supply;
            const priority = Math.min(100, Math.max(0, 40 + gap / 2));
            // Calcular beneficio esperado (simplificado)
            const expectedProfit = (product.price * 0.2) * Math.min(gap, 20);
            // Calcular riesgo basado en tendencia y volatilidad
            let risk = 50; // Riesgo base
            if (product.trend === 'rising')
                risk -= 20;
            if (product.trend === 'falling')
                risk += 20;
            // Ajustar por estrategia de la compañía
            if (company.strategy === 'low_cost' && product.price > 50) {
                // Menos interesado en productos caros
                continue;
            }
            if (company.strategy === 'high_quality' && product.price < 30) {
                // Menos interesado en productos baratos
                continue;
            }
            // Crear decisión de producción
            decisions.push({
                id: `decision-${(0, uuid_1.v4)()}`,
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
        let bestCity = null;
        let bestScore = 0;
        regions.forEach(region => {
            if (!company.preferredRegions.includes(region.id))
                return;
            region.cities.forEach(city => {
                // Calcular puntuación de la ciudad basada en población, riqueza y costos
                let score = city.population / 100000; // Factor de población
                // Ajustar por nivel de riqueza según estrategia
                if (company.strategy === 'high_quality') {
                    score *= (city.wealthLevel / 50); // Prefiere ciudades ricas
                }
                else if (company.strategy === 'low_cost') {
                    score *= (2 - city.wealthLevel / 50); // Prefiere ciudades menos ricas
                }
                // Ajustar por costos
                const costFactor = (city.landCost + city.laborCost) / 1000;
                if (company.strategy === 'low_cost') {
                    score /= costFactor; // Muy sensible a costos
                }
                else {
                    score /= Math.sqrt(costFactor); // Menos sensible a costos
                }
                if (score > bestScore) {
                    bestScore = score;
                    bestCity = city;
                }
            });
        });
        if (bestCity) {
            // Determinar tipo de edificio según estrategia
            let buildingType;
            if (company.buildings.length === 0) {
                buildingType = 'factory'; // Primera construcción siempre fábrica
            }
            else if (company.strategy === 'low_cost') {
                buildingType = Math.random() > 0.3 ? 'factory' : 'warehouse';
            }
            else if (company.strategy === 'high_quality') {
                buildingType = Math.random() > 0.4 ? 'factory' : 'store';
            }
            else {
                buildingType = Math.random() > 0.5 ? 'factory' : (Math.random() > 0.5 ? 'store' : 'warehouse');
            }
            // Calcular prioridad y riesgo
            const priority = company.buildings.length === 0 ? 90 : 70;
            const risk = 60; // Expansión siempre tiene riesgo moderado-alto
            // Crear decisión de construcción
            decisions.push({
                id: `decision-${(0, uuid_1.v4)()}`,
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
            // Lógica simplificada: asumimos que cada recurso es necesario para al menos un producto preferido
            return true;
        });
        if (isNeeded && resource.price < 20 && resource.availability > 50) {
            // Buena oportunidad para comprar recursos baratos y abundantes
            // Calcular cantidad a comprar basada en disponibilidad y estrategia
            let quantity = Math.floor(resource.availability / 10);
            if (company.strategy === 'low_cost') {
                quantity *= 1.5; // Compra más para aprovechar precios bajos
            }
            // Limitar por efectivo disponible
            const maxAffordable = Math.floor(company.cash * 0.2 / resource.price);
            quantity = Math.min(quantity, maxAffordable);
            if (quantity > 0) {
                decisions.push({
                    id: `decision-${(0, uuid_1.v4)()}`,
                    companyId: company.id,
                    type: 'buy',
                    priority: 60,
                    parameters: {
                        resourceId: resource.id,
                        quantity,
                        maxPrice: resource.price * 1.1 // Acepta hasta 10% más del precio actual
                    },
                    expectedProfit: quantity * resource.price * 0.2, // Estimación simple
                    risk: 30, // Riesgo bajo-moderado
                    timeToExecute: currentTime + Math.random() * 12 * 60 * 60 * 1000, // Entre ahora y 12h
                    executed: false
                });
            }
        }
    });
    // Evaluar cambios de precio para productos en venta
    company.preferredProducts.forEach(productId => {
        const product = marketData.products[productId];
        if (!product)
            return;
        // Determinar dirección de cambio de precio según estrategia y condiciones de mercado
        let priceChange = 0;
        if (company.strategy === 'low_cost') {
            // Estrategia de bajo costo: mantener precios bajos
            priceChange = -5;
        }
        else if (company.strategy === 'high_quality') {
            // Estrategia de alta calidad: precios premium
            priceChange = 10;
        }
        else {
            // Estrategia de nicho: adaptarse al mercado
            if (product.demand > product.supply) {
                priceChange = 5; // Subir precios si hay más demanda que oferta
            }
            else {
                priceChange = -3; // Bajar precios si hay más oferta que demanda
            }
        }
        // Ajustar por tendencia del mercado
        if (product.trend === 'rising') {
            priceChange += 3;
        }
        else if (product.trend === 'falling') {
            priceChange -= 3;
        }
        // Calcular nuevo precio
        const newPrice = Math.max(product.price * 0.7, product.price + priceChange);
        // Solo crear decisión si el cambio es significativo
        if (Math.abs(newPrice - product.price) > 2) {
            decisions.push({
                id: `decision-${(0, uuid_1.v4)()}`,
                companyId: company.id,
                type: 'price_change',
                priority: 50,
                parameters: {
                    productId,
                    newPrice
                },
                expectedProfit: Math.abs(newPrice - product.price) * 10, // Estimación simple
                risk: 40,
                timeToExecute: currentTime + Math.random() * 6 * 60 * 60 * 1000, // Entre ahora y 6h
                executed: false
            });
        }
    });
    // Filtrar decisiones basadas en tolerancia al riesgo
    const filteredDecisions = decisions.filter(decision => decision.risk <= company.riskTolerance + 20 // Permite algo más de riesgo del nivel base
    );
    // Ordenar por prioridad
    filteredDecisions.sort((a, b) => b.priority - a.priority);
    // Limitar número de decisiones según agresividad
    const maxDecisions = Math.max(1, Math.floor(company.aggressiveness / 20));
    return filteredDecisions.slice(0, maxDecisions);
};
exports.generateNPCDecisions = generateNPCDecisions;
/**
 * Ejecuta una decisión de NPC
 * @param decision Decisión a ejecutar
 * @param company Compañía NPC
 * @param gameState Estado actual del juego
 * @returns Resultado de la ejecución
 */
const executeNPCDecision = (decision, company, gameState // Tipo simplificado para el MVP
) => {
    // Implementación simplificada para el MVP
    // En una implementación completa, esto interactuaría con todos los sistemas del juego
    if (decision.type === 'build') {
        // Simular construcción de edificio
        const buildingCost = decision.parameters.size * 5000;
        if (company.cash < buildingCost) {
            return {
                success: false,
                effects: {},
                message: `${company.name} no tiene suficiente dinero para construir.`
            };
        }
        // Generar ID de edificio
        const buildingId = `building-${(0, uuid_1.v4)()}`;
        return {
            success: true,
            effects: {
                cashChange: -buildingCost,
                newBuilding: {
                    id: buildingId,
                    type: decision.parameters.buildingType,
                    cityId: decision.parameters.cityId,
                    size: decision.parameters.size
                }
            },
            message: `${company.name} ha construido un nuevo ${decision.parameters.buildingType} en la ciudad.`
        };
    }
    if (decision.type === 'produce') {
        // Simular producción
        const productionCost = decision.parameters.quantity * 100;
        if (company.cash < productionCost) {
            return {
                success: false,
                effects: {},
                message: `${company.name} no tiene suficiente dinero para producir.`
            };
        }
        return {
            success: true,
            effects: {
                cashChange: -productionCost,
                production: {
                    productId: decision.parameters.productId,
                    quantity: decision.parameters.quantity,
                    quality: decision.parameters.targetQuality
                }
            },
            message: `${company.name} ha iniciado la producción de ${decision.parameters.quantity} unidades de producto.`
        };
    }
    if (decision.type === 'buy') {
        // Simular compra de recursos
        const totalCost = decision.parameters.quantity * decision.parameters.maxPrice;
        if (company.cash < totalCost) {
            return {
                success: false,
                effects: {},
                message: `${company.name} no tiene suficiente dinero para comprar recursos.`
            };
        }
        return {
            success: true,
            effects: {
                cashChange: -totalCost,
                resourcePurchase: {
                    resourceId: decision.parameters.resourceId,
                    quantity: decision.parameters.quantity,
                    price: decision.parameters.maxPrice
                }
            },
            message: `${company.name} ha comprado ${decision.parameters.quantity} unidades de recurso.`
        };
    }
    if (decision.type === 'price_change') {
        // Simular cambio de precio
        return {
            success: true,
            effects: {
                priceChange: {
                    productId: decision.parameters.productId,
                    newPrice: decision.parameters.newPrice
                }
            },
            message: `${company.name} ha cambiado el precio de su producto a ${decision.parameters.newPrice}.`
        };
    }
    // Tipo de decisión no implementado
    return {
        success: false,
        effects: {},
        message: `${company.name} intentó una acción no implementada.`
    };
};
exports.executeNPCDecision = executeNPCDecision;
/**
 * Actualiza el estado de una compañía NPC basado en los resultados de sus decisiones
 * @param company Compañía NPC a actualizar
 * @param executionResults Resultados de ejecución de decisiones
 * @param currentTime Tiempo actual del juego
 * @returns Compañía actualizada
 */
const updateNPCCompany = (company, executionResults, currentTime) => {
    let updatedCompany = Object.assign({}, company);
    // Actualizar efectivo
    executionResults.forEach(({ result }) => {
        if (result.success && result.effects.cashChange) {
            updatedCompany.cash += result.effects.cashChange;
        }
    });
    // Actualizar edificios
    executionResults.forEach(({ result }) => {
        if (result.suc(Content, truncated, due, to, size, limit.Use, line, ranges, to, read in chunks))
            ;
    });
};
exports.updateNPCCompany = updateNPCCompany;
