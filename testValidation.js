"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Script de prueba para validar la integración y equilibrio de la simulación
const simulationValidator_1 = require("./validation/simulationValidator");
const productDatabase_1 = require("./entities/productDatabase");
// Crear un estado de juego simulado para pruebas
const mockGameState = {
    time: {
        timestamp: Date.now(),
        day: 30,
        month: 3,
        year: 1
    },
    difficulty: 'normal',
    economy: {
        products: (0, productDatabase_1.generateProductsDatabase)(),
        resources: {},
        globalDemandFactor: 1.1,
        globalSupplyFactor: 0.9
    },
    entities: {
        companies: {
            'player-1': {
                id: 'player-1',
                name: 'Empresa del Jugador',
                cash: 100000,
                marketShare: {
                    'food-basic-1': 0.2,
                    'electronics-basic-1': 0.15
                }
            },
            'npc-1': {
                id: 'npc-1',
                name: 'Competidor Alpha',
                type: 'corporation',
                strategy: 'balanced',
                cash: 200000,
                marketShare: {
                    'food-basic-1': 0.3,
                    'electronics-basic-1': 0.25
                }
            },
            'npc-2': {
                id: 'npc-2',
                name: 'Innovaciones Beta',
                type: 'startup',
                strategy: 'high_quality',
                cash: 80000,
                marketShare: {
                    'food-gourmet-1': 0.4,
                    'electronics-advanced-1': 0.2
                }
            }
        },
        playerCompanyId: 'player-1',
        regions: {
            'region-1': {
                id: 'region-1',
                name: 'Región Central',
                wealthLevel: 65,
                cities: ['city-1', 'city-2']
            },
            'region-2': {
                id: 'region-2',
                name: 'Región Norte',
                wealthLevel: 40,
                cities: ['city-3']
            },
            'region-3': {
                id: 'region-3',
                name: 'Región Sur',
                wealthLevel: 80,
                cities: ['city-4', 'city-5']
            }
        },
        locations: {
            'city-1': {
                id: 'city-1',
                name: 'Ciudad Principal',
                regionId: 'region-1',
                population: 500000
            },
            'city-2': {
                id: 'city-2',
                name: 'Ciudad Secundaria',
                regionId: 'region-1',
                population: 250000
            },
            'city-3': {
                id: 'city-3',
                name: 'Ciudad Norte',
                regionId: 'region-2',
                population: 150000
            },
            'city-4': {
                id: 'city-4',
                name: 'Ciudad Sur A',
                regionId: 'region-3',
                population: 300000
            },
            'city-5': {
                id: 'city-5',
                name: 'Ciudad Sur B',
                regionId: 'region-3',
                population: 200000
            }
        }
    }
};
// Ejecutar validación
console.log('Iniciando validación de la simulación...');
const validationResults = (0, simulationValidator_1.validateSimulation)(mockGameState);
// Mostrar resultados
console.log('\n=== RESULTADOS DE VALIDACIÓN ===\n');
// 1. Integración de entidades
console.log('INTEGRACIÓN DE ENTIDADES:');
console.log(`Éxito: ${validationResults.entitiesIntegration.success ? 'SÍ' : 'NO'}`);
if (validationResults.entitiesIntegration.issues.length > 0) {
    console.log('Problemas detectados:');
    validationResults.entitiesIntegration.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
    });
    console.log('Recomendaciones:');
    validationResults.entitiesIntegration.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
    });
}
// 2. Generación de NPCs
console.log('\nGENERACIÓN DE NPCs:');
console.log(`Éxito: ${validationResults.npcGeneration.success ? 'SÍ' : 'NO'}`);
console.log(`NPCs generados: ${validationResults.npcGeneration.generatedNPCs.length}`);
if (validationResults.npcGeneration.issues.length > 0) {
    console.log('Problemas detectados:');
    validationResults.npcGeneration.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
    });
    console.log('Recomendaciones:');
    validationResults.npcGeneration.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
    });
}
// 3. Equilibrio económico
console.log('\nEQUILIBRIO ECONÓMICO:');
console.log(`Éxito: ${validationResults.economicBalance.success ? 'SÍ' : 'NO'}`);
console.log('Métricas clave:');
Object.entries(validationResults.economicBalance.metrics).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});
if (validationResults.economicBalance.issues.length > 0) {
    console.log('Problemas detectados:');
    validationResults.economicBalance.issues.forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue}`);
    });
    console.log('Recomendaciones:');
    validationResults.economicBalance.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
    });
}
// Resultado general
console.log('\nRESULTADO GENERAL:');
console.log(`Validación completa: ${validationResults.overallSuccess ? 'EXITOSA' : 'CON PROBLEMAS'}`);
exports.default = validationResults;
