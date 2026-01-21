import React from 'react';
import './Header.css';

const Header = ({ title, userName, userInitials }) => {
  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__title">{title}</h1>
      </div>

      <div className="header__right">
        <button className="header__notification" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="header__notification-badge"></span>
        </button>

        <div className="header__user">
          <div className="header__avatar">
            {userInitials || userName?.slice(0, 2).toUpperCase() || 'US'}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
