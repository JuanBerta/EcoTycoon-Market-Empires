"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseSpecialization = void 0;
exports.generateWarehouseTemplates = generateWarehouseTemplates;
exports.createWarehouse = createWarehouse;
// Implementación de almacenes especializados
const uuid_1 = require("uuid");
const productDatabase_1 = require("./productDatabase");
// Enumeraciones
var WarehouseSpecialization;
(function (WarehouseSpecialization) {
    WarehouseSpecialization["GENERAL"] = "general";
    WarehouseSpecialization["REFRIGERATED"] = "refrigerated";
    WarehouseSpecialization["HIGH_SECURITY"] = "high_security";
    WarehouseSpecialization["HAZARDOUS"] = "hazardous";
    WarehouseSpecialization["AUTOMATED"] = "automated";
    WarehouseSpecialization["BULK"] = "bulk";
    WarehouseSpecialization["DISTRIBUTION"] = "distribution";
    WarehouseSpecialization["TEMPORARY"] = "temporary"; // Almacenamiento temporal de bajo costo
})(WarehouseSpecialization || (exports.WarehouseSpecialization = WarehouseSpecialization = {}));
// Generador de almacenes
function generateWarehouseTemplates() {
    return {
        'general-small': {
            name: 'Almacén General Pequeño',
            type: 'warehouse',
            specialization: WarehouseSpecialization.GENERAL,
            totalCapacity: 500,
            loadingSpeed: 30,
            organizationEfficiency: 50,
            allowedCategories: [
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.INDUSTRIAL,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.INDUSTRIAL,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.INDUSTRIAL,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
            allowedCategories: [productDatabase_1.ProductCategory.FOOD],
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
            allowedCategories: [productDatabase_1.ProductCategory.FOOD],
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
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.INDUSTRIAL
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
            allowedCategories: [productDatabase_1.ProductCategory.INDUSTRIAL],
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
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.INDUSTRIAL
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
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.INDUSTRIAL,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
                productDatabase_1.ProductCategory.FOOD,
                productDatabase_1.ProductCategory.ELECTRONICS,
                productDatabase_1.ProductCategory.TEXTILES,
                productDatabase_1.ProductCategory.INDUSTRIAL,
                productDatabase_1.ProductCategory.CONSUMER_GOODS
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
function createWarehouse(templateId, locationId, ownerId, customName) {
    const templates = generateWarehouseTemplates();
    const template = templates[templateId];
    if (!template) {
        throw new Error(`Template de almacén no encontrado: ${templateId}`);
    }
    return {
        id: `warehouse-${(0, uuid_1.v4)()}`,
        name: customName || template.name || 'Nuevo Almacén',
        type: 'warehouse',
        locationId,
        ownerId,
        specialization: template.specialization,
        totalCapacity: template.totalCapacity || 500,
        usedCapacity: 0,
        loadingSpeed: template.loadingSpeed || 30,
        organizationEfficiency: template.organizationEfficiency || 50,
        inventory: {},
        reservedSpace: {},
        allowedCategories: template.allowedCategories || [
            productDatabase_1.ProductCategory.FOOD,
            productDatabase_1.ProductCategory.ELECTRONICS,
            productDatabase_1.ProductCategory.TEXTILES,
            productDatabase_1.ProductCategory.INDUSTRIAL,
            productDatabase_1.ProductCategory.CONSUMER_GOODS
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
