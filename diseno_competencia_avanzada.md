# Diseño del Sistema de Competencia Avanzada - EcoTycoon: Market Empires

## Introducción

Este documento presenta el diseño técnico detallado para las mecánicas de competencia avanzada en "EcoTycoon: Market Empires", enfocándose en el Espionaje Corporativo y las Fusiones y Adquisiciones (M&A). Este diseño se basa en el análisis de requisitos previamente completado.

## 1. Sistema de Espionaje Corporativo

### 1.1. Estructura de Datos

```typescript
// Enumeraciones
enum TipoMisionEspionaje {
  RECOPILACION_INFO = 'recopilacion_info',
  ROBO_TECNOLOGIA = 'robo_tecnologia',
  SABOTAJE = 'sabotaje',
  MANIPULACION_MERCADO = 'manipulacion_mercado'
}

enum EstadoMision {
  PLANIFICANDO = 'planificando',
  EN_PROGRESO = 'en_progreso',
  COMPLETADA = 'completada',
  FALLIDA = 'fallida',
  DESCUBIERTA = 'descubierta'
}

enum EspecialidadAgente {
  INFORMACION = 'informacion',
  TECNOLOGIA = 'tecnologia',
  SABOTAJE = 'sabotaje',
  MANIPULACION = 'manipulacion',
  GENERALISTA = 'generalista'
}

// Interfaces
interface AgenteEspionaje {
  id: string;
  nombre: string;
  especialidad: EspecialidadAgente;
  nivelHabilidad: number; // 1-5
  lealtad: number; // 1-5
  costoMensual: number;
  experiencia: number;
  notoriedad: number; // 0-100
  estado: 'disponible' | 'en_mision' | 'recuperandose' | 'capturado';
  tiempoRecuperacion?: number; // Días restantes
}

interface MisionEspionaje {
  id: string;
  tipo: TipoMisionEspionaje;
  objetivoEmpresaId: string;
  objetivoEspecifico: string; // e.g., 'tecnologia_X', 'fabrica_Y'
  agenteAsignadoId: string;
  fechaInicio: number;
  duracionEstimada: number; // Días
  costoOperacion: number;
  probabilidadExitoBase: number; // 0-100
  probabilidadDeteccionBase: number; // 0-100
  estado: EstadoMision;
  resultado?: ResultadoMision;
}

interface ResultadoMision {
  exito: boolean;
  detectado: boolean;
  informacionObtenida?: any; // Datos específicos según misión
  tecnologiaRobadaId?: string;
  impactoSabotaje?: Efecto[]; // Efectos aplicados al objetivo
  impactoManipulacion?: Efecto[]; // Efectos en el mercado
  consecuenciasJugador?: Consecuencia[]; // Para el jugador
  consecuenciasAgente?: any; // Estado del agente
}

interface DepartamentoContraespionaje {
  nivelSeguridad: number; // 1-5
  presupuestoMensual: number;
  personalAsignado: number;
  tecnologiasSeguridad: string[]; // IDs de tecnologías
  eficienciaDeteccion: number; // 0-100
}
```

### 1.2. Lógica Principal

#### Reclutamiento de Agentes
- Se genera un pool de agentes disponibles periódicamente.
- Los atributos (habilidad, lealtad, costo) se generan aleatoriamente dentro de rangos definidos.
- El jugador puede contratar agentes pagando una tarifa inicial y un salario mensual.

#### Planificación de Misiones
- El jugador selecciona el tipo de misión, el objetivo (empresa y detalle) y asigna un agente.
- La duración, costo, probabilidad de éxito y detección se calculan basados en:
  - Tipo y complejidad de la misión.
  - Nivel de seguridad del objetivo (obtenido por misiones previas o estimado).
  - Habilidad y especialidad del agente asignado.
  - Notoriedad del agente.
  - Inversión adicional en recursos para la misión (opcional).

#### Ejecución de Misiones
- La misión entra en estado `EN_PROGRESO`.
- Cada día de juego, se realizan chequeos de progreso y detección.
- **Cálculo de Éxito/Fracaso**: Al finalizar la duración, se calcula el éxito basado en `probabilidadExitoBase` modificada por factores dinámicos (eventos, contraespionaje).
- **Cálculo de Detección**: Se calcula la detección basado en `probabilidadDeteccionBase` modificada por `eficienciaDeteccion` del objetivo y notoriedad del agente.

