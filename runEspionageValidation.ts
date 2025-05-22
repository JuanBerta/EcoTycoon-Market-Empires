/**
 * Script para ejecutar la validación del Sistema de Espionaje
 * 
 * Este archivo ejecuta las pruebas de validación del sistema de espionaje
 * y genera un informe detallado de los resultados.
 */

import { validarSistemaEspionaje } from './espionageValidator';
import * as fs from 'fs';
import * as path from 'path';

// Función principal para ejecutar la validación
async function ejecutarValidacion() {
  console.log('Iniciando validación del Sistema de Espionaje Corporativo...');
  console.log('=====================================================');
  
  try {
    // Ejecutar la validación
    const resultado = validarSistemaEspionaje();
    
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
  } catch (error) {
    console.error('Error durante la validación:', error);
    return {
      exitoso: false,
      error: error.message
    };
  }
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

export default ejecutarValidacion;
