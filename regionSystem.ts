// Sistema de regiones y ciudades
import { v4 as uuidv4 } from 'uuid';

// Tipos para regiones y ciudades
export interface Region {
  id: string;
  name: string;
  description: string;
  economicStatus: 'poor' | 'developing' | 'wealthy';
  population: number;
  coordinates: { x: number; y: number };
  cities: City[];
  resourceAbundance: Record<string, number>; // resourceId -> abundancia (0-100)
  taxRate: number; // Porcentaje de impuestos
  events: RegionEvent[];
}

export interface City {
  id: string;
  name: string;
  description: string;
  population: number;
  wealthLevel: number; // 0-100
  coordinates: { x: number; y: number };
  consumerPreferences: Record<string, number>; // productId -> preferencia (0-100)
  landCost: number; // Costo de terrenos
  laborCost: number; // Costo de mano de obra
  infrastructure: number; // Calidad de infraestructura (0-100)
  buildings: string[]; // IDs de edificios en la ciudad
}

export interface RegionEvent {
  id: string;
  name: string;
  description: string;
  type: 'economic' | 'political' | 'natural';
  impact: 'positive' | 'negative' | 'neutral';
  severity: number; // 0-100
  duration: number; // en días de juego
  startDay: number;
  effects: {
    economicStatusChange?: number;
    populationChange?: number;
    taxRateChange?: number;
    resourceAbundanceChange?: Record<string, number>;
  };
  isActive: boolean;
}

/**
 * Genera datos iniciales para regiones y ciudades
 * @returns Datos iniciales de regiones y ciudades
 */
export const generateInitialRegionsData = (): Region[] => {
  // Región principal para el MVP
  const mainRegion: Region = {
    id: 'region-1',
    name: 'Valle Central',
    description: 'Una región próspera con diversas oportunidades económicas',
    economicStatus: 'developing',
    population: 2500000,
    coordinates: { x: 500, y: 300 },
    cities: [],
    resourceAbundance: {
      'resource-1': 70, // Materias Primas Agrícolas
      'resource-2': 50, // Componentes Electrónicos
      'resource-3': 60, // Textiles
    },
    taxRate: 15,
    events: []
  };

  // Ciudades para la región principal
  const cities: City[] = [
    {
      id: 'city-1',
      name: 'Nueva Prosperidad',
      description: 'La capital regional, un centro de comercio y tecnología',
      population: 1200000,
      wealthLevel: 70,
      coordinates: { x: 520, y: 310 },
      consumerPreferences: {
        'product-1': 60, // Alimentos Básicos
        'product-2': 80, // Electrónica Básica
        'product-3': 70, // Ropa
      },
      landCost: 1200,
      laborCost: 25,
      infrastructure: 80,
      buildings: []
    },
    {
      id: 'city-2',
      name: 'Puerto Comercial',
      description: 'Ciudad portuaria con fuerte actividad comercial',
      population: 800000,
      wealthLevel: 60,
      coordinates: { x: 480, y: 330 },
      consumerPreferences: {
        'product-1': 70, // Alimentos Básicos
        'product-2': 60, // Electrónica Básica
        'product-3': 65, // Ropa
      },
      landCost: 900,
      laborCost: 20,
      infrastructure: 70,
      buildings: []
    },
    {
      id: 'city-3',
      name: 'Villa Agrícola',
      description: 'Pequeña ciudad con enfoque en agricultura y manufactura básica',
      population: 500000,
      wealthLevel: 40,
      coordinates: { x: 540, y: 280 },
      consumerPreferences: {
        'product-1': 80, // Alimentos Básicos
        'product-2': 40, // Electrónica Básica
        'product-3': 60, // Ropa
      },
      landCost: 500,
      laborCost: 15,
      infrastructure: 50,
      buildings: []
    }
  ];

  // Asignar ciudades a la región
  mainRegion.cities = cities;

  return [mainRegion];
};

/**
 * Calcula la demanda de productos en una ciudad
 * @param city Ciudad para calcular la demanda
 * @param products Lista de productos disponibles
 * @returns Demanda calculada por producto
 */
export const calculateCityDemand = (
  city: City,
  products: Array<{ id: string; basePrice: number; quality: number }>
): Record<string, number> => {
  const demand: Record<string, number> = {};

  products.forEach(product => {
    // Preferencia base de la ciudad por este producto (0-100)
    const preference = city.consumerPreferences[product.id] || 50;
    
    // Factor de población (ciudades más grandes = más demanda)
    const populationFactor = Math.log10(city.population) / 5;
    
    // Factor de riqueza (afecta la demanda de diferentes tipos de productos)
    const wealthFactor = city.wealthLevel / 100;
    
    // Calcular demanda base
    let baseDemand = preference * (1 + populationFactor);
    
    // Ajustar por riqueza (productos más caros tienen más demanda en ciudades ricas)
    if (product.basePrice > 50) {
      // Producto relativamente caro
      baseDemand *= (0.5 + wealthFactor);
    } else {
      // Producto relativamente barato
      baseDemand *= (1.2 - wealthFactor * 0.4);
    }
    
    // Añadir variación aleatoria (±10%)
    const randomFactor = 0.9 + Math.random() * 0.2;
    
    // Calcular demanda final
    demand[product.id] = Math.round(baseDemand * randomFactor);
  });

  return demand;
};

