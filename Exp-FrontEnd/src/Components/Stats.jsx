import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);


const Stats = () => {
    const { userId } = useParams();

    const [year, setYear] = useState('2025');
    const [yearData, setYearData] = useState([]);

    const [month, setMonth] = useState('')
    const [monthData, setMonthData] = useState([])

    const [cat, setCat] = useState('')
    const [catData, setCatData] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:9000/${userId}/${year}`)
            .then((res) => {
                const modifiedData = [{ month: " ", totalMonthExpense: 0 }, ...res.data];
                setYearData(modifiedData);
            })
            .catch((err) => console.error(err));
    }, [year]);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/${userId}/${year}/${month}`)
            .then((res) => {
                setMonthData(res.data);
            })
            .catch((err) => console.error(err));
    }, [month]);

    useEffect(() => {
        console.log('Effect triggered for cat:', cat);
        axios
            .get(`http://localhost:9000/${userId}/${year}/${month}/${cat}`)
            .then((res) => {
                setCatData(res.data);
            })
            .catch((err) => console.error(err));
    }, [cat]);


    const lineChartData = {
        labels: yearData.map(data => data.month),
        datasets: [
            {
                label: "Monthly Expenses",
                data: yearData.map(data => data.totalMonthExpense),
                fill: false,
                borderColor: "#4A90E2",
                pointBackgroundColor: "#4A90E2",
                pointBorderColor: "#fff",
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2,
                // tension: 0.3,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const element = elements[0];
                const dataIndex = element.index;
                const clickedData = yearData[dataIndex];
                console.log("Clicked Point Data: ", clickedData);
                setMonth(clickedData.month)
            }
        },
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            tooltip: {
                titleFont: { size: 14, weight: "bold" },
                bodyFont: { size: 12 },
                padding: 15,
                cornerRadius: 7,
                borderColor: "#4A90E2",
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#333" },
                beginAtZero: true,
            },
            y: {
                grid: { color: "rgba(136, 132, 216, 0.2)" },
                ticks: { color: "#333" },
                beginAtZero: true,
            },
        },
        layout: {
            backgroundColor: "transparent",
        },
    };

    const barChartData = {
        labels: monthData.map(item => item._id),
        datasets: [
            {
                label: 'Expenses',
                data: monthData.map(item => item.Amount),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#5AC18E',
                ],
                borderColor: '#ccc',
                borderWidth: 1,
            },
        ],
    };
    const barOptions = {
        responsive: true,
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const clickedElementIndex = elements[0].index;
                const clickedLabel = barChartData.labels[clickedElementIndex];
                const clickedValue = barChartData.datasets[0].data[clickedElementIndex];
                console.log(clickedLabel, clickedValue);
                setCat(clickedLabel)
            }
        },
        plugins: {
            title: {
                display: true,
                text: `Category-wise Expenses Breakdown of ${month}`,
                size: 18
            },
        },
    };

    const pieChartDataOne = {
        labels: (catData && catData[0] && catData[0].priorities) ? catData[0].priorities.map(item => item._id) : [], // Check for catData and priorities
        datasets: [
            {
                label: 'Expenses',
                data: (catData && catData[0] && catData[0].priorities) ? catData[0].priorities.map(item => item.totalPriority) : [],
                backgroundColor: [
                    '#FF6384', // Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                ],
                borderColor: '#ccc',
                borderWidth: 1,
            },
        ],
    };
    const pieChartDataTwo = {
        labels: (catData && catData[0] && catData[0].paymentMethods) ? catData[0].paymentMethods.map(item => item._id) : [], 
        datasets: [
            {
                label: 'Expenses',
                data: (catData && catData[0] && catData[0].paymentMethods) ? catData[0].paymentMethods.map(item => item.totalPaymentMethod) : [],
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

    const handleYearChange = (e) => {
        console.log(e.target.value);
        setYear(e.target.value);
        setMonth('')
        setCat('')
    }


    return (
        <>
            <h1>Statistics of the year {`${year}`}</h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <select value={year} onChange={(e) => handleYearChange(e)} style={{ padding: "10px", marginBottom: "25px" }}>
                    <option key={'2025'} value={'2025'}>2025</option>
                    <option key={'2024'} value={'2024'}>2024</option>
                </select>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 450, width: "90%", marginBottom: "25px" }}>
                    <Line data={lineChartData} options={lineChartOptions} style={{ height: 400, width: 830 }} />
                </div>
                {month && <div style={{ width: '80%', margin: '0 auto', marginBottom: "25px" }}>
                    <Bar data={barChartData} options={barOptions} />
                </div>}
                {
                    cat && <div className='piecharts'>
                        <Pie data={pieChartDataOne} options={options} />
                        <Pie data={pieChartDataTwo} options={options} />
                    </div>
                }
            </div>
        </>

    );
};

export default Stats;
