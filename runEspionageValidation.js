"use strict";
/**
 * Script para ejecutar la validación del Sistema de Espionaje
 *
 * Este archivo ejecuta las pruebas de validación del sistema de espionaje
 * y genera un informe detallado de los resultados.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const espionageValidator_1 = require("./espionageValidator");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Función principal para ejecutar la validación
function ejecutarValidacion() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Iniciando validación del Sistema de Espionaje Corporativo...');
        console.log('=====================================================');
        try {
            // Ejecutar la validación
            const resultado = (0, espionageValidator_1.validarSistemaEspionaje)();
            // Mostrar resultado en consola
            console.log('\nResultado de la validación:');
            console.log(resultado.exitoso ? '✅ ÉXITO' : '❌ FALLO');
            console.log('\nResumen:');
            console.log(resultado.resumen);
            // Guardar resultado en archivo
            const fechaHora = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
            const nombreArchivo = `informe_validacion_espionaje_${fechaHora}.md`;
            const rutaArchivo = path.join(__dirname, '../../../../docs/', nombreArchivo);
            const contenidoInforme = `# Informe de Validación del Sistema de Espionaje Corporativo
    
Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

## Resultado Global
**${resultado.exitoso ? 'ÉXITO ✅' : 'FALLO ❌'}**

## Resumen Detallado
${resultado.resumen}

## Conclusiones y Recomendaciones

${resultado.exitoso
                ? 'El Sistema de Espionaje Corporativo ha pasado todas las pruebas de validación y está listo para su integración completa en el juego. Se recomienda realizar pruebas de usuario para verificar la experiencia de juego y el equilibrio de las mecánicas.'
                : 'El Sistema de Espionaje Corporativo presenta algunos problemas que deben ser corregidos antes de su integración completa. Se recomienda revisar los errores reportados, aplicar las correcciones necesarias y ejecutar nuevamente la validación.'}

## Próximos Pasos

1. ${resultado.exitoso
                ? 'Actualizar la documentación y la checklist para marcar el sistema como completado'
                : 'Corregir los errores detectados en las pruebas fallidas'}
2. ${resultado.exitoso
                ? 'Proceder con la implementación del Sistema de Fusiones y Adquisiciones'
                : 'Ejecutar nuevamente la validación después de aplicar las correcciones'}
3. ${resultado.exitoso
                ? 'Realizar pruebas de integración con el resto del juego'
                : 'Revisar la integración con otros sistemas para asegurar compatibilidad'}

---

*Informe generado automáticamente por el sistema de validación de EcoTycoon: Market Empires*
`;
            fs.writeFileSync(rutaArchivo, contenidoInforme);
            console.log(`\nInforme guardado en: ${rutaArchivo}`);
            return {
                exitoso: resultado.exitoso,
                rutaInforme: rutaArchivo
            };
        }
        catch (error) {
            console.error('Error durante la validación:', error);
            return {
                exitoso: false,
                error: error.message
            };
        }
    });
}
// Ejecutar si este archivo se llama directamente
if (require.main === module) {
    ejecutarValidacion()
        .then(resultado => {
        process.exit(resultado.exitoso ? 0 : 1);
    })
        .catch(error => {
        console.error('Error fatal:', error);
        process.exit(1);
    });
}
exports.default = ejecutarValidacion;
