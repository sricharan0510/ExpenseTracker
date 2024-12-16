import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

function AUDexp() {
  const [addbtnClicked, setAddbtnClicked] = useState(false)
  const [edate, setEdate] = useState('')
  const [ename, setEname] = useState('')
  const [eamt, setEamt] = useState('')
  const [ecat, setEcat] = useState('')
  const [epri, setEpri] = useState('')
  const [epm, setEpm] = useState('')

  const handleAddExp = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:9000/addExpense", {
      edate: edate,
      ename: ename,
      eamt: parseFloat(eamt),
      ecat: ecat,
      epri: epri,
      epm: epm
    })
    .then((response) => {
      alert("Expense added successfully!");
      setAddbtnClicked(false);
      setEdate('');
      setEname('');
      setEamt('');
      setEcat('');
      setEpri('');
      setEpm('');
    })
    .catch((error) => {
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Please try again.");
    });
  }

  return (
    <div>
      <div className='card'>
        <h1>Expenses</h1>
        <div className='btns'>
          <button className='btn b1' onClick={() => setAddbtnClicked(true)}>Add Expense</button>
          <button className='btn b2'>Update Expense</button>
          <button className='btn b3'>Delete Expense</button>
        </div>
        {addbtnClicked ?
          <form className='myForm' onSubmit={handleAddExp}>
            <input className='myIP' type='date' placeholder='Date' onChange={(e) => setEdate(e.target.value)} />
            <input className='myIP' type='text' placeholder='Expense Name' onChange={(e) => setEname(e.target.value)} />
            <input className='myIP' type='number' placeholder='Amount' onChange={(e) => setEamt(e.target.value)} />
            <select id="payment" className="myIP" onChange={(e) => setEcat(e.target.value)}>
              <option style={{ color: "#757575" }} value="">Select Category</option>
              <option value="Expense">Expense</option>
              <option value="Saving">Saving</option>
              <option value="Investment">Investment</option>
            </select>
            <select id="priority" className="myIP" onChange={(e) => setEpri(e.target.value)}>
              <option style={{ color: "#757575" }} value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div style={{ display: "flex", gap: '20px', padding: "10px", color: "#757575" }}>
              <label>Payment Mode:</label>
              <div>
                <input type="radio" id="cash" name="paymentMode" value="Cash" checked={epm === 'Cash'} onChange={(e) => setEpm(e.target.value)} />
                <label htmlFor="cash">Cash</label>
              </div>
              <div>
                <input type="radio" id="card" name="paymentMode" value="Card" checked={epm === 'Card'} onChange={(e) => setEpm(e.target.value)} />
                <label htmlFor="card">Card</label>
              </div>
              <div>
                <input type="radio" id="upi" name="paymentMode" value="UPI" checked={epm === 'UPI'} onChange={(e) => setEpm(e.target.value)} />
                <label htmlFor="upi">UPI</label>
              </div>
              <div>
                <input type="radio" id="bankTransfer" name="paymentMode" value="Bank Transfer" checked={epm === 'Bank Transfer'} onChange={(e) => setEpm(e.target.value)} />
                <label htmlFor="bankTransfer">Bank Transfer</label>
              </div>
            </div>
            <button className='btn b1'>Add Expense</button>
          </form>
          : null
        }
      </div>
    </div>
  )
}

export default AUDexp
