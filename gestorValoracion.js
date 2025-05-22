"use strict";
// Sistema de Fusiones y Adquisiciones - Valoración de Empresas
Object.defineProperty(exports, "__esModule", { value: true });
exports.GestorValoracion = void 0;
const fusionesTypes_1 = require("./fusionesTypes");
/**
 * Clase para gestionar la valoración de empresas
 * Implementa diferentes métodos de valoración para determinar el precio justo
 * de una empresa objetivo en procesos de fusión y adquisición.
 */
class GestorValoracion {
    /**
     * Realiza una valoración completa de una empresa utilizando múltiples métodos
     * @param empresaId ID de la empresa a valorar
     * @param datosFinancieros Datos financieros de la empresa
     * @param datosActivos Información sobre los activos de la empresa
     * @param datosProduccion Datos de producción y operaciones
     * @param datosComerciales Datos de mercado y ventas
     * @returns Objeto de valoración completo
     */
    valorarEmpresa(empresaId, datosFinancieros, datosActivos, datosProduccion, datosComerciales) {
        // Calcular valoraciones por diferentes métodos
        const valoracionEBITDA = this.valorarPorMultiploEBITDA(datosFinancieros);
        const valoracionFlujo = this.valorarPorFlujoCaja(datosFinancieros, datosProduccion);
        const valoracionActivos = this.valorarPorActivos(datosActivos, datosFinancieros);
        const valoracionMercado = this.valorarPorMercado(datosComerciales, datosFinancieros);
        // Determinar el método principal a utilizar basado en la calidad de los datos
        // y el tipo de empresa (producción, comercial, etc.)
        const metodoOptimo = this.determinarMetodoOptimo(datosFinancieros, datosActivos, datosProduccion, datosComerciales);
        // Obtener el valor según el método óptimo
        let valorPrincipal = 0;
        let multiplicador = 0;
        let tasaDescuento = 0;
        switch (metodoOptimo) {
            case fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA:
                valorPrincipal = valoracionEBITDA.valor;
                multiplicador = valoracionEBITDA.multiplicador;
                break;
            case fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO:
                valorPrincipal = valoracionFlujo.valor;
                tasaDescuento = valoracionFlujo.tasaDescuento;
                break;
            case fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS:
                valorPrincipal = valoracionActivos.valor;
                break;
            case fusionesTypes_1.MetodoValoracion.VALOR_MERCADO:
                valorPrincipal = valoracionMercado.valor;
                break;
        }
        // Calcular factores de ajuste basados en condiciones específicas
        const factoresAjuste = this.calcularFactoresAjuste(datosFinancieros, datosActivos, datosProduccion, datosComerciales);
        // Aplicar factores de ajuste al valor principal
        const valorAjustado = this.aplicarFactoresAjuste(valorPrincipal, factoresAjuste);
        // Calcular valor por acción si corresponde
        const valorPorAccion = datosFinancieros.accionesEmitidas
            ? valorAjustado / datosFinancieros.accionesEmitidas
            : undefined;
        // Construir y retornar el objeto de valoración completo
        return {
            empresaId,
            fechaValoracion: Date.now(),
            valorTotal: valorAjustado,
            valorPorAccion,
            metodoValoracion: metodoOptimo,
            multiplicador: multiplicador || undefined,
            tasaDescuento: tasaDescuento || undefined,
            detallesValoracion: {
                valorActivos: datosActivos.valorTotal || 0,
                valorPasivos: datosFinancieros.pasivosTotal || 0,
                ebitdaAnual: datosFinancieros.ebitdaAnual,
                flujoCajaProyectado: valoracionFlujo.flujosProyectados,
                valorMercado: valoracionMercado.valorMercado
            },
            factoresAjuste
        };
    }
    /**
     * Valoración por múltiplo de EBITDA
     * Método común para empresas con flujos de caja estables
     */
    valorarPorMultiploEBITDA(datosFinancieros) {
        // Obtener EBITDA anual
        const ebitda = datosFinancieros.ebitdaAnual || 0;
        // Determinar multiplicador basado en el sector y crecimiento
        let multiplicador = 5; // Valor base
        // Ajustar multiplicador según sector
        if (datosFinancieros.sector === 'tecnologia') {
            multiplicador = 8;
        }
        else if (datosFinancieros.sector === 'manufactura') {
            multiplicador = 6;
        }
        else if (datosFinancieros.sector === 'retail') {
            multiplicador = 4;
        }
        // Ajustar por crecimiento
        if (datosFinancieros.tasaCrecimientoAnual > 0.2) {
            multiplicador += 2;
        }
        else if (datosFinancieros.tasaCrecimientoAnual > 0.1) {
            multiplicador += 1;
        }
        // Calcular valor
        const valor = ebitda * multiplicador;
        return {
            valor,
            multiplicador
        };
    }
    /**
     * Valoración por flujo de caja descontado
     * Método sofisticado que considera el valor presente de flujos futuros
     */
    valorarPorFlujoCaja(datosFinancieros, datosProduccion) {
        // Proyectar flujos de caja para los próximos 5 años
        const flujosProyectados = this.proyectarFlujosCaja(datosFinancieros, datosProduccion, 5);
        // Determinar tasa de descuento (WACC - Weighted Average Cost of Capital)
        const tasaDescuento = this.calcularTasaDescuento(datosFinancieros);
        // Calcular valor presente de los flujos proyectados
        let valorPresente = 0;
        for (let i = 0; i < flujosProyectados.length; i++) {
            valorPresente += flujosProyectados[i] / Math.pow(1 + tasaDescuento, i + 1);
        }
        // Calcular valor terminal (perpetuidad con crecimiento)
        const tasaCrecimientoPerpetuo = 0.02; // 2% de crecimiento perpetuo
        const ultimoFlujo = flujosProyectados[flujosProyectados.length - 1];
        const valorTerminal = ultimoFlujo * (1 + tasaCrecimientoPerpetuo) /
            (tasaDescuento - tasaCrecimientoPerpetuo);
        // Descontar valor terminal
        const valorTerminalPresente = valorTerminal /
            Math.pow(1 + tasaDescuento, flujosProyectados.length);
        // Valor total = Valor presente de flujos + Valor terminal presente
        const valor = valorPresente + valorTerminalPresente;
        return {
            valor,
            tasaDescuento,
            flujosProyectados
        };
    }
    /**
     * Valoración por valor de activos
     * Útil para empresas con muchos activos tangibles
     */
    valorarPorActivos(datosActivos, datosFinancieros) {
        // Valor de activos tangibles
        const activosTangibles = datosActivos.valorTotal || 0;
        // Valor de activos intangibles (marcas, patentes, etc.)
        const activosIntangibles = datosActivos.valorIntangibles || 0;
        // Restar pasivos
        const pasivos = datosFinancieros.pasivosTotal || 0;
        // Calcular valor neto
        const valor = activosTangibles + activosIntangibles - pasivos;
        return {
            valor,
            activosTangibles,
            activosIntangibles,
            pasivos
        };
    }
    /**
     * Valoración por valor de mercado
     * Basado en transacciones comparables y métricas de mercado
     */
    valorarPorMercado(datosComerciales, datosFinancieros) {
        let valorMercado = 0;
        // Si la empresa cotiza en bolsa, usar capitalización de mercado
        if (datosFinancieros.cotizaEnBolsa) {
            valorMercado = datosFinancieros.precioAccion * datosFinancieros.accionesEmitidas;
        }
        // Si no cotiza, estimar basado en transacciones comparables
        else {
            // Obtener múltiplo promedio del sector
            const multiploSector = this.obtenerMultiploSector(datosComerciales.sector);
            // Aplicar múltiplo a ingresos o beneficios
            if (datosFinancieros.beneficioNeto > 0) {
                valorMercado = datosFinancieros.beneficioNeto * multiploSector.pe;
            }
            else {
                valorMercado = datosFinancieros.ingresoAnual * multiploSector.ps;
            }
        }
        return {
            valor: valorMercado,
            valorMercado
        };
    }
    /**
     * Determina el método de valoración óptimo según las características de la empresa
     */
    determinarMetodoOptimo(datosFinancieros, datosActivos, datosProduccion, datosComerciales) {
        // Verificar calidad de datos para cada método
        const calidadDatosEBITDA = this.evaluarCalidadDatosEBITDA(datosFinancieros);
        const calidadDatosFlujo = this.evaluarCalidadDatosFlujo(datosFinancieros, datosProduccion);
        const calidadDatosActivos = this.evaluarCalidadDatosActivos(datosActivos);
        const calidadDatosMercado = this.evaluarCalidadDatosMercado(datosComerciales, datosFinancieros);
        // Determinar el tipo de empresa
        const tipoEmpresa = this.determinarTipoEmpresa(datosFinancieros, datosActivos, datosProduccion, datosComerciales);
        // Matriz de decisión basada en tipo de empresa y calidad de datos
        const matrizDecision = {
            'produccion': {
                [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: 0.3,
                [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: 0.4,
                [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: 0.2,
                [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: 0.1
            },
            'comercial': {
                [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: 0.4,
                [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: 0.3,
                [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: 0.1,
                [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: 0.2
            },
            'tecnologia': {
                [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: 0.2,
                [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: 0.5,
                [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: 0.1,
                [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: 0.2
            },
            'inmobiliaria': {
                [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: 0.1,
                [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: 0.2,
                [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: 0.6,
                [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: 0.1
            }
        };
        // Pesos por defecto si no se encuentra el tipo de empresa
        const pesosPorDefecto = {
            [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: 0.25,
            [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: 0.25,
            [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: 0.25,
            [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: 0.25
        };
        // Obtener pesos según tipo de empresa
        const pesos = matrizDecision[tipoEmpresa] || pesosPorDefecto;
        // Calcular puntuación para cada método
        const puntuaciones = {
            [fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA]: calidadDatosEBITDA * pesos[fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA],
            [fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO]: calidadDatosFlujo * pesos[fusionesTypes_1.MetodoValoracion.FLUJO_CAJA_DESCONTADO],
            [fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS]: calidadDatosActivos * pesos[fusionesTypes_1.MetodoValoracion.VALOR_ACTIVOS],
            [fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]: calidadDatosMercado * pesos[fusionesTypes_1.MetodoValoracion.VALOR_MERCADO]
        };
        // Encontrar el método con mayor puntuación
        let metodoOptimo = fusionesTypes_1.MetodoValoracion.MULTIPLO_EBITDA;
        let puntuacionMaxima = 0;
        for (const [metodo, puntuacion] of Object.entries(puntuaciones)) {
            if (puntuacion > puntuacionMaxima) {
                puntuacionMaxima = puntuacion;
                metodoOptimo = metodo;
            }
        }
        return metodoOptimo;
    }
    /**
     * Calcula factores de ajuste basados en condiciones específicas de la empresa
     */
    calcularFactoresAjuste(datosFinancieros, datosActivos, datosProduccion, datosComerciales) {
        const factores = [];
        // Factor por crecimiento
        if (datosFinancieros.tasaCrecimientoAnual > 0.2) {
            factores.push({
                nombre: 'Alto crecimiento',
                descripcion: 'La empresa muestra un crecimiento superior al 20% anual',
                porcentajeAjuste: 0.15
            });
        }
        else if (datosFinancieros.tasaCrecimientoAnual < 0) {
            factores.push({
                nombre: 'Decrecimiento',
                descripcion: 'La empresa muestra un decrecimiento en sus resultados',
                porcentajeAjuste: -0.1
            });
        }
        // Factor por deuda
        const ratioDeuda = datosFinancieros.pasivosTotal / datosFinancieros.activosTotal;
        if (ratioDeuda > 0.7) {
            factores.push({
                nombre: 'Alto endeudamiento',
                descripcion: 'La empresa tiene un ratio de endeudamiento superior al 70%',
                porcentajeAjuste: -0.15
            });
        }
        else if (ratioDeuda < 0.3) {
            factores.push({
                nombre: 'Bajo endeudamiento',
                descripcion: 'La empresa tiene un ratio de endeudamiento inferior al 30%',
                porcentajeAjuste: 0.05
            });
        }
        // Factor por tecnología
        if (datosProduccion.nivelTecnologico > 4) {
            factores.push({
                nombre: 'Tecnología avanzada',
                descripcion: 'La empresa cuenta con tecnología de última generación',
                porcentajeAjuste: 0.1
            });
        }
        // Factor por cuota de mercado
        if (datosComerciales.cuotaMercado > 0.3) {
            factores.push({
                nombre: 'Líder de mercado',
                descripcion: 'La empresa tiene una cuota de mercado superior al 30%',
                porcentajeAjuste: 0.2
            });
        }
        // Factor por diversificación
        if (datosComerciales.lineasProducto > 5) {
            factores.push({
                nombre: 'Alta diversificación',
                descripcion: 'La empresa tiene más de 5 líneas de producto',
                porcentajeAjuste: 0.05
            });
        }
        return factores;
    }
    /**
     * Aplica los factores de ajuste al valor base
     */
    aplicarFactoresAjuste(valorBase, factores) {
        let valorAjustado = valorBase;
        for (const factor of factores) {
            valorAjustado += valorBase * factor.porcentajeAjuste;
        }
        return valorAjustado;
    }
    /**
     * Proyecta flujos de caja futuros basados en datos históricos y tendencias
     */
    proyectarFlujosCaja(datosFinancieros, datosProduccion, años) {
        const flujosProyectados = [];
        // Flujo base (último año)
        const flujoBase = datosFinancieros.flujoCajaOperativo || 0;
        // Tasa de crecimiento estimada
        let tasaCrecimiento = datosFinancieros.tasaCrecimientoAnual || 0.05;
        // Ajustar tasa según tendencias de producción
        if (datosProduccion.tendenciaEficiencia > 0) {
            tasaCrecimiento += 0.02;
        }
        // Proyectar flujos para cada año
        for (let i = 0; i < años; i++) {
            // Aplicar tasa de crecimiento decreciente (más conservador a largo plazo)
            const tasaAjustada = tasaCrecimiento * Math.pow(0.9, i);
            // Calcular flujo para el año
            const flujoAño = flujoBase * Math.pow(1 + tasaAjustada, i + 1);
            flujosProyectados.push(flujoAño);
        }
        return flujosProyectados;
    }
    /**
     * Calcula la tasa de descuento (WACC) para el método de flujo de caja descontado
     */
    calcularTasaDescuento(datosFinancieros) {
        // Costo de capital propio (Ke)
        const tasaLibreRiesgo = 0.03; // 3%
        const betaEmpresa = datosFinancieros.beta || 1;
        const primaRiesgoMercado = 0.05; // 5%
        const costoCapitalPropio = tasaLibreRiesgo + betaEmpresa * primaRiesgoMercado;
        // Costo de deuda (Kd)
        const costoDeuda = datosFinancieros.tasaInteresPromedio || 0.05;
        const tasaImpositiva = datosFinancieros.tasaImpositiva || 0.25;
        const costoDeudaDespuesImpuestos = costoDeuda * (1 - tasaImpositiva);
        // Estructura de capital
        const valorMercadoEquity = datosFinancieros.valorMercadoEquity || 0;
        const valorMercadoDeuda = datosFinancieros.valorMercadoDeuda || 0;
        const valorTotal = valorMercadoEquity + valorMercadoDeuda;
        // Proporciones
        const proporcionEquity = valorMercadoEquity / valorTotal;
        const proporcionDeuda = valorMercadoDeuda / valorTotal;
        // Calcular WACC
        const wacc = (proporcionEquity * costoCapitalPropio) +
            (proporcionDeuda * costoDeudaDespuesImpuestos);
        return wacc;
    }
    /**
     * Obtiene múltiplos de mercado para un sector específico
     */
    obtenerMultiploSector(sector) {
        // Múltiplos por sector (P/E y P/S)
        const multiplosSector = {
            'tecnolo(Content, truncated, due, to, size, limit) { }, : .Use, line, ranges, to, read, chunks
        };
    }
}
exports.GestorValoracion = GestorValoracion;
