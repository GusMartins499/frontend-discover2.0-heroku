import React from 'react';

import './styles.css';

import Modal from '../../../../components/Modal';

import api from '../../../../services/api';

function ModalRemoveTransaction({ isOpen, callbackParentFecharRemove, transaction }) {
  const { description, amount, date, id } = transaction;

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.delete(`/removetransaction/${id}`)
      callbackParentFecharRemove();

    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <>
      {isOpen ? (
        <Modal isOpen={isOpen} titleModal="Excluir Transação">
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
                value={description}
                disabled
              //onChange={(event) => setDescription(event.target.value)}
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
                value={amount}
                disabled
              //onChange={(event) => setAmount(event.target.value)}
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
                disabled
              //onChange={(event) => setDate(event.target.value)}
              />
            </div>

            <div className="input-group actions">
              <button type="button"
                onClick={() => callbackParentFecharRemove()}
                className="button cancel">Cancelar</button>
              <button type="submit" className="button salvar">Confirmar Exclusão</button>
            </div>
          </form>
        </Modal>
      ) : (
          null
        )}
    </>
  )
}

export default ModalRemoveTransaction;