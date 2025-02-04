const express = require('express')
const Route = express.Router();

const { checkUser, addUser, UserDetails } = require('../Controllers/UserAllDetails');
const { ExpCatSum } = require('../Controllers/AmountSum');
const { userIncomes, addIncome, updateIncome, deleteIncome } = require('../Controllers/IncomeAUD');
const { userExpenses, addExpense, updateExpense, deleteExpense } = require('../Controllers/ExpenseAUD')
const { expensesRange, incomesRange, ExpFilter } = require('../Controllers/Filtering');
const {  MonthWiseData, YearTotal, monthlyTotal } = require('../Controllers/MonthlyExp')

Route.post('/checkUser', checkUser);
Route.post('/addUser', addUser);

Route.get('/:userId/UserDetails', UserDetails);

Route.post('/:userId/ExpCatSum', ExpCatSum)

Route.get('/:userId/userIncomes', userIncomes);
Route.post('/:userId/addIncome', addIncome);
Route.post('/:userId/updateIncome', updateIncome);
Route.post('/:userId/deleteIncome', deleteIncome);

Route.get('/:userId/userExpenses', userExpenses);
Route.post('/:userId/addExpense', addExpense);
Route.post('/:userId/updateExpense', updateExpense);
Route.post('/:userId/deleteExpense', deleteExpense);

Route.post('/:userId/expensesRange', expensesRange);
Route.post('/:userId/incomesRange', incomesRange);
Route.post('/:userId/ExpFilter', ExpFilter);

// Route.post('/:userId/YearData', YearData)
// Route.post('/:userId/:year/MonthWiseData', MonthWiseData)
Route.get('/:userId/:year/:monthName', MonthWiseData)
Route.get('/:userId/:year/monthlyTotal', monthlyTotal)
Route.get('/:userId/:yearNo', YearTotal)

module.exports = Route;