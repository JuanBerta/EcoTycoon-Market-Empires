"use strict";
// Sistema de Espionaje Corporativo - Sistema de Contraespionaje
Object.defineProperty(exports, "__esModule", { value: true });
exports.SistemaContraespionaje = void 0;
/**
 * Clase que gestiona las capacidades de contraespionaje de una empresa
 */
class SistemaContraespionaje {
    constructor(sistemaNotificaciones) {
        this.departamentos = new Map();
        this.sistemaNotificaciones = sistemaNotificaciones;
    }
    /**
     * Crea o actualiza un departamento de contraespionaje para una empresa
     * @param empresaId ID de la empresa
     * @param nivelSeguridad Nivel de seguridad general (1-5)
     * @param presupuesto Presupuesto mensual asignado
     * @param personal Cantidad de personal asignado
     * @param tecnologias Array de IDs de tecnologías de seguridad
     * @returns El departamento creado o actualizado
     */
    configurarDepartamento(empresaId, nivelSeguridad, presupuesto, personal, tecnologias) {
        // Verificar si ya existe
        const departamentoExistente = this.departamentos.get(empresaId);
        // Calcular eficiencia de detección
        const eficienciaDeteccion = this.calcularEficienciaDeteccion(nivelSeguridad, presupuesto, personal, tecnologias);
        // Crear o actualizar departamento
        const departamento = {
            empresaId,
            nivelSeguridadGeneral: nivelSeguridad,
            presupuestoMensual: presupuesto,
            personalAsignado: personal,
            tecnologiasSeguridad: tecnologias,
            eficienciaDeteccionCalculada: eficienciaDeteccion,
            historialIncidentes: (departamentoExistente === null || departamentoExistente === void 0 ? void 0 : departamentoExistente.historialIncidentes) || []
        };
        // Guardar en la colección
        this.departamentos.set(empresaId, departamento);
        return departamento;
    }
    /**
     * Intenta detectar una misión de espionaje en curso
     * @param mision Misión a verificar
     * @returns true si la misión es detectada, false si no
     */
    intentarDeteccion(mision) {
        // Obtener departamento de contraespionaje del objetivo
        const departamento = this.departamentos.get(mision.objetivoEmpresaId);
        // Si no hay departamento, probabilidad base de detección
        if (!departamento) {
            // Usar probabilidad base de la misión
            return Math.random() * 100 < mision.probabilidadDeteccionBase;
        }
        // Calcular probabilidad final de detección
        const probabilidadFinal = this.calcularProbabilidadDeteccionFinal(mision.probabilidadDeteccionBase, departamento.eficienciaDeteccionCalculada, mision.tipo);
        // Realizar chequeo de detección
        const detectado = Math.random() * 100 < probabilidadFinal;
        // Si es detectado, registrar en historial
        if (detectado) {
            departamento.historialIncidentes.push(mision.id);
            this.departamentos.set(mision.objetivoEmpresaId, departamento);
            // Notificar detección (si es la empresa del jugador)
            if (mision.objetivoEmpresaId === 'jugador') {
                this.notificarDeteccion(mision);
            }
        }
        return detectado;
    }
    /**
     * Obtiene el departamento de contraespionaje de una empresa
     * @param empresaId ID de la empresa
     * @returns El departamento o undefined si no existe
     */
    obtenerDepartamento(empresaId) {
        return this.departamentos.get(empresaId);
    }
    /**
     * Obtiene el historial de incidentes de una empresa
     * @param empresaId ID de la empresa
     * @returns Array de IDs de misiones detectadas
     */
    obtenerHistorialIncidentes(empresaId) {
        const departamento = this.departamentos.get(empresaId);
        return (departamento === null || departamento === void 0 ? void 0 : departamento.historialIncidentes) || [];
    }
    /**
     * Actualiza todos los departamentos (llamar cada día de juego)
     * @returns Número de departamentos actualizados
     */
    actualizarDepartamentos() {
        // En una implementación real, aquí se podrían actualizar
        // estadísticas, entrenar personal, etc.
        return this.departamentos.size;
    }
    // Métodos privados auxiliares
    calcularEficienciaDeteccion(nivelSeguridad, presupuesto, personal, tecnologias) {
        // Base según nivel de seguridad (1-5)
        let eficiencia = nivelSeguridad * 10; // 10-50 base
        // Factor de presupuesto (asumiendo escala relativa al tamaño de empresa)
        const factorPresupuesto = Math.min(30, presupuesto / 10000); // Hasta +30
        // Factor de personal (cada 10 personas añade 5%, hasta 20%)
        const factorPersonal = Math.min(20, (personal / 10) * 5);
        // Factor de tecnologías (cada tecnología añade 5%, hasta 25%)
        const factorTecnologias = Math.min(25, tecnologias.length * 5);
        // Sumar todos los factores
        eficiencia += factorPresupuesto + factorPersonal + factorTecnologias;
        // Limitar a 0-100
        return Math.max(0, Math.min(100, eficiencia));
    }
    calcularProbabilidadDeteccionFinal(probabilidadBase, eficienciaDeteccion, tipoMision) {
        // La eficiencia de detección modifica la probabilidad base
        // Una eficiencia de 50 no modifica, por encima aumenta, por debajo disminuye
        const factorEficiencia = eficienciaDeteccion / 50;
        // Calcular probabilidad final
        let probabilidadFinal = probabilidadBase * factorEficiencia;
        // Ajustar según tipo de misión (algunos tipos son más difíciles de detectar)
        if (tipoMision === 'recopilacion_info') {
            probabilidadFinal *= 0.8; // 20% menos probable de detectar
        }
        else if (tipoMision === 'sabotaje') {
            probabilidadFinal *= 1.2; // 20% más probable de detectar
        }
        // Limitar a 5-95%
        return Math.max(5, Math.min(95, probabilidadFinal));
    }
    notificarDeteccion(mision) {
        // Crear notificación para el jugador
        this.sistemaNotificaciones.agregarNotificacion({
            titulo: "¡Intento de espionaje detectado!",
            mensaje: `Se ha detectado un intento de espionaje contra su empresa. Tipo: ${mision.tipo}. Su departamento de contraespionaje está investigando.`,
            tipo: "contraespionaje",
            icono: "counterspy_alert"
        });
        // Para casos graves, mostrar notificación emergente
        if (mision.tipo === 'sabotaje' || mision.tipo === 'robo_tecnologia') {
            this.sistemaNotificaciones.mostrarNotificacionEmergente({
                titulo: "¡ALERTA DE SEGURIDAD CRÍTICA!",
                mensaje: `Se ha detectado un intento de ${mision.tipo === 'sabotaje' ? 'sabotaje' : 'robo de tecnología'} contra su empresa. Se recomienda aumentar las medidas de seguridad inmediatamente.`,
                tipo: "contraespionaje_critico",
                icono: "counterspy_critical"
            });
        }
    }
}
exports.SistemaContraespionaje = SistemaContraespionaje;
exports.default = SistemaContraespionaje;