#### Resolución de Misiones
- **Éxito sin Detección**: Se obtienen los beneficios (información, tecnología, etc.) sin consecuencias negativas.
- **Éxito con Detección**: Se obtienen los beneficios, pero se aplican consecuencias (daño reputacional, represalias, etc.). El agente puede ser capturado.
- **Fracaso sin Detección**: No se obtienen beneficios, pero no hay consecuencias negativas directas. El agente regresa.
- **Fracaso con Detección**: No se obtienen beneficios y se aplican consecuencias. El agente es probablemente capturado.

#### Contraespionaje
- El jugador (y los NPCs) pueden invertir en un Departamento de Contraespionaje.
- El nivel de seguridad y la eficiencia de detección aumentan con el presupuesto, personal y tecnologías.
- Reduce la probabilidad de éxito de misiones enemigas y aumenta su probabilidad de detección.

### 1.3. Integración

- **Sistema Económico**: Costos de agentes y misiones. Impacto de sabotaje/manipulación en finanzas del objetivo y del mercado.
- **Sistema de Producción**: Sabotaje afectando fábricas. Robo de tecnología afectando I+D.
- **Sistema de NPCs**: Los NPCs también realizan espionaje y tienen departamentos de contraespionaje. Reaccionan a operaciones contra ellos.
- **Sistema de Eventos**: Misiones de espionaje pueden desencadenar eventos (escándalos, investigaciones).
- **Sistema de Reputación**: Ser descubierto afecta negativamente la reputación.

## 2. Sistema de Fusiones y Adquisiciones (M&A)

### 2.1. Estructura de Datos

```typescript
// Enumeraciones
enum TipoOperacionMA {
  ADQUISICION_COMPLETA = 'adquisicion_completa',
  ADQUISICION_PARCIAL = 'adquisicion_parcial',
  FUSION = 'fusion',
  JOINT_VENTURE = 'joint_venture'
}

enum EstadoNegociacion {
  IDENTIFICACION = 'identificacion',
  VALORACION = 'valoracion',
  OFERTA_INICIAL = 'oferta_inicial',
  NEGOCIANDO = 'negociando',
  ACUERDO_PRELIMINAR = 'acuerdo_preliminar',
  DUE_DILIGENCE = 'due_diligence',
  CIERRE = 'cierre',
  RECHAZADA = 'rechazada',
  CANCELADA = 'cancelada'
}

// Interfaces
interface ValoracionEmpresa {
  empresaId: string;
  fechaValoracion: number;
  valorEstimadoMin: number;
  valorEstimadoMax: number;
  metodoPrincipal: string; // e.g., 'multiplo_beneficios'
  factoresClave: { [key: string]: number }; // e.g., { activos: 1M, cuotaMercado: 20, ... }
}

interface OfertaMA {
  id: string;
  tipoOperacion: TipoOperacionMA;
  empresaOfertanteId: string;
  empresaObjetivoId: string;
  precioOfertado: number;
  porcentajeAdquisicion?: number; // Para adquisición parcial
  terminosFinanciacion: string; // e.g., 'efectivo', 'acciones', 'deuda'
  condiciones: string[]; // e.g., 'aprobacion_regulatoria'
  fechaOferta: number;
  estado: 'pendiente' | 'aceptada' | 'rechazada' | 'retirada';
}

interface NegociacionMA {
  id: string;
  tipoOperacion: TipoOperacionMA;
  empresaIniciadoraId: string;
  empresaObjetivoId: string;
  estado: EstadoNegociacion;
  valoracion?: ValoracionEmpresa;
  ofertas: OfertaMA[];
  fechaInicio: number;
  fechaUltimaActividad: number;
  acuerdoFinal?: AcuerdoMA;
}

interface AcuerdoMA {
  precioFinal: number;
  terminosFinales: any; // Detalles específicos del acuerdo
  fechaAcuerdo: number;
  sinergiasEstimadas: number;
  desafiosIntegracion: string[];
}

interface ProcesoIntegracion {
  id: string;
  negociacionId: string;
  empresaAdquiridaId?: string;
  empresaFusionadaId?: string;
  fechaInicio: number;
  duracionEstimada: number;
  progreso: number; // 0-100
  costoIntegracion: number;
  estado: 'en_progreso' | 'completada' | 'con_problemas';
  metricasClave: { [key: string]: number }; // e.g., { moral_empleados: 60, retencion_clientes: 85 }
}
```

### 2.2. Lógica Principal

#### Identificación y Valoración
- El jugador (o NPC) identifica empresas objetivo.
- Se realiza una valoración inicial (puede requerir espionaje para datos precisos).
- La valoración considera activos, beneficios, cuota de mercado, tecnología, potencial de sinergia.
- El resultado es un rango de valor (Min-Max).

