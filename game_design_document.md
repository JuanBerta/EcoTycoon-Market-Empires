# Documento de Diseño del Juego (GDD)
# EcoTycoon: Market Empires

## Información General

**Título:** EcoTycoon: Market Empires  
**Género:** Simulación de negocios, Estrategia económica  
**Plataforma:** Web (HTML5)  
**Distribución:** itch.io  
**Audiencia objetivo:** Jugadores de 16+ años interesados en simulación económica y estrategia  
**Modo de juego:** Un solo jugador  

## Visión del Juego

EcoTycoon: Market Empires es un juego de simulación de negocios profundo donde los jugadores construyen y gestionan su propio imperio empresarial a través de múltiples regiones, países y ciudades. El juego se distingue por su simulación económica realista, competidores controlados por IA con comportamiento dinámico, y múltiples sistemas interconectados que crean una experiencia de gestión empresarial compleja y satisfactoria.

## Mecánicas Principales

### Sistema de Empresas NPC (IA)

Los competidores controlados por IA son un elemento central del juego, creando un entorno económico dinámico y desafiante.

**Comportamiento dinámico:**
- Cada NPC sigue una estrategia específica (bajo costo, alta calidad, mercados nicho)
- Toman decisiones basadas en condiciones de mercado y oportunidades
- Reaccionan a las acciones del jugador y otros NPCs

**Sistema de compra/venta:**
- NPCs compran materias primas del jugador o de otros NPCs
- Venden productos al jugador o directamente al mercado
- Negocian precios basados en oferta/demanda y calidad

**Contratos:**
- Establecen acuerdos a largo plazo para suministro o ventas
- Negocian términos y precios
- Sistema de reputación que afecta futuras negociaciones

**Expansión:**
- Abren o cierran negocios según rendimiento
- Expanden a nuevas ciudades o regiones
- Compiten por recursos y cuota de mercado

### Negocios del Jugador

El jugador puede establecer y gestionar diversos tipos de instalaciones empresariales.

**Instalaciones de producción:**
- Fábricas que transforman materias primas en productos
- Maquinaria mejorable que afecta velocidad, calidad y costo
- Especialización por tipo de producto

**Almacenamiento:**
- Almacenes con límites de espacio
- Sistema de transferencia entre regiones
- Gestión de inventario y logística

**Investigación y desarrollo:**
- Laboratorios para desbloquear nuevas tecnologías
- Proyectos de mejora de eficiencia
- Desarrollo de nuevos productos

**Ventas:**
- Tiendas minoristas en diferentes ubicaciones
- Ventas B2B a empresas NPC
- Estrategias de precios y marketing

### Tecnología e I+D

El avance tecnológico es clave para mantener la competitividad.

**Niveles tecnológicos:**
- Afectan calidad, costo y tiempo de producción
- Desbloquean nuevas capacidades
- Proporcionan ventajas competitivas

**Proyectos de I+D:**
- Investigación de nuevos productos
- Mejoras en logística y eficiencia
- Automatización y tecnologías sostenibles

### Simulación Mundial

El mundo del juego es dinámico y responde a las acciones del jugador y los NPCs.

**Ciudades y regiones:**
- Múltiples ciudades con características únicas
- Regiones con diferentes condiciones económicas
- Costos, impuestos y demanda variables

**Logística y cadena de suministro:**
- Diferentes medios de transporte
- Tiempos y costos de entrega
- Centros de distribución para optimizar flujo

**Sistema económico:**
- Tendencias de consumo evolutivas
- Acciones de competidores que afectan precios
- Eventos regionales (desastres, booms económicos)

### Gestión Empresarial

Herramientas para analizar y tomar decisiones informadas.

**Análisis y reportes:**
- Estados financieros
- Análisis de cuota de mercado
- Informes de competidores

**Personal:**
- Contratación y formación
- Diferentes roles y habilidades
- Sistemas de salarios y moral

### Sistema de Contratos

Los acuerdos comerciales formales son fundamentales para la estabilidad empresarial.

**Tipos de contratos:**
- Suministro de materias primas
- Acuerdos de venta garantizada
- Licencias y franquicias (características avanzadas)

**Negociación:**
- Términos de precio y volumen
- Duración y condiciones
- Penalizaciones por incumplimiento

## Interfaz de Usuario

La interfaz debe ser intuitiva pero completa, permitiendo acceso a todos los sistemas del juego.

**Elementos principales:**
- Mapa del mundo con zoom a ciudades
- Panel de control para finanzas, logística e investigación
- Panel de contratos y negociaciones
- Gestión de instalaciones y producción

**Diseño visual:**
- Estilo moderno y limpio
- Iconografía clara y consistente
- Paleta de colores que diferencia tipos de información
- Diseño responsivo para diferentes tamaños de pantalla

## Progresión del Juego

### Inicio

El jugador comienza con capital limitado y debe establecer su primer negocio.

**Fase inicial:**
- Tutorial guiado para aprender mecánicas básicas
- Establecimiento de primera fábrica o tienda
- Introducción gradual a los sistemas del juego

### Medio juego

El jugador expande su imperio a múltiples ciudades y diversifica su negocio.

**Expansión:**
- Apertura de negocios en nuevas ciudades
- Diversificación de líneas de productos
- Establecimiento de contratos importantes

### Juego avanzado

El jugador gestiona un imperio empresarial complejo y enfrenta desafíos más sofisticados.