/**
 * Calcula los costos operativos en una ciudad
 * @param city Ciudad para calcular costos
 * @param buildingType Tipo de edificio
 * @param size Tamaño del edificio
 * @returns Costos operativos calculados
 */
export const calculateOperatingCosts = (
  city: City,
  buildingType: 'factory' | 'warehouse' | 'store' | 'office' | 'research',
  size: number
): number => {
  // Costos base por tipo de edificio
  const baseCosts: Record<string, number> = {
    'factory': 1000,
    'warehouse': 500,
    'store': 800,
    'office': 600,
    'research': 1200
  };
  
  // Costo base para este tipo de edificio
  const baseCost = baseCosts[buildingType] || 1000;
  
  // Factor de tamaño
  const sizeFactor = size / 10; // Normalizado para tamaño 10
  
  // Factor de costo de terreno
  const landCostFactor = city.landCost / 1000; // Normalizado para costo 1000
  
  // Factor de costo laboral
  const laborCostFactor = city.laborCost / 20; // Normalizado para costo 20
  
  // Calcular costo total
  const totalCost = baseCost * sizeFactor * (
    0.4 * landCostFactor + 0.6 * laborCostFactor
  );
  
  return Math.round(totalCost);
};

/**
 * Genera un evento regional aleatorio
 * @param region Región para la que generar el evento
 * @param currentDay Día actual del juego
 * @returns Evento regional generado
 */
export const generateRandomRegionEvent = (
  region: Region,
  currentDay: number
): RegionEvent => {
  // Tipos de eventos posibles
  const eventTypes: Array<RegionEvent['type']> = ['economic', 'political', 'natural'];
  const eventImpacts: Array<RegionEvent['impact']> = ['positive', 'negative', 'neutral'];
  
  // Seleccionar tipo y impacto aleatorios
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const impact = eventImpacts[Math.floor(Math.random() * eventImpacts.length)];
  
  // Determinar severidad (mayor para eventos negativos)
  const baseSeverity = Math.floor(Math.random() * 60) + 20; // 20-80
  const severity = impact === 'negative' ? baseSeverity + 10 : baseSeverity;
  
  // Determinar duración basada en severidad
  const duration = Math.floor(severity / 10) + Math.floor(Math.random() * 5) + 1; // 1-15 días
  
  // Generar efectos basados en tipo e impacto
  const effects: RegionEvent['effects'] = {};
  
  if (type === 'economic') {
    const factor = impact === 'positive' ? 1 : -1;
    effects.economicStatusChange = factor * (Math.random() * 10);
    effects.taxRateChange = factor * (Math.random() * 2);
  } else if (type === 'political') {
    const factor = impact === 'positive' ? 1 : -1;
    effects.taxRateChange = factor * (Math.random() * 3);
  } else if (type === 'natural') {
    const factor = impact === 'positive' ? 0.5 : -1;
    effects.populationChange = factor * (Math.random() * 0.05); // ±5% máximo
    
    // Afectar recursos aleatorios
    effects.resourceAbundanceChange = {};
    const resourceKeys = Object.keys(region.resourceAbundance);
    const affectedResourceCount = Math.floor(Math.random() * resourceKeys.length) + 1;
    
    for (let i = 0; i < affectedResourceCount; i++) {
      const resourceId = resourceKeys[Math.floor(Math.random() * resourceKeys.length)];
      effects.resourceAbundanceChange[resourceId] = factor * (Math.random() * 20);
    }
  }
  
  // Nombres y descripciones basados en tipo e impacto
  let name = '';
  let description = '';
  
  if (type === 'economic') {
    if (impact === 'positive') {
      name = 'Auge Económico';
      description = 'Un período de crecimiento económico beneficia a la región.';
    } else if (impact === 'negative') {
      name = 'Recesión Económica';
      description = 'Una desaceleración económica afecta negativamente a la región.';
    } else {
      name = 'Reestructuración Económica';
      description = 'Cambios en la estructura económica con efectos mixtos.';
    }
  } else if (type === 'political') {
    if (impact === 'positive') {
      name = 'Reforma Favorable';
      description = 'Nuevas políticas benefician el clima de negocios.';
    } else if (impact === 'negative') {
      name = 'Inestabilidad Política';
      description = 'Tensiones políticas generan incertidumbre en la región.';
    } else {
      name = 'Cambio de Administración';
      description = 'Un nuevo gobierno toma el control con políticas diferentes.';
    }
  } else if (type === 'natural') {
    if (impact === 'positive') {
      name = 'Clima Favorable';
      description = 'Condiciones climáticas excepcionales benefician la producción.';
    } else if (impact === 'negative') {
      name = 'Desastre Natural';
      description = 'Un evento natural causa daños en la infraestructura y recursos.';
    } else {
      name = 'Cambios Estacionales';
      description = 'Cambios en el clima afectan diferentes sectores de formas variadas.';
    }
  }
  
  return {
    id: `event-${uuidv4()}`,
    name,
    description,
    type,
    impact,
    severity,
    duration,
    startDay: currentDay,
    effects,
    isActive: true
  };
};
