/**
 * Sistema de Validación para el Módulo de Espionaje Corporativo
 * 
 * Este archivo contiene pruebas y validaciones para asegurar el correcto
 * funcionamiento del sistema de espionaje corporativo en EcoTycoon.
 */

import { 
  TipoMisionEspionaje, 
  EstadoMision, 
  EspecialidadAgente,
  EstadoAgente,
  AgenteEspionaje,
  MisionEspionaje,
  ResultadoMision,
  DepartamentoContraespionaje
} from '../espionageTypes';

import { GestorAgentes } from '../gestorAgentes';
import { GestorMisiones } from '../gestorMisiones';
import { SistemaContraespionaje } from '../sistemaContraespionaje';
import { SistemaEspionaje } from '../sistemaEspionaje';
import { IntegracionEconomico } from '../integracionEconomico';
import { IntegracionProduccion } from '../integracionProduccion';
import { IntegracionNPCs } from '../integracionNPCs';

// Configuración de pruebas
const CONFIG_PRUEBAS = {
  numeroAgentes: 5,
  numeroEmpresas: 3,
  numeroMisiones: 10,
  diasSimulacion: 30,
  semillaAleatoria: 12345
};

// Clase principal de validación
export class EspionageValidator {
  private gestorAgentes: GestorAgentes;
  private gestorMisiones: GestorMisiones;
  private sistemaContraespionaje: SistemaContraespionaje;
  private sistemaEspionaje: SistemaEspionaje;
  private integracionEconomico: IntegracionEconomico;
  private integracionProduccion: IntegracionProduccion;
  private integracionNPCs: IntegracionNPCs;
  
  private resultadosPruebas: Map<string, boolean> = new Map();
  private mensajesError: Map<string, string[]> = new Map();
  
  constructor() {
    // Inicializar componentes con configuración de prueba
    this.gestorAgentes = new GestorAgentes();
    this.gestorMisiones = new GestorMisiones();
    this.sistemaContraespionaje = new SistemaContraespionaje();
    this.sistemaEspionaje = new SistemaEspionaje(
      this.gestorAgentes,
      this.gestorMisiones,
      this.sistemaContraespionaje
    );
    this.integracionEconomico = new IntegracionEconomico();
    this.integracionProduccion = new IntegracionProduccion();
    this.integracionNPCs = new IntegracionNPCs();
    
    // Inicializar mapas de resultados
    this.inicializarResultados();
  }
  
