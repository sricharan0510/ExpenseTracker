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
        <button className='btn b2'>Update Income</button>
        <button className='btn b3'>Delete Income</button>
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



    </div>
  )
}

export default Incomes


// const handleAddIncome = (e) => {
//   // e.preventDefault();
//   if (!addIncSrc || !addIncAmt) {
//     alert("Please fill in both fields before submitting.");
//     return;
//   }
//   axios
//     .post("http://localhost:9000/addIncome", {
//       source: addIncSrc,
//       incomeAmount: parseFloat(addIncAmt),
//     })
//     .then((response) => {
//       alert("Income added successfully!");
//       setAddbtnClicked(false);
//       setAddIncSrc('');
//       setAddIncAmt('');
//     })
//     .catch((error) => {
//       console.error("Error adding income:", error);
//       alert("Failed to add income. Please try again.");
//     });
// };
// const handleUpdateInc = (e) => {
//   e.preventDefault();
//   if (!oldIncSrc || !updateIncAmt) {
//     alert("Please fill in both fields before submitting.");
//     return;
//   }
//   axios.post("http://localhost:9000/updateIncome", {
//     source: oldIncSrc,
//     newIncomeAmount: parseFloat(updateIncAmt),
//   })
//     .then((res) => {
//       alert("Income updated successfully!");
//       setUpdatebtnClicked(false);
//       setOldIncSrc('');
//       setUpdateIncAmt('');
//     })
//     .catch((err) => {
//       console.error("Error updating income:", err);
//       alert("Failed to update income. Please try again.");
//     });
// }

// const handleDeleteInc = (e) => {
//   e.preventDefault();
//   if (!dltIncSrc) {
//     alert("Please fill in the field before submitting.");
//     return;
//   }
//   axios.post("http://localhost:9000/deleteIncome", {
//     source: dltIncSrc,
//   })
//     .then((res) => {
//       alert("Income deleted successfully!");
//       setDltbtnClicked(false);
//       setDltIncSrc('');
//     })
//     .catch((err) => {
//       console.error("Error deleting income:", err);
//       alert("Failed to delete income. Please try again.");
//     }
//     );
// }