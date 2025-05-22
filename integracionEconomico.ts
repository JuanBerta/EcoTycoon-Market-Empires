// Integración del Sistema de Espionaje con el Sistema Económico

import { SistemaEspionaje } from './sistemaEspionaje';
import { Efecto } from './espionageTypes';

/**
 * Clase que maneja la integración entre el sistema de espionaje y el sistema económico
 */
export class IntegracionEspionajeEconomico {
  private sistemaEspionaje: SistemaEspionaje;
  private sistemaEconomico: any; // Sistema económico del juego
  
  constructor(sistemaEspionaje: SistemaEspionaje, sistemaEconomico: any) {
    this.sistemaEspionaje = sistemaEspionaje;
    this.sistemaEconomico = sistemaEconomico;
  }
  
  /**
   * Aplica efectos económicos resultantes de operaciones de espionaje
   * @param efectos Lista de efectos a aplicar
   * @param objetivo Objetivo de los efectos (empresa, mercado, etc.)
   * @returns Número de efectos aplicados correctamente
   */
  public aplicarEfectosEconomicos(efectos: Efecto[], objetivo: string): number {
    let efectosAplicados = 0;
    
    efectos.forEach(efecto => {
      switch (efecto.tipo) {
        case 'precio_mercado':
          this.modificarPrecioMercado(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'valor_acciones':
          this.modificarValorAcciones(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'demanda':
          this.modificarDemanda(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'tasa_interes':
          this.modificarTasaInteres(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'impuestos':
          this.modificarImpuestos(efecto.objetivo, Number(efecto.valor), efecto.duracion);
          efectosAplicados++;
          break;
        case 'dinero':
          this.modificarDinero(efecto.objetivo, Number(efecto.valor));
          efectosAplicados++;
          break;
      }
    });
    
    return efectosAplicados;
  }
  
  /**
   * Calcula el costo total de operaciones de espionaje para un período
   * @param diasPeriodo Número de días en el período
   * @returns Costo total en el período
   */
  public calcularCostoOperacionesEspionaje(diasPeriodo: number): number {
    // Costo de agentes
    const costoAgentes = this.sistemaEspionaje.obtenerCostoMensualAgentes() * (diasPeriodo / 30);
    
    // Costo de misiones activas (estimado)
    const misionesActivas = this.sistemaEspionaje.obtenerMisionesActivas();
    const costoMisiones = misionesActivas.reduce((total, mision) => total + mision.costoOperacion, 0);
    
    // Costo de contraespionaje
    const departamento = this.sistemaEspionaje.obtenerDepartamentoContraespionaje();
    const costoContraespionaje = departamento ? 
      departamento.presupuestoMensual * (diasPeriodo / 30) : 0;
    
    return costoAgentes + costoMisiones + costoContraespionaje;
  }
  
  /**
   * Calcula el retorno de inversión de operaciones de espionaje
   * @param diasPeriodo Número de días en el período
   * @returns Porcentaje de ROI
   */
  public calcularROIEspionaje(diasPeriodo: number): number {
    // Costo total
    const costoTotal = this.calcularCostoOperacionesEspionaje(diasPeriodo);
    
    // Beneficios estimados (simplificado)
    const misionesCompletadas = this.sistemaEspionaje.obtenerMisionesCompletadas()
      .filter(m => m.resultado?.exito);
    
    let beneficioEstimado = 0;
    
    misionesCompletadas.forEach(mision => {
      if (mision.resultado?.impactoSabotaje) {
        // Beneficio por sabotaje (daño a competidor)
        beneficioEstimado += 50000; // Valor estimado simplificado
      }
      
      if (mision.resultado?.tecnologiaRobadaId) {
        // Beneficio por tecnología robada
        beneficioEstimado += 200000; // Valor estimado simplificado
      }
      
      if (mision.resultado?.informacionObtenida) {
        // Beneficio por información
        beneficioEstimado += 30000; // Valor estimado simplificado
      }
    });
    
    // Calcular ROI
    return costoTotal > 0 ? ((beneficioEstimado - costoTotal) / costoTotal) * 100 : 0;
  }
  
  // Métodos privados para aplicar efectos específicos
  
  private modificarPrecioMercado(objetivo: string, porcentaje: number, duracion?: number): void {
    this.sistemaEconomico.modificarPrecioMercado(objetivo, porcentaje, duracion);
  }
  
  private modificarValorAcciones(objetivo: string, porcentaje: number, duracion?: number): void {
    this.sistemaEconomico.modificarValorAcciones(objetivo, porcentaje, duracion);
  }
  
  private modificarDemanda(objetivo: string, porcentaje: number, duracion?: number): void {
    this.sistemaEconomico.modificarDemanda(objetivo, porcentaje, duracion);
  }
  
  private modificarTasaInteres(objetivo: string, porcentaje: number, duracion?: number): void {
    this.sistemaEconomico.modificarTasaInteres(objetivo, porcentaje, duracion);
  }
  
  private modificarImpuestos(objetivo: string, porcentaje: number, duracion?: number): void {
    this.sistemaEconomico.modificarImpuestos(objetivo, porcentaje, duracion);
  }
  
  private modificarDinero(objetivo: string, cantidad: number): void {
    this.sistemaEconomico.modificarDinero(objetivo, cantidad);
  }
}

export default IntegracionEspionajeEconomico;