**Complejidad:**
- Gestión de múltiples regiones
- Competencia intensa con NPCs avanzados
- Investigación de tecnologías de alto nivel
- Características opcionales (mercado de valores, espionaje)

## Plan de Implementación

### Fase 1: Núcleo del Juego (MVP)

**Duración estimada:** 8-10 semanas

**Objetivos:**
- Implementar sistema económico básico
- Crear una región con 2-3 ciudades
- Desarrollar producción simple (2-3 tipos de productos)
- Implementar NPCs con comportamiento básico
- Diseñar interfaz de usuario funcional

**Entregables:**
- Prototipo jugable con mecánicas básicas
- Sistema de guardado/carga
- Tutorial básico

### Fase 2: Expansión de Funcionalidades

**Duración estimada:** 6-8 semanas

**Objetivos:**
- Implementar sistema de contratos
- Añadir más regiones y ciudades
- Aumentar variedad de productos
- Mejorar comportamiento de NPCs
- Desarrollar sistema de I+D básico

**Entregables:**
- Versión beta con funcionalidades expandidas
- Mejoras de interfaz de usuario
- Sistema de ayuda contextual

### Fase 3: Sistemas Avanzados

**Duración estimada:** 6-8 semanas

**Objetivos:**
- Implementar economía compleja con eventos
- Desarrollar sistema completo de I+D
- Mejorar comportamiento avanzado de NPCs
- Añadir características opcionales (mercado de valores, espionaje)

**Entregables:**
- Versión 1.0 completa
- Optimizaciones de rendimiento
- Tutoriales completos

### Fase 4: Pulido y Optimización

**Duración estimada:** 4-6 semanas

**Objetivos:**
- Realizar pruebas de equilibrio
- Optimizar rendimiento
- Pulir interfaz de usuario
- Implementar feedback de usuarios beta

**Entregables:**
- Versión final pulida
- Documentación completa
- Paquete listo para distribución en itch.io

## Cronograma de Desarrollo

| Semana | Fase | Tareas Principales |
|--------|------|-------------------|
| 1-2 | Fase 1 | Configuración del proyecto, estructura básica, sistema económico simple |
| 3-4 | Fase 1 | Implementación de ciudades, interfaz de mapa, entidades básicas |
| 5-6 | Fase 1 | Desarrollo de NPCs básicos, sistema de producción simple |
| 7-8 | Fase 1 | Interfaz de usuario principal, sistema de guardado/carga |
| 9-10 | Fase 1 | Testing del MVP, correcciones, tutorial básico |
| 11-12 | Fase 2 | Sistema de contratos, expansión de regiones |
| 13-14 | Fase 2 | Ampliación de productos, mejora de NPCs |
| 15-16 | Fase 2 | Sistema de I+D básico, mejoras de interfaz |
| 17-18 | Fase 3 | Economía compleja, eventos regionales |
| 19-20 | Fase 3 | Sistema completo de I+D, comportamiento avanzado de NPCs |
| 21-22 | Fase 3 | Características opcionales avanzadas |
| 23-24 | Fase 4 | Testing de equilibrio, optimizaciones |
| 25-26 | Fase 4 | Pulido final, preparación para lanzamiento |

## Riesgos y Mitigación

| Riesgo | Impacto | Probabilidad | Estrategia de Mitigación |
|--------|---------|--------------|--------------------------|
| Complejidad excesiva de sistemas interconectados | Alto | Media | Desarrollo modular con interfaces claras, testing frecuente de integración |
| Problemas de rendimiento en navegadores | Alto | Media | Optimización temprana, profiling regular, técnicas de lazy loading |
| Desequilibrio en la economía del juego | Medio | Alta | Testing extensivo, sistema de configuración flexible, recopilación de feedback |
| Curva de aprendizaje demasiado pronunciada | Medio | Media | Tutorial por fases, ayuda contextual, simplificación inicial con complejidad gradual |
| Incompatibilidad con algunos navegadores | Medio | Baja | Testing en múltiples plataformas, polyfills, degradación elegante |

## Requisitos Técnicos

### Navegadores Soportados
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

### Requisitos Mínimos
- Conexión a internet para carga inicial
- 4GB de RAM
- Procesador moderno (2015+)
- Resolución mínima: 1280x720

### Almacenamiento
- ~50MB para la aplicación web
- ~10MB adicionales para datos de guardado

## Conclusión

EcoTycoon: Market Empires tiene el potencial de ofrecer una experiencia de simulación de negocios profunda y satisfactoria, con alta rejugabilidad gracias a la variedad de estrategias posibles y la naturaleza dinámica del mundo simulado. El enfoque de desarrollo incremental permitirá ir construyendo y refinando los sistemas del juego de manera ordenada, asegurando que cada componente funcione correctamente antes de añadir complejidad adicional.

La implementación como aplicación web utilizando tecnologías modernas (React, TypeScript, Tailwind CSS) facilitará su distribución a través de itch.io y garantizará una experiencia fluida en navegadores modernos. El diseño modular de la arquitectura permitirá la expansión futura con nuevas características y contenido.

## Referencias a Documentación Adicional

- [Análisis del Concepto](/home/ubuntu/EcoTycoon/docs/analisis_concepto.md): Desglose detallado de los sistemas y módulos del juego
- [Arquitectura Web](/home/ubuntu/EcoTycoon/docs/arquitectura_web.md): Diseño técnico de la arquitectura del sistema
- [Tecnologías](/home/ubuntu/EcoTycoon/docs/tecnologias.md): Selección y justificación de tecnologías y herramientas
