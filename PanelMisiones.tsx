// Componentes de UI para el Sistema de Espionaje - Planificación de Misiones

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  AgenteEspionaje, 
  MisionEspionaje,
  TipoMisionEspionaje,
  EstadoMision,
  EstadoAgente
} from '../../engine/espionage/espionageTypes';
import './EspionajeUI.css';

/**
 * Panel principal para la planificación y gestión de misiones de espionaje
 */
export const PanelMisiones: React.FC = () => {
  const dispatch = useDispatch();
  
  // Obtener datos del estado global
  const misionesPlanificadas = useSelector((state: any) => state.espionaje.misionesPlanificadas);
  const misionesActivas = useSelector((state: any) => state.espionaje.misionesActivas);
  const misionesCompletadas = useSelector((state: any) => state.espionaje.misionesCompletadas);
  const agentesDisponibles = useSelector((state: any) => 
    state.espionaje.agentes.filter((a: AgenteEspionaje) => a.estado === EstadoAgente.DISPONIBLE)
  );
  const empresasObjetivo = useSelector((state: any) => state.npcs.empresasActivas);
  
  // Estados locales
  const [tabActiva, setTabActiva] = useState<'planificacion' | 'activas' | 'completadas'>('planificacion');
  const [misionSeleccionada, setMisionSeleccionada] = useState<string | null>(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarNuevaMision, setMostrarNuevaMision] = useState(false);
  
  // Acciones
  const iniciarMision = (misionId: string) => {
    dispatch({ type: 'espionaje/iniciarMision', payload: misionId });
  };
  
  const cancelarMision = (misionId: string) => {
    dispatch({ type: 'espionaje/cancelarMision', payload: misionId });
  };
  
  const verDetallesMision = (misionId: string) => {
    setMisionSeleccionada(misionId);
    setMostrarDetalles(true);
  };
  
  // Renderizar panel
  return (
    <div className="panel-espionaje panel-misiones">
      <div className="panel-header">
        <h2>Operaciones de Espionaje</h2>
        <button 
          className="btn-nueva-mision"
          onClick={() => setMostrarNuevaMision(true)}
          disabled={agentesDisponibles.length === 0}
        >
          Nueva Misión
        </button>
      </div>
      
      <div className="tabs-container">
        <div 
          className={`tab ${tabActiva === 'planificacion' ? 'active' : ''}`}
          onClick={() => setTabActiva('planificacion')}
        >
          Planificación ({misionesPlanificadas.length})
        </div>
        <div 
          className={`tab ${tabActiva === 'activas' ? 'active' : ''}`}
          onClick={() => setTabActiva('activas')}
        >
          Misiones Activas ({misionesActivas.length})
        </div>
        <div 
          className={`tab ${tabActiva === 'completadas' ? 'active' : ''}`}
          onClick={() => setTabActiva('completadas')}
        >
          Historial ({misionesCompletadas.length})
        </div>
      </div>
      
      <div className="panel-content">
        {tabActiva === 'planificacion' && (
          <TablaMisionesPlanificadas 
            misiones={misionesPlanificadas} 
            onIniciar={iniciarMision}
            onCancelar={cancelarMision}
            onVerDetalles={verDetallesMision}
          />
        )}
        
        {tabActiva === 'activas' && (
          <TablaMisionesActivas 
            misiones={misionesActivas} 
            onVerDetalles={verDetallesMision}
          />
        )}
        
        {tabActiva === 'completadas' && (
          <TablaMisionesCompletadas 
            misiones={misionesCompletadas} 
            onVerDetalles={verDetallesMision}
          />
        )}
      </div>
      
      {mostrarDetalles && misionSeleccionada && (
        <DetallesMision 
          misionId={misionSeleccionada} 
          onClose={() => setMostrarDetalles(false)}
        />
      )}
      
      {mostrarNuevaMision && (
        <FormularioNuevaMision 
          agentesDisponibles={agentesDisponibles}
          empresasObjetivo={empresasObjetivo}
          onClose={() => setMostrarNuevaMision(false)}
        />
      )}
    </div>
  );
};

/**
 * Componente para mostrar la tabla de misiones en planificación
 */
interface TablaMisionesPlanificadasProps {
  misiones: MisionEspionaje[];
  onIniciar: (misionId: string) => void;
  onCancelar: (misionId: string) => void;
  onVerDetalles: (misionId: string) => void;
}

