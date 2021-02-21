import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

function Register() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
    };

    try {
      const response = await api.post('newaccount', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/')
    } catch (err) {
      alert(`Erro no cadastro, tente novamente`)
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, a organize suas finanças.</p>

          <Link id="back-link" to="/">
            <FiArrowLeft size={16} color="#3dd705" />
            Já tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <button id='button' type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register;