#### Negociación
- Se presenta una oferta inicial (precio, tipo de operación, financiación).
- La empresa objetivo (controlada por IA con perfil estratégico) evalúa la oferta.
- Factores de decisión de la IA: Precio vs Valoración, situación financiera, relación con ofertante, ofertas competidoras.
- Proceso de contraofertas hasta acuerdo, rechazo o retirada.
- Posibilidad de OPA hostil (más cara, daña reputación, riesgo de fracaso mayor).

#### Due Diligence
- Tras acuerdo preliminar, fase de verificación de datos.
- Puede revelar problemas ocultos que afecten el precio o cancelen el trato.

#### Cierre y Financiación
- Se finaliza el acuerdo.
- El jugador debe asegurar la financiación (efectivo, préstamos, emisión de acciones).
- Se transfieren activos/propiedad.

#### Integración Post-Fusión/Adquisición
- Proceso que consume tiempo y recursos.
- Desafíos simulados: Choque cultural, redundancias, pérdida de talento/clientes.
- El éxito depende de la inversión en integración y compatibilidad inicial.
- Sinergias (reducción de costos, aumento de ingresos) se materializan gradualmente si la integración es exitosa.

### 2.3. Integración

- **Sistema Económico**: Valoración basada en datos financieros. Financiación afecta capital/deuda del jugador. Sinergias impactan rentabilidad.
- **Sistema de Producción/Logística/Tiendas**: Transferencia de activos. Optimización/redundancia de instalaciones.
- **Sistema de NPCs**: Empresas IA pueden ser objetivos o iniciadores de M&A. Tienen perfiles de negociación.
- **Sistema de Eventos**: Ofertas de M&A pueden ser eventos. Problemas de integración pueden generar eventos negativos.
- **Sistema de Reputación**: OPAs hostiles o integraciones fallidas dañan la reputación.
- **Sistema de Investigación**: Adquisición de tecnologías de la empresa comprada.

## 3. Sistema de Competencia Estratégica (Diseño Preliminar)

### 3.1. Alianzas Estratégicas
- **Estructura**: `Alianza { id, tipo, socios[], terminos, duracion, estado }`
- **Lógica**: Negociación de términos, gestión de la colaboración, seguimiento de beneficios/costos, opción de disolución.
- **Integración**: Compartir datos/recursos entre sistemas (distribución, I+D).

### 3.2. Guerra de Precios
- **Estructura**: Evento o acción estratégica con `duracion`, `intensidad`, `productos_afectados`.
- **Lógica**: Modificadores temporales en precios y demanda. Cálculo de impacto en márgenes y cuota de mercado. Reacción de competidores IA.
- **Integración**: Sistema Económico, Sistema de NPCs.

### 3.3. Bloqueo de Recursos
- **Estructura**: Contratos de exclusividad (`ContratoExclusividad { id, proveedorId, recursoId, duracion, costo }`).
- **Lógica**: Negociación con proveedores. Impacto en disponibilidad y costo para competidores.
- **Integración**: Sistema de Producción (materias primas), Sistema Económico (costos).

## 4. Interfaz de Usuario (Esbozo)

- **Panel de Inteligencia Competitiva**: Centraliza información de espionaje, M&A y competencia.
- **Subpanel de Espionaje**: Gestión de agentes, planificación de misiones, visualización de resultados.
- **Subpanel de M&A**: Buscador de objetivos, valoración, mesa de negociación, seguimiento de integración.
- **Subpanel de Alianzas**: Gestión de acuerdos existentes y propuestas.
- **Notificaciones Específicas**: Alertas sobre misiones de espionaje detectadas, ofertas de M&A recibidas, movimientos estratégicos de competidores.

## 5. Consideraciones Adicionales

- **IA Competitiva**: Debe ser capaz de utilizar estas mecánicas de forma creíble y estratégica.
- **Equilibrio**: Ajustar costos, riesgos y recompensas para que ninguna mecánica sea dominante.
- **Feedback al Jugador**: Es crucial que el jugador entienda los riesgos y consecuencias de sus acciones.

## Conclusiones

Este diseño proporciona una base técnica sólida para implementar las mecánicas de espionaje corporativo y M&A. La implementación debe ser iterativa, comenzando con las funcionalidades centrales y añadiendo complejidad gradualmente. La integración cuidadosa con los sistemas existentes y una IA competitiva robusta serán clave para el éxito de estas nuevas mecánicas.

---

*Documento preparado por el equipo de desarrollo de EcoTycoon: Market Empires*
*Fecha: 22 de mayo de 2025*
