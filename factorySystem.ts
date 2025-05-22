// Implementación de fábricas especializadas
import { v4 as uuidv4 } from 'uuid';
import { ProductCategory } from './productDatabase';

// Enumeraciones
export enum FactorySpecialization {
  MASS_PRODUCTION = 'mass_production', // Alta cantidad, menor calidad
  QUALITY_PRODUCTION = 'quality_production', // Menor cantidad, alta calidad
  AUTOMATED = 'automated', // Menor costo laboral, mayor costo inicial
  ARTISANAL = 'artisanal', // Productos premium, baja escala
  SUSTAINABLE = 'sustainable', // Menor impacto ambiental, mayor costo
  FLEXIBLE = 'flexible', // Puede cambiar producción rápidamente
  SPECIALIZED = 'specialized', // Enfocada en un tipo específico
  RESEARCH_ORIENTED = 'research_oriented' // Genera puntos de investigación
}

// Interfaces
export interface Factory {
  id: string;
  name: string;
  type: 'factory';
  locationId: string;
  ownerId: string;
  
  // Especialización
  specialization: FactorySpecialization;
  productionCategory: ProductCategory;
  
  // Capacidades
  productionCapacity: number;
  productionEfficiency: number; // 1-100
  qualityCapability: number; // 1-100, máxima calidad posible
  
  // Tecnología
  automationLevel: number; // 1-100
  techLevel: number; // 1-5
  
  // Producción
  compatibleProducts: string[]; // IDs de productos que puede fabricar
  productionBonus: Record<string, number>; // productId -> % bonus
  currentProduction: ProductionProcess | null;
  
  // Recursos
  resourceEfficiency: Record<string, number>; // resourceId -> % eficiencia
  
  // Costos
  maintenanceCost: number;
  operatingCosts: number;
  
  // Personal
  staffCapacity: number;
  currentStaff: number;
  staffSkillLevel: number; // 1-100
  
  // Impacto
  environmentalImpact: number; // 1-100, 100 = muy contaminante
  noiseLevel: number; // 1-100
  
  // Mejoras
  upgrades: FactoryUpgrade[];
  upgradeSlots: number;
  
  // Estado
  condition: number; // 1-100
  constructionProgress?: number; // 0-100, solo durante construcción
}

export interface ProductionProcess {
  id: string;
  productId: string;
  quantity: number;
  quality: number;
  startTime: number;
  endTime: number;
  progress: number; // 0-100
  resourcesUsed: Record<string, number>;
  costToDate: number;
}

export interface FactoryUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  installationTime: number; // en horas
  effects: {
    productionEfficiency?: number; // Modificador
    qualityCapability?: number; // Modificador
    automationLevel?: number; // Modificador
    resourceEfficiency?: Record<string, number>; // resourceId -> modificador
    environmentalImpact?: number; // Modificador
    operatingCosts?: number; // Modificador
    maintenanceCost?: number; // Modificador
  };
  prerequisites?: {
    techLevel: number;
    upgrades: string[]; // IDs de mejoras requeridas
  };
}

