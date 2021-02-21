import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'
import './styles.css';

import Logo from '../../assets/logo.svg';

function Header() {
  const history = useHistory();

  function handleLogut() {
    localStorage.clear();
    history.push("/")
  }

  const accountName = localStorage.getItem('accountName');
  return (
    <>
      <header>
        <img src={Logo} alt="Logo Dev Finance" />
        <div id="content">
          <p>Que bom te ver de novo <span style={{ fontWeight: '700' }}>{accountName}</span></p>
          <button onClick={handleLogut} type="button">
            <FiPower size={18} color="#3dd705" />
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;