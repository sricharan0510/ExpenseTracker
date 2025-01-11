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
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [userId]);

  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priority, setPriority] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handlepaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  }
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  }
  console.log(category, paymentMethod, priority);

  const fetchFilteredData = () => {
    console.log({ category, paymentMethod, priority });
    axios.post(`http://localhost:9000/${userId}/ExpFilter`, {
      category: category || undefined,
      paymentMethod: paymentMethod || undefined,
      priority: priority || undefined
    })
      .then((res) => {
        console.log("Filtered data received:", res.data);
        setExpData(res.data);
      })
      .catch((err) => {
        console.log(`Request failed with status code ${err.response.status}`);
      });
  };

  useEffect(() => {
    fetchFilteredData();
  }, [category, paymentMethod, priority]);

  return (
    <div className='container'>
      <h1>Expenses</h1>
      <div className='exp-search-div'>
        <input type='text' className='expense-search-bar' placeholder='Search Expense' />
      </div>
      <div className='filteringOptions'>
        <select
          id="category"
          className="select-input"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
        <select
          id="paymentMethod"
          className="select-input"
          value={paymentMethod}
          onChange={handlepaymentMethodChange}
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        <select
          id="priority"
          className="select-input"
          value={priority}
          onChange={handlePriorityChange}
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className='sortBtn select-input'>Sort by Amount</button>
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
