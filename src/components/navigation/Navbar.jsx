import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = {
    principal: [
      { path: '/', label: "Page d'accueil", icon: 'home' }
    ],
    listes: [
      { path: '/professeurs', label: 'Professeurs-es', icon: 'professors' },
      { path: '/etudiants', label: 'Étudiants-es', icon: 'students' },
      { path: '/mes-pfes', label: "Mes PFE's", icon: 'folder' },
      { path: '/tous-les-pfes', label: "Tous les PFE's", icon: 'all-projects' },
      { path: '/pfes-etudiants', label: "PFE's et étds-es", icon: 'project-students' }
    ],
    utile: [
      { path: '/demandes', label: 'Demandes', icon: 'requests' },
      { path: '/domaines', label: 'Domaines PFE', icon: 'domains' }
    ]
  };

  const renderIcon = (iconName) => {
    const icons = {
      home: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      professors: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      students: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      folder: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      'all-projects': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      'project-students': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      requests: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="9" y1="15" x2="12" y2="15" />
        </svg>
      ),
      domains: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      )
    };
    return icons[iconName] || null;
  };

  return (
    <nav className={`navbar ${isCollapsed ? 'navbar--collapsed' : ''}`}>
      <div className="navbar__header">
        <div className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="3" width="8" height="8" rx="2" />
              <rect x="3" y="13" width="8" height="8" rx="2" />
              <rect x="13" y="13" width="8" height="8" rx="2" />
            </svg>
          </div>
          <span className="navbar__logo-text">PFE Manager</span>
        </div>
        <button
          className="navbar__toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div className="navbar__content">
        {/* PRINCIPAL Section */}
        <div className="navbar__section">
          <span className="navbar__section-title">PRINCIPAL</span>
          <ul className="navbar__menu">
            {menuItems.principal.map((item) => (
              <li key={item.path} className="navbar__menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  <span className="navbar__link-icon">{renderIcon(item.icon)}</span>
                  <span className="navbar__link-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* LISTES Section */}
        <div className="navbar__section">
          <span className="navbar__section-title">LISTES</span>
          <ul className="navbar__menu">
            {menuItems.listes.map((item) => (
              <li key={item.path} className="navbar__menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  <span className="navbar__link-icon">{renderIcon(item.icon)}</span>
                  <span className="navbar__link-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* UTILE Section */}
        <div className="navbar__section">
          <span className="navbar__section-title">UTILE</span>
          <ul className="navbar__menu">
            {menuItems.utile.map((item) => (
              <li key={item.path} className="navbar__menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  <span className="navbar__link-icon">{renderIcon(item.icon)}</span>
                  <span className="navbar__link-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
