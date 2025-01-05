// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../App.css";

// const AllExpenses = () => {
//   const [data, setData] = useState([]);
//   const [selectedFromDate, setSelectedFromDate] = useState("");
//   const [selectedToDate, setSelectedToDate] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/ExpenseTracker")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching expenses:", error);
//       });
//   }, []);

//   const filterExpensesByDateRange = (allExpenses, fromDate, toDate) => {
//     return allExpenses.filter((expenseObj) => {
//       const expenseDate = new Date(expenseObj.ExpDate).toISOString().split("T")[0];
//       return expenseDate >= fromDate && expenseDate <= toDate;
//     });
//   };

//   return (
//     <div>
//       <h1>Expenses</h1>
//       <div className="card">
//         {data.map((user) => {
//           const filteredExpenses = selectedFromDate && selectedToDate
//             ? filterExpensesByDateRange(user.allExpenses, selectedFromDate, selectedToDate)
//             : [];

//           return (
//             <div key={user._id}>
//               <div className="headingAndIpDiv">
//                 <p style={{ color: "black", fontSize: "18px" }}>Select the date range for expense data:</p>
//                 <div className="datesIpDiv">
//                   <label htmlFor="fromDate">From :</label>
//                   <input className="dateIp" type="date" id="fromDate" name="FromDate" onChange={(e) => setSelectedFromDate(e.target.value)}/>-
//                   <label htmlFor="toDate">To :</label>
//                   <input className="dateIp" type="date" id="toDate" name="ToDate" onChange={(e) => setSelectedToDate(e.target.value)} />
//                 </div>
//               </div>
//               <table border='1' className="myTable">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Expense Name</th>
//                     <th>Amount</th>
//                     <th>Category</th>
//                     <th>Priority</th>
//                     <th>Payment Method</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredExpenses.length > 0 ? (
//                     filteredExpenses.map((expenseObj, index) => (
//                       expenseObj.Expenses.map((exp, expenseIndex) => (
//                         <tr key={`${expenseObj._id}-${expenseIndex}`}>
//                           {expenseIndex === 0 && (
//                             <td rowSpan={expenseObj.Expenses.length}>
//                               {new Date(expenseObj.ExpDate)
//                                 .toLocaleDateString("en-GB")
//                                 .replace(/\//g, "-")}
//                             </td>
//                           )}
//                           <td>{exp.expenseName}</td>
//                           <td>{exp.expenseAmount}</td>
//                           <td>{exp.category}</td>
//                           <td>{exp.priority}</td>
//                           <td>{exp.paymentMethod}</td>
//                         </tr>
//                       ))
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="6" style={{ textAlign: "center" }}>
//                         No Expenses Found for the selected date range!
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <br />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AllExpenses;
