import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {
    const { userId } = useParams();
    const [data, setData] = useState([]);

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

    const barChartData = {
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

    const expensePriority = {};
    data.forEach(exp => {
        if (expensePriority[exp.priority]) {
            expensePriority[exp.priority] += exp.expenseAmount;
        } else {
            expensePriority[exp.priority] = exp.expenseAmount;
        }
    });

    const pieChartDataOne = {
        labels: Object.keys(expensePriority),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(expensePriority),
                backgroundColor: [
                    '#FF6384', // Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                ],
                borderColor: '#ccc',
                borderWidth: 1,
            },
        ],
    }

    const expensePaymentMethod = {};
    data.forEach(exp => {
        if (expensePaymentMethod[exp.paymentMethod]) {
            expensePaymentMethod[exp.paymentMethod] += exp.expenseAmount;
        } else {
            expensePaymentMethod[exp.paymentMethod] = exp.expenseAmount;
        }
    });

    const pieChartDataTwo = {
        labels: Object.keys(expensePaymentMethod),
        datasets: [
            {
                label: 'Expenses',
                data: Object.values(expensePaymentMethod),
                backgroundColor: [
                    '#9966FF', // Purple
                    '#4BC0C0', // Teal
                    '#FF9F40', // Orange
                    '#5AC18E', // Green
                ],
                borderColor: '#ccc',
                borderWidth: 1,
            },
        ],
    }


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
                <Bar data={barChartData} options={options} />
            </div>
            <div className='piecharts'>
                <Pie data={pieChartDataOne} options={options} />
                <Pie data={pieChartDataTwo} options={options} />
            </div>
        </div>
    );
}

export default Statistics;