// Generador de fábricas
export function generateFactoryTemplates(): Record<string, Partial<Factory>> {
  return {
    'food-mass-production': {
      name: 'Fábrica de Producción Masiva de Alimentos',
      type: 'factory',
      specialization: FactorySpecialization.MASS_PRODUCTION,
      productionCategory: ProductCategory.FOOD,
      productionCapacity: 100,
      productionEfficiency: 80,
      qualityCapability: 60,
      automationLevel: 70,
      techLevel: 3,
      compatibleProducts: ['food-basic-1', 'food-processed-1', 'food-beverage-1'],
      productionBonus: {
        'food-basic-1': 15,
        'food-processed-1': 10
      },
      resourceEfficiency: {
        'resource-agricultural-1': 110,
        'resource-water-1': 105
      },
      maintenanceCost: 500,
      operatingCosts: 200,
      staffCapacity: 50,
      environmentalImpact: 60,
      noiseLevel: 70,
      upgradeSlots: 3
    },
    'food-quality-production': {
      name: 'Fábrica de Alimentos Premium',
      type: 'factory',
      specialization: FactorySpecialization.QUALITY_PRODUCTION,
      productionCategory: ProductCategory.FOOD,
      productionCapacity: 50,
      productionEfficiency: 60,
      qualityCapability: 90,
      automationLevel: 50,
      techLevel: 4,
      compatibleProducts: ['food-gourmet-1', 'food-organic-1'],
      productionBonus: {
        'food-gourmet-1': 20,
        'food-organic-1': 15
      },
      resourceEfficiency: {
        'resource-agricultural-premium-1': 115,
        'resource-spices-1': 110
      },
      maintenanceCost: 800,
      operatingCosts: 350,
      staffCapacity: 30,
      environmentalImpact: 40,
      noiseLevel: 50,
      upgradeSlots: 4
    },
    'food-sustainable': {
      name: 'Fábrica Sostenible de Alimentos',
      type: 'factory',
      specialization: FactorySpecialization.SUSTAINABLE,
      productionCategory: ProductCategory.FOOD,
      productionCapacity: 70,
      productionEfficiency: 65,
      qualityCapability: 85,
      automationLevel: 60,
      techLevel: 4,
      compatibleProducts: ['food-organic-1', 'food-basic-1'],
      productionBonus: {
        'food-organic-1': 25
      },
      resourceEfficiency: {
        'resource-agricultural-organic-1': 120,
        'resource-water-1': 110
      },
      maintenanceCost: 700,
      operatingCosts: 300,
      staffCapacity: 35,
      environmentalImpact: 20,
      noiseLevel: 40,
      upgradeSlots: 3
    },
    'electronics-automated': {
      name: 'Fábrica Automatizada de Electrónica',
      type: 'factory',
      specialization: FactorySpecialization.AUTOMATED,
      productionCategory: ProductCategory.ELECTRONICS,
      productionCapacity: 80,
      productionEfficiency: 90,
      qualityCapability: 80,
      automationLevel: 95,
      techLevel: 5,
      compatibleProducts: ['electronics-basic-1', 'electronics-components-1', 'electronics-communication-1'],
      productionBonus: {
        'electronics-components-1': 15
      },
      resourceEfficiency: {
        'resource-electronic-components-1': 110,
        'resource-plastic-1': 105
      },
      maintenanceCost: 1200,
      operatingCosts: 150,
      staffCapacity: 15,
      environmentalImpact: 50,
      noiseLevel: 60,
      upgradeSlots: 5
    },
    'electronics-artisanal': {
      name: 'Taller Artesanal de Electrónica',
      type: 'factory',
      specialization: FactorySpecialization.ARTISANAL,
      productionCategory: ProductCategory.ELECTRONICS,
      productionCapacity: 30,
      productionEfficiency: 50,
      qualityCapability: 95,
      automationLevel: 20,
      techLevel: 4,
      compatibleProducts: ['electronics-advanced-1', 'electronics-computing-1'],
      productionBonus: {
        'electronics-advanced-1': 25
      },
      resourceEfficiency: {
        'resource-electronic-components-advanced-1': 115,
        'resource-rare-materials-1': 110
      },
      maintenanceCost: 600,
      operatingCosts: 400,
      staffCapacity: 20,
      environmentalImpact: 30,
      noiseLevel: 40,
      upgradeSlots: 3
    },
    'textiles-mass-production': {
      name: 'Fábrica Textil de Alta Producción',
      type: 'factory',
      specialization: FactorySpecialization.MASS_PRODUCTION,
      productionCategory: ProductCategory.TEXTILES,
      productionCapacity: 120,
      productionEfficiency: 85,
      qualityCapability: 65,
      automationLevel: 75,
      techLevel: 3,
      compatibleProducts: ['textiles-clothing-1', 'textiles-industrial-1'],
      productionBonus: {
        'textiles-clothing-1': 20
      },
      resourceEfficiency: {
        'resource-fabric-1': 115,
        'resource-thread-1': 110
      },
      maintenanceCost: 600,
      operatingCosts: 250,
      staffCapacity: 60,
      environmentalImpact: 55,
      noiseLevel: 65,
      upgradeSlots: 3
    },
    'textiles-sustainable': {
      name: 'Fábrica Textil Sostenible',
      type: 'factory',
      specialization: FactorySpecialization.SUSTAINABLE,
      productionCategory: ProductCategory.TEXTILES,
      productionCapacity: 60,
      productionEfficiency: 70,
      qualityCapability: 80,
      automationLevel: 50,
      techLevel: 3,
      compatibleProducts: ['textiles-clothing-1', 'textiles-luxury-1'],
      productionBonus: {
        'textiles-luxury-1': 15
      },
      resourceEfficiency: {
        'resource-fabric-1': 110,
        'resource-thread-1': 105
      },
      maintenanceCost: 500,
      operatingCosts: 300,
      staffCapacity: 40,
      environmentalImpact: 20,
      noiseLevel: 45,
      upgradeSlots: 4
    },
    'industrial-specialized': {
      name: 'Fábrica Especializada de Productos Industriales',
      type: 'factory',
      specialization: FactorySpecialization.SPECIALIZED,
      productionCategory: ProductCategory.INDUSTRIAL,
      productionCapacity: 70,
      productionEfficiency: 80,
      qualityCapability: 85,
      automationLevel: 70,
      techLevel: 4,
      compatibleProducts: ['industrial-tools-1', 'industrial-chemicals-1'],
      productionBonus: {
        'industrial-tools-1': 20,
        'industrial-chemicals-1': 15
      },
      resourceEfficiency: {
        'resource-metal-1': 110,
        'resource-chemical-1': 115
      },
      maintenanceCost: 900,
      operatingCosts: 400,
      staffCapacity: 35,
      environmentalImpact: 70,
      noiseLevel: 75,
      upgradeSlots: 3
    },
    'industrial-research': {
      name: 'Centro de Investigación Industrial',
      type: 'factory',
      specialization: FactorySpecialization.RESEARCH_ORIENTED,
      productionCategory: ProductCategory.INDUSTRIAL,
      productionCapacity: 40,
      productionEfficiency: 60,
      qualityCapability: 95,
      automationLevel: 80,
      techLevel: 5,
      compatibleProducts: ['industrial-equipment-1', 'industrial-machinery-1'],
      productionBonus: {
        'industrial-equipment-1': 25
      },
      resourceEfficiency: {
        'resource-electronic-components-advanced-1': 120,
        'resource-rare-materials-1': 115
      },
      maintenanceCost: 1500,
      operatingCosts: 600,
      staffCapacity: 25,
      environmentalImpact: 40,
      noiseLevel: 50,
      upgradeSlots: 5
    },
    'consumer-flexible': {
      name: 'Fábrica Flexible de Bienes de Consumo',
      type: 'factory',
      specialization: FactorySpecialization.FLEXIBLE,
      productionCategory: ProductCategory.CONSUMER_GOODS,
      productionCapacity: 90,
      productionEfficiency: 75,
      qualityCapability: 75,
      automationLevel: 65,
      techLevel: 3,
      compatibleProducts: ['consumer-household-1', 'consumer-personal-care-1', 'consumer-toys-1'],
      productionBonus: {
        'consumer-household-1': 10,
        'consumer-personal-care-1': 10,
        'consumer-toys-1': 10
      },
      resourceEfficiency: {
        'resource-plastic-1': 110,
        'resource-fabric-1': 105
      },
      maintenanceCost: 700,
      operatingCosts: 350,
      staffCapacity: 45,
      environmentalImpact: 50,
      noiseLevel: 60,
      upgradeSlots: 4
    },
    'consumer-quality': {
      name: 'Fábrica de Bienes de Consumo Premium',
      type: 'factory',
      specialization: FactorySpecialization.QUALITY_PRODUCTION,
      productionCategory: ProductCategory.CONSUMER_GOODS,
      productionCapacity: 50,
      productionEfficiency: 65,
      qualityCapability: 90,
      automationLevel: 60,
      techLevel: 4,
      compatibleProducts: ['consumer-furniture-1', 'consumer-sports-1'],
      productionBonus: {
        'consumer-furniture-1': 20,
        'consumer-sports-1': 15
      },
      resourceEfficiency: {
        'resource-wood-1': 115,
        'resource-fabric-1': 110
      },
      maintenanceCost: 800,
      operatingCosts: 400,
      staffCapacity: 30,
      environmentalImpact: 45,
      noiseLevel: 55,
      upgradeSlots: 3
    }
  };
}

