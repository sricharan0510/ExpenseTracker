import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { userId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9000/${userId}/UserDetails`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [userId]);

    console.log("User Data: ", data[0]);

    return (
        <div>
            <h1>Dashboard</h1>
            {
                data.map((user) => {
                    return (
                        <div key={user.id}>
                            <div className="card">
                                <p style={{ color: "black", fontSize: '20px' }}><b>Name of the User : </b><span>{user.name}</span> </p>
                            </div>
                            <div className="card-grid">
                                <div className="card">
                                    <h3>Total Income</h3>
                                    <p>{user.totalIncome}</p>
                                </div>
                                <div className="card">
                                    <h3>Total Expenses</h3>
                                    <p>{user.totalExpense}</p>
                                </div>
                                <div className="card">
                                    <h3>Balance</h3>
                                    <p>{user.balanceAmount}</p>
                                </div>
                                <div className="card">
                                    <h3>Savings Target</h3>
                                    <p>{user.savingTarget}</p>
                                </div>
                            </div>
                            <div className="card">
                                <h3>Overall Report </h3>
                                <p>
                                    {user.savingTarget < user.balanceAmount
                                        ? "User can have a chance of spending money up to " + (user.balanceAmount - user.savingTarget)
                                        : "User has exceeded the saving target by " + (user.savingTarget - user.balanceAmount)}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Dashboard;