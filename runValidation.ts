// Script para ejecutar la validación del MVP
import { validateMVP } from './mvpValidator';

// Ejecutar validación y mostrar resultados
console.log('Ejecutando validación del MVP de EcoTycoon: Market Empires...');
const isValid = validateMVP();

// Guardar resultados en un archivo de log
console.log(`\nValidación completada. Resultado: ${isValid ? 'ÉXITO' : 'REQUIERE CORRECCIONES'}`);
console.log('Los resultados detallados se pueden ver en la consola anterior.');
