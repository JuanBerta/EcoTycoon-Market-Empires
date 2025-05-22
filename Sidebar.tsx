// Componente Sidebar
import React, { useState } from 'react';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

interface SidebarProps {
  onMenuItemClick: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuItemClick }) => {
  // Menú predefinido
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true },
    { id: 'production', label: 'Producción', icon: '🏭' },
    { id: 'market', label: 'Mercado', icon: '📈' },
    { id: 'logistics', label: 'Logística', icon: '🚚' },
    { id: 'research', label: 'I+D', icon: '💡' },
    { id: 'finance', label: 'Finanzas', icon: '💰' },
  ]);
  
  const [collapsed, setCollapsed] = useState(false);
  
  const handleMenuClick = (id: string) => {
    // Actualizar estado activo
    const updatedMenu = menuItems.map(item => ({
      ...item,
      active: item.id === id
    }));
    
    setMenuItems(updatedMenu);
    onMenuItemClick(id);
  };
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {collapsed ? '»' : '«'}
      </div>
      
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map(item => (
            <li 
              key={item.id}
              className={`menu-item ${item.active ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="help-button">
          {collapsed ? '?' : 'Ayuda'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
