import React, { useState } from 'react';

import './styles.css';

import Modal from '../../../../components/Modal';

import * as Moment from 'moment';

import { formatAmount, formatDate } from '../../../../utils';

import api from '../../../../services/api';

function ModalNewTransaction({ isOpen, callbackParentFecharNew }) {
  const dataHoje = new Date();
  const dataHojeFormat = Moment(dataHoje).format('YYYY-MM-DD');

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(dataHojeFormat);

  const accountID = localStorage.getItem('accountID');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
        throw Error("Por favor, preencha todos os campos")
      }
      let amountFormated = formatAmount(amount);
      let dateFormated = formatDate(date);

      const transaction = {
        description,
        amount: amountFormated,
        date: dateFormated
      }

      await api.post('/newtransaction', transaction, {
        headers: {
          authorization: accountID,
        }
      })
      callbackParentFecharNew();

    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} titleModal="Nova Transação">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label
              className="sr-only"
              htmlFor="description">Descrição</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Descrição"
              //value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label
              className="sr-only"
              htmlFor="amount">Valor</label>
            <input
              type="number"
              step="0.01"
              id="amount"
              name="amount"
              placeholder="0,00"
              //value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <small className="help">Use o sinal - (negativo) para despesas e , (vírgula) para casas decimais</small>
          </div>

          <div className="input-group">
            <label
              className="sr-only"
              htmlFor="date">Data</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="input-group actions">
            <button type="button"
              onClick={() => callbackParentFecharNew()}
              className="button cancel">Cancelar</button>
            <button type="submit" className="button salvar">Salvar</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ModalNewTransaction;