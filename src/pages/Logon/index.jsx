import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css';

import LoginImg from '../../assets/login1.png'

function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('accountID', id);
      localStorage.setItem('accountName', response.data.name);
      history.push('/dashboard')
    } catch (error) {
      alert(`Falha no Login, tente novamente`)
    }
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button id="button" type="submit">Entrar</button>

          <Link id="back-link" to="/register">
            <FiLogIn size={16} color="#3dd705" />
              Não tenho cadastro
        </Link>
        </form>
      </section>
      <img src={LoginImg} alt="Login" />
    </div>
  )
}

export default Logon;