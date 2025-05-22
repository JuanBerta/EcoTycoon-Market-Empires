// Componente principal para integrar todos los paneles de espionaje

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PanelAgentes from './PanelAgentes';
import PanelMisiones from './PanelMisiones';
import './EspionajeUI.css';

/**
 * Componente principal que integra todos los paneles del sistema de espionaje
 */
export const SistemaEspionajeUI: React.FC = () => {
  // Estados locales
  const [seccionActiva, setSeccionActiva] = useState<'agentes' | 'misiones' | 'contraespionaje'>('agentes');
  
  // Datos del sistema de contraespionaje
  const departamentoContraespionaje = useSelector((state: any) => state.espionaje.departamentoContraespionaje);
  const historialIncidentes = useSelector((state: any) => state.espionaje.historialIncidentes);
  
  return (
    <div className="sistema-espionaje-container">
      <div className="espionaje-header">
        <h1>Centro de Operaciones de Inteligencia</h1>
        
        <div className="espionaje-nav">
          <button 
            className={`nav-btn ${seccionActiva === 'agentes' ? 'active' : ''}`}
            onClick={() => setSeccionActiva('agentes')}
          >
            Gestión de Agentes
          </button>
          <button 
            className={`nav-btn ${seccionActiva === 'misiones' ? 'active' : ''}`}
            onClick={() => setSeccionActiva('misiones')}
          >
            Operaciones
          </button>
          <button 
            className={`nav-btn ${seccionActiva === 'contraespionaje' ? 'active' : ''}`}
            onClick={() => setSeccionActiva('contraespionaje')}
          >
            Contraespionaje
          </button>
        </div>
      </div>
      
      <div className="espionaje-content">
        {seccionActiva === 'agentes' && <PanelAgentes />}
        {seccionActiva === 'misiones' && <PanelMisiones />}
        {seccionActiva === 'contraespionaje' && <PanelContraespionaje 
          departamento={departamentoContraespionaje}
          historialIncidentes={historialIncidentes}
        />}
      </div>
    </div>
  );
};

/**
 * Panel de contraespionaje para proteger contra espionaje enemigo
 */
interface PanelContraespionajeProps {
  departamento: any;
  historialIncidentes: string[];
}

