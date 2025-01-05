// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import '../App.css'
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function ExpCat() {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get("http://localhost:9000/ExpenseTracker")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const expenseCategories = {};
//   data.forEach(user => {
//     user.allExpenses.forEach(expObj => {
//       expObj.Expenses.forEach(exp => {
//         if (expenseCategories[exp.category]) {
//           expenseCategories[exp.category] += exp.expenseAmount;
//         } else {
//           expenseCategories[exp.category] = exp.expenseAmount;
//         }
//       });
//     });
//   });

//   const barData = {
//     labels: Object.keys(expenseCategories),
//     datasets: [
//       {
//         label: "Expenses",
//         data: Object.values(expenseCategories),
//         backgroundColor: [
//           '#E5334A',
//           '#1BA345',
//           '#FEC000',
//           '#343A3F',
//           '#00D6F1',
//           '#352988',
//           '#941100'
//         ],
//         borderColor: [
//           '#E5334A',
//           '#1BA345',
//           '#FEC000',
//           '#343A3F',
//           '#00D6F1',
//           '#352988',
//           '#941100'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   }

//   return (
//     <div>
//       <h1>Expense Categories</h1> <br></br>
//       <Bar data={barData}/>
//     </div>
//   )
// }

// export default ExpCat
