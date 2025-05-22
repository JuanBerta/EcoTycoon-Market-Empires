"use strict";
/**
 * Sistema de Validación para el Módulo de Espionaje Corporativo
 *
 * Este archivo contiene pruebas y validaciones para asegurar el correcto
 * funcionamiento del sistema de espionaje corporativo en EcoTycoon.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspionageValidator = void 0;
const espionageTypes_1 = require("../espionageTypes");
const gestorAgentes_1 = require("../gestorAgentes");
const gestorMisiones_1 = require("../gestorMisiones");
const sistemaContraespionaje_1 = require("../sistemaContraespionaje");
const sistemaEspionaje_1 = require("../sistemaEspionaje");
const integracionEconomico_1 = require("../integracionEconomico");
const integracionProduccion_1 = require("../integracionProduccion");
const integracionNPCs_1 = require("../integracionNPCs");
// Configuración de pruebas
const CONFIG_PRUEBAS = {
    numeroAgentes: 5,
    numeroEmpresas: 3,
    numeroMisiones: 10,
    diasSimulacion: 30,
    semillaAleatoria: 12345
};
// Clase principal de validación
class EspionageValidator {
    constructor() {
        this.resultadosPruebas = new Map();
        this.mensajesError = new Map();
        // Inicializar componentes con configuración de prueba
        this.gestorAgentes = new gestorAgentes_1.GestorAgentes();
        this.gestorMisiones = new gestorMisiones_1.GestorMisiones();
        this.sistemaContraespionaje = new sistemaContraespionaje_1.SistemaContraespionaje();
        this.sistemaEspionaje = new sistemaEspionaje_1.SistemaEspionaje(this.gestorAgentes, this.gestorMisiones, this.sistemaContraespionaje);
        this.integracionEconomico = new integracionEconomico_1.IntegracionEconomico();
        this.integracionProduccion = new integracionProduccion_1.IntegracionProduccion();
        this.integracionNPCs = new integracionNPCs_1.IntegracionNPCs();
        // Inicializar mapas de resultados
        this.inicializarResultados();
    }
    inicializarResultados() {
        // Definir todas las pruebas que se ejecutarán
        const pruebas = [
            'creacion_agentes',
            'reclutamiento_agentes',
            'creacion_misiones',
            'calculo_probabilidades',
            'ejecucion_misiones',
            'deteccion_misiones',
            'resultados_misiones',
            'consecuencias_agentes',
            'consecuencias_empresas',
            'integracion_economica',
            'integracion_produccion',
            'integracion_npcs',
            'contraespionaje',
            'interfaz_usuario'
        ];
        // Inicializar resultados como pendientes
        pruebas.forEach(prueba => {
            this.resultadosPruebas.set(prueba, false);
            this.mensajesError.set(prueba, []);
        });
    }
    /**
     * Ejecuta todas las pruebas de validación
     * @returns Objeto con resultados de las pruebas
     */
    ejecutarValidacionCompleta() {
        console.log("Iniciando validación completa del sistema de espionaje...");
        // Ejecutar cada prueba individual
        this.validarCreacionAgentes();
        this.validarReclutamientoAgentes();
        this.validarCreacionMisiones();
        this.validarCalculoProbabilidades();
        this.validarEjecucionMisiones();
        this.validarDeteccionMisiones();
        this.validarResultadosMisiones();
        this.validarConsecuenciasAgentes();
        this.validarConsecuenciasEmpresas();
        this.validarIntegracionEconomica();
        this.validarIntegracionProduccion();
        this.validarIntegracionNPCs();
        this.validarContraespionaje();
        this.validarInterfazUsuario();
        // Determinar resultado global
        const exitosoGlobal = Array.from(this.resultadosPruebas.values()).every(resultado => resultado);
        // Generar resumen
        const resumen = this.generarResumen();
        console.log(`Validación completa finalizada. Resultado global: ${exitosoGlobal ? 'ÉXITO' : 'FALLO'}`);
        console.log(resumen);
        return {
            exitoso: exitosoGlobal,
            resultados: this.resultadosPruebas,
            errores: this.mensajesError,
            resumen
        };
    }
    /**
     * Genera un resumen de los resultados de las pruebas
     */
    generarResumen() {
        let resumen = "RESUMEN DE VALIDACIÓN DEL SISTEMA DE ESPIONAJE\n";
        resumen += "==============================================\n\n";
        // Contar pruebas exitosas y fallidas
        const totalPruebas = this.resultadosPruebas.size;
        const pruebasExitosas = Array.from(this.resultadosPruebas.values()).filter(v => v).length;
        const pruebasFallidas = totalPruebas - pruebasExitosas;
        resumen += `Total de pruebas: ${totalPruebas}\n`;
        resumen += `Pruebas exitosas: ${pruebasExitosas}\n`;
        resumen += `Pruebas fallidas: ${pruebasFallidas}\n\n`;
        // Detallar resultados por categoría
        resumen += "RESULTADOS POR CATEGORÍA:\n";
        resumen += "-----------------------\n\n";
        this.resultadosPruebas.forEach((resultado, prueba) => {
            resumen += `${prueba}: ${resultado ? 'ÉXITO' : 'FALLO'}\n`;
            // Incluir mensajes de error si existen
            const errores = this.mensajesError.get(prueba) || [];
            if (errores.length > 0) {
                resumen += "  Errores detectados:\n";
                errores.forEach(error => {
                    resumen += `  - ${error}\n`;
                });
            }
            resumen += "\n";
        });
        // Añadir recomendaciones si hay fallos
        if (pruebasFallidas > 0) {
            resumen += "RECOMENDACIONES:\n";
            resumen += "---------------\n\n";
            resumen += "- Revisar y corregir los errores reportados en las pruebas fallidas\n";
            resumen += "- Ejecutar nuevamente la validación después de aplicar correcciones\n";
            resumen += "- Considerar pruebas adicionales para casos específicos\n\n";
        }
        return resumen;
    }
    /**
     * Registra un error en una prueba específica
     */
    registrarError(prueba, mensaje) {
        const errores = this.mensajesError.get(prueba) || [];
        errores.push(mensaje);
        this.mensajesError.set(prueba, errores);
        console.error(`Error en prueba ${prueba}: ${mensaje}`);
    }
    /**
     * Marca una prueba como exitosa
     */
    marcarExito(prueba) {
        this.resultadosPruebas.set(prueba, true);
        console.log(`Prueba ${prueba} completada con éxito`);
    }
    // Implementación de pruebas individuales
    validarCreacionAgentes() {
        console.log("Validando creación de agentes...");
        try {
            // Crear agentes de prueba
            const agentes = this.gestorAgentes.generarAgentesDisponibles(CONFIG_PRUEBAS.numeroAgentes);
            // Verificar que se crearon correctamente
            if (agentes.length !== CONFIG_PRUEBAS.numeroAgentes) {
                this.registrarError('creacion_agentes', `Número incorrecto de agentes generados: ${agentes.length} vs ${CONFIG_PRUEBAS.numeroAgentes} esperados`);
                return;
            }
            // Verificar que cada agente tiene los campos requeridos
            let agentesValidos = true;
            agentes.forEach((agente, index) => {
                if (!agente.id || !agente.nombre || agente.nivelHabilidad < 1 || agente.nivelHabilidad > 5) {
                    this.registrarError('creacion_agentes', `Agente #${index} tiene datos inválidos: ${JSON.stringify(agente)}`);
                    agentesValidos = false;
                }
            });
            if (agentesValidos) {
                this.marcarExito('creacion_agentes');
            }
        }
        catch (error) {
            this.registrarError('creacion_agentes', `Excepción: ${error.message}`);
        }
    }
    validarReclutamientoAgentes() {
        console.log("Validando reclutamiento de agentes...");
        try {
            // Generar agentes disponibles
            const agentesDisponibles = this.gestorAgentes.generarAgentesDisponibles(3);
            // Intentar reclutar un agente
            if (agentesDisponibles.length > 0) {
                const agenteReclutado = this.gestorAgentes.reclutarAgente(agentesDisponibles[0].id);
                // Verificar que el agente fue reclutado correctamente
                if (!agenteReclutado || agenteReclutado.id !== agentesDisponibles[0].id) {
                    this.registrarError('reclutamiento_agentes', 'El agente no fue reclutado correctamente');
                    return;
                }
                // Verificar que el agente está en la lista de agentes reclutados
                const agentesReclutados = this.gestorAgentes.obtenerAgentesReclutados();
                if (!agentesReclutados.some(a => a.id === agenteReclutado.id)) {
                    this.registrarError('reclutamiento_agentes', 'El agente reclutado no aparece en la lista de agentes reclutados');
                    return;
                }
                this.marcarExito('reclutamiento_agentes');
            }
            else {
                this.registrarError('reclutamiento_agentes', 'No se pudieron generar agentes disponibles para la prueba');
            }
        }
        catch (error) {
            this.registrarError('reclutamiento_agentes', `Excepción: ${error.message}`);
        }
    }
    validarCreacionMisiones() {
        console.log("Validando creación de misiones...");
        try {
            // Reclutar un agente para la misión
            const agentesDisponibles = this.gestorAgentes.generarAgentesDisponibles(1);
            if (agentesDisponibles.length === 0) {
                this.registrarError('creacion_misiones', 'No se pudieron generar agentes para la prueba');
                return;
            }
            const agente = this.gestorAgentes.reclutarAgente(agentesDisponibles[0].id);
            // Crear una misión de prueba
            const mision = this.gestorMisiones.crearMision({
                tipo: espionageTypes_1.TipoMisionEspionaje.RECOPILACION_INFO,
                objetivoEmpresaId: 'empresa_test_1',
                objetivoEspecifico: 'datos_financieros',
                agenteAsignadoId: agente.id,
                duracionEstimada: 5,
                costoOperacion: 10000
            });
            // Verificar que la misión se creó correctamente
            if (!mision || !mision.id || mision.tipo !== espionageTypes_1.TipoMisionEspionaje.RECOPILACION_INFO) {
                this.registrarError('creacion_misiones', `La misión no se creó correctamente: ${JSON.stringify(mision)}`);
                return;
            }
            // Verificar que la misión está en estado PLANIFICANDO
            if (mision.estado !== espionageTypes_1.EstadoMision.PLANIFICANDO) {
                this.registrarError('creacion_misiones', `Estado inicial incorrecto: ${mision.estado} vs ${espionageTypes_1.EstadoMision.PLANIFICANDO} esperado`);
                return;
            }
            this.marcarExito('creacion_misiones');
        }
        catch (error) {
            this.registrarError('creacion_misiones', `Excepción: ${error.message}`);
        }
    }
    validarCalculoProbabilidades() {
        console.log("Validando cálculo de probabilidades...");
        try {
            // Crear agente y misión de prueba
            const agente = {
                id: 'agente_test_1',
                nombre: 'Agente Test',
                especialidad: espionageTypes_1.EspecialidadAgente.INFORMACION,
                nivelHabilidad: 3,
                lealtad: 4,
                costoMensual: 5000,
                experiencia: 100,
                notoriedad: 20,
                estado: espionageTypes_1.EstadoAgente.DISPONIBLE
            };
            const mision = {
                tipo: espionageTypes_1.TipoMisionEspionaje.RECOPILACION_INFO,
                objetivoEmpresaId: 'empresa_test_1',
                objetivoEspecifico: 'datos_financieros',
                agenteAsignadoId: agente.id,
                duracionEstimada: 5,
                costoOperacion: 10000
            };
            // Calcular probabilidades
            const probabilidades = this.gestorMisiones.calcularProbabilidades(mision, agente, { nivelSeguridadGeneral: 2 });
            // Verificar que las probabilidades están en rangos válidos
            if (probabilidades.exito < 0 || probabilidades.exito > 100 ||
                probabilidades.deteccion < 0 || probabilidades.deteccion > 100) {
                this.registrarError('calculo_probabilidades', `Probabilidades fuera de rango: éxito=${probabilidades.exito}, detección=${probabilidades.deteccion}`);
                return;
            }
            // Verificar que las probabilidades reflejan la especialidad del agente
            // Un agente de INFORMACION debería tener mejor probabilidad en misiones de RECOPILACION_INFO
            const agenteNoEspecialista = Object.assign(Object.assign({}, agente), { id: 'agente_test_2', especialidad: espionageTypes_1.EspecialidadAgente.SABOTAJE });
            const probabilidadesNoEspecialista = this.gestorMisiones.calcularProbabilidades(mision, agenteNoEspecialista, { nivelSeguridadGeneral: 2 });
            if (probabilidades.exito <= probabilidadesNoEspecialista.exito) {
                this.registrarError('calculo_probabilidades', `La especialidad del agente no afecta correctamente la probabilidad de éxito`);
                return;
            }
            this.marcarExito('calculo_probabilidades');
        }
        catch (error) {
            this.registrarError('calculo_probabilidades', `Excepción: ${error.message}`);
        }
    }
    validarEjecucionMisiones() {
        console.log("Validando ejecución de misiones...");
        try {
            // Crear agente y misión de prueba
            const agentesDisponibles = this.gestorAgentes.generarAgentesDisponibles(1);
            if (agentesDisponibles.length === 0) {
                this.registrarError('ejecucion_misiones', 'No se pudieron generar agentes para la prueba');
                return;
            }
            const agente = this.gestorAgentes.reclutarAgente(agentesDisponibles[0].id);
            const mision = this.gestorMisiones.crearMision({
                tipo: espionageTypes_1.TipoMisionEspionaje.RECOPILACION_INFO,
                objetivoEmpresaId: 'empresa_test_1',
                objetivoEspecifico: 'datos_financieros',
                agenteAsignadoId: agente.id,
                duracionEstimada: 5,
                costoOperacion: 10000
            });
            // Iniciar la misión
            const misionIniciada = this.gestorMisiones.iniciarMision(mision.id);
            // Verificar que la misión cambió a estado EN_PROGRESO
            if (misionIniciada.estado !== espionageTypes_1.EstadoMision.EN_PROGRESO) {
                this.registrarError('ejecucion_misiones', `La misión no cambió a estado EN_PROGRESO: ${misionIniciada.estado}`);
                return;
            }
            // Verificar que el agente está en estado EN_MISION
            const agenteActualizado = this.gestorAgentes.obtenerAgente(agente.id);
            if (agenteActualizado.estado !== espionageTypes_1.EstadoAgente.EN_MISION) {
                this.registrarError('ejecucion_misiones', `El agente no cambió a estado EN_MISION: ${agenteActualizado.estado}`);
                return;
            }
            // Simular avance del tiempo para completar la misión
            for (let i = 0; i < mision.duracionEstimada; i++) {
                this.gestorMisiones.actualizarMisionesEnProgreso();
            }
            // Verificar que la misión se completó
            const misionFinalizada = this.gestorMisiones.obtenerMision(mision.id);
            if (misionFinalizada.estado !== espionageTypes_1.EstadoMision.COMPLETADA &&
                misionFinalizada.estado !== espionageTypes_1.EstadoMision.FALLIDA &&
                misionFinalizada.estado !== espionageTypes_1.EstadoMision.DESCUBIERTA) {
                this.registrarError('ejecucion_misiones', `La misión no se completó correctamente: ${misionFinalizada.estado}`);
                return;
            }
            this.marcarExito('ejecucion_misiones');
        }
        catch (error) {
            this.registrarError('ejecucion_misiones', `Excepción: ${error.message}`);
        }
    }
    validarDeteccionMisiones() {
        console.log("Validando detección de misiones...");
        try {
            // Configurar un departamento de contraespionaje con alta seguridad
            const contraespionaje = {
                empresaId: 'empresa_test_2',
            }(Content, truncated, due, to, size, limit.Use, line, ranges, to, read in chunks);
        }
        finally { }
    }
}
exports.EspionageValidator = EspionageValidator;
