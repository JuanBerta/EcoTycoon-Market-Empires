// Implementación de almacenes especializados
import { v4 as uuidv4 } from 'uuid';
import { ProductCategory } from './productDatabase';

// Enumeraciones
export enum WarehouseSpecialization {
  GENERAL = 'general', // Para todo tipo de productos
  REFRIGERATED = 'refrigerated', // Para alimentos perecederos
  HIGH_SECURITY = 'high_security', // Para productos valiosos
  HAZARDOUS = 'hazardous', // Para materiales peligrosos
  AUTOMATED = 'automated', // Sistema automatizado de gestión
  BULK = 'bulk', // Para grandes cantidades de pocos productos
  DISTRIBUTION = 'distribution', // Centro de distribución con logística
  TEMPORARY = 'temporary' // Almacenamiento temporal de bajo costo
}

// Interfaces
export interface Warehouse {
  id: string;
  name: string;
  type: 'warehouse';
  locationId: string;
  ownerId: string;
  
  // Especialización
  specialization: WarehouseSpecialization;
  
  // Capacidades
  totalCapacity: number;
  usedCapacity: number;
  
  // Eficiencia
  loadingSpeed: number; // Unidades por hora
  organizationEfficiency: number; // 1-100, afecta velocidad de búsqueda
  
  // Inventario
  inventory: Record<string, number>; // productId/resourceId -> cantidad
  reservedSpace: Record<string, number>; // productId/resourceId -> espacio reservado
  
  // Restricciones
  allowedCategories: ProductCategory[]; // Categorías permitidas
  restrictedItems: string[]; // IDs de items no permitidos
  
  // Costos
  maintenanceCost: number;
  operatingCosts: number;
  
  // Personal
  staffCapacity: number;
  currentStaff: number;
  
  // Seguridad
  securityLevel: number; // 1-100
  
  // Condiciones
  temperatureControl: boolean;
  minimumTemperature?: number;
  maximumTemperature?: number;
  humidityControl: boolean;
  
  // Mejoras
  upgrades: WarehouseUpgrade[];
  upgradeSlots: number;
  
  // Estado
  condition: number; // 1-100
  constructionProgress?: number; // 0-100, solo durante construcción
}

export interface WarehouseUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  installationTime: number; // en horas
  effects: {
    totalCapacity?: number; // Modificador
    loadingSpeed?: number; // Modificador
    organizationEfficiency?: number; // Modificador
    securityLevel?: number; // Modificador
    operatingCosts?: number; // Modificador
    maintenanceCost?: number; // Modificador
  };
  prerequisites?: {
    techLevel: number;
    upgrades: string[]; // IDs de mejoras requeridas
  };
}

