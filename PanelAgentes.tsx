// Componentes de UI para el Sistema de Espionaje - Gestión de Agentes

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AgenteEspionaje, 
  EspecialidadAgente, 
  EstadoAgente 
} from '../../engine/espionage/espionageTypes';
import './EspionajeUI.css';

/**
 * Panel principal para la gestión de agentes de espionaje
 */
export const PanelAgentes: React.FC = () => {
  const dispatch = useDispatch();
  
  // Obtener datos del estado global
  const agentes = useSelector((state: any) => state.espionaje.agentes);
  const agentesDisponibles = useSelector((state: any) => state.espionaje.agentesDisponibles);
  const presupuestoMensual = useSelector((state: any) => state.espionaje.presupuestoAgentes);
  const costoMensualTotal = useSelector((state: any) => state.espionaje.costoMensualAgentes);
  
  // Estados locales
  const [tabActiva, setTabActiva] = useState<'contratados' | 'disponibles'>('contratados');
  const [agenteSeleccionado, setAgenteSeleccionado] = useState<string | null>(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  
  // Acciones
  const contratarAgente = (agenteId: string) => {
    dispatch({ type: 'espionaje/contratarAgente', payload: agenteId });
  };
  
  const despedirAgente = (agenteId: string) => {
    dispatch({ type: 'espionaje/despedirAgente', payload: agenteId });
  };
  
  const actualizarPresupuesto = (nuevoPresupuesto: number) => {
    dispatch({ type: 'espionaje/actualizarPresupuestoAgentes', payload: nuevoPresupuesto });
  };
  
  const generarNuevosAgentes = () => {
    dispatch({ type: 'espionaje/generarAgentesDisponibles' });
  };
  
  const verDetallesAgente = (agenteId: string) => {
    setAgenteSeleccionado(agenteId);
    setMostrarDetalles(true);
  };
  
  // Renderizar panel
  return (
    <div className="panel-espionaje panel-agentes">
      <div className="panel-header">
        <h2>Gestión de Agentes de Espionaje</h2>
        <div className="presupuesto-container">
          <label>Presupuesto Mensual:</label>
          <input 
            type="number" 
            value={presupuestoMensual} 
            onChange={(e) => actualizarPresupuesto(Number(e.target.value))}
            min="0"
            step="1000"
          />
          <span className={costoMensualTotal > presupuestoMensual ? "costo-excedido" : "costo-normal"}>
            Costo Actual: ${costoMensualTotal.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="tabs-container">
        <div 
          className={`tab ${tabActiva === 'contratados' ? 'active' : ''}`}
          onClick={() => setTabActiva('contratados')}
        >
          Agentes Contratados ({agentes.length})
        </div>
        <div 
          className={`tab ${tabActiva === 'disponibles' ? 'active' : ''}`}
          onClick={() => setTabActiva('disponibles')}
        >
          Agentes Disponibles ({agentesDisponibles.length})
        </div>
      </div>
      
      <div className="panel-content">
        {tabActiva === 'contratados' ? (
          <TablaAgentesContratados 
            agentes={agentes} 
            onDespedir={despedirAgente}
            onVerDetalles={verDetallesAgente}
          />
        ) : (
          <TablaAgentesDisponibles 
            agentes={agentesDisponibles} 
            onContratar={contratarAgente}
            onVerDetalles={verDetallesAgente}
          />
        )}
        
        {tabActiva === 'disponibles' && (
          <button 
            className="btn-generar-agentes"
            onClick={generarNuevosAgentes}
          >
            Buscar Nuevos Agentes
          </button>
        )}
      </div>
      
      {mostrarDetalles && agenteSeleccionado && (
        <DetallesAgente 
          agenteId={agenteSeleccionado} 
          onClose={() => setMostrarDetalles(false)}
        />
      )}
    </div>
  );
};

/**
 * Componente para mostrar la tabla de agentes contratados
 */
interface TablaAgentesContratadosProps {
  agentes: AgenteEspionaje[];
  onDespedir: (agenteId: string) => void;
  onVerDetalles: (agenteId: string) => void;
}

const TablaAgentesContratados: React.FC<TablaAgentesContratadosProps> = ({ 
  agentes, 
  onDespedir,
  onVerDetalles
}) => {
  return (
    <div className="tabla-agentes">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Nivel</th>
            <th>Estado</th>
            <th>Costo Mensual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agentes.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">No hay agentes contratados</td>
            </tr>
          ) : (
            agentes.map(agente => (
              <tr key={agente.id} className={`estado-${agente.estado.toLowerCase()}`}>
                <td>{agente.nombre}</td>
                <td>{traducirEspecialidad(agente.especialidad)}</td>
                <td>{agente.nivelHabilidad} / 5</td>
                <td>{traducirEstado(agente.estado)}</td>
                <td>${agente.costoMensual.toLocaleString()}</td>
                <td>
                  <button 
                    className="btn-detalles"
                    onClick={() => onVerDetalles(agente.id)}
                  >
                    Detalles
                  </button>
                  {agente.estado !== EstadoAgente.EN_MISION && (
                    <button 
                      className="btn-despedir"
                      onClick={() => onDespedir(agente.id)}
                    >
                      Despedir
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Componente para mostrar la tabla de agentes disponibles para contratar
 */
interface TablaAgentesDisponiblesProps {
  agentes: AgenteEspionaje[];
  onContratar: (agenteId: string) => void;
  onVerDetalles: (agenteId: string) => void;
}

const TablaAgentesDisponibles: React.FC<TablaAgentesDisponiblesProps> = ({ 
  agentes, 
  onContratar,
  onVerDetalles
}) => {
  return (
    <div className="tabla-agentes">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Nivel</th>
            <th>Lealtad</th>
            <th>Costo Mensual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agentes.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">No hay agentes disponibles para contratar</td>
            </tr>
          ) : (
            agentes.map(agente => (
              <tr key={agente.id}>
                <td>{agente.nombre}</td>
                <td>{traducirEspecialidad(agente.especialidad)}</td>
                <td>{agente.nivelHabilidad} / 5</td>
                <td>{agente.lealtad} / 5</td>
                <td>${agente.costoMensual.toLocaleString()}</td>
                <td>
                  <button 
                    className="btn-detalles"
                    onClick={() => onVerDetalles(agente.id)}
                  >
                    Detalles
                  </button>
                  <button 
                    className="btn-contratar"
                    onClick={() => onContratar(agente.id)}
                  >
                    Contratar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Componente para mostrar detalles de un agente
 */
interface DetallesAgenteProps {
  agenteId: string;
  onClose: () => void;
}

const DetallesAgente: React.FC<DetallesAgenteProps> = ({ agenteId, onClose }) => {
  // Obtener datos del agente
  const agente = useSelector((state: any) => {
    const contratados = state.espionaje.agentes.find((a: AgenteEspionaje) => a.id === agenteId);
    if (contratados) return contratados;
    
    return state.espionaje.agentesDisponibles.find((a: AgenteEspionaje) => a.id === agenteId);
  });
  
  // Historial de misiones (si está contratado)
  const historialMisiones = useSelector((state: any) => 
    state.espionaje.misiones.filter((m: any) => m.agenteAsignadoId === agenteId)
  );
  
  if (!agente) {
    return null;
  }
  
  return (
    <div className="modal-detalles-agente">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Detalles del Agente</h3>
          <button className="btn-cerrar" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="info-agente">
            <div className="info-principal">
              <h4>{agente.nombre}</h4>
              <p className="especialidad">{traducirEspecialidad(agente.especialidad)}</p>
              <p className="estado">{traducirEstado(agente.estado)}</p>
            </div>
            
            <div className="stats-agente">
              <div className="stat">
                <label>Nivel de Habilidad:</label>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: `${agente.nivelHabilidad * 20}%` }}></div>
                </div>
                <span>{agente.nivelHabilidad}/5</span>
              </div>
              
              <div className="stat">
                <label>Lealtad:</label>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: `${agente.lealtad * 20}%` }}></div>
                </div>
                <span>{agente.lealtad}/5</span>
              </div>
              
              <div className="stat">
                <label>Experiencia:</label>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: `${Math.min(100, agente.experiencia)}%` }}></div>
                </div>
                <span>{agente.experiencia} pts</span>
              </div>
              
              <div className="stat">
                <label>Notoriedad:</label>
                <div className="stat-bar notoriedad">
                  <div className="stat-fill" style={{ width: `${agente.notoriedad}%` }}></div>
                </div>
                <span>{agente.notoriedad}%</span>
              </div>
            </div>
            
            <div className="info-adicional">
              <p><strong>Costo Mensual:</strong> ${agente.costoMensual.toLocaleString()}</p>
              {agente.estado === EstadoAgente.RECUPERANDOSE && (
                <p><strong>Tiempo de Recuperación:</strong> {agente.tiempoRecuperacionRestante} días</p>
              )}
              {agente.estado === EstadoAgente.EN_MISION && (
                <p><strong>En Misión:</strong> {agente.misionActualId}</p>
              )}
            </div>
          </div>
          
          {historialMisiones && historialMisiones.length > 0 && (
            <div className="historial-misiones">
              <h4>Historial de Misiones</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {historialMisiones.map((mision: any) => (
                    <tr key={mision.id}>
                      <td>{mision.id}</td>
                      <td>{traducirTipoMision(mision.tipo)}</td>
                      <td>{traducirEstadoMision(mision.estado)}</td>
                      <td>
                        {mision.resultado ? (
                          mision.resultado.exito ? 
                            mision.resultado.detectado ? "Éxito (Detectado)" : "Éxito" 
                            : mision.resultado.detectado ? "Fracaso (Detectado)" : "Fracaso"
                        ) : "En curso"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Funciones auxiliares para traducir enumeraciones
function traducirEspecialidad(especialidad: EspecialidadAgente): string {
  switch (especialidad) {
    case EspecialidadAgente.INFORMACION:
      return "Recopilación de Información";
    case EspecialidadAgente.TECNOLOGIA:
      return "Robo de Tecnología";
    case EspecialidadAgente.SABOTAJE:
      return "Operaciones de Sabotaje";
    case EspecialidadAgente.MANIPULACION:
      return "Manipulación de Mercados";
    case EspecialidadAgente.GENERALISTA:
      return "Generalista";
    default:
      return "Desconocida";
  }
}

function traducirEstado(estado: EstadoAgente): string {
  switch (estado) {
    case EstadoAgente.DISPONIBLE:
      return "Disponible";
    case EstadoAgente.EN_MISION:
      return "En Misión";
    case EstadoAgente.RECUPERANDOSE:
      return "Recuperándose";
    case EstadoAgente.CAPTURADO:
      return "Capturado";
    case EstadoAgente.RETIRADO:
      return "Retirado";
    default:
      return "Desconocido";
  }
}

function traducirTipoMision(tipo: string): string {
  switch (tipo) {
    case 'recopilacion_info':
      return "Recopilación de Información";
    case 'robo_tecnologia':
      return "Robo de Tecnología";
    case 'sabotaje':
      return "Sabotaje";
    case 'manipulacion_mercado':
      return "Manipulación de Mercado";
    default:
      return "Desconocido";
  }
}

function traducirEstadoMision(estado: string): string {
  switch (estado) {
    case 'planificando':
      return "Planificando";
    case 'en_progreso':
      return "En Progreso";
    case 'completada':
      return "Completada";
    case 'fallida':
      return "Fallida";
    case 'descubierta':
      return "Descubierta";
    default:
      return "Desconocido";
  }
}

export default PanelAgentes;
