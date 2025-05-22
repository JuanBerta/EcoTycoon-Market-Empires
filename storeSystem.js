"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSpecialization = void 0;
exports.generateStoreTemplates = generateStoreTemplates;
exports.createStore = createStore;
// Implementación de tiendas especializadas
const uuid_1 = require("uuid");
const productDatabase_1 = require("./productDatabase");
// Enumeraciones
var StoreSpecialization;
(function (StoreSpecialization) {
    StoreSpecialization["GENERAL"] = "general";
    StoreSpecialization["SPECIALIZED"] = "specialized";
    StoreSpecialization["DISCOUNT"] = "discount";
    StoreSpecialization["PREMIUM"] = "premium";
    StoreSpecialization["OUTLET"] = "outlet";
    StoreSpecialization["DEPARTMENT"] = "department";
    StoreSpecialization["CONVENIENCE"] = "convenience";
    StoreSpecialization["ONLINE"] = "online"; // Tienda virtual
})(StoreSpecialization || (exports.StoreSpecialization = StoreSpecialization = {}));
// Generador de tiendas
function generateStoreTemplates() {
    return {
        'food-general-small': {
            name: 'Tienda de Alimentación Pequeña',
            type: 'store',
            specialization: StoreSpecialization.GENERAL,
            storeCategory: productDatabase_1.ProductCategory.FOOD,
            floorSpace: 100,
            displayCapacity: 20,
            storageCapacity: 200,
            salesCapacity: 50,
            customerCapacity: 100,
            marketingLevel: 40,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM],
            rent: 500,
            operatingCosts: 200,
            staffCapacity: 5,
            locationQuality: 60,
            footTraffic: 200,
            upgradeSlots: 2
        },
        'food-general-medium': {
            name: 'Supermercado Mediano',
            type: 'store',
            specialization: StoreSpecialization.GENERAL,
            storeCategory: productDatabase_1.ProductCategory.FOOD,
            floorSpace: 500,
            displayCapacity: 100,
            storageCapacity: 1000,
            salesCapacity: 250,
            customerCapacity: 500,
            marketingLevel: 60,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.BUDGET],
            rent: 2000,
            operatingCosts: 800,
            staffCapacity: 20,
            locationQuality: 70,
            footTraffic: 800,
            upgradeSlots: 3
        },
        'food-discount': {
            name: 'Supermercado de Descuento',
            type: 'store',
            specialization: StoreSpecialization.DISCOUNT,
            storeCategory: productDatabase_1.ProductCategory.FOOD,
            floorSpace: 1200,
            displayCapacity: 200,
            storageCapacity: 2000,
            salesCapacity: 500,
            customerCapacity: 1000,
            marketingLevel: 50,
            targetDemographic: [productDatabase_1.MarketSegment.BUDGET, productDatabase_1.MarketSegment.MAINSTREAM],
            rent: 3000,
            operatingCosts: 1200,
            staffCapacity: 30,
            locationQuality: 60,
            footTraffic: 1200,
            upgradeSlots: 3
        },
        'food-premium': {
            name: 'Tienda Gourmet',
            type: 'store',
            specialization: StoreSpecialization.PREMIUM,
            storeCategory: productDatabase_1.ProductCategory.FOOD,
            floorSpace: 300,
            displayCapacity: 80,
            storageCapacity: 400,
            salesCapacity: 100,
            customerCapacity: 150,
            marketingLevel: 80,
            targetDemographic: [productDatabase_1.MarketSegment.PREMIUM, productDatabase_1.MarketSegment.LUXURY],
            rent: 3500,
            operatingCosts: 1500,
            staffCapacity: 15,
            locationQuality: 90,
            footTraffic: 300,
            upgradeSlots: 4
        },
        'electronics-specialized': {
            name: 'Tienda de Electrónica Especializada',
            type: 'store',
            specialization: StoreSpecialization.SPECIALIZED,
            storeCategory: productDatabase_1.ProductCategory.ELECTRONICS,
            floorSpace: 400,
            displayCapacity: 60,
            storageCapacity: 300,
            salesCapacity: 80,
            customerCapacity: 150,
            marketingLevel: 70,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.SPECIALIZED],
            rent: 2500,
            operatingCosts: 1000,
            staffCapacity: 10,
            locationQuality: 80,
            footTraffic: 400,
            upgradeSlots: 3
        },
        'electronics-premium': {
            name: 'Tienda de Electrónica Premium',
            type: 'store',
            specialization: StoreSpecialization.PREMIUM,
            storeCategory: productDatabase_1.ProductCategory.ELECTRONICS,
            floorSpace: 500,
            displayCapacity: 50,
            storageCapacity: 500,
            salesCapacity: 100,
            customerCapacity: 200,
            marketingLevel: 85,
            targetDemographic: [productDatabase_1.MarketSegment.PREMIUM, productDatabase_1.MarketSegment.LUXURY],
            rent: 4000,
            operatingCosts: 1800,
            staffCapacity: 15,
            locationQuality: 90,
            footTraffic: 350,
            upgradeSlots: 4
        },
        'electronics-outlet': {
            name: 'Outlet de Electrónica',
            type: 'store',
            specialization: StoreSpecialization.OUTLET,
            storeCategory: productDatabase_1.ProductCategory.ELECTRONICS,
            floorSpace: 600,
            displayCapacity: 70,
            storageCapacity: 800,
            salesCapacity: 150,
            customerCapacity: 300,
            marketingLevel: 60,
            targetDemographic: [productDatabase_1.MarketSegment.BUDGET, productDatabase_1.MarketSegment.MAINSTREAM],
            rent: 2200,
            operatingCosts: 900,
            staffCapacity: 12,
            locationQuality: 60,
            footTraffic: 500,
            upgradeSlots: 3
        },
        'textiles-boutique': {
            name: 'Boutique de Ropa',
            type: 'store',
            specialization: StoreSpecialization.SPECIALIZED,
            storeCategory: productDatabase_1.ProductCategory.TEXTILES,
            floorSpace: 150,
            displayCapacity: 40,
            storageCapacity: 200,
            salesCapacity: 50,
            customerCapacity: 80,
            marketingLevel: 75,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.PREMIUM],
            rent: 1800,
            operatingCosts: 800,
            staffCapacity: 6,
            locationQuality: 85,
            footTraffic: 200,
            upgradeSlots: 3
        },
        'textiles-luxury': {
            name: 'Boutique de Ropa de Lujo',
            type: 'store',
            specialization: StoreSpecialization.PREMIUM,
            storeCategory: productDatabase_1.ProductCategory.TEXTILES,
            floorSpace: 200,
            displayCapacity: 30,
            storageCapacity: 300,
            salesCapacity: 50,
            customerCapacity: 100,
            marketingLevel: 90,
            targetDemographic: [productDatabase_1.MarketSegment.LUXURY],
            rent: 5000,
            operatingCosts: 2000,
            staffCapacity: 8,
            locationQuality: 95,
            footTraffic: 150,
            upgradeSlots: 4
        },
        'textiles-department': {
            name: 'Gran Almacén de Moda',
            type: 'store',
            specialization: StoreSpecialization.DEPARTMENT,
            storeCategory: productDatabase_1.ProductCategory.TEXTILES,
            floorSpace: 1000,
            displayCapacity: 200,
            storageCapacity: 2000,
            salesCapacity: 400,
            customerCapacity: 800,
            marketingLevel: 80,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.PREMIUM],
            rent: 6000,
            operatingCosts: 2500,
            staffCapacity: 40,
            locationQuality: 85,
            footTraffic: 1000,
            upgradeSlots: 5
        },
        'industrial-specialized': {
            name: 'Tienda de Suministros Industriales',
            type: 'store',
            specialization: StoreSpecialization.SPECIALIZED,
            storeCategory: productDatabase_1.ProductCategory.INDUSTRIAL,
            floorSpace: 800,
            displayCapacity: 100,
            storageCapacity: 1500,
            salesCapacity: 200,
            customerCapacity: 150,
            marketingLevel: 60,
            targetDemographic: [productDatabase_1.MarketSegment.SPECIALIZED],
            rent: 3000,
            operatingCosts: 1200,
            staffCapacity: 15,
            locationQuality: 70,
            footTraffic: 200,
            upgradeSlots: 3
        },
        'consumer-convenience': {
            name: 'Tienda de Conveniencia',
            type: 'store',
            specialization: StoreSpecialization.CONVENIENCE,
            storeCategory: 'mixed',
            floorSpace: 80,
            displayCapacity: 30,
            storageCapacity: 150,
            salesCapacity: 100,
            customerCapacity: 200,
            marketingLevel: 40,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM],
            rent: 1200,
            operatingCosts: 500,
            staffCapacity: 4,
            locationQuality: 75,
            footTraffic: 300,
            upgradeSlots: 2
        },
        'consumer-department': {
            name: 'Gran Almacén',
            type: 'store',
            specialization: StoreSpecialization.DEPARTMENT,
            storeCategory: 'mixed',
            floorSpace: 2000,
            displayCapacity: 500,
            storageCapacity: 5000,
            salesCapacity: 1000,
            customerCapacity: 2000,
            marketingLevel: 90,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.PREMIUM],
            rent: 10000,
            operatingCosts: 5000,
            staffCapacity: 100,
            locationQuality: 90,
            footTraffic: 2500,
            upgradeSlots: 6
        },
        'online-store': {
            name: 'Tienda Online',
            type: 'store',
            specialization: StoreSpecialization.ONLINE,
            storeCategory: 'mixed',
            floorSpace: 0,
            displayCapacity: 1000,
            storageCapacity: 0, // Requiere almacén separado
            salesCapacity: 500,
            customerCapacity: 5000,
            marketingLevel: 80,
            targetDemographic: [productDatabase_1.MarketSegment.MAINSTREAM, productDatabase_1.MarketSegment.BUDGET, productDatabase_1.MarketSegment.PREMIUM],
            rent: 500, // Solo oficina virtual
            operatingCosts: 2000, // Principalmente IT y marketing
            staffCapacity: 10,
            locationQuality: 100, // No depende de ubicación física
            footTraffic: 10000, // Tráfico web
            upgradeSlots: 5
        }
    };
}
// Función para crear una nueva tienda
function createStore(templateId, locationId, ownerId, customName) {
    const templates = generateStoreTemplates();
    const template = templates[templateId];
    if (!template) {
        throw new Error(`Template de tienda no encontrado: ${templateId}`);
    }
    return {
        id: `store-${(0, uuid_1.v4)()}`,
        name: customName || template.name || 'Nueva Tienda',
        type: 'store',
        locationId,
        ownerId,
        specialization: template.specialization,
        storeCategory: template.storeCategory || 'mixed',
        floorSpace: template.floorSpace || 100,
        displayCapacity: template.displayCapacity || 20,
        storageCapacity: template.storageCapacity || 200,
        salesCapacity: template.salesCapacity || 50,
        customerCapacity: template.customerCapacity || 100,
        productsForSale: {},
        customerSatisfaction: 50,
        reputation: 50,
        dailySales: {},
        marketingLevel: template.marketingLevel || 40,
        targetDemographic: template.targetDemographic || [productDatabase_1.MarketSegment.MAINSTREAM],
        rent: template.rent || 500,
        operatingCosts: template.operatingCosts || 200,
        staffCapacity: template.staffCapacity || 5,
        currentStaff: 0,
        staffSkillLevel: 50,
        locationQuality: template.locationQuality || 60,
        footTraffic: template.footTraffic || 200,
        upgrades: [],
        upgradeSlots: template.upgradeSlots || 2,
        condition: 100
    };
}
