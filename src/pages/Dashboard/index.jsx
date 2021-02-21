import React, { useState, useEffect } from 'react';
import { FiMinusCircle } from 'react-icons/fi';
import './styles.css';

import NovaTransacao from './Modals/NewTrasacao/NewTransaction';
import RemoveTransacao from './Modals/RemoveTransacao/index';

import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';

import ImgEntrada from '../../assets/income.svg';
import ImgSaida from '../../assets/expense.svg';
import ImgTotal from '../../assets/total.svg';

import api from '../../services/api';

function Dashboard() {

  const [openModal, setOpenModal] = useState(false);
  const [transactions, SetTransactions] = useState([]);
  const [openModalExcluir, setOpenModalExcluir] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState('');

  const accountID = localStorage.getItem('accountID');

  useEffect(() => {
    listaTransacoes();
    totalCards();
  }, [])

  useEffect(() => {
    totalCards();
  }, [transactions])

  async function totalCards() {
    const response = await api.get('/totalcards', {
      headers: {
        authorization: accountID
      }
    });
    console.log(response.data[0])
    setIncome(response.data[0].income === null ? 0 : response.data[0].income)
    setExpense(response.data[0].expense === null ? 0 : response.data[0].expense)
    setTotal(response.data[0].total === null ? 0 : response.data[0].total);
  }

  async function listaTransacoes() {
    const response = await api.get(`/alltransactions?description=${description}`, {
      headers: {
        authorization: accountID
      }
    });
    SetTransactions(response.data);
  }

  function handleFecharModalNew() {
    setOpenModal(false);
    listaTransacoes();
  }

  function handleRemoveTransaction(item) {
    setSelectedTransaction(item);
    setOpenModalExcluir(true);
  }

  function handleFecharModalRemove() {
    setOpenModalExcluir(false);
    listaTransacoes();
  }

  return (
    <>
      <Header />

      <main className="container">
        <section id="balance">
          <h2 className="sr-only">Balanço</h2>

          <Card pathImage={ImgEntrada} altImage="Imagem de entrada" isTotal={false} tot={income}>
            Entradas
          </Card>
          <Card pathImage={ImgSaida} altImage="Imagem de saída" isTotal={false} tot={expense}>
            Saídas
          </Card>
          <Card pathImage={ImgTotal} altImage="Imagem de total" isTotal={true} tot={total}>
            Total
          </Card>
        </section>

        <section id="transaction">
          <h2 className="sr-only">Transações</h2>

          <input type="text" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

          <button type="button" onClick={() => listaTransacoes()}>Pesquisar</button>

          <button type="button"
            onClick={() => setOpenModal(true)}
            className="button new">+ Nova Transação</button>

          <table id="data-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                const CSSclass = item.amount > 0 ? "income" : "expense"
                return (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td className={CSSclass}>{item.amount}</td>
                    <td>{item.date}</td>
                    <td>
                      <FiMinusCircle onClick={() => handleRemoveTransaction(item)} size={24} color="#e92929" style={{ cursor: 'pointer' }} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />

      <NovaTransacao
        isOpen={openModal}
        callbackParentFecharNew={() => handleFecharModalNew()} />

      <RemoveTransacao isOpen={openModalExcluir}
        callbackParentFecharRemove={() => handleFecharModalRemove()}
        transaction={selectedTransaction} />


    </>
  );
}
export default Dashboard;
