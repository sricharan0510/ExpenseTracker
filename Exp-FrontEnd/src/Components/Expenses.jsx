import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Expenses() {
  const { userId } = useParams();
  const [expData, setExpData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:9000/${userId}/userExpenses`)
      .then((res) => {
        setExpData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);
  return (
    <div className='container'>
      <h1>Expenses</h1>
      <div className='exp-search-div'>
        <input type='text' className='expense-search-bar' placeholder='Search Expense' />
      </div>
      <div className='card-grid'>
        {
          expData ? expData.map((exp) => {
            return (
              <div className="expense-card" key={exp.id}>
                <div className="income-date">{new Date(exp.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</div>
                <div className="income-details">
                  <span className="income-source">{exp.expenseName}</span>
                  <span className="expense-amount">₹{exp.expenseAmount}</span>
                </div>
              </div>
            )
          }) :
            <div>No Expense data available</div>
        }
      </div>
    </div>
  )
}

export default Expenses