// Generador de almacenes
export function generateWarehouseTemplates(): Record<string, Partial<Warehouse>> {
  return {
    'general-small': {
      name: 'Almacén General Pequeño',
      type: 'warehouse',
      specialization: WarehouseSpecialization.GENERAL,
      totalCapacity: 500,
      loadingSpeed: 30,
      organizationEfficiency: 50,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.INDUSTRIAL,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 200,
      operatingCosts: 100,
      staffCapacity: 10,
      securityLevel: 40,
      temperatureControl: false,
      humidityControl: false,
      upgradeSlots: 2
    },
    'general-medium': {
      name: 'Almacén General Mediano',
      type: 'warehouse',
      specialization: WarehouseSpecialization.GENERAL,
      totalCapacity: 1000,
      loadingSpeed: 50,
      organizationEfficiency: 60,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.INDUSTRIAL,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 400,
      operatingCosts: 200,
      staffCapacity: 20,
      securityLevel: 50,
      temperatureControl: false,
      humidityControl: false,
      upgradeSlots: 3
    },
    'general-large': {
      name: 'Almacén General Grande',
      type: 'warehouse',
      specialization: WarehouseSpecialization.GENERAL,
      totalCapacity: 2000,
      loadingSpeed: 70,
      organizationEfficiency: 70,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.INDUSTRIAL,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 800,
      operatingCosts: 400,
      staffCapacity: 40,
      securityLevel: 60,
      temperatureControl: false,
      humidityControl: false,
      upgradeSlots: 4
    },
    'refrigerated-small': {
      name: 'Almacén Refrigerado Pequeño',
      type: 'warehouse',
      specialization: WarehouseSpecialization.REFRIGERATED,
      totalCapacity: 300,
      loadingSpeed: 25,
      organizationEfficiency: 60,
      allowedCategories: [ProductCategory.FOOD],
      restrictedItems: [],
      maintenanceCost: 300,
      operatingCosts: 200,
      staffCapacity: 8,
      securityLevel: 50,
      temperatureControl: true,
      minimumTemperature: -5,
      maximumTemperature: 10,
      humidityControl: true,
      upgradeSlots: 2
    },
    'refrigerated-medium': {
      name: 'Almacén Refrigerado Mediano',
      type: 'warehouse',
      specialization: WarehouseSpecialization.REFRIGERATED,
      totalCapacity: 800,
      loadingSpeed: 40,
      organizationEfficiency: 70,
      allowedCategories: [ProductCategory.FOOD],
      restrictedItems: [],
      maintenanceCost: 600,
      operatingCosts: 400,
      staffCapacity: 15,
      securityLevel: 60,
      temperatureControl: true,
      minimumTemperature: -5,
      maximumTemperature: 10,
      humidityControl: true,
      upgradeSlots: 3
    },
    'high-security': {
      name: 'Almacén de Alta Seguridad',
      type: 'warehouse',
      specialization: WarehouseSpecialization.HIGH_SECURITY,
      totalCapacity: 500,
      loadingSpeed: 30,
      organizationEfficiency: 80,
      allowedCategories: [
        ProductCategory.ELECTRONICS,
        ProductCategory.INDUSTRIAL
      ],
      restrictedItems: [],
      maintenanceCost: 700,
      operatingCosts: 350,
      staffCapacity: 12,
      securityLevel: 95,
      temperatureControl: true,
      minimumTemperature: 15,
      maximumTemperature: 25,
      humidityControl: true,
      upgradeSlots: 3
    },
    'hazardous': {
      name: 'Almacén de Materiales Peligrosos',
      type: 'warehouse',
      specialization: WarehouseSpecialization.HAZARDOUS,
      totalCapacity: 400,
      loadingSpeed: 20,
      organizationEfficiency: 75,
      allowedCategories: [ProductCategory.INDUSTRIAL],
      restrictedItems: [],
      maintenanceCost: 800,
      operatingCosts: 500,
      staffCapacity: 10,
      securityLevel: 90,
      temperatureControl: true,
      minimumTemperature: 10,
      maximumTemperature: 30,
      humidityControl: true,
      upgradeSlots: 2
    },
    'automated': {
      name: 'Centro de Distribución Automatizado',
      type: 'warehouse',
      specialization: WarehouseSpecialization.AUTOMATED,
      totalCapacity: 2000,
      loadingSpeed: 100,
      organizationEfficiency: 90,
      allowedCategories: [
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 1200,
      operatingCosts: 300,
      staffCapacity: 5,
      securityLevel: 80,
      temperatureControl: true,
      minimumTemperature: 15,
      maximumTemperature: 25,
      humidityControl: false,
      upgradeSlots: 5
    },
    'bulk': {
      name: 'Almacén para Productos a Granel',
      type: 'warehouse',
      specialization: WarehouseSpecialization.BULK,
      totalCapacity: 3000,
      loadingSpeed: 60,
      organizationEfficiency: 50,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.INDUSTRIAL
      ],
      restrictedItems: [],
      maintenanceCost: 500,
      operatingCosts: 250,
      staffCapacity: 15,
      securityLevel: 40,
      temperatureControl: false,
      humidityControl: false,
      upgradeSlots: 3
    },
    'distribution': {
      name: 'Centro Logístico de Distribución',
      type: 'warehouse',
      specialization: WarehouseSpecialization.DISTRIBUTION,
      totalCapacity: 1500,
      loadingSpeed: 90,
      organizationEfficiency: 85,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.INDUSTRIAL,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 900,
      operatingCosts: 450,
      staffCapacity: 25,
      securityLevel: 70,
      temperatureControl: true,
      minimumTemperature: 10,
      maximumTemperature: 25,
      humidityControl: false,
      upgradeSlots: 4
    },
    'temporary': {
      name: 'Almacén Temporal',
      type: 'warehouse',
      specialization: WarehouseSpecialization.TEMPORARY,
      totalCapacity: 300,
      loadingSpeed: 40,
      organizationEfficiency: 40,
      allowedCategories: [
        ProductCategory.FOOD,
        ProductCategory.ELECTRONICS,
        ProductCategory.TEXTILES,
        ProductCategory.INDUSTRIAL,
        ProductCategory.CONSUMER_GOODS
      ],
      restrictedItems: [],
      maintenanceCost: 150,
      operatingCosts: 100,
      staffCapacity: 5,
      securityLevel: 30,
      temperatureControl: false,
      humidityControl: false,
      upgradeSlots: 1
    }
  };
}

// Función para crear un nuevo almacén
export function createWarehouse(
  templateId: string,
  locationId: string,
  ownerId: string,
  customName?: string
): Warehouse {
  const templates = generateWarehouseTemplates();
  const template = templates[templateId];
  
  if (!template) {
    throw new Error(`Template de almacén no encontrado: ${templateId}`);
  }
  
  return {
    id: `warehouse-${uuidv4()}`,
    name: customName || template.name || 'Nuevo Almacén',
    type: 'warehouse',
    locationId,
    ownerId,
    specialization: template.specialization!,
    totalCapacity: template.totalCapacity || 500,
    usedCapacity: 0,
    loadingSpeed: template.loadingSpeed || 30,
    organizationEfficiency: template.organizationEfficiency || 50,
    inventory: {},
    reservedSpace: {},
    allowedCategories: template.allowedCategories || [
      ProductCategory.FOOD,
      ProductCategory.ELECTRONICS,
      ProductCategory.TEXTILES,
      ProductCategory.INDUSTRIAL,
      ProductCategory.CONSUMER_GOODS
    ],
    restrictedItems: template.restrictedItems || [],
    maintenanceCost: template.maintenanceCost || 200,
    operatingCosts: template.operatingCosts || 100,
    staffCapacity: template.staffCapacity || 10,
    currentStaff: 0,
    securityLevel: template.securityLevel || 50,
    temperatureControl: template.temperatureControl || false,
    minimumTemperature: template.minimumTemperature,
    maximumTemperature: template.maximumTemperature,
    humidityControl: template.humidityControl || false,
    upgrades: [],
    upgradeSlots: template.upgradeSlots || 2,
    condition: 100
  };
}
