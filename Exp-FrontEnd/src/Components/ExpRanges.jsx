import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ExpRanges() {
    const { userId } = useParams();
    const [expData, setExpData] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [category, setCategory] = useState("");

    const fetchFilteredData = () => {
        useEffect(() => {
            axios.post(`http://localhost:9000/${userId}/expensesRange`, {
                fromDate: fromDate || null,
                toDate: toDate || null,
                category: category || null,
            })
                .then((res) => {
                    console.log("From Date:", fromDate, "To Date:", toDate, "Category:", category);
                    console.log("Filtered data received:", res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, [fromDate, toDate, category]);
    };

    return (
        <div>
            <h1>Expenses In Ranges</h1>
            <div>
                <label>From Date:</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <label>To Date:</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <select
                    id="category"
                    className="select-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                <button onClick={fetchFilteredData}>Filter</button>
            </div>
        </div>
    )
}

export default ExpRanges



