/**
 * Sistema de Competencia Estratégica - Gestor de Estrategias
 * 
 * Este módulo implementa la lógica para gestionar las diferentes
 * estrategias competitivas que las empresas pueden ejecutar.
 */

import { 
  TipoEstrategiaCompetitiva,
  IntensidadEstrategia,
  EstadoEstrategia,
  TipoRespuestaCompetitiva,
  EstrategiaCompetitiva,
  GuerraPrecios,
  BloqueoRecursos,
  InnovacionDisruptiva,
  MarketingAgresivo,
  ExpansionTerritorial,
  MejoraCalidad,
  Diversificacion
} from './competitionTypes';

/**
 * Clase que gestiona las estrategias competitivas
 */
export class GestorEstrategias {
  private estrategias: Map<string, EstrategiaCompetitiva> = new Map();
  
  constructor() {
    // Inicialización
  }
  
  /**
   * Inicia una nueva estrategia competitiva
   * @param tipo Tipo de estrategia
   * @param empresaEjecutora ID de la empresa que ejecuta
   * @param empresasObjetivo IDs de las empresas objetivo
   * @param duracionPlanificada Duración planificada en días
   * @param intensidad Nivel de intensidad
   * @param inversion Inversión inicial
   * @param detallesEspecificos Detalles específicos según el tipo de estrategia
   * @returns La estrategia creada
   */
  public iniciarEstrategia(
    tipo: TipoEstrategiaCompetitiva,
    empresaEjecutora: string,
    empresasObjetivo: string[],
    duracionPlanificada: number,
    intensidad: IntensidadEstrategia,
    inversion: number,
    detallesEspecificos: any
  ): EstrategiaCompetitiva {
    // Generar ID único para la estrategia
    const id = `estrategia_${tipo}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const fechaActual = Date.now();
    
    // Crear la estrategia base
    let estrategia: EstrategiaCompetitiva = {
      id,
      tipo,
      empresaEjecutora,
      empresasObjetivo,
      fechaInicio: fechaActual,
      duracionPlanificada,
      intensidad,
      estado: EstadoEstrategia.INICIADA,
      progreso: 0,
      inversion,
      costoAcumulado: 0,
      efectosEsperados: [], // Se calcularán según el tipo
      efectosReales: [],
      respuestasCompetidores: [],
      riesgosIdentificados: [], // Se identificarán según el tipo
      informesProgreso: [{
        fecha: fechaActual,
        progreso: 0,
        logros: ["Estrategia iniciada"],
        problemas: []
      }]
    };
    
    // Añadir detalles específicos y calcular efectos/riesgos
    switch (tipo) {
      case TipoEstrategiaCompetitiva.GUERRA_PRECIOS:
        estrategia = this.iniciarGuerraPrecios(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.BLOQUEO_RECURSOS:
        estrategia = this.iniciarBloqueoRecursos(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.INNOVACION_DISRUPTIVA:
        estrategia = this.iniciarInnovacion(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.MARKETING_AGRESIVO:
        estrategia = this.iniciarMarketing(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.EXPANSION_TERRITORIAL:
        estrategia = this.iniciarExpansion(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.MEJORA_CALIDAD:
        estrategia = this.iniciarMejoraCalidad(estrategia, detallesEspecificos);
        break;
      case TipoEstrategiaCompetitiva.DIVERSIFICACION:
        estrategia = this.iniciarDiversificacion(estrategia, detallesEspecificos);
        break;
      default:
        throw new Error(`Tipo de estrategia no soportado: ${tipo}`);
    }
    
    // Almacenar la estrategia
    this.estrategias.set(id, estrategia);
    
    return estrategia;
  }
  
  /**
   * Inicializa los detalles específicos para una Guerra de Precios
   * @param estrategia Estrategia base
   * @param detalles Detalles específicos
   * @returns Estrategia de Guerra de Precios completa
   */
  private iniciarGuerraPrecios(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      productosAfectados: string[];
      reduccionPreciosPorcentaje: number;
      presupuestoSubsidio: number;
      umbralesFinalizacion: {
        cuotaMercadoObjetivo: number;
        competidoresRetirados: number;
        presupuestoMaximo: number;
      };
    }
  ): GuerraPrecios {
    const guerraPrecios: GuerraPrecios = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.GUERRA_PRECIOS,
      productosAfectados: detalles.productosAfectados,
      reduccionPreciosPorcentaje: detalles.reduccionPreciosPorcentaje,
      presupuestoSubsidio: detalles.presupuestoSubsidio,
      presupuestoConsumido: 0,
      impactoEnMercado: {
        cuotaMercadoInicial: 0, // Obtener del sistema de mercado
        cuotaMercadoActual: 0, // Obtener del sistema de mercado
        precioMedioInicial: 0, // Obtener del sistema de mercado
        precioMedioActual: 0 // Obtener del sistema de mercado
      },
      umbralesFinalizacion: detalles.umbralesFinalizacion
    };
    
    // Calcular efectos esperados
    guerraPrecios.efectosEsperados = [
      {
        tipo: "aumento_cuota_mercado",
        descripcion: `Aumento esperado de cuota de mercado hasta ${detalles.umbralesFinalizacion.cuotaMercadoObjetivo}%`,
        valorEstimado: detalles.umbralesFinalizacion.cuotaMercadoObjetivo
      },
      {
        tipo: "reduccion_margenes",
        descripcion: `Reducción de márgenes de beneficio por precios bajos`,
        valorEstimado: -detalles.reduccionPreciosPorcentaje // Impacto negativo
      },
      {
        tipo: "retirada_competidores",
        descripcion: `Retirada esperada de ${detalles.umbralesFinalizacion.competidoresRetirados} competidores`,
        valorEstimado: detalles.umbralesFinalizacion.competidoresRetirados
      }
    ];
    
    // Identificar riesgos
    guerraPrecios.riesgosIdentificados = [
      {
        descripcion: "Guerra de precios prolongada que agota el presupuesto",
        probabilidad: 60,
        impacto: 8,
        materializado: false
      },
      {
        descripcion: "Daño a la imagen de marca por precios bajos",
        probabilidad: 30,
        impacto: 5,
        materializado: false
      },
      {
        descripcion: "Respuesta agresiva de competidores con mayores recursos",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      }
    ];
    
    return guerraPrecios;
  }
  
  /**
   * Inicializa los detalles específicos para un Bloqueo de Recursos
   * @param estrategia Estrategia base
   * @param detalles Detalles específicos
   * @returns Estrategia de Bloqueo de Recursos completa
   */
  private iniciarBloqueoRecursos(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      recursosObjetivo: string[];
      porcentajeMercadoControladoObjetivo: number;
      sobrecosteAdquisicionMaximo: number;
    }
  ): BloqueoRecursos {
    const bloqueoRecursos: BloqueoRecursos = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.BLOQUEO_RECURSOS,
      recursosObjetivo: detalles.recursosObjetivo,
      proveedoresControlados: [],
      porcentajeMercadoControlado: 0,
      sobrecosteAdquisicion: 0,
      impactoEnPreciosMercado: 0,
      reservasAcumuladas: [],
      contratosExclusividad: []
    };
    
    // Calcular efectos esperados
    bloqueoRecursos.efectosEsperados = [
      {
        tipo: "control_mercado_recursos",
        descripcion: `Control esperado del ${detalles.porcentajeMercadoControladoObjetivo}% del mercado de recursos clave`,
        valorEstimado: detalles.porcentajeMercadoControladoObjetivo
      },
      {
        tipo: "aumento_costos_competidores",
        descripcion: `Aumento esperado de los costos de adquisición para competidores`,
        valorEstimado: 20 // 20% de aumento estimado
      },
      {
        tipo: "ventaja_costos_propia",
        descripcion: `Ventaja en costos de producción por acceso preferente a recursos`,
        valorEstimado: 10 // 10% de ventaja estimada
      }
    ];
    
    // Identificar riesgos
    bloqueoRecursos.riesgosIdentificados = [
      {
        descripcion: "Acumulación excesiva de inventario de recursos",
        probabilidad: 40,
        impacto: 6,
        materializado: false
      },
      {
        descripcion: "Investigación por prácticas anticompetitivas",
        probabilidad: 30,
        impacto: 9,
        materializado: false
      },
      {
        descripcion: "Aparición de proveedores alternativos o sustitutos",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      }
    ];
    
    return bloqueoRecursos;
  }
  
  // --- Métodos para otros tipos de estrategias (Innovación, Marketing, etc.) ---
  // Implementar métodos similares: iniciarInnovacion, iniciarMarketing, etc.
  // Cada método debe:
  // 1. Crear el objeto específico (InnovacionDisruptiva, MarketingAgresivo, etc.)
  // 2. Calcular efectosEsperados específicos
  // 3. Identificar riesgosIdentificados específicos
  
  private iniciarInnovacion(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      areaInnovacion: string;
      inversionID: number;
      probabilidadExito: number;
      patentesPotenciales: number;
      ventajaCompetitivaEstimada: number;
    }
  ): InnovacionDisruptiva {
    const innovacion: InnovacionDisruptiva = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.INNOVACION_DISRUPTIVA,
      areaInnovacion: detalles.areaInnovacion,
      inversionID: detalles.inversionID,
      tiempoDesarrollo: estrategia.duracionPlanificada, // Asumimos que la duración es el tiempo de desarrollo
      probabilidadExito: detalles.probabilidadExito,
      patentesPotenciales: detalles.patentesPotenciales,
      patentesConseguidas: 0,
      ventajaCompetitiva: detalles.ventajaCompetitivaEstimada,
      productosResultantes: []
    };

    innovacion.efectosEsperados = [
      {
        tipo: "lanzamiento_producto_innovador",
        descripcion: `Lanzamiento de producto/tecnología disruptiva en ${detalles.areaInnovacion}`,
        valorEstimado: 1 // Representa el lanzamiento exitoso
      },
      {
        tipo: "obtencion_patentes",
        descripcion: `Obtención de ${detalles.patentesPotenciales} patentes clave`,
        valorEstimado: detalles.patentesPotenciales
      },
      {
        tipo: "aumento_cuota_mercado",
        descripcion: `Aumento significativo de cuota de mercado por ventaja competitiva`,
        valorEstimado: 15 // 15% de aumento estimado
      }
    ];

    innovacion.riesgosIdentificados = [
      {
        descripcion: "Fracaso del proyecto de I+D",
        probabilidad: 100 - detalles.probabilidadExito,
        impacto: 9,
        materializado: false
      },
      {
        descripcion: "Competencia imita rápidamente la innovación",
        probabilidad: 40,
        impacto: 7,
        materializado: false
      },
      {
        descripcion: "Costos de desarrollo superiores a lo previsto",
        probabilidad: 50,
        impacto: 6,
        materializado: false
      }
    ];

    return innovacion;
  }

  private iniciarMarketing(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      canales: string[];
      presupuesto: number;
      alcanceEstimado: number;
      conversionEstimada: number;
      mensajesPrincipales: string[];
      comparativaCompetidores: boolean;
    }
  ): MarketingAgresivo {
    const marketing: MarketingAgresivo = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.MARKETING_AGRESIVO,
      canales: detalles.canales,
      presupuesto: detalles.presupuesto,
      gastosAcumulados: 0,
      alcanceEstimado: detalles.alcanceEstimado,
      alcanceReal: 0,
      impactoEnMarca: 0,
      conversionEstimada: detalles.conversionEstimada,
      conversionReal: 0,
      mensajesPrincipales: detalles.mensajesPrincipales,
      comparativaCompetidores: detalles.comparativaCompetidores
    };

    marketing.efectosEsperados = [
      {
        tipo: "aumento_notoriedad_marca",
        descripcion: `Aumento de notoriedad de marca hasta un ${detalles.alcanceEstimado / 10000}% estimado`,
        valorEstimado: detalles.alcanceEstimado / 10000
      },
      {
        tipo: "aumento_ventas",
        descripcion: `Aumento de ventas por conversión del ${detalles.conversionEstimada}%`,
        valorEstimado: detalles.conversionEstimada
      },
      {
        tipo: "mejora_imagen_marca",
        descripcion: `Mejora de la imagen de marca`,
        valorEstimado: 5 // 5 puntos de mejora estimada
      }
    ];

    marketing.riesgosIdentificados = [
      {
        descripcion: "Campaña de marketing ineficaz o con bajo ROI",
        probabilidad: 40,
        impacto: 7,
        materializado: false
      },
      {
        descripcion: "Reacción negativa del público a mensajes agresivos",
        probabilidad: 30,
        impacto: 6,
        materializado: false
      },
      {
        descripcion: "Contra-campaña efectiva de la competencia",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      }
    ];

    return marketing;
  }

  private iniciarExpansion(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      regionesObjetivo: string[];
      inversionPorRegion: { regionId: string; inversion: number }[];
      instalacionesPlanificadas: { tipo: string; cantidad: number }[];
      cuotaObjetivoPorRegion: { regionId: string; cuotaObjetivo: number }[];
    }
  ): ExpansionTerritorial {
    const expansion: ExpansionTerritorial = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.EXPANSION_TERRITORIAL,
      regionesObjetivo: detalles.regionesObjetivo,
      inversionPorRegion: detalles.inversionPorRegion.map(inv => ({ ...inv, gastado: 0, progreso: 0 })),
      instalacionesPlanificadas: detalles.instalacionesPlanificadas.map(inst => ({ ...inst, completadas: 0 })),
      penetracionMercado: detalles.cuotaObjetivoPorRegion.map(cuota => ({ ...cuota, cuotaInicial: 0, cuotaActual: 0 }))
    };

    expansion.efectosEsperados = [
      {
        tipo: "establecimiento_presencia_nuevas_regiones",
        descripcion: `Establecimiento de presencia en ${detalles.regionesObjetivo.length} nuevas regiones`,
        valorEstimado: detalles.regionesObjetivo.length
      },
      {
        tipo: "aumento_cuota_mercado_global",
        descripcion: `Aumento de la cuota de mercado global`,
        valorEstimado: 5 // 5% de aumento global estimado
      },
      {
        tipo: "diversificacion_geografica_ingresos",
        descripcion: `Diversificación geográfica de los ingresos`,
        valorEstimado: 1 // Representa la diversificación
      }
    ];

    expansion.riesgosIdentificados = [
      {
        descripcion: "Costos de expansión superiores a lo previsto",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      },
      {
        descripcion: "Dificultades para adaptarse a mercados locales",
        probabilidad: 40,
        impacto: 6,
        materializado: false
      },
      {
        descripcion: "Fuerte resistencia de competidores locales establecidos",
        probabilidad: 60,
        impacto: 8,
        materializado: false
      }
    ];

    return expansion;
  }

  private iniciarMejoraCalidad(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      productosObjetivo: string[];
      inversionCalidad: number;
      aumentoCalidadEsperado: number;
      certificacionesObjetivo: string[];
      impactoEnPrecio: number;
      impactoEnCostos: number;
    }
  ): MejoraCalidad {
    const mejoraCalidad: MejoraCalidad = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.MEJORA_CALIDAD,
      productosObjetivo: detalles.productosObjetivo,
      inversionCalidad: detalles.inversionCalidad,
      aumentoCalidadEsperado: detalles.aumentoCalidadEsperado,
      aumentoCalidadReal: 0,
      certificacionesObjetivo: detalles.certificacionesObjetivo,
      certificacionesObtenidas: [],
      impactoEnPrecio: detalles.impactoEnPrecio,
      impactoEnCostos: detalles.impactoEnCostos,
      percepcionConsumidores: 0, // Inicializar percepción de consumidores
      feedbackConsumidores: []   // Inicializar feedback de consumidores
    };

    mejoraCalidad.efectosEsperados = [
      {
        tipo: "mejora_calidad_producto",
        descripcion: `Aumento de la calidad percibida del producto en un ${detalles.aumentoCalidadEsperado}%`,
        valorEstimado: detalles.aumentoCalidadEsperado
      },
      {
        tipo: "aumento_precio_venta",
        descripcion: `Posibilidad de aumentar el precio de venta en un ${detalles.impactoEnPrecio}%`,
        valorEstimado: detalles.impactoEnPrecio
      },
      {
        tipo: "obtencion_certificaciones",
        descripcion: `Obtención de certificaciones de calidad: ${detalles.certificacionesObjetivo.join(', ')}`,
        valorEstimado: detalles.certificacionesObjetivo.length
      }
    ];

    mejoraCalidad.riesgosIdentificados = [
      {
        descripcion: "Costos de mejora de calidad superan beneficios",
        probabilidad: 40,
        impacto: 7,
        materializado: false
      },
      {
        descripcion: "Consumidores no perciben o valoran la mejora de calidad",
        probabilidad: 30,
        impacto: 6,
        materializado: false
      },
      {
        descripcion: "Dificultad para mantener consistentemente el nuevo nivel de calidad",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      }
    ];

    return mejoraCalidad;
  }

  private iniciarDiversificacion(
    estrategia: EstrategiaCompetitiva,
    detalles: {
      nuevosProductos: { nombre: string; categoria: string; inversionDesarrollo: number; tiempoDesarrollo: number }[];
      nuevosSegmentos: string[];
      adquisicionesPlanificadas: string[];
    }
  ): Diversificacion {
    const diversificacion: Diversificacion = {
      ...estrategia,
      tipo: TipoEstrategiaCompetitiva.DIVERSIFICACION,
      nuevosProductos: detalles.nuevosProductos.map(p => ({ ...p, progreso: 0, lanzado: false })),
      nuevosSegmentos: detalles.nuevosSegmentos,
      adquisicionesPlanificadas: detalles.adquisicionesPlanificadas,
      adquisicionesCompletadas: [],
      sinergiasPotenciales: 0, // Se calculará en base a adquisiciones y nuevos productos
      riesgosDiversificacion: [] // Se añadirán riesgos específicos
    };

    diversificacion.efectosEsperados = [
      {
        tipo: "entrada_nuevos_mercados",
        descripcion: `Entrada en ${detalles.nuevosProductos.length} nuevos mercados de productos y ${detalles.nuevosSegmentos.length} nuevos segmentos`,
        valorEstimado: detalles.nuevosProductos.length + detalles.nuevosSegmentos.length
      },
      {
        tipo: "reduccion_riesgo_dependencia",
        descripcion: `Reducción del riesgo por dependencia de un solo mercado/producto`,
        valorEstimado: 1 // Representa la reducción del riesgo
      },
      {
        tipo: "aumento_ingresos_totales",
        descripcion: `Aumento potencial de ingresos totales`,
        valorEstimado: 20 // 20% de aumento estimado
      }
    ];

    diversificacion.riesgosIdentificados = [
      {
        descripcion: "Falta de experiencia en nuevos mercados o con nuevos productos",
        probabilidad: 60,
        impacto: 8,
        materializado: false
      },
      {
        descripcion: "Dilución de la marca principal o identidad corporativa",
        probabilidad: 40,
        impacto: 6,
        materializado: false
      },
      {
        descripcion: "Dificultades en la integración de empresas adquiridas",
        probabilidad: 50,
        impacto: 7,
        materializado: false
      }
    ];
    
    // Añadir riesgos específicos por cada nuevo producto
    detalles.nuevosProductos.forEach(p => {
        diversificacion.riesgosIdentificados.push({
            descripcion: `Fracaso en el desarrollo o lanzamiento del nuevo producto: ${p.nombre}`,
            probabilidad: 30, // Probabilidad moderada por producto
            impacto: 7,
            materializado: false
        });
    });

    return diversificacion;
  }
  
  /**
   * Actualiza el progreso y estado de una estrategia
   * @param estrategiaId ID de la estrategia
   * @param diasTranscurridos Días transcurridos desde la última actualización
   * @returns La estrategia actualizada
   */
  public actualizarEstrategia(
    estrategiaId: string,
    diasTranscurridos: number = 1
  ): EstrategiaCompetitiva {
    const estrategia = this.obtenerEstrategia(estrategiaId);
    if (!estrategia || estrategia.estado === EstadoEstrategia.FINALIZADA || estrategia.estado === EstadoEstrategia.CANCELADA) {
      return estrategia;
    }
    
    const fechaActual = Date.now();
    
    // Actualizar costo acumulado (simplificado)
    estrategia.costoAcumulado += (estrategia.inversion / estrategia.duracionPlanificada) * diasTranscurridos;
    
    // Actualizar progreso
    const progresoIncremento = (100 / estrategia.duracionPlanificada) * diasTranscurridos;
    estrategia.progreso = Math.min(100, estrategia.progreso + progresoIncremento);
    
    // Simular efectos reales (simplificado, debería ser más complejo)
    estrategia.efectosReales = estrategia.efectosEsperados.map(efecto => ({
      ...efecto,
      valorRealizado: efecto.valorEstimado * (estrategia.progreso / 100) * (Math.random() * 0.5 + 0.75) // 75%-125% de lo esperado
    }));
    
    // Simular materialización de riesgos (simplificado)
    estrategia.riesgosIdentificados.forEach(riesgo => {
      if (!riesgo.materializado && Math.random() < (riesgo.probabilidad / 100) * (diasTranscurridos / estrategia.duracionPlanificada)) {
        riesgo.materializado = true;
        estrategia.informesProgreso.push({
          fecha: fechaActual,
          progreso: estrategia.progreso,
          logros: [],
          problemas: [`Riesgo materializado: ${riesgo.descripcion}`]
        });
      }
    });
    
    // Actualizar estado si se completa
    if (estrategia.progreso >= 100) {
      estrategia.estado = EstadoEstrategia.FINALIZADA;
      estrategia.duracionReal = (fechaActual - estrategia.fechaInicio) / (1000 * 60 * 60 * 24); // Duración en días
      estrategia.informesProgreso.push({
        fecha: fechaActual,
        progreso: 100,
        logros: ["Estrategia completada"],
        problemas: []
      });
    }
    
    this.estrategias.set(estrategiaId, estrategia);
    return estrategia;
  }
  
  /**
   * Responde a una estrategia de un competidor
   * @param estrategiaId ID de la estrategia a la que se responde
   * @param empresaRespondiente ID de la empresa que responde
   * @param tipoRespuesta Tipo de respuesta
   * @param descripcion Descripción de la respuesta
   * @param efectividad Efectividad estimada de la respuesta
   * @param estrategiaContraataqueId (Opcional) ID de la estrategia de contraataque
   */
  public responderAEstrategia(
    estrategiaId: string,
    empresaRespondiente: string,
    tipoRespuesta: TipoRespuestaCompetitiva,
    descripcion: string,
    efectividad: number, // 0-100
    estrategiaContraataqueId?: string
  ): void {
    const estrategia = this.obtenerEstrategia(estrategiaId);
    if (!estrategia) {
      throw new Error(`Estrategia no encontrada: ${estrategiaId}`);
    }
    
    if (!estrategia.empresasObjetivo.includes(empresaRespondiente) && estrategia.empresaEjecutora !== empresaRespondiente) {
        // Permitir que cualquier empresa responda si no es la ejecutora, 
        // ya que las estrategias pueden tener impacto en todo el mercado.
    }

    estrategia.respuestasCompetidores.push({
      empresaId: empresaRespondiente,
      tipoRespuesta,
      descripcion,
      efectividad,
      estrategiaContraataqueId
    });
    
    // Lógica para ajustar efectividad de la estrategia original basada en la respuesta
    // Por ejemplo, una respuesta efectiva podría reducir el progreso o los efectos de la estrategia.
    // Esta es una simplificación:
    const impactoRespuesta = efectividad / 100; // Convertir a factor
    estrategia.efectosEsperados.forEach(efecto => {
        efecto.valorEstimado *= (1 - (impactoRespuesta * 0.25)); // Reducir efecto esperado hasta un 25%
    });

    // Si la respuesta es un contraataque, se podría vincular aquí
    if (tipoRespuesta === TipoRespuestaCompetitiva.CONTRAATACAR && estrategiaContraataqueId) {
        // Lógica adicional si es necesario
        console.log(`Empresa ${empresaRespondiente} contraataca estrategia ${estrategiaId} con ${estrategiaContraataqueId}`);
    }

    this.estrategias.set(estrategiaId, estrategia);
  }
  
  /**
   * Obtiene una estrategia por su ID
   * @param estrategiaId ID de la estrategia
   * @returns La estrategia o undefined si no se encuentra
   */
  public obtenerEstrategia(estrategiaId: string): EstrategiaCompetitiva | undefined {
    return this.estrategias.get(estrategiaId);
  }

  /**
   * Obtiene todas las estrategias activas de una empresa
   * @param empresaId ID de la empresa
   * @returns Lista de estrategias activas
   */
  public obtenerEstrategiasActivasPorEmpresa(empresaId: string): EstrategiaCompetitiva[] {
    return Array.from(this.estrategias.values()).filter(
      e => e.empresaEjecutora === empresaId && 
           (e.estado === EstadoEstrategia.INICIADA || e.estado === EstadoEstrategia.EN_PROGRESO)
    );
  }

  /**
   * Obtiene todas las estrategias (activas o no) de una empresa
   * @param empresaId ID de la empresa
   * @returns Lista de todas las estrategias de la empresa
   */
  public obtenerTodasEstrategiasPorEmpresa(empresaId: string): EstrategiaCompetitiva[] {
    return Array.from(this.estrategias.values()).filter(e => e.empresaEjecutora === empresaId);
  }

   /**
   * Obtiene todas las estrategias que tienen a una empresa como objetivo
   * @param empresaId ID de la empresa objetivo
   * @returns Lista de estrategias dirigidas a la empresa
   */
  public obtenerEstrategiasDirigidasAEmpresa(empresaId: string): EstrategiaCompetitiva[] {
    return Array.from(this.estrategias.values()).filter(
        e => e.empresasObjetivo.includes(empresaId) &&
             (e.estado === EstadoEstrategia.INICIADA || e.estado === EstadoEstrategia.EN_PROGRESO)
    );
  }
}
// Asegurar que haya una línea nueva al final del archivo.
