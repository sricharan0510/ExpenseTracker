import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'

function AUDinc() {
  const [addbtnClicked, setAddbtnClicked] = useState(false)
  const [addIncSrc, setAddIncSrc] = useState('')
  const [addIncAmt, setAddIncAmt] = useState('')

  const [updatebtnClicked, setUpdatebtnClicked] = useState(false)
  const [oldIncSrc, setOldIncSrc] = useState('')
  const [updateIncAmt, setUpdateIncAmt] = useState('')

  const [dltbtnClicked, setDltbtnClicked] = useState(false)
  const [dltIncSrc, setDltIncSrc] = useState('')

  const handleAddIncome = (e) => {
    // e.preventDefault();
    if (!addIncSrc || !addIncAmt) {
      alert("Please fill in both fields before submitting.");
      return;
    }
    axios
      .post("http://localhost:9000/addIncome", {
        source: addIncSrc,
        incomeAmount: parseFloat(addIncAmt),
      })
      .then((response) => {
        alert("Income added successfully!");
        setAddbtnClicked(false);
        setAddIncSrc('');
        setAddIncAmt('');
      })
      .catch((error) => {
        console.error("Error adding income:", error);
        alert("Failed to add income. Please try again.");
      });
  };


  const handleUpdateInc = (e) => {
    e.preventDefault();
    if (!oldIncSrc || !updateIncAmt) {
      alert("Please fill in both fields before submitting.");
      return;
    }
    axios.post("http://localhost:9000/updateIncome", {
      source: oldIncSrc,
      newIncomeAmount: parseFloat(updateIncAmt),
    })
      .then((res) => {
        alert("Income updated successfully!");
        setUpdatebtnClicked(false);
        setOldIncSrc('');
        setUpdateIncAmt('');
      })
      .catch((err) => {
        console.error("Error updating income:", err);
        alert("Failed to update income. Please try again.");
      });
  }

  const handleDeleteInc = (e) => {
    e.preventDefault();
    if (!dltIncSrc) {
      alert("Please fill in the field before submitting.");
      return;
    }
    axios.post("http://localhost:9000/deleteIncome", {
      source: dltIncSrc,
    })
      .then((res) => {
        alert("Income deleted successfully!");
        setDltbtnClicked(false);
        setDltIncSrc('');
      })
      .catch((err) => {
        console.error("Error deleting income:", err);
        alert("Failed to delete income. Please try again.");
      }
      );
  }

  return (
    <div>
      <div className='card'>
        <h1>Income Sources</h1>
        <div className='btns'>
          <button className='btn b1' onClick={() => setAddbtnClicked(true)}>Add Income</button>
          <button className='btn b2' onClick={() => setUpdatebtnClicked(true)}>Update Income</button>
          <button className='btn b3' onClick={() => setDltbtnClicked(true)}>Delete Income</button>
        </div>
        {addbtnClicked ?
          <div>
            <form className='myForm' onSubmit={handleAddIncome}>
              <input className='myIP' type='text' onChange={(e) => setAddIncSrc(e.target.value)} placeholder='Enter Income Source' />
              <input className='myIP' type='number' onChange={(e) => setAddIncAmt(e.target.value)} placeholder='Enter Amount' />
              <button className='btn b1'>Add</button>
            </form>
          </div> : null
        }
        {updatebtnClicked ?
          <div>
            <form className='myForm' onSubmit={handleUpdateInc}>
              <input className='myIP' type='text' onChange={(e) => setOldIncSrc(e.target.value)} placeholder='Enter Old Income Source' />
              <input className='myIP' type='number' onChange={(e) => setUpdateIncAmt(e.target.value)} placeholder='Enter New Amount' />
              <button className='btn b2'>Update</button>
            </form>
          </div> : null
        }
        {dltbtnClicked ? 
          <div>
            <form className='myForm' onSubmit={handleDeleteInc}>
              <input className='myIP' type='text' onChange={(e) => setDltIncSrc(e.target.value)} placeholder='Enter Income Source' />
              <button className='btn b3'>Delete</button>
            </form>
          </div> : null
        }
      </div>
    </div>
  )
}

export default AUDinc