// Función para crear una nueva fábrica
export function createFactory(
  templateId: string,
  locationId: string,
  ownerId: string,
  customName?: string
): Factory {
  const templates = generateFactoryTemplates();
  const template = templates[templateId];
  
  if (!template) {
    throw new Error(`Template de fábrica no encontrado: ${templateId}`);
  }
  
  return {
    id: `factory-${uuidv4()}`,
    name: customName || template.name || 'Nueva Fábrica',
    type: 'factory',
    locationId,
    ownerId,
    specialization: template.specialization!,
    productionCategory: template.productionCategory!,
    productionCapacity: template.productionCapacity || 50,
    productionEfficiency: template.productionEfficiency || 50,
    qualityCapability: template.qualityCapability || 50,
    automationLevel: template.automationLevel || 50,
    techLevel: template.techLevel || 1,
    compatibleProducts: template.compatibleProducts || [],
    productionBonus: template.productionBonus || {},
    currentProduction: null,
    resourceEfficiency: template.resourceEfficiency || {},
    maintenanceCost: template.maintenanceCost || 500,
    operatingCosts: template.operatingCosts || 200,
    staffCapacity: template.staffCapacity || 30,
    currentStaff: 0,
    staffSkillLevel: 50,
    environmentalImpact: template.environmentalImpact || 50,
    noiseLevel: template.noiseLevel || 50,
    upgrades: [],
    upgradeSlots: template.upgradeSlots || 3,
    condition: 100
  };
}
