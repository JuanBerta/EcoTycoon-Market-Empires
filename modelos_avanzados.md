# Diseño de Modelos Avanzados para Productos y Especializaciones

## Introducción

Este documento presenta el diseño detallado de los modelos de datos para la expansión de productos, fábricas, almacenes y tiendas con especializaciones en EcoTycoon: Market Empires. Estos modelos servirán como base para la implementación de un ecosistema económico más diverso y estratégicamente profundo.

## 1. Modelo de Productos Avanzado

### Estructura Base de Producto

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  subcategory: string;
  
  // Atributos básicos
  basePrice: {
    min: number;
    max: number;
    current: number;
    trend: 'rising' | 'falling' | 'stable';
  };
  
  // Atributos de producción
  productionComplexity: number; // 1-100
  resourceRequirements: Array<{
    resourceId: string;
    amount: number;
    isOptional: boolean;
  }>;
  baseProductionTime: number; // en horas
  
  // Atributos de mercado
  qualityRange: {
    min: number;
    max: number;
  };
  targetMarketSegment: MarketSegment;
  luxuryFactor: number; // 0-100, influye en sensibilidad a riqueza
  necessityFactor: number; // 0-100, influye en demanda base
  
  // Atributos de especialización
  durability: number; // 1-100
  sustainability: number; // 1-100
  innovationLevel: number; // 1-100
  
  // Atributos dinámicos
  seasonality: Array<{
    month: number; // 1-12
    demandModifier: number; // 0.5-2.0
  }>;
  trendCycle: {
    currentPhase: 'emerging' | 'growing' | 'mature' | 'declining';
    phaseStartTime: number; // timestamp
    phaseDuration: number; // en días de juego
  };
  
  // Metadatos
  unlockRequirements?: {
    researchRequired: boolean;
    techLevel: number;
    prerequisiteProducts: string[];
  };
  
  // Visuales
  icon: string;
  imageUrl?: string;
}

enum ProductCategory {
  FOOD = 'food',
  ELECTRONICS = 'electronics',
  TEXTILES = 'textiles',
  INDUSTRIAL = 'industrial',
  CONSUMER_GOODS = 'consumer_goods'
}

enum MarketSegment {
  BUDGET = 'budget',
  MAINSTREAM = 'mainstream',
  PREMIUM = 'premium',
  LUXURY = 'luxury',
  SPECIALIZED = 'specialized'
}
```

### Ejemplos de Productos por Categoría

#### Alimentos
```typescript
const foodProducts = [
  {
    id: 'food-basic-1',
    name: 'Alimentos Básicos',
    category: ProductCategory.FOOD,
    subcategory: 'básicos',
    productionComplexity: 20,
    qualityRange: { min: 30, max: 80 },
    targetMarketSegment: MarketSegment.MAINSTREAM,
    luxuryFactor: 10,
    necessityFactor: 90,
    durability: 30, // Vida útil corta
    sustainability: 60,
    innovationLevel: 20,
    // Otros atributos...
  },
  {
    id: 'food-processed-1',
    name: 'Alimentos Procesados',
    category: ProductCategory.FOOD,
    subcategory: 'procesados',
    productionComplexity: 40,
    qualityRange: { min: 20, max: 70 },
    targetMarketSegment: MarketSegment.MAINSTREAM,
    luxuryFactor: 20,
    necessityFactor: 70,
    durability: 60, // Mayor vida útil
    sustainability: 40,
    innovationLevel: 30,
    // Otros atributos...
  },
  {
    id: 'food-gourmet-1',
    name: 'Productos Gourmet',
    category: ProductCategory.FOOD,
    subcategory: 'gourmet',
    productionComplexity: 70,
    qualityRange: { min: 70, max: 100 },
    targetMarketSegment: MarketSegment.LUXURY,
    luxuryFactor: 80,
    necessityFactor: 20,
    durability: 40,
    sustainability: 70,
    innovationLevel: 60,
    // Otros atributos...
  }
  // Más productos...
]
```

#### Electrónica
```typescript
const electronicsProducts = [
  {
    id: 'electronics-basic-1',
    name: 'Electrónica Básica',
    category: ProductCategory.ELECTRONICS,
    subcategory: 'básica',
    productionComplexity: 50,
    qualityRange: { min: 40, max: 80 },
    targetMarketSegment: MarketSegment.MAINSTREAM,
    luxuryFactor: 40,
    necessityFactor: 60,
    durability: 70,
    sustainability: 50,
    innovationLevel: 60,
    // Otros atributos...
  },
  {
    id: 'electronics-advanced-1',
    name: 'Electrónica Avanzada',
    category: ProductCategory.ELECTRONICS,
    subcategory: 'avanzada',
    productionComplexity: 80,
    qualityRange: { min: 60, max: 100 },
    targetMarketSegment: MarketSegment.PREMIUM,
    luxuryFactor: 70,
    necessityFactor: 40,
    durability: 80,
    sustainability: 60,
    innovationLevel: 90,
    // Otros atributos...
  }
  // Más productos...
]
```

## 2. Modelo de Fábricas Especializadas

### Estructura Base de Fábrica

```typescript
interface Factory extends Building {
  type: 'factory';
  
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
}

