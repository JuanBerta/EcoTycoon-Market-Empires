"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Script para ejecutar la validación del MVP
const mvpValidator_1 = require("./mvpValidator");
// Ejecutar validación y mostrar resultados
console.log('Ejecutando validación del MVP de EcoTycoon: Market Empires...');
const isValid = (0, mvpValidator_1.validateMVP)();
// Guardar resultados en un archivo de log
console.log(`\nValidación completada. Resultado: ${isValid ? 'ÉXITO' : 'REQUIERE CORRECCIONES'}`);
console.log('Los resultados detallados se pueden ver en la consola anterior.');
