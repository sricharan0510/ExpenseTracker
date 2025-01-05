// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
// import '../App.css';

// Chart.register(ArcElement, Tooltip, Legend);

// const Incomes = () => {
//     const [data, setData] = useState([]);
//     const [chartData, setChartData] = useState(null);

//     useEffect(() => {
//         axios.get("http://localhost:9000/ExpenseTracker")
//             .then((res) => {
//                 setData(res.data);
//                 prepareChartData(res.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching expenses:", error);
//             });
//     }, []);

//     const prepareChartData = (users) => {
//         if (users.length > 0) {
//             const user = users[0];
//             const labels = user.incomeSources.map((inc) => inc.source);
//             const amounts = user.incomeSources.map((inc) => inc.incomeAmount);

//             setChartData({
//                 labels,
//                 datasets: [
//                     {
//                         label: "Income Sources",
//                         data: amounts,
//                         backgroundColor: [
//                             "#FF6384",
//                             "#36A2EB",
//                             "#FFCE56",
//                             "#4BC0C0",
//                             "#9966FF",
//                             "#FF9F40"
//                         ],
//                         hoverOffset: 4,
//                     },
//                 ],
//             });
//         }
//     };

//     return (
//         <div>
//             <h1>Income Sources</h1>
//             <div className="card" style={{display: 'flex'}}>
//                 {data.map(user => {
//                     return (
//                         <div key={user._id}>
//                             <p style={{ fontSize: '18px', color: 'black' }}>
//                                 All Income Sources of {user.name}!
//                             </p>
//                             <table border="1" className="myTable">
//                                 <thead>
//                                     <tr>
//                                         <th>Source</th>
//                                         <th>Income Amount</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {user.incomeSources.map((inc) => {
//                                         return (
//                                             <tr key={inc._id}>
//                                                 <td>{inc.source}</td>
//                                                 <td>{inc.incomeAmount}</td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                             <br />
//                         </div>
//                     );
//                 })}

//                 {chartData && (
//                     <div style={{ width: "300px", margin:"auto"}}>
//                         <Pie data={chartData} />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Incomes;