enum FactorySpecialization {
  MASS_PRODUCTION = 'mass_production', // Alta cantidad, menor calidad
  QUALITY_PRODUCTION = 'quality_production', // Menor cantidad, alta calidad
  AUTOMATED = 'automated', // Menor costo laboral, mayor costo inicial
  ARTISANAL = 'artisanal', // Productos premium, baja escala
  SUSTAINABLE = 'sustainable', // Menor impacto ambiental, mayor costo
  FLEXIBLE = 'flexible', // Puede cambiar producción rápidamente
  SPECIALIZED = 'specialized', // Enfocada en un tipo específico
  RESEARCH_ORIENTED = 'research_oriented' // Genera puntos de investigación
}

interface FactoryUpgrade {
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
```

### Ejemplos de Fábricas Especializadas

```typescript
const factoryTemplates = [
  {
    name: 'Fábrica de Producción Masiva de Alimentos',
    specialization: FactorySpecialization.MASS_PRODUCTION,
    productionCategory: ProductCategory.FOOD,
    productionCapacity: 100,
    productionEfficiency: 80,
    qualityCapability: 60,
    automationLevel: 70,
    techLevel: 3,
    compatibleProducts: ['food-basic-1', 'food-processed-1'],
    environmentalImpact: 60,
    // Otros atributos...
  },
  {
    name: 'Taller Artesanal de Electrónica',
    specialization: FactorySpecialization.ARTISANAL,
    productionCategory: ProductCategory.ELECTRONICS,
    productionCapacity: 30,
    productionEfficiency: 50,
    qualityCapability: 90,
    automationLevel: 20,
    techLevel: 4,
    compatibleProducts: ['electronics-advanced-1'],
    environmentalImpact: 30,
    // Otros atributos...
  },
  {
    name: 'Fábrica Textil Sostenible',
    specialization: FactorySpecialization.SUSTAINABLE,
    productionCategory: ProductCategory.TEXTILES,
    productionCapacity: 60,
    productionEfficiency: 70,
    qualityCapability: 80,
    automationLevel: 50,
    techLevel: 3,
    compatibleProducts: ['textiles-clothing-1', 'textiles-luxury-1'],
    environmentalImpact: 20,
    // Otros atributos...
  }
  // Más plantillas...
]
```

## 3. Modelo de Almacenes Especializados

### Estructura Base de Almacén

```typescript
interface Warehouse extends Building {
  type: 'warehouse';
  
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
}

enum WarehouseSpecialization {
  GENERAL = 'general', // Para todo tipo de productos
  REFRIGERATED = 'refrigerated', // Para alimentos perecederos
  HIGH_SECURITY = 'high_security', // Para productos valiosos
  HAZARDOUS = 'hazardous', // Para materiales peligrosos
  AUTOMATED = 'automated', // Sistema automatizado de gestión
  BULK = 'bulk', // Para grandes cantidades de pocos productos
  DISTRIBUTION = 'distribution', // Centro de distribución con logística
  TEMPORARY = 'temporary' // Almacenamiento temporal de bajo costo
}

interface WarehouseUpgrade {
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
```

### Ejemplos de Almacenes Especializados

```typescript
const warehouseTemplates = [
  {
    name: 'Almacén General',
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
    securityLevel: 50,
    temperatureControl: false,
    // Otros atributos...
  },
  {
    name: 'Almacén Refrigerado',
    specialization: WarehouseSpecialization.REFRIGERATED,
    totalCapacity: 800,
    loadingSpeed: 40,
    organizationEfficiency: 70,
    allowedCategories: [ProductCategory.FOOD],
    securityLevel: 60,
    temperatureControl: true,
    minimumTemperature: -5,
    maximumTemperature: 10,
    humidityControl: true,
    // Otros atributos...
  },
  {
    name: 'Centro de Distribución Automatizado',
    specialization: WarehouseSpecialization.AUTOMATED,
    totalCapacity: 2000,
    loadingSpeed: 100,
    organizationEfficiency: 90,
    allowedCategories: [
      ProductCategory.ELECTRONICS,
      ProductCategory.TEXTILES,
      ProductCategory.CONSUMER_GOODS
    ],
    securityLevel: 80,
    temperatureControl: true,
    // Otros atributos...
  }
  // Más plantillas...
]
```

## 4. Modelo de Tiendas Especializadas

### Estructura Base de Tienda

```typescript
interface Store extends Building {
  type: 'store';
  
