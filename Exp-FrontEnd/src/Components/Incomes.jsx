import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Incomes() {
  const { userId } = useParams();

  const [incomeData, setIncomeData] = useState([]);

  const [showAddBox, setShowAddBox] = useState(false);
  const [addIncSrc, setAddIncSrc] = useState("");
  const [addIncAmt, setAddIncAmt] = useState("");
  const [addIncDate, setAddIncDate] = useState("");

  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [updateIncSrc, setUpdateIncSrc] = useState("")
  const [updateIncAmt, setUpdateIncAmt] = useState("")

  const [showDltBox, setShowDltBox] = useState(false);
  const[dltIncSrc, setDltIncSrc] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:9000/${userId}/userIncomes`)
      .then((res) => {
        setIncomeData(res.data);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, []);


  const openAddBox = (() => {
    setShowAddBox(true);
  })
  const closeAddBox = (() => {
    setShowAddBox(false);
  })
  const handleAddIncome = (e) => {
    if (!addIncSrc || !addIncAmt || !addIncDate) {
      alert("Please fill all details");
      return;
    }
    axios
      .post(`http://localhost:9000/${userId}/addIncome`, {
        source: addIncSrc,
        incomeAmount: parseFloat(addIncAmt),
        date: addIncDate
      })
      .then((response) => {
        alert("Income added successfully!");
        setShowAddBox(false);
      })
      .catch((error) => {
        console.error("Error adding income:", error);
        alert("Failed to add income. Please try again.");
      });
  };


  const openUpdateBox = () => {
    setShowUpdateBox(true);
  }
  const closeUpdateBox = () => {
    setShowUpdateBox(false);
  }
  const handleUpdateIncome = (e) => {
    if (!updateIncSrc || !updateIncAmt) {
      alert("Please fill all details");
      return;
    }
    axios
      .post(`http://localhost:9000/${userId}/updateIncome`, {
        source: updateIncSrc,
        newIncomeAmount: parseFloat(updateIncAmt),
      })
      .then((res) => {
        alert("Income Updated successfully!");
        setShowUpdateBox(false);
      })
      .catch((error) => {
        console.error("Error adding income:", error);
        alert("Failed to Update income. Please try again.");
      });
  };


  const openDltBox = () => {
    setShowDltBox(true);
  }
  const CloseDltBox = () => {
    setShowDltBox(false);
  }
  const handleDeleteInc = (e) => {
    if (!dltIncSrc) {
      alert("Please fill in the field before submitting.");
      return;
    }
    axios.post(`http://localhost:9000/${userId}/deleteIncome`, {
      source: dltIncSrc,
    })
      .then((res) => {
        alert("Income deleted successfully!");
        setShowDltBox(false);
      })
      .catch((err) => {
        console.error("Error deleting income:", err);
        alert("Failed to delete income. Please try again.");
      }
      );
  }

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
        <button className='btn b1' onClick={openAddBox}>Add Income</button>
        <button className='btn b2' onClick={openUpdateBox}>Update Income</button>
        <button className='btn b3' onClick={openDltBox}>Delete Income</button>
      </div>

      {showAddBox && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='addincAndClose'>
              <h2>Add Income</h2>
              <button className="close-btn" onClick={closeAddBox}>X</button>
            </div>
            <form onSubmit={handleAddIncome}>
              <div className='formInputs'>
                <label>Income Source :</label>
                <input type="text" placeholder="Enter Income Source" onChange={(e) => setAddIncSrc(e.target.value)} />
                <label>Income Amount :</label>
                <input type="text" placeholder="Enter Income Amount" onChange={(e) => setAddIncAmt(e.target.value)} />
                <label>Date :</label>
                <input type="date" placeholder="Enter Date" onChange={(e) => setAddIncDate(e.target.value)} />
              </div>
              <button type="submit" className='btn b1'>Add</button>
            </form>
          </div>
        </div>
      )}

      {showUpdateBox && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='addincAndClose'>
              <h2>Update Income</h2>
              <button className="close-btn" onClick={closeUpdateBox}>X</button>
            </div>
            <form onSubmit={handleUpdateIncome}>
              <div className='formInputs'>
                <label>Income Source :</label>
                <input type="text" placeholder="Enter Income Source" onChange={(e) => setUpdateIncSrc(e.target.value)} />
                <label>Income Amount :</label>
                <input type="text" placeholder="Enter New Income Amount" onChange={(e) => setUpdateIncAmt(e.target.value)} />
              </div>
              <button type="submit" className='btn b2'>Update</button>
            </form>
          </div>
        </div>
      )}

      {showDltBox && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='addincAndClose'>
              <h2>Delete Income</h2>
              <button className="close-btn" onClick={CloseDltBox}>X</button>
            </div>
            <form onSubmit={handleDeleteInc}>
              <div className='formInputs'>
                <label>Income Source :</label>
                <input type="text" placeholder="Enter Income Source" onChange={(e) => setDltIncSrc(e.target.value)} />
              </div>
              <button type="submit" className='btn b3'>Delete</button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Incomes;