import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stats = () => {
    const { userId } = useParams();
    const [year, setYear] = useState(2024);
    const [yearData, setYearData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/${userId}/${year}`)
            .then((res) => {
                const modifiedData = [{ month: " ", totalMonthExpense: 0 }, ...res.data];
                setYearData(modifiedData);
            })
            .catch((err) => console.error(err));
    }, [year, userId]);

    console.log(yearData);

    const chartLabels = yearData.map(data => data.month);
    const chartData = yearData.map(data => data.totalMonthExpense);


    const lineChartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "Monthly Expenses",
                data: chartData,
                fill: false,
                borderColor: "#4A90E2",  
                pointBackgroundColor: "#4A90E2", 
                pointBorderColor: "#fff",
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2,
                tension: 0.3, 
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
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




    return (
        <div style={{
            margin: "auto",
            height: 400,
            width: "85%",
            backgroundColor: "transparent"
        }}>
            <h1>Statistics of the year {`${year}`}</h1>
            <Line data={lineChartData} options={lineChartOptions} style={{ height: 450, width: 730 }} />
        </div>

    );
};

export default Stats;