const TablaMisionesPlanificadas: React.FC<TablaMisionesPlanificadasProps> = ({ 
  misiones, 
  onIniciar,
  onCancelar,
  onVerDetalles
}) => {
  // Obtener datos adicionales
  const agentes = useSelector((state: any) => state.espionaje.agentes);
  const empresas = useSelector((state: any) => state.npcs.empresasActivas);
  
  // Función para obtener nombre de agente
  const getNombreAgente = (agenteId: string) => {
    const agente = agentes.find((a: AgenteEspionaje) => a.id === agenteId);
    return agente ? agente.nombre : 'Desconocido';
  };
  
  // Función para obtener nombre de empresa
  const getNombreEmpresa = (empresaId: string) => {
    const empresa = empresas.find((e: any) => e.id === empresaId);
    return empresa ? empresa.nombre : 'Desconocida';
  };
  
  return (
    <div className="tabla-misiones">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Objetivo</th>
            <th>Agente</th>
            <th>Duración Est.</th>
            <th>Costo</th>
            <th>Prob. Éxito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misiones.length === 0 ? (
            <tr>
              <td colSpan={8} className="no-data">No hay misiones en planificación</td>
            </tr>
          ) : (
            misiones.map(mision => (
              <tr key={mision.id}>
                <td>{mision.id}</td>
                <td>{traducirTipoMision(mision.tipo)}</td>
                <td>{getNombreEmpresa(mision.objetivoEmpresaId)}</td>
                <td>{getNombreAgente(mision.agenteAsignadoId)}</td>
                <td>{mision.duracionEstimada} días</td>
                <td>${mision.costoOperacion.toLocaleString()}</td>
                <td>{mision.probabilidadExitoBase}%</td>
                <td>
                  <button 
                    className="btn-detalles"
                    onClick={() => onVerDetalles(mision.id)}
                  >
                    Detalles
                  </button>
                  <button 
                    className="btn-iniciar"
                    onClick={() => onIniciar(mision.id)}
                  >
                    Iniciar
                  </button>
                  <button 
                    className="btn-cancelar"
                    onClick={() => onCancelar(mision.id)}
                  >
                    Cancelar
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
 * Componente para mostrar la tabla de misiones activas
 */
interface TablaMisionesActivasProps {
  misiones: MisionEspionaje[];
  onVerDetalles: (misionId: string) => void;
}

const TablaMisionesActivas: React.FC<TablaMisionesActivasProps> = ({ 
  misiones, 
  onVerDetalles
}) => {
  // Obtener datos adicionales
  const agentes = useSelector((state: any) => state.espionaje.agentes);
  const empresas = useSelector((state: any) => state.npcs.empresasActivas);
  const diaActual = useSelector((state: any) => state.juego.diaActual);
  
  // Función para obtener nombre de agente
  const getNombreAgente = (agenteId: string) => {
    const agente = agentes.find((a: AgenteEspionaje) => a.id === agenteId);
    return agente ? agente.nombre : 'Desconocido';
  };
  
  // Función para obtener nombre de empresa
  const getNombreEmpresa = (empresaId: string) => {
    const empresa = empresas.find((e: any) => e.id === empresaId);
    return empresa ? empresa.nombre : 'Desconocida';
  };
  
  // Función para calcular progreso
  const calcularProgreso = (mision: MisionEspionaje) => {
    const diasTranscurridos = diaActual - mision.fechaInicio;
    const porcentaje = Math.min(100, Math.floor((diasTranscurridos / mision.duracionEstimada) * 100));
    return porcentaje;
  };
  
  return (
    <div className="tabla-misiones">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Objetivo</th>
            <th>Agente</th>
            <th>Inicio</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misiones.length === 0 ? (
            <tr>
              <td colSpan={7} className="no-data">No hay misiones activas</td>
            </tr>
          ) : (
            misiones.map(mision => (
              <tr key={mision.id}>
                <td>{mision.id}</td>
                <td>{traducirTipoMision(mision.tipo)}</td>
                <td>{getNombreEmpresa(mision.objetivoEmpresaId)}</td>
                <td>{getNombreAgente(mision.agenteAsignadoId)}</td>
                <td>Día {mision.fechaInicio}</td>
                <td>
                  <div className="barra-progreso">
                    <div 
                      className="progreso-fill"
                      style={{ width: `${calcularProgreso(mision)}%` }}
                    ></div>
                  </div>
                  <span>{calcularProgreso(mision)}%</span>
                </td>
                <td>
                  <button 
                    className="btn-detalles"
                    onClick={() => onVerDetalles(mision.id)}
                  >
                    Detalles
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
 * Componente para mostrar la tabla de misiones completadas
 */
interface TablaMisionesCompletadasProps {
  misiones: MisionEspionaje[];
  onVerDetalles: (misionId: string) => void;
}

const TablaMisionesCompletadas: React.FC<TablaMisionesCompletadasProps> = ({ 
  misiones, 
  onVerDetalles
}) => {
  // Obtener datos adicionales
  const agentes = useSelector((state: any) => state.espionaje.agentes);
  const empresas = useSelector((state: any) => state.npcs.empresasActivas);
  
  // Función para obtener nombre de agente
  const getNombreAgente = (agenteId: string) => {
    const agente = agentes.find((a: AgenteEspionaje) => a.id === agenteId);
    return agente ? agente.nombre : 'Desconocido';
  };
  
  // Función para obtener nombre de empresa
  const getNombreEmpresa = (empresaId: string) => {
    const empresa = empresas.find((e: any) => e.id === empresaId);
    return empresa ? empresa.nombre : 'Desconocida';
  };
  
  return (
    <div className="tabla-misiones">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Objetivo</th>
            <th>Agente</th>
            <th>Estado</th>
            <th>Resultado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misiones.length === 0 ? (
            <tr>
              <td colSpan={7} className="no-data">No hay misiones completadas</td>
            </tr>
          ) : (
            misiones.map(mision => (
              <tr key={mision.id} className={`estado-${mision.estado.toLowerCase()}`}>
                <td>{mision.id}</td>
                <td>{traducirTipoMision(mision.tipo)}</td>
                <td>{getNombreEmpresa(mision.objetivoEmpresaId)}</td>
                <td>{getNombreAgente(mision.agenteAsignadoId)}</td>
                <td>{traducirEstadoMision(mision.estado)}</td>
                <td>
                  {mision.resultado ? (
                    mision.resultado.exito ? 
                      mision.resultado.detectado ? "Éxito (Detectado)" : "Éxito" 
                      : mision.resultado.detectado ? "Fracaso (Detectado)" : "Fracaso"
                  ) : "Desconocido"}
                </td>
                <td>
                  <button 
                    className="btn-detalles"
                    onClick={() => onVerDetalles(mision.id)}
                  >
                    Detalles
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
 * Componente para mostrar detalles de una misión
 */
interface DetallesMisionProps {
  misionId: string;
  onClose: () => void;
}

const DetallesMision: React.FC<DetallesMisionProps> = ({ misionId, onClose }) => {
  // Obtener datos de la misión
  const mision = useSelector((state: any) => {
    // Buscar en todas las listas de misiones
    const planificadas = state.espionaje.misionesPlanificadas.find((m: MisionEspionaje) => m.id === misionId);
    if (planificadas) return planificadas;
    
    const activas = state.espionaje.misionesActivas.find((m: MisionEspionaje) => m.id === misionId);
    if (activas) return activas;
    
    return state.espionaje.misionesCompletadas.find((m: MisionEspionaje) => m.id === misionId);
  });
  
  // Datos adicionales
  const agentes = useSelector((state: any) => state.espionaje.agentes);
  const empresas = useSelector((state: any) => state.npcs.empresasActivas);
  const diaActual = useSelector((state: any) => state.juego.diaActual);
  
  if (!mision) {
    return null;
  }
  
  // Obtener agente y empresa
  const agente = agentes.find((a: AgenteEspionaje) => a.id === mision.agenteAsignadoId);
  const empresa = empresas.find((e: any) => e.id === mision.objetivoEmpresaId);
  
  // Calcular progreso si está activa
  const calcularProgreso = () => {
    if (mision.estado !== EstadoMision.EN_PROGRESO) return 100;
    
    const diasTranscurridos = diaActual - mision.fechaInicio;
    return Math.min(100, Math.floor((diasTranscurridos / mision.duracionEstimada) * 100));
  };
  
  return (
    <div className="modal-detalles-mision">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Detalles de la Misión</h3>
          <button className="btn-cerrar" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="info-mision">
            <div className="info-principal">
              <h4>{mision.id}</h4>
              <p className="tipo">{traducirTipoMision(mision.tipo)}</p>
              <p className="estado">{traducirEstadoMision(mision.estado)}</p>
            </div>
            
            <div className="detalles-mision">
              <div className="seccion">
                <h5>Información General</h5>
                <p><strong>Objetivo:</strong> {empresa ? empresa.nombre : 'Desconocido'}</p>
                <p><strong>Objetivo Específico:</strong> {mision.objetivoEspecifico}</p>
                <p><strong>Agente Asignado:</strong> {agente ? agente.nombre : 'Desconocido'}</p>
                <p><strong>Costo de Operación:</strong> ${mision.costoOperacion.toLocaleString()}</p>
              </div>
              
              <div className="seccion">
                <h5>Tiempos</h5>
                <p><strong>Fecha de Inicio:</strong> Día {mision.fechaInicio}</p>
                <p><strong>Duración Estimada:</strong> {mision.duracionEstimada} días</p>
                {mision.duracionReal && (
                  <p><strong>Duración Real:</strong> {mision.duracionReal} días</p>
                )}
                {mision.estado === EstadoMision.EN_PROGRESO && (
                  <div>
                    <p><strong>Progreso:</strong></p>
                    <div className="barra-progreso">
                      <div 
                        className="progreso-fill"
                        style={{ width: `${calcularProgreso()}%` }}
                      ></div>
                    </div>
                    <span>{calcularProgreso()}%</span>
                  </div>
                )}
            
(Content truncated due to size limit. Use line ranges to read in chunks)