const PanelContraespionaje: React.FC<PanelContraespionajeProps> = ({ 
  departamento, 
  historialIncidentes 
}) => {
  const dispatch = useDispatch();
  
  // Estados locales
  const [nivelSeguridad, setNivelSeguridad] = useState(departamento?.nivelSeguridadGeneral || 1);
  const [presupuesto, setPresupuesto] = useState(departamento?.presupuestoMensual || 10000);
  const [personal, setPersonal] = useState(departamento?.personalAsignado || 5);
  const [tecnologiasSeleccionadas, setTecnologiasSeleccionadas] = useState<string[]>(
    departamento?.tecnologiasSeguridad || []
  );
  
  // Tecnologías disponibles (en un caso real, vendrían del sistema de investigación)
  const tecnologiasDisponibles = [
    { id: 'tech_firewall', nombre: 'Firewall Avanzado', costo: 5000 },
    { id: 'tech_encryption', nombre: 'Encriptación de Datos', costo: 8000 },
    { id: 'tech_surveillance', nombre: 'Sistema de Vigilancia', costo: 12000 },
    { id: 'tech_authentication', nombre: 'Autenticación Biométrica', costo: 15000 },
    { id: 'tech_honeypot', nombre: 'Sistema Honeypot', costo: 20000 }
  ];
  
  // Actualizar configuración
  const actualizarConfiguracion = () => {
    dispatch({
      type: 'espionaje/configurarContraespionaje',
      payload: {
        nivelSeguridad,
        presupuesto,
        personal,
        tecnologias: tecnologiasSeleccionadas
      }
    });
  };
  
  // Alternar selección de tecnología
  const toggleTecnologia = (tecId: string) => {
    if (tecnologiasSeleccionadas.includes(tecId)) {
      setTecnologiasSeleccionadas(tecnologiasSeleccionadas.filter(id => id !== tecId));
    } else {
      setTecnologiasSeleccionadas([...tecnologiasSeleccionadas, tecId]);
    }
  };
  
  // Calcular eficiencia estimada
  const calcularEficienciaEstimada = () => {
    // Base según nivel de seguridad (1-5)
    let eficiencia = nivelSeguridad * 10; // 10-50 base
    
    // Factor de presupuesto
    const factorPresupuesto = Math.min(30, presupuesto / 10000); // Hasta +30
    
    // Factor de personal
    const factorPersonal = Math.min(20, (personal / 10) * 5); // Hasta +20
    
    // Factor de tecnologías
    const factorTecnologias = Math.min(25, tecnologiasSeleccionadas.length * 5); // Hasta +25
    
    // Sumar todos los factores
    eficiencia += factorPresupuesto + factorPersonal + factorTecnologias;
    
    // Limitar a 0-100
    return Math.max(0, Math.min(100, Math.floor(eficiencia)));
  };
  
  return (
    <div className="panel-espionaje panel-contraespionaje">
      <div className="panel-header">
        <h2>Departamento de Contraespionaje</h2>
      </div>
      
      <div className="panel-content">
        <div className="contraespionaje-grid">
          <div className="configuracion-contraespionaje">
            <h3>Configuración de Seguridad</h3>
            
            <div className="campo-slider">
              <label>Nivel de Seguridad General:</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={nivelSeguridad} 
                  onChange={(e) => setNivelSeguridad(Number(e.target.value))}
                />
                <span>{nivelSeguridad}</span>
              </div>
              <p className="descripcion">Determina el nivel base de protección contra espionaje.</p>
            </div>
            
            <div className="campo">
              <label>Presupuesto Mensual:</label>
              <input 
                type="number" 
                value={presupuesto} 
                onChange={(e) => setPresupuesto(Number(e.target.value))}
                min="0"
                step="1000"
              />
              <p className="descripcion">Fondos asignados para operaciones de contraespionaje.</p>
            </div>
            
            <div className="campo">
              <label>Personal Asignado:</label>
              <input 
                type="number" 
                value={personal} 
                onChange={(e) => setPersonal(Number(e.target.value))}
                min="0"
                step="1"
              />
              <p className="descripcion">Número de agentes de seguridad en el departamento.</p>
            </div>
            
            <div className="tecnologias-seguridad">
              <h4>Tecnologías de Seguridad</h4>
              <div className="lista-tecnologias">
                {tecnologiasDisponibles.map(tec => (
                  <div 
                    key={tec.id} 
                    className={`tecnologia-item ${tecnologiasSeleccionadas.includes(tec.id) ? 'seleccionada' : ''}`}
                    onClick={() => toggleTecnologia(tec.id)}
                  >
                    <div className="tec-checkbox">
                      <input 
                        type="checkbox" 
                        checked={tecnologiasSeleccionadas.includes(tec.id)} 
                        onChange={() => {}} // Manejado por el onClick del div
                      />
                    </div>
                    <div className="tec-info">
                      <span className="tec-nombre">{tec.nombre}</span>
                      <span className="tec-costo">${tec.costo.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              className="btn-actualizar"
              onClick={actualizarConfiguracion}
            >
              Actualizar Configuración
            </button>
          </div>
          
          <div className="estadisticas-contraespionaje">
            <h3>Estadísticas de Protección</h3>
            
            <div className="eficiencia-deteccion">
              <h4>Eficiencia de Detección</h4>
              <div className="medidor-circular">
                <svg viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#2a2a4a" 
                    strokeWidth="10"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#4cc9f0" 
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 45 * calcularEficienciaEstimada() / 100} ${2 * Math.PI * 45}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <text 
                    x="50" 
                    y="50" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    fontSize="20"
                    fill="#e6e6e6"
                  >
                    {calcularEficienciaEstimada()}%
                  </text>
                </svg>
              </div>
              <p className="descripcion">Capacidad para detectar intentos de espionaje enemigo.</p>
            </div>
            
            <div className="factores-eficiencia">
              <h4>Factores de Eficiencia</h4>
              <ul>
                <li>
                  <span>Nivel de Seguridad:</span>
                  <span>+{nivelSeguridad * 10}%</span>
                </li>
                <li>
                  <span>Presupuesto:</span>
                  <span>+{Math.min(30, Math.floor(presupuesto / 10000))}%</span>
                </li>
                <li>
                  <span>Personal:</span>
                  <span>+{Math.min(20, Math.floor((personal / 10) * 5))}%</span>
                </li>
                <li>
                  <span>Tecnologías:</span>
                  <span>+{Math.min(25, tecnologiasSeleccionadas.length * 5)}%</span>
                </li>
              </ul>
            </div>
            
            <div className="costo-total">
              <h4>Costo Total Mensual</h4>
              <div className="costo-valor">
                ${(presupuesto + tecnologiasSeleccionadas.reduce((total, tecId) => {
                  const tec = tecnologiasDisponibles.find(t => t.id === tecId);
                  return total + (tec ? tec.costo / 12 : 0); // Costo mensual (anual / 12)
                }, 0)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="historial-incidentes">
          <h3>Historial de Incidentes</h3>
          {historialIncidentes.length === 0 ? (
            <p className="no-data">No se han detectado intentos de espionaje.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID Incidente</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Origen</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {/* En un caso real, aquí se mostrarían los detalles de los incidentes */}
                {historialIncidentes.map((incidenteId, index) => (
                  <tr key={incidenteId}>
                    <td>{incidenteId}</td>
                    <td>Día {Math.floor(Math.random() * 100) + 1}</td>
                    <td>{['Recopilación', 'Sabotaje', 'Robo'][Math.floor(Math.random() * 3)]}</td>
                    <td>{['Competidor A', 'Competidor B', 'Desconocido'][Math.floor(Math.random() * 3)]}</td>
                    <td>{['Neutralizado', 'En Investigación'][Math.floor(Math.random() * 2)]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SistemaEspionajeUI;
