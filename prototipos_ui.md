# Diseño de Prototipos para UI Avanzada - EcoTycoon: Market Empires

## Estructura General de la Interfaz

La interfaz de usuario avanzada para EcoTycoon seguirá una estructura modular con un diseño responsivo optimizado para web/HTML. El diseño se basa en un sistema de paneles y tarjetas que pueden reorganizarse y adaptarse a diferentes tamaños de pantalla.

### Layout Principal

```
+---------------------------------------------------------------+
| HEADER: Logo, Tiempo de juego, Dinero, Notificaciones         |
+---------------+-----------------------------------------------+
| NAVEGACIÓN    | ÁREA DE CONTENIDO PRINCIPAL                   |
| LATERAL       |                                               |
|               | [Panel activo según selección de navegación]  |
| - Dashboard   |                                               |
| - Producción  |                                               |
| - Mercado     |                                               |
| - Logística   |                                               |
| - I+D         |                                               |
| - Finanzas    |                                               |
|               |                                               |
+---------------+-----------------------------------------------+
| FOOTER: Controles de tiempo, Mensajes del sistema             |
+---------------------------------------------------------------+
```

## Wireframes de Componentes Principales

### 1. Dashboard Principal

```
+---------------------------------------------------------------+
| RESUMEN FINANCIERO                  | ALERTAS Y NOTIFICACIONES|
| [Gráfico de ingresos/gastos]        | - Alerta competidor     |
| [Indicadores KPI]                   | - Oportunidad mercado   |
| [Balance simplificado]              | - Problema producción   |
+--------------------------------------+------------------------+
| MAPA INTERACTIVO                                             |
|                                                              |
| [Mapa de regiones con indicadores de presencia]              |
|                                                              |
| Filtros: [ ] Fábricas [ ] Almacenes [ ] Tiendas [ ] NPCs     |
+--------------------------------------+------------------------+
| MONITOR DE COMPETENCIA              | TENDENCIAS DE MERCADO   |
| [Lista de competidores principales] | [Gráfico de tendencias] |
| [Indicadores de actividad]          | [Indicadores de precios]|
+--------------------------------------+------------------------+
```

### 2. Panel de Gestión de Producción

```
+---------------------------------------------------------------+
| RESUMEN DE PRODUCCIÓN               | EFICIENCIA GLOBAL: 78%  |
+--------------------------------------+------------------------+
| FÁBRICAS                                                      |
|                                                              |
| +------------+------------+------------+------------+        |
| | FÁBRICA 1  | FÁBRICA 2  | FÁBRICA 3  | + NUEVA    |        |
| | Alimentos  | Electrón.  | Textiles   | FÁBRICA    |        |
| | 85% Efic.  | 72% Efic.  | 80% Efic.  |            |        |
| | [Detalles] | [Detalles] | [Detalles] |            |        |
| +------------+------------+------------+------------+        |
+--------------------------------------+------------------------+
| LÍNEAS DE PRODUCCIÓN ACTIVAS                                 |
|                                                              |
| PRODUCTO        | CANTIDAD | CALIDAD | TIEMPO | PROGRESO     |
| Alimentos Básic.| 100      | 75%     | 2h     | [====--] 67% |
| Electrónica Bás.| 50       | 85%     | 4h     | [==----] 33% |
| Ropa Básica     | 75       | 80%     | 3h     | [===---] 50% |
| + Nueva línea   |          |         |        |              |
+--------------------------------------+------------------------+
| RECURSOS                            | CONTROL DE CALIDAD      |
| [Gráfico de inventario]            | [Métricas de calidad]   |
| [Alertas de escasez]               | [Comparativa]           |
+--------------------------------------+------------------------+
```

### 3. Panel de Análisis de Mercado

```
+---------------------------------------------------------------+
| FILTROS: [Categoría ▼] [Región ▼] [Período ▼] [Aplicar]       |
+---------------------------------------------------------------+
| TENDENCIAS DE PRECIOS                                         |
|                                                              |
| [Gráfico lineal interactivo con múltiples series temporales] |
|                                                              |
| Leyenda: — Tu precio — Precio medio — Precio competidor      |
+--------------------------------------+------------------------+
| MAPA DE CALOR DE DEMANDA            | ANÁLISIS DE COMPETENCIA |
|                                     |                        |
| [Mapa con gradiente de colores      | [Tabla comparativa de   |
|  mostrando demanda por región]      |  cuotas de mercado]     |
|                                     |                        |
| Escala: Baja ■■■■■ Alta            | [Gráfico radar de       |
|                                     |  estrategias]           |
+--------------------------------------+------------------------+
| OPORTUNIDADES DETECTADAS                                      |
|                                                              |
| PRODUCTO        | REGIÓN    | DEMANDA | COMPETENCIA | ACCIÓN  |
| Alimentos Gourm.| Norte     | Alta    | Baja        | [Entrar]|
| Electrónica Av. | Central   | Media   | Alta        | [Analiz]|
| Textiles Lujo   | Sur       | Alta    | Media       | [Entrar]|
+---------------------------------------------------------------+
```