  // Especialización
  specialization: StoreSpecialization;
  storeCategory: ProductCategory | 'mixed';
  
  // Capacidades
  floorSpace: number; // m²
  displayCapacity: number; // Cantidad de productos diferentes
  storageCapacity: number; // Unidades totales
  
  // Ventas
  salesCapacity: number; // Unidades por día
  customerCapacity: number; // Clientes por día
  
  // Productos
  productsForSale: Record<string, {
    quantity: number;
    price: number;
    quality: number;
    displayPriority: number; // 1-100
  }>;
  
  // Rendimiento
  customerSatisfaction: number; // 1-100
  reputation: number; // 1-100
  dailySales: Record<string, number>; // productId -> cantidad
  
  // Marketing
  marketingLevel: number; // 1-100
  targetDemographic: MarketSegment[];
  
  // Costos
  rent: number;
  operatingCosts: number;
  
  // Personal
  staffCapacity: number;
  currentStaff: number;
  staffSkillLevel: number; // 1-100
  
  // Ubicación
  locationQuality: number; // 1-100
  footTraffic: number; // Clientes potenciales por día
  
  // Mejoras
  upgrades: StoreUpgrade[];
  upgradeSlots: number;
}

enum StoreSpecialization {
  GENERAL = 'general', // Variedad de productos
  SPECIALIZED = 'specialized', // Enfocada en categoría específica
  DISCOUNT = 'discount', // Precios bajos, margen reducido
  PREMIUM = 'premium', // Alta calidad, precios elevados
  OUTLET = 'outlet', // Productos con descuento
  DEPARTMENT = 'department', // Gran tienda con múltiples secciones
  CONVENIENCE = 'convenience', // Pequeña, ubicación conveniente
  ONLINE = 'online' // Tienda virtual
}

interface StoreUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  installationTime: number; // en horas
  effects: {
    displayCapacity?: number; // Modificador
    storageCapacity?: number; // Modificador
    salesCapacity?: number; // Modificador
    customerCapacity?: number; // Modificador
    customerSatisfaction?: number; // Modificador
    marketingLevel?: number; // Modificador
    operatingCosts?: number; // Modificador
  };
  prerequisites?: {
    techLevel: number;
    upgrades: string[]; // IDs de mejoras requeridas
  };
}
```

### Ejemplos de Tiendas Especializadas

```typescript
const storeTemplates = [
  {
    name: 'Tienda de Electrónica Premium',
    specialization: StoreSpecialization.PREMIUM,
    storeCategory: ProductCategory.ELECTRONICS,
    floorSpace: 500,
    displayCapacity: 50,
    storageCapacity: 500,
    salesCapacity: 100,
    customerCapacity: 200,
    customerSatisfaction: 85,
    reputation: 80,
    marketingLevel: 70,
    targetDemographic: [MarketSegment.PREMIUM, MarketSegment.LUXURY],
    locationQuality: 90,
    // Otros atributos...
  },
  {
    name: 'Supermercado de Descuento',
    specialization: StoreSpecialization.DISCOUNT,
    storeCategory: ProductCategory.FOOD,
    floorSpace: 1200,
    displayCapacity: 200,
    storageCapacity: 2000,
    salesCapacity: 500,
    customerCapacity: 1000,
    customerSatisfaction: 65,
    reputation: 60,
    marketingLevel: 50,
    targetDemographic: [MarketSegment.BUDGET, MarketSegment.MAINSTREAM],
    locationQuality: 70,
    // Otros atributos...
  },
  {
    name: 'Boutique de Ropa de Lujo',
    specialization: StoreSpecialization.SPECIALIZED,
    storeCategory: ProductCategory.TEXTILES,
    floorSpace: 200,
    displayCapacity: 30,
    storageCapacity: 300,
    salesCapacity: 50,
    customerCapacity: 100,
    customerSatisfaction: 95,
    reputation: 90,
    marketingLevel: 80,
    targetDemographic: [MarketSegment.LUXURY],
    locationQuality: 95,
    // Otros atributos...
  }
  // Más plantillas...
]
```

## 5. Modelo de Generación Dinámica de NPCs

### Estructura Base de Compañía NPC

```typescript
interface NPCCompany {
  id: string;
  name: string;
  
  // Características básicas
  type: NPCCompanyType;
  strategy: 'low_cost' | 'high_quality' | 'niche' | 'balanced' | 'aggressive';
  
  // Finanzas
  cash: number;
  assets: number;
  liabilities: number;
  profitMargin: number;
  
  // Reputación y mercado
  reputation: number; // 1-100
  marketShare: Record<string, number>; // productId -> % de mercado
  
  // Comportamiento
  aggressiveness: numbe
(Content truncated due to size limit. Use line ranges to read in chunks)