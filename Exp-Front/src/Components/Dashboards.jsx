import React, { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";

const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9000/ExpenseTracker")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    var totalIncome = 0;
    data.map(user => {
        user.incomeSorces.map(inc => {
            totalIncome += inc.incomeAmount;
        })
    })
    var totalExpenses = 0;
    data.map((user) => {
        user.expenses[0] && Object.keys(user.expenses[0])
            .filter((key) => key !== "_id")
            .map((date) => {
                user.expenses[0][date].map(exp => {
                    totalExpenses += exp.expenseAmount;
                })
            }
            )
    });
    var balanceAmount = totalIncome - totalExpenses;
    return (
        <div>
            <h1>Dashboard</h1>
            {data.map((user) => {
                return (
                    <div key={user.id}>
                        <div className="card">
                            <p style={{color: "black", fontSize:'20px'}}><b>Name of the User : </b><span>{user.name}</span> </p>
                        </div>
                        <div className="card-grid">
                            <div className="card">
                                <h3>Total Income</h3>
                                <p>{totalIncome}</p>
                            </div>
                            <div className="card">
                                <h3>Total Expenses</h3>
                                <p>{totalExpenses}</p>
                            </div>
                            <div className="card">
                                <h3>Balance</h3>
                                <p>{balanceAmount}</p>
                            </div>
                            <div className="card">
                                <h3>Savings Target</h3>
                                <p>{user.savingTarget}</p>
                            </div>
                        </div>
                        <div className="card">
                            <h3>Overall Report </h3>
                            <p>
                                {user.savingTarget < balanceAmount
                                    ? "User can have a chance of spending money up to " + (balanceAmount - user.savingTarget)
                                    : "User has exceeded the saving target by " + (user.savingTarget - balanceAmount)}
                            </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Dashboard;