  private inicializarResultados(): void {
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
  public ejecutarValidacionCompleta(): { 
    exitoso: boolean, 
    resultados: Map<string, boolean>,
    errores: Map<string, string[]>,
    resumen: string
  } {
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
  private generarResumen(): string {
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
  private registrarError(prueba: string, mensaje: string): void {
    const errores = this.mensajesError.get(prueba) || [];
    errores.push(mensaje);
    this.mensajesError.set(prueba, errores);
    console.error(`Error en prueba ${prueba}: ${mensaje}`);
  }
  
  /**
   * Marca una prueba como exitosa
   */
  private marcarExito(prueba: string): void {
    this.resultadosPruebas.set(prueba, true);
    console.log(`Prueba ${prueba} completada con éxito`);
  }
  
  // Implementación de pruebas individuales
  
  private validarCreacionAgentes(): void {
    console.log("Validando creación de agentes...");
    try {
      // Crear agentes de prueba
      const agentes = this.gestorAgentes.generarAgentesDisponibles(CONFIG_PRUEBAS.numeroAgentes);
      
      // Verificar que se crearon correctamente
      if (agentes.length !== CONFIG_PRUEBAS.numeroAgentes) {
        this.registrarError('creacion_agentes', 
          `Número incorrecto de agentes generados: ${agentes.length} vs ${CONFIG_PRUEBAS.numeroAgentes} esperados`);
        return;
      }
      
      // Verificar que cada agente tiene los campos requeridos
      let agentesValidos = true;
      agentes.forEach((agente, index) => {
        if (!agente.id || !agente.nombre || agente.nivelHabilidad < 1 || agente.nivelHabilidad > 5) {
          this.registrarError('creacion_agentes', 
            `Agente #${index} tiene datos inválidos: ${JSON.stringify(agente)}`);
          agentesValidos = false;
        }
      });
      
      if (agentesValidos) {
        this.marcarExito('creacion_agentes');
      }
    } catch (error) {
      this.registrarError('creacion_agentes', `Excepción: ${error.message}`);
    }
  }
  
  private validarReclutamientoAgentes(): void {
    console.log("Validando reclutamiento de agentes...");
    try {
      // Generar agentes disponibles
      const agentesDisponibles = this.gestorAgentes.generarAgentesDisponibles(3);
      
      // Intentar reclutar un agente
      if (agentesDisponibles.length > 0) {
        const agenteReclutado = this.gestorAgentes.reclutarAgente(agentesDisponibles[0].id);
        
        // Verificar que el agente fue reclutado correctamente
        if (!agenteReclutado || agenteReclutado.id !== agentesDisponibles[0].id) {
          this.registrarError('reclutamiento_agentes', 
            'El agente no fue reclutado correctamente');
          return;
        }
        
        // Verificar que el agente está en la lista de agentes reclutados
        const agentesReclutados = this.gestorAgentes.obtenerAgentesReclutados();
        if (!agentesReclutados.some(a => a.id === agenteReclutado.id)) {
          this.registrarError('reclutamiento_agentes', 
            'El agente reclutado no aparece en la lista de agentes reclutados');
          return;
        }
        
        this.marcarExito('reclutamiento_agentes');
      } else {
        this.registrarError('reclutamiento_agentes', 
          'No se pudieron generar agentes disponibles para la prueba');
      }
    } catch (error) {
      this.registrarError('reclutamiento_agentes', `Excepción: ${error.message}`);
    }
  }
  
  private validarCreacionMisiones(): void {
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
        tipo: TipoMisionEspionaje.RECOPILACION_INFO,
        objetivoEmpresaId: 'empresa_test_1',
        objetivoEspecifico: 'datos_financieros',
        agenteAsignadoId: agente.id,
        duracionEstimada: 5,
        costoOperacion: 10000
      });
      
      // Verificar que la misión se creó correctamente
      if (!mision || !mision.id || mision.tipo !== TipoMisionEspionaje.RECOPILACION_INFO) {
        this.registrarError('creacion_misiones', 
          `La misión no se creó correctamente: ${JSON.stringify(mision)}`);
        return;
      }
      
      // Verificar que la misión está en estado PLANIFICANDO
      if (mision.estado !== EstadoMision.PLANIFICANDO) {
        this.registrarError('creacion_misiones', 
          `Estado inicial incorrecto: ${mision.estado} vs ${EstadoMision.PLANIFICANDO} esperado`);
        return;
      }
      
      this.marcarExito('creacion_misiones');
    } catch (error) {
      this.registrarError('creacion_misiones', `Excepción: ${error.message}`);
    }
  }
  
  private validarCalculoProbabilidades(): void {
    console.log("Validando cálculo de probabilidades...");
    try {
      // Crear agente y misión de prueba
      const agente: AgenteEspionaje = {
        id: 'agente_test_1',
        nombre: 'Agente Test',
        especialidad: EspecialidadAgente.INFORMACION,
        nivelHabilidad: 3,
        lealtad: 4,
        costoMensual: 5000,
        experiencia: 100,
        notoriedad: 20,
        estado: EstadoAgente.DISPONIBLE
      };
      
      const mision: Partial<MisionEspionaje> = {
        tipo: TipoMisionEspionaje.RECOPILACION_INFO,
        objetivoEmpresaId: 'empresa_test_1',
        objetivoEspecifico: 'datos_financieros',
        agenteAsignadoId: agente.id,
        duracionEstimada: 5,
        costoOperacion: 10000
      };
      
      // Calcular probabilidades
      const probabilidades = this.gestorMisiones.calcularProbabilidades(
        mision as MisionEspionaje, 
        agente, 
        { nivelSeguridadGeneral: 2 } as DepartamentoContraespionaje
      );
      
      // Verificar que las probabilidades están en rangos válidos
      if (probabilidades.exito < 0 || probabilidades.exito > 100 || 
          probabilidades.deteccion < 0 || probabilidades.deteccion > 100) {
        this.registrarError('calculo_probabilidades', 
          `Probabilidades fuera de rango: éxito=${probabilidades.exito}, detección=${probabilidades.deteccion}`);
        return;
      }
      
      // Verificar que las probabilidades reflejan la especialidad del agente
      // Un agente de INFORMACION debería tener mejor probabilidad en misiones de RECOPILACION_INFO
      const agenteNoEspecialista: AgenteEspionaje = {
        ...agente,
        id: 'agente_test_2',
        especialidad: EspecialidadAgente.SABOTAJE
      };
      
      const probabilidadesNoEspecialista = this.gestorMisiones.calcularProbabilidades(
        mision as MisionEspionaje, 
        agenteNoEspecialista, 
        { nivelSeguridadGeneral: 2 } as DepartamentoContraespionaje
      );
      
      if (probabilidades.exito <= probabilidadesNoEspecialista.exito) {
        this.registrarError('calculo_probabilidades', 
          `La especialidad del agente no afecta correctamente la probabilidad de éxito`);
        return;
      }
      
      this.marcarExito('calculo_probabilidades');
    } catch (error) {
      this.registrarError('calculo_probabilidades', `Excepción: ${error.message}`);
    }
  }
  