### 4. Panel de Gestión Logística

```
+---------------------------------------------------------------+
| RED DE DISTRIBUCIÓN                                           |
|                                                              |
| [Mapa interactivo con rutas de distribución y almacenes]     |
|                                                              |
| Leyenda: ● Almacén ● Fábrica ● Tienda — Ruta                 |
+--------------------------------------+------------------------+
| ALMACENES                                                     |
|                                                              |
| +------------+------------+------------+------------+        |
| | ALMACÉN 1  | ALMACÉN 2  | ALMACÉN 3  | + NUEVO    |        |
| | General    | Refriger.  | Alta Seg.  | ALMACÉN    |        |
| | 85% Ocup.  | 62% Ocup.  | 40% Ocup.  |            |        |
| | [Detalles] | [Detalles] | [Detalles] |            |        |
| +------------+------------+------------+------------+        |
+--------------------------------------+------------------------+
| PLANIFICACIÓN DE SUMINISTRO                                  |
|                                                              |
| PRODUCTO        | STOCK    | DEMANDA  | ESTADO    | ACCIÓN   |
| Alimentos Básic.| 250      | 300/sem  | Escasez   | [Pedir]  |
| Electrónica Bás.| 180      | 100/sem  | Exceso    | [Reducir]|
| Ropa Básica     | 120      | 125/sem  | Óptimo    | [Auto]   |
+--------------------------------------+------------------------+
| COSTOS LOGÍSTICOS                   | OPTIMIZACIÓN           |
| [Gráfico de costos por ruta]        | [Recomendaciones]      |
+--------------------------------------+------------------------+
```

### 5. Panel de Investigación y Desarrollo

```
+---------------------------------------------------------------+
| ÁRBOL TECNOLÓGICO                                             |
|                                                              |
| [Visualización interactiva de tecnologías disponibles]       |
|                                                              |
| Filtros: [Categoría ▼] [Nivel ▼] [Estado ▼] [Aplicar]        |
+--------------------------------------+------------------------+
| PROYECTOS ACTIVOS                                            |
|                                                              |
| PROYECTO       | INVERSIÓN | PROGRESO | BENEFICIO | TIEMPO   |
| Autom. Avanz.  | $50K      | [===--]  | +20% Efic.| 14 días  |
| Eco-materiales | $30K      | [==---]  | -15% Cost.| 10 días  |
| + Nuevo        |           |          |           |          |
+--------------------------------------+------------------------+
| LABORATORIO DE PRODUCTOS            | INNOVACIÓN COMPETITIVA  |
|                                     |                        |
| [Prototipos en desarrollo]          | [Análisis de tendencias]|
| [Pruebas de mercado]                | [Benchmarking]          |
+--------------------------------------+------------------------+
```

## Diseño Visual y Estilo

### Paleta de Colores

```
COLORES PRIMARIOS
- Azul corporativo: #1a73e8
- Azul oscuro: #0d47a1
- Blanco: #ffffff

COLORES SECUNDARIOS
- Verde éxito: #34a853
- Rojo alerta: #ea4335
- Amarillo advertencia: #fbbc05
- Gris neutro: #5f6368

COLORES DE ACENTO
- Púrpura innovación: #673ab7
- Naranja energía: #ff5722
- Cian información: #00acc1
```

### Tipografía

```
- Títulos principales: Montserrat, 24px, Bold
- Subtítulos: Montserrat, 18px, Semibold
- Texto normal: Open Sans, 14px, Regular
- Datos pequeños: Open Sans, 12px, Regular
- Énfasis: Open Sans, 14px, Bold
```

### Iconografía

Se utilizará un conjunto coherente de iconos de estilo flat con líneas simples para todas las funciones principales:

- Dashboard: Icono de gráfico
- Producción: Icono de fábrica
- Mercado: Icono de gráfico de barras ascendente
- Logística: Icono de camión
- I+D: Icono de bombilla
- Finanzas: Icono de moneda

### Componentes UI Reutilizables

1. **Tarjetas de Información**
   ```
   +------------------------+
   | TÍTULO DE TARJETA      |
   +------------------------+
   | Contenido principal    |
   |                        |
   +------------------------+
   | [Acción 1] [Acción 2]  |
   +------------------------+
   ```

