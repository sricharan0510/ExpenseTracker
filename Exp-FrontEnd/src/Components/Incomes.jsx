import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Incomes() {
  const { userId } = useParams();
  const [incomeData, setIncomeData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9000/${userId}/userIncomes`)
      .then((res) => {
        console.log(res.data);
        setIncomeData(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, []);
  return (
    <div className='container'>
      <h1>Incomes</h1>
      <div className='card-grid'>
        {
          incomeData ? incomeData.map((inc) => {
            return (
              <div className="income-card" key={inc.id}>
                <div className="income-date">{new Date(inc.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</div>
                <div className="income-details">
                  <span className="income-source">{inc.source}</span>
                  <span className="income-amount">₹{inc.incomeAmount}</span>
                </div>
              </div>
            )
          }) :
            <div>No income data available</div>
        }
      </div>
      <div className='btns'>
        <button className='btn b1'>Add Income</button>
        <button className='btn b2'>Update Income</button>
        <button className='btn b3'>Delete Income</button>
      </div>
    </div>
  )
}

export default Incomes
