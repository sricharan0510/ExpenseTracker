import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Expenses() {
  const { userId } = useParams();
  const [originalExpData, setOriginalExpData] = useState([]);
  const [expData, setExpData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/${userId}/userExpenses`)
      .then((res) => {
        setOriginalExpData(res.data);
        setExpData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userId]);

  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [priority, setPriority] = useState("");

  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);

  const fetchFilteredData = () => {
    axios.post(`http://localhost:9000/${userId}/ExpFilter`, {
      category: category || undefined,
      paymentMethod: paymentMethod || undefined,
      priority: priority || undefined,
    })
      .then((res) => {
        console.log("Category:", category, "Payment Method:", paymentMethod, "Priority:", priority);
        console.log("Filtered data received:", res.data);
        setExpData(res.data);
      })
      .catch((err) => {
        console.log("No Expenses with selected Filter");
        setExpData([]);
      });
  };

  useEffect(() => {
    fetchFilteredData();
  }, [category, paymentMethod, priority]);

  const dataSort = () => {
    const sortedExpData = [...expData].sort((a, b) => a.expenseAmount - b.expenseAmount);
    setExpData(sortedExpData);
  };

  const handleSearchingExp = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    if (searchQuery === "") {
      setExpData(originalExpData);
    } else {
      const filteredData = originalExpData.filter((expense) =>
        expense.expenseName.toLowerCase().startsWith(searchQuery)
      );
      setExpData(filteredData);
    }
  };

  const [addExpenseBox, setAddExpenseBox] = useState(false);
  const [addExpName, setAddExpName] = useState("");
  const [addExpAmt, setAddExpAmt] = useState("");
  const [addExpDate, setAddExpDate] = useState("");
  const [addExpCat, setAddExpCat] = useState("");
  const [addExpPayMethod, setAddExpPayMethod] = useState("");
  const [addExpPriority, setAddExpPriority] = useState("");

  const openAddExpebseBox = () => {
    setAddExpenseBox(true);
  }
  const closeAddExpenseBox = () => {
    setAddExpenseBox(false);
  }
  const handleAddExpense = (e) => {
    if (!addExpName || !addExpAmt || !addExpDate || !addExpCat || !addExpPayMethod || !addExpPriority) {
      alert("Please fill all details");
      return;
    }
    axios.post(`http://localhost:9000/${userId}/addExpense`, {
      expenseName: addExpName,
      expenseAmount: parseFloat(addExpAmt),
      date: addExpDate,
      category: addExpCat,
      paymentMethod: addExpPayMethod,
      priority: addExpPriority
    })
      .then((response) => {
        alert("Expense added successfully!");
        setAddExpenseBox(false);
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again.");
      });
  }

  const [deleteExpenseBox, setDeleteExpenseBox] = useState(false);
  const [dltExpName, setDltExpName] = useState("");

  const openDeleteExpenseBox = () => {
    setDeleteExpenseBox(true);
  }
  const closeDeleteExpenseBox = () => {
    setDeleteExpenseBox(false);
  }

  const handleDeleteExpense = (e) => {
    if (!dltExpName) {
      alert("Please fill all details");
      return;
    }
    axios.post(`http://localhost:9000/${userId}/deleteExpense`, {
      expenseName: dltExpName
    })
      .then((response) => {
        alert("Expense deleted successfully!");
        setDeleteExpenseBox(false);
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
      });
  }

  return (
    <div className='container'>
      <h1>Expenses</h1>
      <div className='exp-search-div'>
        <input
          type='text'
          className='expense-search-bar'
          placeholder='Search Expense'
          onChange={handleSearchingExp}
        />
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
        </select>
        <select
          id="paymentMethod"
          className="select-input"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
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
        <button className='sortBtn select-input' onClick={dataSort}>
          Sort by Amount (↑)
        </button>
      </div>
      <div className='card-grid'>
        {expData.length > 0 ? (
          expData.map((exp) => (
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
          ))
        ) : (
          <div className='noExpCard'>No Expenses with Selected Filter</div>
        )}
      </div>

      <div className='btns'>
        <button className='btn b1' onClick={openAddExpebseBox}>Add Expense</button>
        <button className='btn b2'>Update Expense</button>
        <button className='btn b3' onClick={openDeleteExpenseBox}>Delete Expense</button>
      </div>

      {addExpenseBox && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='addincAndClose'>
              <h2>Add Expense</h2>
              <button className="close-btn" onClick={closeAddExpenseBox}>Close</button>
            </div>
            <form onSubmit={handleAddExpense}>
              <div className='formInputs'>
                <label>Expense Name :</label>
                <input className='box-input' type="text" placeholder="Enter Expense Name" onChange={(e) => setAddExpName(e.target.value)} />
                <label>Expense Amount :</label>
                <input className='box-input' type="text" placeholder="Enter Expense Amount" onChange={(e) => setAddExpAmt(e.target.value)} />
                <label>Date :</label>
                <input className='box-input' type="date" placeholder="Enter Date" onChange={(e) => setAddExpDate(e.target.value)} />
                <label>Category :</label>
                <input className='box-input' type="text" placeholder="Enter Category" onChange={(e) => setAddExpCat(e.target.value)} />
                <label>Payment Method :</label>
                <input className='box-input' type="text" placeholder="Enter Payment Method" onChange={(e) => setAddExpPayMethod(e.target.value)} />
                <label>Priority :</label>
                <input className='box-input' type="text" placeholder="Enter Priority" onChange={(e) => setAddExpPriority(e.target.value)} />
              </div>
              <button type="submit" className='btn b1'>Add</button>
            </form>
          </div>
        </div>
      )}

      {deleteExpenseBox && (
        <div className="modal-overlay">
          <div className="modal">
            <div className='addincAndClose'>
              <h2>Delete Expense</h2>
              <button className="close-btn" onClick={closeDeleteExpenseBox}>Close</button>
            </div>
            <form onSubmit={handleDeleteExpense}>
              <div className='formInputs'>
                <label>Expense Name :</label>
                <input className='box-input' type="text" placeholder="Enter Expense Name" onChange={(e) => setDltExpName(e.target.value)} />
              </div>
              <button type="submit" className='btn b3'>Delete</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Expenses;