  private validarEjecucionMisiones(): void {
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
        tipo: TipoMisionEspionaje.RECOPILACION_INFO,
        objetivoEmpresaId: 'empresa_test_1',
        objetivoEspecifico: 'datos_financieros',
        agenteAsignadoId: agente.id,
        duracionEstimada: 5,
        costoOperacion: 10000
      });
      
      // Iniciar la misión
      const misionIniciada = this.gestorMisiones.iniciarMision(mision.id);
      
      // Verificar que la misión cambió a estado EN_PROGRESO
      if (misionIniciada.estado !== EstadoMision.EN_PROGRESO) {
        this.registrarError('ejecucion_misiones', 
          `La misión no cambió a estado EN_PROGRESO: ${misionIniciada.estado}`);
        return;
      }
      
      // Verificar que el agente está en estado EN_MISION
      const agenteActualizado = this.gestorAgentes.obtenerAgente(agente.id);
      if (agenteActualizado.estado !== EstadoAgente.EN_MISION) {
        this.registrarError('ejecucion_misiones', 
          `El agente no cambió a estado EN_MISION: ${agenteActualizado.estado}`);
        return;
      }
      
      // Simular avance del tiempo para completar la misión
      for (let i = 0; i < mision.duracionEstimada; i++) {
        this.gestorMisiones.actualizarMisionesEnProgreso();
      }
      
      // Verificar que la misión se completó
      const misionFinalizada = this.gestorMisiones.obtenerMision(mision.id);
      if (misionFinalizada.estado !== EstadoMision.COMPLETADA && 
          misionFinalizada.estado !== EstadoMision.FALLIDA && 
          misionFinalizada.estado !== EstadoMision.DESCUBIERTA) {
        this.registrarError('ejecucion_misiones', 
          `La misión no se completó correctamente: ${misionFinalizada.estado}`);
        return;
      }
      
      this.marcarExito('ejecucion_misiones');
    } catch (error) {
      this.registrarError('ejecucion_misiones', `Excepción: ${error.message}`);
    }
  }
  
  private validarDeteccionMisiones(): void {
    console.log("Validando detección de misiones...");
    try {
      // Configurar un departamento de contraespionaje con alta seguridad
      const contraespionaje: DepartamentoContraespionaje = {
        empresaId: 'empresa_test_2',
        nivelSeguridadGeneral: 5, // Máxima seguridad
        presupuestoAsignado: 50000,
        agentesContraespionaje: [], // Simplificar, enfocar en seguridad pasiva
        protocolosActivos: ['vigilancia_exhaustiva', 'control_accesos_estricto'],
        historialDetecciones: [],
        capacidadInvestigacion: 100,
        ultimaActualizacionRecursos: 0
      };

      // Crear agente y misión de prueba (agente con baja habilidad para aumentar detección)
      const agentePrueba: AgenteEspionaje = {
        id: 'agente_detectable_1', nombre: 'Agente Detectable', especialidad: EspecialidadAgente.SABOTAJE,
        nivelHabilidad: 1, lealtad: 2, costoMensual: 2000, experiencia: 10, notoriedad: 80, estado: EstadoAgente.DISPONIBLE
      };
      this.gestorAgentes.agregarAgenteReclutado(agentePrueba); // Añadir para que esté disponible

      const misionPrueba = this.gestorMisiones.crearMision({
        tipo: TipoMisionEspionaje.SABOTAJE, objetivoEmpresaId: 'empresa_test_2',
        objetivoEspecifico: 'maquinaria_principal', agenteAsignadoId: agentePrueba.id,
        duracionEstimada: 3, costoOperacion: 5000
      });
      this.sistemaContraespionaje.activarProtocoloRespuesta(misionPrueba.id, 'empresa_test_2');

      const probabilidadDeteccion = this.sistemaContraespionaje.calcularProbabilidadDeteccion(
        misionPrueba,
        agentePrueba,
        contraespionaje // Usar el departamento de contraespionaje configurado
      );

      // Validar rango de probabilidadDeteccion (singular)
      if (probabilidadDeteccion < 0 || probabilidadDeteccion > 100) {
        this.registrarError('deteccion_misiones',
          `Probabilidad de detección calculada fuera de rango (0-100): ${probabilidadDeteccion.toFixed(2)}`);
        return; // Return if out of range as further checks might be invalid
      }

      // Verificar que la probabilidad de detección es mayor con alta seguridad
      // (Esta es una prueba lógica, no de rango estricto)
      if (probabilidadDeteccion <= 5) { // Umbral bajo para comparación
        this.registrarError('deteccion_misiones', 
          `Probabilidad de detección inesperadamente baja (${probabilidadDeteccion.toFixed(2)}%) con alta seguridad`);
      }

      // Simular una detección
      const detectado = this.sistemaContraespionaje.intentarDetectarMision(
        misionPrueba,
        agentePrueba,
        probabilidadDeteccion
      );

      if (detectado) {
        // Si se detecta, verificar que la misión se marca como DESCUBIERTA
        const misionActualizada = this.gestorMisiones.obtenerMision(misionPrueba.id);
        if (misionActualizada?.estado !== EstadoMision.DESCUBIERTA) {
          this.registrarError('deteccion_misiones', 
            `Misión detectada pero no marcada como DESCUBIERTA. Estado actual: ${misionActualizada?.estado}`);
        }
      } else {
        // Si no se detecta, podría ser un resultado válido dependiendo de la probabilidad
        // No se registra error aquí a menos que la probabilidad fuera del 100%
        if (probabilidadDeteccion === 100) {
            this.registrarError('deteccion_misiones', 
            `Misión no detectada a pesar de probabilidad de detección del 100%`);
        }
      }
      
      this.marcarExito('deteccion_misiones');
    } catch (error) {
      this.registrarError('deteccion_misiones', `Excepción: ${error.message}`);
    }
  }

  private validarResultadosMisiones(): void {
    console.log("Validando resultados de misiones...");
    try {
      // Crear agente y misión de prueba
      const agentesDisponibles = this.gestorAgentes.generarAgentesDisponibles(1);
      if (agentesDisponibles.length === 0) {
        this.registrarError('resultados_misiones', 'No se pudieron generar agentes para la prueba');
        return;
      }
      const agente = this.gestorAgentes.reclutarAgente(agentesDisponibles[0].id);
      
      const mision = this.gestorMisiones.crearMision({
        tipo: TipoMisionEspionaje.INFILTRACION,
        objetivoEmpresaId: 'empresa_objetivo_3',
        objetivoEspecifico: 'sala_servidores',
        agenteAsignadoId: agente.id,
        duracionEstimada: 7,
        costoOperacion: 15000
      });
      this.gestorMisiones.iniciarMision(mision.id);
      
      // Simular tiempo hasta finalización
      for (let i = 0; i < mision.duracionEstimada + 1; i++) { // +1 para asegurar finalización
        this.gestorMisiones.actualizarMisionesEnProgreso();
      }
      
      const misionFinalizada = this.gestorMisiones.obtenerMision(mision.id);
      
      // Verificar que la misión tiene un resultado
      if (!misionFinalizada.resultado) {
        this.registrarError('resultados_misiones', 
          `La misión finalizada no tiene un objeto de resultado: ${JSON.stringify(misionFinalizada)}`);
        return;
      }
      
      // Verificar que el resultado tiene los campos esperados
      const resultado = misionFinalizada.resultado;
      if (typeof resultado.exito !== 'boolean' || 
          typeof resultado.detectado !== 'boolean' ||
          !resultado.tipoResultado ||
          !Array.isArray(resultado.datosObtenidos)) {
        this.registrarError('resultados_misiones', 
          `El objeto de resultado tiene un formato incorrecto: ${JSON.stringify(resultado)}`);
        return;
      }
      
      // Verificar consistencia del resultado con el estado de la misión
      if (resultado.exito && misionFinalizada.estado !== EstadoMision.COMPLETADA) {
        this.registrarError('resultados_misiones', 
          `Resultado exitoso pero estado de misión es ${misionFinalizada.estado}`);
      }
      if (!resultado.exito && resultado.detectado && misionFinalizada.estado !== EstadoMision.DESCUBIERTA) {
         this.registrarError('resultados_misiones', 
          `Resultado no exitoso y detectado, pero estado de misión es ${misionFinalizada.estado}`);
      }
      if (!resultado.exito && !resultado.detectado && misionFinalizada.estado !== EstadoMision.FALLIDA) {
         this.registrarError('resultados_misiones', 
          `Resultado no exitoso y no detectado, pero estado de misión es ${misionFinalizada.estado}`);
      }
      
      this.marcarExito('resultados_misiones');
    } catch (error) {
      this.registrarError('resultados_misiones', `Excepción: ${error.message}`);
    }
  }
  
  private validarConsecuenciasAgentes(): void {
    console.log("Validando consecuencias para agentes...");
    try {
      // Crear y ejecutar una misión que probablemente resulte en captura (baja habilidad, alta notoriedad)
      const agenteRiesgo: AgenteEspionaje = {
        id: 'agente_riesgo_1', nombre: 'Agente de Alto Riesgo', especialidad: EspecialidadAgente.INFILTRACION,
        nivelHabilidad: 1, lealtad: 1, costoMensual: 1000, experiencia: 5, notoriedad: 90, estado: EstadoAgente.DISPONIBLE
      };
      this.gestorAgentes.agregarAgenteReclutado(agenteRiesgo);

      const misionPeligrosa = this.gestorMisiones.crearMision({
        tipo: TipoMisionEspionaje.INFILTRACION, objetivoEmpresaId: 'empresa_segura_1',
        objetivoEspecifico: 'documentos_criticos', agenteAsignadoId: agenteRiesgo.id,
        duracionEstimada: 2, costoOperacion: 2000
      });
      
      // Forzar un resultado de misión descubierta para probar consecuencias
      this.gestorMisiones.forzarResultadoMision(misionPeligrosa.id, {
        exito: false,
        detectado: true,
        tipoResultado: 'Misión descubierta por seguridad interna',
        datosObtenidos: [],
        informacionAdicional: 'El agente fue identificado y capturado.'
      } as ResultadoMision);
      
      const agenteActualizado = this.gestorAgentes.obtenerAgente(agenteRiesgo.id);
      
      // Verificar que el agente está en estado CAPTURADO o INACTIVO
      if (agenteActualizado.estado !== EstadoAgente.CAPTURADO && agenteActualizado.estado !== EstadoAgente.INACTIVO) {
        this.registrarError('consecuencias_agentes', 
          `Estado incorrecto del agente tras misión descubierta: ${agenteActualizado.estado}`);
        return;
      }
      
      // Verificar si la notoriedad aumentó (si no fue capturado y quedó inactivo)
      if (agenteActualizado.estado === EstadoAgente.INACTIVO && agenteActualizado.notoriedad <= agenteRiesgo.notoriedad) {
         this.registrarError('consecuencias_agentes', 
          `Notoriedad del agente no aumentó tras misión fallida y detectada (pero no capturado)`);
      }

      this.marcarExito('consecuencias_agentes');
    } catch (error) {
      this.registrarError('consecuencias_agentes', `Excepción: ${error.message}`);
    }
  }

  private validarConsecuenciasEmpresas(): void {
    console.log("Validando consecuencias para empresas...");
    try {
      // Simular una misión de sabotaje exitosa
      const misionSabotaje: MisionEspionaje = {
        id: 'mision_sabotaje_1', tipo: TipoMisionEspionaje.SABOTAJE,
        objetivoEmpresaId: 'empresa_victima_1', objetivoEspecifico: 'linea_ensamblaje_A',
        agenteAsignadoId: 'agente_saboteador_1', duracionEstimada: 3, costoOperacion: 20000,
        estado: EstadoMision.COMPLETADA, // Forzar completada
        probabilidadExito: 100, probabilidadDeteccion: 0, // Forzar éxito sin detección
        resultado: {
          exito: true, detectado: false, tipoResultado: 'Sabotaje exitoso',
          datosObtenidos: [{ tipo: 'confirmacion_sabotaje', contenido: 'Daño crítico infligido' }],
          informacionAdicional: 'La línea de ensamblaje A ha sido detenida por 48 horas.'
        }
      };
      
      // Aplicar consecuencias a la empresa objetivo
      this.sistemaEspionaje.aplicarConsecuenciasMision(misionSabotaje);
      
      // Verificar impacto económico (simulado)
      const impactoEconomico = this.integracionEconomico.obtenerImpactoFinanciero('empresa_victima_1', 'sabotaje_produccion');
      if (impactoEconomico >= 0) { // Esperamos un impacto negativo (pérdida)
        this.registrarError('consecuencias_empresas', 
          `Impacto económico de sabotaje no es negativo o no se registró: ${impactoEconomico}`);
        return;
      }
      
      // Verificar impacto en producción (simulado)
      const reduccionProduccion = this.integracionProduccion.obtenerReduccionCapacidad('empresa_victima_1', 'linea_ensamblaje_A');
      if (reduccionProduccion <= 0) { // Esperamos una reducción
        this.registrarError('consecuencias_empresas', 
          `Reducción de producción por sabotaje no es positiva o no se registró: ${reduccionProduccion}`);
        return;
      }
      
      this.marcarExito('consecuencias_empresas');
    } catch (error) {
      this.registrarError('consecuencias_empresas', `Excepción: ${error.message}`);
    }
  }
  
  private validarIntegracionEconomica(): void {
    console.log("Validando integración económica...");
    try {
      // Simular robo de tecnología y verificar impacto en I+D de la empresa atacante
      const misionRoboTec: MisionEspionaje = {
        id: 'mision_robo_tec_1', tipo: TipoMisionEspionaje.ROBO_TECNOLOGIA,
        objetivoEmpresaId: 'empresa_objetivo_tec', objetivoEspecifico: 'formula_nueva_aleacion',
        agenteAsignadoId: 'agente_ladron_tec_1', duracionEstimada: 10, costoOperacion: 50000,
        estado: EstadoMision.COMPLETADA,
        probabilidadExito: 100, probabilidadDeteccion: 0,
        empresaEjecutoraId: 'empresa_atacante_tec', // Empresa que se beneficia
        resultado: {
          exito: true, detectado: false, tipoResultado: 'Tecnología robada con éxito',
          datosObtenidos: [{ tipo: 'formula_quimica', contenido: 'XYZ...' }],
          informacionAdicional: 'La fórmula completa ha sido adquirida.'
        }
      };
      
      this.sistemaEspionaje.aplicarConsecuenciasMision(misionRoboTec);
      
      const avanceID = this.integracionEconomico.obtenerAvanceInvestigacion('empresa_atacante_tec', 'nueva_aleacion');
      if (avanceID <= 0) {
        this.registrarError('integracion_economica', 
          `No se registró avance en I+D para empresa atacante tras robo de tecnología: ${avanceID}`);
        return;
      }
      
      this.marcarExito('integracion_economica');
    } catch (error) {
      this.registrarError('integracion_economica', `Excepción: ${error.message}`);
    }
  }

  private validarIntegracionProduccion(): void {
    console.log("Validando integración con sistema de producción...");
    try {
      // Simular misión de disrupción logística y verificar impacto
       const misionDisrupcion: MisionEspionaje = {
        id: 'mision_disrupcion_1', tipo: TipoMisionEspionaje.DISRUPCION_LOGISTICA,
        objetivoEmpresaId: 'empresa_logistica_objetivo', objetivoEspecifico: 'centro_distribucion_principal',
        agenteAsignadoId: 'agente_disruptor_1', duracionEstimada: 4, costoOperacion: 25000,
        estado: EstadoMision.COMPLETADA,
        probabilidadExito: 100, probabilidadDeteccion: 0,
        empresaEjecutoraId: 'empresa_disruptora',
        resultado: {
          exito: true, detectado: false, tipoResultado: 'Logística interrumpida',
          datosObtenidos: [{ tipo: 'informe_logistico', contenido: 'Rutas bloqueadas, almacenes inaccesibles' }],
          informacionAdicional: 'El centro de distribución estará inoperativo por 3 días.'
        }
      };
      
      this.sistemaEspionaje.aplicarConsecuenciasMision(misionDisrupcion);
      
      const retrasoEntregas = this.integracionProduccion.obtenerRetrasoLogistico('empresa_logistica_objetivo');
      if (retrasoEntregas <= 0) {
        this.registrarError('integracion_produccion', 
          `No se registró retraso logístico tras misión de disrupción: ${retrasoEntregas}`);
        return;
      }
      
      this.marcarExito('integracion_produccion');
    } catch (error) {
      this.registrarError('integracion_produccion', `Excepción: ${error.message}`);
    }
  }
  
  private validarIntegracionNPCs(): void {
    console.log("Validando integración con NPCs y reputación...");
    try {
      // Simular misión de desprestigio contra un CEO de NPC
      const misionDesprestigio: MisionEspionaje = {
        id: 'mision_desprestigio_ceo', tipo: TipoMisionEspionaje.DESPRESTIGIO,
        objetivoEmpresaId: 'empresa_ceo_npc', objetivoEspecifico: 'CEO_NPC_JuanPerez', // ID del NPC objetivo
        agenteAsignadoId: 'agente_relaciones_publicas_negativas_1', duracionEstimada: 6, costoOperacion: 30000,
        estado: EstadoMision.COMPLETADA,
        probabilidadExito: 100, probabilidadDeteccion: 0,
        empresaEjecutoraId: 'empresa_atacante_npc',
        resultado: {
          exito: true, detectado: false, tipoResultado: 'Campaña de desprestigio exitosa',
          datosObtenidos: [{ tipo: 'dosier_falso', contenido: 'Pruebas fabricadas de mala gestión' }],
          informacionAdicional: 'La reputación del CEO ha sido severamente dañada.'
        }
      };
      
      this.sistemaEspionaje.aplicarConsecuenciasMision(misionDesprestigio);
      
      const reputacionCEO = this.integracionNPCs.obtenerReputacionNPC('CEO_NPC_JuanPerez');
      if (reputacionCEO >= 50) { // Suponiendo que 50 es neutral y esperamos < 50
        this.registrarError('integracion_npcs', 
          `Reputación del CEO no disminuyó como se esperaba tras misión de desprestigio: ${reputacionCEO}`);
        return;
      }
      
      this.marcarExito('integracion_npcs');
    } catch (error) {
      this.registrarError('integracion_npcs', `Excepción: ${error.message}`);
    }
  }
  
  private validarContraespionaje(): void {
    console.log("Validando sistema de contraespionaje...");
    try {
      // Configurar un departamento de contraespionaje
      const deptoContra = this.sistemaContraespionaje.establecerDepartamento('empresa_protegida_1', 3, 30000);
      if (!deptoContra || deptoContra.nivelSeguridadGeneral !== 3) {
        this.registrarError('contraespionaje', 'No se pudo establecer el departamento de contraespionaje correctamente.');
        return;
      }
      
      // Intentar una misión contra la empresa protegida
      const agenteAtacante: AgenteEspionaje = {
        id: 'agente_atacante_intel_1', nombre: 'Atacante Intel', especialidad: EspecialidadAgente.INFORMACION,
        nivelHabilidad: 4, lealtad: 5, costoMensual: 6000, experiencia: 150, notoriedad: 10, estado: EstadoAgente.DISPONIBLE
      };
      this.gestorAgentes.agregarAgenteReclutado(agenteAtacante);

      const misionAtaque = this.gestorMisiones.crearMision({
        tipo: TipoMisionEspionaje.RECOPILACION_INFO, objetivoEmpresaId: 'empresa_protegida_1',
        objetivoEspecifico: 'planes_expansion', agenteAsignadoId: agenteAtacante.id,
        duracionEstimada: 5, costoOperacion: 10000
      });
      
      // Calcular probabilidad de detección con el departamento activo
      const probDeteccionConDepto = this.sistemaContraespionaje.calcularProbabilidadDeteccion(
        misionAtaque, 
        agenteAtacante,
        deptoContra
      );
      
      // Calcular sin departamento (o con uno muy básico)
      const probDeteccionSinDepto = this.sistemaContraespionaje.calcularProbabilidadDeteccion(
        misionAtaque,
        agenteAtacante,
        { nivelSeguridadGeneral: 0 } as DepartamentoContraespionaje // Simular sin seguridad
      );
      
      if (probDeteccionConDepto <= probDeteccionSinDepto) {
        this.registrarError('contraespionaje', 
          `El departamento de contraespionaje no aumenta la probabilidad de detección: ConDepto=${probDeteccionConDepto}, SinDepto=${probDeteccionSinDepto}`);
        return;
      }
      
      this.marcarExito('contraespionaje');
    } catch (error) {
      this.registrarError('contraespionaje', `Excepción: ${error.message}`);
    }
  }
  
  private validarInterfazUsuario(): void {
    console.log("Validando simulación de interacciones de UI (lógica subyacente)...");
    // Esta prueba es más conceptual, validando que los datos necesarios para la UI
    // puedan ser recuperados y tengan sentido.
    try {
      // Obtener lista de agentes para UI
      const agentesUI = this.gestorAgentes.obtenerAgentesReclutados();
      if (!Array.isArray(agentesUI)) {
        this.registrarError('interfaz_usuario', 'No se pudo obtener la lista de agentes para la UI.');
        return;
      }
      if (agentesUI.length > 0) {
        const primerAgente = agentesUI[0];
        if (!primerAgente.id || !primerAgente.nombre || typeof primerAgente.estado === 'undefined') {
           this.registrarError('interfaz_usuario', `Formato incorrecto de agente para UI: ${JSON.stringify(primerAgente)}`);
           return;
        }
      }
      
      // Obtener lista de misiones para UI
      const misionesUI = this.gestorMisiones.obtenerTodasLasMisiones();
       if (!Array.isArray(misionesUI)) {
        this.registrarError('interfaz_usuario', 'No se pudo obtener la lista de misiones para la UI.');
        return;
      }
       if (misionesUI.length > 0) {
        const primeraMision = misionesUI[0];
        if (!primeraMision.id || !primeraMision.tipo || typeof primeraMision.estado === 'undefined') {
           this.registrarError('interfaz_usuario', `Formato incorrecto de misión para UI: ${JSON.stringify(primeraMision)}`);
           return;
        }
      }
      
      this.marcarExito('interfaz_usuario');
    } catch (error) {
      this.registrarError('interfaz_usuario', `Excepción: ${error.message}`);
    }
  }
}

// Ejemplo de ejecución de la validación (opcional, para pruebas directas)
/*
const validator = new EspionageValidator();
const resultadosCompletos = validator.ejecutarValidacionCompleta();
console.log("\n--- RESULTADOS FINALES DETALLADOS ---");
console.log("Pruebas Exitosas:", Array.from(resultadosCompletos.resultados.entries()).filter(e => e[1]).map(e => e[0]));
console.log("Pruebas Fallidas:", Array.from(resultadosCompletos.resultados.entries()).filter(e => !e[1]).map(e => e[0]));
resultadosCompletos.errores.forEach((errores, prueba) => {
  if (errores.length > 0) {
    console.log(`\nErrores en ${prueba}:`);
    errores.forEach(err => console.log(`  - ${err}`));
  }
});
console.log("\n--- FIN DEL REPORTE DE VALIDACIÓN ---");
*/
// Asegurar que haya una línea nueva al final del archivo.
