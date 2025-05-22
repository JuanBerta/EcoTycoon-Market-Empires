// Sistema de actualización en tiempo real de datos
import { useEffect, useRef, useState } from 'react';

// Tipos para el sistema de actualización en tiempo real
export type UpdateFrequency = 'high' | 'medium' | 'low';
export type DataSubscription = {
  id: string;
  dataType: string;
  callback: (data: any) => void;
  frequency: UpdateFrequency;
  lastUpdated?: number;
};

// Intervalos de actualización en milisegundos
const UPDATE_INTERVALS = {
  high: 2000,    // 2 segundos
  medium: 5000,  // 5 segundos
  low: 10000     // 10 segundos
};

// Clase para gestionar las actualizaciones en tiempo real
class RealTimeUpdateManager {
  private static instance: RealTimeUpdateManager;
  private subscriptions: Map<string, DataSubscription>;
  private updateIntervals: Map<UpdateFrequency, NodeJS.Timeout | null>;
  private isRunning: boolean;

  private constructor() {
    this.subscriptions = new Map();
    this.updateIntervals = new Map([
      ['high', null],
      ['medium', null],
      ['low', null]
    ]);
    this.isRunning = false;
  }

  // Patrón Singleton para asegurar una única instancia
  public static getInstance(): RealTimeUpdateManager {
    if (!RealTimeUpdateManager.instance) {
      RealTimeUpdateManager.instance = new RealTimeUpdateManager();
    }
    return RealTimeUpdateManager.instance;
  }

  // Iniciar el sistema de actualizaciones
  public start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    
    // Configurar intervalos para cada frecuencia
    for (const [frequency, interval] of Object.entries(UPDATE_INTERVALS)) {
      this.updateIntervals.set(frequency as UpdateFrequency, 
        setInterval(() => this.processUpdates(frequency as UpdateFrequency), interval)
      );
    }
    
    console.log('Sistema de actualización en tiempo real iniciado');
  }

  // Detener el sistema de actualizaciones
  public stop(): void {
    if (!this.isRunning) return;
    
    // Limpiar todos los intervalos
    for (const [frequency, intervalId] of this.updateIntervals.entries()) {
      if (intervalId) {
        clearInterval(intervalId);
        this.updateIntervals.set(frequency, null);
      }
    }
    
    this.isRunning = false;
    console.log('Sistema de actualización en tiempo real detenido');
  }

  // Suscribirse a actualizaciones de datos
  public subscribe(subscription: DataSubscription): string {
    this.subscriptions.set(subscription.id, {
      ...subscription,
      lastUpdated: Date.now()
    });
    
    // Iniciar el sistema si no está corriendo
    if (!this.isRunning) {
      this.start();
    }
    
    console.log(`Nueva suscripción: ${subscription.id} (${subscription.dataType})`);
    return subscription.id;
  }

  // Cancelar suscripción
  public unsubscribe(subscriptionId: string): boolean {
    const result = this.subscriptions.delete(subscriptionId);
    
    // Si no quedan suscripciones, detener el sistema
    if (this.subscriptions.size === 0) {
      this.stop();
    }
    
    console.log(`Suscripción cancelada: ${subscriptionId}`);
    return result;
  }

  // Procesar actualizaciones para una frecuencia específica
  private processUpdates(frequency: UpdateFrequency): void {
    const now = Date.now();
    
    // Filtrar suscripciones por frecuencia
    for (const [id, subscription] of this.subscriptions.entries()) {
      if (subscription.frequency === frequency) {
        // Obtener datos actualizados y llamar al callback
        const updatedData = this.fetchUpdatedData(subscription.dataType);
        subscription.callback(updatedData);
        
        // Actualizar timestamp
        this.subscriptions.set(id, {
          ...subscription,
          lastUpdated: now
        });
      }
    }
  }

  // Simular obtención de datos actualizados (en producción, esto haría llamadas a APIs o servicios)
  private fetchUpdatedData(dataType: string): any {
    // Simulación de datos actualizados según el tipo
    switch (dataType) {
      case 'economicData':
        return {
          timestamp: Date.now(),
          playerMoney: Math.floor(90000 + Math.random() * 10000),
          marketTrends: Math.random() > 0.5 ? 'up' : 'down',
          inflation: 2 + Math.random() * 3
        };
      case 'productionData':
        return {
          timestamp: Date.now(),
          factories: [
            { id: 'factory1', efficiency: 75 + Math.floor(Math.random() * 10) },
            { id: 'factory2', efficiency: 65 + Math.floor(Math.random() * 15) }
          ],
          totalProduction: 1000 + Math.floor(Math.random() * 200)
        };
      case 'marketData':
        return {
          timestamp: Date.now(),
          prices: {
            'product1': 100 + Math.floor(Math.random() * 20),
            'product2': 200 + Math.floor(Math.random() * 30),
            'product3': 50 + Math.floor(Math.random() * 10)
          },
          demand: {
            'product1': 80 + Math.floor(Math.random() * 20),
            'product2': 60 + Math.floor(Math.random() * 30),
            'product3': 90 + Math.floor(Math.random() * 10)
          }
        };
      case 'logisticsData':
        return {
          timestamp: Date.now(),
          warehouses: [
            { id: 'wh1', occupation: 75 + Math.floor(Math.random() * 10) },
            { id: 'wh2', occupation: 60 + Math.floor(Math.random() * 15) }
          ],
          deliveries: 5 + Math.floor(Math.random() * 3)
        };
      case 'researchData':
        return {
          timestamp: Date.now(),
          activeProjects: [
            { 
              id: 'proj1', 
              progress: Math.min(100, 67 + Math.floor(Math.random() * 5)),
              timeRemaining: Math.max(0, 5 - Math.floor(Math.random() * 2))
            },
            { 
              id: 'proj2', 
              progress: Math.min(100, 33 + Math.floor(Math.random() * 3)),
              timeRemaining: Math.max(0, 12 - Math.floor(Math.random() * 1))
            }
          ]
        };
      default:
        return {
          timestamp: Date.now(),
          message: 'Tipo de datos no reconocido'
        };
    }
  }
}

// Hook personalizado para usar el sistema de actualización en tiempo real
export function useRealTimeData<T>(
  dataType: string,
  initialData: T,
  frequency: UpdateFrequency = 'medium'
): [T, boolean] {
  const [data, setData] = useState<T>(initialData);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const subscriptionIdRef = useRef<string | null>(null);
  
  useEffect(() => {
    // Crear un ID único para la suscripción
    const subscriptionId = `${dataType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Callback para actualizar los datos
    const updateCallback = (newData: T) => {
      setData(prevData => ({
        ...prevData,
        ...newData
      }));
      setIsUpdating(false);
    };
    
    // Crear suscripción
    const manager = RealTimeUpdateManager.getInstance();
    subscriptionIdRef.current = manager.subscribe({
      id: subscriptionId,
      dataType,
      callback: updateCallback,
      frequency
    });
    
    setIsUpdating(true);
    
    // Limpiar suscripción al desmontar
    return () => {
      if (subscriptionIdRef.current) {
        manager.unsubscribe(subscriptionIdRef.current);
        subscriptionIdRef.current = null;
      }
    };
  }, [dataType, frequency]);
  
  return [data, isUpdating];
}

// Exportar el gestor y el hook
export default {
  RealTimeUpdateManager,
  useRealTimeData
};