2. **Gráficos Estándar**
   - Gráficos de líneas para tendencias temporales
   - Gráficos de barras para comparativas
   - Gráficos circulares para distribuciones
   - Mapas de calor para distribuciones geográficas

3. **Tablas de Datos**
   ```
   +-------+-------+-------+-------+
   | COL 1 | COL 2 | COL 3 | ACCIÓN|
   +-------+-------+-------+-------+
   | Dato  | Dato  | Dato  | [BTN] |
   +-------+-------+-------+-------+
   | Dato  | Dato  | Dato  | [BTN] |
   +-------+-------+-------+-------+
   ```

4. **Indicadores de Estado**
   - Barras de progreso para procesos en curso
   - Indicadores numéricos con código de colores
   - Badges para estados (Activo, Pausado, Completado)

5. **Controles de Filtro**
   ```
   +-------+  +-------+  +--------+  +--------+
   |Filtro▼|  |Filtro▼|  |Filtro ▼|  |[Aplicar]|
   +-------+  +-------+  +--------+  +--------+
   ```

## Interacciones y Comportamiento

### Navegación Principal

- Menú lateral colapsable para maximizar espacio de trabajo
- Accesos directos a funciones frecuentes
- Migas de pan para navegación jerárquica
- Pestañas para alternar entre vistas relacionadas

### Interacciones con Datos

- Tooltips detallados al pasar el cursor sobre elementos de datos
- Zoom y pan en gráficos y mapas
- Filtrado dinámico con actualización inmediata de visualizaciones
- Drill-down para explorar datos en mayor detalle

### Feedback al Usuario

- Notificaciones toast para confirmaciones
- Alertas modales para acciones importantes
- Indicadores de carga para procesos largos
- Animaciones sutiles para transiciones

## Adaptabilidad y Responsividad

### Breakpoints Principales

- Desktop: > 1200px (vista completa)
- Tablet: 768px - 1199px (reorganización de paneles)
- Mobile: < 767px (vista simplificada, navegación adaptada)

### Estrategia de Adaptación

- Layout fluido con sistema de grid
- Reordenamiento de componentes según importancia
- Colapso de paneles secundarios en vistas reducidas
- Menús hamburguesa para navegación en vistas pequeñas

## Implementación Técnica

### Tecnologías Recomendadas

- **Framework UI**: React con TypeScript
- **Biblioteca de Componentes**: Material-UI o Tailwind CSS
- **Visualización de Datos**: D3.js, Chart.js o Recharts
- **Mapas Interactivos**: Leaflet o Mapbox
- **Gestión de Estado**: Redux o Context API

### Estructura de Componentes

```
/components
  /layout
    Header.tsx
    Sidebar.tsx
    Footer.tsx
    MainLayout.tsx
  /dashboard
    DashboardPanel.tsx
    FinancialSummary.tsx
    CompetitorMonitor.tsx
    InteractiveMap.tsx
  /production
    ProductionPanel.tsx
    FactoryCard.tsx
    ProductionLineTable.tsx
    ResourceMonitor.tsx
  /market
    MarketPanel.tsx
    PriceTrends.tsx
    DemandHeatmap.tsx
    CompetitorAnalysis.tsx
  /logistics
    LogisticsPanel.tsx
    WarehouseCard.tsx
    DistributionMap.tsx
    SupplyPlanner.tsx
  /research
    ResearchPanel.tsx
    TechTree.tsx
    ProjectCard.tsx
    InnovationLab.tsx
  /common
    Card.tsx
    Table.tsx
    Chart.tsx
    StatusIndicator.tsx
    FilterControls.tsx
```

## Plan de Implementación

### Fase 1: Estructura Base y Dashboard

1. Configurar proyecto con tecnologías seleccionadas
2. Implementar layout principal y navegación
3. Desarrollar componentes comunes reutilizables
4. Crear dashboard principal con datos simulados

### Fase 2: Paneles Funcionales

1. Implementar panel de producción
2. Desarrollar panel de análisis de mercado
3. Crear panel de gestión logística
4. Implementar panel de I+D

### Fase 3: Integración y Refinamiento

1. Conectar UI con datos reales del motor económico
2. Implementar interactividad completa
3. Optimizar rendimiento
4. Pulir experiencia de usuario y diseño visual

## Consideraciones Adicionales

### Accesibilidad

- Contraste adecuado para todos los elementos
- Textos alternativos para elementos visuales
- Navegación por teclado
- Compatibilidad con lectores de pantalla

### Rendimiento

- Carga diferida de componentes pesados
- Optimización de renderizado
- Caché de datos frecuentes
- Compresión de assets

### Pruebas

- Pruebas de usabilidad con usuarios
- Pruebas de rendimiento
- Pruebas de compatibilidad con navegadores
- Pruebas de accesibilidad
