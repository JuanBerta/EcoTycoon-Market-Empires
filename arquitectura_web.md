# Arquitectura del Sistema para EcoTycoon: Market Empires (Versión Web)

## Visión General de la Arquitectura

EcoTycoon: Market Empires se desarrollará como una aplicación web basada en HTML5, CSS3 y JavaScript, optimizada para su publicación en itch.io. La arquitectura seguirá un patrón Modelo-Vista-Controlador (MVC) adaptado para aplicaciones web de una sola página (SPA), con un enfoque en la modularidad y escalabilidad.

## Componentes Principales

### 1. Núcleo del Motor de Juego (Game Engine Core)

Este componente central gestionará el bucle principal del juego, la sincronización de tiempo y el estado global.

**Responsabilidades:**
- Gestionar el bucle de juego (game loop)
- Controlar el tiempo de simulación
- Mantener el estado global del juego
- Coordinar la comunicación entre módulos
- Gestionar el sistema de guardado/carga

**Implementación técnica:**
- JavaScript puro para máximo rendimiento
- Sistema de eventos para comunicación entre módulos
- Patrón singleton para acceso global
- Sistema de serialización para guardado/carga en localStorage

### 2. Sistema de Renderizado (Rendering System)

Responsable de toda la representación visual del juego en el navegador.

**Responsabilidades:**
- Renderizar la interfaz de usuario
- Gestionar el mapa del mundo y sus elementos visuales
- Manejar animaciones y transiciones
- Implementar efectos visuales

**Implementación técnica:**
- HTML5 Canvas para el mapa y elementos dinámicos
- DOM para interfaces estáticas y menús
- CSS3 para estilos, animaciones y responsividad
- Biblioteca de gráficos ligera (como Pixi.js) para renderizado eficiente

### 3. Gestor de Datos (Data Manager)

Administra todos los datos del juego, desde configuraciones hasta el estado actual.

**Responsabilidades:**
- Cargar datos de configuración inicial
- Gestionar el estado persistente del juego
- Proporcionar interfaces para acceso a datos
- Implementar sistema de guardado/carga

**Implementación técnica:**
- JSON para estructura de datos
- localStorage para persistencia
- IndexedDB para almacenamiento de datos más complejos
- Sistema de caché para optimizar acceso a datos frecuentes

### 4. Simulador Económico (Economic Simulator)

El corazón de la simulación de negocios, gestionando precios, demanda y tendencias.

**Responsabilidades:**
- Calcular precios de mercado dinámicos
- Simular tendencias de consumo
- Gestionar inflación y otros factores económicos
- Procesar eventos económicos regionales

**Implementación técnica:**
- Algoritmos de simulación económica en JavaScript
- Sistema basado en reglas para eventos económicos
- Cálculos por lotes (batch processing) para optimizar rendimiento

### 5. Sistema de IA para NPCs (NPC AI System)

Controla el comportamiento de las empresas competidoras.

**Responsabilidades:**
- Tomar decisiones para empresas NPC
- Implementar diferentes estrategias de IA
- Gestionar expansión y contracción de negocios NPC
- Simular negociaciones de contratos

**Implementación técnica:**
- Máquinas de estado finito para comportamientos básicos
- Algoritmos de toma de decisiones basados en reglas
- Sistema de prioridades para objetivos de IA
- Optimización para limitar cálculos por ciclo

### 6. Gestor de Entidades (Entity Manager)

Administra todas las entidades del juego (empresas, fábricas, tiendas, etc.).

**Responsabilidades:**
- Crear, actualizar y eliminar entidades
- Gestionar relaciones entre entidades
- Proporcionar sistema de consultas para filtrar entidades
- Optimizar rendimiento con técnicas de agrupación

**Implementación técnica:**
- Sistema de componentes ligero
- Identificadores únicos para todas las entidades
- Índices espaciales para consultas geográficas eficientes
- Lazy loading para entidades fuera del foco actual

### 7. Sistema de Interfaz de Usuario (UI System)

Gestiona toda la interacción del usuario con el juego.

**Responsabilidades:**
- Renderizar elementos de UI
- Procesar interacciones del usuario
- Gestionar menús y paneles
- Implementar sistema de notificaciones

**Implementación técnica:**
- Componentes web reutilizables
- Sistema de plantillas para generación dinámica de UI
- Gestión de eventos de usuario (click, drag, etc.)
- Diseño responsivo para diferentes tamaños de pantalla

### 8. Sistema de Tiempo y Eventos (Time & Event System)

Controla el flujo de tiempo en el juego y los eventos programados.

