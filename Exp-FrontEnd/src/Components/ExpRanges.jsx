import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExpRanges() {
    const { userId } = useParams();
    const [expData, setExpData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [category, setCategory] = useState("");

    const fetchFilteredDataRange = () => {
        console.log("From Date:", fromDate, "To Date:", toDate, "Category:", category);
        axios.post(`http://localhost:9000/${userId}/expensesRange`, {
            fromDate: fromDate || null,
            toDate: toDate || null,
            category: category || null,
        })
            .then((res) => {
                console.log("Filtered data received:", res.data);
                setExpData(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div className='container'>
            <h1>Expenses In Ranges</h1>
            <div className="filtering-options">
                <div className='allFields'>
                    <div>
                        <label>From Date:</label>
                        <input className='date' type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                    <div>
                        <label>To Date:</label> &nbsp;
                        <input className='date' type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                    <select
                        id="category"
                        className="select-input dateCat"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled> Select a category </option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <button className='filter-btn' onClick={fetchFilteredDataRange}>Filter</button>
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
        </div >
    )
}

export default ExpRanges



