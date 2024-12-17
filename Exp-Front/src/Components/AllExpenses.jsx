import React, { useEffect, useState } from "react";
import axios from "axios";

const AllExpenses = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  useEffect(() => {
    axios.get("http://localhost:9000/ExpenseTracker")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h1>Expenses</h1>
      <div className="card">
        {data.map((user) => {
          return (
            <>
              <div style={{ display: 'flex', gap: '10px' }}>
                <p style={{ color: 'black', fontSize: '18px' }}>Select the date for the expense data :</p>
                <input type="date" id="date" name="date" onChange={handleDateChange} style={{ width: '100px' }} />
              </div>
              <br />
              <table border="1" cellPadding={"20"} style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Expense Name</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedDate
                    ? data.map((user) => {
                      const expensesForDate = user.allExpenses.find(
                        (expenseObj) => new Date(expenseObj.ExpDate).toISOString().split('T')[0] === selectedDate
                      );
                      return (
                        expensesForDate ? (
                          expensesForDate.Expenses.map((exp, index) => (
                            <tr key={`${selectedDate}-${index}`}>
                              {index === 0 ? (
                                <td rowSpan={expensesForDate.Expenses.length}>{new Date(selectedDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                              ) : null}
                              <td>{exp.expenseName}</td>
                              <td>{exp.expenseAmount}</td>
                              <td>{exp.category}</td>
                              <td>{exp.priority}</td>
                              <td>{exp.paymentMethod}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center' }}>
                              No Expenses Found for the selected date!
                            </td>
                          </tr>
                        )
                      );
                    })
                    : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          No Expenses Found!
                        </td>
                      </tr>
                    )
                  }

                </tbody>
              </table>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default AllExpenses;