**Responsabilidades:**
- Gestionar el paso del tiempo en el juego
- Programar y disparar eventos
- Sincronizar acciones basadas en tiempo
- Implementar pausas y cambios de velocidad

**Implementación técnica:**
- Sistema de tick basado en requestAnimationFrame
- Cola de prioridad para eventos programados
- Sistema de suscripción para notificaciones de eventos
- Optimización para eventos frecuentes

## Diagrama de Arquitectura

```
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
|  UI System          |<--->|  Game Engine Core   |<--->|  Rendering System   |
|                     |     |                     |     |                     |
+---------------------+     +---------------------+     +---------------------+
         ^                           ^                           ^
         |                           |                           |
         v                           v                           v
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
|  Entity Manager     |<--->|  Data Manager       |<--->|  Time & Event System|
|                     |     |                     |     |                     |
+---------------------+     +---------------------+     +---------------------+
         ^                           ^                           ^
         |                           |                           |
         v                           v                           v
+---------------------+     +---------------------+
|                     |     |                     |
|  NPC AI System      |<--->|  Economic Simulator |
|                     |     |                     |
+---------------------+     +---------------------+
```

## Interfaces entre Componentes

### Game Engine Core <-> UI System
- Comandos de usuario
- Actualizaciones de estado para UI
- Notificaciones y alertas

### Game Engine Core <-> Rendering System
- Estado de juego para renderizado
- Solicitudes de actualización visual
- Configuración de cámara y vista

### Game Engine Core <-> Data Manager
- Operaciones de guardado/carga
- Consultas de datos de configuración
- Actualizaciones de estado persistente

### Game Engine Core <-> Time & Event System
- Control de velocidad de simulación
- Registro y disparo de eventos
- Sincronización de ciclos de juego

### Entity Manager <-> Economic Simulator
- Datos de entidades para cálculos económicos
- Actualizaciones de precios y demanda
- Impacto económico en entidades

### Entity Manager <-> NPC AI System
- Estado de entidades NPC
- Decisiones de IA para actualizar entidades
- Consultas sobre relaciones entre entidades

### NPC AI System <-> Economic Simulator
- Datos económicos para toma de decisiones
- Impacto de decisiones de IA en la economía
- Predicciones económicas para planificación de IA

## Consideraciones Técnicas para Entorno Web

### Optimización de Rendimiento
- Minimizar operaciones DOM
- Utilizar Web Workers para cálculos intensivos
- Implementar técnicas de throttling y debouncing
- Optimizar ciclos de renderizado

### Almacenamiento de Datos
- Utilizar localStorage para partidas guardadas
- Implementar sistema de respaldo automático
- Ofrecer exportación/importación de partidas

### Compatibilidad con Navegadores
- Enfoque en navegadores modernos (Chrome, Firefox, Safari, Edge)
- Polyfills para funcionalidades no universales
- Pruebas en múltiples navegadores

### Responsividad
- Diseño adaptable a diferentes tamaños de pantalla
- Controles optimizados para dispositivos táctiles
- Layouts alternativos para móvil/tablet/escritorio

### Optimización para itch.io
- Estructura de archivos compatible
- Tamaño total optimizado
- Carga progresiva de recursos

## Estrategia de Implementación

La implementación seguirá un enfoque modular e incremental:

1. **Fase 1: Infraestructura Básica**
   - Implementar Game Engine Core
   - Desarrollar sistema de renderizado básico
   - Crear gestor de datos fundamental
   - Establecer sistema de UI básico

2. **Fase 2: Simulación Económica Simple**
   - Implementar sistema económico básico
   - Desarrollar entidades fundamentales
   - Crear IA simple para NPCs
   - Implementar interfaz de usuario para gestión básica

3. **Fase 3: Expansión de Funcionalidades**
   - Añadir sistemas de contratos
   - Implementar múltiples regiones
   - Desarrollar sistema de I+D
   - Mejorar IA de NPCs

4. **Fase 4: Pulido y Características Avanzadas**
   - Implementar características opcionales
   - Optimizar rendimiento
   - Mejorar interfaz de usuario
   - Añadir tutoriales y ayuda contextual

## Conclusiones

La arquitectura propuesta está diseñada específicamente para un juego de simulación de negocios basado en web, optimizado para su publicación en itch.io. La estructura modular permitirá un desarrollo incremental y facilitará la adición de nuevas características en el futuro.

El enfoque en tecnologías web estándar (HTML5, CSS3, JavaScript) asegura la compatibilidad con la plataforma itch.io y proporciona una base sólida para implementar todas las funcionalidades requeridas en el concepto original del juego.
