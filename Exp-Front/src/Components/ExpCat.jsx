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
//     <div className='card'>
//       <div style={{ padding: '20px' }}>
// <h1>Expense Categories</h1>
//<Bar data={barData} />
//</div > 
//     </div>
//   )
// }

// export default ExpCat




















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function ExpCat() {
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

  const expenseCategories = {};
  const expPriority = {};
  const expPayment = {};

  data.forEach(user => {
    user.allExpenses.forEach(expObj => {
      expObj.Expenses.forEach(exp => {
        expenseCategories[exp.category] = (expenseCategories[exp.category] || 0) + exp.expenseAmount;
        expPriority[exp.priority] = (expPriority[exp.priority] || 0) + exp.expenseAmount;
        expPayment[exp.paymentMethod] = (expPayment[exp.paymentMethod] || 0) + exp.expenseAmount;
      });
    });
  });

  const barData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expenseCategories),
        backgroundColor: ['#E5334A', '#1BA345', '#FEC000', '#343A3F', '#00D6F1', '#352988', '#941100'],
        borderColor: ['#E5334A', '#1BA345', '#FEC000', '#343A3F', '#00D6F1', '#352988', '#941100'],
        borderWidth: 1,
      },
    ],
  };

  const piechartData = {
    labels: Object.keys(expPriority),
    datasets: [
      {
        data: Object.values(expPriority),
        backgroundColor: ['#E5334A', '#1BA345', '#FEC000'],
        borderColor: ['#E5334A', '#1BA345', '#FEC000'],
        borderWidth: 1,
      },
    ],
  };

  const piechartData2 = {
    labels: Object.keys(expPayment),
    datasets: [
      {
        data: Object.values(expPayment),
        backgroundColor: ['#E5334A', '#1BA345', '#FEC000', '#343A3F', '#00D6F1', '#352988', '#941100'],
        borderColor: ['#E5334A', '#1BA345', '#FEC000', '#343A3F', '#00D6F1', '#352988', '#941100'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="card">
        <div style={{ padding: '20px' }}>
          <h1>Expense Categories</h1>
          <Bar data={barData} />
        </div>
        <div style={{display:'flex'}}>
          <div style={{ padding: '20px', width: "50%" }}>
            <h1>Expense Priorities</h1>
            <Pie data={piechartData} />
          </div>
          <div style={{ padding: '20px', width: "50%"  }}>
            <h1>Expense Payment Methods</h1>
            <Pie data={piechartData2} />
          </div>
        </div>

      </div>
    </>
  );
}

export default ExpCat;
