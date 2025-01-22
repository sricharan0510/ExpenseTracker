import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistics() {
    const { userId } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data
    useEffect(() => {
        axios
            .get(`http://localhost:9000/${userId}/userExpenses`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [userId]);

    const expenseCategories = {};
    data.forEach(exp => {
        if (expenseCategories[exp.category]) {
            expenseCategories[exp.category] += exp.expenseAmount;
        } else {
            expenseCategories[exp.category] = exp.expenseAmount;
        }
    });

    const chartData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(expenseCategories),
                backgroundColor: [
                    '#FF6384', // Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                    '#4BC0C0', // Teal
                    '#9966FF', // Purple
                    '#FF9F40', // Orange
                    '#5AC18E', // Green
                ],
                borderColor: '#ccc',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Category-wise Expenses Breakdown',
            },
        },
    };

    return (
        <div className="container">
            <h1>Statistics</h1>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}

export default Statistics;
